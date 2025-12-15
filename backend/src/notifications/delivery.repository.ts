import { prisma } from "../lib/prisma.js";

export const DeliveryRepository = {
  create: (data: any) =>
    prisma.notificationDelivery.create({ data }),

  createMany: (data: any[]) =>
    prisma.notificationDelivery.createMany({ data }),

  findById: (id: string) =>
    prisma.notificationDelivery.findUnique({ where: { id } }),

  update: (id: string, data: any) =>
    prisma.notificationDelivery.update({ where: { id }, data }),

  markSent: (id: string) =>
    prisma.notificationDelivery.update({
      where: { id },
      data: { sentAt: new Date() },
    }),

  markDelivered: (id: string) =>
    prisma.notificationDelivery.update({
      where: { id },
      data: { deliveredAt: new Date() },
    }),

  markFailed: (id: string, err: string) =>
    prisma.notificationDelivery.update({
      where: { id },
      data: {
        failedAt: new Date(),
        lastError: err,
        retryCount: { increment: 1 },
      },
    }),

  markRead: (id: string) =>
    prisma.notificationDelivery.update({
      where: { id },
      data: { read: true, readAt: new Date() },
    }),

  listForUser: (userId: string, take = 20, skip = 0) =>
    prisma.notificationDelivery.findMany({
      where: { userId },
      take,
      skip,
      orderBy: { createdAt: "desc" },
    }),
};
