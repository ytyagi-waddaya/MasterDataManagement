import { z } from "zod";
/**
 * Access level enum:
 * FULL → grant full permission
 * NONE → revoke permission
 * CONDITIONAL → ABAC
 */
export declare const AccessLevelEnum: z.ZodEnum<{
    FULL: "FULL";
    CONDITIONAL: "CONDITIONAL";
    NONE: "NONE";
}>;
export type AccessLevel = z.infer<typeof AccessLevelEnum>;
/**
 * Params: /roles/:roleId/permissions/:permissionId
 */
export declare const rolePermissionParamSchema: z.ZodObject<{
    roleId: z.ZodString;
    permissionId: z.ZodString;
}, z.core.$strip>;
export type RolePermissionParams = z.infer<typeof rolePermissionParamSchema>;
/**
 * Params: /roles/:roleId/modules/:moduleId
 */
export declare const roleModuleParamSchema: z.ZodObject<{
    roleId: z.ZodString;
    moduleId: z.ZodString;
}, z.core.$strip>;
export type RoleModuleParams = z.infer<typeof roleModuleParamSchema>;
/**
 * A single ABAC rule
 * e.g.
 * { field: "ticket.createdBy", operator: "=", value: "userId" }
 */
export declare const ConditionRule: z.ZodObject<{
    field: z.ZodString;
    operator: z.ZodEnum<{
        in: "in";
        contains: "contains";
        "=": "=";
        "!=": "!=";
        ">": ">";
        "<": "<";
        ">=": ">=";
        "<=": "<=";
        "not in": "not in";
    }>;
    value: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny>]>;
}, z.core.$strip>;
/**
 * Recursive type definition
 * Must define TypeScript type *before* schema to avoid implicit any issues
 */
export type CompoundCondition = {
    op: "AND" | "OR";
    rules: (z.infer<typeof ConditionRule> | CompoundCondition)[];
};
/**
 * Recursive Zod schema
 */
export declare const CompoundConditionSchema: z.ZodType<CompoundCondition>;
/**
 * Final ABAC Conditions schema
 */
export declare const ConditionsSchema: z.ZodUnion<readonly [z.ZodObject<{
    field: z.ZodString;
    operator: z.ZodEnum<{
        in: "in";
        contains: "contains";
        "=": "=";
        "!=": "!=";
        ">": ">";
        "<": "<";
        ">=": ">=";
        "<=": "<=";
        "not in": "not in";
    }>;
    value: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny>]>;
}, z.core.$strip>, z.ZodType<CompoundCondition, unknown, z.core.$ZodTypeInternals<CompoundCondition, unknown>>]>;
export type Conditions = z.infer<typeof ConditionsSchema>;
export declare const updateAccessLevelSchema: z.ZodObject<{
    accessLevel: z.ZodEnum<{
        FULL: "FULL";
        CONDITIONAL: "CONDITIONAL";
        NONE: "NONE";
    }>;
    conditions: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    expression: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type UpdateAccessLevelInput = z.infer<typeof updateAccessLevelSchema>;
//# sourceMappingURL=rolePermission.dto.d.ts.map