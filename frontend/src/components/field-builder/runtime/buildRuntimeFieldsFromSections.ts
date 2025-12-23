import { FormSection, DynamicField } from "../types/DynamicField";
import { RuntimeField } from "./runtimeField";

/**
 * Editor → Runtime adapter
 * Used ONLY for preview / create record flows
 */
export function buildRuntimeFieldsFromSections(
  sections: FormSection[]
): RuntimeField[] {
  return sections.flatMap((section) =>
    section.fields.map((field) => ({
      key: field.key,
      label: field.label,
      widget: field.type.toUpperCase() as any,

      required: !!field.required,
      readOnly: !!field.readOnly,

      order: field.order ?? 0,

      config: {
        ui: {
          layout: {
            width: field.layout ?? "full",
            section: section.title,
            order: field.order ?? 0,
          },
        },
      },

      ui: {
        widget: field.type.toUpperCase() as any,
        layout: {
          width: field.layout ?? "full",
          section: section.title,
          order: field.order ?? 0,
        },
      },

      options: field.options ?? [],
    }))
  );
}
