// components/fieldBuilder/types.ts
export type FieldType =
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

export interface FieldOption {
  label: string;
  value: string;
}

export interface DynamicField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string | null;
  defaultValue?: any;
  order: number;
  key: string;
  showInList: boolean;

  layout?: "full" | "half" | "third" | "quarter" | "two-third";

  min?: number | null;
  max?: number | null;

  options?: FieldOption[];

  // conditional visibility: show this field only when another field has a specific value
  visibleIf?: {
    fieldId: string | null;
    value: any;
  } | null;

  permissions?: {
    read?: string[];
    write?: string[];
  };
}

export interface FormSection {
  id: string;
  title: string;
  order: number;
  fields: DynamicField[];
  collapsed?: boolean;
}
