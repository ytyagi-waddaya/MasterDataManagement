import { ActorMeta } from "../types/action.types.js";
import { UserId, UserIds } from "../modules/user/dto/user.dto.js";
import { RoleId, RoleIds } from "../modules/role/dto/role.dto.js";
declare const userRolesService: {
    assignUserRole: ({ userId }: UserId, { roleId }: RoleId, meta?: ActorMeta) => Promise<{
        userId: string;
        id: string;
        assignedAt: Date;
        roleId: string;
    }>;
    assignUserRolesBulk: (data: {
        userIds: UserIds;
        roleIds: RoleIds;
    }, meta?: ActorMeta) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
    revokeUserRole: ({ userId }: UserId, { roleId }: RoleId, meta?: ActorMeta) => Promise<{
        userId: string;
        id: string;
        assignedAt: Date;
        roleId: string;
    }>;
    revokeUserRolesBulk: (data: {
        userIds: UserIds;
        roleIds: RoleIds;
    }, meta?: ActorMeta) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
    getRolesByUser: ({ userId }: UserId) => Promise<({
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
    getUsersByRole: ({ roleId }: RoleId) => Promise<({
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
export default userRolesService;
//# sourceMappingURL=userRoles.service.d.ts.map