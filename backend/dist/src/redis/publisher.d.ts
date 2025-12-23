/**
 * Publish event to a per-user pub/sub channel.
 */
export declare function publishToUser(userId: string, payload: any): Promise<void>;
/**
 * Publish business event for socket server + subscribers.
 */
export declare function publishEvent(evt: Record<string, any>): Promise<void>;
/**
 * Enqueue durable delivery event → Redis Stream
 */
export declare function enqueueDelivery(payload: Record<string, any>): Promise<string | null>;
//# sourceMappingURL=publisher.d.ts.map