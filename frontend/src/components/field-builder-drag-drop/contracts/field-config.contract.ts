/* ======================================================
   FIELD CONFIG – CANONICAL CONTRACT
====================================================== */

import { ConditionNode, FieldKey } from "./condition.contract";

export interface FieldConfig {
  configVersion?: number;
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
  | "PRESENTATION"
  | "DEPRECATED";

export interface FieldMeta {
  key: string; // ❌ immutable
  label: string;
  description?: string;
  category: FieldCategory; // ❌ immutable
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
  type: FieldDataType; // ❌ immutable
  default?: any;
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
    | "FILE"
    | "RICH_TEXT";

  placeholder?: string;
  helpText?: string;
  options?: { label: string; value: string }[]; // ✅ add this

  layout?: {
    width?: "full" | "half" | "third" | "quarter" | "two-third";
    order?: number;
    section?: string;
  };

  format?: {
    style?: "currency" | "percent" | "decimal";
    currency?: string;
  };
}

/* ================= VALIDATION ================= */

export type ValidationRuleType =
  | "REQUIRED"
  | "REQUIRED_IF"
  | "MIN"
  | "MAX"
  | "REGEX"
  | "BETWEEN"
  | "RANGE"
  | "LENGTH"
  | "EMAIL"
  | "CUSTOM";

export interface FieldValidationRule {
  type: ValidationRuleType;
  params?: ValidationParams;
  message: string;
  severity?: "ERROR" | "WARNING";
}

export interface FieldValidation {
  rules?: FieldValidationRule[];
}

/* ================= VISIBILITY ================= */

export type VisibilityRule =
  | {
      type: "CONDITION";
      condition: ConditionNode;
    }
  | {
      type: "EXPRESSION";
      expression: {
        expression: string;
        dependencies?: string[];
      };
    };

export interface FieldVisibility {
  rule?: VisibilityRule;
}

export interface PermissionCondition {
  field: FieldKey;
  equals: any;
}

export interface PermissionRule {
  roles?: string[];
  users?: string[];
  conditions?: PermissionCondition[];
}

export interface FieldPermissions {
  read?: PermissionRule;
  write?: PermissionRule;
  create?: PermissionRule;
  delete?: PermissionRule;
}

/* ================= BEHAVIOR ================= */

export interface FieldBehavior {
  readOnly?: boolean;

  formula?: {
    expression: string;
    dependencies: string[];
    mode?: "SYSTEM_RECALC" | "ON_CHANGE";
  };
}

/* ================= INTEGRATION ================= */

export interface ReferenceConfig {
  targetObject: string;
  displayField: string;
  relation: "ONE_TO_ONE" | "ONE_TO_MANY";
  allowMultiple?: boolean;
  onDelete?: "CASCADE" | "SET_NULL";
}

export interface ApiSourceConfig {
  url: string;
  method: "GET" | "POST";

  valueField: string;
  labelField: string;

  dependsOn?: string[];
  params?: Record<string, string | number | boolean>;

  cache?: boolean;
}

export interface FieldIntegration {
  reference?: ReferenceConfig;
  apiSource?: ApiSourceConfig;
  file?: FileConfig;
}

/* ================= IMMUTABILITY ================= */

export const IMMUTABLE_AFTER_PUBLISH = [
  "meta.key",
  "meta.category",
  "data.type",
  "behavior.formula.expression",
] as const;

export interface FileConfig {
  maxSizeMB: number;
  allowedTypes: string[];
  storage?: "S3" | "LOCAL";
  multiple?: boolean;
}

type ValidationParams =
  | { min: number }
  | { max: number }
  | { regex: string }
  | { field: string; equals: any } // REQUIRED_IF
  | { from: number; to: number } // RANGE
  | { min: number; max: number } // LENGTH
  | { customFn: string };
