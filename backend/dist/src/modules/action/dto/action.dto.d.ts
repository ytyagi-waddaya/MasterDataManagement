import { z } from "zod";
export declare const createActionSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    isSystem: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strict>;
export declare const updateActionSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isSystem: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export declare const actionIdSchema: z.ZodObject<{
    actionId: z.ZodUUID;
}, z.core.$strict>;
export declare const actionIdsSchema: z.ZodObject<{
    actionIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strict>;
export declare const allowedSortColumns: readonly ["name", "description", "isSystem", "isActive", "id", "createdAt", "updatedAt", "deletedAt", "moduleId"];
export declare const actionFilterSchema: z.ZodObject<{
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
    moduleId: z.ZodOptional<z.ZodString>;
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
        moduleId: "moduleId";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strict>;
export type CreateActionInput = z.infer<typeof createActionSchema>;
export type UpdateActionInput = z.infer<typeof updateActionSchema>;
export type ActionId = z.infer<typeof actionIdSchema>;
export type ActionIds = z.infer<typeof actionIdsSchema>;
export type ActionFilterInput = z.infer<typeof actionFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
//# sourceMappingURL=action.dto.d.ts.map