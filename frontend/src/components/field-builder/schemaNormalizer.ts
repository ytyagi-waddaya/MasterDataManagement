/* ======================================================
   BUILDER → BACKEND FIELD SCHEMA ASSEMBLER
====================================================== */

import type {
  FieldConfig,
  FieldValidation,
  FieldValidationRule,
} from "./contracts/field-config.contract";
import type { DynamicField, FormSection } from "./types/DynamicField";
import type { BackendFieldSchema } from "./types/backend-schema";

/* ======================================================
   TYPE MAPPERS
====================================================== */

type UIWidget = NonNullable<FieldConfig["ui"]>["widget"];

function mapWidget(type: DynamicField["type"]): UIWidget {
  switch (type) {
    case "textarea":
      return "TEXTAREA";
    case "number":
      return "NUMBER";
    case "currency":
      return "CURRENCY";
    case "select":
      return "SELECT";
    case "radio":
      return "RADIO";
    case "checkbox":
      return "CHECKBOX";
    case "date":
      return "DATE";
    case "datetime":
      return "DATETIME";
    default:
      return "TEXT";
  }
}

function mapDataType(
  type: DynamicField["type"]
): BackendFieldSchema["data"]["type"] {
  switch (type) {
    case "number":
    case "currency":
      return "NUMBER";
    case "checkbox":
      return "BOOLEAN";
    case "date":
      return "DATE";
    case "datetime":
      return "DATETIME";
    default:
      return "STRING";
  }
}

/* ======================================================
   NORMALIZERS
====================================================== */

function normalizeValidation(
  field: DynamicField
): FieldValidation | undefined {
  const rules: FieldValidationRule[] = [];

  if (field.required) {
    rules.push({
      type: "REQUIRED",
      message: `${field.label} is required`,
    });
  }

  if (field.min !== undefined || field.max !== undefined) {
    rules.push({
      type: "RANGE",
      params: { min: field.min, max: field.max },
      message: `${field.label} is out of range`,
    });
  }

  return rules.length ? { required: field.required, rules } : undefined;
}

/* ======================================================
   MAIN ASSEMBLER (FINAL)
====================================================== */

export function buildFieldConfig(
  sections: FormSection[]
): BackendFieldSchema[] {
  return sections.flatMap((section) =>
    section.fields
      /* 🚫 STRIP editor-only fields */
      .filter(
        (f) =>
          f.category !== "STRUCTURE" &&
          f.category !== "PRESENTATION"
      )
      .map((f): BackendFieldSchema => ({
        /* ================= META ================= */

        meta: {
          key: f.key,
          label: f.label,
          category: f.formula
            ? "CALCULATED"
            : f.category === "REFERENCE"
            ? "REFERENCE"
            : f.category === "SYSTEM"
            ? "SYSTEM"
            : "INPUT",
        },

        /* ================= DATA ================= */

        data: {
          type: mapDataType(f.type),
          default: f.defaultValue,
        },

        /* ================= UI ================= */

        ui: {
          widget: mapWidget(f.type),
          placeholder: f.placeholder,
          helpText: f.helperText,
          layout: {
            width: f.layout ?? "full",
            order: f.order,
            section: section.title || "Default",
          },
        },

        /* ================= VALIDATION ================= */

        validation: normalizeValidation(f),

        /* ================= PERMISSIONS ================= */

        permissions: f.permissions
          ? {
              read: f.permissions.read
                ? { roles: f.permissions.read }
                : undefined,
              write: f.permissions.write
                ? { roles: f.permissions.write }
                : undefined,
            }
          : undefined,

        /* ================= BEHAVIOR ================= */

        behavior: f.formula
          ? { formula: f.formula }
          : undefined,

        /* ================= INTEGRATION ================= */

        integration: hasValidApiIntegration(f)
          ? {
              apiSource: {
                url: f.integration.url,
                method: "GET",
                params: f.integration.params ?? {},
                labelField: f.integration.labelField,
                valueField: f.integration.valueField,
                dependsOn: f.integration.dependsOn ?? [],
              },
            }
          : undefined,
      }))
  );
}

/* ======================================================
   TYPE GUARD
====================================================== */

function hasValidApiIntegration(
  field: DynamicField
): field is DynamicField & {
  integration: {
    type: "API";
    url: string;
    labelField: string;
    valueField: string;
    params?: Record<string, any>;
    dependsOn?: string[];
  };
} {
  return (
    field.integration?.type === "API" &&
    typeof field.integration.url === "string" &&
    typeof field.integration.labelField === "string" &&
    typeof field.integration.valueField === "string"
  );
}
