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


export type AssignUserRoleInput = z.infer<typeof assignUserRoleSchema>;
export type AssignUserRolesBulkInput = z.infer<typeof assignUserRolesBulkSchema>;
export type RevokeUserRoleInput = z.infer<typeof revokeUserRoleSchema>;
export type RevokeUserRolesBulkInput = z.infer<typeof revokeUserRolesBulkSchema>;
export type UserId = z.infer<typeof userIdSchema>;
export type RoleId = z.infer<typeof roleIdSchema>;
