// import {
//   FormSection,
//   EditorNode,
//   FieldNode,
// } from "../contracts/editor.contract";
// import { type FieldValidationRule } from "../contracts/field-config.contract";
// import { FieldDefinition } from "../contracts/field-definition.contract";
// import { RuntimeField } from "../contracts/runtime.contract";
// import {
//   mapDataType,
//   mapLayoutSpan,
//   mapWidget,
// } from "../mappers/field-mappers";

// /* ======================================================
//    INTERNAL: RECURSIVE FIELD COLLECTOR
// ====================================================== */

// function collectFieldNodes(nodes: EditorNode[]): FieldNode[] {
//   const result: FieldNode[] = [];

//   for (const node of nodes) {
//     if (node.kind === "FIELD") {
//       result.push(node);
//       continue;
//     }

//     if (node.kind === "LAYOUT") {
//       switch (node.type) {
//         case "columns":
//         case "tabs":
//         case "accordion":
//         case "repeater": {
//           for (const slot of node.slots ?? []) {
//             result.push(...collectFieldNodes(slot.children ?? []));
//           }
//           break;
//         }

//         // layouts without children (divider, spacer, etc.)
//         default:
//           break;
//       }
//     }
//   }

//   return result;
// }

// /* ======================================================
//    BUILD RUNTIME SCHEMA (EDITOR → RUNTIME)
// ====================================================== */

// export function buildRuntimeSchema(
//   sections: FormSection[] | undefined,
//   fieldDefinitions: FieldDefinition[]
// ): RuntimeField[] {
//   if (!Array.isArray(sections)) return [];

//   const fieldNodes = sections.flatMap((section) =>
//     collectFieldNodes(section.nodes ?? [])
//   );

//   return fieldNodes.map(({ id, field }) => {
//     const rules: FieldValidationRule[] = [];

//     /* ---------- REQUIRED ---------- */
//     if (field.required) {
//       rules.push({
//         type: "REQUIRED",
//         message: field.validation?.errorMessage || "This field is required",
//       });
//     }

//     /* ---------- MIN ---------- */
//     if (field.validation?.min !== undefined) {
//       rules.push({
//         type: "MIN",
//         params: {
//           value: field.validation.min,
//           appliesTo:
//             field.type === "text" || field.type === "textarea"
//               ? "length"
//               : "value",
//         },
//         message:
//           field.validation?.errorMessage || `Minimum ${field.validation.min}`,
//       });
//     }

//     /* ---------- MAX ---------- */
//     if (field.validation?.max !== undefined) {
//       rules.push({
//         type: "MAX",
//         params: {
//           value: field.validation.max,
//           appliesTo:
//             field.type === "text" || field.type === "textarea"
//               ? "length"
//               : "value",
//         },
//         message:
//           field.validation?.errorMessage || `Maximum ${field.validation.max}`,
//       });
//     }

//     /* ---------- REGEX ---------- */
//     if (field.validation?.regex) {
//       rules.push({
//         type: "REGEX",
//         params: {
//           pattern: field.validation.regex,
//         },
//         message:
//           field.validation?.patternMessage ||
//           field.validation?.errorMessage ||
//           "Invalid format",
//       });
//     }

//     return {
//       id, // runtime-only id (not persisted)
//       config: {
//         meta: {
//           key: field.key, // 🔑 canonical identity
//           label: field.label,
//           description: field.description, // system meaning
//           category: field.category ?? "INPUT",
//           deprecated: field.deprecated ?? false,
//         },

//         data: {
//           type: mapDataType(field.type),
//         },

//         ui: {
//           widget: mapWidget(field.type),
//           layout: mapLayoutSpan(field.layout),
//           format: field.format,
//           placeholder: field.placeholder,
//           helpText: field.helpText,  // user guidance
//           options: field.options,
//         },

//         validation: rules.length ? { rules } : undefined,
//       },

//       state: {
//         visible: true,
//         readOnly: field.readOnly ?? false,
//       },
//     };
//   });
// }

// import {
//   FormSection,
//   EditorNode,
//   FieldNode,
// } from "../contracts/editor.contract";
// import {
//   FieldCategory,
//   FieldDataType,
//   FieldValidationRule,
// } from "../contracts/field-config.contract";
// import { FieldDefinition } from "../contracts/field-definition.contract";
// import { RuntimeField } from "../contracts/runtime.contract";
// import { mapDataType, mapLayoutSpan, mapWidget } from "../mappers/field-mappers";

// /* ======================================================
//    INTERNAL: RECURSIVE FIELD COLLECTOR
// ====================================================== */
// function collectFieldNodes(nodes: EditorNode[]): FieldNode[] {
//   const result: FieldNode[] = [];

//   for (const node of nodes) {
//     if (node.kind === "FIELD") {
//       result.push(node);
//       continue;
//     }

//     if (node.kind === "LAYOUT") {
//       switch (node.type) {
//         case "columns":
//         case "tabs":
//         case "accordion":
//         case "repeater":
//           for (const slot of node.slots) {
//             result.push(...collectFieldNodes(slot.children ?? []));
//           }
//           break;

//         // divider, spacer, heading → no children
//         default:
//           break;
//       }
//     }
//   }

//   return result;
// }

// /* ======================================================
//    BUILD RUNTIME SCHEMA (PUBLISHED → RUNTIME)
// ====================================================== */

// // export function buildRuntimeSchema(
// //   sections: FormSection[] | undefined,
// //   fieldDefinitions?: FieldDefinition[]
// // ): RuntimeField[] {
// //   if (!sections || !fieldDefinitions) return [];

// //   const defMap = Object.fromEntries(
// //     fieldDefinitions.map((d) => [d.key, d])
// //   );

// //   const fieldNodes = sections.flatMap((s) =>
// //     collectFieldNodes(s.nodes ?? [])
// //   );

// //   return fieldNodes
// //     .map(({ id, field }) => {
// //       const def = defMap[field.key];
// //       if (!def) return null;

// //       const rules: FieldValidationRule[] = [];

// //       for (const rule of def.config?.validation?.rules ?? []) {
// //         rules.push(rule);
// //       }

// //       return {
// //         id,
// //         config: {
// //           meta: {
// //             key: def.key,
// //             label: def.label,
// //             category: def.category,
// //             deprecated: false,
// //           },

// //           data: {
// //             type: def.dataType as FieldDataType,
// //           },

// //           ui: {
// //             widget: def.config?.ui?.widget!,
// //             layout: mapLayoutSpan(field.layout),
// //             placeholder: def.config?.ui?.placeholder,
// //             helpText: def.config?.ui?.helpText,
// //             options: def.config?.ui?.options,
// //           },

// //           validation: rules.length ? { rules } : undefined,
// //         },

// //         state: {
// //           visible: true,
// //           readOnly: def.isReadOnly ?? false,
// //         },
// //       };
// //     })
// //     .filter(Boolean) as RuntimeField[];
// // }

// // export function buildRuntimeSchema(
// //   sections: FormSection[] | undefined,
// //   fieldDefinitions?: FieldDefinition[]
// // ): RuntimeField[] {
// //   if (!sections) return [];

// //   const defMap = Object.fromEntries(
// //     fieldDefinitions?.map((d) => [d.key, d]) ?? []
// //   );

// //   const fieldNodes = sections.flatMap((s) =>
// //     collectFieldNodes(s.nodes ?? [])
// //   );

// //   return fieldNodes.map(({ id, field }) => {
// //     const def = defMap[field.key];

// //     const rules: FieldValidationRule[] =
// //       def?.config?.validation?.rules ?? [];

// //     return {
// //       id,
// //       config: {
// //         meta: {
// //           key: field.key,
// //           label: def?.label ?? field.label,
// //           category: def?.category ?? field.category ?? "INPUT",
// //           deprecated: false,
// //         },

// //         data: {
// //           type: def
// //             ? (def.dataType as FieldDataType)
// //             : mapDataType(field.type),
// //         },

// //         ui: {
// //           widget: def?.config?.ui?.widget ?? mapWidget(field.type),
// //           layout: mapLayoutSpan(field.layout),
// //           placeholder: def?.config?.ui?.placeholder ?? field.placeholder,
// //           helpText: def?.config?.ui?.helpText ?? field.helpText,
// //           options: def?.config?.ui?.options ?? field.options,
// //         },

// //         validation: rules.length ? { rules } : undefined,
// //       },

// //       state: {
// //         visible: true,
// //         readOnly: def?.isReadOnly ?? field.readOnly ?? false,
// //       },
// //     };
// //   });
// // }

// export function buildRuntimeSchema(
//   sections: FormSection[],
//   fieldDefinitions: FieldDefinition[]
// ): RuntimeField[] {
//   const defMap = Object.fromEntries(
//     fieldDefinitions.map((d) => [d.key, d])
//   );

//   const runtimeFields: RuntimeField[] = [];

//   for (const section of sections) {
//     collect(section.nodes, defMap, runtimeFields);
//   }

//   return runtimeFields;
// }

// function collect(
//   nodes: EditorNode[],
//   defMap: Record<string, FieldDefinition>,
//   acc: RuntimeField[]
// ) {
//   for (const node of nodes) {
//     if (node.kind === "FIELD") {
//       acc.push(buildRuntimeField(node));
//     }

//     if (node.kind === "LAYOUT" && "slots" in node) {
//       for (const slot of node.slots) {
//         collect(slot.children, defMap, acc);
//       }
//     }
//   }
// }

// function buildRuntimeField(
//   node: Extract<EditorNode, { kind: "FIELD" }>
// ): RuntimeField {
//   const f = node.field;

//   return {
//     id: f.id,
//     config: {
//       meta: {
//         key: f.key,
//         label: f.label,
//         description: f.description,
//         category: f.category ?? "INPUT",
//         deprecated: f.deprecated ?? false,
//       },

//       data: {
//         type: mapDataType(f.type),
//         default: f.defaultValue,
//         nullable: !f.required,
//       },

//       ui: {
//         widget: mapWidget(f.type),
//         placeholder: f.placeholder,
//         helpText: f.helpText,
//         options: f.options,
//         format: f.format,
//         layout: mapLayoutSpan(f.layout),
//       },

//       visibility: f.visibility,
//       integration: f.integration,

//       behavior: {
//         readOnly: f.readOnly,
//       },
//     },

//     state: {
//       value: f.defaultValue,
//       visible: f.visibility?.defaultVisible ?? true,
//       readOnly: !!f.readOnly,
//       errors: [],
//     },

//     // 🔥 THIS IS THE MOST IMPORTANT PART
//     editorValidation: {
//       required: f.required,
//       min: f.validation?.min,
//       max: f.validation?.max,
//       regex: f.validation?.regex,
//       patternMessage: f.validation?.patternMessage,
//       errorMessage: f.validation?.errorMessage,
//     },
//   };
// }


import {
  FormSection,
  EditorNode,
  FieldNode,
} from "../contracts/editor.contract";
import {
  FieldCategory,
  FieldDataType,
  FieldValidationRule,
  FieldConfig,
} from "../contracts/field-config.contract";
import { FieldDefinition } from "../contracts/field-definition.contract";
import { RuntimeField } from "../contracts/runtime.contract";
import { mapDataType, mapLayoutSpan, mapWidget } from "../mappers/field-mappers";
import { fieldDefinitionToConfig } from "./fieldDefinitionToConfig";

/* ======================================================
   INTERNAL: RECURSIVE FIELD COLLECTOR
====================================================== */
function collectFieldNodes(nodes: EditorNode[]): FieldNode[] {
  const result: FieldNode[] = [];

  for (const node of nodes) {
    if (node.kind === "FIELD") {
      result.push(node);
      continue;
    }

    if (node.kind === "LAYOUT") {
      switch (node.type) {
        case "columns":
        case "tabs":
        case "accordion":
        case "repeater":
          for (const slot of node.slots) {
            result.push(...collectFieldNodes(slot.children ?? []));
          }
          break;
        default:
          break;
      }
    }
  }

  return result;
}

/* ======================================================
   BUILD RUNTIME SCHEMA (EDITOR → RUNTIME)
====================================================== */
// export function buildRuntimeSchema(
//   sections: FormSection[]
// ): RuntimeField[] {
//   const fieldNodes = sections.flatMap((s) =>
//     collectFieldNodes(s.nodes ?? [])
//   );

//   return fieldNodes.map(buildRuntimeField);
// }
/* ======================================================
   BUILD RUNTIME SCHEMA (EDITOR → RUNTIME)
   ✅ frontend only
====================================================== */

export function buildRuntimeSchema(
  sections: FormSection[]
): RuntimeField[] {
  const fieldNodes = sections.flatMap((s) =>
    collectFieldNodes(s.nodes ?? [])
  );

  return fieldNodes.map(buildRuntimeField);
}

// function buildRuntimeField(
//   node: Extract<EditorNode, { kind: "FIELD" }>
// ): RuntimeField {
//   const f = node.field;

//   const widget = mapWidget(f.type);
//   const rules = buildValidationRules(f, widget);

//   const config: FieldConfig = {
//     meta: {
//       key: f.key,
//       label: f.label,
//       description: f.description,
//       category: f.category ?? "INPUT",
//       deprecated: f.deprecated ?? false,
//     },

//     data: {
//       type: mapDataType(f.type),
//       default: f.defaultValue,
//       nullable: !f.required,
//     },

//     ui: {
//       widget,
//       placeholder: f.placeholder,
//       helpText: f.helpText,
//       options: f.options,
//       format: f.format,
//       layout: mapLayoutSpan(f.layout),
//     },

//     validation: rules.length ? { rules } : undefined,

//     visibility: f.visibility,
//     integration: f.integration,

//     behavior: {
//       readOnly: f.readOnly,
//     },
//   };

//   return {
//     id: f.id,
//     config,

//     state: {
//       value: f.defaultValue,
//       visible: f.visibility?.defaultVisible ?? true,
//       readOnly: !!f.readOnly,
//       errors: [],
//     },
//   };
// }


/* ======================================================
   SINGLE FIELD BUILDER
====================================================== */
// function buildRuntimeField(
//   node: Extract<EditorNode, { kind: "FIELD" }>
// ): RuntimeField {
//   const f = node.field;

//   const widget = mapWidget(f.type);
//   const rules = buildValidationRules(f, widget);

//   const config: FieldConfig = {
//     meta: {
//       key: f.key,
//       label: f.label,
//       description: f.description,
//       category: f.category ?? "INPUT",
//       deprecated: f.deprecated ?? false,
//     },

//     data: {
//       type: mapDataType(f.type),
//       default: f.defaultValue,
//       nullable: !f.required,
//     },

//     ui: {
//       widget,
//       placeholder: f.placeholder,
//       helpText: f.helpText,
//       options: f.options,
//       format: f.format,
//       layout: mapLayoutSpan(f.layout),
//     },

//     validation: rules.length ? { rules } : undefined,

//     visibility: f.visibility,
//     integration: f.integration,

//     behavior: {
//       readOnly: f.readOnly,
//     },
//   };

//   return {
//     id: f.id,
//     config,

//     state: {
//       value: f.defaultValue,
//       visible: f.visibility?.defaultVisible ?? true,
//       readOnly: !!f.readOnly,
//       errors: [],
//     },

//     // 🔥 keep editor validation for backend compiler
//     editorValidation: {
//       required: f.required,
//       min: f.validation?.min,
//       max: f.validation?.max,
//       regex: f.validation?.regex,
//       patternMessage: f.validation?.patternMessage,
//       errorMessage: f.validation?.errorMessage,
//     },
//   };
// }

function buildRuntimeField(
  node: Extract<EditorNode, { kind: "FIELD" }>
): RuntimeField {
  const f = node.field;
  const widget = mapWidget(f.type);
  const rules = buildValidationRules(f, widget);

  return {
    id: f.id,
    config: {
      meta: {
        key: f.key,
        label: f.label,
        description: f.description,
        category: f.category ?? "INPUT",
        deprecated: f.deprecated ?? false,
      },
      data: {
        type: mapDataType(f.type),
        default: f.default,
        nullable: !f.required,
      },
      ui: {
        widget,
        placeholder: f.placeholder,
        helpText: f.helpText,
        options: f.options,
        format: f.format,
        layout: mapLayoutSpan(f.layout),
      },
      validation: rules.length ? { rules } : undefined,
      visibility: f.visibility,
      integration: f.integration,
      behavior: { readOnly: f.readOnly },
    },

    state: {
      value: f.default,
      visible: f.visibility?.defaultVisible ?? true,
      readOnly: !!f.readOnly,
      errors: [],
    },

    // ✅ REQUIRED for backend compiler
    editorValidation: {
      required: f.required,
      min: f.validation?.min,
      max: f.validation?.max,
      regex: f.validation?.regex,
      patternMessage: f.validation?.patternMessage,
      errorMessage: f.validation?.errorMessage,
    },
  };
}


/* ======================================================
   VALIDATION RULE BUILDER
====================================================== */
function buildValidationRules(
  f: any,
  widget: string
): FieldValidationRule[] {
  const v = f.validation;
  const rules: FieldValidationRule[] = [];

  if (f.required) {
    rules.push({
      type: "REQUIRED",
      message: v?.errorMessage ?? "This field is required",
    });
  }

  if (v?.min !== undefined) {
    rules.push({
      type: "MIN",
      params: {
        value: v.min,
        appliesTo: isTextWidget(widget) ? "length" : "value",
      },
      message: v.errorMessage ?? `Minimum ${v.min}`,
    });
  }

  if (v?.max !== undefined) {
    rules.push({
      type: "MAX",
      params: {
        value: v.max,
        appliesTo: isTextWidget(widget) ? "length" : "value",
      },
      message: v.errorMessage ?? `Maximum ${v.max}`,
    });
  }

  if (v?.regex) {
    rules.push({
      type: "REGEX",
      params: { pattern: v.regex },
      message: v.patternMessage ?? "Invalid format",
    });
  }

  return rules;
}

function isTextWidget(widget: string) {
  return (
    widget === "TEXT" ||
    widget === "TEXTAREA" ||
    widget === "SELECT" ||
    widget === "RADIO"
  );
}

export function buildRuntimeSchemaFromCanonical(
  sections: FormSection[],
  fieldDefinitions: FieldDefinition[]
): RuntimeField[] {

const configMap = Object.fromEntries(
  fieldDefinitions.map((d) => [
    d.key,
    fieldDefinitionToConfig(d),
  ])
);


  const nodes = sections.flatMap((s) => collectFieldNodes(s.nodes));

  const runtime: RuntimeField[] = [];

  for (const node of nodes) {
    const cfg = configMap[node.field.key];
    if (!cfg) continue;

    runtime.push({
      id: node.id,
      config: cfg, // ✅ FULL FieldConfig (no mutation)
      state: {
        value: cfg.data.default,
        visible: cfg.visibility?.defaultVisible ?? true,
        readOnly: !!cfg.behavior?.readOnly,
        errors: [],
      },
    });
  }

  return runtime;
}
