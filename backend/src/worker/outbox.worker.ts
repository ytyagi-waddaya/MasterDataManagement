// // src/workers/outbox.worker.ts
// import "dotenv/config";
// import { prisma } from "../lib/prisma.js";
// import { logger } from "../utils/logger.js";
// import { OutboxRepository } from "../outbox/outbox.repository.js";
// import { addToStream } from "../redis/streams.js";
// import { appPub } from "../redis/client.js";
// import { BroadcastPayload } from "../events/event.registry.js";
// import { config } from "../config/app.config.js";
// import { setReady } from "../utils/health.js";
// import { DeliveryService } from "../notifications/delivery.service.js";

// let running = true;
// process.once("SIGINT", () => shutdown("SIGINT"));
// process.once("SIGTERM", () => shutdown("SIGTERM"));

// async function shutdown(reason = "signal") {
//   running = false;
//   logger.info("[outbox.worker] shutdown", { reason });
//   try {
//     await prisma.$disconnect();
//   } catch (e) {
//     logger.warn("[outbox.worker] prisma disconnect failed", { error: e });
//   }
//   process.exit(0);
// }

// async function publishToRedis(evt: BroadcastPayload) {
//   logger.info("[RT][outbox.worker] publishing to redis", {
//     event: evt.event,
//     resource: evt.payload?.resource,
//   });
//   // durable: push to stream
//   await addToStream({ event: evt });

//   // realtime pub/sub broadcast
//   await appPub.publish("erp:events", JSON.stringify(evt));
// }

// async function processBatch(limit = 50) {
//   const pending = (await prisma.$queryRawUnsafe(
//     `SELECT * FROM "OutboxEvent" WHERE "processedAt" IS NULL ORDER BY "createdAt" ASC LIMIT ${limit} FOR UPDATE SKIP LOCKED`
//   )) as any[];

//   logger.info("[RT][outbox.worker] pending events", {
//     count: pending.length,
//   });

//   for (const row of pending) {
//     const id = row.id;
//     logger.info("[RT][outbox.worker] processing event", {
//       id: row.id,
//       event: row.eventName,
//       entity: row.entity,
//       resource: row.payload?.resource,
//     });

//     try {
//       await OutboxRepository.lock(id);

//       const evt: BroadcastPayload = {
//         entity: row.entity,
//         action: row.action,
//         event: row.eventName,
//         payload: row.payload,
//         tenantId: row.tenantId ?? null,
//         targetUsers: row.targetUsers ? JSON.parse(row.targetUsers) : [],
//         actorId: row.payload?.actorId ?? null,
//         timestamp: new Date().toISOString(),
//         outboxId: row.id,
//       };

//       // ----------------------------------------
//       // 1️⃣ Publish workflow event (same as before)
//       // ----------------------------------------
//       await publishToRedis(evt);

//       if (evt.entity === "notification" && evt.action === "created") {
//         logger.info("[RT][outbox.worker] handling notification event", {
//           outboxId: evt.outboxId,
//         });

//         const { title, message, data } = evt.payload;

//         const targetUsers =
//           evt.targetUsers && evt.targetUsers.length > 0 ? evt.targetUsers : [];

//         if (targetUsers.length === 0) {
//           logger.warn("[RT][outbox.worker] no target users for notification", {
//             outboxId: evt.outboxId,
//           });
//         }  

//         for (const userId of targetUsers) {
//           await DeliveryService.createAndDispatch({
//             userId,
//             title,
//             message,
//             data,
//             channels: ["WEB"],
//           });
//         }
//       }

//       // ----------------------------------------

//       // ----------------------------------------
//       // 3️⃣ Mark Outbox Event Processed (same as before)
//       // ----------------------------------------
//       await OutboxRepository.markProcessed(id);

//       await OutboxRepository.writeEventLog({
//         outboxId: id,
//         eventName: row.eventName,
//         payload: row.payload,
//         result: "success",
//       });
//     } catch (err: any) {
//       logger.error("[outbox.worker] processing failed", { id, err });

//       try {
//         await OutboxRepository.incrementAttempts(id);
//         const current = await prisma.outboxEvent.findUnique({ where: { id } });

//         if (
//           current &&
//           (current.attempts ?? 0) >= (current.maxAttempts ?? config.MAX_RETRY)
//         ) {
//           await appPub.publish(
//             "erp:events:dlq",
//             JSON.stringify({ outboxId: id, error: String(err) })
//           );
//           await OutboxRepository.moveToFailed(id);

//           await OutboxRepository.writeEventLog({
//             outboxId: id,
//             eventName: row.eventName,
//             payload: row.payload,
//             result: "failed to deliver (DLQ)",
//           });
//         }
//       } catch (e) {
//         logger.error("[outbox.worker] failed to update attempts/dlq", {
//           id,
//           error: e,
//         });
//       }
//     }
//   }
// }

// export async function runOutboxWorker() {
//   setReady(true);
//   logger.info("[outbox.worker] started");

//   while (running) {
//     try {
//       await processBatch(50);
//       await new Promise((r) => setTimeout(r, 500));
//     } catch (err) {
//       logger.error("[outbox.worker] loop error", { err });
//       await new Promise((r) => setTimeout(r, 1000));
//     }
//   }
// }

// // if (require.main === module) {
// runOutboxWorker().catch(async (e) => {
//   logger.error("[outbox.worker] fatal", { e });
//   await shutdown("fatal");
// });
// // }

// src/workers/outbox.worker.ts
import "dotenv/config";
import { prisma } from "../lib/prisma.js";
import { logger } from "../utils/logger.js";
import { OutboxRepository } from "../outbox/outbox.repository.js";
import { addToStream } from "../redis/streams.js";
import { appPub, USE_REDIS } from "../redis/client.js";
import { BroadcastPayload } from "../events/event.registry.js";
import { config } from "../config/app.config.js";
import { setReady } from "../utils/health.js";
import { DeliveryService } from "../notifications/delivery.service.js";

let running = true;
process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

async function shutdown(reason = "signal") {
  running = false;
  logger.info("[outbox.worker] shutdown", { reason });

  try {
    await prisma.$disconnect();
  } catch (e) {
    logger.warn("[outbox.worker] prisma disconnect failed", { error: e });
  }

  process.exit(0);
}

/* ======================================================
   Redis publish helpers
====================================================== */

async function publishToRedis(evt: BroadcastPayload) {
  logger.info("[RT][outbox.worker] publishing to redis", {
    event: evt.event,
    resource: evt.payload?.resource,
  });

  // 1️⃣ durable: push to stream (already guarded inside addToStream)
  await addToStream({ event: evt });

  // 2️⃣ realtime pub/sub broadcast
  if (!USE_REDIS || !appPub) {
    logger.warn("[outbox.worker] redis disabled, skipping pubsub");
    return;
  }

  try {
    await appPub.publish("erp:events", JSON.stringify(evt));
  } catch (err) {
    logger.error("[outbox.worker] pubsub publish failed", err);
  }
}

/* ======================================================
   Batch processor
====================================================== */

async function processBatch(limit = 50) {
  const pending = (await prisma.$queryRawUnsafe(
    `SELECT * FROM "OutboxEvent" WHERE "processedAt" IS NULL ORDER BY "createdAt" ASC LIMIT ${limit} FOR UPDATE SKIP LOCKED`
  )) as any[];

  logger.info("[RT][outbox.worker] pending events", {
    count: pending.length,
  });

  for (const row of pending) {
    const id = row.id;

    logger.info("[RT][outbox.worker] processing event", {
      id: row.id,
      event: row.eventName,
      entity: row.entity,
      resource: row.payload?.resource,
    });

    try {
      await OutboxRepository.lock(id);

      const evt: BroadcastPayload = {
        entity: row.entity,
        action: row.action,
        event: row.eventName,
        payload: row.payload,
        tenantId: row.tenantId ?? null,
        targetUsers: row.targetUsers ? JSON.parse(row.targetUsers) : [],
        actorId: row.payload?.actorId ?? null,
        timestamp: new Date().toISOString(),
        outboxId: row.id,
      };

      // ----------------------------------------
      // 1️⃣ Publish workflow event
      // ----------------------------------------
      await publishToRedis(evt);

      // ----------------------------------------
      // 2️⃣ Notification fan-out
      // ----------------------------------------
      if (evt.entity === "notification" && evt.action === "created") {
        logger.info("[RT][outbox.worker] handling notification event", {
          outboxId: evt.outboxId,
        });

        const { title, message, data } = evt.payload;

        const targetUsers =
          evt.targetUsers && evt.targetUsers.length > 0
            ? evt.targetUsers
            : [];

        if (targetUsers.length === 0) {
          logger.warn(
            "[RT][outbox.worker] no target users for notification",
            { outboxId: evt.outboxId }
          );
        }

        for (const userId of targetUsers) {
          await DeliveryService.createAndDispatch({
            userId,
            title,
            message,
            data,
            channels: ["WEB"],
          });
        }
      }

      // ----------------------------------------
      // 3️⃣ Mark Outbox Event Processed
      // ----------------------------------------
      await OutboxRepository.markProcessed(id);

      await OutboxRepository.writeEventLog({
        outboxId: id,
        eventName: row.eventName,
        payload: row.payload,
        result: "success",
      });
    } catch (err: any) {
      logger.error("[outbox.worker] processing failed", { id, err });

      try {
        await OutboxRepository.incrementAttempts(id);
        const current = await prisma.outboxEvent.findUnique({
          where: { id },
        });

        if (
          current &&
          (current.attempts ?? 0) >=
            (current.maxAttempts ?? config.MAX_RETRY)
        ) {
          // DLQ publish (guarded)
          if (USE_REDIS && appPub) {
            try {
              await appPub.publish(
                "erp:events:dlq",
                JSON.stringify({ outboxId: id, error: String(err) })
              );
            } catch (e) {
              logger.error("[outbox.worker] dlq publish failed", e);
            }
          }

          await OutboxRepository.moveToFailed(id);

          await OutboxRepository.writeEventLog({
            outboxId: id,
            eventName: row.eventName,
            payload: row.payload,
            result: "failed to deliver (DLQ)",
          });
        }
      } catch (e) {
        logger.error("[outbox.worker] failed to update attempts/dlq", {
          id,
          error: e,
        });
      }
    }
  }
}

/* ======================================================
   Worker loop
====================================================== */

export async function runOutboxWorker() {
  setReady(true);
  logger.info("[outbox.worker] started");

  while (running) {
    try {
      await processBatch(50);
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      logger.error("[outbox.worker] loop error", { err });
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

// auto-run
runOutboxWorker().catch(async (e) => {
  logger.error("[outbox.worker] fatal", { e });
  await shutdown("fatal");
});
