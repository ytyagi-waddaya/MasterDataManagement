export declare class FieldRegistryRepository {
    findManyByFields(fields: string[], tenantId?: string): Promise<{
        meta: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdById: string | null;
        field: string;
        resourceId: string | null;
        moduleId: string | null;
        fieldType: string;
        scope: string | null;
    }[]>;
    getByField(field: string, tenantId?: string): Promise<{
        meta: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdById: string | null;
        field: string;
        resourceId: string | null;
        moduleId: string | null;
        fieldType: string;
        scope: string | null;
    } | null>;
    getAll(tenantId?: string): Promise<{
        meta: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdById: string | null;
        field: string;
        resourceId: string | null;
        moduleId: string | null;
        fieldType: string;
        scope: string | null;
    }[]>;
}
//# sourceMappingURL=fieldRegistry.repository.d.ts.map