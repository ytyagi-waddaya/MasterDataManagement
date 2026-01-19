// import {
//   FormSection,
//   EditorNode,
//   FieldNode,
//   LayoutNode,
// } from "./contracts/editor.contract";
// import { FieldDefinition } from "./contracts/field-definition.contract";

// export function normalizeEditorSchema(
//   sections: any[],
//   fieldDefinitions: FieldDefinition[]
// ): FormSection[] {
//   return sections.map((section) => ({
//     id: section.id,
//     title: section.title ?? "Section",
//     collapsed: section.collapsed ?? false,
//     nodes: normalizeNodes(section.nodes ?? []),
//   }));
// }

// function normalizeNodes(nodes: any[]): EditorNode[] {
//   return nodes.map((node): EditorNode => {
//     /* ================= FIELD NODE ================= */
//     if (node.kind === "FIELD") {
//       const fieldNode: FieldNode = {
//         id: node.id,
//         kind: "FIELD",
//         field: {
//           id: node.field.id ?? node.id,
//           key: node.field.key,
//           label: node.field.label,
//           category: node.field.category ?? "INPUT",
//           type: node.field.type ?? "text",
//           layout: {
//             span: node.field.layout?.span ?? 12,
//           },
//           required: node.field.required ?? false,
//           readOnly: node.field.readOnly ?? false,
//           description: node.field.description,
//           helpText: node.field.helpText,
//         },
//       };

//       return fieldNode;
//     }

//     /* ================= LAYOUT NODE ================= */
//     const layoutNode: LayoutNode = {
//       id: node.id,
//       kind: "LAYOUT",
//       type: node.type,
//       slots: (node.slots ?? []).map((slot: any) => ({
//         id: slot.id,
//         title: slot.title,
//         children: normalizeNodes(slot.children ?? []),
//       })),
//       config: node.config ?? {},
//     };

//     return layoutNode;
//   });
// }
import {
  FormSection,
  EditorNode,
  FieldNode,
  LayoutNode,
} from "./contracts/editor.contract";
import { FieldDefinition } from "./contracts/field-definition.contract";
import { FieldValidationRule } from "./contracts/field-config.contract";
import { EditorFieldType } from "./contracts/fieldPalette.contract";

export function normalizeEditorSchema(
  sections: any[],
  fieldDefinitions: FieldDefinition[]
): FormSection[] {
  const defMap = Object.fromEntries(
    fieldDefinitions.map((d) => [d.key, d])
  );

  return sections.map((section) => ({
    id: section.id,
    title: section.title ?? "Section",
    collapsed: section.collapsed ?? false,
    nodes: normalizeNodes(section.nodes ?? [], defMap),
  }));
}

function normalizeNodes(
  nodes: any[],
  defMap: Record<string, FieldDefinition>
): EditorNode[] {
  return nodes.map((node): EditorNode => {
    /* ================= FIELD ================= */
    if (node.kind === "FIELD") {
      const def = defMap[node.field.key];

      const editorCategory =
        def?.category === "STRUCTURE" || def?.category === "PRESENTATION"
          ? "SYSTEM"
          : def?.category ?? "INPUT";

      /* ---------- validation extraction ---------- */
      const rules: FieldValidationRule[] =
        def?.config?.validation?.rules ?? [];

      let min: number | undefined;
      let max: number | undefined;
      let regex: string | undefined;
      let errorMessage: string | undefined;

      for (const r of rules) {
        if (r.type === "MIN") min = r.params.value;
        if (r.type === "MAX") max = r.params.value;
        if (r.type === "REGEX") regex = r.params.pattern;
        if (!errorMessage) errorMessage = r.message;
      }

      const editorValidation =
        rules.length > 0
          ? { min, max, regex, errorMessage }
          : undefined;

      const fieldNode: FieldNode = {
        id: node.id,
        kind: "FIELD",
        field: {
          id: node.field.id ?? node.id,
          key: node.field.key,

          label: def?.label ?? node.field.label,
          category: editorCategory,
          type:
            mapFieldTypeToEditor(def?.fieldType) ?? node.field.type,

          layout: {
            span: node.field.layout?.span ?? 12,
          },

          required: def?.isRequired ?? false,
          readOnly: def?.isReadOnly ?? false,

          helpText: def?.config?.ui?.helpText,
          placeholder: def?.config?.ui?.placeholder,
          options: def?.config?.ui?.options,

          validation: editorValidation,
          integration: node.field.integration,

        },
      };

      return fieldNode;
    }

    /* ================= LAYOUT ================= */
    const layoutNode: LayoutNode = {
      id: node.id,
      kind: "LAYOUT",
      type: node.type,
      slots: (node.slots ?? []).map((slot: any) => ({
        id: slot.id,
        title: slot.title,
        children: normalizeNodes(slot.children ?? [], defMap),
      })),
      config: node.config ?? {},
    };

    return layoutNode;
  });
}

/* ======================================================
   FIELD TYPE MAPPER
====================================================== */

/* ======================================================
   FIELD TYPE MAPPER (BACKEND → EDITOR)
====================================================== */


export function mapFieldTypeToEditor(
  fieldType?: string
): EditorFieldType {
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
    case "JSON":
      return "json";
    case "SELECT":
      return "select";
    case "RADIO":
      return "radio";
    case "FILE":
      return "file";
    default:
      return "text"; // safe fallback
  }
}

export function isMinRule(
  r: FieldValidationRule
): r is Extract<FieldValidationRule, { type: "MIN" }> {
  return r.type === "MIN";
}

export function isMaxRule(
  r: FieldValidationRule
): r is Extract<FieldValidationRule, { type: "MAX" }> {
  return r.type === "MAX";
}

export function isRegexRule(
  r: FieldValidationRule
): r is Extract<FieldValidationRule, { type: "REGEX" }> {
  return r.type === "REGEX";
}