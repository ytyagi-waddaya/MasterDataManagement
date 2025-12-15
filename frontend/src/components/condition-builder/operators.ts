export const OPERATORS = [
  // Basic compare
  "=", "!=", ">", "<", ">=", "<=",

  // Lists
  "in", "not in", "array-contains", "array-not-contains",
  "subsetOf", "supersetOf", "intersects",

  // Strings
  "contains", "not contains",
  "startsWith", "endsWith",
  "iContains", "iStartsWith", "iEndsWith",
  "matches", // regex

  // Dates
  "before", "after", "between", "betweenInclusive",

  // Boolean / existence
  "isTrue", "isFalse", "exists", "notExists",
] as const;

export type Operator = (typeof OPERATORS)[number];
