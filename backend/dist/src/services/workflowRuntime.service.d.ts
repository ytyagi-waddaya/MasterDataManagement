import { WorkflowInstanceStatus, TransitionType } from "../../prisma/generated/client.js";
export type ActorMeta = {
    actorId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    performedBy?: "USER" | "WORKER" | "SYSTEM";
};
type TransitionInput = {
    transitionId: string;
    action?: "APPROVE" | "REJECT" | "SEND_BACK" | "EXECUTE";
    comment?: string;
};
declare class WorkflowRuntimeService {
    startInstance(workflowId: string, payload: {
        resourceType: string;
        resourceId: string;
    }, meta: ActorMeta): Promise<{
        id: string;
        createdAt: Date;
        status: WorkflowInstanceStatus;
        updatedAt: Date;
        currentStageId: string | null;
        createdById: string | null;
        resourceId: string;
        resourceType: string;
        startedAt: Date;
        endedAt: Date | null;
        endedReason: string | null;
        errorDetails: import("@prisma/client/runtime/client").JsonValue | null;
        lockedAt: Date | null;
        lockedBy: string | null;
        workflowId: string;
        startedById: string | null;
    }>;
    executeTransition(instanceId: string, input: TransitionInput, meta: ActorMeta): Promise<{
        status: string;
    }>;
    getAvailableActions(instanceId: string, userId: string): Promise<{
        transitionId: string;
        label: string;
        type: TransitionType;
        actions: string[];
    }[]>;
    private resolveApproval;
}
declare const _default: WorkflowRuntimeService;
export default _default;
//# sourceMappingURL=workflowRuntime.service.d.ts.map