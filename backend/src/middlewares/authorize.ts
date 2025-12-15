// middlewares/autoAuthorize.ts
import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

/* ============================================================
   AUTO-AUTHORIZATION MIDDLEWARE (RBAC + ABAC)
   - Dynamic action detection (CRUD + custom)
   - Dynamic resource detection from URL
   - RolePermission.conditions > Permission.conditions
   - FULL access bypasses conditions
   - Conditional evaluated last
=============================================================== */

export function autoAuthorize() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      /* 1. Auth user must exist (coming from auth middleware) */
      const authUser = (req as any).user;
      if (!authUser) return res.status(401).json({ message: "Unauthenticated" });

      const userId = authUser.id;

      /* 2. Load user + roles */
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          roles: true,
        },
      });

      if (!user) return res.status(401).json({ message: "User not found" });

      const roleIds = user.roles.map((r:any) => r.roleId);

      /* 3. Detect action */
      const actionKey = detectAction(req);

      /* 4. Detect resource */
      const resourceKey = detectResource(req);

      if (!actionKey || !resourceKey) {
        return res.status(400).json({
          message: "Unable to detect action or resource automatically.",
        });
      }

      /* 5. Load Permission dynamically */
      const permission = await prisma.permission.findFirst({
        where: {
          action: { key: actionKey },
          resource: { key: resourceKey },
        },
      });

      if (!permission) {
        return res.status(403).json({
          message: `Permission not configured for ACTION=${actionKey}, RESOURCE=${resourceKey}`,
        });
      }

      /* 6. Load rolePermission */
      const rolePermissions = await prisma.rolePermission.findMany({
        where: {
          roleId: { in: roleIds },
          permissionId: permission.id,
        },
      });

      if (!rolePermissions || rolePermissions.length === 0) {
        return res.status(403).json({ message: "Permission denied" });
      }

      /* 7. RBAC: FULL access → allow immediately */
      if (rolePermissions.some((rp:any) => rp.accessLevel === "FULL")) {
        return next();
      }

      /* 8. CONDITIONAL logic (RolePermission → Permission fallback) */
      const context = buildContext(req, user, authUser);

      for (const rp of rolePermissions) {

        // --- 8.1 RolePermission has its own conditions → highest priority ---
        if (rp.accessLevel === "CONDITIONAL" && rp.conditions) {
          try {
            if (evaluateGroup(rp.conditions as any, context)) {
              return next();
            }
          } catch (err) {
            console.error("ABAC rolePermission evaluation error:", err);
          }
        }

        // --- 8.2 RolePermission has NO conditions → fallback to Permission.conditions ---
        if (
          rp.accessLevel === "CONDITIONAL" &&
          !rp.conditions &&
          permission.conditions
        ) {
          try {
            if (evaluateGroup(permission.conditions as any, context)) {
              return next();
            }
          } catch (err) {
            console.error("ABAC permission fallback evaluation error:", err);
          }
        }
      }

      /* 9. None of conditional rules passed → Deny */
      return res.status(403).json({ message: "Permission denied" });

    } catch (err) {
      console.error("autoAuthorize error:", err);
      return res.status(500).json({ message: "Internal Authorization Error" });
    }
  };
}

/* ============================================================
   ACTION DETECTOR
   - Supports CRUD
   - Supports custom actions via body.action = "APPROVE"
=============================================================== */
function detectAction(req: Request): string {
  // Custom override (e.g. workflows)
  if (req.body?.action) {
    return req.body.action.toString().toUpperCase();
  }

  // Standard REST mapping
  switch (req.method) {
    case "GET":
      return "READ";
    case "POST":
      return "CREATE";
    case "PATCH":
      return "UPDATE";
    case "PUT":
      return "UPDATE";
    case "DELETE":
      return "DELETE";
    default:
      return req.method.toUpperCase(); // fallback (PUT, OPTIONS, etc)
  }
}

/* ============================================================
   RESOURCE DETECTOR
   /api/tickets/123 → "TICKET"
   /v1/projects/abc → "PROJECT"
=============================================================== */
function detectResource(req: Request): string | null {
  const parts = req.path.split("/").filter(Boolean);

  for (const segment of parts) {
    if (isNaN(Number(segment))) {
      return segment.replace(/s$/, "").toUpperCase();
    }
  }
  return null;
}

/* ============================================================
  Build context for ABAC
=============================================================== */
function buildContext(req: Request, dbUser: any, actor: any) {
  return {
    user: dbUser,
    actor,
    params: req.params,
    query: req.query,
    body: req.body,
    resource: (req as any).resource || null,
    now: new Date(),
  };
}

/* ============================================================
   ABAC GROUP (AND/OR)
=============================================================== */
function evaluateGroup(node: any, ctx: any): boolean {
  if (node.field) return evaluateRule(node, ctx);

  if (node.op === "AND") {
    return node.rules.every((r: any) => evaluateGroup(r, ctx));
  }

  if (node.op === "OR") {
    return node.rules.some((r: any) => evaluateGroup(r, ctx));
  }

  return false;
}

/* ============================================================
   ABAC RULE (field, operator, value)
=============================================================== */
function evaluateRule(rule: any, ctx: any): boolean {
  const left = resolveField(rule.field, ctx);
  const operator = rule.operator;
  const right = rule.value;
  return runOperator(operator, left, right);
}

/* ============================================================
   Resolve field paths (ticket.status → ctx.resource.ticket.status)
=============================================================== */
function resolveField(field: string, ctx: any): any {
  if (!field) return undefined;

  const parts = field.split(".");
  const roots = ["resource", "body", "query", "params", "user", "actor", "now"];

  for (const root of roots) {
    let cur = ctx[root];
    if (!cur) continue;

    let valid = true;

    for (const p of parts) {
      if (Object.prototype.hasOwnProperty.call(cur, p)) {
        cur = cur[p];
      } else {
        valid = false;
        break;
      }
    }

    if (valid) return cur;
  }

  return undefined;
}

/* ============================================================
   Operator Engine (string, array, number, date, regex)
=============================================================== */
function runOperator(op: string, left: any, right: any): boolean {
  switch (op) {
    case "=": return left === right;
    case "!=": return left !== right;

    case ">": return Number(left) > Number(right);
    case "<": return Number(left) < Number(right);
    case ">=": return Number(left) >= Number(right);
    case "<=": return Number(left) <= Number(right);

    case "contains":
      if (typeof left === "string") return left.includes(right);
      if (Array.isArray(left)) return left.includes(right);
      return false;

    case "not contains":
      if (typeof left === "string") return !left.includes(right);
      if (Array.isArray(left)) return !left.includes(right);
      return false;

    case "iContains":
      return typeof left === "string" &&
        left.toLowerCase().includes(String(right).toLowerCase());

    case "startsWith": return typeof left === "string" && left.startsWith(right);
    case "endsWith": return typeof left === "string" && left.endsWith(right);

    case "exists": return left !== undefined && left !== null;
    case "notExists": return left === undefined || left === null;

    case "array-contains": return Array.isArray(left) && left.includes(right);
    case "array-not-contains": return Array.isArray(left) && !left.includes(right);

    case "subsetOf":
      return Array.isArray(left) && Array.isArray(right) &&
        left.every((x) => right.includes(x));

    case "supersetOf":
      return Array.isArray(left) && Array.isArray(right) &&
        right.every((x) => left.includes(x));

    case "intersects":
      return Array.isArray(left) && Array.isArray(right) &&
        left.some((x) => right.includes(x));

    case "before": return new Date(left) < new Date(right);
    case "after": return new Date(left) > new Date(right);

    case "between":
      if (!Array.isArray(right) || right.length !== 2) return false;
      const d = new Date(left);
      return d > new Date(right[0]) && d < new Date(right[1]);

    case "matches": return new RegExp(right).test(left);

    default:
      console.warn("Unknown ABAC operator:", op);
      return false;
  }
}
