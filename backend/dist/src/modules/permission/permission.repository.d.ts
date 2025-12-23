import { Prisma } from "../../../prisma/generated/client.js";
import { PermissionFilterInput, PermissionId } from "./dto/permission.dto.js";
declare const permissionRepository: {
    read: (filters: PermissionFilterInput) => Promise<{
        data: ({
            action: {
                id: string;
                createdAt: Date;
                name: string;
                updatedAt: Date;
                deletedAt: Date | null;
                isActive: boolean;
                description: string | null;
                key: string;
                isSystem: boolean;
            };
            resource: {
                module: {
                    id: string;
                    createdAt: Date;
                    name: string;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    isActive: boolean;
                    description: string | null;
                    key: string;
                    isSystem: boolean;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                name: string;
                updatedAt: Date;
                deletedAt: Date | null;
                isActive: boolean;
                masterObjectId: string | null;
                description: string | null;
                key: string;
                isSystem: boolean;
                moduleId: string | null;
                category: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            description: string | null;
            resourceId: string;
            key: string;
            isSystem: boolean;
            category: string | null;
            actionId: string;
            conditions: import("@prisma/client/runtime/client").JsonValue | null;
            expression: string | null;
        })[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    readOne: ({ permissionId }: PermissionId) => Prisma.Prisma__PermissionClient<({
        action: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            description: string | null;
            key: string;
            isSystem: boolean;
        };
        resource: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    permissionById: ({ permissionId }: PermissionId) => Prisma.Prisma__PermissionClient<({
        action: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            description: string | null;
            key: string;
            isSystem: boolean;
        };
        resource: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    update: ({ permissionId }: PermissionId, data: Prisma.PermissionUpdateInput) => Prisma.Prisma__PermissionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    isDuplicateName: (name: string, permissionId: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    } | null>;
    findManyByIds: (ids: string[]) => Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }[]>;
    archive: ({ permissionId }: PermissionId) => Prisma.Prisma__PermissionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    restore: ({ permissionId }: PermissionId) => Prisma.Prisma__PermissionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    delete: ({ permissionId }: PermissionId) => Prisma.Prisma__PermissionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    archiveMany: (ids: string[]) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    restoreMany: (ids: string[]) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    deleteMany: (ids: string[]) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    findByRoleId: (roleId: string) => Prisma.PrismaPromise<({
        action: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            description: string | null;
            key: string;
            isSystem: boolean;
        };
        resource: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    })[]>;
    findByResourceId: (resourceId: string) => Prisma.PrismaPromise<({
        action: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            description: string | null;
            key: string;
            isSystem: boolean;
        };
        resource: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    })[]>;
    findByActionId: (actionId: string) => Prisma.PrismaPromise<({
        action: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            description: string | null;
            key: string;
            isSystem: boolean;
        };
        resource: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    })[]>;
    savePermissionConditions: (permissionId: string, conditions: any, expression?: string) => Prisma.Prisma__PermissionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    getPermissionConditions: (permissionId: string) => Prisma.Prisma__PermissionClient<{
        id: string;
        conditions: import("@prisma/client/runtime/client").JsonValue;
        expression: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
};
export default permissionRepository;
//# sourceMappingURL=permission.repository.d.ts.map