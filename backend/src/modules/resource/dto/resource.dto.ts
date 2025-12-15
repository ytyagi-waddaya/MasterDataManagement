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

export const createResourceSchema = z
  .object({
    name: nameSchema,
    description: descriptionSchema,
    isActive: z.boolean().optional().default(true),
    isSystem: z.boolean().optional().default(false),
    moduleId: z
      .string()
      .uuid()
      .optional()
      .or(z.literal("")) 
      .transform((val) => (val === "" ? undefined : val)),
  })
  .strict();

export const updateResourceSchema = z
  .object({
    name: nameSchema,
    description: descriptionSchema,
    isActive: z.boolean().optional(),
    isSystem: z.boolean().optional(),
  })
  .strict();

export const resourceIdSchema = z
  .object({
    resourceId: z.uuid("Invalid Resource ID format"),
  })
  .strict();

export const resourceIdsSchema = z
  .object({
    resourceIds: z
      .array(z.uuid("Invalid Resource ID format"))
      .nonempty("At least one Resource ID is required"),
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
] as const;

export const resourceFilterSchema = z
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

export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
export type ResourceId = z.infer<typeof resourceIdSchema>;
export type ResourceIds = z.infer<typeof resourceIdsSchema>;
export type ResourceFilterInput = z.infer<typeof resourceFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
