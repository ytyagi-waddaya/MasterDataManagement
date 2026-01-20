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
   ❗ Used ONLY for API payloads (fieldConfig)
====================================================== */

export const canonicalFieldConfigSchema = z
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
          "STRUCTURE",
          "PRESENTATION",
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
        ]),
        placeholder: z.string().optional(),
        helpText: z.string().optional(),
        options: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
            })
          )
          .optional(),

        layout: z
          .object({
            width: z
              .enum(["full", "half", "third", "quarter", "two-third"])
              .optional(),
            order: z.number().optional(),
            section: z.string().optional(),
          })
          .optional(),

        format: z
          .object({
            style: z.enum(["currency", "percent", "decimal"]).optional(),
            currency: z.string().optional(),
          })
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

    /* ================= OPTIONAL ================= */
    visibility: z.any().optional(),
    permissions: z.any().optional(),
    behavior: z.any().optional(),
    integration: z.any().optional(),
  })
  .strict();

export type CanonicalFieldConfig = z.infer<typeof canonicalFieldConfigSchema>;

/* ======================================================
   EDITOR TREE (LAYOUT DSL – FRONTEND ONLY)
====================================================== */

export const editorNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    /* ---------- FIELD NODE ---------- */
    z.object({
      id: z.string(),
      kind: z.literal("FIELD"),
      field: z.object({
        key: z.string(),
        label: z.string(),
        category: z.enum([
          "INPUT",
          "SYSTEM",
          "CALCULATED",
          "REFERENCE",
          "STRUCTURE",
          "PRESENTATION",
        ]),
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
        layout: z.object({
          span: z.number(),
        }),
        format: z.any().optional(),
        validation: z
          .object({
            min: z.number().optional(),
            max: z.number().optional(),
            regex: z.string().optional(),
            patternMessage: z.string().optional(),
            errorMessage: z.string().optional(),
          })
          .optional(),

        visibility: z.any().optional(),
        permissions: z.any().optional(),
        behavior: z.any().optional(),
      }),
    }),

    /* ---------- LAYOUT WITH CHILDREN ---------- */
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

    /* ---------- LAYOUT WITHOUT CHILDREN ---------- */
    z.object({
      id: z.string(),
      kind: z.literal("LAYOUT"),
      type: z.enum(["heading", "divider", "spacer"]),
      config: z.any().optional(),
    }),
  ])
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
