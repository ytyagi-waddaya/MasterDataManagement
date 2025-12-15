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
    if (val === undefined || val === null) return null;
    const t = (val as string).trim();
    return t.length === 0 ? null : t;
  })
  .default(null);

export const createRoleSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  isSystem: z.boolean().default(false),
  isActive: z.boolean().optional().default(true),
});

export const updateRoleSchema = z.object({
  name: nameSchema,

  description: descriptionSchema,
  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),
});

export const roleIdSchema = z.object({
  roleId: z.uuid("Invalid Action ID format"),
});

export const roleIdsSchema = z.object({
  roleIds: z.array(z.uuid()).nonempty("At least one ID must be provided."),
});

export const allowedSortColumns = [
  "name",
  "description",
  "isSystem",
  "isActive",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
] as const;

export const roleFilterSchema = z
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

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type RoleFilterInput = z.infer<typeof roleFilterSchema>;
export type RoleId = z.infer<typeof roleIdSchema>;
export type RoleIds = z.infer<typeof roleIdsSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
