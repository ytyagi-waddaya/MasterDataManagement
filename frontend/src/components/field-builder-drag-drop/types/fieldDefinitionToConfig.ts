import { FieldDefinition } from "../contracts/field-definition.contract";
import { FieldConfig } from "../contracts/field-config.contract";

/* ======================================================
   FieldDefinition → FieldConfig
   (Canonical → Runtime)
====================================================== */
export function fieldDefinitionToConfig(def: FieldDefinition): FieldConfig {
  return {
    meta: {
      key: def.key,
      label: def.label,
      description: def.description,
      category: def.category ?? "INPUT",
      deprecated: false,
    },

    data: {
      type: def.dataType, // ✅ REQUIRED
      default: def.default ?? undefined,
      nullable: true,
    },

    ui: def.config?.ui
      ? {
          widget: def.config.ui.widget, // ✅ REQUIRED
          placeholder: def.config.ui.placeholder,
          helpText: def.config.ui.helpText,
          options: def.config.ui.options,
          layout: def.config.ui.layout,
          format: def.config.ui.format,
        }
      : undefined,

    validation: def.config?.validation
      ? {
          rules: def.config.validation.rules ?? [],
        }
      : undefined,

    behavior: def.config?.behavior,

    visibility: def.config?.visibility,

    permissions: def.config?.permissions,

    integration: def.config?.integration,
  };
}
