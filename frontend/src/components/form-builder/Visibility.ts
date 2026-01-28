import {
  VisibilityRule,
  VisibilityCondition,
  VisibilityGroup,
} from "./node.types";

/* ======================================================
   CONDITION EVALUATOR
====================================================== */

function evalCondition(
  condition: VisibilityCondition,
  values: Record<string, any>,
): boolean {
  const fieldValue = values[condition.fieldKey];

  switch (condition.operator) {
    case "EQUALS":
      return fieldValue === condition.value;

    case "NOT_EQUALS":
      return fieldValue !== condition.value;

    case "GREATER_THAN":
      return fieldValue > condition.value;

    case "LESS_THAN":
      return fieldValue < condition.value;

    case "IN":
      return Array.isArray(condition.value)
        ? condition.value.includes(fieldValue)
        : false;

    case "NOT_IN":
      return Array.isArray(condition.value)
        ? !condition.value.includes(fieldValue)
        : false;

    default:
      return true;
  }
}

/* ======================================================
   GROUP (RECURSIVE)
====================================================== */

function evalGroup(
  group: VisibilityGroup,
  values: Record<string, any>,
): boolean {
  if (!group.conditions.length) return true;

  const logic = group.logic ?? "AND";

  const results = group.conditions.map((item) => {
    // 👇 recursion happens here
    if ("conditions" in item) {
      return evalGroup(item, values);
    }

    return evalCondition(item, values);
  });

  return logic === "AND"
    ? results.every(Boolean)
    : results.some(Boolean);
}

/* ======================================================
   PUBLIC API
====================================================== */

export function isVisible(
  rule: VisibilityRule | undefined,
  values: Record<string, any>,
): boolean {
  if (!rule) return true;
  return evalGroup(rule, values);
}
