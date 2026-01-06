import { RuntimeField } from "../contracts/runtime.contract";
import { evaluateConditionNode } from "../runtime/conditions/evaluateCondition";

/* ======================================================
   FIELD VALIDATION
====================================================== */

export function validateRuntimeField(
  field: RuntimeField,
  allValues: Record<string, any>
): string[] {
  const errors: string[] = [];
  const value = field.state.value;
  const rules = field.config.validation?.rules ?? [];

  for (const rule of rules) {
    /* ---------- Conditional validation ---------- */
    if (rule.when) {
      const applies = evaluateConditionNode(rule.when, allValues);
      if (!applies) continue;
    }

    switch (rule.type) {
      case "REQUIRED": {
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          errors.push(rule.message);
        }
        break;
      }

      case "MIN": {
        if (value === undefined || value === null) break;

        if (rule.params.appliesTo === "length") {
          if (typeof value === "string" || Array.isArray(value)) {
            if (value.length < rule.params.value) {
              errors.push(rule.message);
            }
          }
        } else if (typeof value === "number") {
          if (value < rule.params.value) {
            errors.push(rule.message);
          }
        }
        break;
      }

      case "MAX": {
        if (value === undefined || value === null) break;

        if (rule.params.appliesTo === "length") {
          if (typeof value === "string" || Array.isArray(value)) {
            if (value.length > rule.params.value) {
              errors.push(rule.message);
            }
          }
        } else if (typeof value === "number") {
          if (value > rule.params.value) {
            errors.push(rule.message);
          }
        }
        break;
      }

      case "BETWEEN": {
        if (typeof value === "number") {
          if (value < rule.params.min || value > rule.params.max) {
            errors.push(rule.message);
          }
        }
        break;
      }

      case "REGEX": {
        if (typeof value === "string") {
          const regex = new RegExp(rule.params.pattern);
          if (!regex.test(value)) {
            errors.push(rule.message);
          }
        }
        break;
      }

      case "EMAIL": {
        if (
          typeof value === "string" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          errors.push(rule.message);
        }
        break;
      }

      case "CUSTOM": {
        // Reserved for server / plugin based validators
        break;
      }
    }
  }

  return errors;
}
