// src/events/event.rooms.ts
/**
 * Helpers to derive socket.io rooms from an event.
 * Consistent room naming:
 *  - user:{userId}    -> per-user room
 *  - tenant:{tenantId} -> tenant-wide room
 *  - global           -> global room (no tenant)
 */
export const USER_ROOM = (userId) => `user:${userId}`;
export const TENANT_ROOM = (tenantId) => `tenant:${tenantId}`;
export const GLOBAL_ROOM = "global";
/**
 * Determine rooms to emit to for a BroadcastPayload.
 * Returns { tenantRoom?, userRooms[] }
 */
export function resolveRooms(evt) {
    const tenantRoom = evt.tenantId ? TENANT_ROOM(evt.tenantId) : undefined;
    const userRooms = Array.isArray(evt.targetUsers) ? evt.targetUsers.map(USER_ROOM) : [];
    return { tenantRoom, userRooms };
}
//# sourceMappingURL=event.rooms.js.map