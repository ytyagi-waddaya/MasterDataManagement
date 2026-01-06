
import {
  FormSection,
  EditorNode,
  FieldNode,
} from "../contracts/editor.contract";
import {
  type FieldValidationRule,
} from "../contracts/field-config.contract";
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

export function buildRuntimeSchema(
  sections?: FormSection[]
): RuntimeField[] {
  if (!Array.isArray(sections)) return [];

  const fieldNodes = sections.flatMap((section) =>
    collectFieldNodes(section.nodes ?? [])
  );

  return fieldNodes.map(({ id, field }) => {
    const rules: FieldValidationRule[] = [];

    if (field.validation?.min !== undefined) {
      rules.push({
        type: "MIN",
        params: { value: field.validation.min, appliesTo: "value" },
        message: "Too small",
      });
    }

    if (field.validation?.max !== undefined) {
      rules.push({
        type: "MAX",
        params: { value: field.validation.max, appliesTo: "value" },
        message: "Too large",
      });
    }

    if (field.validation?.regex) {
      rules.push({
        type: "REGEX",
        params: { pattern: field.validation.regex },
        message: "Invalid format",
      });
    }

    if (field.required) {
      rules.push({
        type: "REQUIRED",
        message: "Required",
      });
    }

    return {
      id, // runtime-only id (not persisted)
      config: {
        meta: {
          key: field.key,           // 🔑 canonical identity
          label: field.label,
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


