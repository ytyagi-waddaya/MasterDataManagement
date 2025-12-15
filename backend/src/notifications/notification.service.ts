// src/notifications/notification.service.ts
import { DeliveryService } from "./delivery.service.js";
import { OutboxService } from "../outbox/outbox.service.js";
import { NotificationChannel } from "../../prisma/generated/enums.js";

/**
 * Higher-level NotificationService:
 * - transactional notify (writes outbox inside tx)
 * - non-transactional convenience notify (creates deliveries directly)
 */
export const NotificationService = {
  /**
   * Non-transactional convenience
   */
  notifyUsers: async (opts: { userIds: string[]; title: string; message: string; data?: any; channels?: string[]; tenantId?: string | null; actorId?: string | null; }) => {
    return DeliveryService.notifyUsers({
      userIds: opts.userIds,
      title: opts.title,
      message: opts.message,
      data: opts.data,
      channels: opts.channels ?? [NotificationChannel.WEB],
    });
  },

  /**
   * Transactional notification that uses Outbox:
   * Use inside domain tx so event only created on commit.
   *
   * Example usage:
   * await prisma.$transaction(async (tx) => {
   *   await tx.module.update(...);
   *   await NotificationService.notifyUsersTransactional(tx, {...});
   * });
   */
  notifyUsersTransactional: async (tx: any, opts: { userIds: string[]; title: string; message: string; data?: any; tenantId?: string | null; actorId?: string | null; }) => {
    // payload that worker/clients expect
    const payload = {
      title: opts.title,
      message: opts.message,
      data: opts.data ?? null,
      userIds: opts.userIds,
      actorId: opts.actorId ?? null,
    };

    return OutboxService.createOutboxEvent(tx, {
      entity: "notification",
      action: "created",
      payload,
      tenantId: opts.tenantId ?? null,
      targetUsers: opts.userIds,
    });
  },
};
