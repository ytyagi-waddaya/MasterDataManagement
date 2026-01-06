
import { VisibilityRule } from "../../contracts/rules.contract";
import { evaluateConditionTree } from "./condition-evaluator";
import { evaluateExpression } from "./expression-evaluator";

export function evaluateVisibility(
  rule: VisibilityRule,
  values: Record<string, any>
): boolean {
  if (rule.type === "CONDITION") {
    return evaluateConditionTree(rule.condition, values);
  }

  return evaluateExpression(rule.expression, values);
}
