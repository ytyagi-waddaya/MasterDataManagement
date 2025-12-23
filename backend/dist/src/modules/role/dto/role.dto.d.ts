import { z } from "zod";
export declare const createRoleSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isSystem: z.ZodDefault<z.ZodBoolean>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updateRoleSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isSystem: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const roleIdSchema: z.ZodObject<{
    roleId: z.ZodUUID;
}, z.core.$strip>;
export declare const roleIdsSchema: z.ZodObject<{
    roleIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strip>;
export declare const allowedSortColumns: readonly ["name", "description", "isSystem", "isActive", "id", "createdAt", "updatedAt", "deletedAt"];
export declare const roleFilterSchema: z.ZodObject<{
    skip: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    take: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    isActive: z.ZodDefault<z.ZodEnum<{
        active: "active";
        all: "all";
        inactive: "inactive";
    }>>;
    isSystem: z.ZodDefault<z.ZodEnum<{
        all: "all";
        true: "true";
        false: "false";
    }>>;
    search: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    name: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    createdFrom: z.ZodOptional<z.ZodString>;
    createdTo: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        id: "id";
        createdAt: "createdAt";
        name: "name";
        updatedAt: "updatedAt";
        deletedAt: "deletedAt";
        isActive: "isActive";
        description: "description";
        isSystem: "isSystem";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strict>;
export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type RoleFilterInput = z.infer<typeof roleFilterSchema>;
export type RoleId = z.infer<typeof roleIdSchema>;
export type RoleIds = z.infer<typeof roleIdsSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
//# sourceMappingURL=role.dto.d.ts.map