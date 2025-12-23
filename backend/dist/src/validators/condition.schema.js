import { z } from "zod";
export const OperatorEnum = z.enum([
    "=", "==", "!=", "IN", "NOT_IN",
    ">", "<", ">=", "<=",
    "contains", "not_contains",
    "startsWith", "endsWith",
    "isNull", "isNotNull"
]);
export const PrimitiveValue = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export const ConditionSchema = z.object({
    field: z.string().min(1),
    operator: OperatorEnum,
    value: z.optional(z.union([PrimitiveValue, z.array(PrimitiveValue)])),
    meta: z.optional(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.any()), z.null()])))
});
export const ConditionGroupSchema = z.lazy(() => z.object({
    logic: z.enum(["AND", "OR"]).default("AND"),
    conditions: z.array(ConditionSchema).optional().default([]),
    groups: z.array(ConditionGroupSchema).optional().default([])
}));
export const RootConditionSchema = ConditionGroupSchema;
export const SavePermissionConditionsDto = z.object({
    permissionId: z.string().uuid(),
    conditions: RootConditionSchema,
    expression: z.optional(z.string())
});
export const SaveRolePermissionConditionsDto = z.object({
    rolePermissionId: z.string().uuid(),
    conditions: RootConditionSchema,
    expression: z.optional(z.string())
});
export const GetConditionsDto = z.object({
    id: z.string().uuid()
});
//# sourceMappingURL=condition.schema.js.map