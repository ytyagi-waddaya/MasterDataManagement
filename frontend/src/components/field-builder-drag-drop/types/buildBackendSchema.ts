// import { FieldConfig } from "@/components/field-builder-drag-drop/contracts/field-config.contract";
// import { RuntimeField } from "../contracts/runtime.contract";


// export interface BackendFieldSchema {
//   key: string;
//   version: number;
//   config: FieldConfig;
// }

// export function buildBackendSchema(
//   runtimeFields: RuntimeField[],
//   version: number
// ): BackendFieldSchema[] {
//   return runtimeFields.map((f) => ({
//     key: f.config.meta.key,
//     version,
//     config: f.config,
//   }));
// }

import { FieldConfig } from "../contracts/field-config.contract";
import { RuntimeField } from "../contracts/runtime.contract";

/**
 * RuntimeField → Canonical FieldConfig
 * Strips editor/runtime-only properties
 */
export function buildBackendSchema(
  runtimeFields: RuntimeField[]
): FieldConfig[] {
  if (!Array.isArray(runtimeFields)) return [];

  return runtimeFields.map((field) => {
    const { config } = field;

    const cleanConfig: FieldConfig = {
      meta: config.meta,
      data: config.data,

      ui: config.ui
        ? {
            widget: config.ui.widget,
            placeholder: config.ui.placeholder,
            helpText: config.ui.helpText,
            options: config.ui.options,
            format: config.ui.format,
          }
        : undefined,

      validation: config.validation,
      visibility: config.visibility,
      permissions: config.permissions,
      behavior: config.behavior,
      integration: config.integration,
    };

    return cleanConfig;
  });
}
