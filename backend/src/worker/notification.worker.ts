// // src/workers/notification.worker.ts
// import "dotenv/config";
// import { readGroup, ack, moveToDLQ } from "../redis/streams.js";
// import { config } from "../config/app.config.js";
// import { NotificationRepository } from "../notifications/notification.repository.js";
// import { logger } from "../utils/logger.js";
// import { publishToUser } from "../redis/publisher.js";
// import { sendEmail } from "../notifications/channels/email.channel.js";
// import { sendSms } from "../notifications/channels/sms.channel.js";
// import { redis } from "../redis/client.js";
// import { setReady } from "../utils/health.js";
// import { NotificationChannel } from "../../prisma/generated/enums.js";

// let running = true;
// process.once("SIGINT", () => shutdown("SIGINT"));
// process.once("SIGTERM", () => shutdown("SIGTERM"));

// async function shutdown(reason = "signal") {
//   running = false;
//   logger.info("[notification.worker] shutdown", { reason });
//   try {
//     await redis.quit();
//   } catch (e) {
//     logger.warn("[notification.worker] redis quit failed", { error: e });
//   }
//   process.exit(0);
// }

// function normalizeChannels(raw: any): NotificationChannel[] {
//   const arr = Array.isArray(raw)
//     ? raw.filter(
//         (v): v is NotificationChannel =>
//           typeof v === "string" &&
//           Object.values(NotificationChannel).includes(v as NotificationChannel)
//       )
//     : [];
//   return arr.length ? arr : [NotificationChannel.WEB];
// }

// async function processMessage(msgId: string, payload: any) {
//   try {
//     const deliveryId = payload.deliveryId;
//     if (!deliveryId) {
//       logger.warn("[notification.worker] missing deliveryId", msgId, payload);
//       await ack(msgId);
//       return;
//     }

//     const delivery = await NotificationRepository.findDeliveryById(deliveryId);
//     if (!delivery) {
//       logger.warn("[notification.worker] delivery not found", deliveryId);
//       await ack(msgId);
//       return;
//     }

//     if (delivery.scheduledAt && new Date(delivery.scheduledAt) > new Date()) {
//       logger.info("[notification.worker] scheduled for future, skipping", {
//         id: delivery.id,
//       });
//       await ack(msgId);
//       return;
//     }

//     const channels = normalizeChannels(delivery.channels);

//     for (const ch of channels) {
//       try {
//         if (ch === NotificationChannel.WEB) {
//           await publishToUser(delivery.userId!, {
//             deliveryId: delivery.id,
//             userId: delivery.userId,
//             title: delivery.title,
//             message: delivery.message,
//             data: delivery.data ?? null,
//             channel: NotificationChannel.WEB,
//           });
//         } else if (ch === NotificationChannel.EMAIL) {
//           await sendEmail(
//             String(delivery.userId),
//             delivery.title,
//             delivery.message
//           );
//         } else if (ch === NotificationChannel.SMS) {
//           await sendSms(String(delivery.userId), delivery.message);
//         } else {
//           logger.warn("[notification.worker] unknown channel", ch);
//         }
//       } catch (err: any) {
//         logger.error("[notification.worker] channel failed", {
//           channel: ch,
//           id: delivery.id,
//           err: err?.message ?? err,
//         });
//         await NotificationRepository.markFailed(
//           delivery.id,
//           err?.message ?? String(err)
//         );
//         const updated = await NotificationRepository.findDeliveryById(
//           delivery.id
//         );
//         if ((updated?.retryCount ?? 0) >= config.MAX_RETRY) {
//           await moveToDLQ(msgId, payload, `retries>=${config.MAX_RETRY}`);
//           return;
//         } else {
//           await ack(msgId);
//           await redis.xadd(
//             config.STREAM_KEY,
//             "*",
//             "deliveryId",
//             delivery.id,
//             "retry",
//             String((updated?.retryCount ?? 0) + 1)
//           );
//           return;
//         }
//       }
//     }

//     await NotificationRepository.markSent(delivery.id);
//     await NotificationRepository.markDelivered(delivery.id);
//     await ack(msgId);
//   } catch (err: any) {
//     logger.error("[notification.worker] fatal", err);
//     await moveToDLQ(msgId, payload, "fatal");
//   }
// }

// export async function runNotificationWorker() {
//   setReady(true);
//   logger.info("[notification.worker] started");
//   while (running) {
//     try {
//       const res: any = await readGroup(
//         config.CONSUMER_NAME,
//         10,
//         2000,
//         config.NOTIFICATION_STREAM
//       );

//       if (!res) {
//         await new Promise((r) => setTimeout(r, 200));
//         continue;
//       }
//       for (const [_stream, messages] of res) {
//         for (const [id, keyvals] of messages) {
//           const obj: any = {};
//           for (let i = 0; i < keyvals.length; i += 2) {
//             const k = keyvals[i];
//             let v = keyvals[i + 1];
//             try {
//               v = JSON.parse(v);
//             } catch (_) {}
//             obj[k] = v;
//           }
//           await processMessage(id as string, obj);
//         }
//       }
//     } catch (err) {
//       logger.error("[notification.worker] loop failed", { err });
//       await new Promise((r) => setTimeout(r, 500));
//     }
//   }
// }

// if (require.main === module) {
//   runNotificationWorker().catch(async (e) => {
//     logger.error("[notification.worker] fatal", { e });
//     await shutdown("fatal");
//   });
// }

// src/workers/notification.worker.ts
import "dotenv/config";
import { readGroup, ack, moveToDLQ } from "../redis/streams.js";
import { config } from "../config/app.config.js";
import { NotificationRepository } from "../notifications/notification.repository.js";
import { logger } from "../utils/logger.js";
import { publishToUser } from "../redis/publisher.js";
import { sendEmail } from "../notifications/channels/email.channel.js";
import { sendSms } from "../notifications/channels/sms.channel.js";
import { redis } from "../redis/client.js";
import { setReady } from "../utils/health.js";
import { NotificationChannel } from "../../prisma/generated/enums.js";

let running = true;
process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

async function shutdown(reason = "signal") {
  running = false;
  logger.info("[notification.worker] shutdown", { reason });

  try {
    if (redis) {
      await redis.quit();
    }
  } catch (e) {
    logger.warn("[notification.worker] redis quit failed", { error: e });
  }

  process.exit(0);
}

function normalizeChannels(raw: any): NotificationChannel[] {
  const arr = Array.isArray(raw)
    ? raw.filter(
        (v): v is NotificationChannel =>
          typeof v === "string" &&
          Object.values(NotificationChannel).includes(v as NotificationChannel)
      )
    : [];
  return arr.length ? arr : [NotificationChannel.WEB];
}

async function processMessage(msgId: string, payload: any) {
  try {
    const deliveryId = payload.deliveryId;
    if (!deliveryId) {
      logger.warn("[notification.worker] missing deliveryId", msgId, payload);
      await ack(msgId);
      return;
    }

    const delivery = await NotificationRepository.findDeliveryById(deliveryId);
    if (!delivery) {
      logger.warn("[notification.worker] delivery not found", deliveryId);
      await ack(msgId);
      return;
    }

    if (delivery.scheduledAt && new Date(delivery.scheduledAt) > new Date()) {
      logger.info("[notification.worker] scheduled for future, skipping", {
        id: delivery.id,
      });
      await ack(msgId);
      return;
    }

    const channels = normalizeChannels(delivery.channels);

    for (const ch of channels) {
      try {
        if (ch === NotificationChannel.WEB) {
          await publishToUser(delivery.userId!, {
            deliveryId: delivery.id,
            userId: delivery.userId,
            title: delivery.title,
            message: delivery.message,
            data: delivery.data ?? null,
            channel: NotificationChannel.WEB,
          });
        } else if (ch === NotificationChannel.EMAIL) {
          await sendEmail(
            String(delivery.userId),
            delivery.title,
            delivery.message
          );
        } else if (ch === NotificationChannel.SMS) {
          await sendSms(String(delivery.userId), delivery.message);
        } else {
          logger.warn("[notification.worker] unknown channel", ch);
        }
      } catch (err: any) {
        logger.error("[notification.worker] channel failed", {
          channel: ch,
          id: delivery.id,
          err: err?.message ?? err,
        });

        await NotificationRepository.markFailed(
          delivery.id,
          err?.message ?? String(err)
        );

        const updated = await NotificationRepository.findDeliveryById(
          delivery.id
        );

        if ((updated?.retryCount ?? 0) >= config.MAX_RETRY) {
          await moveToDLQ(msgId, payload, `retries>=${config.MAX_RETRY}`);
          return;
        } else {
          await ack(msgId);

          if (!redis) {
            logger.warn(
              "[notification.worker] redis disabled, cannot requeue"
            );
            return;
          }

          await redis.xadd(
            config.STREAM_KEY,
            "*",
            "deliveryId",
            delivery.id,
            "retry",
            String((updated?.retryCount ?? 0) + 1)
          );
          return;
        }
      }
    }

    await NotificationRepository.markSent(delivery.id);
    await NotificationRepository.markDelivered(delivery.id);
    await ack(msgId);
  } catch (err: any) {
    logger.error("[notification.worker] fatal", err);
    await moveToDLQ(msgId, payload, "fatal");
  }
}

export async function runNotificationWorker() {
  setReady(true);
  logger.info("[notification.worker] started");

  while (running) {
    try {
      const res: any = await readGroup(
        config.CONSUMER_NAME,
        10,
        2000,
        config.NOTIFICATION_STREAM
      );

      if (!res) {
        await new Promise((r) => setTimeout(r, 200));
        continue;
      }

      for (const [_stream, messages] of res) {
        for (const [id, keyvals] of messages) {
          const obj: any = {};
          for (let i = 0; i < keyvals.length; i += 2) {
            const k = keyvals[i];
            let v = keyvals[i + 1];
            try {
              v = JSON.parse(v);
            } catch (_) {}
            obj[k] = v;
          }
          await processMessage(id as string, obj);
        }
      }
    } catch (err) {
      logger.error("[notification.worker] loop failed", { err });
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}

if (require.main === module) {
  runNotificationWorker().catch(async (e) => {
    logger.error("[notification.worker] fatal", { e });
    await shutdown("fatal");
  });
}
