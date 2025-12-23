import { CreatePolicyInput, UpdatePolicyInput, PolicyId, PolicyIds, BulkCreatePolicyInput } from "../types/policy.types.js";
import { ActorMeta } from "../types/action.types.js";
declare const policyService: {
    createPolicy: (data: CreatePolicyInput, meta?: ActorMeta) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        condition: import("@prisma/client/runtime/client").JsonValue;
        description: string | null;
        resourceId: string | null;
        actionId: string | null;
        effect: import("../../prisma/generated/enums.js").PolicyEffect;
        enabled: boolean;
    }>;
    createPoliciesBulk: (data: BulkCreatePolicyInput, meta?: ActorMeta) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
    getPolicyById: (id: PolicyId) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        condition: import("@prisma/client/runtime/client").JsonValue;
        description: string | null;
        resourceId: string | null;
        actionId: string | null;
        effect: import("../../prisma/generated/enums.js").PolicyEffect;
        enabled: boolean;
    } | null>;
    getPolicies: (filters?: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        condition: import("@prisma/client/runtime/client").JsonValue;
        description: string | null;
        resourceId: string | null;
        actionId: string | null;
        effect: import("../../prisma/generated/enums.js").PolicyEffect;
        enabled: boolean;
    }[]>;
    updatePolicyById: ({ id }: PolicyId, data: UpdatePolicyInput, meta?: ActorMeta) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        condition: import("@prisma/client/runtime/client").JsonValue;
        description: string | null;
        resourceId: string | null;
        actionId: string | null;
        effect: import("../../prisma/generated/enums.js").PolicyEffect;
        enabled: boolean;
    }>;
    softDeletePolicy: ({ id }: PolicyId, meta?: ActorMeta) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        condition: import("@prisma/client/runtime/client").JsonValue;
        description: string | null;
        resourceId: string | null;
        actionId: string | null;
        effect: import("../../prisma/generated/enums.js").PolicyEffect;
        enabled: boolean;
    }>;
    restorePolicy: ({ id }: PolicyId, meta?: ActorMeta) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        condition: import("@prisma/client/runtime/client").JsonValue;
        description: string | null;
        resourceId: string | null;
        actionId: string | null;
        effect: import("../../prisma/generated/enums.js").PolicyEffect;
        enabled: boolean;
    }>;
    softDeleteManyPolicies: (ids: PolicyIds, meta?: ActorMeta) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
    restoreManyPolicies: (ids: PolicyIds, meta?: ActorMeta) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
    deletePolicy: (id: PolicyId, meta?: ActorMeta) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        condition: import("@prisma/client/runtime/client").JsonValue;
        description: string | null;
        resourceId: string | null;
        actionId: string | null;
        effect: import("../../prisma/generated/enums.js").PolicyEffect;
        enabled: boolean;
    }>;
    deleteManyPolicies: (ids: PolicyIds, meta?: ActorMeta) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
};
export default policyService;
//# sourceMappingURL=policy.service.d.ts.map