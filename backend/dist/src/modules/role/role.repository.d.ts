import { Prisma } from "../../../prisma/generated/client.js";
import { RoleFilterInput, RoleId } from "./dto/role.dto.js";
declare const roleRepository: {
    create: (data: Prisma.RoleCreateInput) => Prisma.Prisma__RoleClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    read: (filters: RoleFilterInput) => Promise<{
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
    update: ({ roleId }: RoleId, data: Prisma.RoleUpdateInput) => Prisma.Prisma__RoleClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    archive: ({ roleId }: RoleId) => Prisma.Prisma__RoleClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    restore: ({ roleId }: RoleId) => Prisma.Prisma__RoleClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    delete: ({ roleId }: RoleId) => Prisma.Prisma__RoleClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByKey: (key: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null>;
    findByNameAndTenant: (name: string) => Prisma.Prisma__RoleClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    readOne: ({ roleId }: RoleId) => Prisma.Prisma__RoleClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    roleById: ({ roleId }: RoleId) => Prisma.Prisma__RoleClient<({
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findManyByIds: (RoleIds: string[]) => Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }[]>;
    isDuplicateName: (name: string, roleId: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null>;
};
export default roleRepository;
//# sourceMappingURL=role.repository.d.ts.map