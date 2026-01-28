import { z } from "zod";
/* ======================================================
   COMMON
====================================================== */

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters");

/* ======================================================
   CANONICAL FIELD CONFIG (BACKEND TRUTH)
   Used ONLY for API payloads (fieldConfig[])
====================================================== */
const visibilityRuleSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.literal("group"),
    logic: z.enum(["AND", "OR"]),
    conditions: z.array(
      z.union([
        z.object({
          field: z.string(),
          operator: z.string(),
          value: z.any(),
        }),
        visibilityRuleSchema,
      ]),
    ),
  }),
);

export const canonicalFieldConfigSchema = z
  .object({
    configVersion: z.number().default(1),

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
          "STRUCTURE",
          "PRESENTATION",
          "DEPRECATED",
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
          "FILE",
          "RICH_TEXT",
        ]),

        placeholder: z.string().optional(),
        helpText: z.string().optional(),

        options: z
          .array(
            z
              .object({
                label: z.string(),
                value: z.string(),
              })
              .strict(),
          )
          .optional(),

        multiple: z.boolean().optional(),

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

    /* ================= VALIDATION ================= */
    validation: z
      .object({
        rules: z
          .array(
            z
              .object({
                type: z.enum([
                  "REQUIRED",
                  "REQUIRED_IF",
                  "MIN",
                  "MAX",
                  "REGEX",
                  "BETWEEN",
                  "EMAIL",
                  "RANGE",
                  "LENGTH",
                  "CUSTOM",
                ]),
                params: z.any().optional(), // normalized before submit
                message: z.string(),
                severity: z.enum(["ERROR", "WARNING"]).optional(),
              })
              .strict(),
          )
          .optional(),
      })
      .strict()
      .optional(),

    /* ================= PASS-THROUGH ================= */
    // visibility: z.any().optional(), // backend contract
    permissions: z.any().optional(), // backend contract
    behavior: z.any().optional(), // backend contract
    integration: z
      .object({
        dataSource: z
          .object({
            type: z.enum(["STATIC", "DEPENDENT"]),
            dependsOn: z.string().optional(),
            map: z
              .record(
                z.string(),
                z.array(
                  z.object({
                    label: z.string(),
                    value: z.string(),
                  }),
                ),
              )
              .optional(),
            resetOnChange: z.boolean().optional(),
          })
          .optional(),
        reference: z
          .object({
            resource: z.string(),
            valueField: z.string().optional(),
            labelField: z.string().optional(),
            searchable: z.boolean().optional(),
            multiple: z.boolean().optional(),
          })
          .optional(),
      })
      .strict()
      .optional(),

    visibility: visibilityRuleSchema.optional(),
    calculation: z
      .object({
        operator: z.enum(["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"]),
        operands: z.array(z.string()),
      })
      .optional(),
  })
  .strict();

/* ======================================================
   EDITOR TREE (LAYOUT DSL – FRONTEND ONLY)
====================================================== */

export const editorNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    /* ---------- FIELD NODE ---------- */
    z
      .object({
        id: z.string(),
        kind: z.literal("FIELD"),
        field: z
          .object({
            key: z.string(),
            layout: z
              .object({
                span: z.number(),
              })
              .strict(),
          })
          .strict(),
      })
      .strict(),

    /* ---------- CONTAINER LAYOUT (columns/tabs/accordion) ---------- */
    z
      .object({
        id: z.string(),
        kind: z.literal("LAYOUT"),
        type: z.enum(["columns", "tabs", "accordion"]),
        slots: z.array(
          z
            .object({
              id: z.string(),
              title: z.string().optional(),
              config: z.any().optional(),
              children: z.array(editorNodeSchema),
            })
            .strict(),
        ),
        config: z.any().optional(),
      })
      .strict(),

    /* ---------- REPEATER LAYOUT ---------- */
    z
      .object({
        id: z.string(),
        kind: z.literal("LAYOUT"),
        type: z.literal("repeater"),
        config: z
          .object({
            minItems: z.number().optional(),
            maxItems: z.number().optional(),
            addLabel: z.string().optional(),
            itemLabel: z.string().optional(),
          })
          .strict()
          .optional(),
        children: z.array(editorNodeSchema),
      })
      .strict(),

    /* ---------- STATIC LAYOUT ---------- */
    z
      .object({
        id: z.string(),
        kind: z.literal("LAYOUT"),
        type: z.enum(["heading", "divider", "spacer"]),
        config: z
          .object({
            text: z.string().optional(),
            level: z.number().optional(),
            size: z.enum(["xs", "sm", "md", "lg"]).optional(),
          })
          .strict()
          .optional(),
      })
      .strict(),
  ]),
);

/* ======================================================
   FORM SECTION
====================================================== */

export const formSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  collapsed: z.boolean().optional(),
  nodes: z.array(editorNodeSchema),
});

/* ======================================================
   PERSISTED FORM SCHEMA (EDITOR → BACKEND)
====================================================== */

export const persistedFormSchemaSchema = z
  .object({
    version: z.number(),
    layout: z.object({
      sections: z.array(formSectionSchema),
    }),
  })
  .strict();

/* ======================================================
   UPDATE MASTER OBJECT (FINAL API PAYLOAD)
====================================================== */

export const publishSchemaSchema = z.object({
  draftSchemaId: z.uuid(),
});


export const updateMasterObjectSchema = z
  .object({
    name: nameSchema.optional(),
    isActive: z.boolean().optional(),

    // Editor layout (DSL)
    schema: persistedFormSchemaSchema.optional(),

    // Canonical compiled fields
    fieldConfig: z.array(canonicalFieldConfigSchema).optional(),

    // Lifecycle control
    publish: z.boolean().optional(),
  })
  .strict();

export type UpdateMasterObjectInput = z.infer<typeof updateMasterObjectSchema>;
export type PersistedFormSchema = z.infer<typeof persistedFormSchemaSchema>;
export type CanonicalFieldConfig = z.infer<typeof canonicalFieldConfigSchema>;
export type publishSchema = z.infer<typeof publishSchemaSchema>;
