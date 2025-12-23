import { z } from "zod";
export declare const assignUserRoleSchema: z.ZodObject<{
    userId: z.ZodUUID;
    roleId: z.ZodUUID;
}, z.core.$strip>;
export declare const assignUserRolesBulkSchema: z.ZodObject<{
    userIds: z.ZodArray<z.ZodUUID>;
    roleIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strip>;
export declare const revokeUserRoleSchema: z.ZodObject<{
    userId: z.ZodUUID;
    roleId: z.ZodUUID;
}, z.core.$strip>;
export declare const revokeUserRolesBulkSchema: z.ZodObject<{
    userIds: z.ZodArray<z.ZodUUID>;
    roleIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strip>;
export declare const userIdSchema: z.ZodObject<{
    userId: z.ZodUUID;
}, z.core.$strip>;
export declare const roleIdSchema: z.ZodObject<{
    roleId: z.ZodUUID;
}, z.core.$strip>;
export type AssignUserRoleInput = z.infer<typeof assignUserRoleSchema>;
export type AssignUserRolesBulkInput = z.infer<typeof assignUserRolesBulkSchema>;
export type RevokeUserRoleInput = z.infer<typeof revokeUserRoleSchema>;
export type RevokeUserRolesBulkInput = z.infer<typeof revokeUserRolesBulkSchema>;
export type UserId = z.infer<typeof userIdSchema>;
export type RoleId = z.infer<typeof roleIdSchema>;
//# sourceMappingURL=userRoles.types.d.ts.map