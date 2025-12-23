// types/backend-schema.ts

export type BackendFieldSchema = {
  meta: {
    key: string;
    label: string;
    category: "INPUT" | "SYSTEM" | "CALCULATED" | "REFERENCE";
    system?: boolean;
    locked?: boolean;
    deprecated?: boolean;
  };

  data: {
    type: "NUMBER" | "DATE" | "DATETIME" | "STRING" | "BOOLEAN" | "JSON";
    default?: any;
    nullable?: boolean;
    precision?: number;
    scale?: number;
  };

  ui?: {
    widget:
      | "TEXT"
      | "TEXTAREA"
      | "NUMBER"
      | "CURRENCY"
      | "SELECT"
      | "RADIO"
      | "CHECKBOX"
      | "DATE"
      | "DATETIME";
    placeholder?: string;
    helpText?: string;
    layout?: {
      width?: "full" | "half" | "third" | "quarter" | "two-third";
      order?: number;
      section?: string;
    };
  };

  validation?: {
    required?: boolean;
    rules?: {
      type: "REQUIRED" | "RANGE" | "MIN" | "MAX" | "REGEX" | "REQUIRED_IF";
      params?: any;
      message: string;
      severity?: "ERROR" | "WARN";
    }[];
  };

  visibility?: {
    visible?: boolean;
    conditions?: {
      field: string;
      operator: "EQUALS" | "IN" | "GT" | "LT";
      value: any;
    }[];
  };

  permissions?: {
    read?: { roles?: string[]; users?: string[] };
    write?: { roles?: string[]; users?: string[] };
  };

  behavior?: {
    readOnly?: boolean;
    lockWhen?: { field: string; equals: any };
    formula?: {
      expression: string;
      dependencies: string[];
    };
  };

  integration?: {
    apiSource?: {
      url: string;
      method: "GET";
      params?: Record<string, any>;
      labelField: string;
      valueField: string;
      dependsOn?: string[];
    };
  };
};
