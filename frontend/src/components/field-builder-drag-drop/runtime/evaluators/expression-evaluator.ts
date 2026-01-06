
/* ======================================================
   SAFE EXPRESSION EVALUATOR
====================================================== */

import { ExpressionRule } from "../../contracts/rules.contract";

const SAFE_GLOBALS = {
  Math,
  Number,
  String,
  Boolean,
  Date,
};

export function evaluateExpression(
  rule: ExpressionRule,
  values: Record<string, any>
): boolean {
  try {
    const fn = new Function(
      "values",
      "globals",
      `
      "use strict";
      const { Math, Number, String, Boolean, Date } = globals;
      return Boolean(${rule.expression});
      `
    );

    return fn(values, SAFE_GLOBALS);
  } catch (err) {
    console.error("Expression error:", err);
    return false;
  }
}
