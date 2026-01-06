import { LayoutSpan } from "../contracts/editor.contract";
import { FieldConfig, FieldUI } from "../contracts/field-config.contract";
import { EditorFieldType } from "../contracts/fieldPalette.contract";

/* ======================================================
   UI WIDGET MAPPING
====================================================== */

export function mapWidget(
  type: EditorFieldType
): FieldUI["widget"] {
  switch (type) {
    /* -------- Text -------- */
    case "text":
    case "email":
    case "phone":
    case "url":
    case "password":
      return "TEXT";

    case "textarea":
    case "rich_text":
    case "json":
      return "TEXTAREA";

    /* -------- Numbers -------- */
    case "number":
    case "percentage":
      return "NUMBER";

    case "currency":
      return "CURRENCY";

    /* -------- Boolean -------- */
    case "boolean":
    case "consent":
      return "CHECKBOX";

    /* -------- Selection -------- */
    case "select":
    case "multi_select":
    case "reference":
    case "user":
    case "role":
    case "status":
      return "SELECT";

    case "radio":
      return "RADIO";

    /* -------- Date / Time -------- */
    case "date":
      return "DATE";

    case "datetime":
      return "DATETIME";

    /* -------- Files -------- */
    case "file":
    case "image":
      return "FILE";

    /* -------- Fallback -------- */
    default:
      return "TEXT";
  }
}

/* ======================================================
   DATA TYPE MAPPING (PERSISTENCE)
====================================================== */

export function mapDataType(
  type: EditorFieldType
): FieldConfig["data"]["type"] {
  switch (type) {
    case "number":
    case "currency":
    case "percentage":
      return "NUMBER";

    case "boolean":
    case "consent":
      return "BOOLEAN";

    case "date":
      return "DATE";

    case "datetime":
      return "DATETIME";

    case "json":
      return "JSON";

    /* Everything else stored as STRING */
    default:
      return "STRING";
  }
}

/* ======================================================
   LAYOUT SPAN → UI WIDTH
====================================================== */

export function mapLayoutSpan(
  layout?: { span: LayoutSpan }
): FieldUI["layout"] | undefined {
  if (!layout) return undefined;

  const map: Record<
    LayoutSpan,
    NonNullable<FieldUI["layout"]>["width"]
  > = {
    12: "full",
    8: "two-third",
    6: "half",
    4: "third",
    3: "quarter",
  };

  return { width: map[layout.span] };
}
