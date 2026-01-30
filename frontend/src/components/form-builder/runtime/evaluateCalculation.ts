// type CalculationConfig = {
//   operator: "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE";
//   operands: string[];
// };

// export function evaluateCalculation(
//   calc: CalculationConfig,
//   values: Record<string, any>,
// ): number | undefined {
//   const nums = calc.operands
//     ?.map((k) => Number(values[k]))
//     .filter((v) => !isNaN(v));

//   if (!nums?.length) return undefined;

//   switch (calc.operator) {
//     case "ADD":
//       return nums.reduce((a, b) => a + b, 0);

//     case "SUBTRACT":
//       return nums.reduce((a, b) => a - b);

//     case "MULTIPLY":
//       return nums.reduce((a, b) => a * b, 1);

//     case "DIVIDE":
//       return nums.reduce((a, b) => a / b);

//     default:
//       return undefined;
//   }
// }

// export type CalculationConfig = {
//   expression: string;
//   dependencies: string[];
// };

// export function evaluateCalculation(
//   calc: CalculationConfig,
//   values: Record<string, any>,
// ): number | undefined {
//   try {
//     // Build local scope only with dependencies
//     const scope: Record<string, number> = {};

//     for (const key of calc.dependencies) {
//       const val = Number(values[key]);
//       scope[key] = isNaN(val) ? 0 : val;
//     }

//     // Replace variables in expression with scope values
//     let expr = calc.expression;

//     for (const [k, v] of Object.entries(scope)) {
//       const safeKey = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//       expr = expr.replace(new RegExp(`\\b${safeKey}\\b`, "g"), String(v));
//     }

//     // Safe math-only evaluation
//     // Allowed chars: numbers, + - * / ( ) . space
//     if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
//       throw new Error("Unsafe expression");
//     }

//     // eslint-disable-next-line no-new-func
//     const result = Function(`"use strict"; return (${expr})`)();

//     return typeof result === "number" && !isNaN(result) ? result : undefined;
//   } catch {
//     return undefined;
//   }
// }

import { create, all } from "mathjs";

/* ================= SAFE MATH INSTANCE ================= */
/**
 * IMPORTANT:
 * create() must receive `all` first, not a partial object
 */
const math = create(all, {
  number: "number",
  precision: 14,
});

/* ================= CUSTOM FUNCTIONS ================= */

math.import(
  {
    IF: (cond: boolean, a: any, b: any) => (cond ? a : b),
  },
  { override: true },
);

/* ================= TYPES ================= */

export type CalculationConfig = {
  expression: string;
  dependencies: string[];
};

/* ================= EVALUATOR ================= */

export function evaluateCalculation(
  calc: CalculationConfig,
  values: Record<string, any>,
): number | undefined {
  try {
    const scope: Record<string, number | boolean> = {};

    // only expose dependencies
    for (const dep of calc.dependencies) {
      const v = values[dep];
      scope[dep] =
        typeof v === "boolean" ? v : Number(v) || 0;
    }

    const result = math.evaluate(calc.expression, scope);

    // normalize result
    if (typeof result === "boolean") {
      return result ? 1 : 0;
    }

    if (typeof result === "number" && !isNaN(result)) {
      return result;
    }

    return undefined;
  } catch (err) {
    console.warn("Calculation error:", err);
    return undefined;
  }
}  
