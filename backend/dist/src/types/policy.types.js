import { z } from "zod";
/** Base schema for Policy */
/** Base schema for Policy */
export const policyBaseSchema = z.object({
    tenantId: z.string().uuid(),
    description: z.string().trim().optional().transform((val) => val ?? null),
    effect: z.enum(["ALLOW", "DENY"]),
    resourceId: z.string().uuid(),
    actionId: z.string().uuid(),
    condition: z.record(z.string(), z.any()), // <--- FIXED
    priority: z.number().int(),
});
/** Schema for creating a policy */
export const createPolicySchema = policyBaseSchema;
/** Schema for updating a policy */
export const updatePolicySchema = policyBaseSchema;
/** Schema for bulk creating policies */
export const bulkCreatePolicySchema = z.object({
    policies: z.array(createPolicySchema).nonempty("At least one policy is required"),
});
/** Single Policy ID */
export const policyIdSchema = z.object({
    id: z.string().uuid({ message: "Invalid Policy ID format" }),
});
/** Multiple Policy IDs */
export const policyIdsSchema = z.object({
    id: z.array(z.string().uuid({ message: "Invalid Policy ID format" })).nonempty("At least one Policy ID is required"),
});
/** Schema for evaluating a policy */
export const evaluatePolicySchema = z.object({
    tenantId: z.string().uuid({ message: "Invalid Tenant ID format" }),
    userId: z.string().uuid({ message: "Invalid User ID format" }),
    resource: z.string({ message: "Resource is required" }),
    action: z.string({ message: "Action is required" }),
    context: z.record(z.string(), z.any()).optional(),
});
//# sourceMappingURL=policy.types.js.map