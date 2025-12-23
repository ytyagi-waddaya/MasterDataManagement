import { Condition } from "./domain.js";
import { RuntimeContext } from "./types.js";
export declare class ConditionEvaluator {
    static evaluate(condition: Condition, ctx: RuntimeContext, values: Record<string, any>): boolean;
    private static evaluateLeaf;
}
//# sourceMappingURL=ConditionEvaluator.d.ts.map