import { CreateUserInput, UpdateUserInput, userFilterInput, UserId, UserIds } from "./dto/user.dto.js";
import { Prisma } from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
declare const usersService: {
    createUser: (data: CreateUserInput, meta?: ActorMeta) => Promise<Omit<{
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
    }, "email" | "type" | "password" | "id" | "createdAt" | "name" | "department" | "location" | "status" | "updatedAt" | "attributes" | "deletedAt">>;
    createUsers: (data: CreateUserInput[], meta?: ActorMeta) => Promise<Prisma.BatchPayload>;
    getUserStats: () => Promise<{
        summary: {
            total: number;
            active: number;
            deleted: number;
            byRole: {
                role: string;
                count: number;
            }[];
        };
        signups: {
            date: string;
            count: number;
        }[];
        recentActiveUsers: ({
            roles: ({
                role: {
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
                userId: string;
                id: string;
                assignedAt: Date;
                roleId: string;
            })[];
        } & {
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
        })[];
    }>;
    getUsers: (options?: Partial<userFilterInput>) => Promise<{
        data: ({
            roles: ({
                role: {
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
                userId: string;
                id: string;
                assignedAt: Date;
                roleId: string;
            })[];
        } & {
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
        })[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    getUser: ({ userId }: UserId) => Promise<Omit<{
        roles: ({
            role: {
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
            userId: string;
            id: string;
            assignedAt: Date;
            roleId: string;
        })[];
    } & {
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
    }, "email" | "type" | "password" | "id" | "createdAt" | "name" | "department" | "location" | "status" | "updatedAt" | "attributes" | "deletedAt" | "roles">>;
    updateUser: (id: UserId, data: UpdateUserInput, meta?: ActorMeta) => Promise<Omit<{
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
    }, "email" | "type" | "password" | "id" | "createdAt" | "name" | "department" | "location" | "status" | "updatedAt" | "attributes" | "deletedAt">>;
    archiveUser: ({ userId }: UserId, meta?: ActorMeta) => Promise<Omit<{
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
    }, "email" | "type" | "password" | "id" | "createdAt" | "name" | "department" | "location" | "status" | "updatedAt" | "attributes" | "deletedAt">>;
    restoreUser: ({ userId }: UserId, meta?: ActorMeta) => Promise<Omit<{
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
    }, "email" | "type" | "password" | "id" | "createdAt" | "name" | "department" | "location" | "status" | "updatedAt" | "attributes" | "deletedAt">>;
    deleteUser: ({ userId }: UserId, meta?: ActorMeta) => Promise<Omit<{
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
    }, "email" | "type" | "password" | "id" | "createdAt" | "name" | "department" | "location" | "status" | "updatedAt" | "attributes" | "deletedAt">>;
    archiveUsers: (ids: UserIds, meta?: ActorMeta) => Promise<{
        count: number;
        archived: string[];
    }>;
    restoreUsers: (ids: UserIds, meta?: ActorMeta) => Promise<{
        count: number;
        restored: string[];
    }>;
    deleteUsers: (ids: UserIds, meta?: ActorMeta) => Promise<{
        count: number;
        deleted: string[];
        skippedSystemUsers: string[];
    }>;
    me: ({ userId }: UserId) => Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            department: string | null;
            location: string | null;
            attributes: import("@prisma/client/runtime/client").JsonValue;
            status: import("../../../prisma/generated/enums.js").UserStatus;
            type: import("../../../prisma/generated/enums.js").UserType;
        };
        roles: {
            id: string;
            name: string;
            key: string;
            description: string | null;
            isSystem: boolean;
            isActive: boolean;
        }[];
        permissions: any[];
    }>;
};
export default usersService;
//# sourceMappingURL=user.service.d.ts.map