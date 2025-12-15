// src/notifications/channels/socket.channel.ts
import { publishToUser } from "../../redis/publisher.js";

/**
 * Thin adapter for socket delivery: publish per-user payload to Redis pubsub channel.
 * The Socket Gateway subscribes and pushes to connected sockets.
 */
export async function sendWebNotification(userId: string, payload: any) {
  await publishToUser(userId, payload);
}
