import { ConditionNode } from "../../contracts/condition.contract";


function includesValue(
  list: readonly unknown[],
  value: unknown
): boolean {
  return list.includes(value as never);
}

export function evaluateConditionNode(
  node: ConditionNode,
  values: Record<string, unknown>
): boolean {
  if (node.kind === "RULE") {
    const fieldValue = values[node.field];

    switch (node.operator) {
      case "EQUALS":
        return fieldValue === node.value;

      case "NOT_EQUALS":
        return fieldValue !== node.value;

      case "IN":
        return Array.isArray(node.value)
          ? includesValue(node.value, fieldValue)
          : false;

      case "NOT_IN":
        return Array.isArray(node.value)
          ? !includesValue(node.value, fieldValue)
          : false;

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

      case "EXISTS":
        return fieldValue !== undefined && fieldValue !== null;
    }
  }

  if (node.kind === "GROUP") {
    const results = node.children.map((child) =>
      evaluateConditionNode(child, values)
    );

    return node.combinator === "AND"
      ? results.every(Boolean)
      : results.some(Boolean);
  }

  return true;
}
