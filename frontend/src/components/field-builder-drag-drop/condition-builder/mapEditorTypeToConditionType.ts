import { EditorFieldType } from "../contracts/fieldPalette.contract";
import { FieldDataType } from "./condition-ui.schema";

export function mapEditorTypeToFieldDataType(
  type: EditorFieldType
): FieldDataType {
  switch (type) {
    case "text":
    case "email":
    case "password":
    case "textarea":
    case "select":
    case "radio":
      return "STRING";

    case "number":
    case "currency":
    case "percentage":
      return "NUMBER";

    case "boolean":
      return "BOOLEAN";

    case "date":
      return "DATE";

    case "datetime":
      return "DATETIME";

    default:
      return "STRING"; // 🔥 VERY IMPORTANT FALLBACK
  }
}
