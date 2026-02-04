import {
  VisibilityRule,
  VisibilityNode,
  VisibilityCondition,
} from "../node.types";

/* ================= OPERATOR TEXT ================= */

const OP_TEXT: Record<string, string> = {
  EQUALS: "is",
  NOT_EQUALS: "is not",
  GREATER_THAN: "is greater than",
  LESS_THAN: "is less than",
  IN: "is one of",
  NOT_IN: "is not one of",
};

/* ================= CONDITION ================= */

function formatCondition(
  condition: VisibilityCondition,
  fieldLabelMap: Record<string, string>,
): string {
   const key = condition.fieldKey ?? "";
  // const fieldLabel =
  //   fieldLabelMap[condition.fieldKey] ?? condition.fieldKey;
    const fieldLabel = fieldLabelMap[key] ?? key;

  // const value = Array.isArray(condition.value)
  //   ? condition.value.join(", ")
  //   : String(condition.value);

  // return `${fieldLabel} ${OP_TEXT[condition.operator]} ${value}`;
  
  const value = Array.isArray(condition.value)
    ? condition.value.join(", ")
    : String(condition.value);

  return `${fieldLabel} ${OP_TEXT[condition.operator]} ${value}`;
}

/* ================= NODE (RECURSIVE) ================= */

function formatNode(
  node: VisibilityNode,
  fieldLabelMap: Record<string, string>,
): string {
  if (node.type === "condition") {
    return formatCondition(node, fieldLabelMap);
  }

  const joiner = node.logic === "OR" ? " OR " : " AND ";

  const parts = node.conditions
    ?.map((c) => formatNode(c, fieldLabelMap))
    .filter(Boolean);

  if (!parts?.length) return "";

  return parts?.length > 1
    ? `(${parts.join(joiner)})`
    : parts[0];
}

/* ================= PUBLIC API ================= */

export function formatVisibilityRule(
  rule: VisibilityRule | undefined,
  fieldConfigs: any[],
): string {
  if (!rule) return "Always visible";

  const fieldLabelMap = Object.fromEntries(
    fieldConfigs.map((f) => [f.meta.key, f.meta.label]),
  );

  const text = formatNode(rule, fieldLabelMap);

  return text ? `Visible when ${text}` : "Always visible";
}
