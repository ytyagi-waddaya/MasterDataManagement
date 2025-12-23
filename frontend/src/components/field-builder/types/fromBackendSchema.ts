import { nanoid } from "nanoid";
import type {
  FormSection,
  DynamicField,
} from "../types/DynamicField";

function mapFieldType(type: string): DynamicField["type"] {
  switch (type) {
    case "TEXT":
      return "text";
    case "TEXTAREA":
      return "textarea";
    case "NUMBER":
      return "number";
    case "CURRENCY":
      return "currency";
    case "SELECT":
      return "select";
    case "RADIO":
      return "radio";
    case "CHECKBOX":
      return "checkbox";
    case "DATE":
      return "date";
    case "DATETIME":
      return "datetime";
    case "EMAIL":
      return "email";
    case "PHONE":
      return "phone";
    default:
      return "text"; 
  }
}


export function fromBackendSchema(
  layout: any
): FormSection[] {
  if (!layout?.sections) return [];

  return layout.sections.map((section: any) => ({
    id: nanoid(),
    title: section.title,
    order: section.order,
    collapsed: false,

    fields: (section.fields ?? []).map(
      (field: any): DynamicField => ({
        id: nanoid(),
        key: field.key,
        label: field.label,
        type: mapFieldType(field.fieldType),
        order: field.order,

        required: field.required,
        layout: field.config?.layout,
        placeholder: field.config?.placeholder,
        options: field.config?.options,

        showInList: field.config?.showInList,
      })
    ),
  }));
}
