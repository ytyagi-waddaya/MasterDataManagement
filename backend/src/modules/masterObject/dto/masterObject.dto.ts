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

const visibilityRuleSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.literal("group"),
    logic: z.enum(["AND", "OR"]),
    conditions: z.array(
      z.union([
        z.object({
          field: z.string(),
          operator: z.string(),
          value: z.unknown(),
        }),
        visibilityRuleSchema,
      ]),
    ),
  }),
);

export const fieldConfigSchema = z
  .object({
    configVersion: z.number().default(1),
    meta: z
      .object({
        key: z.string().min(1),
        label: z.string().min(1),
        description: z.string().optional(),
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
          "RICH_TEXT",
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
            }),
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
      .optional(),

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
                params: z
                  .record(
                    z.string(),
                    z.union([z.string(), z.number(), z.boolean()]),
                  )
                  .optional(),

                message: z.string(),
                severity: z.enum(["ERROR", "WARNING"]).optional(),
              })
              .strict(),
          )
          .optional(),
      })
      .optional(),

    visibility: visibilityRuleSchema.optional(),

    permissions: z
      .object({
        read: z
          .object({
            roles: z.array(z.string()).optional(),
            users: z.array(z.string()).optional(),
            conditions: z
              .array(
                z.object({
                  field: z.string(),
                  equals: z.any(),
                }),
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
                z.object({
                  field: z.string(),
                  equals: z.any(),
                }),
              )
              .optional(),
          })
          .strict()
          .optional(),

        delete: z
          .object({
            roles: z.array(z.string()).optional(),
            users: z.array(z.string()).optional(),
            conditions: z
              .array(
                z.object({
                  field: z.string(),
                  equals: z.any(),
                }),
              )
              .optional(),
          })
          .strict()
          .optional(),

        create: z
          .object({
            roles: z.array(z.string()).optional(),
            users: z.array(z.string()).optional(),
            conditions: z
              .array(
                z.object({
                  field: z.string(),
                  equals: z.any(),
                }),
              )
              .optional(),
          })
          .strict()
          .optional(),
      })
      .strict()
      .optional(),

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
    calculation: z
      .object({
        operator: z.enum(["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"]),
        operands: z.array(z.string()),
      })
      .optional(),

    integration: z
  .object({
    dataSource: z
      .object({
        type: z.enum(["STATIC", "DEPENDENT"]),
        dependsOn: z.string().optional(),
        map: z.record(
          z.string(),
          z.array(
            z.object({
              label: z.string(),
              value: z.string(),
            })
          )
        ).optional(),
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

    apiSource: z
      .object({
        url: z.string().url(),
        method: z.enum(["GET", "POST"]),
        valueField: z.string(),
        labelField: z.string(),
        dependsOn: z.array(z.string()).optional(),
        params: z.record(
          z.string(),
          z.union([z.string(), z.number(), z.boolean()])
        ).optional(),
        cache: z.boolean().optional(),
      })
      .optional(),

    file: z
      .object({
        maxSizeMB: z.number().positive(),
        allowedTypes: z.array(z.string()).min(1),
        storage: z.enum(["S3", "LOCAL"]),
        multiple: z.boolean().optional(),
      })
      .optional(),
  })
  .strict()
  .optional(),

  })
  .strict();

// const editorNodeSchema: z.ZodType<any> = z.lazy(() =>
//   z.union([
//     z
//       .object({
//         id: z.string(),
//         kind: z.literal("FIELD"),
//         field: z
//           .object({
//             key: z.string(),
//             layout: z
//               .object({
//                 span: z.number(),
//               })
//               .strict(),
//           })
//           .strict(),
//       })
//       .strict(),

//     z.object({
//       id: z.string(),
//       kind: z.literal("LAYOUT"),
//       type: z.enum(["columns", "tabs", "accordion"]),
//       slots: z.array(
//         z.object({
//           id: z.string(),
//           title: z.string().optional(),
//           config: z.any().optional(),
//           children: z.array(editorNodeSchema),
//         }),
//       ),
//       config: z.any().optional(),
//     }),

//         z
//       .object({
//         id: z.string(),
//         kind: z.literal("LAYOUT"),
//         type: z.literal("repeater"),
//         config: z
//           .object({
//             minItems: z.number().optional(),
//             maxItems: z.number().optional(),
//             addLabel: z.string().optional(),
//             itemLabel: z.string().optional(),
//           })
//           .optional(),
//         children: z.array(editorNodeSchema),
//       })
//       .strict(),

//     z.object({
//       id: z.string(),
//       kind: z.literal("LAYOUT"),
//       type: z.enum(["heading", "divider", "spacer"]),
//       config: z.any().optional(),
//     }),
//   ]),
// );

export const editorNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    /* ---------- FIELD ---------- */
    z
      .looseObject({
        id: z.string(),
        kind: z.literal("FIELD"),
        field: z.object({
          key: z.string(),
          layout: z.object({
            span: z.number().optional(),
          }).optional(),
        }),
      })
      ,

    /* ---------- CONTAINER LAYOUT ---------- */
    z
      .looseObject({
        id: z.string(),
        kind: z.literal("LAYOUT"),
        type: z.enum(["columns", "tabs", "accordion"]),
        slots: z.array(
          z
            .looseObject({
              id: z.string(),
              title: z.string().optional(),
              config: z.any().optional(),
              children: z.array(editorNodeSchema),
            })
            ,
        ),
        config: z.any().optional(),
      })
      ,

    /* ---------- REPEATER ---------- */
    z
      .looseObject({
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
          .optional(),
        children: z.array(editorNodeSchema),
      })
    ,

    /* ---------- STATIC ---------- */
    z
      .looseObject({
        id: z.string(),
        kind: z.literal("LAYOUT"),
        type: z.enum(["heading", "divider", "spacer"]),
        config: z
          .object({
            text: z.string().optional(),
            level: z.number().optional(),
            size: z.enum(["xs", "sm", "md", "lg"]).optional(),
          })
          .optional(),
      })
      ,
  ]),
);

// export const editorNodeSchema = z.any();

const formSectionSchema = z.looseObject({
  id: z.string(),
  title: z.string(),
  collapsed: z.boolean().optional(),
  nodes: z.array(editorNodeSchema),
}) ;

export const persistedFormSchemaSchema = z
  .looseObject({
    version: z.number(),
    layout: z.object({
      sections: z.array(formSectionSchema),
    }),
  })
  

export const updateMasterObjectSchema = z
  .looseObject({
    name: nameSchema.optional(),
    isActive: z.boolean().optional(),

    // Layout DSL (editor truth)
    schema: persistedFormSchemaSchema.optional(),

    // Canonical compiled fields
    fieldConfig: z.array(fieldConfigSchema).optional(),
    publish: z.boolean().optional(),
  })
  

// export const publishSchemaSchema = z
//   .looseObject({
//     schema: persistedFormSchemaSchema,
//     fieldConfig: z.array(fieldConfigSchema).min(1),
//   })
//   .strict();
export const publishSchemaSchema = z.object({
  draftSchemaId: z.uuid(),
});


export type UpdateMasterObjectInput = z.infer<typeof updateMasterObjectSchema>;
export type PublishMasterObject = z.infer<typeof publishSchemaSchema>;

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
