import { ConditionGroup, ConditionLeaf, ConditionNode } from "../../contracts/rules.contract";


export function evaluateConditionTree(
  node: ConditionNode,
  values: Record<string, any>
): boolean {
  if (node.kind === "GROUP") {
    return evaluateGroup(node, values);
  }

  return evaluateLeaf(node, values);
}

/* ======================================================
   GROUP
====================================================== */

function evaluateGroup(
  group: ConditionGroup,
  values: Record<string, any>
): boolean {
  if (group.children.length === 0) return true;

  return group.combinator === "AND"
    ? group.children.every((c) =>
        evaluateConditionTree(c, values)
      )
    : group.children.some((c) =>
        evaluateConditionTree(c, values)
      );
}

/* ======================================================
   LEAF
====================================================== */

function evaluateLeaf(
  rule: ConditionLeaf,
  values: Record<string, any>
): boolean {
  const fieldValue = values[rule.field];

  switch (rule.operator) {
    case "EXISTS":
      return fieldValue !== undefined && fieldValue !== null;

    case "EQUALS":
      return fieldValue === rule.value;

    case "NOT_EQUALS":
      return fieldValue !== rule.value;

    case "IN":
      return Array.isArray(rule.value)
        ? rule.value.includes(fieldValue)
        : false;

    case "NOT_IN":
      return Array.isArray(rule.value)
        ? !rule.value.includes(fieldValue)
        : false;

    case "GT":
      return Number(fieldValue) > Number(rule.value);

    case "GTE":
      return Number(fieldValue) >= Number(rule.value);

    case "LT":
      return Number(fieldValue) < Number(rule.value);

    case "LTE":
      return Number(fieldValue) <= Number(rule.value);

    default:
      return false;
  }
}
