// src/notifications/notification.repository.ts
import { Prisma, NotificationType } from "../../prisma/generated/client.js";
import { prisma } from "../lib/prisma.js";

/**
 * Notification repository: thin prisma wrapper.
 * Uses Prisma types so Json fields are handled correctly.
 */
export const NotificationRepository = {
  createDelivery: (data: Prisma.NotificationDeliveryCreateInput) =>
    prisma.notificationDelivery.create({ data }),

  createDeliveriesBulk: (data: Prisma.NotificationDeliveryCreateManyInput[]) =>
    prisma.notificationDelivery.createMany({ data }),

  findDeliveryById: (id: string) =>
    prisma.notificationDelivery.findUnique({ where: { id } }),

  updateDelivery: (id: string, data: Prisma.NotificationDeliveryUpdateInput) =>
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

listForUser: async (userId: string, take = 20, skip = 0) => {
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


  createBatch: (data: {
    title: string;
    message: string;
    type:NotificationType;
    data: any;
    createdById?: string | null;
  }) =>
    prisma.notificationBatch.create({
      data: {
        title: data.title,
        message: data.message,
        type: data.type,
        data: data.data,
        createdById: data.createdById ?? null, // <--- THIS WORKS
      },
    }),
};
