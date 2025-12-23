import { z } from "zod";
/**
 * Access level enum:
 * FULL → grant full permission
 * NONE → revoke permission
 * CONDITIONAL → ABAC
 */
export const AccessLevelEnum = z.enum(["FULL", "NONE", "CONDITIONAL"]);
/**
 * Params: /roles/:roleId/permissions/:permissionId
 */
export const rolePermissionParamSchema = z.object({
    roleId: z.string().uuid("Invalid roleId format"),
    permissionId: z.string().uuid("Invalid permissionId format"),
});
/**
 * Params: /roles/:roleId/modules/:moduleId
 */
export const roleModuleParamSchema = z.object({
    roleId: z.string().uuid("Invalid roleId format"),
    moduleId: z.string().uuid("Invalid moduleId format"),
});
/* -------------------------------------------------------------------------- */
/*                          ABAC Condition Schema                            */
/* -------------------------------------------------------------------------- */
/**
 * A single ABAC rule
 * e.g.
 * { field: "ticket.createdBy", operator: "=", value: "userId" }
 */
export const ConditionRule = z.object({
    field: z.string().min(1),
    operator: z.enum(["=", "!=", ">", "<", ">=", "<=", "in", "not in", "contains"]),
    value: z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]),
});
/**
 * Recursive Zod schema
 */
export const CompoundConditionSchema = z.lazy(() => z.object({
    op: z.enum(["AND", "OR"]),
    rules: z.array(z.union([ConditionRule, CompoundConditionSchema])),
}));
/**
 * Final ABAC Conditions schema
 */
export const ConditionsSchema = z.union([ConditionRule, CompoundConditionSchema]);
/* -------------------------------------------------------------------------- */
/*                         updateAccessLevelSchema                            */
/* -------------------------------------------------------------------------- */
export const updateAccessLevelSchema = z
    .object({
    accessLevel: AccessLevelEnum,
    conditions: z.any().nullable().optional(),
    expression: z.string().nullable().optional(),
})
    .superRefine((val, ctx) => {
    const isConditional = val.accessLevel === "CONDITIONAL";
    // CONDITIONAL requires conditions
    if (isConditional && !val.conditions) {
        ctx.addIssue({
            code: "custom",
            path: ["conditions"],
            message: "conditions are required when accessLevel is CONDITIONAL",
        });
    }
    // NON-CONDITIONAL must NOT send conditions
    if (!isConditional && val.conditions) {
        ctx.addIssue({
            code: "custom",
            path: ["conditions"],
            message: "conditions should not be provided unless accessLevel is CONDITIONAL",
        });
    }
    // Validate conditions shape
    if (isConditional && val.conditions) {
        try {
            ConditionsSchema.parse(val.conditions);
        }
        catch (err) {
            ctx.addIssue({
                code: "custom",
                path: ["conditions"],
                message: `Invalid ABAC conditions structure: ${err.message}`,
            });
        }
    }
    // Validate expression
    if (isConditional && val.expression !== undefined && val.expression === "") {
        ctx.addIssue({
            code: "custom",
            path: ["expression"],
            message: "expression cannot be empty",
        });
    }
});
//# sourceMappingURL=rolePermission.dto.js.map