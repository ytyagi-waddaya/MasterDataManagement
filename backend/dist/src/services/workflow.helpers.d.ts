import { Prisma, ApprovalStatus, ApprovalStrategy } from "../../prisma/generated/client.js";
export type ActorMeta = {
    actorId: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: "USER" | "WORKER" | "SYSTEM";
};
export declare function enforceTransitionPermission(userId: string, instance: {
    createdById?: string | null;
}, transition: {
    triggerStrategy: string;
    allowedUsers: {
        userId: string;
    }[];
    allowedRoles: {
        roleId: string;
    }[];
}, tx: Prisma.TransactionClient): Promise<void>;
export declare function resolveApprovalStrategy(strategy: ApprovalStrategy, approvals: {
    status: ApprovalStatus;
}[], expectedCount: number): "APPROVED" | "REJECTED" | "PENDING";
export declare function getCurrentApprovalLevel(config: {
    levels: any[];
}, approvals: {
    levelOrder: number | null;
    status: ApprovalStatus;
}[]): any;
export declare function moveToStage(tx: Prisma.TransactionClient, instance: {
    id: string;
    resourceId: string;
}, transition: {
    id: string;
    fromStageId: string;
    toStageId: string;
    label?: string | null;
}, meta: ActorMeta, comment?: string): Promise<void>;
//# sourceMappingURL=workflow.helpers.d.ts.map