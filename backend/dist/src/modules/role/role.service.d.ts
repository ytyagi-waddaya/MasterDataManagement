import { ActorMeta } from "../../types/action.types.js";
import { CreateRoleInput, UpdateRoleInput, RoleId, RoleIds, RoleFilterInput } from "./dto/role.dto.js";
declare const roleService: {
    createRole: (data: CreateRoleInput, meta?: ActorMeta) => Promise<{
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
    getRoles: (options?: Partial<RoleFilterInput>) => Promise<{
        data: ({
            permissions: ({
                permission: {
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
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                roleId: string;
                conditions: import("@prisma/client/runtime/client").JsonValue | null;
                expression: string | null;
                permissionId: string;
                accessLevel: import("../../../prisma/generated/enums.js").AccessLevel;
            })[];
        } & {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            description: string | null;
            key: string;
            isSystem: boolean;
        })[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    getRoleById: ({ roleId }: RoleId) => Promise<{
        users: ({
            user: {
                email: string;
                type: import("../../../prisma/generated/enums.js").UserType;
                password: string;
                id: string;
                createdAt: Date;
                name: string;
                department: string | null;
                location: string | null;
                status: import("../../../prisma/generated/enums.js").UserStatus;
                updatedAt: Date;
                attributes: import("@prisma/client/runtime/client").JsonValue | null;
                deletedAt: Date | null;
            };
        } & {
            userId: string;
            id: string;
            assignedAt: Date;
            roleId: string;
        })[];
        permissions: ({
            permission: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roleId: string;
            conditions: import("@prisma/client/runtime/client").JsonValue | null;
            expression: string | null;
            permissionId: string;
            accessLevel: import("../../../prisma/generated/enums.js").AccessLevel;
        })[];
        parents: ({
            parent: {
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
        } & {
            id: string;
            childId: string;
            parentId: string;
        })[];
        children: ({
            child: {
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
        } & {
            id: string;
            childId: string;
            parentId: string;
        })[];
    } & {
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
    updateRoleById: (id: RoleId, data: UpdateRoleInput, meta?: ActorMeta) => Promise<{
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
    archiveRole: ({ roleId }: RoleId, meta?: ActorMeta) => Promise<{
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
    restoreRole: ({ roleId }: RoleId, meta?: ActorMeta) => Promise<{
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
    deleteRole: ({ roleId }: RoleId, meta?: ActorMeta) => Promise<{
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
    archiveRoles: (ids: RoleIds, meta?: ActorMeta) => Promise<{
        count: number;
        archived: string[];
    }>;
    restoreRoles: (ids: RoleIds, meta?: ActorMeta) => Promise<{
        count: number;
        restored: string[];
    }>;
    deleteRoles: (ids: RoleIds, meta?: ActorMeta) => Promise<{
        count: number;
        deleted: string[];
        skippedSystemRoles: string[];
    }>;
};
export default roleService;
//# sourceMappingURL=role.service.d.ts.map