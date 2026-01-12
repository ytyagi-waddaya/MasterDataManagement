import {
  ConditionNode,
  ConditionGroup,
  ConditionLeaf,
} from "../contracts/condition.contract";
import { FieldMeta } from "./condition.types";

/* --------------------------------------------------
   Operator → human text
-------------------------------------------------- */
const OPERATOR_LABEL: Record<string, string> = {
  EXISTS: "is filled",
  EQUALS: "equals",
  NOT_EQUALS: "does not equal",
  GT: "greater than",
  GTE: "greater than or equal to",
  LT: "less than",
  LTE: "less than or equal to",
  IN: "is any of",
  NOT_IN: "is none of",
};

function fieldLabel(
  fieldKey: string,
  fields: readonly FieldMeta[]
) {
  return (
    fields.find((f) => f.key === fieldKey)?.label ??
    fieldKey
  );
}

/* --------------------------------------------------
   MAIN
-------------------------------------------------- */
export function conditionToSummary(
  node: ConditionNode,
  fields: readonly FieldMeta[]
): string {
  if (node.kind === "RULE") {
    const field = fieldLabel(node.field, fields);
    const op = OPERATOR_LABEL[node.operator] ?? node.operator;

    if (node.operator === "EXISTS") {
      return `${field} ${op}`;
    }

    if (node.operator === "IN" || node.operator === "NOT_IN") {
      return `${field} ${op} [${node.value.join(", ")}]`;
    }

    return `${field} ${op} ${node.value}`;
  }

  const group = node as ConditionGroup;
  const joiner =
    group.combinator === "AND" ? " AND " : " OR ";

  return group.children
    .map((c) => conditionToSummary(c, fields))
    .join(joiner);
}





// when the fields are inside the column then the field inspector is anot able to open as the column one only open