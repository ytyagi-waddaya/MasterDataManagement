import { Prisma } from "../../../prisma/generated/client.js";
import { CreateUserInput, UserEmail, userFilterInput, UserId } from "./dto/user.dto.js";
declare const usersRepository: {
    create: (data: Prisma.UserCreateInput) => Prisma.Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    /** Bulk create users */
    createMany: (data: CreateUserInput[]) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    read: (filters: userFilterInput) => Promise<{
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
    readOne: ({ userId }: UserId) => Prisma.Prisma__UserClient<({
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    me: ({ userId }: {
        userId: string;
    }) => Prisma.Prisma__UserClient<({
        roles: ({
            role: {
                permissions: ({
                    permission: {
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByEmail: ({ email }: UserEmail) => Prisma.Prisma__UserClient<({
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByOnlyEmail: ({ email }: UserEmail) => Prisma.Prisma__UserClient<({
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByEmails: (emails: string[]) => Promise<UserEmail[]>;
    exists: (email: string) => Promise<boolean>;
    update: ({ userId }: UserId, data: Prisma.UserUpdateInput) => Prisma.Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    archive: ({ userId }: UserId) => Promise<{
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
    }>;
    activate: ({ userId }: UserId) => Promise<{
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
    }>;
    delete: ({ userId }: UserId) => Promise<{
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
    }>;
    findActiveUsers: (skip?: number, take?: number) => Prisma.PrismaPromise<({
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
    })[]>;
    countAll: (where?: Record<string, any>) => Prisma.PrismaPromise<number>;
    getStats: () => Promise<{
        total: number;
        active: number;
        deleted: number;
        byRole: {
            role: string;
            count: number;
        }[];
    }>;
    getSignupStats: (days?: number) => Promise<{
        date: string;
        count: number;
    }[]>;
    findManyByIds: (UserIds: string[]) => Prisma.PrismaPromise<{
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
    }[]>;
};
export default usersRepository;
//# sourceMappingURL=user.repository.d.ts.map