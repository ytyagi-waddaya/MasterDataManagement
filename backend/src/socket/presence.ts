import { redis } from "../redis/client.js";

const ONLINE_SET = "presence:online";
const COUNT_KEY = "presence:count:";

/**
 * Returns true if user just came ONLINE
 */
export async function markOnline(userId: string) {
  const count = await redis.incr(`${COUNT_KEY}${userId}`);
  await redis.expire(`${COUNT_KEY}${userId}`, 30);
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
  return redis.smembers(ONLINE_SET);
}
