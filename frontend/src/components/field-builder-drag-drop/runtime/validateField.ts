// src/validation/validateField.ts

import { RuntimeField } from "../contracts/runtime.contract";
import { FieldValidationRule } from "../contracts/field-config.contract";

export function validateField(
  field: RuntimeField,
  value: any
): string[] {
  const errors: string[] = [];

  const rules = field.config.validation?.rules;
  if (!rules || rules.length === 0) return errors;

  for (const rule of rules) {
    switch (rule.type) {
      case "REQUIRED": {
        const isEmpty =
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) errors.push(rule.message);
        break;
      }

      case "MIN": {
        if (value === undefined || value === null || value === "") break;

        const appliesTo = rule.params.appliesTo ?? "value";
        if (appliesTo === "length") {
          if (String(value).length < rule.params.value)
            errors.push(rule.message);
        } else {
          const num = Number(value);
          if (!isNaN(num) && num < rule.params.value)
            errors.push(rule.message);
        }
        break;
      }

      case "MAX": {
        if (value === undefined || value === null || value === "") break;

        const appliesTo = rule.params.appliesTo ?? "value";
        if (appliesTo === "length") {
          if (String(value).length > rule.params.value)
            errors.push(rule.message);
        } else {
          const num = Number(value);
          if (!isNaN(num) && num > rule.params.value)
            errors.push(rule.message);
        }
        break;
      }

      case "REGEX": {
        if (value === undefined || value === null || value === "") break;

        try {
          const re = new RegExp(rule.params.pattern);
          if (!re.test(String(value)))
            errors.push(rule.message);
        } catch {}
        break;
      }

      default:
        break;
    }
  }

  return errors;
}
