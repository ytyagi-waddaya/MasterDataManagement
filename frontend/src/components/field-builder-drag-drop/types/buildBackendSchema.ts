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
// import { FieldConfig, FieldValidationRule } from "../contracts/field-config.contract";
// import { RuntimeField } from "../contracts/runtime.contract";

// export function buildBackendSchema(
//   runtimeFields: RuntimeField[]
// ): FieldConfig[] {
//   return runtimeFields.map((field) => {
//     const config = field.config;

//     // 👇 editor validation lives here
//     const v = (field as any).editorValidation ?? field.config.validation;

//     const rules: FieldValidationRule[] = [];

//     if (v?.required) {
//       rules.push({
//         type: "REQUIRED",
//         message: v.errorMessage ?? "This field is required",
//       });
//     }

//     if (v?.min !== undefined) {
//       rules.push({
//         type: "MIN",
//         params: { value: v.min, appliesTo: "value" },
//         message: v.errorMessage ?? `Minimum ${v.min}`,
//       });
//     }

//     if (v?.max !== undefined) {
//       rules.push({
//         type: "MAX",
//         params: { value: v.max, appliesTo: "value" },
//         message: v.errorMessage ?? `Maximum ${v.max}`,
//       });
//     }

//     if (v?.regex) {
//       rules.push({
//         type: "REGEX",
//         params: { pattern: v.regex },
//         message: v.patternMessage ?? "Invalid format",
//       });
//     }

//     return {
//       meta: config.meta,
//       data: config.data,
//       ui: config.ui,
//       validation: rules.length ? { rules } : undefined,
//       visibility: config.visibility,
//       permissions: config.permissions,
//       behavior: config.behavior,
//       integration: config.integration,
//     };
//   });
// }

// import { FieldConfig, FieldValidationRule } from "../contracts/field-config.contract";
// import { RuntimeField } from "../contracts/runtime.contract";

// export function buildBackendSchema(
//   runtimeFields: RuntimeField[]
// ): FieldConfig[] {
//   return runtimeFields.map((field) => {
//     const config = field.config;

//     // 👇 editor validation must be passed in runtime.config._editorValidation
//     const v = (config as any)._editorValidation;

//     const rules: FieldValidationRule[] = [];

//     /* ================= REQUIRED ================= */
//     if (v?.required) {
//       rules.push({
//         type: "REQUIRED",
//         message: v.errorMessage ?? "This field is required",
//       });
//     }

//     /* ================= MIN ================= */
//     if (v?.min !== undefined) {
//       rules.push({
//         type: "MIN",
//         params: {
//           value: v.min,
//           appliesTo: isTextField(config.ui?.widget) ? "length" : "value",
//         },
//         message: v.errorMessage ?? `Minimum ${v.min}`,
//       });
//     }

//     /* ================= MAX ================= */
//     if (v?.max !== undefined) {
//       rules.push({
//         type: "MAX",
//         params: {
//           value: v.max,
//           appliesTo: isTextField(config.ui?.widget) ? "length" : "value",
//         },
//         message: v.errorMessage ?? `Maximum ${v.max}`,
//       });
//     }

//     /* ================= REGEX ================= */
//     if (v?.regex) {
//       rules.push({
//         type: "REGEX",
//         params: { pattern: v.regex },
//         message: v.patternMessage ?? "Invalid format",
//       });
//     }

//     return {
//       meta: config.meta,
//       data: config.data,
//       ui: config.ui,
//       validation: rules.length ? { rules } : undefined,
//       visibility: config.visibility,
//       permissions: config.permissions,
//       behavior: config.behavior,
//       integration: config.integration,
//     };
//   });
// }

// /* ================= HELPERS ================= */

// function isTextField(widget?: string) {
//   return (
//     widget === "TEXT" ||
//     widget === "TEXTAREA" ||
//     widget === "SELECT" ||
//     widget === "RADIO"
//   );
// }

import { RuntimeField } from "../contracts/runtime.contract";
import {
  FieldConfig,
  FieldValidationRule,
} from "../contracts/field-config.contract";
import { EditorNode, FormSection } from "../contracts/editor.contract";
import { FieldDefinition } from "../contracts/field-definition.contract";
import {
  mapDataType,
  mapLayoutSpan,
  mapWidget,
} from "../mappers/field-mappers";

/* ======================================================
   BUILD RUNTIME SCHEMA
====================================================== */

export function buildBackendSchema(
  runtimeFields: RuntimeField[],
): FieldConfig[] {
  return runtimeFields.map((field) => {
    const config = field.config;
    const v = field.editorValidation;

    const rules: FieldValidationRule[] = [];

    if (v?.required) {
      rules.push({
        type: "REQUIRED",
        message: v.errorMessage ?? "This field is required",
      });
    }

    if (v?.min !== undefined) {
      rules.push({
        type: isTextField(config.ui?.widget) ? "LENGTH" : "MIN",
        params: isTextField(config.ui?.widget)
          ? { min: v.min }
          : { min: v.min },
        message: v.errorMessage ?? `Minimum ${v.min}`,
      });
    }

    if (v?.max !== undefined) {
      rules.push({
        type: isTextField(config.ui?.widget) ? "LENGTH" : "MAX",
        params: isTextField(config.ui?.widget)
          ? { max: v.max }
          : { max: v.max },
        message: v.errorMessage ?? `Maximum ${v.max}`,
      });
    }

    if (v?.regex) {
      rules.push({
        type: "REGEX",
        params: { regex: v.regex },
        message: v.patternMessage ?? "Invalid format",
      });
    }

    return {
      configVersion: 1,
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

function isTextField(widget?: string) {
  return (
    widget === "TEXT" ||
    widget === "TEXTAREA" ||
    widget === "SELECT" ||
    widget === "RADIO"
  );
}
