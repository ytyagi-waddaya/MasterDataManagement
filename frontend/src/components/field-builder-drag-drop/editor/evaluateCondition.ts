import { ConditionNode } from "../contracts/condition.contract";

export function evaluateCondition(
  node: ConditionNode,
  values: Record<string, unknown>
): boolean {
  if (node.kind === "RULE") {
    const fieldValue = values[node.field];

    switch (node.operator) {
      case "EXISTS":
        return fieldValue !== undefined && fieldValue !== null;

      case "EQUALS":
        return fieldValue === node.value;

      case "NOT_EQUALS":
        return fieldValue !== node.value;

      case "GT":
        return (
          typeof fieldValue === "number" &&
          typeof node.value === "number" &&
          fieldValue > node.value
        );

      case "GTE":
        return (
          typeof fieldValue === "number" &&
          typeof node.value === "number" &&
          fieldValue >= node.value
        );

      case "LT":
        return (
          typeof fieldValue === "number" &&
          typeof node.value === "number" &&
          fieldValue < node.value
        );

      case "LTE":
        return (
          typeof fieldValue === "number" &&
          typeof node.value === "number" &&
          fieldValue <= node.value
        );

      case "IN":
        if (!Array.isArray(node.value)) return false;
        return node.value.some((v) => v === fieldValue);

      case "NOT_IN":
        if (!Array.isArray(node.value)) return false;
        return !node.value.some((v) => v === fieldValue);

      default:
        return true;
    }
  }

  // GROUP
  const results = node.children.map((c) =>
    evaluateCondition(c, values)
  );

  return node.combinator === "AND"
    ? results.every(Boolean)
    : results.some(Boolean);
}
