
import { FormSection } from "../../contracts/editor.contract";
import { RuntimeField } from "../../contracts/runtime.contract";
import { mapWidget, mapDataType, mapLayoutSpan } from "../../mappers/field-mappers";
import { buildValidationRules } from "./validation.builder";

function collect(nodes: any[]): any[] {
  return nodes.flatMap((n) =>
    n.kind === "FIELD"
      ? [n]
      : n.kind === "LAYOUT" && n.slots
      ? n.slots.flatMap((s:any) => collect(s.children))
      : [],
  );
}

export function buildRuntimeSchema(sections: FormSection[]): RuntimeField[] {
  const fields = sections.flatMap((s) => collect(s.nodes));

  return fields.map((node) => {
    const f = node.field;
    const widget = mapWidget(f.type);

    return {
      id: node.id,
      fieldKey: f.key,

      config: {
        meta: {
          key: f.key,
          label: f.label,
          category: f.category ?? "INPUT",
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
          layout: mapLayoutSpan(f.layout),
        },
        validation: {
          rules: buildValidationRules(f.validation, widget, f.required),
        },
      },

      state: {
        value: f.default,
        visible: true,
        readOnly: !!f.readOnly,
        errors: [],
      },
    };
  });
}
