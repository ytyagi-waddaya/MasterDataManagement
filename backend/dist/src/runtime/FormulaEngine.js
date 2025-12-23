// runtime/FormulaEngine.ts
import { Parser } from "expr-eval";
/**
 * Safe expression parser
 * - No access to globals
 * - No loops
 * - Only whitelisted operators
 */
const parser = new Parser({
    operators: {
        logical: true,
        comparison: true,
        add: true,
        subtract: true,
        multiply: true,
        divide: true,
    },
});
export class FormulaEngine {
    /**
     * Execute formulas in dependency-safe order
     */
    static execute(formulas, values) {
        if (!formulas.length)
            return;
        const ordered = this.topologicalSort(formulas);
        for (const f of ordered) {
            try {
                values[f.fieldKey] = parser.evaluate(f.expression, values);
            }
            catch (err) {
                // Fail-safe: formula errors should not crash runtime
                values[f.fieldKey] = null;
            }
        }
    }
    /**
     * Topological sort with cycle detection
     * Throws on circular dependencies
     */
    static topologicalSort(formulas) {
        const result = [];
        const visited = new Set();
        const visiting = new Set();
        const formulaMap = new Map(formulas.map(f => [f.fieldKey, f]));
        const visit = (formula) => {
            const key = formula.fieldKey;
            // 🔴 Cycle detected
            if (visiting.has(key)) {
                throw new Error(`Circular formula dependency detected at field "${key}"`);
            }
            if (visited.has(key))
                return;
            visiting.add(key);
            for (const depKey of formula.dependencies ?? []) {
                const depFormula = formulaMap.get(depKey);
                if (depFormula) {
                    visit(depFormula);
                }
            }
            visiting.delete(key);
            visited.add(key);
            result.push(formula);
        };
        for (const formula of formulas) {
            visit(formula);
        }
        return result;
    }
}
//# sourceMappingURL=FormulaEngine.js.map