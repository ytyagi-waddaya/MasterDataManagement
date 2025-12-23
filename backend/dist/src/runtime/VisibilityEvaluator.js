import { ConditionEvaluator } from "./ConditionEvaluator.js";
export class VisibilityEvaluator {
    static isVisible(rule, ctx, values) {
        if (!rule)
            return true;
        if (rule.visible === false)
            return false;
        if (!rule.conditions)
            return true;
        return ConditionEvaluator.evaluate(rule.conditions, ctx, values);
    }
}
//# sourceMappingURL=VisibilityEvaluator.js.map