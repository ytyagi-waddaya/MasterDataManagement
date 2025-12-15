// src/server.ts
import "dotenv/config";
import http from "http";
import logger from "./utils/logger.js";
import { prisma } from "./lib/prisma.js";
import { setReady } from "./utils/health.js";
import { config } from "./config/app.config.js";
import { ensureGroup } from "./redis/streams.js";
import { shutdownRedis } from "./redis/client.js";
import app from "./app.js";
import { createSocketServer } from "./socket/socket.server.js";

const PORT = Number.isNaN(config.PORT) ? 8000 : config.PORT;

let server: http.Server | undefined;
let socketServerShutdown: (() => Promise<void>) | undefined;

async function gracefulShutdown(reason: string) {
  logger.warn("[api] gracefulShutdown start", { reason });

  try {
    setReady(false);
  } catch (e) {
    logger.warn("[api] setReady(false) failed", { error: e });
  }

  // stop accepting new connections
  if (server) {
    await new Promise<void>((resolve) => server!.close(() => resolve()));
    logger.info("[api] stopped accepting new HTTP connections");
  }

  // shutdown socket (if set)
  if (socketServerShutdown) {
    try {
      await socketServerShutdown();
      logger.info("[api] socket shutdown complete");
    } catch (e) {
      logger.warn("[api] socket shutdown failed", { error: e });
    }
  }

  // DB + Redis disconnect
  try {
    await prisma.$disconnect();
    logger.info("[api] prisma disconnected");
  } catch (e) {
    logger.warn("[api] prisma disconnect failed", { error: e });
  }

  try {
    await shutdownRedis();
  } catch (e) {
    logger.warn("[api] shutdownRedis failed", { error: e });
  }

  logger.info("[api] gracefulShutdown complete");
  setTimeout(() => process.exit(0), 200).unref();
}

process.once("SIGINT", () => gracefulShutdown("SIGINT"));
process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("uncaughtException", (err) => {
  logger.error("[api] uncaughtException", { error: err });
  gracefulShutdown("uncaughtException");
});
process.on("unhandledRejection", (reason) => {
  logger.error("[api] unhandledRejection", { reason });
  gracefulShutdown("unhandledRejection");
});

async function start() {
  try {
    // create HTTP + socket (socket.server handles redis adapter & subscribe)
    const socket = createSocketServer(app);
    server = socket.server;
    socketServerShutdown = socket.shutdown;

    server.listen(PORT, async () => {
      logger.info(`[api] HTTP server listening on ${PORT}`);
      // ensure stream group exists (notifications stream)
      try {
        await ensureGroup();
        logger.info("[api] ensured redis consumer group");
      } catch (e) {
        logger.warn("[api] ensureGroup failed", { error: e });
      }

      // connect prisma
      try {
        await prisma.$connect();
        logger.info("[api] prisma connected");
      } catch (e) {
        logger.warn("[api] prisma connect failed", { error: e });
      }

      setReady(true);
      logger.info("[api] server marked ready");
    });

    // If createSocketServer returns a shutdown helper, capture it
    // The socket.server.ts file earlier didn't export shutdown helper; if you update it to export helper, assign here.
    // If createSocketServer returns the HTTP server only (as in your file), you don't need the socketServerShutdown.
  } catch (err) {
    logger.error("[api] startup failed", { error: err });
    await prisma.$disconnect();
    await shutdownRedis();
    process.exit(1);
  }
}

start();
