// // src/notifications/notification.worker.ts
// import "dotenv/config";
// import { readGroup, ack, moveToDLQ } from "../redis/streams.js";
// import { config } from "../config/app.config.js";
// import { NotificationRepository } from "./notification.repository.js";
// import { logger } from "../utils/logger.js";
// import { publishToUser } from "../redis/publisher.js";
// import { sendEmail } from "./channels/email.channel.js";
// import { sendSms } from "./channels/sms.channel.js";
// import { redis } from "../redis/client.js";
// import { NotificationChannel } from "../../prisma/generated/enums.js";
// const CONSUMER = config.CONSUMER_NAME;
// /**
//  * Parse Redis keyvals into a structured object
//  */
// function parseKeyVals(keyvals: any[]): any {
//   const obj: Record<string, any> = {};
//   for (let i = 0; i < keyvals.length; i += 2) {
//     const k = keyvals[i];
//     let v = keyvals[i + 1];
//     try {
//       v = JSON.parse(v);
//     } catch (_) {}
//     obj[k] = v;
//   }
//   return obj;
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
//     // Scheduled check
//     if (delivery.scheduledAt && new Date(delivery.scheduledAt) > new Date()) {
//       logger.info(
//         "[notification.worker] scheduled for future, skipping",
//         delivery.id
//       );
//       await ack(msgId);
//       return;
//     }
//     // Normalize Prisma Json (safe)
//     const raw = delivery.channels;
//     const channels: NotificationChannel[] = Array.isArray(raw)
//       ? raw.filter(
//           (v): v is NotificationChannel =>
//             typeof v === "string" &&
//             Object.values(NotificationChannel).includes(
//               v as NotificationChannel
//             )
//         )
//       : [];
//     // default if empty
//     if (channels.length === 0) {
//       channels.push(NotificationChannel.WEB);
//     }
//     // Process channels
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
//     // Mark success
//     await NotificationRepository.markSent(delivery.id);
//     await NotificationRepository.markDelivered(delivery.id);
//     await ack(msgId);
//   } catch (err: any) {
//     logger.error("[notification.worker] fatal error", err);
//     await moveToDLQ(msgId, payload, "fatal");
//   }
// }
// export async function runNotificationWorker() {
//   logger.info("[notification.worker] started", {
//     stream: config.STREAM_KEY,
//     group: config.STREAM_DGROUP,
//     consumer: CONSUMER,
//   });
//   while (true) {
//     try {
//       const res: any = await readGroup(CONSUMER, 10, 2000);
//       if (!res) continue;
//       for (const [_stream, messages] of res) {
//         for (const [id, keyvals] of messages) {
//           const obj = parseKeyVals(keyvals);
//           await processMessage(id as string, obj);
//         }
//       }
//     } catch (err) {
//       logger.error("[notification.worker] loop failed", err);
//       await new Promise((r) => setTimeout(r, 2000));
//     }
//   }
// }
// src/notifications/notification.worker.ts
import "dotenv/config";
import { readGroup, ack, moveToDLQ } from "../redis/streams.js";
import { config } from "../config/app.config.js";
import { NotificationRepository } from "./notification.repository.js";
import { logger } from "../utils/logger.js";
import { publishToUser } from "../redis/publisher.js";
import { sendEmail } from "./channels/email.channel.js";
import { sendSms } from "./channels/sms.channel.js";
import { redis } from "../redis/client.js";
import { NotificationChannel } from "../../prisma/generated/enums.js";
const CONSUMER = config.CONSUMER_NAME;
/* -----------------------------------
   Parse Redis keyvals
----------------------------------- */
function parseKeyVals(keyvals) {
    const obj = {};
    for (let i = 0; i < keyvals.length; i += 2) {
        const k = keyvals[i];
        let v = keyvals[i + 1];
        try {
            v = JSON.parse(v);
        }
        catch (_) { }
        obj[k] = v;
    }
    return obj;
}
/* -----------------------------------
   Process single message
----------------------------------- */
async function processMessage(msgId, payload) {
    logger.debug("[notification.worker] received stream message", {
        msgId,
        payload,
    }); // 🆕 DEBUG
    try {
        const deliveryId = payload.deliveryId;
        if (!deliveryId) {
            logger.warn("[notification.worker] missing deliveryId", {
                msgId,
                payload,
            });
            await ack(msgId);
            return;
        }
        logger.debug("[notification.worker] fetching delivery", {
            deliveryId,
        }); // 🆕 DEBUG
        const delivery = await NotificationRepository.findDeliveryById(deliveryId);
        if (!delivery) {
            logger.warn("[notification.worker] delivery not found", {
                deliveryId,
            });
            await ack(msgId);
            return;
        }
        logger.info("[notification.worker] processing delivery", {
            id: delivery.id,
            userId: delivery.userId,
            channels: delivery.channels,
        }); // 🆕 INFO
        /* -----------------------------------
           Scheduled check
        ----------------------------------- */
        if (delivery.scheduledAt && new Date(delivery.scheduledAt) > new Date()) {
            logger.info("[notification.worker] scheduled for future, skipping", {
                deliveryId: delivery.id,
                scheduledAt: delivery.scheduledAt,
            });
            await ack(msgId);
            return;
        }
        /* -----------------------------------
           Normalize channels
        ----------------------------------- */
        const raw = delivery.channels;
        const channels = Array.isArray(raw)
            ? raw.filter((v) => typeof v === "string" &&
                Object.values(NotificationChannel).includes(v))
            : [];
        if (channels.length === 0) {
            channels.push(NotificationChannel.WEB);
        }
        logger.debug("[notification.worker] resolved channels", {
            deliveryId: delivery.id,
            channels,
        }); // 🆕 DEBUG
        /* -----------------------------------
           Deliver per channel
        ----------------------------------- */
        for (const ch of channels) {
            logger.debug("[notification.worker] delivering channel", {
                deliveryId: delivery.id,
                channel: ch,
            }); // 🆕 DEBUG
            try {
                if (ch === NotificationChannel.WEB) {
                    await publishToUser(delivery.userId, {
                        deliveryId: delivery.id,
                        userId: delivery.userId,
                        title: delivery.title,
                        message: delivery.message,
                        data: delivery.data ?? null,
                        channel: NotificationChannel.WEB,
                    });
                    logger.info("[notification.worker] WEB delivered", {
                        deliveryId: delivery.id,
                        userId: delivery.userId,
                    }); // 🆕 INFO
                }
                else if (ch === NotificationChannel.EMAIL) {
                    await sendEmail(String(delivery.userId), delivery.title, delivery.message);
                    logger.info("[notification.worker] EMAIL delivered", {
                        deliveryId: delivery.id,
                    }); // 🆕 INFO
                }
                else if (ch === NotificationChannel.SMS) {
                    await sendSms(String(delivery.userId), delivery.message);
                    logger.info("[notification.worker] SMS delivered", {
                        deliveryId: delivery.id,
                    }); // 🆕 INFO
                }
                else {
                    logger.warn("[notification.worker] unknown channel", {
                        channel: ch,
                        deliveryId: delivery.id,
                    });
                }
            }
            catch (err) {
                logger.error("[notification.worker] channel failed", {
                    channel: ch,
                    deliveryId: delivery.id,
                    error: err?.message ?? err,
                });
                await NotificationRepository.markFailed(delivery.id, err?.message ?? String(err));
                const updated = await NotificationRepository.findDeliveryById(delivery.id);
                if ((updated?.retryCount ?? 0) >= config.MAX_RETRY) {
                    logger.error("[notification.worker] moved to DLQ", {
                        deliveryId: delivery.id,
                        retries: updated?.retryCount,
                    }); // 🆕 ERROR
                    await moveToDLQ(msgId, payload, `retries>=${config.MAX_RETRY}`);
                    return;
                }
                else {
                    logger.warn("[notification.worker] retrying delivery", {
                        deliveryId: delivery.id,
                        retryCount: (updated?.retryCount ?? 0) + 1,
                    }); // 🆕 WARN
                    await ack(msgId);
                    await redis.xadd(config.STREAM_KEY, "*", "deliveryId", delivery.id, "retry", String((updated?.retryCount ?? 0) + 1));
                    return;
                }
            }
        }
        /* -----------------------------------
           Mark success
        ----------------------------------- */
        await NotificationRepository.markSent(delivery.id);
        await NotificationRepository.markDelivered(delivery.id);
        await ack(msgId);
        logger.info("[notification.worker] delivery completed", {
            deliveryId: delivery.id,
        }); // 🆕 INFO
    }
    catch (err) {
        logger.error("[notification.worker] fatal error", {
            msgId,
            payload,
            error: err?.stack ?? err,
        });
        await moveToDLQ(msgId, payload, "fatal");
    }
}
/* -----------------------------------
   Worker loop
----------------------------------- */
export async function runNotificationWorker() {
    logger.info("[notification.worker] started", {
        stream: config.STREAM_KEY,
        group: config.STREAM_DGROUP,
        consumer: CONSUMER,
    });
    while (true) {
        try {
            const res = await readGroup(CONSUMER, 10, 2000);
            if (!res) {
                logger.debug("[notification.worker] no messages"); // 🆕 DEBUG
                continue;
            }
            for (const [_stream, messages] of res) {
                for (const [id, keyvals] of messages) {
                    logger.debug("[notification.worker] handling message", { id }); // 🆕 DEBUG
                    const obj = parseKeyVals(keyvals);
                    await processMessage(id, obj);
                }
            }
        }
        catch (err) {
            logger.error("[notification.worker] loop failed", {
                error: err,
            });
            await new Promise((r) => setTimeout(r, 2000));
        }
    }
}
//# sourceMappingURL=notification.worker.js.map