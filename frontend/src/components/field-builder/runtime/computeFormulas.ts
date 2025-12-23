import { Parser } from "expr-eval";
import { FieldConfig } from "../contracts/field-config.contract";

const parser = new Parser(); // ✅ SAFE DEFAULTS

export function computeFormulas(
  fields: FieldConfig[],
  values: Record<string, any>
): Record<string, any> {
  const next = { ...values };

  for (const field of fields) {
    const formula = field.behavior?.formula;
    if (!formula) continue;

    try {
      const expr = parser.parse(formula.expression);

      const context = Object.fromEntries(
        formula.dependencies.map((d) => [d, next[d]])
      );

      next[field.meta.key] = expr.evaluate(context);
    } catch (err) {
      console.error(
        `[FORMULA ERROR] field=${field.meta.key}`,
        err
      );
      next[field.meta.key] = null;
    }
  }

  return next;
}
