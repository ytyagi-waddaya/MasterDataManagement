// import {
//   VisibilityRule,
//   VisibilityCondition,
//   VisibilityGroup,
//   VisibilityNode,
// } from "../node.types";

// /* ======================================================
//    CONDITION
// ====================================================== */

// function evaluateCondition(
//   condition: VisibilityCondition,
//   values: Record<string, any>,
// ): boolean {
//   const actual = values[condition.fieldKey];

//   switch (condition.operator) {
//     case "EQUALS":
//       return actual === condition.value;

//     case "NOT_EQUALS":
//       return actual !== condition.value;

//     case "GREATER_THAN":
//       return Number(actual) > Number(condition.value);

//     case "LESS_THAN":
//       return Number(actual) < Number(condition.value);

//     case "IN":
//       return Array.isArray(condition.value)
//         ? condition.value.includes(actual)
//         : false;

//     case "NOT_IN":
//       return Array.isArray(condition.value)
//         ? !condition.value.includes(actual)
//         : false;

//     default:
//       return true;
//   }
// }

// /* ======================================================
//    GROUP (RECURSIVE)
// ====================================================== */

// function evaluateGroup(
//   group: VisibilityGroup,
//   values: Record<string, any>,
// ): boolean {
//   if (!group.conditions?.length) return true;

//   const results = group.conditions.map((node: VisibilityNode) =>
//     node.type === "group"
//       ? evaluateGroup(node, values)
//       : evaluateCondition(node, values),
//   );

//   return group.logic === "OR"
//     ? results.some(Boolean)
//     : results.every(Boolean);
// }

// /* ======================================================
//    PUBLIC API
// ====================================================== */

// export function evaluateVisibility(
//   rule: VisibilityRule | undefined,
//   values: Record<string, any>,
// ): boolean {
//   if (!rule) return true;
//   return evaluateGroup(rule, values);
// }

import {
  VisibilityRule,
  VisibilityCondition,
  VisibilityGroup,
  VisibilityNode,
} from "../node.types";

/* ======================================================
   CONDITION
====================================================== */

function evaluateCondition(
  condition: VisibilityCondition,
  values: Record<string, any>,
): boolean {
  if (!condition.fieldKey) return true;

  const actual = values[condition.fieldKey];

  switch (condition.operator) {
    case "EQUAL":
      return actual === condition.value;

    case "NOT_EQUAL":
      return actual !== condition.value;

    case "GREATER_THAN":
      return Number(actual) > Number(condition.value);

    case "LESS_THAN":
      return Number(actual) < Number(condition.value);

    case "GREATER_THAN_EQUAL":
      return Number(actual) >= Number(condition.value);

    case "LESS_THAN_EQUAL":
      return Number(actual) <= Number(condition.value);

    // case "IN":
    //   return Array.isArray(condition.value)
    //     ? condition.value.includes(actual)
    //     : false;

    // case "NOT_IN":
    //   return Array.isArray(condition.value)
    //     ? !condition.value.includes(actual)
    //     : false;

    case "IN": {
      const list = Array.isArray(condition.value)
        ? condition.value
        : String(condition.value)
            .split(",")
            .map((v) => v.trim());

      return list.includes(actual);
    }

    case "NOT_IN": {
      const list = Array.isArray(condition.value)
        ? condition.value
        : String(condition.value)
            .split(",")
            .map((v) => v.trim());

      return !list.includes(actual);
    }

    default:
      // fail-safe: don't hide field due to unknown operator
      return true;
  }
}

/* ======================================================
   GROUP (RECURSIVE)
====================================================== */

function evaluateGroup(
  group: VisibilityGroup,
  values: Record<string, any>,
): boolean {
  if (!group.conditions || group.conditions.length === 0) return true;

  const results = group.conditions.map((node: VisibilityNode) =>
    node.type === "group"
      ? evaluateGroup(node, values)
      : evaluateCondition(node, values),
  );

  return group.logic === "OR" ? results.some(Boolean) : results.every(Boolean);
}

/* ======================================================
   PUBLIC API
====================================================== */

export function evaluateVisibility(
  rule: VisibilityRule | undefined,
  values: Record<string, any>,
): boolean {
  if (!rule) return true;
  return evaluateGroup(rule, values);
}
