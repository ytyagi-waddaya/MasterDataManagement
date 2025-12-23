import { prisma } from "../lib/prisma.js";
/**
 * Notification repository: thin prisma wrapper.
 * Uses Prisma types so Json fields are handled correctly.
 */
export const NotificationRepository = {
    createDelivery: (data) => prisma.notificationDelivery.create({ data }),
    createDeliveriesBulk: (data) => prisma.notificationDelivery.createMany({ data }),
    findDeliveryById: (id) => prisma.notificationDelivery.findUnique({ where: { id } }),
    updateDelivery: (id, data) => prisma.notificationDelivery.update({ where: { id }, data }),
    markSent: (id) => prisma.notificationDelivery.update({
        where: { id },
        data: { sentAt: new Date() },
    }),
    markDelivered: (id) => prisma.notificationDelivery.update({
        where: { id },
        data: { deliveredAt: new Date() },
    }),
    markFailed: (id, err) => prisma.notificationDelivery.update({
        where: { id },
        data: {
            failedAt: new Date(),
            lastError: err,
            retryCount: { increment: 1 },
        },
    }),
    markRead: (id) => prisma.notificationDelivery.update({
        where: { id },
        data: { read: true, readAt: new Date() },
    }),
    listForUser: async (userId, take = 20, skip = 0) => {
        const [data, total] = await prisma.$transaction([
            prisma.notificationDelivery.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                take,
                skip,
            }),
            prisma.notificationDelivery.count({
                where: { userId },
            }),
        ]);
        return { data, total };
    },
    createBatch: (data) => prisma.notificationBatch.create({
        data: {
            title: data.title,
            message: data.message,
            type: data.type,
            data: data.data,
            createdById: data.createdById ?? null, // <--- THIS WORKS
        },
    }),
};
//# sourceMappingURL=notification.repository.js.map