import { FieldCategory } from "../contracts/field-config.contract";

export type UIFieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "checkbox"
  | "date"
  | "datetime"
  | "email"
  | "phone"
  | "currency"
  | "radio";

export interface DynamicField {
  id: string;
  key: string;
  label: string;
  type: UIFieldType;
  order: number;

  required?: boolean;
  readOnly?: boolean;

  placeholder?: string;
  helperText?: string;
  defaultValue?: any;

  layout?: "full" | "half" | "third" | "quarter" | "two-third";

  min?: number;
  max?: number;

  options?: { label: string; value: string }[];

  visibleIf?: {
    operator: "AND" | "OR";
    rules: {
      field: string;
      operator: "EQUALS" | "IN" | "GT" | "LT";
      value: any;
    }[];
  };

  permissions?: {
    read?: string[];
    write?: string[];
  };

  category?: FieldCategory;

  formula?: {
    expression: string;
    dependencies: string[];
  };

  /** ✅ ADD THIS */
  integration?: {
    type: "API" | "REFERENCE";

    /** API-driven dropdown */
    url?: string;
    method?: "GET" | "POST";
    valueField?: string;
    labelField?: string;

    /** Dependency (state → city) */
    dependsOn?: string[];

    /** Dynamic query params */
    params?: Record<string, string>;

    /** Reference object */
    targetObject?: string;
    displayField?: string;
  };

  showInList?: boolean;

  icon?: string;
  color?: string;
  iconIntent?: "default" | "info" | "success" | "warning" | "error";
}


export interface FormSection {
  id: string;
  title: string;
  order: number;
  fields: DynamicField[];
  collapsed?: boolean;
}
