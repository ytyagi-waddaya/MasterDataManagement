import { FieldValidationRule } from "../../contracts/field-config.contract";

export function buildValidationRules(
  validation: any,
  widget: string,
  required?: boolean,
): FieldValidationRule[] {
  const rules: FieldValidationRule[] = [];

  if (required) {
    rules.push({
      type: "REQUIRED",
      message: validation?.errorMessage ?? "This field is required",
    });
  }

  if (validation?.min !== undefined) {
    rules.push({
      type: widget === "TEXT" ? "LENGTH" : "MIN",
      params: { min: validation.min },
      message: validation.errorMessage ?? `Minimum ${validation.min}`,
    });
  }

  if (validation?.max !== undefined) {
    rules.push({
      type: widget === "TEXT" ? "LENGTH" : "MAX",
      params: { max: validation.max },
      message: validation.errorMessage ?? `Maximum ${validation.max}`,
    });
  }

  if (validation?.regex) {
    rules.push({
      type: "REGEX",
      params: { regex: validation.regex },
      message: validation.patternMessage ?? "Invalid format",
    });
  }

  return rules;
}
