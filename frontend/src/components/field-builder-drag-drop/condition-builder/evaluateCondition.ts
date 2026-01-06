import { ConditionNode } from "../contracts/condition.contract";

export function evaluateCondition(
  node: ConditionNode,
  values: Record<string, any>
): boolean {
  if (node.kind === "RULE") {
    const v = values[node.field];

    switch (node.operator) {
      case "EXISTS":
        return v !== undefined && v !== null && v !== "";

      case "EQUALS":
        return v === node.value;

      case "NOT_EQUALS":
        return v !== node.value;

      case "GT":
        return v > node.value;

      case "GTE":
        return v >= node.value;

      case "LT":
        return v < node.value;

      case "LTE":
        return v <= node.value;

      case "IN":
        return Array.isArray(node.value) && node.value.includes(v);

      case "NOT_IN":
        return Array.isArray(node.value) && !node.value.includes(v);

      default:
        return false;
    }
  }

  // GROUP
  if (node.combinator === "AND") {
    return node.children.every(c => evaluateCondition(c, values));
  }

  return node.children.some(c => evaluateCondition(c, values));
}
