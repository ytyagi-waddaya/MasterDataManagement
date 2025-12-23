import { NotificationRepository } from "./notification.repository.js";
import { enqueueDelivery } from "../redis/publisher.js";
import { v4 as uuidv4 } from "uuid";
import { NotificationChannel, NotificationType, Prisma } from "../../prisma/generated/client.js";
export const DeliveryService = {
    async createAndDispatch(opts) {
        const id = uuidv4();
        const dbPayload = {
            id,
            title: opts.title,
            message: opts.message,
            type: NotificationType.INFO,
            channels: opts.channels ?? [NotificationChannel.WEB],
            data: opts.data ?? Prisma.JsonNull,
            priority: opts.priority ?? 0,
            scheduledAt: opts.scheduledAt ?? null,
            // ✔ ONLY include if batchId exists
            ...(opts.batchId ? { batch: { connect: { id: opts.batchId } } } : {}),
            // ✔ ONLY include if userId exists
            ...(opts.userId ? { user: { connect: { id: opts.userId } } } : {})
        };
        await NotificationRepository.createDelivery(dbPayload);
        await enqueueDelivery({ deliveryId: id });
        return id;
    },
    listForUser: async (userId, take = 20, skip = 0) => {
        return NotificationRepository.listForUser(userId, take, skip);
    },
    markRead: NotificationRepository.markRead,
    // Notify many users
    notifyUsers: async (opts) => {
        const channels = opts.channels ?? [NotificationChannel.WEB]; // FIX
        const data = opts.data ?? null;
        return Promise.all(opts.userIds.map((userId) => DeliveryService.createAndDispatch({
            userId,
            title: opts.title,
            message: opts.message,
            data,
            channels, // FIX
        })));
    },
    // Batch
    createBatchAndDispatch: async (opts) => {
        const channels = opts.channels ?? ["WEB"];
        const batch = await NotificationRepository.createBatch({
            title: opts.title,
            message: opts.message,
            type: NotificationType.INFO,
            data: opts.data ?? Prisma.JsonNull,
            createdById: opts.createdById ?? null,
        });
        await Promise.all(opts.userIds.map((userId) => DeliveryService.createAndDispatch({
            userId,
            title: opts.title,
            message: opts.message,
            data: opts.data,
            batchId: batch.id,
            channels,
        })));
        return batch;
    },
};
//# sourceMappingURL=delivery.service.js.map