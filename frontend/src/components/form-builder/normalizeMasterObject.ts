import {
  CanonicalFieldConfig,
  PersistedFormSchema,
} from "@/lib/masterObject/schema/masterObject.schema";

/* ======================================================
   HELPERS
====================================================== */

function adaptFieldDefinition(field: any): CanonicalFieldConfig {
     const rawFormula = field.config?.behavior?.formula;
  return {
    configVersion: 1,

    meta: {
      key: field.key,
      label: field.label,
      category: field.category,
      system: field.isSystem,
      locked: field.isLocked,
      deprecated: !field.isActive,
    },

    data: {
      type: field.dataType,
      nullable: true,
    },

    ui: {
      widget: field.fieldType,
      ...(field.config?.ui ?? {}),
    },

    validation: field.fieldValidationRules?.length
      ? { rules: field.fieldValidationRules }
      : undefined,

      calculation:
      field.category === "CALCULATED" && rawFormula
        ? {
            operator: parseOperator(rawFormula.expression),
            operands: rawFormula.dependencies ?? [],
          }
        : undefined,
    permissions: field.fieldPermissions ?? undefined,
    visibility: field.fieldConditionBindings ?? undefined,
    integration: field.config?.integration ?? undefined,
  };
}

function adaptSchema(schema: any): PersistedFormSchema {
  return {
    version: schema.version,
    layout: schema.layout,
  };
}

/* ======================================================
   NORMALIZER (THIS MUST HAVE A BODY)
====================================================== */

export function normalizeMasterObjectFromBackend(
  masterObject: any,
  mode: "EDITOR" | "RUNTIME"
): {
  schema: PersistedFormSchema | null;
  fieldConfigs: CanonicalFieldConfig[];
  published: boolean;
} {
  const schemas = masterObject?.schemas ?? [];

  const byVersionDesc = (a: any, b: any) => b.version - a.version;

  const draftSchema = schemas
    .filter((s: any) => s.status === "DRAFT")
    .sort(byVersionDesc)[0];

  const publishedSchema = schemas
    .filter((s: any) => s.status === "PUBLISHED")
    .sort(byVersionDesc)[0];

  const activeSchema =
    mode === "EDITOR"
      ? draftSchema ?? publishedSchema
      : publishedSchema ?? draftSchema;

  if (!activeSchema) {
    return {
      schema: null,
      fieldConfigs: [],
      published: false,
    };
  }

  return {
    schema: adaptSchema(activeSchema),
    fieldConfigs: activeSchema.fieldDefinitions.map(adaptFieldDefinition),
    published: activeSchema.status === "PUBLISHED",
  };
}

function parseOperator(expr: string) {
  if (expr.includes(" * ")) return "MULTIPLY";
  if (expr.includes(" + ")) return "ADD";
  if (expr.includes(" - ")) return "SUBTRACT";
  if (expr.includes(" / ")) return "DIVIDE";
  return "ADD";
}

/**
 * Convert editor fieldConfigs → backend canonical fieldConfig
 * REQUIRED for publish
//  */
// export function normalizeFieldConfigForPublish(
//   fieldConfigs: CanonicalFieldConfig[],
// ): CanonicalFieldConfig[] {
//   return fieldConfigs.map((f) => ({
//     ...f,

//     // ensure meta flags are explicit
//     meta: {
//       ...f.meta,
//       system: Boolean(f.meta.system),
//       locked: Boolean(f.meta.locked),
//       deprecated: Boolean(f.meta.deprecated),
//     },

//     // strip editor-only UI noise (keep backend-safe UI only)
//     ui: f.ui
//       ? {
//           widget: f.ui.widget,
//           placeholder: f.ui.placeholder,
//           helpText: f.ui.helpText,
//           options: f.ui.options,
//           multiple: f.ui.multiple,
//           layout: f.ui.layout,
//           format: f.ui.format,
//         }
//       : undefined,

//     // normalize integration contract
//     integration: f.integration
//       ? {
//           dataSource: f.integration.dataSource,
//           reference: f.integration.reference
//             ? {
//                 resource: f.integration.reference.resource,
//                 valueField: f.integration.reference.valueField,
//                 labelField: f.integration.reference.labelField,
//                 searchable: f.integration.reference.searchable,
//                 multiple: f.integration.reference.multiple,
//               }
//             : undefined,
//         }
//       : undefined,
//   }));
// }
