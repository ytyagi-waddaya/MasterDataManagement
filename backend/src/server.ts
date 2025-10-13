import "dotenv/config";
import http from "http";
import app from "./app";
import logger from "./utils/logger";
import { prisma } from "./utils/prisma";
import { setReady } from "./utils/health";
import { config } from "./config/app.config";

// at top of file: add imports
import { shutdownRedis } from "./utils/redis";
import { RedisEventBus } from "./utils/redisEventBus";
import { setupSocketIO } from "./utils/socket";
import { stopAllStreamConsumers } from "./utils/redisStreamBus";

const PORT = Number.isNaN(config.PORT) ? 8000 : config.PORT;

let server: http.Server | undefined;
let isShuttingDown = false;
let socketShutdown: (() => Promise<void>) | undefined;

// enable animations only for interactive terminals (opt-out via ANIMATIONS=false)
const enableAnimations = Boolean(process.stdout.isTTY && process.env.ANIMATIONS !== "false");

// ---------- Types ----------
type Step = {
  label: string;
  task: () => Promise<void>;
  minDurationMs?: number;
  maxDurationMs?: number;
};

// ---------- Stdout/stderr hold helper (buffers both streams) ----------
async function holdStdoutDuring<T>(fn: () => Promise<T>): Promise<T> {
  const origStdoutWrite = process.stdout.write.bind(process.stdout);
  const origStderrWrite = process.stderr.write.bind(process.stderr);

  const buffer: Array<{ which: "stdout" | "stderr"; chunk: any; args: any[] }> = [];

  (process.stdout as any).write = (chunk: any, ...args: any[]) => {
    buffer.push({ which: "stdout", chunk, args });
    return true;
  };
  (process.stderr as any).write = (chunk: any, ...args: any[]) => {
    buffer.push({ which: "stderr", chunk, args });
    return true;
  };

  try {
    const result = await fn();

    for (const item of buffer) {
      if (item.which === "stdout") origStdoutWrite(item.chunk, ...item.args);
      else origStderrWrite(item.chunk, ...item.args);
    }

    return result;
  } finally {
    (process.stdout as any).write = origStdoutWrite;
    (process.stderr as any).write = origStderrWrite;
  }
}

// ---------- Console animation helpers ----------
async function typeOut(text: string, delayMs = 18) {
  const safeText = text ?? "";
  if (!enableAnimations) {
    process.stdout.write(`\n${safeText}\n\n`);
    return;
  }
  process.stdout.write("\n");
  for (let i = 0; i < safeText.length; i++) {
    process.stdout.write(safeText.charAt(i));
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, delayMs));
  }
  process.stdout.write("\n\n");
}

async function pulse(message: string, cycles = 6, intervalMs = 220) {
  if (!enableAnimations) {
    process.stdout.write(`${message}\n\n`);
    return;
  }
  const safeMessage = message ?? "";
  const frames = [" .", " ..", " ...", " ..", " .", ""];
  for (let i = 0; i < cycles; i++) {
    process.stdout.write(`\r${safeMessage}${frames[i % frames.length]} `);
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  process.stdout.write(`\r${safeMessage}   \n\n`);
}

// ---------- Step Runner with Animated Progress ----------
async function runStep(step: Step) {
  const frames = [" .", " ..", " ...", " ...."];
  let i = 0;
  const start = Date.now();

  process.stdout.write(`\n[STEP] ${step.label}`);
  const interval = setInterval(() => {
    process.stdout.write(`\r[STEP] ${step.label}${frames[i % frames.length]}`);
    i++;
  }, 200);
  interval.unref?.();

  const timeoutPromise =
    step.maxDurationMs != null
      ? new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error("Step timed out")), step.maxDurationMs)
        )
      : null;

  try {
    const taskPromise = step.task();
    await (timeoutPromise ? Promise.race([taskPromise, timeoutPromise]) : taskPromise);

    const elapsed = Date.now() - start;
    const minDuration = step.minDurationMs ?? 800;
    if (elapsed < minDuration) await new Promise((r) => setTimeout(r, minDuration - elapsed));

    clearInterval(interval);
    const doneMsg = `[STEP] ${step.label} DONE (${Date.now() - start}ms)`;
    process.stdout.write(`\r${doneMsg}\n\n`);
    logger.info(doneMsg);
  } catch (err: any) {
    clearInterval(interval);
    const failMsg = `[STEP] ${step.label} FAILED`;
    process.stdout.write(`\r${failMsg}\n\n`);
    logger.error(failMsg, { error: err });
    throw err;
  }
}

// ---------- Graceful Shutdown ----------
async function gracefulShutdown(reason: string) {
  if (isShuttingDown) {
    logger.warn("Shutdown already in progress", { reason });
    return;
  }
  isShuttingDown = true;

  await holdStdoutDuring(async () => {
    await typeOut(`\n[SHUTDOWN] Shutdown initiated by ${reason}`);
    await new Promise((r) => setTimeout(r, 50));
  });

  try {
    setReady(false);
  } catch (e) {
    logger.warn("Failed to set readiness to false", { error: e });
  }

  logger.warn(`[SHUTDOWN] Triggered by ${reason}. Starting graceful shutdown...`);

  const forceExitTimeout = setTimeout(() => {
    logger.error("[SHUTDOWN] Timeout reached. Forcing exit...");
    process.exit(1);
  }, 10_000);
  forceExitTimeout.unref?.();

  const shutdownSteps: Step[] = [
    {
      label: "Stop accepting new HTTP connections",
      task: async () => {
        if (!server) return;
        // stop accepting new connections — keep existing ones alive so they can finish
        server.close(() => {
          logger.info("HTTP server: stopped accepting new connections");
        });
      },
    },
    {
      label: "Stopping Socket.IO",
      task: async () => {
        if (socketShutdown) {
          try {
            await socketShutdown();
            logger.info("Socket.IO shutdown complete");
          } catch (e) {
            logger.warn("Socket.IO shutdown failed", { error: e });
          }
        }
      },
    },
    {
      label: "Stopping Redis stream consumers",
      task: async () => {
        try {
          await stopAllStreamConsumers();
        } catch (e) {
          logger.warn("Error stopping stream consumers", { error: e });
        }
      },
    },
    {
      label: "Closing Redis (clients & subscribers)",
      task: async () => {
        try {
          // shutdownRedis will quit the main client; also close the event-bus subscriber
          await shutdownRedis();

          try {
            // attempt to gracefully quit the event-bus _subscriber if present
            await (RedisEventBus._subscriber as any)?.quit?.();
          } catch (e) {
            logger.debug("Could not quit RedisEventBus._subscriber gracefully", { error: e });
            try {
              (RedisEventBus._subscriber as any)?.disconnect?.();
            } catch {}
          }
        } catch (e) {
          logger.warn("Error shutting down redis", { error: e });
        }
      },
    },
    {
      label: "Closing database connection",
      task: async () => {
        try {
          await prisma.$disconnect();
          logger.info("Prisma disconnected");
        } catch (e) {
          logger.warn("Error disconnecting Prisma", { error: e });
        }
      },
    },
    {
      label: "Final HTTP drain wait",
      task: async () => {
        // small extra wait so existing requests can finish, but not too long
        await new Promise((r) => setTimeout(r, 500));
      },
      minDurationMs: 100,
      maxDurationMs: 5000,
    },
  ];

  try {
    for (const step of shutdownSteps) await runStep(step);
    clearTimeout(forceExitTimeout);
    logger.info("[SHUTDOWN] Graceful shutdown complete.");
    await pulse("[SHUTDOWN] Complete — goodbye", 5, 180);
    setTimeout(() => process.exit(0), 200).unref();
  } catch (err) {
    clearTimeout(forceExitTimeout);
    logger.error("[SHUTDOWN] Error during shutdown", { error: err });
    setTimeout(() => process.exit(1), 200).unref();
  }
}


// ---------- Signal & Error Handlers ----------
process.once("SIGINT", () => gracefulShutdown("SIGINT"));
process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", { error: err });
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", { reason });
  gracefulShutdown("unhandledRejection");
});

// ---------- Server Bootstrap ----------
async function startServer() {
  await runStep({
    label: "Starting HTTP server",
    task: async () =>
      new Promise<void>((resolve, reject) => {
        server = http.createServer(app);

        // protect against slowloris
        server.keepAliveTimeout = 65_000; // 65s default
        server.headersTimeout = 70_000;

        server.listen(PORT, () => {
          logger.info(`HTTP server listening on port ${PORT}`);
          resolve();
        });
        server.on("error", reject);
      }),
  });

  // initialize Socket.IO adapter AFTER server is listening
  try {
    const socketHelpers = await setupSocketIO(server!);
    socketShutdown = socketHelpers.shutdown;
    logger.info("Socket.IO setup complete");
  } catch (e) {
    logger.warn("Socket.IO setup failed", { error: e });
    // decide whether to proceed or abort startup depending on how critical sockets are
  }

  await runStep({
    label: "Connecting to database",
    task: async () => {
      await prisma.$connect();
      logger.info("Prisma connected");
    },
  });

  setReady(true);
  logger.info("Application marked as READY");

  await pulse("[STARTUP] READY", 5, 180);

  logger.info("Startup sequence complete", {
    env: process.env.NODE_ENV,
    port: PORT,
    pid: process.pid,
    timestamp: new Date().toISOString(),
  });
}

// ---------- Entrypoint ----------
async function main() {
  try {
    setReady(false);
    await startServer();
  } catch (err) {
    logger.error("Fatal startup error", { error: err });
    await prisma.$disconnect();
    setTimeout(() => process.exit(1), 200).unref();
  }
}

main();
