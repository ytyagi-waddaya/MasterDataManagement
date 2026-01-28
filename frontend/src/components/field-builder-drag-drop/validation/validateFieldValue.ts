import { RuntimeField } from "../contracts/runtime.contract";

export function validateRuntimeField(
  field: RuntimeField,
  allValues: Record<string, any>
): string[] {
  const errors: string[] = [];
  const value = field.state.value;
  const rules = field.config.validation?.rules ?? [];

  for (const rule of rules) {
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
        if (typeof value === "number" && rule.params && "min" in rule.params) {
          if (value < rule.params.min) errors.push(rule.message);
        }
        break;
      }

      case "MAX": {
        if (typeof value === "number" && rule.params && "max" in rule.params) {
          if (value > rule.params.max) errors.push(rule.message);
        }
        break;
      }

      case "LENGTH": {
        if (
          (typeof value === "string" || Array.isArray(value)) &&
          rule.params &&
          "min" in rule.params &&
          "max" in rule.params
        ) {
          if (value.length < rule.params.min || value.length > rule.params.max) {
            errors.push(rule.message);
          }
        }
        break;
      }

      case "REGEX": {
        if (typeof value === "string" && rule.params && "regex" in rule.params) {
          const regex = new RegExp(rule.params.regex);
          if (!regex.test(value)) errors.push(rule.message);
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
        // server/plugin handled
        break;
      }
    }
  }

  return errors;
}
