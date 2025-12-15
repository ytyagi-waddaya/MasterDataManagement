import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters");

const fieldOptionSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const dynamicFieldSchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(1),
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
  placeholder: z.string().nullable().optional(),
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

  showInList: z.boolean().optional().default(false),
  key: z
    .string()
    .min(1, "Field key is required")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Key must use letters, numbers, and underscores only"
    ),
});

export const formSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  order: z.number(),
  collapsed: z.boolean().optional(),
  fields: z.array(dynamicFieldSchema),
});

export const updateFieldsSchema = z.array(formSectionSchema);

export const createMasterObjectSchema = z.object({
  name: nameSchema,
  key: z.string().min(2),
  fields: updateFieldsSchema.optional(),
});

export const updateMasterObjectSchema = z.object({
  name: nameSchema.optional(),
  fields: updateFieldsSchema.optional(),
  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),
});

export type createMasterObjectInput = z.infer<typeof createMasterObjectSchema>;
export type updateMasterObjectInput = z.infer<typeof updateMasterObjectSchema>;
