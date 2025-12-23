import { z } from "zod";
export declare const createModuleSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    isSystem: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strict>;
export declare const updateModuleSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isSystem: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export declare const moduleIdSchema: z.ZodObject<{
    moduleId: z.ZodUUID;
}, z.core.$strict>;
export declare const moduleIdsSchema: z.ZodObject<{
    moduleIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strict>;
export declare const allowedSortColumns: readonly ["id", "name", "description", "isSystem", "isActive", "createdAt", "updatedAt", "deletedAt"];
export declare const moduleFilterSchema: z.ZodObject<{
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
export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;
export type ModuleId = z.infer<typeof moduleIdSchema>;
export type ModuleIds = z.infer<typeof moduleIdsSchema>;
export type ModuleFilterInput = z.infer<typeof moduleFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
//# sourceMappingURL=module.dto.d.ts.map