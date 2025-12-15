// // auth/permissionCheck.ts
// import jsonlogic from "json-logic-js";
// import Redis from "ioredis";
// import { PrismaClient, Policy, User } from "@prisma/client";
// import { redisConfig } from "./redis";

// const redis = new Redis(redisConfig);

// const prisma = new PrismaClient();

// /** Types */
// export type EvalContext = {
//   resource?: Record<string, any>;
//   [k: string]: any;
// };

// export type PolicyDecision = { decided: boolean; allowed?: boolean };

// /**
//  * Build slug candidates for matching permission slugs.
//  * Supports hierarchical resources like "invoices/123/items"
//  */
// export function buildSlugCandidates(resourceName: string, actionName: string): string[] {
//   const parts = resourceName ? resourceName.split("/") : [];
//   const candidates: string[] = [];

//   // exact
//   candidates.push(`${resourceName}:${actionName}`);

//   // resource-level wildcards, e.g. invoices/123 -> invoices/*, invoices/*
//   for (let i = parts.length; i >= 1; i--) {
//     const prefix = parts.slice(0, i).join("/");
//     candidates.push(`${prefix}/*:${actionName}`);
//   }

//   // action wildcard and global action wildcard
//   candidates.push(`${resourceName}:*`);
//   candidates.push(`*:${actionName}`);

//   return Array.from(new Set(candidates));
// }

// /**
//  * Evaluate policies (ABAC) in DB. Policies are scanned in priority ascending order.
//  * Returns a PolicyDecision: decided=true if a policy matched and produced allow/deny.
//  */
// export async function evaluatePolicies(
//   user: User | null,
//   resourceName: string,
//   actionName: string,
//   context: EvalContext = {}
// ): Promise<PolicyDecision> {
//   // NOTE: you may want to tighten the where clause to filter by resource/action.
//   const policies: (Policy & { /* additional includes if needed */ })[] =
//     await prisma.policy.findMany({
//       where: { enabled: true },
//       orderBy: { priority: "asc" },
//     });

//   for (const p of policies) {
//     const cond = p.condition;
//     if (!cond) continue;

//     try {
//       // Evaluate JSONLogic with env containing user/resource/context
//       const input = { user: user ?? {}, resource: context.resource ?? {}, context };
//       const matched = jsonlogic.apply(cond as any, input);

//       if (matched) {
//         if (p.effect === "DENY") return { decided: true, allowed: false };
//         if (p.effect === "ALLOW") return { decided: true, allowed: true };
//       }
//     } catch (err) {
//       // Policy eval error: log and skip (or change to safer behavior if required)
//       console.error("Policy evaluation error:", err, "policyId:", p.id);
//     }
//   }

//   return { decided: false };
// }

// /** detect if user has a system super_admin role */
// export async function userHasSuperAdmin(userId: string): Promise<boolean> {
//   const roles = await prisma.userRole.findMany({
//     where: { userId },
//     include: { role: true },
//   });

//   return roles.some((r) => r.role && r.role.isSystem && r.role.name === "super_admin");
// }

// /**
//  * Main permission check.
//  * Returns true if allowed, false otherwise.
//  */
// export async function isAllowed(opts: {
//   userId: string;
//   resourceName: string;
//   actionName: string;
//   context?: EvalContext;
// }): Promise<boolean> {
//   const { userId, resourceName, actionName, context = {} } = opts;

//   // 1) super-admin bypass
//   try {
//     if (await userHasSuperAdmin(userId)) return true;
//   } catch (err) {
//     console.error("userHasSuperAdmin error:", err);
//     // continue - do not auto-allow on error
//   }

//   // 2) policy check
//   let user: User | null = null;
//   try {
//     user = await prisma.user.findUnique({ where: { id: userId } });
//   } catch (err) {
//     console.error("prisma.user.findUnique error:", err);
//   }

//   try {
//     const policyDecision = await evaluatePolicies(user, resourceName, actionName, context);
//     if (policyDecision.decided) return !!policyDecision.allowed;
//   } catch (err) {
//     console.error("evaluatePolicies error:", err);
//   }

//   // 3) RBAC via Redis fast path
//   const candidates = buildSlugCandidates(resourceName, actionName);
//   const redisKey = `user:${userId}:perms`;

//   try {
//     // ioredis.sismember returns 1 if member exists, 0 otherwise
//     for (const s of candidates) {
//       const exists = await redis.sismember(redisKey, s);
//       if (exists === 1) return true;
//     }
//   } catch (err) {
//     console.error("Redis check error:", err);
//     // on Redis failure, we fallback to DB approach below
//   }

//   // 4) DB fallback (RBAC): fetch user roles -> rolePermissions -> permissions
//   try {
//     const userRoles = await prisma.userRole.findMany({ where: { userId } });
//     const roleIds = userRoles.map((r) => r.roleId);
//     if (roleIds.length === 0) return false;

//     const rps = await prisma.rolePermission.findMany({
//       where: { roleId: { in: roleIds } },
//       include: { permission: { include: { resource: true, action: true } } },
//     });

//     for (const rp of rps) {
//       const perm = (rp as any).permission;
//       if (!perm || !perm.slug) continue;

//       if (candidates.includes(perm.slug)) {
//         if (perm.conditions) {
//           try {
//             const ok = jsonlogic.apply(perm.conditions as any, {
//               user: user ?? {},
//               resource: context.resource ?? {},
//               context,
//             });
//             if (ok) return true;
//           } catch (err) {
//             console.error("Permission condition evaluation failed:", err, "permissionId:", perm.id);
//             // skip this permission on eval error
//           }
//         } else {
//           return true;
//         }
//       }
//     }
//   } catch (err) {
//     console.error("DB fallback permission check error:", err);
//   }

//   // default deny
//   return false;
// }

// /** Close Prisma + Redis gracefully (optional helper) */
// export async function shutdown(): Promise<void> {
//   try {
//     await prisma.$disconnect();
//   } catch (err) {
//     console.warn("Prisma disconnect error:", err);
//   }
//   try {
//     await redis.quit();
//   } catch (err) {
//     console.warn("Redis quit error:", err);
//   }
// }
