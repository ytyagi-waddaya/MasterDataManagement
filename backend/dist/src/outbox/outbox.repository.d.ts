export declare const OutboxRepository: {
    /**
     * Create OutboxEvent inside the SAME transaction as domain write.
     */
    create: (tx: any, event: {
        eventName: string;
        entity: string;
        action: string;
        payload: any;
        tenantId?: string | null;
        targetUsers?: string[] | null;
        maxAttempts?: number;
    }) => any;
    /**
     * Fetch unprocessed events (SKIP LOCKED avoids double processing)
     */
    fetchPending: (limit?: number) => Promise<any[]>;
    lock: (id: string) => import("../../prisma/generated/models.js").Prisma__OutboxEventClient<{
        entity: string;
        action: string;
        id: string;
        createdAt: Date;
        lockedAt: Date | null;
        eventName: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        targetUsers: import("@prisma/client/runtime/client").JsonValue | null;
        attempts: number;
        maxAttempts: number;
        processedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../prisma/generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    markProcessed: (id: string) => import("../../prisma/generated/models.js").Prisma__OutboxEventClient<{
        entity: string;
        action: string;
        id: string;
        createdAt: Date;
        lockedAt: Date | null;
        eventName: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        targetUsers: import("@prisma/client/runtime/client").JsonValue | null;
        attempts: number;
        maxAttempts: number;
        processedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../prisma/generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    incrementAttempts: (id: string) => import("../../prisma/generated/models.js").Prisma__OutboxEventClient<{
        entity: string;
        action: string;
        id: string;
        createdAt: Date;
        lockedAt: Date | null;
        eventName: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        targetUsers: import("@prisma/client/runtime/client").JsonValue | null;
        attempts: number;
        maxAttempts: number;
        processedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../prisma/generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    /**
     * Mark event as failed (moves to DLQ via worker)
     */
    moveToFailed: (id: string) => import("../../prisma/generated/models.js").Prisma__OutboxEventClient<{
        entity: string;
        action: string;
        id: string;
        createdAt: Date;
        lockedAt: Date | null;
        eventName: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        targetUsers: import("@prisma/client/runtime/client").JsonValue | null;
        attempts: number;
        maxAttempts: number;
        processedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../prisma/generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    writeEventLog: (data: {
        outboxId: string;
        eventName: string;
        payload: any;
        result: string;
    }) => import("../../prisma/generated/models.js").Prisma__EventLogClient<{
        id: string;
        createdAt: Date;
        result: string | null;
        eventName: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        outboxId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../prisma/generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
};
//# sourceMappingURL=outbox.repository.d.ts.map