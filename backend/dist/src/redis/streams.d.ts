/**
 * Create consumer group if missing (idempotent).
 */
export declare function ensureGroup(): Promise<void>;
/**
 * Add JSON object to stream
 */
export declare function addToStream(data: Record<string, any>): Promise<string | null>;
/**
 * Read messages using consumer group
 */
export declare function readGroup(consumer: string, count?: number, blockMs?: number, streamKey?: string): Promise<unknown[]>;
/**
 * Acknowledge a message
 */
export declare function ack(msgId: string): Promise<void>;
/**
 * Move a failed event to DLQ
 */
export declare function moveToDLQ(msgId: string, payload: any, reason: string): Promise<void>;
/**
 * Claim messages stuck in PEL (Pending Entries List)
 */
export declare function claimStuckMessages(consumer: string, minIdleMs?: number, count?: number): Promise<unknown[]>;
//# sourceMappingURL=streams.d.ts.map