/**
 * Thin adapter for socket delivery: publish per-user payload to Redis pubsub channel.
 * The Socket Gateway subscribes and pushes to connected sockets.
 */
export declare function sendWebNotification(userId: string, payload: any): Promise<void>;
//# sourceMappingURL=socket.channel.d.ts.map