import { z } from "zod";
export declare const OperatorEnum: z.ZodEnum<{
    endsWith: "endsWith";
    startsWith: "startsWith";
    contains: "contains";
    "=": "=";
    "!=": "!=";
    ">": ">";
    "<": "<";
    ">=": ">=";
    "<=": "<=";
    "==": "==";
    IN: "IN";
    NOT_IN: "NOT_IN";
    not_contains: "not_contains";
    isNull: "isNull";
    isNotNull: "isNotNull";
}>;
export type Operator = z.infer<typeof OperatorEnum>;
export declare const PrimitiveValue: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
export type PrimitiveValue = z.infer<typeof PrimitiveValue>;
export declare const ConditionSchema: z.ZodObject<{
    field: z.ZodString;
    operator: z.ZodEnum<{
        endsWith: "endsWith";
        startsWith: "startsWith";
        contains: "contains";
        "=": "=";
        "!=": "!=";
        ">": ">";
        "<": "<";
        ">=": ">=";
        "<=": "<=";
        "==": "==";
        IN: "IN";
        NOT_IN: "NOT_IN";
        not_contains: "not_contains";
        isNull: "isNull";
        isNotNull: "isNotNull";
    }>;
    value: z.ZodOptional<z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>]>>;
    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny>, z.ZodNull]>>>;
}, z.core.$strip>;
export type Condition = z.infer<typeof ConditionSchema>;
export declare const ConditionGroupSchema: z.ZodType<any>;
export type ConditionGroup = z.infer<typeof ConditionGroupSchema>;
export declare const RootConditionSchema: z.ZodType<any, unknown, z.core.$ZodTypeInternals<any, unknown>>;
export type RootCondition = z.infer<typeof RootConditionSchema>;
export declare const SavePermissionConditionsDto: z.ZodObject<{
    permissionId: z.ZodString;
    conditions: z.ZodType<any, unknown, z.core.$ZodTypeInternals<any, unknown>>;
    expression: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const SaveRolePermissionConditionsDto: z.ZodObject<{
    rolePermissionId: z.ZodString;
    conditions: z.ZodType<any, unknown, z.core.$ZodTypeInternals<any, unknown>>;
    expression: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const GetConditionsDto: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=condition.schema.d.ts.map