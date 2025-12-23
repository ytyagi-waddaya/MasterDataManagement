import { AuditAction, AuditEntity, PerformedByType } from "../../prisma/generated/client.js";
/**
 * Options you pass when creating an audit log.
 * JSON fields (step/before/after) accept `unknown | null | undefined`:
 * - undefined means "omit the DB column"
 * - null means "store JSON null"
 * - a Promise/thenable will be awaited (useful if callers forgot to `await` a Prisma client)
 */
export type AuditLogOptions = {
    masterRecordId?: string | null;
    userId?: string | null;
    entity: AuditEntity;
    action: AuditAction;
    comment?: string | null;
    step?: unknown | null;
    before?: unknown | null;
    after?: unknown | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: PerformedByType;
};
/**
 * createAuditLog
 * - awaits thenables accidentally passed into step/before/after
 * - omits undefined fields so Prisma types align with exactOptionalPropertyTypes
 * - returns the created audit log record
 */
export declare function createAuditLog(options: AuditLogOptions): Promise<{
    masterRecordId: string | null;
    userId: string | null;
    entity: AuditEntity;
    action: AuditAction;
    comment: string | null;
    step: import("@prisma/client/runtime/client").JsonValue | null;
    before: import("@prisma/client/runtime/client").JsonValue | null;
    after: import("@prisma/client/runtime/client").JsonValue | null;
    ipAddress: string | null;
    userAgent: string | null;
    performedBy: PerformedByType;
    id: string;
    createdAt: Date;
}>;
//# sourceMappingURL=auditLog.d.ts.map