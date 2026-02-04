import {
  CanonicalFieldConfig,
  PersistedFormSchema,
} from "@/lib/masterObject/schema/masterObject.schema";

/* ======================================================
   HELPERS
====================================================== */

// function adaptFieldDefinition(field: any): CanonicalFieldConfig {
//      const rawFormula = field.config?.behavior?.formula;
//   return {
//     configVersion: 1,

//     meta: {
//       key: field.key,
//       label: field.label,
//       category: field.category,
//       system: field.isSystem,
//       locked: field.isLocked,
//       deprecated: !field.isActive,
//     },

//     data: {
//       type: field.dataType,
//       nullable: true,
//     },

//     ui: {
//       widget: field.fieldType,
//       ...(field.config?.ui ?? {}),
//     },

//     validation: field.fieldValidationRules?.length
//       ? { rules: field.fieldValidationRules }
//       : undefined,

//       calculation:
//       field.category === "CALCULATED" && rawFormula
//         ? {
//             operator: parseOperator(rawFormula.expression),
//             operands: rawFormula.dependencies ?? [],
//           }
//         : undefined,
//     permissions: field.fieldPermissions ?? undefined,
//     visibility: field.fieldConditionBindings ?? undefined,
//     integration: field.config?.integration ?? undefined,
//   };
// }
export function normalizeRule(r: any) {
  const RULE_MAP: Record<string, string> = {
    required: "REQUIRED",
    required_if: "REQUIRED_IF",
    min: "MIN",
    max: "MAX",
    regex: "REGEX",
    between: "BETWEEN",
    email: "EMAIL",
    range: "RANGE",
    length: "LENGTH",
    custom: "CUSTOM",

    REQUIRED: "REQUIRED",
    REQUIRED_IF: "REQUIRED_IF",
    MIN: "MIN",
    MAX: "MAX",
    REGEX: "REGEX",
    BETWEEN: "BETWEEN",
    EMAIL: "EMAIL",
    RANGE: "RANGE",
    LENGTH: "LENGTH",
    CUSTOM: "CUSTOM",
  };

  return {
    type: RULE_MAP[r.type ?? r.rule] ?? "CUSTOM",
    message: r.message ?? r.errorMessage ?? "",
    params: r.params ?? {},
  };
}

// function adaptFieldDefinition(field: any): CanonicalFieldConfig {
//   const rawFormula = field.config?.behavior?.formula;

//   return {
//     configVersion: 1,
//     meta: {
//       key: field.key,
//       label: field.label,
//       category: field.category,
//       system: field.isSystem,
//       locked: field.isLocked,
//       deprecated: !field.isActive,
//     },

//     data: {
//       type: field.dataType,
//       nullable: true,
//     },

//     ui: {
//       widget: field.fieldType,
//       ...(field.config?.ui ?? {}),
//     },

//     validation: field.fieldValidationRules?.length
//       ? {
//           rules: field.fieldValidationRules.map(normalizeRule),
//         }
//       : undefined,

//     calculation:
//       field.category === "CALCULATED" && rawFormula
//         ? {
//             expression: rawFormula.expression ?? "",
//             dependencies: Array.isArray(rawFormula.dependencies)
//               ? rawFormula.dependencies
//               : [],
//           }
//         : undefined,

//     permissions: field.fieldPermissions
//       ? normalizePermissions(field.fieldPermissions)
//       : undefined,

//     // visibility: field.fieldConditionBindings
//     //   ? normalizeVisibility(field.fieldConditionBindings)
//     //   : undefined,

//     visibility: field.config?.visibility
//   ? normalizeVisibilityFromBackend(field.config.visibility)
//   : undefined,


//     integration: field.config?.integration ?? undefined,
//   };
// }

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
      ? { rules: field.fieldValidationRules.map(normalizeRule) }
      : undefined,

    calculation:
      field.category === "CALCULATED" && rawFormula
        ? {
            expression: rawFormula.expression ?? "",
            dependencies: Array.isArray(rawFormula.dependencies)
              ? rawFormula.dependencies
              : [],
          }
        : undefined,

    permissions: field.fieldPermissions
      ? normalizePermissions(field.fieldPermissions)
      : undefined,

    // ✅ FIXED
    visibility: field.config?.visibility
      ? normalizeVisibilityFromBackend(field.config.visibility)
      : undefined,

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
  mode: "EDITOR" | "RUNTIME",
): {
  schema: PersistedFormSchema | null;
  fieldConfigs: CanonicalFieldConfig[];
  published: boolean;
} {
  const schemas = masterObject?.schemas ?? [];
  console.log("normalizer schema:", masterObject)
  const byVersionDesc = (a: any, b: any) => b.version - a.version;

  const draftSchema = schemas
    .filter((s: any) => s.status === "DRAFT")
    .sort(byVersionDesc)[0];

  const publishedSchema = schemas
    .filter((s: any) => s.status === "PUBLISHED")
    .sort(byVersionDesc)[0];

  const activeSchema =
    mode === "EDITOR"
      ? (draftSchema ?? publishedSchema)
      : (publishedSchema ?? draftSchema);

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

// commonNormalizers.ts
export function normalizeVisibility(visibility: any) {
  if (!visibility) return undefined;

  if (Array.isArray(visibility)) {
    if (visibility.length === 0) return undefined;

    return {
      type: "group",
      logic: "AND",
      conditions: visibility,
    };
  }

  if (typeof visibility === "object") return visibility;

  return undefined;
}

export function normalizePermissions(perms: any) {
  if (!perms) return undefined;

  if (Array.isArray(perms)) {
    if (perms.length === 0) return undefined;

    const obj: any = {};
    for (const p of perms) {
      obj[p.mode] = {
        roles: p.roles,
        users: p.users,
        conditions: p.conditions,
      };
    }
    return obj;
  }

  if (typeof perms === "object") return perms;

  return undefined;
}


export function normalizeVisibilityFromBackend(
  visibility: any,
): any {
  if (!visibility) return undefined;

  const mapNode = (node: any): any => {
    // GROUP
    if (node.type === "group") {
      return {
        type: "group",
        logic: node.logic ?? "AND",
        conditions: (node.conditions ?? [])
          .map(mapNode)
          .filter(Boolean),
      };
    }

    // CONDITION (backend → editor)
    if (node.field && node.operator) {
      return {
        type: "condition",
        fieldKey: node.field,    
        operator: node.operator,  
        value: node.value,
      };
    }

    return undefined;
  };

  return mapNode(visibility);
}
