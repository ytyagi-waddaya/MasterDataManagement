/**
 * Central registry for event names & types.
 * Keep EventAction list in sync with your product's event taxonomy.
 */
export declare const EVENT_ACTIONS: readonly ["created", "updated", "deleted", "archived", "restored", "assigned", "status_changed", "workflow_changed", "comment_added", "paid", "custom"];
export type EventAction = typeof EVENT_ACTIONS[number];
/**
 * Entity is freeform, e.g. "module", "ticket", "invoice".
 */
export type EventEntity = string;
/**
 * EventName typed as "entity.action", e.g. "module.updated"
 */
export type EventName = `${EventEntity}.${EventAction}`;
/**
 * BroadcastPayload is the canonical event structure pushed to Redis pubsub & streams.
 *
 * - `tenantId` is optional and allows tenant-scoped broadcasts.
 * - `targetUsers` may be:
 *    - an array of userIds -> targeted per-user emit
 *    - null -> tenant-wide broadcast (send to tenant room)
 *    - undefined -> treat as tenant/global based on tenantId
 *
 * Keep fields permissive to work well with Prisma Json fields and exactOptionalPropertyTypes.
 */
export interface BroadcastPayload {
    entity: EventEntity;
    action: EventAction;
    event: EventName;
    payload: any;
    tenantId?: string | null | undefined;
    targetUsers?: string[] | null | undefined;
    actorId?: string | null | undefined;
    outboxId?: string | null | undefined;
    timestamp: string;
}
//# sourceMappingURL=event.registry.d.ts.map