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

// import { FieldConfig } from "../contracts/field-config.contract";
// import { RuntimeField } from "../contracts/runtime.contract";

// /**
//  * RuntimeField → Canonical FieldConfig
//  * Strips editor/runtime-only properties
//  */
// export function buildBackendSchema(
//   runtimeFields: RuntimeField[]
// ): FieldConfig[] {
//   if (!Array.isArray(runtimeFields)) return [];

//   return runtimeFields.map((field) => {
//     const { config } = field;

//     const cleanConfig: FieldConfig = {
//       meta: config.meta,
//       data: config.data,

//       ui: config.ui
//         ? {
//             widget: config.ui.widget,
//             placeholder: config.ui.placeholder,
//             helpText: config.ui.helpText,
//             options: config.ui.options,
//             format: config.ui.format,
//           }
//         : undefined,

//       validation: config.validation,
//       visibility: config.visibility,
//       permissions: config.permissions,
//       behavior: config.behavior,
//       integration: config.integration,
//     };

//     return cleanConfig;
//   });
// }
import { FieldConfig, FieldValidationRule } from "../contracts/field-config.contract";
import { RuntimeField } from "../contracts/runtime.contract";

export function buildBackendSchema(
  runtimeFields: RuntimeField[]
): FieldConfig[] {
  return runtimeFields.map((field) => {
    const config = field.config;

    // 👇 editor validation lives here
    const v = (field as any).editorValidation ?? field.config.validation;

    const rules: FieldValidationRule[] = [];

    if (v?.required) {
      rules.push({
        type: "REQUIRED",
        message: v.errorMessage ?? "This field is required",
      });
    }

    if (v?.min !== undefined) {
      rules.push({
        type: "MIN",
        params: { value: v.min, appliesTo: "value" },
        message: v.errorMessage ?? `Minimum ${v.min}`,
      });
    }

    if (v?.max !== undefined) {
      rules.push({
        type: "MAX",
        params: { value: v.max, appliesTo: "value" },
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

    return {
      meta: config.meta,
      data: config.data,
      ui: config.ui,
      validation: rules.length ? { rules } : undefined,
      visibility: config.visibility,
      permissions: config.permissions,
      behavior: config.behavior,
      integration: config.integration,
    };
  });
}
