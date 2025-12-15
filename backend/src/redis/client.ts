import {Redis} from "ioredis";
import { config } from "../config/app.config.js";
import { logger } from "../utils/logger.js";

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

export const redis = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

export const redisPub = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

export const redisSub = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

// Logging for observability
[redis, redisPub, redisSub].forEach((client) => {
  client.on("connect", () => logger.info("[redis] connected"));
  client.on("ready", () => logger.info("[redis] ready"));
  client.on("error", (err:any) => logger.error("[redis] error", err));
  client.on("close", () => logger.info("[redis] closed"));
});

/**
 * Graceful shutdown
 */
export async function shutdownRedis() {
  try {
    await Promise.all([
      redis.quit(),
      redisPub.quit(),
      redisSub.quit(),
    ]);
    logger.info("[redis] all clients disconnected gracefully");
  } catch (err) {
    logger.error("[redis] shutdown failed", err);
  }
}
