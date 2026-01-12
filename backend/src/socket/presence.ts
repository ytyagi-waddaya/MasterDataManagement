// import { redis } from "../redis/client.js";

// const ONLINE_SET = "presence:online";
// const COUNT_KEY = "presence:count:";

// /**
//  * Returns true if user just came ONLINE
//  */
// export async function markOnline(userId: string) {
//   const count = await redis.incr(`${COUNT_KEY}${userId}`);
//   await redis.expire(`${COUNT_KEY}${userId}`, 90);
//   if (count === 1) {
//     await redis.sadd(ONLINE_SET, userId);
//     return true;
//   }
//   return false;
// }

// /**
//  * Returns true if user just went OFFLINE
//  */
// export async function markOffline(userId: string) {
//   const count = await redis.decr(`${COUNT_KEY}${userId}`);
//   if (count <= 0) {
//     await redis.del(`${COUNT_KEY}${userId}`);
//     await redis.srem(ONLINE_SET, userId);
//     return true;
//   }
//   return false;
// }

// /**
//  * Snapshot of all online users
//  */
// export async function getOnlineUsers() {
//   return redis.smembers(ONLINE_SET);
// }

import { redis, USE_REDIS } from "../redis/client.js";
import { logger } from "../utils/logger.js";

const ONLINE_SET = "presence:online";
const COUNT_KEY = "presence:count:";

/**
 * Returns true if user just came ONLINE
 */
export async function markOnline(userId: string) {
  if (!USE_REDIS || !redis) {
    logger.warn("[presence] redis disabled, markOnline skipped");
    return false;
  }

  const count = await redis.incr(`${COUNT_KEY}${userId}`);
  await redis.expire(`${COUNT_KEY}${userId}`, 90);

  if (count === 1) {
    await redis.sadd(ONLINE_SET, userId);
    return true;
  }

  return false;
}

/**
 * Returns true if user just went OFFLINE
 */
export async function markOffline(userId: string) {
  if (!USE_REDIS || !redis) {
    logger.warn("[presence] redis disabled, markOffline skipped");
    return false;
  }

  const count = await redis.decr(`${COUNT_KEY}${userId}`);

  if (count <= 0) {
    await redis.del(`${COUNT_KEY}${userId}`);
    await redis.srem(ONLINE_SET, userId);
    return true;
  }

  return false;
}

/**
 * Snapshot of all online users
 */
export async function getOnlineUsers() {
  if (!USE_REDIS || !redis) {
    logger.warn("[presence] redis disabled, getOnlineUsers skipped");
    return [];
  }

  return redis.smembers(ONLINE_SET);
}
