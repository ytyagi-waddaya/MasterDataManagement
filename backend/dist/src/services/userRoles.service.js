import userRolesRepository from "../repositories/userRoles.repository.js";
import { assignUserRolesBulkSchema, revokeUserRolesBulkSchema, } from "../types/userRoles.types.js";
import { createAuditLog } from "../utils/auditLog.js";
import { AuditEntity, AuditAction, PerformedByType, } from "../../prisma/generated/client.js";
import { BadRequestException } from "../utils/appError.js";
import { userIdSchema } from "../modules/user/dto/user.dto.js";
import { roleIdSchema } from "../modules/role/dto/role.dto.js";
const userRolesService = {
    assignUserRole: async ({ userId }, { roleId }, meta) => {
        const validatedUser = userIdSchema.parse({ userId });
        const validatedRole = roleIdSchema.parse({ roleId });
        const assigned = await userRolesRepository.assign({ userId: validatedUser.userId }, { roleId: validatedRole.roleId });
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER_ROLE,
            action: AuditAction.CREATE,
            comment: `Assigned role ${validatedRole.roleId} to user ${validatedUser.userId}`,
            after: assigned,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return assigned;
    },
    assignUserRolesBulk: async (data, meta) => {
        const validated = assignUserRolesBulkSchema.parse(data);
        if (!validated.userIds.length || !validated.roleIds.length)
            throw new BadRequestException("No userIds or roleIds provided for bulk assignment");
        const assigned = await userRolesRepository.assignMany({ userIds: validated.userIds }, { roleIds: validated.roleIds });
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER_ROLE,
            action: AuditAction.CREATE,
            comment: `Bulk role assignment performed`,
            after: { ...validated },
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return assigned;
    },
    revokeUserRole: async ({ userId }, { roleId }, meta) => {
        const validatedUser = userIdSchema.parse({ userId });
        const validatedRole = roleIdSchema.parse({ roleId });
        const revoked = await userRolesRepository.revoke({ userId: validatedUser.userId }, { roleId: validatedRole.roleId });
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER_ROLE,
            action: AuditAction.DELETE,
            comment: `Revoked role ${validatedRole.roleId} from user ${validatedUser.userId}`,
            after: revoked,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return revoked;
    },
    revokeUserRolesBulk: async (data, meta) => {
        const validated = revokeUserRolesBulkSchema.parse(data);
        const revoked = await userRolesRepository.revokeMany({ userIds: validated.userIds }, { roleIds: validated.roleIds });
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER_ROLE,
            action: AuditAction.DELETE,
            comment: `Bulk role revocation performed`,
            after: { ...validated },
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return revoked;
    },
    getRolesByUser: async ({ userId }) => {
        const parseduserId = userIdSchema.parse({ userId });
        return userRolesRepository.findRolesByUser(parseduserId);
    },
    getUsersByRole: async ({ roleId }) => {
        const parsedroleId = roleIdSchema.parse({ roleId });
        return userRolesRepository.findUsersByRole(parsedroleId);
    },
};
export default userRolesService;
//# sourceMappingURL=userRoles.service.js.map