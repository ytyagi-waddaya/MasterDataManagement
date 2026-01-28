import {
  VisibilityRule,
  VisibilityCondition,
  VisibilityGroup,
  VisibilityNode,
} from "../node.types";

/* ======================================================
   CONDITION
====================================================== */

function evaluateCondition(
  condition: VisibilityCondition,
  values: Record<string, any>,
): boolean {
  const actual = values[condition.fieldKey];

  switch (condition.operator) {
    case "EQUALS":
      return actual === condition.value;

    case "NOT_EQUALS":
      return actual !== condition.value;

    case "GREATER_THAN":
      return Number(actual) > Number(condition.value);

    case "LESS_THAN":
      return Number(actual) < Number(condition.value);

    case "IN":
      return Array.isArray(condition.value)
        ? condition.value.includes(actual)
        : false;

    case "NOT_IN":
      return Array.isArray(condition.value)
        ? !condition.value.includes(actual)
        : false;

    default:
      return true;
  }
}

/* ======================================================
   GROUP (RECURSIVE)
====================================================== */

function evaluateGroup(
  group: VisibilityGroup,
  values: Record<string, any>,
): boolean {
  if (!group.conditions?.length) return true;

  const results = group.conditions.map((node: VisibilityNode) =>
    node.type === "group"
      ? evaluateGroup(node, values)
      : evaluateCondition(node, values),
  );

  return group.logic === "OR"
    ? results.some(Boolean)
    : results.every(Boolean);
}

/* ======================================================
   PUBLIC API
====================================================== */

export function evaluateVisibility(
  rule: VisibilityRule | undefined,
  values: Record<string, any>,
): boolean {
  if (!rule) return true;
  return evaluateGroup(rule, values);
}
