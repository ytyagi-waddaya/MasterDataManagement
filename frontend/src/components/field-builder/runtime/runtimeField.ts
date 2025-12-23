import { FieldConfig } from "../contracts/field-config.contract";

type RuntimeWidget = NonNullable<FieldConfig["ui"]>["widget"];

export interface RuntimeField {
  key: string;
  label: string;
  widget: RuntimeWidget;

  required: boolean;
  readOnly: boolean;

  order: number;
  config: Record<string, any>;

  ui?: FieldConfig["ui"];
  data?: FieldConfig["data"];

  options?: { label: string; value: string }[];
}

export function toRuntimeField(
  field: FieldConfig,
  values: Record<string, any>
): RuntimeField {
  if (!field?.meta?.key) {
    console.error("Invalid FieldConfig:", field);
    throw new Error(
      "[FormRenderer] Invalid FieldConfig: meta.key is missing"
    );
  }

  const locked =
    !!field.behavior?.lockWhen &&
    values[field.behavior.lockWhen.field] ===
      field.behavior.lockWhen.equals;

  const required =
    !!field.validation?.required ||
    !!field.validation?.rules?.some(
      (r) => r.type === "REQUIRED"
    );

  return {
    key: field.meta.key,
    label: field.meta.label,
    widget: field.ui?.widget ?? "TEXT",

    required,
    readOnly: !!field.behavior?.readOnly || locked,

    /** ✅ ORDER (source of truth = UI layout) */
    order: field.ui?.layout?.order ?? 0,

    /** ✅ CONFIG (safe runtime subset only) */
    config: {
      ui: field.ui,
      visibility: field.visibility,
      permissions: field.permissions,
      behavior: field.behavior,
      integration: field.integration,
    },

    ui: field.ui,
    data: field.data,

    options:
      field.integration?.apiSource ||
      field.integration?.reference
        ? []
        : undefined,
  };
}