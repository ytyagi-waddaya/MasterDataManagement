// // utils/auditLog.ts
// import { prisma } from "../utils/prisma";
// import {
//   AuditAction,
//   AuditEntity,
//   PerformedByType,
//   Prisma,
// } from "@prisma/client";
// /**
//  * Options you pass when creating an audit log.
//  * JSON fields (step/before/after) accept `object | null | undefined`:
//  * - undefined means "omit the DB column"
//  * - null means "store JSON null"
//  */
// export type AuditLogOptions = {
//   tenantId?: string | null;
//   masterRecordId: string;
//   userId?: string | null;
//   entity: AuditEntity;
//   action: AuditAction;
//   comment?: string | null;
//   step?: Record<string, unknown> | null;
//   before?: Record<string, unknown> | null;
//   after?: Record<string, unknown> | null;
//   ipAddress?: string | null;
//   userAgent?: string | null;
//   performedBy?: PerformedByType;
// };
// /** Helper: convert undefined | null | object -> Prisma JSON types, but keep `undefined` to mean "omit". */
// function normalizeJsonField(
//   value?: Record<string, unknown> | null
// ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined {
//   if (value === undefined) return undefined;
//   if (value === null) return Prisma.JsonNull;
//   // safe cast: Prisma InputJsonValue accepts plain JS values/objects
//   return value as Prisma.InputJsonValue;
// }
// /**
//  * Generic helper to remove keys with `undefined` values (so they are not present in the data object).
//  * This prevents TypeScript from complaining about `property | undefined` vs "property omitted".
//  */
// function omitUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([, v]) => v !== undefined)
//   ) as Partial<T>;
// }
// /**
//  * createAuditLog
//  * - Omits properties that are `undefined`
//  * - Preserves `null` for JSON fields using Prisma.JsonNull
//  * - Returns the created auditLog record
//  */
// export async function createAuditLog(options: AuditLogOptions) {
//   const {
//     tenantId = null,
//     masterRecordId,
//     userId = null,
//     entity,
//     action,
//     comment = null,
//     step,
//     before,
//     after,
//     ipAddress = null,
//     userAgent = null,
//     performedBy = PerformedByType.USER,
//   } = options;
//   const normalizedStep = normalizeJsonField(step);
//   const normalizedBefore = normalizeJsonField(before);
//   const normalizedAfter = normalizeJsonField(after);
//   // Build the base data object (JSON fields may be undefined)
//   const rawData = {
//     tenantId,
//     masterRecordId,
//     userId,
//     entity,
//     action,
//     comment,
//     ipAddress,
//     userAgent,
//     performedBy,
//     // conditionally include JSON fields below if not undefined
//     step: normalizedStep,
//     before: normalizedBefore,
//     after: normalizedAfter,
//   };
//   // Omit keys whose value is `undefined` so Prisma types see them as "omitted" instead of "possibly undefined".
//   const data = omitUndefined(rawData);
//   // Cast to the Prisma create input type. This is safe because we omitted undefined props,
//   // and any Json field present is either a valid Json value or Prisma.JsonNull.
//   return prisma.auditLog.create({
//     data: data as Prisma.AuditLogCreateInput,
//   });
// }
// // import { AuditAction, AuditEntity, PerformedByType } from "@prisma/client";
// // import { createAuditLog } from "../utils/auditLog";
// // await createAuditLog({
// //   tenantId: "tenant-1",
// //   masterRecordId: "record-123",
// //   userId: "user-999",
// //   entity: AuditEntity.USER,
// //   action: AuditAction.UPDATE,
// //   comment: "Updated user role",
// //   before: { role: "user" },
// //   after: { role: "admin" },
// //   step: undefined, // omitted
// //   ipAddress: "1.2.3.4",
// //   userAgent: "MyAgent/1.0",
// //   performedBy: PerformedByType.ADMIN,
// // });
// utils/auditLog.ts
import { prisma } from "../lib/prisma.js";
import { PerformedByType, Prisma, } from "../../prisma/generated/client.js";
/**
 * Safe serializer: converts many JS values to JSON-friendly values.
 * - awaits thenables/promises
 * - Dates -> ISO strings
 * - BigInt -> string
 * - Error -> { name, message, stack }
 * - Removes functions and `undefined` during JSON.stringify
 * - On circular references, returns a small fallback object.
 */
async function safeSerialize(input) {
    // Await thenables/promises (e.g. Prisma__UserClient)
    if (input && typeof input.then === "function") {
        try {
            // await thenable
            input = await input;
        }
        catch (e) {
            // If awaiting rejects, capture error summary
            return {
                __awaitError__: true,
                name: e?.name ?? "Error",
                message: e?.message ?? String(e),
            };
        }
    }
    // Primitive handling
    if (input === null || typeof input === "boolean" || typeof input === "number" || typeof input === "string") {
        return input;
    }
    if (input instanceof Date) {
        return input.toISOString();
    }
    if (typeof input === "bigint") {
        return input.toString();
    }
    if (input instanceof Error) {
        return {
            name: input.name,
            message: input.message,
            stack: input.stack,
        };
    }
    // Try JSON.stringify with a replacer to handle Dates & BigInt inside objects/arrays
    try {
        const str = JSON.stringify(input, (_key, value) => {
            if (value instanceof Date)
                return value.toISOString();
            if (typeof value === "bigint")
                return value.toString();
            // functions & undefined are omitted by JSON.stringify automatically
            return value;
        });
        return JSON.parse(str);
    }
    catch (err) {
        // Circular or other non-serializable: produce a fallback object containing stringified info
        try {
            return {
                __nonSerializable__: true,
                type: Object.prototype.toString.call(input),
                summary: String(input?.toString?.() ?? typeof input),
            };
        }
        catch {
            return { __nonSerializable__: true };
        }
    }
}
/**
 * Normalize a value into Prisma JSON types.
 * - undefined => undefined (omit the column)
 * - null => Prisma.JsonNull (store JSON null)
 * - otherwise => safeSerialize(value)
 */
async function normalizeJsonField(value) {
    if (value === undefined)
        return undefined;
    if (value === null)
        return Prisma.JsonNull;
    return await safeSerialize(value);
}
/** Remove keys with `undefined` values so the final object omits them (not `key: undefined`). */
function omitUndefined(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}
/**
 * createAuditLog
 * - awaits thenables accidentally passed into step/before/after
 * - omits undefined fields so Prisma types align with exactOptionalPropertyTypes
 * - returns the created audit log record
 */
export async function createAuditLog(options) {
    const { masterRecordId = null, userId = null, entity, action, comment = null, step, before, after, ipAddress = null, userAgent = null, performedBy = PerformedByType.USER, } = options;
    const normalizedStep = await normalizeJsonField(step);
    const normalizedBefore = await normalizeJsonField(before);
    const normalizedAfter = await normalizeJsonField(after);
    const rawData = {
        masterRecordId,
        userId,
        entity,
        action,
        comment,
        ipAddress,
        userAgent,
        performedBy,
        step: normalizedStep,
        before: normalizedBefore,
        after: normalizedAfter,
    };
    const data = omitUndefined(rawData);
    return prisma.auditLog.create({
        data: data,
    });
}
//# sourceMappingURL=auditLog.js.map