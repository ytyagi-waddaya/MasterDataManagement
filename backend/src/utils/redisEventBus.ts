// src/utils/redisEventBus.ts
import { redisClient, redisConfig } from "./redis";
import Redis from "ioredis";
import logger from "./logger";

/**
 * Dedicated subscriber for pub/sub to avoid blocking the primary client.
 * Reuse redisConfig for consistent options.
 */
const subscriber = new Redis(redisConfig);

subscriber.on("error", (err) => logger.error("Redis subscriber error", { err }));
subscriber.on("end", () => logger.info("Redis subscriber disconnected"));

type EventPayload = Record<string, any>;

export const RedisEventBus = {
  async publish(channel: string, payload: EventPayload) {
    try {
      const message = JSON.stringify(payload);
      await redisClient.publish(channel, message);
      logger.debug("Event published", { channel });
    } catch (err) {
      logger.error("Failed to publish event", { channel, err });
      throw err;
    }
  },

  async subscribe(channel: string, handler: (payload: EventPayload) => void) {
    try {
      await subscriber.subscribe(channel);
      logger.info(`Subscribed to Redis channel: ${channel}`);

      subscriber.on("message", (ch, message) => {
        if (ch !== channel) return;
        try {
          handler(JSON.parse(message));
        } catch (err) {
          logger.error("Failed to parse/handle event message", { err, channel });
        }
      });
    } catch (err) {
      logger.error("Failed to subscribe to channel", { channel, err });
      throw err;
    }
  },

  // Expose the underlying subscriber for shutdown if needed
  _subscriber: subscriber,
};






// 🔔 4. Example — Notifications via Pub/Sub
// Emitting Notification

// Anywhere in your backend (e.g., ticket assignment logic):

// import { RedisEventBus } from "../utils/redisEventBus";

// await RedisEventBus.publish("notify:user:123", {
//   type: "TICKET_ASSIGNED",
//   data: { ticketId: "T-101", assignedBy: "admin@example.com" },
// });

// Listening for Notifications (e.g., in Socket.io Gateway)
// import { RedisEventBus } from "../utils/redisEventBus";
// import { io } from "./socketServer"; // your Socket.io instance

// RedisEventBus.subscribe("notify:user:123", (payload) => {
//   io.to("user:123").emit("notification", payload);
// });


// 🧠 This lets you scale horizontally: each Node instance subscribes independently but receives the same notification message from Redis.