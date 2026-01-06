import { ConditionNode } from "./condition.contract";
import { Expression } from "./expression.contract";
import { VisibilityRule } from "./visibility.contract";

/* ======================================================
   FIELD CONFIG – CANONICAL (PRODUCTION)
====================================================== */


export interface FieldConfig {
  meta: FieldMeta;
  data: FieldData;
  ui?: FieldUI;
  validation?: FieldValidation;
  visibility?: FieldVisibility;
  permissions?: FieldPermissions;
  behavior?: FieldBehavior;
  integration?: FieldIntegration;
}

/* ================= META ================= */

export type FieldCategory =
  | "INPUT"
  | "SYSTEM"
  | "CALCULATED"
  | "REFERENCE"
  | "STRUCTURE"
  | "PRESENTATION";

export interface FieldMeta {
  key: string;
  label: string;
  description?: string;
  category: FieldCategory;
  system?: boolean;
  locked?: boolean;
  deprecated?: boolean;
}

/* ================= DATA ================= */

export type FieldDataType =
  | "STRING"
  | "NUMBER"
  | "BOOLEAN"
  | "DATE"
  | "DATETIME"
  | "JSON";

export interface FieldData {
  type: FieldDataType;
  default?: string | number | boolean | null | object;
  nullable?: boolean;
  precision?: number;
  scale?: number;
}

/* ================= UI ================= */

export interface FieldUI {
  widget:
    | "TEXT"
    | "TEXTAREA"
    | "NUMBER"
    | "CURRENCY"
    | "SELECT"
    | "RADIO"
    | "CHECKBOX"
    | "DATE"
    | "DATETIME"
    | "FILE";

  placeholder?: string;
  helpText?: string;

  layout?: {
    width?: "full" | "half" | "third" | "quarter" | "two-third";
    order?: number;
    section?: string;
  };

  format?: {
    style?: "currency" | "percent" | "decimal";
    currency?: string;
  };
  options?: { label: string; value: string }[];
}

/* ================= VALIDATION ================= */

export type FieldValidationRule =
  | { type: "REQUIRED"; message: string; when?: ConditionNode }
  | {
      type: "MIN" | "MAX";
      params: { value: number; appliesTo?: "value" | "length" };
      message: string;
      when?: ConditionNode;
    }
  | {
      type: "REGEX";
      params: { pattern: string };
      message: string;
      when?: ConditionNode;
    }
  | { type: "EMAIL"; message: string; when?: ConditionNode }
  | {
      type: "BETWEEN";
      params: { min: number; max: number };
      message: string;
      when?: ConditionNode;
    }
  | {
      type: "CUSTOM";
      handler: string;
      message: string;
      when?: ConditionNode;
    };

export interface FieldValidation {
  rules?: FieldValidationRule[];
}

/* ================= BEHAVIOR ================= */

export interface FieldBehavior {
  readOnly?: boolean;
  formula?: Expression;
  submitBehavior?: "REQUIRED" | "OPTIONAL";
}


/* ================= VISIBILITY ================= */

export interface FieldVisibility {
  /** Initial visibility before rules are evaluated */
  defaultVisible?: boolean;

  /** Runtime rule to compute visibility */
  rule?: VisibilityRule;
}


/* ================= PERMISSIONS ================= */

export interface FieldPermissions {
  read?: Array<{ roles?: string[]; users?: string[] }>;
  write?: Array<{ roles?: string[]; users?: string[] }>;
}

/* ================= INTEGRATION ================= */

export interface FieldIntegration {
  apiSource?: {
    sourceType?: "INTERNAL" | "EXTERNAL";
    url: string;
    method: "GET" | "POST";
    valueField: string;
    labelField: string;
    dependsOn?: Array<{ field: string; param: string }>;
    params?: Record<string, any>;
  };
}

/* ================= IMMUTABILITY ================= */

export const IMMUTABLE_AFTER_PUBLISH = [
  "meta.key",
  "meta.category",
  "data.type",
  "behavior.formula",
] as const;


