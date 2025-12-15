import { Request, Response, NextFunction } from "express";

import { prisma } from "../lib/prisma.js";
import { deepGet } from "../utils/deepGet.js";

async function resolveField(field: string, context: any) {
  if (field.startsWith("user.")) return deepGet(context.user, field.slice(5));
  if (field.startsWith("resource."))
    return deepGet(context.resource, field.slice(9));
  if (field.startsWith("context."))
    return deepGet(context.contextVars, field.slice(8));
  if (field.startsWith("$")) return context.contextVars[field];
  return undefined;
}

function compare(left: any, op: string, right: any): boolean {
  // implement typed comparisons safely
  if (op === "=" || op === "==") return left == right;
  if (op === "!=") return left != right;
  if (op === "IN") return Array.isArray(right) && right.includes(left);
  if (op === "NOT_IN") return Array.isArray(right) && !right.includes(left);
  if (op === ">") return Number(left) > Number(right);
  if (op === "<") return Number(left) < Number(right);
  if (op === ">=") return Number(left) >= Number(right);
  if (op === "<=") return Number(left) <= Number(right);
  if (op === "contains") return String(left).includes(String(right));
  if (op === "startsWith") return String(left).startsWith(String(right));
  if (op === "endsWith") return String(left).endsWith(String(right));
  if (op === "isNull") return left === null || left === undefined;
  if (op === "isNotNull") return left !== null && left !== undefined;
  return false;
}

function evaluateGroupSync(group: any, context: any): boolean {
  const condResults = (group.conditions || []).map((c: any) => {
    const left = resolveField(c.field, context);
    return compare(left, c.operator, c.value);
  });

  const groupResults = (group.groups || []).map((g: any) =>
    evaluateGroupSync(g, context)
  );
  const results = [...condResults, ...groupResults];
  if (group.logic === "OR") return results.some(Boolean);
  return results.every(Boolean); // AND default
}

/**
 * Middleware factory:
 * checkPermission({ actionKey, resourceKey, getResourceById, requiredAccess: 'FULL'|'CONDITIONAL'|'ANY' })
 */
export function checkPermissionFactory(opts: {
  actionKey: string;
  resourceKey: string;
  getResourceById?: (id: string, fields?: string[]) => Promise<any>;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthenticated" });
      }
      const user = req.user; // ensure auth middleware set req.user
      const resourceId = req.params.id || req.body.id || req.query.id;
      let resource: any = {};

      // 1) Determine which fields to load from registry (projection)
      // For simplicity here, load entire resource (but prefer projection in prod)
      if (opts.getResourceById && resourceId) {
        resource = await opts.getResourceById(resourceId);
      }

      const context = {
        user,
        resource,
        contextVars: {
          $currentUserId: user?.id,
          ip: req.ip,
          now: new Date().toISOString(),
        },
      };

      // 2) find permission by action+resource key
      const permission = await prisma.permission.findUnique({
        where: { key: `${opts.resourceKey}:${opts.actionKey}` }, // or use your lookup
      });

      if (!permission) {
        return res.status(403).json({ message: "Permission not defined" });
      }

      // 3) find user roles & rolePermissions in one query
      const rolePermissions = await prisma.rolePermission.findMany({
        where: {
          role: {
            users: { some: { userId: user.id } },
          },
          permissionId: permission.id,
        },
        include: { role: true },
      });

      // 4) evaluation order: rolePermissions first (FULL -> allow, CONDITIONAL -> evaluate)
      for (const rp of rolePermissions) {
        if (rp.accessLevel === "NONE") continue;
        if (rp.accessLevel === "FULL") {
          // ALLOW immediately
          // log decision asynchronously
          // return next()
          return next();
        }
        if (rp.accessLevel === "CONDITIONAL") {
          if (!rp.conditions) continue;
          const ok = evaluateGroupSync(rp.conditions, context);
          if (ok) return next();
        }
      }

      // 5) If no rolePermission allowed, optionally check Permission.conditions (global default)
      if (permission.conditions) {
        const ok = evaluateGroupSync(permission.conditions, context);
        if (ok) return next();
      }

      // Default deny
      return res.status(403).json({ message: "Access denied" }); 
    } catch (err) {
      return next(err);
    }
  };
}
