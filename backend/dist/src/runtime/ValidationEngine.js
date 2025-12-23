// runtime/ValidationEngine.ts
import { ConditionEvaluator } from "./ConditionEvaluator.js";
export class ValidationEngine {
    static validate(rules, ctx, // ✅ ADD CONTEXT
    values) {
        const errors = {};
        for (const rule of rules) {
            if (!rule?.fieldKey)
                continue;
            const fieldKey = rule.fieldKey;
            const value = values[fieldKey];
            const severity = rule.severity ?? "ERROR";
            const fail = (message) => {
                errors[fieldKey] ??= [];
                errors[fieldKey].push({ message, severity });
            };
            switch (rule.type) {
                case "REQUIRED":
                    if (value == null || value === "") {
                        fail(rule.errorMessage);
                    }
                    break;
                case "REQUIRED_IF": {
                    if (ConditionEvaluator.evaluate(rule.rule, ctx, values) &&
                        (value == null || value === "")) {
                        fail(rule.errorMessage);
                    }
                    break;
                }
                case "REGEX": {
                    const r = rule.rule;
                    if (typeof value === "string" &&
                        !new RegExp(r.regex).test(value)) {
                        fail(rule.errorMessage);
                    }
                    break;
                }
                case "RANGE": {
                    const r = rule.rule;
                    if (typeof value === "number" &&
                        (value < r.min || value > r.max)) {
                        fail(rule.errorMessage);
                    }
                    break;
                }
            }
        }
        return errors;
    }
}
//# sourceMappingURL=ValidationEngine.js.map