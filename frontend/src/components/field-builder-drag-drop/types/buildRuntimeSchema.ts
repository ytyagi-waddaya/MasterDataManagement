import {
  FormSection,
  EditorNode,
  FieldNode,
} from "../contracts/editor.contract";
import { type FieldValidationRule } from "../contracts/field-config.contract";
import { RuntimeField } from "../contracts/runtime.contract";
import {
  mapDataType,
  mapLayoutSpan,
  mapWidget,
} from "../mappers/field-mappers";

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
        case "repeater": {
          for (const slot of node.slots ?? []) {
            result.push(...collectFieldNodes(slot.children ?? []));
          }
          break;
        }

        // layouts without children (divider, spacer, etc.)
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

export function buildRuntimeSchema(sections?: FormSection[]): RuntimeField[] {
  if (!Array.isArray(sections)) return [];

  const fieldNodes = sections.flatMap((section) =>
    collectFieldNodes(section.nodes ?? [])
  );

  return fieldNodes.map(({ id, field }) => {
    const rules: FieldValidationRule[] = [];

    /* ---------- REQUIRED ---------- */
    if (field.required) {
      rules.push({
        type: "REQUIRED",
        message: field.validation?.errorMessage || "This field is required",
      });
    }

    /* ---------- MIN ---------- */
    if (field.validation?.min !== undefined) {
      rules.push({
        type: "MIN",
        params: {
          value: field.validation.min,
          appliesTo:
            field.type === "text" || field.type === "textarea"
              ? "length"
              : "value",
        },
        message:
          field.validation?.errorMessage || `Minimum ${field.validation.min}`,
      });
    }

    /* ---------- MAX ---------- */
    if (field.validation?.max !== undefined) {
      rules.push({
        type: "MAX",
        params: {
          value: field.validation.max,
          appliesTo:
            field.type === "text" || field.type === "textarea"
              ? "length"
              : "value",
        },
        message:
          field.validation?.errorMessage || `Maximum ${field.validation.max}`,
      });
    }

    /* ---------- REGEX ---------- */
    if (field.validation?.regex) {
      rules.push({
        type: "REGEX",
        params: {
          pattern: field.validation.regex,
        },
        message:
          field.validation?.patternMessage ||
          field.validation?.errorMessage ||
          "Invalid format",
      });
    }

    return {
      id, // runtime-only id (not persisted)
      config: {
        meta: {
          key: field.key, // 🔑 canonical identity
          label: field.label,
          description: field.description,
          category: field.category ?? "INPUT",
          deprecated: field.deprecated ?? false,
        },

        data: {
          type: mapDataType(field.type),
        },

        ui: {
          widget: mapWidget(field.type),
          layout: mapLayoutSpan(field.layout),
          format: field.format,
          placeholder: field.placeholder,
          helpText: field.description,
          options: field.options,
        },

        validation: rules.length ? { rules } : undefined,
      },

      state: {
        visible: true,
        readOnly: field.readOnly ?? false,
      },
    };
  });
}
