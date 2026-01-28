// condition-builder/editor-to-data-type.mapper.ts

import { EditorFieldType } from "../contracts/fieldPalette.contract";
import { FieldDataType } from "./condition-ui.schema";

export function mapEditorToFieldDataType(
  type: EditorFieldType
): FieldDataType {
  switch (type) {
    /* ---------- STRING ---------- */
    case "text":
    case "textarea":
    case "rich_text":
    case "email":
    case "phone":
    case "url":
    case "password":
    case "select":
    case "multi_select":
    case "radio":
    case "status":
    case "reference":
    case "multi_reference":
    case "user":
    case "role":
      return "STRING";

    /* ---------- NUMBER ---------- */
    case "number":
    case "currency":
    case "percentage":
    case "rating":
    case "scale":
      return "NUMBER";

    /* ---------- BOOLEAN ---------- */
    case "boolean":
    case "consent":
      return "BOOLEAN";

    /* ---------- DATE ---------- */
    case "date":
    case "datetime":
      return "DATE";

    /* ---------- NON-COMPARABLE ---------- */
    case "file":
    case "image":
    case "json":
    case "matrix":
    case "checklist":
    case "captcha":
    case "approval":
      return "STRING"; // 👈 downgrade intentionally

    default:
      return "STRING";
  }
}
