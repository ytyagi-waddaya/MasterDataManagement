// src/events/event.bus.ts
import { redisPub } from "../redis/client.js";
import { logger } from "../utils/logger.js";
const CHANNEL = "erp:events";
/**
 * Create a strongly-typed broadcast payload.
 * Use this to build events consistently throughout the app.
 *
 * Note: opts fields are permissive (null | undefined) to play nicely with Prisma Json and exactOptionalPropertyTypes.
 */
export function createEvent(entity, action, payload, opts) {
    const eventName = `${entity}.${action}`;
    return {
        entity,
        action,
        event: eventName,
        payload,
        tenantId: opts?.tenantId ?? null,
        targetUsers: opts?.targetUsers ?? null,
        actorId: opts?.actorId ?? null,
        outboxId: opts?.outboxId ?? null,
        timestamp: new Date().toISOString(),
    };
}
/**
 * High-level broadcast. Recommended for application code that needs fast realtime broadcast.
 * For guaranteed delivery (zero-loss), the outbox → outbox.worker → broadcastEventDirect flow should be used.
 *
 * This function is best-effort: it publishes the event to Redis pubsub immediately.
 */
export async function broadcastEvent(entity, action, payload, opts) {
    const evt = createEvent(entity, action, payload, {
        tenantId: opts?.tenantId ?? null,
        targetUsers: opts?.targetUsers ?? null,
        actorId: opts?.actorId ?? null,
    });
    try {
        await redisPub.publish(CHANNEL, JSON.stringify(evt));
    }
    catch (err) {
        logger.error("[event.bus] broadcastEvent failed", err);
    }
}
/**
 * direct publish used by Outbox worker — accepts already created BroadcastPayload and publishes it.
 * Outbox worker should call this after reading an OutboxEvent and building the BroadcastPayload.
 */
export async function broadcastEventDirect(evt) {
    try {
        await redisPub.publish(CHANNEL, JSON.stringify(evt));
    }
    catch (err) {
        logger.error("[event.bus] broadcastEventDirect failed", err);
    }
}
//# sourceMappingURL=event.bus.js.map