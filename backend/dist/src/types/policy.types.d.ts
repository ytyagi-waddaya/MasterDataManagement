import { z } from "zod";
/** Base schema for Policy */
/** Base schema for Policy */
export declare const policyBaseSchema: z.ZodObject<{
    tenantId: z.ZodString;
    description: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
    effect: z.ZodEnum<{
        ALLOW: "ALLOW";
        DENY: "DENY";
    }>;
    resourceId: z.ZodString;
    actionId: z.ZodString;
    condition: z.ZodRecord<z.ZodString, z.ZodAny>;
    priority: z.ZodNumber;
}, z.core.$strip>;
/** Schema for creating a policy */
export declare const createPolicySchema: z.ZodObject<{
    tenantId: z.ZodString;
    description: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
    effect: z.ZodEnum<{
        ALLOW: "ALLOW";
        DENY: "DENY";
    }>;
    resourceId: z.ZodString;
    actionId: z.ZodString;
    condition: z.ZodRecord<z.ZodString, z.ZodAny>;
    priority: z.ZodNumber;
}, z.core.$strip>;
/** Schema for updating a policy */
export declare const updatePolicySchema: z.ZodObject<{
    tenantId: z.ZodString;
    description: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
    effect: z.ZodEnum<{
        ALLOW: "ALLOW";
        DENY: "DENY";
    }>;
    resourceId: z.ZodString;
    actionId: z.ZodString;
    condition: z.ZodRecord<z.ZodString, z.ZodAny>;
    priority: z.ZodNumber;
}, z.core.$strip>;
/** Schema for bulk creating policies */
export declare const bulkCreatePolicySchema: z.ZodObject<{
    policies: z.ZodArray<z.ZodObject<{
        tenantId: z.ZodString;
        description: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
        effect: z.ZodEnum<{
            ALLOW: "ALLOW";
            DENY: "DENY";
        }>;
        resourceId: z.ZodString;
        actionId: z.ZodString;
        condition: z.ZodRecord<z.ZodString, z.ZodAny>;
        priority: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Single Policy ID */
export declare const policyIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
/** Multiple Policy IDs */
export declare const policyIdsSchema: z.ZodObject<{
    id: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
/** Schema for evaluating a policy */
export declare const evaluatePolicySchema: z.ZodObject<{
    tenantId: z.ZodString;
    userId: z.ZodString;
    resource: z.ZodString;
    action: z.ZodString;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
/** TypeScript types */
export type CreatePolicyInput = z.infer<typeof createPolicySchema>;
export type UpdatePolicyInput = z.infer<typeof updatePolicySchema>;
export type BulkCreatePolicyInput = z.infer<typeof bulkCreatePolicySchema>;
export type PolicyId = z.infer<typeof policyIdSchema>;
export type PolicyIds = z.infer<typeof policyIdsSchema>;
export type EvaluatePolicyInput = z.infer<typeof evaluatePolicySchema>;
//# sourceMappingURL=policy.types.d.ts.map