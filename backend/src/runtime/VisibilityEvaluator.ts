// runtime/VisibilityEvaluator.ts
import { RuntimeContext } from "./types.js";
import { RuntimeVisibilityRule } from "./domain.js";
import { ConditionEvaluator } from "./ConditionEvaluator.js";

export class VisibilityEvaluator {
  static isVisible(
    rule: RuntimeVisibilityRule | undefined,
    ctx: RuntimeContext,
    values: Record<string, any>
  ): boolean {
    if (!rule) return true;
    if (rule.visible === false) return false;
    if (!rule.conditions) return true;
    return ConditionEvaluator.evaluate(
      rule.conditions,
      ctx,
      values
    );
  }
}
