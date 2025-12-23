import { redisPub, redis } from "./client.js";
import { logger } from "../utils/logger.js";
import { config } from "../config/app.config.js";
const USER_CHANNEL_PREFIX = "notifications:user:";
const EVENT_BUS_CHANNEL = "erp:events";
/**
 * Publish event to a per-user pub/sub channel.
 */
export async function publishToUser(userId, payload) {
    const channel = `${USER_CHANNEL_PREFIX}${userId}`;
    try {
        const message = JSON.stringify(payload);
        await redisPub.publish(channel, message);
    }
    catch (err) {
        logger.error("[publisher] publishToUser error", err);
    }
}
/**
 * Publish business event for socket server + subscribers.
 */
export async function publishEvent(evt) {
    try {
        logger.info("[RT][outbox.worker] publishing to redis", {
            channel: "erp:events",
            event: evt.event,
        });
        await redisPub.publish(EVENT_BUS_CHANNEL, JSON.stringify(evt));
    }
    catch (err) {
        logger.error("[publisher] publishEvent error", err);
    }
}
/**
 * Enqueue durable delivery event → Redis Stream
 */
export async function enqueueDelivery(payload) {
    try {
        const flat = Object.entries(payload).flatMap(([k, v]) => [
            k,
            typeof v === "string" ? v : JSON.stringify(v),
        ]);
        return redis.xadd(config.STREAM_KEY, "*", ...flat);
    }
    catch (err) {
        logger.error("[publisher] enqueueDelivery error", err);
        throw err;
    }
}
//# sourceMappingURL=publisher.js.map