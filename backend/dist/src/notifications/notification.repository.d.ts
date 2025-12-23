import { Prisma, NotificationType } from "../../prisma/generated/client.js";
/**
 * Notification repository: thin prisma wrapper.
 * Uses Prisma types so Json fields are handled correctly.
 */
export declare const NotificationRepository: {
    createDelivery: (data: Prisma.NotificationDeliveryCreateInput) => Prisma.Prisma__NotificationDeliveryClient<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        userId: string | null;
        id: string;
        createdAt: Date;
        title: string;
        channels: import("@prisma/client/runtime/client").JsonValue;
        targetType: string | null;
        targetId: string | null;
        read: boolean;
        readAt: Date | null;
        sentAt: Date | null;
        priority: number;
        deliveredAt: Date | null;
        failedAt: Date | null;
        retryCount: number;
        lastError: string | null;
        scheduledAt: Date | null;
        batchId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createDeliveriesBulk: (data: Prisma.NotificationDeliveryCreateManyInput[]) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    findDeliveryById: (id: string) => Prisma.Prisma__NotificationDeliveryClient<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        userId: string | null;
        id: string;
        createdAt: Date;
        title: string;
        channels: import("@prisma/client/runtime/client").JsonValue;
        targetType: string | null;
        targetId: string | null;
        read: boolean;
        readAt: Date | null;
        sentAt: Date | null;
        priority: number;
        deliveredAt: Date | null;
        failedAt: Date | null;
        retryCount: number;
        lastError: string | null;
        scheduledAt: Date | null;
        batchId: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    updateDelivery: (id: string, data: Prisma.NotificationDeliveryUpdateInput) => Prisma.Prisma__NotificationDeliveryClient<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        userId: string | null;
        id: string;
        createdAt: Date;
        title: string;
        channels: import("@prisma/client/runtime/client").JsonValue;
        targetType: string | null;
        targetId: string | null;
        read: boolean;
        readAt: Date | null;
        sentAt: Date | null;
        priority: number;
        deliveredAt: Date | null;
        failedAt: Date | null;
        retryCount: number;
        lastError: string | null;
        scheduledAt: Date | null;
        batchId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    markSent: (id: string) => Prisma.Prisma__NotificationDeliveryClient<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        userId: string | null;
        id: string;
        createdAt: Date;
        title: string;
        channels: import("@prisma/client/runtime/client").JsonValue;
        targetType: string | null;
        targetId: string | null;
        read: boolean;
        readAt: Date | null;
        sentAt: Date | null;
        priority: number;
        deliveredAt: Date | null;
        failedAt: Date | null;
        retryCount: number;
        lastError: string | null;
        scheduledAt: Date | null;
        batchId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    markDelivered: (id: string) => Prisma.Prisma__NotificationDeliveryClient<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        userId: string | null;
        id: string;
        createdAt: Date;
        title: string;
        channels: import("@prisma/client/runtime/client").JsonValue;
        targetType: string | null;
        targetId: string | null;
        read: boolean;
        readAt: Date | null;
        sentAt: Date | null;
        priority: number;
        deliveredAt: Date | null;
        failedAt: Date | null;
        retryCount: number;
        lastError: string | null;
        scheduledAt: Date | null;
        batchId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    markFailed: (id: string, err: string) => Prisma.Prisma__NotificationDeliveryClient<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        userId: string | null;
        id: string;
        createdAt: Date;
        title: string;
        channels: import("@prisma/client/runtime/client").JsonValue;
        targetType: string | null;
        targetId: string | null;
        read: boolean;
        readAt: Date | null;
        sentAt: Date | null;
        priority: number;
        deliveredAt: Date | null;
        failedAt: Date | null;
        retryCount: number;
        lastError: string | null;
        scheduledAt: Date | null;
        batchId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    markRead: (id: string) => Prisma.Prisma__NotificationDeliveryClient<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        userId: string | null;
        id: string;
        createdAt: Date;
        title: string;
        channels: import("@prisma/client/runtime/client").JsonValue;
        targetType: string | null;
        targetId: string | null;
        read: boolean;
        readAt: Date | null;
        sentAt: Date | null;
        priority: number;
        deliveredAt: Date | null;
        failedAt: Date | null;
        retryCount: number;
        lastError: string | null;
        scheduledAt: Date | null;
        batchId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    listForUser: (userId: string, take?: number, skip?: number) => Promise<{
        data: {
            message: string;
            data: import("@prisma/client/runtime/client").JsonValue | null;
            type: NotificationType;
            userId: string | null;
            id: string;
            createdAt: Date;
            title: string;
            channels: import("@prisma/client/runtime/client").JsonValue;
            targetType: string | null;
            targetId: string | null;
            read: boolean;
            readAt: Date | null;
            sentAt: Date | null;
            priority: number;
            deliveredAt: Date | null;
            failedAt: Date | null;
            retryCount: number;
            lastError: string | null;
            scheduledAt: Date | null;
            batchId: string | null;
        }[];
        total: number;
    }>;
    createBatch: (data: {
        title: string;
        message: string;
        type: NotificationType;
        data: any;
        createdById?: string | null;
    }) => Prisma.Prisma__NotificationBatchClient<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        id: string;
        createdAt: Date;
        title: string;
        createdById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
};
//# sourceMappingURL=notification.repository.d.ts.map