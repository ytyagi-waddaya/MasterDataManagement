// // import {
// //   FormSection,
// //   EditorNode,
// //   FieldNode,
// //   LayoutNode,
// // } from "./contracts/editor.contract";
// // import { FieldDefinition } from "./contracts/field-definition.contract";

// // export function normalizeEditorSchema(
// //   sections: any[],
// //   fieldDefinitions: FieldDefinition[]
// // ): FormSection[] {
// //   return sections.map((section) => ({
// //     id: section.id,
// //     title: section.title ?? "Section",
// //     collapsed: section.collapsed ?? false,
// //     nodes: normalizeNodes(section.nodes ?? []),
// //   }));
// // }

// // function normalizeNodes(nodes: any[]): EditorNode[] {
// //   return nodes.map((node): EditorNode => {
// //     /* ================= FIELD NODE ================= */
// //     if (node.kind === "FIELD") {
// //       const fieldNode: FieldNode = {
// //         id: node.id,
// //         kind: "FIELD",
// //         field: {
// //           id: node.field.id ?? node.id,
// //           key: node.field.key,
// //           label: node.field.label,
// //           category: node.field.category ?? "INPUT",
// //           type: node.field.type ?? "text",
// //           layout: {
// //             span: node.field.layout?.span ?? 12,
// //           },
// //           required: node.field.required ?? false,
// //           readOnly: node.field.readOnly ?? false,
// //           description: node.field.description,
// //           helpText: node.field.helpText,
// //         },
// //       };

// //       return fieldNode;
// //     }

// //     /* ================= LAYOUT NODE ================= */
// //     const layoutNode: LayoutNode = {
// //       id: node.id,
// //       kind: "LAYOUT",
// //       type: node.type,
// //       slots: (node.slots ?? []).map((slot: any) => ({
// //         id: slot.id,
// //         title: slot.title,
// //         children: normalizeNodes(slot.children ?? []),
// //       })),
// //       config: node.config ?? {},
// //     };

// //     return layoutNode;
// //   });
// // }

// import {
//   FormSection,
//   EditorNode,
//   FieldNode,
//   LayoutNode,
// } from "./contracts/editor.contract";
// import { FieldDefinition } from "./contracts/field-definition.contract";
// import { FieldValidationRule } from "./contracts/field-config.contract";
// import { EditorFieldType } from "./contracts/fieldPalette.contract";

// // export function normalizeEditorSchema(
// //   sections: any[],
// //   fieldDefinitions: FieldDefinition[],
// // ): FormSection[] {
// //   const defMap = Object.fromEntries(fieldDefinitions.map((d) => [d.key, d]));
// //   return sections.map((section) => ({
// //     id: section.id,
// //     title: section.title ?? "Section",
// //     collapsed: section.collapsed ?? false,
// //     nodes: normalizeNodes(section.nodes ?? [], defMap),
// //   }));
// // }

// // function normalizeNodes(
// //   nodes: any[],
// //   defMap: Record<string, FieldDefinition>,
// // ): EditorNode[] {
// //   return nodes.map((node): EditorNode => {
// //     /* ================= FIELD ================= */
// //     if (node.kind === "FIELD") {
// //       const def = defMap[node.field.key];

// //       const editorCategory =
// //         def?.category === "STRUCTURE" ||
// //         def?.category === "PRESENTATION" ||
// //         def?.category === "DEPRECATED"
// //           ? "SYSTEM"
// //           : (def?.category ?? "INPUT");

// //       /* ---------- validation extraction ---------- */
// //       const rules: FieldValidationRule[] = def?.config?.validation?.rules ?? [];

// //       let min: number | undefined;
// //       let max: number | undefined;
// //       let regex: string | undefined;
// //       let errorMessage: string | undefined;
// //       let patternMessage: string | undefined;

// //       for (const r of rules) {
// //         if (r.type === "MIN" && r.params && "min" in r.params) {
// //           min = r.params.min;
// //         }

// //         if (r.type === "MAX" && r.params && "max" in r.params) {
// //           max = r.params.max;
// //         }

// //         if (r.type === "REGEX" && r.params && "regex" in r.params) {
// //           regex = r.params.regex;
// //         }

// //         if (!errorMessage) errorMessage = r.message;
// //         if (!patternMessage) patternMessage = r.message;
// //       }

// //       const editorValidation =
// //         rules.length > 0
// //           ? { min, max, regex, errorMessage, patternMessage }
// //           : undefined;

// //       const fieldNode: FieldNode = {
// //         id: node.id,
// //         kind: "FIELD",
// //         field: {
// //           id: node.field.id ?? node.id,
// //           key: node.field.key,

// //           label: def?.label ?? node.field.label,
// //           category: editorCategory,
// //           type: mapFieldTypeToEditor(def?.fieldType) ?? node.field.type,

// //           layout: {
// //             span: node.field.layout?.span ?? 12,
// //           },

// //           required: def?.isRequired ?? false,
// //           readOnly: def?.isReadOnly ?? false,

// //           helpText: def?.config?.ui?.helpText,
// //           placeholder: def?.config?.ui?.placeholder,
// //           options: def?.config?.ui?.options,
// //           description: def?.config?.meta?.description,
// //           default:
// //             def?.config?.data?.default != null
// //               ? String(def.config.data.default)
// //               : undefined,
// //           validation: editorValidation,
// //           integration: node.field.integration,
// //         },
// //       };

// //       return fieldNode;
// //     }

// //     /* ================= LAYOUT ================= */
// //     const layoutNode: LayoutNode = {
// //       id: node.id,
// //       kind: "LAYOUT",
// //       type: node.type,
// //       slots: (node.slots ?? []).map((slot: any) => ({
// //         id: slot.id,
// //         title: slot.title,
// //         children: normalizeNodes(slot.children ?? [], defMap),
// //       })),
// //       config: node.config ?? {},
// //     };

// //     return layoutNode;
// //   });
// // }

// // export function normalizeEditorSchema(
// //   sections: any[],
// // ): FormSection[] {
// //   return sections.map((section) => ({
// //     id: section.id,
// //     title: section.title ?? "Section",
// //     collapsed: section.collapsed ?? false,
// //     nodes: normalizeNodes(section.nodes ?? []),
// //   }));
// // }

// // function normalizeNodes(nodes: any[]): EditorNode[] {
// //   return nodes.map((node): EditorNode => {
// //     /* ================= FIELD ================= */
// //     if (node.kind === "FIELD") {
// //       return {
// //         id: node.id,
// //         kind: "FIELD",
// //         field: {
// //           key: node.field.key,
// //           layout: {
// //             span: node.field.layout?.span ?? 12,
// //           },
// //         },
// //       };
// //     }

// //     /* ================= LAYOUT ================= */
// //     if (node.kind === "LAYOUT") {
// //       if (node.slots) {
// //         return {
// //           id: node.id,
// //           kind: "LAYOUT",
// //           type: node.type,
// //           slots: node.slots.map((slot: any) => ({
// //             id: slot.id,
// //             title: slot.title,
// //             children: normalizeNodes(slot.children ?? []),
// //           })),
// //           config: node.config ?? {},
// //         };
// //       }

// //       return {
// //         id: node.id,
// //         kind: "LAYOUT",
// //         type: node.type,
// //         config: node.config ?? {},
// //       };
// //     }

// //     throw new Error("Unknown node type");
// //   });
// // }

// export function normalizeEditorSchema(
//   sections: any[],
//   fieldMap: Record<string, any>
// ): FormSection[] {
//   return sections.map((section) => ({
//     id: section.id,
//     title: section.title ?? "Section",
//     collapsed: section.collapsed ?? false,
//     nodes: normalizeNodes(section.nodes ?? [], fieldMap),
//   }));
// }

// // function normalizeNodes(nodes: any[]): EditorNode[] {
// //   return nodes.map((node): EditorNode => {
// //     /* ================= FIELD ================= */
// //     if (node.kind === "FIELD") {
// //       const f = node.field;

// //       return {
// //         id: node.id,
// //         kind: "FIELD",
// //         field: {
// //           id: f.id ?? node.id,
// //           key: f.key,

// //           label: f.label ?? "Untitled field",
// //           type: f.type ?? "text",

// //           category: f.category ?? "INPUT",

// //           layout: {
// //             span: f.layout?.span ?? 12,
// //           },

// //           required: f.required ?? false,
// //           readOnly: f.readOnly ?? false,
// //           deprecated: f.deprecated ?? false,

// //           placeholder: f.placeholder,
// //           default: f.default,
// //           description: f.description,
// //           helpText: f.helpText,
// //           options: f.options,

// //           validation: f.validation,
// //           format: f.format,
// //           visibility: f.visibility,
// //           integration: f.integration,
// //         },
// //       };
// //     }

// //     /* ================= LAYOUT ================= */
// //     if (node.kind === "LAYOUT") {
// //       if (node.slots) {
// //         return {
// //           id: node.id,
// //           kind: "LAYOUT",
// //           type: node.type,
// //           slots: node.slots.map((slot: any) => ({
// //             id: slot.id,
// //             title: slot.title,
// //             children: normalizeNodes(slot.children ?? []),
// //           })),
// //           config: node.config ?? {},
// //         };
// //       }

// //       return {
// //         id: node.id,
// //         kind: "LAYOUT",
// //         type: node.type,
// //         config: node.config ?? {},
// //       };
// //     }

// //     throw new Error("Unknown node type");
// //   });
// // }

// function normalizeNodes(
//   nodes: any[],
//   fieldMap: Record<string, any>
// ): EditorNode[] {
//   return nodes.map((node) => {
//     if (node.kind === "FIELD") {
//       const meta = fieldMap[node.field.key];

//       return {
//         id: node.id,
//         kind: "FIELD",
//         field: {
//           key: node.field.key,
//           label: meta?.label ?? "Untitled",
//           type: meta?.type ?? "text",
//           category: meta?.category ?? "INPUT",
//           layout: {
//             span: node.field.layout?.span ?? 12,
//           },
//         },
//       };
//     }

//     if (node.kind === "LAYOUT") {
//       return {
//         ...node,
//         slots: node.slots?.map((s) => ({
//           ...s,
//           children: normalizeNodes(s.children ?? [], fieldMap),
//         })),
//       };
//     }

//     return node;
//   });
// }


// export function mapFieldTypeToEditor(fieldType?: string): EditorFieldType {
//   switch (fieldType) {
//     case "TEXT":
//       return "text";
//     case "TEXTAREA":
//       return "textarea";
//     case "NUMBER":
//       return "number";
//     case "CURRENCY":
//       return "currency";
//     case "BOOLEAN":
//       return "boolean";
//     case "DATE":
//       return "date";
//     case "DATETIME":
//       return "datetime";
//     case "JSON":
//       return "json";
//     case "SELECT":
//       return "select";
//     case "RADIO":
//       return "radio";
//     case "FILE":
//       return "file";
//     default:
//       return "text"; // safe fallback
//   }
// }

// export function isMinRule(
//   r: FieldValidationRule,
// ): r is Extract<FieldValidationRule, { type: "MIN" }> {
//   return r.type === "MIN";
// }

// export function isMaxRule(
//   r: FieldValidationRule,
// ): r is Extract<FieldValidationRule, { type: "MAX" }> {
//   return r.type === "MAX";
// }

// export function isRegexRule(
//   r: FieldValidationRule,
// ): r is Extract<FieldValidationRule, { type: "REGEX" }> {
//   return r.type === "REGEX";
// }
import {
  FormSection,
  EditorNode,
  FieldNode,
  LayoutNode,
  EditorFieldDefinition,
} from "./contracts/editor.contract";

import { EditorFieldType } from "./contracts/fieldPalette.contract";
import { FieldDefinition } from "./contracts/field-definition.contract";
import { FieldValidationRule } from "./contracts/field-config.contract";

/* ======================================================
   CANONICAL EXTENSION (safe)
====================================================== */

type CanonicalField = FieldDefinition & {
  fieldValidationRules?: Array<{
    type: string;
    rule?: any;
    errorMessage?: string;
  }>;
};

/* ======================================================
   PUBLIC API
====================================================== */

export function normalizeEditorSchema(
  sections: any[],
  fieldDefinitions: CanonicalField[],
): FormSection[] {
  const fieldMap = Object.fromEntries(
    fieldDefinitions.map((f) => [f.key, f]),
  );

  return sections.map((section) => ({
    id: section.id,
    title: section.title ?? "Section",
    collapsed: section.collapsed ?? false,
    nodes: normalizeNodes(section.nodes ?? [], fieldMap),
  }));
}

/* ======================================================
   INTERNAL
====================================================== */

function normalizeNodes(
  nodes: any[],
  fieldMap: Record<string, CanonicalField>,
): EditorNode[] {
  return nodes.map((node) => {
    /* ================= FIELD ================= */
    if (node.kind === "FIELD") {
      const def = fieldMap[node.field.key];

      const field: EditorFieldDefinition = {
        id: def?.id ?? node.field.key, // ✅ FIX #4
        key: node.field.key,

        label: def?.label ?? "Untitled field",
        type: mapFieldTypeToEditor(def?.fieldType),
        category: normalizeCategory(def?.category),

        layout: {
          span: node.field.layout?.span ?? 12,
        },

        required: def?.isRequired ?? false,
        readOnly: def?.isActive === false, // ✅ FIX #3 (derived)

        placeholder: def?.config?.ui?.placeholder,
        helpText: def?.config?.ui?.helpText,
        options: def?.config?.ui?.options,

        default: def?.config?.data?.default,
        validation: extractEditorValidation(def?.fieldValidationRules),
        format: extractEditorFormat(def),
      };

      const fieldNode: FieldNode = {
        id: node.id,
        kind: "FIELD",
        field,
      };

      return fieldNode;
    }

    /* ================= LAYOUT ================= */
    if (node.kind === "LAYOUT") {
      const layoutNode: LayoutNode = {
        id: node.id,
        kind: "LAYOUT",
        type: node.type,
        config: node.config ?? {},
        slots: node.slots?.map((slot: any) => ({
          id: slot.id,
          title: slot.title,
          children: normalizeNodes(slot.children ?? [], fieldMap),
        })),
      };

      return layoutNode;
    }

    throw new Error("Unknown node kind");
  });
}

/* ======================================================
   HELPERS
====================================================== */

/* ---------- category ---------- */
function normalizeCategory(category?: string) {
  if (
    category === "PRESENTATION" ||
    category === "STRUCTURE" ||
    category === "DEPRECATED"
  ) {
    return "SYSTEM";
  }

  if (category === "CALCULATED" || category === "REFERENCE") {
    return category;
  }

  return "INPUT";
}

/* ---------- validation ---------- */
function extractEditorValidation(
  rules?: CanonicalField["fieldValidationRules"],
): EditorFieldDefinition["validation"] {
  if (!rules?.length) return undefined;

  let min: number | undefined;
  let max: number | undefined;
  let regex: string | undefined;
  let errorMessage: string | undefined;
  let patternMessage: string | undefined;

  for (const r of rules) {
    if (r.type === "MIN" && r.rule?.min != null) {
      min = r.rule.min;
    }

    if (r.type === "MAX" && r.rule?.max != null) {
      max = r.rule.max;
    }

    if (r.type === "LENGTH") {
      if (r.rule?.min != null) min = r.rule.min;
      if (r.rule?.max != null) max = r.rule.max;
    }

    if (r.type === "REGEX" && r.rule?.regex) {
      regex = r.rule.regex;
    }

    if (!errorMessage) errorMessage = r.errorMessage;
    if (!patternMessage) patternMessage = r.errorMessage;
  }

  return { min, max, regex, errorMessage, patternMessage };
}

/* ---------- format ---------- */
function extractEditorFormat(def?: FieldDefinition) {
  const style = def?.config?.ui?.format?.style;
  if (!style) return undefined;

  return {
    style,
    currency: def?.config?.ui?.format?.currency,
  };
}

/* ---------- type ---------- */
function mapFieldTypeToEditor(fieldType?: string): EditorFieldType {
  switch (fieldType) {
    case "TEXT":
      return "text";
    case "TEXTAREA":
      return "textarea";
    case "NUMBER":
      return "number";
    case "CURRENCY":
      return "currency";
    case "BOOLEAN":
      return "boolean";
    case "DATE":
      return "date";
    case "DATETIME":
      return "datetime";
    case "SELECT":
      return "select";
    case "RADIO":
      return "radio";
    case "FILE":
      return "file";
    case "JSON":
      return "json";
    default:
      return "text";
  }
}
