/**
 * Returns true if user just came ONLINE
 */
export declare function markOnline(userId: string): Promise<boolean>;
/**
 * Returns true if user just went OFFLINE
 */
export declare function markOffline(userId: string): Promise<boolean>;
/**
 * Snapshot of all online users
 */
export declare function getOnlineUsers(): Promise<string[]>;
//# sourceMappingURL=presence.d.ts.map