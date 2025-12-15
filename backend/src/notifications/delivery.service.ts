import { NotificationRepository } from "./notification.repository.js";
import { enqueueDelivery, publishToUser } from "../redis/publisher.js";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger.js";
import { NotificationChannel, NotificationType, Prisma } from "../../prisma/generated/client.js";

export const DeliveryService = {
async createAndDispatch(opts: {
  userId: string;
  title: string;
  message: string;
  channels?: string[];
  data?: any;
  scheduledAt?: Date | null;
  batchId?: string | null;
  priority?: number;
}): Promise<string> {
  const id = uuidv4();

const dbPayload: Prisma.NotificationDeliveryCreateInput = {
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

  try {
    await publishToUser(opts.userId, {
      deliveryId: id,
      userId: opts.userId,
      title: opts.title,
      message: opts.message,
      data: opts.data ?? null,
      channel: NotificationChannel.WEB,
    });
  } catch (err) {
    logger.warn("[DeliveryService] publishToUser failed", err);
  }

  return id;
},
  listForUser: NotificationRepository.listForUser,
  markRead: NotificationRepository.markRead,

  // Notify many users
  notifyUsers: async (opts: {
    userIds: string[];
    title: string;
    message: string;
    data?: any;
    channels?: string[] | undefined;
  }) => {
    const channels = opts.channels ?? [NotificationChannel.WEB]; // FIX
    const data = opts.data ?? null;

    return Promise.all(
      opts.userIds.map((userId) =>
        DeliveryService.createAndDispatch({
          userId,
          title: opts.title,
          message: opts.message,
          data,
          channels, // FIX
        })
      )
    );
  },

  // Batch
  createBatchAndDispatch: async (opts: {
    title: string;
    message: string;
    data?: any;
    userIds: string[];
    createdById?: string | null;
    channels?: string[];
  }) => {
    const channels = opts.channels ?? ["WEB"];

    const batch = await NotificationRepository.createBatch({
      title: opts.title,
      message: opts.message,
      type: NotificationType.INFO,
      data: opts.data ?? Prisma.JsonNull,
      createdById: opts.createdById ?? null,
    });

    await Promise.all(
      opts.userIds.map((userId) =>
        DeliveryService.createAndDispatch({
          userId,
          title: opts.title,
          message: opts.message,
          data: opts.data,
          batchId: batch.id,
          channels,
        })
      )
    );

    return batch;
  },
};
