import { config } from "../config/app.config.js";
import { redis } from "../redis/client.js";
import { publishToUser } from "../redis/publisher.js";
import { ack, moveToDLQ } from "../redis/streams.js";
import logger from "../utils/logger.js";
import { DeliveryRepository } from "./delivery.repository.js";


async function processMessage(msgId: string, payload: any) {
  try {
    const deliveryId = payload.deliveryId;

    if (!deliveryId) {
      logger.warn("missing deliveryId", payload);
      return ack(msgId);
    }

    const delivery = await DeliveryRepository.findById(deliveryId);
    if (!delivery) {
      logger.warn("delivery missing in DB", deliveryId);
      return ack(msgId);
    }

    // Web-channel publish
    try {
      await publishToUser(delivery.userId!, {
        deliveryId: delivery.id,
        userId: delivery.userId,
        title: delivery.title,
        message: delivery.message,
        data: delivery.data,      // 🔥 JSON direct (no parse)
      });

      await DeliveryRepository.markSent(delivery.id);
      await DeliveryRepository.markDelivered(delivery.id);
      await ack(msgId);
    } catch (err: any) {
      await DeliveryRepository.markFailed(delivery.id, err.message);

      const updated = await DeliveryRepository.findById(delivery.id);
      if ((updated?.retryCount ?? 0) >= config.MAX_RETRY) {
        return moveToDLQ(msgId, payload, "MAX_RETRY");
      }

      await ack(msgId);
      await redis.xadd(
        config.STREAM_KEY,
        "*",
        "deliveryId",
        JSON.stringify(delivery.id),
        "retry",
        String((updated?.retryCount ?? 0) + 1)
      );
    }
  } catch (err) {
    logger.error("fatal worker error", err);
    await moveToDLQ(msgId, payload, "fatal");
  }
}
