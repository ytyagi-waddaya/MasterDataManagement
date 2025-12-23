import { Prisma, WorkflowHistory, WorkflowInstance, WorkflowStage, WorkflowTransition } from "../../prisma/generated/client.js";
import { stageId, WorkflowFilterInput, workflowId } from "../types/workflow.types.js";
import { prisma } from "../lib/prisma.js";
declare const WorkflowRepository: {
    createWorkflow: (data: Prisma.WorkflowDefinitionCreateInput, tx?: Prisma.TransactionClient) => Prisma.Prisma__WorkflowDefinitionClient<{
        id: string;
        createdAt: Date;
        name: string;
        status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
        version: number;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        createdById: string | null;
        publishedAt: Date | null;
        code: string;
        description: string | null;
        resourceId: string;
        publishedById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: undefined;
    }>;
    findByCodeAndVersion: (code: string, version: number) => Prisma.Prisma__WorkflowDefinitionClient<{
        id: string;
        createdAt: Date;
        name: string;
        status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
        version: number;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        createdById: string | null;
        publishedAt: Date | null;
        code: string;
        description: string | null;
        resourceId: string;
        publishedById: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    read: (filters: WorkflowFilterInput) => Promise<{
        data: {
            id: string;
            createdAt: Date;
            name: string;
            status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
            version: number;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            createdById: string | null;
            publishedAt: Date | null;
            code: string;
            description: string | null;
            resourceId: string;
            publishedById: string | null;
        }[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    getWorkflowById: ({ workflowId }: workflowId) => Prisma.Prisma__WorkflowDefinitionClient<({
        createdBy: {
            email: string;
            id: string;
            name: string;
        } | null;
        resource: {
            id: string;
            name: string;
        };
        stages: ({
            outgoingTransitions: {
                id: string;
                priority: number;
                metadata: import("@prisma/client/runtime/client").JsonValue | null;
                fromStageId: string;
                toStageId: string;
                condition: import("@prisma/client/runtime/client").JsonValue | null;
                workflowId: string;
                transitionType: import("../../prisma/generated/enums.js").TransitionType;
                label: string | null;
                triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
                approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy;
                approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
                autoTrigger: boolean;
            }[];
            incomingTransitions: {
                id: string;
                priority: number;
                metadata: import("@prisma/client/runtime/client").JsonValue | null;
                fromStageId: string;
                toStageId: string;
                condition: import("@prisma/client/runtime/client").JsonValue | null;
                workflowId: string;
                transitionType: import("../../prisma/generated/enums.js").TransitionType;
                label: string | null;
                triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
                approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy;
                approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
                autoTrigger: boolean;
            }[];
        } & {
            id: string;
            name: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            code: string;
            workflowId: string;
            category: import("../../prisma/generated/enums.js").Category;
            order: number;
            isInitial: boolean;
            isFinal: boolean;
            color: string | null;
            position: import("@prisma/client/runtime/client").JsonValue | null;
            allowedNextCategories: import("../../prisma/generated/enums.js").Category[];
        })[];
        transitions: ({
            fromStage: {
                id: string;
                name: string;
                metadata: import("@prisma/client/runtime/client").JsonValue | null;
                code: string;
                workflowId: string;
                category: import("../../prisma/generated/enums.js").Category;
                order: number;
                isInitial: boolean;
                isFinal: boolean;
                color: string | null;
                position: import("@prisma/client/runtime/client").JsonValue | null;
                allowedNextCategories: import("../../prisma/generated/enums.js").Category[];
            };
            toStage: {
                id: string;
                name: string;
                metadata: import("@prisma/client/runtime/client").JsonValue | null;
                code: string;
                workflowId: string;
                category: import("../../prisma/generated/enums.js").Category;
                order: number;
                isInitial: boolean;
                isFinal: boolean;
                color: string | null;
                position: import("@prisma/client/runtime/client").JsonValue | null;
                allowedNextCategories: import("../../prisma/generated/enums.js").Category[];
            };
        } & {
            id: string;
            priority: number;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            fromStageId: string;
            toStageId: string;
            condition: import("@prisma/client/runtime/client").JsonValue | null;
            workflowId: string;
            transitionType: import("../../prisma/generated/enums.js").TransitionType;
            label: string | null;
            triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
            approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy;
            approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
            autoTrigger: boolean;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
        version: number;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        createdById: string | null;
        publishedAt: Date | null;
        code: string;
        description: string | null;
        resourceId: string;
        publishedById: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    ArchiveWorkflow: ({ workflowId }: workflowId) => Prisma.Prisma__WorkflowDefinitionClient<{
        id: string;
        createdAt: Date;
        name: string;
        status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
        version: number;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        createdById: string | null;
        publishedAt: Date | null;
        code: string;
        description: string | null;
        resourceId: string;
        publishedById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    RestoredWorkflow: ({ workflowId }: workflowId) => Prisma.Prisma__WorkflowDefinitionClient<{
        id: string;
        createdAt: Date;
        name: string;
        status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
        version: number;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        createdById: string | null;
        publishedAt: Date | null;
        code: string;
        description: string | null;
        resourceId: string;
        publishedById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    DeleteWorkflow: ({ workflowId }: workflowId) => Prisma.Prisma__WorkflowDefinitionClient<{
        id: string;
        createdAt: Date;
        name: string;
        status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
        version: number;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        createdById: string | null;
        publishedAt: Date | null;
        code: string;
        description: string | null;
        resourceId: string;
        publishedById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    isDuplicateName: (name: string, workflowId: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
        version: number;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        createdById: string | null;
        publishedAt: Date | null;
        code: string;
        description: string | null;
        resourceId: string;
        publishedById: string | null;
    } | null>;
    findByCode: (workflowId: string, code: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowStage | null>;
    createStage: (data: any, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowStage>;
    findByStageId: (stageId: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowStage | null>;
    updateStage: (stageId: string, data: any, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowStage>;
    deleteStage: (stageId: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowStage>;
    findByWorkflowId: ({ workflowId }: workflowId, tx?: typeof prisma) => Promise<WorkflowStage[]>;
    getStagesByWorkflowIdandStageId: ({ workflowId }: workflowId, { stageId }: stageId, tx?: typeof prisma) => Promise<WorkflowStage[]>;
    createTransition: (data: {
        label?: string;
        fromStageId: string;
        toStageId: string;
        workflowId: string;
        allowedRoleIds?: string[];
        allowedUserIds?: string[];
        requiresApproval?: boolean;
        autoTrigger?: boolean;
        condition?: any;
        metadata?: any;
    }, tx?: Prisma.TransactionClient | typeof prisma) => Promise<{
        id: string;
        priority: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        fromStageId: string;
        toStageId: string;
        condition: import("@prisma/client/runtime/client").JsonValue | null;
        workflowId: string;
        transitionType: import("../../prisma/generated/enums.js").TransitionType;
        label: string | null;
        triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
        approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy;
        approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
        autoTrigger: boolean;
    }>;
    findById: (id: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowTransition | null>;
    updateTransition: (id: string, data: any, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowTransition>;
    deleteTransition: (transitionId: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowTransition>;
    findTransitionsByWorkflowId(workflowId: string, tx?: import("../../prisma/generated/internal/class.js").PrismaClient<never, Prisma.GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>): Prisma.PrismaPromise<{
        id: string;
        priority: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        fromStageId: string;
        toStageId: string;
        condition: import("@prisma/client/runtime/client").JsonValue | null;
        workflowId: string;
        transitionType: import("../../prisma/generated/enums.js").TransitionType;
        label: string | null;
        triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
        approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy;
        approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
        autoTrigger: boolean;
    }[]>;
    createInstance: (data: Prisma.WorkflowInstanceCreateInput, tx?: Prisma.TransactionClient | typeof prisma) => Prisma.Prisma__WorkflowInstanceClient<{
        id: string;
        createdAt: Date;
        status: import("../../prisma/generated/enums.js").WorkflowInstanceStatus;
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: undefined;
    }>;
    getInstanceById: (id: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowInstance | null>;
    findActiveInstanceForResource: (workflowId: string, resourceType: string, resourceId: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowInstance | null>;
    updateCurrentStage: (instanceId: string, update: Prisma.WorkflowInstanceUpdateInput, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowInstance>;
    closeInstance: (instanceId: string, endedAt: Date, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowInstance>;
    createHistory: (data: Prisma.WorkflowHistoryCreateInput, tx?: Prisma.TransactionClient | typeof prisma) => Promise<WorkflowHistory>;
    getTransitionsForStage: (workflowId: string, fromStageId: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<({
        allowedRoles: {
            roleId: string;
        }[];
        allowedUsers: {
            userId: string;
        }[];
    } & {
        id: string;
        priority: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        fromStageId: string;
        toStageId: string;
        condition: import("@prisma/client/runtime/client").JsonValue | null;
        workflowId: string;
        transitionType: import("../../prisma/generated/enums.js").TransitionType;
        label: string | null;
        triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
        approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy;
        approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
        autoTrigger: boolean;
    })[]>;
    getTransitionById: (id: string, tx?: Prisma.TransactionClient | typeof prisma) => Promise<{
        id: string;
        priority: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        fromStageId: string;
        toStageId: string;
        condition: import("@prisma/client/runtime/client").JsonValue | null;
        workflowId: string;
        transitionType: import("../../prisma/generated/enums.js").TransitionType;
        label: string | null;
        triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
        approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy;
        approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
        autoTrigger: boolean;
    } | null>;
    getWorkflowWithStages: (workflowId: string, tx?: import("../../prisma/generated/internal/class.js").PrismaClient<never, Prisma.GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>) => Promise<({
        stages: {
            id: string;
            name: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            code: string;
            workflowId: string;
            category: import("../../prisma/generated/enums.js").Category;
            order: number;
            isInitial: boolean;
            isFinal: boolean;
            color: string | null;
            position: import("@prisma/client/runtime/client").JsonValue | null;
            allowedNextCategories: import("../../prisma/generated/enums.js").Category[];
        }[];
        transitions: {
            id: string;
            priority: number;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            fromStageId: string;
            toStageId: string;
            condition: import("@prisma/client/runtime/client").JsonValue | null;
            workflowId: string;
            transitionType: import("../../prisma/generated/enums.js").TransitionType;
            label: string | null;
            triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
            approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy;
            approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
            autoTrigger: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        status: import("../../prisma/generated/enums.js").WorkflowDefinitionStatus;
        version: number;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        createdById: string | null;
        publishedAt: Date | null;
        code: string;
        description: string | null;
        resourceId: string;
        publishedById: string | null;
    }) | null>;
    getUserRoleIds: (userId: string) => Promise<string[]>;
};
export default WorkflowRepository;
//# sourceMappingURL=workflow.repository.d.ts.map