import { RoleIds } from "../modules/role/dto/role.dto.js";
import { UserIds } from "../modules/user/dto/user.dto.js";
import { RoleId, UserId } from "../types/userRoles.types.js";
declare const userRolesRepository: {
    /** Assign a single role to a single user */
    assign: (userId: UserId, roleId: RoleId) => Promise<{
        userId: string;
        id: string;
        assignedAt: Date;
        roleId: string;
    }>;
    /** Assign multiple roles to multiple users */
    assignMany: (userIds: UserIds, roleIds: RoleIds) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
    /** Revoke a single role from a single user */
    revoke: (userId: UserId, roleId: RoleId) => Promise<{
        userId: string;
        id: string;
        assignedAt: Date;
        roleId: string;
    }>;
    /** Revoke multiple roles from multiple users */
    revokeMany: (userIds: UserIds, roleIds: RoleIds) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
    /** Get all roles assigned to a specific user */
    findRolesByUser: (userId: UserId) => Promise<({
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
    })[]>;
    /** Get all users assigned to a specific role */
    findUsersByRole: (roleId: RoleId) => Promise<({
        user: {
            email: string;
            type: import("../../prisma/generated/enums.js").UserType;
            password: string;
            id: string;
            createdAt: Date;
            name: string;
            department: string | null;
            location: string | null;
            status: import("../../prisma/generated/enums.js").UserStatus;
            updatedAt: Date;
            attributes: import("@prisma/client/runtime/client").JsonValue | null;
            deletedAt: Date | null;
        };
    } & {
        userId: string;
        id: string;
        assignedAt: Date;
        roleId: string;
    })[]>;
};
export default userRolesRepository;
//# sourceMappingURL=userRoles.repository.d.ts.map