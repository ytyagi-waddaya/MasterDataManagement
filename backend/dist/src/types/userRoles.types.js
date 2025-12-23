import { z } from "zod";
export const assignUserRoleSchema = z.object({
    userId: z.uuid("Invalid User ID format"),
    roleId: z.uuid("Invalid Role ID format"),
});
export const assignUserRolesBulkSchema = z.object({
    userIds: z.array(z.uuid("Invalid User ID format")).nonempty(),
    roleIds: z.array(z.uuid("Invalid Role ID format")).nonempty(),
});
export const revokeUserRoleSchema = z.object({
    userId: z.uuid("Invalid User ID format"),
    roleId: z.uuid("Invalid Role ID format"),
});
export const revokeUserRolesBulkSchema = z.object({
    userIds: z.array(z.uuid("Invalid User ID format")).nonempty(),
    roleIds: z.array(z.uuid("Invalid Role ID format")).nonempty(),
});
export const userIdSchema = z.object({ userId: z.uuid() });
export const roleIdSchema = z.object({ roleId: z.uuid() });
//# sourceMappingURL=userRoles.types.js.map