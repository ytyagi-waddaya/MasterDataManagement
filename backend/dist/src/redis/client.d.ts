import { Redis } from "ioredis";
/**
 * Main Redis connections:
 *
 * - redis: general-purpose commands (XADD, GET, SET, etc.)
 * - redisPub: publishes messages (PUB/SUB)
 * - redisSub: subscribes + psubscribes
 *
 * All three use separate TCP connections → REQUIRED for
 * enterprise Socket.IO + Stream Workers.
 */
export declare const redis: Redis;
export declare const redisPub: Redis;
export declare const redisSub: Redis;
/**
 * Graceful shutdown
 */
export declare function shutdownRedis(): Promise<void>;
//# sourceMappingURL=client.d.ts.map