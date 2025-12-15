import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters");

const fieldOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const dynamicFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum([
    "text",
    "textarea",
    "number",
    "select",
    "checkbox",
    "date",
    "datetime",
    "email",
    "phone",
    "currency",
    "radio",
  ]),
  required: z.boolean().optional(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.any().optional(),
  order: z.number(),

  layout: z.enum(["full", "half", "third", "quarter", "two-third"]).optional(),

  min: z.number().nullable().optional(),
  max: z.number().nullable().optional(),

  options: z.array(fieldOptionSchema).optional(),

  visibleIf: z
    .object({
      fieldId: z.string().nullable(),
      value: z.any(),
    })
    .nullable()
    .optional(),

  permissions: z
    .object({
      read: z.array(z.string()).optional(),
      write: z.array(z.string()).optional(),
    })
    .optional(),
  key: z
    .string()
    .min(1, "Field key is required")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Key must use letters, numbers, and underscores only"
    ),
  showInList: z.boolean().optional().default(false),
});

const formSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  collapsed: z.boolean().optional(),
  fields: z.array(dynamicFieldSchema),
});

export const updateFieldsSchema = z.array(formSectionSchema);

export const createMasterObjectSchema = z.object({
  name: nameSchema,
  key: z.string().min(2),
  fields: updateFieldsSchema.optional,
});

export const updateMasterObjectSchema = z.object({
  name: nameSchema.optional(),
  fields: updateFieldsSchema.optional(),
  isActive: z.boolean().optional().default(true),
  isSystem: z.boolean().optional().default(false),
});

export const masterObjectIdSchema = z.object({
  masterObjectId: z.uuid("Invalid MasterObject ID"),
});

export const allowedSortColumns = [
  "name",
  "isSystem",
  "isActive",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
] as const;

export const masterObjectFilterSchema = z
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

export type createMasterObjectInput = z.infer<typeof createMasterObjectSchema>;
export type updateMasterObjectInput = z.infer<typeof updateMasterObjectSchema>;
export type masterObjectId = z.infer<typeof masterObjectIdSchema>;
export type masterObjectFilterInput = z.infer<typeof masterObjectFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
