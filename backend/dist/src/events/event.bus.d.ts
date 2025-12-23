import type { BroadcastPayload, EventEntity, EventAction } from "./event.registry.js";
/**
 * Create a strongly-typed broadcast payload.
 * Use this to build events consistently throughout the app.
 *
 * Note: opts fields are permissive (null | undefined) to play nicely with Prisma Json and exactOptionalPropertyTypes.
 */
export declare function createEvent(entity: EventEntity, action: EventAction, payload: any, opts?: {
    tenantId?: string | null | undefined;
    targetUsers?: string[] | null | undefined;
    actorId?: string | null | undefined;
    outboxId?: string | null | undefined;
}): BroadcastPayload;
/**
 * High-level broadcast. Recommended for application code that needs fast realtime broadcast.
 * For guaranteed delivery (zero-loss), the outbox → outbox.worker → broadcastEventDirect flow should be used.
 *
 * This function is best-effort: it publishes the event to Redis pubsub immediately.
 */
export declare function broadcastEvent(entity: EventEntity, action: EventAction, payload: any, opts?: {
    tenantId?: string | null;
    targetUsers?: string[] | null;
    actorId?: string | null;
}): Promise<void>;
/**
 * direct publish used by Outbox worker — accepts already created BroadcastPayload and publishes it.
 * Outbox worker should call this after reading an OutboxEvent and building the BroadcastPayload.
 */
export declare function broadcastEventDirect(evt: BroadcastPayload): Promise<void>;
//# sourceMappingURL=event.bus.d.ts.map