import { ConditionNode, ConditionLeaf } from "../contracts/condition.contract";

/* ======================================================
   PUBLIC API
====================================================== */

/**
 * Evaluates a condition tree against runtime values
 */
export function evaluateCondition(
  node: ConditionNode,
  values: Record<string, any>
): boolean {
  if (node.kind === "RULE") {
    return evaluateRule(node, values);
  }

  if (node.combinator === "AND") {
    return node.children.every((child) =>
      evaluateCondition(child, values)
    );
  }

  if (node.combinator === "OR") {
    return node.children.some((child) =>
      evaluateCondition(child, values)
    );
  }

  return false;
}

/* ======================================================
   RULE EVALUATION
====================================================== */

function evaluateRule(
  rule: ConditionLeaf,
  values: Record<string, any>
): boolean {
  const fieldValue = values[rule.field];

  switch (rule.operator) {
    case "EXISTS":
      return isPresent(fieldValue);

    case "EQUALS":
      return fieldValue === rule.value;

    case "NOT_EQUALS":
      return fieldValue !== rule.value;

    case "GT":
      return compare(fieldValue, rule.value, (a, b) => a > b);

    case "GTE":
      return compare(fieldValue, rule.value, (a, b) => a >= b);

    case "LT":
      return compare(fieldValue, rule.value, (a, b) => a < b);

    case "LTE":
      return compare(fieldValue, rule.value, (a, b) => a <= b);

    case "IN":
      return (
        Array.isArray(rule.value) &&
        rule.value.includes(fieldValue)
      );

    case "NOT_IN":
      return (
        Array.isArray(rule.value) &&
        !rule.value.includes(fieldValue)
      );

    default:
      return false;
  }
}

/* ======================================================
   HELPERS
====================================================== */

/**
 * Checks whether a value is considered "present"
 */
function isPresent(value: any): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Safe comparison helper (number / date)
 */
function compare(
  left: any,
  right: any,
  fn: (a: number, b: number) => boolean
): boolean {
  const a = normalizeComparable(left);
  const b = normalizeComparable(right);

  if (a === null || b === null) return false;
  return fn(a, b);
}

/**
 * Converts values into comparable numbers
 * - number → number
 * - date string → timestamp
 */
function normalizeComparable(value: any): number | null {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const date = Date.parse(value);
    if (!Number.isNaN(date)) return date;
  }

  return null;
}


// ✅ Example Usage
// import { evaluateCondition } from "./condition-evaluator";

// const condition = {
//   kind: "GROUP",
//   combinator: "AND",
//   children: [
//     {
//       kind: "RULE",
//       id: "r1",
//       field: "age",
//       operator: "GT",
//       value: 18,
//     },
//     {
//       kind: "RULE",
//       id: "r2",
//       field: "country",
//       operator: "IN",
//       value: ["IN", "US"],
//     },
//   ],
// };

// const values = {
//   age: 21,
//   country: "IN",
// };

// evaluateCondition(condition, values); // ✅ true

// ✅ Where You’ll Use This
// Field visibility
// field.visible =
//   field.visibility?.rule
//     ? evaluateCondition(field.visibility.rule.condition, values)
//     : field.visibility?.defaultVisible ?? true;

// Conditional validation
// if (rule.when && evaluateCondition(rule.when, values)) {
//   runValidation();
// }

// Workflow / approvals
// if (evaluateCondition(approvalRule, ticketData)) {
//   requireApproval();
// }