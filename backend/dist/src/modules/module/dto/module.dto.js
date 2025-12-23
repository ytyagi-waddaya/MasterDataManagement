import { z } from "zod";
const nameSchema = z
    .string({ message: "Module name is required" })
    .min(2, { message: "Module name must be at least 2 characters long" })
    .max(50, { message: "Module name cannot exceed 50 characters" });
const descriptionSchema = z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((val) => {
    if (val === undefined || val === null)
        return null;
    const t = val.trim();
    return t.length === 0 ? null : t;
})
    .default(null);
export const createModuleSchema = z
    .object({
    name: nameSchema,
    description: descriptionSchema,
    isActive: z.boolean().optional().default(true),
    isSystem: z.boolean().optional().default(false),
})
    .strict();
export const updateModuleSchema = z
    .object({
    name: nameSchema.optional(),
    description: descriptionSchema,
    isActive: z.boolean().optional(),
    isSystem: z.boolean().optional(),
})
    .strict();
export const moduleIdSchema = z
    .object({
    moduleId: z.uuid({ message: "Invalid Module ID format" }),
})
    .strict();
export const moduleIdsSchema = z
    .object({
    moduleIds: z
        .array(z.uuid({ message: "Invalid Module ID format" }))
        .nonempty("At least one Module ID is required"),
})
    .strict();
export const allowedSortColumns = [
    "id",
    "name",
    "description",
    "isSystem",
    "isActive",
    "createdAt",
    "updatedAt",
    "deletedAt"
];
export const moduleFilterSchema = z
    .object({
    skip: z.coerce.number().int().min(0).default(0),
    take: z.coerce.number().int().min(1).max(100).default(10),
    isActive: z.enum(["all", "active", "inactive"]).default("all"),
    isSystem: z.enum(["all", "true", "false"]).default("all"),
    search: z
        .string()
        .trim()
        .optional()
        .transform((v) => (v?.length ? v : undefined)),
    name: z
        .string()
        .trim()
        .optional()
        .transform((v) => (v?.length ? v : undefined)),
    createdFrom: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date format"),
    createdTo: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date format"),
    sortBy: z.enum(allowedSortColumns).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
})
    .strict();
//# sourceMappingURL=module.dto.js.map