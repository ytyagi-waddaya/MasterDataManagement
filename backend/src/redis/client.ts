// import { Redis } from "ioredis";
// import { config } from "../config/app.config.js";
// import { logger } from "../utils/logger.js";

// /**
//  * Main Redis connections:
//  *
//  * - redis: general-purpose commands (XADD, GET, SET, etc.)
//  * - redisPub: publishes messages (PUB/SUB)
//  * - redisSub: subscribes + psubscribes
//  *
//  * All three use separate TCP connections → REQUIRED for
//  * enterprise Socket.IO + Stream Workers.
//  */

// const redisOptions = {
//   maxRetriesPerRequest: null,
//   enableReadyCheck: true,

//   // 🔥 prevent idle disconnects
//   keepAlive: 10000,

//   retryStrategy(times: number) {
//     const delay = Math.min(times * 100, 3000);
//     logger.warn("[redis] reconnect attempt", { times, delay });
//     return delay;
//   },

//   reconnectOnError(err: any) {
//     if (err.message.includes("ECONNRESET")) return true;
//     return false;
//   },
// };

// export const redis = new Redis(config.REDIS_URL, redisOptions);
// export const redisPub = new Redis(config.REDIS_URL, redisOptions);
// export const redisSub = new Redis(config.REDIS_URL, redisOptions);

// // Logging for observability
// [redis, redisPub, redisSub].forEach((client) => {
//   client.on("connect", () => logger.info("[redis] connected"));
//   client.on("ready", () => logger.info("[redis] ready"));
//   client.on("error", (err: any) => {
//     if (err?.code === "ECONNRESET") {
//       logger.warn("[redis] connection reset by peer");
//       return;
//     }
//     logger.error("[redis] error", err);
//   });

//   client.on("close", () => logger.info("[redis] closed"));
//   client.on("end", () => logger.warn("[redis] connection ended")); // ✅
//   client.on("reconnecting", () => logger.warn("[redis] reconnecting")); // ✅
// });

// /**
//  * Graceful shutdown
//  */
// export async function shutdownRedis() {
//   try {
//     await Promise.all([redis.quit(), redisPub.quit(), redisSub.quit()]);
//     logger.info("[redis] all clients disconnected gracefully");
//   } catch (err) {
//     logger.error("[redis] shutdown failed", err);
//   }
// }

import { Redis } from "ioredis";
import type { RedisOptions } from "ioredis";
import { config } from "../config/app.config.js";
import { logger } from "../utils/logger.js";

export const USE_REDIS = config.USE_REDIS === "true"

const REDIS_URL = config.REDIS_URL;
const isTLS = REDIS_URL?.startsWith("rediss://");

function createRedisClient(name: string) {
  if (!USE_REDIS) {
    logger.warn(`[redis:${name}] disabled`);
    return null;
  }

  const baseOptions: RedisOptions = {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,

    keepAlive: 60000,
    connectTimeout: 20000,
    commandTimeout: 20000,

    autoResubscribe: false,
    autoResendUnfulfilledCommands: false,

    retryStrategy(times) {
      const delay = Math.min(2000 + times * 500, 10000);
      logger.warn(`[redis:${name}] reconnect`, { times, delay });
      return delay;
    },
  };

  const options: RedisOptions = isTLS
    ? { ...baseOptions, tls: {} }
    : baseOptions;

  const client = new Redis(REDIS_URL, options);

  client.on("connect", () =>
    logger.info(`[redis:${name}] connected`)
  );
  client.on("ready", () =>
    logger.info(`[redis:${name}] ready`)
  );
  client.on("reconnecting", () =>
    logger.warn(`[redis:${name}] reconnecting`)
  );
  client.on("end", () =>
    logger.warn(`[redis:${name}] ended`)
  );
  client.on("error", (err) =>
    logger.error(`[redis:${name}] error`, err)
  );

  return client;
}

/* ───────────── clients (nullable) ───────────── */

export const redis = createRedisClient("core");
export const appPub = createRedisClient("appPub");
export const appSub = createRedisClient("appSub");
export const adapterPub = createRedisClient("adapterPub");
export const adapterSub = createRedisClient("adapterSub");

/* ───────────── connect / shutdown ───────────── */

export async function connectRedis() {
  if (!USE_REDIS) {
    logger.warn("[redis] connect skipped (disabled)");
    return;
  }

  logger.info("[redis] connecting clients...");

  await redis!.connect();
  await appPub!.connect();
  await appSub!.connect();
  await adapterPub!.connect();
  await adapterSub!.connect();

  logger.info("[redis] all clients connected");
}

export async function shutdownRedis() {
  if (!USE_REDIS) return;

  await Promise.all([
    redis?.quit(),
    appPub?.quit(),
    appSub?.quit(),
    adapterPub?.quit(),
    adapterSub?.quit(),
  ]);
}
