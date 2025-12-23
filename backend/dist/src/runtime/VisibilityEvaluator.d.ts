import { RuntimeContext } from "./types.js";
import { RuntimeVisibilityRule } from "./domain.js";
export declare class VisibilityEvaluator {
    static isVisible(rule: RuntimeVisibilityRule | undefined, ctx: RuntimeContext, values: Record<string, any>): boolean;
}
//# sourceMappingURL=VisibilityEvaluator.d.ts.map