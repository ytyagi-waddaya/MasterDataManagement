/**
 * Helpers to derive socket.io rooms from an event.
 * Consistent room naming:
 *  - user:{userId}    -> per-user room
 *  - tenant:{tenantId} -> tenant-wide room
 *  - global           -> global room (no tenant)
 */
export declare const USER_ROOM: (userId: string) => string;
export declare const TENANT_ROOM: (tenantId: string) => string;
export declare const GLOBAL_ROOM = "global";
/**
 * Determine rooms to emit to for a BroadcastPayload.
 * Returns { tenantRoom?, userRooms[] }
 */
export declare function resolveRooms(evt: {
    tenantId?: string | null;
    targetUsers?: string[] | null;
}): {
    tenantRoom: string | undefined;
    userRooms: string[];
};
//# sourceMappingURL=event.rooms.d.ts.map