import { PolicyId, PolicyIds, CreatePolicyInput, UpdatePolicyInput } from "../types/policy.types.js";
import { Prisma } from "../../prisma/generated/client.js";
declare const policyRepository: {
    create: (data: CreatePolicyInput) => Prisma.Prisma__PolicyClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createMany: (policies: CreatePolicyInput[]) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    findById: (id: PolicyId) => Prisma.Prisma__PolicyClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findMany: (filters?: Prisma.PolicyWhereInput) => Prisma.PrismaPromise<{
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
    update: ({ id }: PolicyId, data: UpdatePolicyInput) => Prisma.Prisma__PolicyClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    softDelete: ({ id }: PolicyId) => Prisma.Prisma__PolicyClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    restore: ({ id }: PolicyId) => Prisma.Prisma__PolicyClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    softDeleteMany: (ids: PolicyIds) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    restoreMany: (ids: PolicyIds) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete: (id: PolicyId) => Prisma.Prisma__PolicyClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    deleteMany: (ids: PolicyIds) => Prisma.PrismaPromise<Prisma.BatchPayload>;
};
export default policyRepository;
//# sourceMappingURL=policy.repository.d.ts.map