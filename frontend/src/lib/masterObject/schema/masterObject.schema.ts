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

export type UpdateMasterObjectInput = z.infer<typeof updateMasterObjectSchema>;
