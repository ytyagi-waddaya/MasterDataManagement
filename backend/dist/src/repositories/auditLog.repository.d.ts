declare const auditLogRepository: {
    getAll: (skip?: number, take?: number) => Promise<({
        user: {
            email: string;
            id: string;
            name: string;
        } | null;
    } & {
        masterRecordId: string | null;
        userId: string | null;
        entity: import("../../prisma/generated/enums.js").AuditEntity;
        action: import("../../prisma/generated/enums.js").AuditAction;
        comment: string | null;
        step: import("@prisma/client/runtime/client").JsonValue | null;
        before: import("@prisma/client/runtime/client").JsonValue | null;
        after: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
        performedBy: import("../../prisma/generated/enums.js").PerformedByType;
        id: string;
        createdAt: Date;
    })[]>;
    /** Get audit logs by user ID */
    getByUserId: (userId: string, skip?: number, take?: number) => Promise<{
        masterRecordId: string | null;
        userId: string | null;
        entity: import("../../prisma/generated/enums.js").AuditEntity;
        action: import("../../prisma/generated/enums.js").AuditAction;
        comment: string | null;
        step: import("@prisma/client/runtime/client").JsonValue | null;
        before: import("@prisma/client/runtime/client").JsonValue | null;
        after: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
        performedBy: import("../../prisma/generated/enums.js").PerformedByType;
        id: string;
        createdAt: Date;
    }[]>;
};
export default auditLogRepository;
//# sourceMappingURL=auditLog.repository.d.ts.map