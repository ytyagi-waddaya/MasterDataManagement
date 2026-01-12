// // src/worker/stream.reclaimer.worker.ts
// import "dotenv/config";
// import { redis } from "../redis/client.js";
// import { logger } from "../utils/logger.js";
// import { setReady } from "../utils/health.js";

// let running = true;

// /* -----------------------------------
//  * Graceful Shutdown
//  * ----------------------------------- */
// async function shutdown(reason: string = "signal") {
//   running = false;

//   logger.info("[eventbus.worker] shutdown triggered", { reason });

//   try {
//     await redis.quit();
//   } catch (err) {
//     logger.warn("[eventbus.worker] redis.quit failed", {
//       error: err instanceof Error ? err.message : String(err),
//     });
//   }

//   process.exit(0);
// }

// process.once("SIGINT", () => shutdown("SIGINT"));
// process.once("SIGTERM", () => shutdown("SIGTERM"));

// /* -----------------------------------
//  * Worker Main Loop
//  * ----------------------------------- */
// async function loop() {
//   setReady(true);

//   const sub = redis.duplicate();

//   await sub.connect?.().catch((err:any) => {
//     logger.warn("[eventbus.worker] duplicate connect failed", {
//       error: err instanceof Error ? err.message : String(err),
//     });
//   });

//   /* -----------------------------------
//    * Subscribe to channels (NO CALLBACK!)
//    * ----------------------------------- */
//   await sub.subscribe("erp:events");
//   await sub.subscribe("erp:events:dlq");

//   logger.info("[eventbus.worker] subscriptions active");

//   /* -----------------------------------
//    * Message Listener
//    * ----------------------------------- */
//   sub.on("message", (channel: string, message: string) => {
//     if (channel === "erp:events") {
//       try {
//         const evt = JSON.parse(message);
//         logger.debug("[eventbus.worker] received event", evt);

//         // Future: webhooks, integrations, analytics, etc.
//       } catch (err) {
//         logger.warn("[eventbus.worker] JSON parse failed", {
//           error: err instanceof Error ? err.message : String(err),
//           raw: message,
//         });
//       }
//     }

//     if (channel === "erp:events:dlq") {
//       logger.warn("[eventbus.worker] DLQ message received", {
//         message,
//       });
//     }
//   });

//   /* -----------------------------------
//    * Idle Loop
//    * ----------------------------------- */
//   while (running) {
//     await new Promise((r) => setTimeout(r, 1000));
//   }

//   await sub.quit();
// }

// /* -----------------------------------
//  * Fatal boot error
//  * ----------------------------------- */
// loop().catch(async (err) => {
//   logger.error("[eventbus.worker] fatal error in loop", {
//     error: err instanceof Error ? err.stack ?? err.message : String(err),
//   });
//   await shutdown("fatal");
// });

// src/worker/stream.reclaimer.worker.ts
import "dotenv/config";
import { redis } from "../redis/client.js";
import { logger } from "../utils/logger.js";
import { setReady } from "../utils/health.js";

let running = true;

/* -----------------------------------
 * Graceful Shutdown
 * ----------------------------------- */
async function shutdown(reason: string = "signal") {
  running = false;

  logger.info("[eventbus.worker] shutdown triggered", { reason });

  try {
    if (redis) {
      await redis.quit();
    }
  } catch (err) {
    logger.warn("[eventbus.worker] redis.quit failed", {
      error: err instanceof Error ? err.message : String(err),
    });
  }

  process.exit(0);
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

/* -----------------------------------
 * Worker Main Loop
 * ----------------------------------- */
async function loop() {
  setReady(true);

  if (!redis) {
    logger.warn(
      "[eventbus.worker] redis disabled, stream reclaimer not started"
    );
    return;
  }

  const sub = redis.duplicate();

  try {
    await sub.connect?.();
  } catch (err: any) {
    logger.warn("[eventbus.worker] duplicate connect failed", {
      error: err instanceof Error ? err.message : String(err),
    });
  }

  /* -----------------------------------
   * Subscribe to channels (NO CALLBACK!)
   * ----------------------------------- */
  try {
    await sub.subscribe("erp:events");
    await sub.subscribe("erp:events:dlq");
  } catch (err) {
    logger.error("[eventbus.worker] subscribe failed", err);
  }

  logger.info("[eventbus.worker] subscriptions active");

  /* -----------------------------------
   * Message Listener
   * ----------------------------------- */
  sub.on("message", (channel: string, message: string) => {
    if (channel === "erp:events") {
      try {
        const evt = JSON.parse(message);
        logger.debug("[eventbus.worker] received event", evt);

        // Future: webhooks, integrations, analytics, etc.
      } catch (err) {
        logger.warn("[eventbus.worker] JSON parse failed", {
          error: err instanceof Error ? err.message : String(err),
          raw: message,
        });
      }
    }

    if (channel === "erp:events:dlq") {
      logger.warn("[eventbus.worker] DLQ message received", {
        message,
      });
    }
  });

  /* -----------------------------------
   * Idle Loop
   * ----------------------------------- */
  while (running) {
    await new Promise((r) => setTimeout(r, 1000));
  }

  try {
    await sub.quit();
  } catch (err) {
    logger.warn("[eventbus.worker] sub quit failed", {
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

/* -----------------------------------
 * Fatal boot error
 * ----------------------------------- */
loop().catch(async (err) => {
  logger.error("[eventbus.worker] fatal error in loop", {
    error: err instanceof Error ? err.stack ?? err.message : String(err),
  });
  await shutdown("fatal");
});
