import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters");

export const fieldConfigSchema = z
  .object({
    /* ================= META ================= */

    meta: z
      .object({
        key: z.string().min(1),
        label: z.string().min(1),
        category: z.enum([
          "INPUT",
          "SYSTEM",
          "CALCULATED",
          "REFERENCE",
        ]),
        system: z.boolean().optional(),
        locked: z.boolean().optional(),
        deprecated: z.boolean().optional(),
      })
      .strict(),

    /* ================= DATA ================= */

    data: z
      .object({
        type: z.enum([
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "DATE",
          "DATETIME",
          "JSON",
        ]),
        default: z.any().optional(),
        nullable: z.boolean().optional(),
        precision: z.number().optional(),
        scale: z.number().optional(),
      })
      .strict(),

    /* ================= UI ================= */

    ui: z
      .object({
        widget: z.enum([
          "TEXT",
          "TEXTAREA",
          "NUMBER",
          "CURRENCY",
          "SELECT",
          "RADIO",
          "CHECKBOX",
          "DATE",
          "DATETIME",
        ]),
        placeholder: z.string().optional(),
        helpText: z.string().optional(),

        layout: z
          .object({
            width: z
              .enum([
                "full",
                "half",
                "third",
                "quarter",
                "two-third",
              ])
              .optional(),
            order: z.number().optional(),
            section: z.string().optional(),
          })
          .strict()
          .optional(),
      })
      .strict()
      .optional(),

    /* ================= VALIDATION ================= */

    validation: z
      .object({
        required: z.boolean().optional(),
        rules: z
          .array(
            z
              .object({
                type: z.enum([
                  "REQUIRED",
                  "RANGE",
                  "MIN",
                  "MAX",
                  "REGEX",
                  "REQUIRED_IF",
                ]),
                params: z.any().optional(),
                message: z.string(),
                severity: z.enum(["ERROR", "WARN"]).optional(),
              })
              .strict()
          )
          .optional(),
      })
      .strict()
      .optional(),

    /* ================= VISIBILITY ================= */

    visibility: z
      .object({
        visible: z.boolean().optional(),
        conditions: z
          .array(
            z
              .object({
                field: z.string(),
                operator: z.enum(["EQUALS", "IN", "GT", "LT"]),
                value: z.any(),
              })
              .strict()
          )
          .optional(),
      })
      .strict()
      .optional(),

    /* ================= PERMISSIONS ================= */

    permissions: z
      .object({
        read: z
          .object({
            roles: z.array(z.string()).optional(),
            users: z.array(z.string()).optional(),
            conditions: z
              .array(
                z
                  .object({
                    field: z.string(),
                    equals: z.any(),
                  })
                  .strict()
              )
              .optional(),
          })
          .strict()
          .optional(),

        write: z
          .object({
            roles: z.array(z.string()).optional(),
            users: z.array(z.string()).optional(),
            conditions: z
              .array(
                z
                  .object({
                    field: z.string(),
                    equals: z.any(),
                  })
                  .strict()
              )
              .optional(),
          })
          .strict()
          .optional(),
      })
      .strict()
      .optional(),

    /* ================= BEHAVIOR ================= */

    behavior: z
      .object({
        readOnly: z.boolean().optional(),

        lockWhen: z
          .object({
            field: z.string(),
            equals: z.any(),
          })
          .strict()
          .optional(),

        formula: z
          .object({
            expression: z.string().min(1),
            dependencies: z.array(z.string()).min(1),
          })
          .strict()
          .optional(),
      })
      .strict()
      .optional(),
  })
  .strict();


export const updateMasterObjectSchema = z
  .object({
    name: nameSchema.optional(),
    isActive: z.boolean().optional(),

    schema: z.array(fieldConfigSchema).optional(),

    publish: z.boolean().optional(),
  })
  .strict();

export const createMasterObjectSchema = z
  .object({
    name: nameSchema,
    key: z.string().min(2),
    // fields: updateFieldsSchema.optional(),
  })
  .strict();

/* ======================================================
   PARAMS / FILTERS
====================================================== */

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
      .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date"),

    createdTo: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date"),

    sortBy: z.enum(allowedSortColumns).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict();

/* ======================================================
   TYPES
====================================================== */

export type CreateMasterObjectInput = z.infer<typeof createMasterObjectSchema>;
export type UpdateMasterObjectInput = z.infer<typeof updateMasterObjectSchema>;
export type masterObjectId = z.infer<typeof masterObjectIdSchema>;
export type masterObjectFilterInput = z.infer<typeof masterObjectFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
