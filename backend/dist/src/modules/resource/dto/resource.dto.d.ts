import { z } from "zod";
export declare const createResourceSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    isSystem: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    moduleId: z.ZodPipe<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>, z.ZodTransform<string | undefined, string | undefined>>;
}, z.core.$strict>;
export declare const updateResourceSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isSystem: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export declare const resourceIdSchema: z.ZodObject<{
    resourceId: z.ZodUUID;
}, z.core.$strict>;
export declare const resourceIdsSchema: z.ZodObject<{
    resourceIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strict>;
export declare const allowedSortColumns: readonly ["name", "description", "isSystem", "isActive", "id", "createdAt", "updatedAt", "deletedAt"];
export declare const resourceFilterSchema: z.ZodObject<{
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
export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
export type ResourceId = z.infer<typeof resourceIdSchema>;
export type ResourceIds = z.infer<typeof resourceIdsSchema>;
export type ResourceFilterInput = z.infer<typeof resourceFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
//# sourceMappingURL=resource.dto.d.ts.map