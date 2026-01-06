import { z } from "zod";
import { FieldType } from "../../../../prisma/generated/enums.js";

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters");

export const createMasterObjectSchema = z
  .object({
    name: nameSchema,
    key: z.string().min(2),
    // fields: updateFieldsSchema.optional(),
  })
  .strict();

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

export type CreateMasterObjectInput = z.infer<typeof createMasterObjectSchema>;
export type masterObjectId = z.infer<typeof masterObjectIdSchema>;
export type masterObjectFilterInput = z.infer<typeof masterObjectFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];

export const fieldConfigSchema = z
  .object({
    meta: z
      .object({
        key: z.string().min(1),
        label: z.string().min(1),
        category: z.enum([
          "INPUT",
          "SYSTEM",
          "CALCULATED",
          "REFERENCE",
          "STRUCTURE",
          "PRESENTATION",
        ]),
        system: z.boolean().optional(),
        locked: z.boolean().optional(),
        deprecated: z.boolean().optional(),
      })
      .strict(),

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
          "FILE",
        ]),

        placeholder: z.string().optional(),
        helpText: z.string().optional(),

        layout: z
          .object({
            width: z
              .enum(["full", "half", "third", "quarter", "two-third"])
              .optional(),
            order: z.number().optional(),
            section: z.string().optional(),
          })
          .strict()
          .optional(),

        format: z
          .object({
            style: z.enum(["currency", "percent", "decimal"]).optional(),
            currency: z.string().optional(),
          })
          .strict()
          .optional(),
      })
      .strict()
      .optional(),

    validation: z
      .object({
        rules: z
          .array(
            z
              .object({
                type: z.enum([
                  "REQUIRED",
                  "MIN",
                  "MAX",
                  "REGEX",
                  "BETWEEN",
                  "EMAIL",
                  "CUSTOM",
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

    visibility: z.any().optional(),
    permissions: z.any().optional(),
    behavior: z
      .object({
        readOnly: z.boolean().optional(),
        formula: z
          .object({
            expression: z.string().min(1),
            dependencies: z.array(z.string()).min(1),
            mode: z.enum(["SYSTEM_RECALC", "ON_CHANGE"]).optional(),
          })
          .strict()
          .optional(),
      })
      .strict()
      .optional(),

    integration: z.any().optional(),
  })
  .strict();

const editorNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.object({
      id: z.string(),
      kind: z.literal("FIELD"),
      field: z.object({
        key: z.string(),
        label: z.string(),
        layout: z.object({
          span: z.number(),
        }),
      }),
    }),

    z.object({
      id: z.string(),
      kind: z.literal("LAYOUT"),
      type: z.enum(["columns", "tabs", "accordion", "repeater"]),
      slots: z.array(
        z.object({
          id: z.string(),
          title: z.string().optional(),
          config: z.any().optional(),
          children: z.array(editorNodeSchema),
        })
      ),
      config: z.any().optional(),
    }),

    z.object({
      id: z.string(),
      kind: z.literal("LAYOUT"),
      type: z.enum(["heading", "divider", "spacer"]),
      config: z.any().optional(),
    }),
  ])
);

const formSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  collapsed: z.boolean().optional(),
  nodes: z.array(editorNodeSchema),
});

export const persistedFormSchemaSchema = z
  .object({
    version: z.number(),
    layout: z.object({
      sections: z.array(formSectionSchema),
    }),
  })
  .strict();

export const updateMasterObjectSchema = z
  .object({
    name: nameSchema.optional(),
    isActive: z.boolean().optional(),

    // Layout DSL (editor truth)
    schema: persistedFormSchemaSchema.optional(),

    // Canonical compiled fields
    fieldConfig: z.array(fieldConfigSchema).optional(),

    // Lifecycle
    publish: z.boolean().optional(),
  })
  .strict();

export type UpdateMasterObjectInput = z.infer<typeof updateMasterObjectSchema>;




export const WIDGET_TO_FIELD_TYPE: Record<string, FieldType> = {
  TEXT: FieldType.TEXT,
  TEXTAREA: FieldType.TEXT,
  RICH_TEXT: FieldType.RICH_TEXT,

  NUMBER: FieldType.NUMBER,
  CURRENCY: FieldType.NUMBER,

  SELECT: FieldType.SELECT,
  RADIO: FieldType.RADIO,
  CHECKBOX: FieldType.CHECKBOX,

  DATE: FieldType.DATE,
  DATETIME: FieldType.DATE,

  FILE: FieldType.FILE,
};
