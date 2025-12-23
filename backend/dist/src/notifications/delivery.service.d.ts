import { NotificationType, Prisma } from "../../prisma/generated/client.js";
export declare const DeliveryService: {
    createAndDispatch(opts: {
        userId: string;
        title: string;
        message: string;
        channels?: string[];
        data?: any;
        scheduledAt?: Date | null;
        batchId?: string | null;
        priority?: number;
    }): Promise<string>;
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
    notifyUsers: (opts: {
        userIds: string[];
        title: string;
        message: string;
        data?: any;
        channels?: string[] | undefined;
    }) => Promise<string[]>;
    createBatchAndDispatch: (opts: {
        title: string;
        message: string;
        data?: any;
        userIds: string[];
        createdById?: string | null;
        channels?: string[];
    }) => Promise<{
        message: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: NotificationType;
        id: string;
        createdAt: Date;
        title: string;
        createdById: string | null;
    }>;
};
//# sourceMappingURL=delivery.service.d.ts.map