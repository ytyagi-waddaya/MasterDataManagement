import { prisma } from "../lib/prisma.js";
export const DeliveryRepository = {
    create: (data) => prisma.notificationDelivery.create({ data }),
    createMany: (data) => prisma.notificationDelivery.createMany({ data }),
    findById: (id) => prisma.notificationDelivery.findUnique({ where: { id } }),
    update: (id, data) => prisma.notificationDelivery.update({ where: { id }, data }),
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
    listForUser: (userId, take = 20, skip = 0) => prisma.notificationDelivery.findMany({
        where: { userId },
        take,
        skip,
        orderBy: { createdAt: "desc" },
    }),
};
//# sourceMappingURL=delivery.repository.js.map