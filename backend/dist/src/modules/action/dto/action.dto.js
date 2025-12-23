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
export const createActionSchema = z
    .object({
    name: nameSchema,
    description: descriptionSchema,
    isActive: z.boolean().optional().default(true),
    isSystem: z.boolean().default(false),
})
    .strict();
export const updateActionSchema = z
    .object({
    name: nameSchema,
    description: descriptionSchema,
    isActive: z.boolean().optional(),
    isSystem: z.boolean().optional(),
})
    .strict();
export const actionIdSchema = z
    .object({
    actionId: z.uuid("Invalid Action ID format"),
})
    .strict();
export const actionIdsSchema = z
    .object({
    actionIds: z
        .array(z.uuid("Invalid Action ID format"))
        .nonempty("At least one Action ID is required"),
})
    .strict();
export const allowedSortColumns = [
    "name",
    "description",
    "isSystem",
    "isActive",
    "id",
    "createdAt",
    "updatedAt",
    "deletedAt",
    "moduleId",
];
export const actionFilterSchema = z
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
    moduleId: z.string().uuid("Invalid Module ID format").optional(),
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
//# sourceMappingURL=action.dto.js.map