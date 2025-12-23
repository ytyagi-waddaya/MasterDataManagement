import { RuntimeFormula } from "./domain.js";
export declare class FormulaEngine {
    /**
     * Execute formulas in dependency-safe order
     */
    static execute(formulas: RuntimeFormula[], values: Record<string, any>): void;
    /**
     * Topological sort with cycle detection
     * Throws on circular dependencies
     */
    private static topologicalSort;
}
//# sourceMappingURL=FormulaEngine.d.ts.map