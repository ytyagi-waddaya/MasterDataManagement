import { z } from "zod";
export declare const createPermissionSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    resourceId: z.ZodUUID;
    actionId: z.ZodUUID;
    isActive: z.ZodDefault<z.ZodBoolean>;
    isSystem: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updatePermissionConditionSchema: z.ZodObject<{
    conditions: z.ZodPipe<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>, z.ZodTransform<Record<string, any> | import("@prisma/client-runtime-utils").JsonNullClass, Record<string, any> | undefined>>;
    expression: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
}, z.core.$strip>;
export declare const updatePermissionSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isSystem: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const allowedSortColumns: readonly ["name", "description", "isSystem", "isActive", "id", "createdAt", "updatedAt", "deletedAt", "resourceId", "actionId"];
export declare const permissionFilterSchema: z.ZodObject<{
    resourceId: z.ZodOptional<z.ZodUUID>;
    actionId: z.ZodOptional<z.ZodUUID>;
    moduleId: z.ZodOptional<z.ZodUUID>;
    search: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
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
        resourceId: "resourceId";
        isSystem: "isSystem";
        actionId: "actionId";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const permissionIdSchema: z.ZodObject<{
    permissionId: z.ZodUUID;
}, z.core.$strip>;
export declare const permissionIdsSchema: z.ZodObject<{
    permissionIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strip>;
export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;
export type UpdatePermissionConditionInput = z.infer<typeof updatePermissionConditionSchema>;
export type PermissionFilterInput = z.infer<typeof permissionFilterSchema>;
export type PermissionId = z.infer<typeof permissionIdSchema>;
export type PermissionIds = z.infer<typeof permissionIdsSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
//# sourceMappingURL=permission.dto.d.ts.map