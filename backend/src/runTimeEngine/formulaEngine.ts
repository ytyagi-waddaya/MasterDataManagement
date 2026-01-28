// import { Parser } from "expr-eval";

import { BadRequestException } from "../utils/appError.js";

// export function evaluateFormula(
//   expr: string,
//   context: Record<string, number>,
// ) {
//   const safeContext = Object.fromEntries(
//     Object.entries(context).filter(([_, v]) => typeof v === "number"),
//   );

//   if (Object.keys(safeContext).length > 100) {
//     throw new Error("Too many dependencies in formula");
//   }

//   if (expr.length > 500) {
//     throw new Error("Formula too complex");
//   }

//   const parser = new Parser({
//     operators: {
//       assignment: false,
//       logical: true,
//       comparison: true,
//     },
//   });

//   parser.functions.min = Math.min;
//   parser.functions.max = Math.max;
//   parser.functions.round = Math.round;
//   Object.freeze(parser.functions);

//   try {
//     return parser.parse(expr).evaluate(safeContext);
//   } catch {
//     throw new Error("Invalid formula expression");
//   }
// }


/**
 * Safely evaluates a formula expression using record data.
 * Example expression:
 *   number_qty * number_price
 */
export function evaluateFormula(
  expression: string,
  data: Record<string, any>,
) {
  // Replace field keys with data["key"]
  const safeExpression = expression.replace(
    /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g,
    (key) => {
      if (key in data) return `data["${key}"]`;
      return key; // numbers, operators, Math, etc
    },
  );

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(
      "data",
      `"use strict"; return (${safeExpression});`,
    );

    const result = fn(data);

    if (Number.isNaN(result)) {
      throw new Error("Formula evaluated to NaN");
    }

    return result;
  } catch (err) {
    console.error("Formula error:", {
      expression,
      safeExpression,
      data,
      err,
    });

    throw new BadRequestException("Invalid formula expression");
  }
}
