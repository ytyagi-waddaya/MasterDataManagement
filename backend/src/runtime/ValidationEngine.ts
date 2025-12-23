// runtime/ValidationEngine.ts

import { ConditionEvaluator } from "./ConditionEvaluator.js";
import { Condition, RuntimeValidationRule } from "./domain.js";
import { RuntimeContext } from "./types.js";

export type ValidationResult = Record<
  string,
  { message: string; severity: "ERROR" | "WARNING" }[]
>;

export class ValidationEngine {
  static validate(
    rules: RuntimeValidationRule[],
    ctx: RuntimeContext,              // ✅ ADD CONTEXT
    values: Record<string, any>
  ): ValidationResult {
    const errors: ValidationResult = {};

    for (const rule of rules) {
      if (!rule?.fieldKey) continue;

      const fieldKey = rule.fieldKey;
      const value = values[fieldKey];
      const severity = rule.severity ?? "ERROR";

      const fail = (message: string) => {
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
          if (
            ConditionEvaluator.evaluate(
              rule.rule as Condition,
              ctx,
              values
            ) &&
            (value == null || value === "")
          ) {
            fail(rule.errorMessage);
          }
          break;
        }

        case "REGEX": {
          const r = rule.rule as { regex: string };
          if (
            typeof value === "string" &&
            !new RegExp(r.regex).test(value)
          ) {
            fail(rule.errorMessage);
          }
          break;
        }

        case "RANGE": {
          const r = rule.rule as { min: number; max: number };
          if (
            typeof value === "number" &&
            (value < r.min || value > r.max)
          ) {
            fail(rule.errorMessage);
          }
          break;
        }
      }
    }

    return errors;
  }
}
