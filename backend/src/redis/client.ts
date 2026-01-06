import { Redis } from "ioredis";
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

const redisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,

  // 🔥 prevent idle disconnects
  keepAlive: 10000,

  retryStrategy(times: number) {
    const delay = Math.min(times * 100, 3000);
    logger.warn("[redis] reconnect attempt", { times, delay });
    return delay;
  },

  reconnectOnError(err: any) {
    if (err.message.includes("ECONNRESET")) return true;
    return false;
  },
};

export const redis = new Redis(config.REDIS_URL, redisOptions);
export const redisPub = new Redis(config.REDIS_URL, redisOptions);
export const redisSub = new Redis(config.REDIS_URL, redisOptions);

// Logging for observability
[redis, redisPub, redisSub].forEach((client) => {
  client.on("connect", () => logger.info("[redis] connected"));
  client.on("ready", () => logger.info("[redis] ready"));
  client.on("error", (err: any) => {
    if (err?.code === "ECONNRESET") {
      logger.warn("[redis] connection reset by peer");
      return;
    }
    logger.error("[redis] error", err);
  });

  client.on("close", () => logger.info("[redis] closed"));
  client.on("end", () => logger.warn("[redis] connection ended")); // ✅
  client.on("reconnecting", () => logger.warn("[redis] reconnecting")); // ✅
});

/**
 * Graceful shutdown
 */
export async function shutdownRedis() {
  try {
    await Promise.all([redis.quit(), redisPub.quit(), redisSub.quit()]);
    logger.info("[redis] all clients disconnected gracefully");
  } catch (err) {
    logger.error("[redis] shutdown failed", err);
  }
}
