declare const auditLogService: {
    getAll: (params: {
        skip?: number;
        take?: number;
    }) => Promise<({
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
    getByUserId: (userId: string, params: {
        skip?: number;
        take?: number;
    }) => Promise<{
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
export default auditLogService;
//# sourceMappingURL=auditLog.service.d.ts.map