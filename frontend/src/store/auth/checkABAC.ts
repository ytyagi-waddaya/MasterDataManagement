// src/lib/auth-kit/checkABAC.ts
/**
 * Frontend ABAC evaluator — mirrors backend logic.
 * Safe, deterministic, no eval.
 *
 * ABAC group shape expected:
 * { op: 'AND' | 'OR', rules: [ { field, operator, value } | group ] }
 *
 * Supported operators:
 * =, !=, >, <, >=, <=,
 * in, not in,
 * contains, not contains, iContains,
 * startsWith, endsWith,
 * exists, notExists,
 * array-contains, array-not-contains, subsetOf, supersetOf, intersects,
 * before, after, between,
 * matches
 */

export function checkABAC(node: any, context: any): boolean {
  if (!node) return false;
  // If leaf rule (has field)
  if (node.field) return evaluateRule(node, context);

  // Group
  const op = (node.op || "AND").toUpperCase();
  const rules = Array.isArray(node.rules) ? node.rules : [];

  if (op === "AND") return rules.every((r: any) => checkABAC(r, context));
  return rules.some((r: any) => checkABAC(r, context));
}

function evaluateRule(rule: any, ctx: any): boolean {
  const left = resolvePath(rule.field, ctx);
  const operator = (rule.operator || "").toString();
  const right = rule.value;
  return runOperator(operator, left, right);
}

function resolvePath(path: string, ctx: any): any {
  if (!path) return undefined;
  const parts = path.split(".");
  const roots = ["resource", "body", "query", "params", "user", "actor", "now"];
  for (const root of roots) {
    let cur = ctx[root];
    if (cur === undefined || cur === null) continue;
    let ok = true;
    for (const p of parts) {
      if (cur && Object.prototype.hasOwnProperty.call(cur, p)) {
        cur = cur[p];
      } else {
        ok = false;
        break;
      }
    }
    if (ok) return cur;
  }
  return undefined;
}

function runOperator(op: string, left: any, right: any): boolean {
  op = op.trim();
  switch (op) {
    case "=":
    case "==":
      return left === right;
    case "!=":
    case "<>":
      return left !== right;
    case ">":
      return compareNumbers(left, right) > 0;
    case "<":
      return compareNumbers(left, right) < 0;
    case ">=":
      return compareNumbers(left, right) >= 0;
    case "<=":
      return compareNumbers(left, right) <= 0;
    case "in":
      return Array.isArray(right) ? right.includes(left) : String(right).split(",").map(s => s.trim()).includes(String(left));
    case "not in":
      return Array.isArray(right) ? !right.includes(left) : !String(right).split(",").map(s => s.trim()).includes(String(left));
    case "contains":
      if (typeof left === "string" && typeof right === "string") return left.includes(right);
      if (Array.isArray(left)) return left.includes(right);
      return false;
    case "not contains":
      if (typeof left === "string" && typeof right === "string") return !left.includes(right);
      if (Array.isArray(left)) return !left.includes(right);
      return false;
    case "iContains":
      return typeof left === "string" && typeof right === "string" && left.toLowerCase().includes(right.toLowerCase());
    case "startsWith":
      return typeof left === "string" && typeof right === "string" && left.startsWith(right);
    case "endsWith":
      return typeof left === "string" && typeof right === "string" && left.endsWith(right);
    case "exists":
      return left !== undefined && left !== null;
    case "notExists":
      return left === undefined || left === null;
    case "array-contains":
      return Array.isArray(left) && left.includes(right);
    case "array-not-contains":
      return Array.isArray(left) && !left.includes(right);
    case "subsetOf":
      return Array.isArray(left) && Array.isArray(right) && left.every((x: any) => right.includes(x));
    case "supersetOf":
      return Array.isArray(left) && Array.isArray(right) && right.every((x: any) => left.includes(x));
    case "intersects":
      return Array.isArray(left) && Array.isArray(right) && left.some((x: any) => right.includes(x));
    case "before":
      return dateCompare(left, right) < 0;
    case "after":
      return dateCompare(left, right) > 0;
    case "between":
      if (!Array.isArray(right) || right.length !== 2) return false;
      const d = new Date(left);
      return d > new Date(right[0]) && d < new Date(right[1]);
    case "matches":
      try { return new RegExp(String(right)).test(String(left)); } catch { return false; }
    default:
      // unknown operator → deny
      return false;
  }
}

function compareNumbers(a: any, b: any) {
  const na = Number(a);
  const nb = Number(b);
  if (Number.isNaN(na) || Number.isNaN(nb)) return 0;
  if (na === nb) return 0;
  return na > nb ? 1 : -1;
}

function dateCompare(a: any, b: any) {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  if (isNaN(da) || isNaN(db)) return 0;
  if (da === db) return 0;
  return da > db ? 1 : -1;
}
