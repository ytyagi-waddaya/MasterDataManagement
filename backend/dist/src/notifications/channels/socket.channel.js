// src/notifications/channels/socket.channel.ts
import { publishToUser } from "../../redis/publisher.js";
/**
 * Thin adapter for socket delivery: publish per-user payload to Redis pubsub channel.
 * The Socket Gateway subscribes and pushes to connected sockets.
 */
export async function sendWebNotification(userId, payload) {
    await publishToUser(userId, payload);
}
//# sourceMappingURL=socket.channel.js.map