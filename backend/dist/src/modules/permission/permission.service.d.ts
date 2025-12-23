import { ActorMeta } from "../../types/action.types.js";
import { UpdatePermissionConditionInput, UpdatePermissionInput, PermissionId, PermissionIds, PermissionFilterInput } from "./dto/permission.dto.js";
import { ResourceId } from "../resource/dto/resource.dto.js";
import { ActionId } from "../action/dto/action.dto.js";
import { RoleId } from "../role/dto/role.dto.js";
declare const permissionService: {
    generatePermissions: () => Promise<{
        created: number;
    }>;
    getPermissions: (options?: Partial<PermissionFilterInput>) => Promise<{
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
    getPermissionById: ({ permissionId }: PermissionId) => Promise<{
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
    }>;
    updatePermissionById: (id: PermissionId, data: UpdatePermissionInput, meta?: ActorMeta) => Promise<{
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
    }>;
    updatePermissionCondition: (id: PermissionId, input: UpdatePermissionConditionInput, meta?: ActorMeta) => Promise<{
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
    }>;
    archivePermission: ({ permissionId }: PermissionId, meta?: ActorMeta) => Promise<{
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
    }>;
    restorePermission: ({ permissionId }: PermissionId, meta?: ActorMeta) => Promise<{
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
    }>;
    deletePermission: ({ permissionId }: PermissionId, meta?: ActorMeta) => Promise<{
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
    }>;
    archivePermissions: (ids: PermissionIds, meta?: ActorMeta) => Promise<{
        count: number;
        archived: string[];
    }>;
    restorePermissions: (ids: PermissionIds, meta?: ActorMeta) => Promise<{
        count: number;
        restored: string[];
    }>;
    deletePermissions: (ids: PermissionIds, meta?: ActorMeta) => Promise<{
        count: number;
        deleted: string[];
        skippedSystemPermissions: string[];
    }>;
    assignPermissionsToRole: ({ roleId, permissionIds, }: {
        roleId: string;
        permissionIds: string[];
    }) => Promise<{
        assigned: number;
    }>;
    getPermissionsByRole: ({ roleId }: RoleId) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }>;
    getPermissionsByResource: ({ resourceId }: ResourceId) => Promise<{
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
    }>;
    getPermissionsByAction: ({ actionId }: ActionId) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }>;
};
export default permissionService;
//# sourceMappingURL=permission.service.d.ts.map