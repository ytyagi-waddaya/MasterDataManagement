import { z } from "zod";
import { Prisma } from "../../../../prisma/generated/client.js";

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

export const createPermissionSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  resourceId: z.uuid(),
  actionId: z.uuid(),
  isActive: z.boolean().default(true),
  isSystem: z.boolean().default(true),
});

export const updatePermissionConditionSchema = z.object({
  conditions: z
    .record(z.string(), z.any())
    .optional()
    .transform((val) => (val ? val : Prisma.JsonNull)),
  expression: z
    .string()
    .optional()
    .transform((val) => val ?? null),
});

export const updatePermissionSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),
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
  "resourceId",
  "actionId"
] as const;

export const permissionFilterSchema = z.object({
  resourceId: z.uuid().optional(),
  actionId: z.uuid().optional(),
  moduleId: z.uuid().optional(),
  search: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val?.length ? val : undefined)),
  skip: z.coerce.number().int().min(0).default(0),
  take: z.coerce.number().int().min(1).max(100).default(10),

  isActive: z.enum(["all", "active", "inactive"]).default("all"),
  isSystem: z.enum(["all", "true", "false"]).default("all"),
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
});

export const permissionIdSchema = z.object({
  permissionId: z.uuid(),
});

export const permissionIdsSchema = z.object({
  permissionIds: z.array(z.uuid()).nonempty(),
});

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;
export type UpdatePermissionConditionInput = z.infer<
  typeof updatePermissionConditionSchema
>;
export type PermissionFilterInput = z.infer<typeof permissionFilterSchema>;
export type PermissionId = z.infer<typeof permissionIdSchema>;
export type PermissionIds = z.infer<typeof permissionIdsSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
