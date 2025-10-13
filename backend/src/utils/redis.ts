// src/utils/redis.ts
import Redis, { RedisOptions } from "ioredis";
import logger from "../utils/logger";
import { config } from "../config/app.config";

/**
 * Build redisConfig so optional properties are omitted when not present.
 * This avoids assigning `string | undefined` to fields that expect `string`.
 */
export const redisConfig: RedisOptions = {
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
  // only add password property if it's a non-empty string
  ...(typeof config.REDIS_PASSWORD === "string" && config.REDIS_PASSWORD.length > 0
    ? { password: config.REDIS_PASSWORD }
    : {}),
  enableOfflineQueue: false,
  maxRetriesPerRequest: 2,
  retryStrategy: (times: number) => Math.min(2000 + times * 200, 10000),
  connectTimeout: 10000,
  enableReadyCheck: true,
  lazyConnect: false,
};

const redisClient = new Redis(redisConfig);

redisClient.on("connect", () =>
  logger.info("Redis connecting...", { host: config.REDIS_HOST, port: config.REDIS_PORT })
);
redisClient.on("ready", () => logger.info("Redis client ready"));
redisClient.on("error", (err) => logger.error("Redis client error", { err }));
redisClient.on("end", () => logger.info("Redis client disconnected"));

let _shuttingDown = false;
export async function shutdownRedis(): Promise<void> {
  if (_shuttingDown) return;
  _shuttingDown = true;

  try {
    await redisClient.quit();
    logger.info("Redis client quit gracefully");
  } catch (err) {
    logger.warn("Redis graceful quit failed, disconnecting", { err });
    try {
      redisClient.disconnect();
    } catch {
      // ignore final errors
    }
  }
}

export { redisClient };
