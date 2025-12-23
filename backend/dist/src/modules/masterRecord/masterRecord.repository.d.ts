import { Prisma } from "../../../prisma/generated/client.js";
import { MasterRecordFilterInput } from "./dto/masterRecord.dto.js";
declare const masterRecordRepository: {
    read: (filters: MasterRecordFilterInput) => Promise<{
        records: ({
            masterObject: {
                id: string;
                name: string;
                key: string;
                resources: {
                    id: string;
                    name: string;
                    workflows: {
                        id: string;
                        createdAt: Date;
                        name: string;
                        status: import("../../../prisma/generated/enums.js").WorkflowDefinitionStatus;
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
                }[];
            };
            currentStage: {
                id: string;
                name: string;
                code: string;
                order: number;
                color: string | null;
            } | null;
        } & {
            data: import("@prisma/client/runtime/client").JsonValue;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string;
            currentStageId: string | null;
            linkedUserId: string | null;
            schemaId: string;
            createdById: string | null;
        })[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    archive: (recordId: string) => Prisma.Prisma__MasterRecordClient<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        masterObjectId: string;
        currentStageId: string | null;
        linkedUserId: string | null;
        schemaId: string;
        createdById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    restore: (recordId: string) => Prisma.Prisma__MasterRecordClient<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        masterObjectId: string;
        currentStageId: string | null;
        linkedUserId: string | null;
        schemaId: string;
        createdById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    delete: (recordId: string) => Prisma.Prisma__MasterRecordClient<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        masterObjectId: string;
        currentStageId: string | null;
        linkedUserId: string | null;
        schemaId: string;
        createdById: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    readOne: (recordId: string) => Prisma.Prisma__MasterRecordClient<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        masterObjectId: string;
        currentStageId: string | null;
        linkedUserId: string | null;
        schemaId: string;
        createdById: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    getById: (recordId: string) => Promise<({
        auditLogs: {
            masterRecordId: string | null;
            userId: string | null;
            entity: import("../../../prisma/generated/enums.js").AuditEntity;
            action: import("../../../prisma/generated/enums.js").AuditAction;
            comment: string | null;
            step: import("@prisma/client/runtime/client").JsonValue | null;
            before: import("@prisma/client/runtime/client").JsonValue | null;
            after: import("@prisma/client/runtime/client").JsonValue | null;
            ipAddress: string | null;
            userAgent: string | null;
            performedBy: import("../../../prisma/generated/enums.js").PerformedByType;
            id: string;
            createdAt: Date;
        }[];
        masterObject: {
            id: string;
            name: string;
            key: string;
            resources: {
                id: string;
                name: string;
                workflows: ({
                    stages: {
                        id: string;
                        name: string;
                        metadata: import("@prisma/client/runtime/client").JsonValue | null;
                        code: string;
                        workflowId: string;
                        category: import("../../../prisma/generated/enums.js").Category;
                        order: number;
                        isInitial: boolean;
                        isFinal: boolean;
                        color: string | null;
                        position: import("@prisma/client/runtime/client").JsonValue | null;
                        allowedNextCategories: import("../../../prisma/generated/enums.js").Category[];
                    }[];
                    transitions: {
                        id: string;
                        priority: number;
                        metadata: import("@prisma/client/runtime/client").JsonValue | null;
                        fromStageId: string;
                        toStageId: string;
                        condition: import("@prisma/client/runtime/client").JsonValue | null;
                        workflowId: string;
                        transitionType: import("../../../prisma/generated/enums.js").TransitionType;
                        label: string | null;
                        triggerStrategy: import("../../../prisma/generated/enums.js").TriggerStrategy;
                        approvalStrategy: import("../../../prisma/generated/enums.js").ApprovalStrategy;
                        approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
                        autoTrigger: boolean;
                    }[];
                } & {
                    id: string;
                    createdAt: Date;
                    name: string;
                    status: import("../../../prisma/generated/enums.js").WorkflowDefinitionStatus;
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
                })[];
            }[];
        };
        currentStage: ({
            outgoingTransitions: {
                id: string;
                priority: number;
                metadata: import("@prisma/client/runtime/client").JsonValue | null;
                fromStageId: string;
                toStageId: string;
                condition: import("@prisma/client/runtime/client").JsonValue | null;
                workflowId: string;
                transitionType: import("../../../prisma/generated/enums.js").TransitionType;
                label: string | null;
                triggerStrategy: import("../../../prisma/generated/enums.js").TriggerStrategy;
                approvalStrategy: import("../../../prisma/generated/enums.js").ApprovalStrategy;
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
                transitionType: import("../../../prisma/generated/enums.js").TransitionType;
                label: string | null;
                triggerStrategy: import("../../../prisma/generated/enums.js").TriggerStrategy;
                approvalStrategy: import("../../../prisma/generated/enums.js").ApprovalStrategy;
                approvalConfig: import("@prisma/client/runtime/client").JsonValue | null;
                autoTrigger: boolean;
            }[];
        } & {
            id: string;
            name: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            code: string;
            workflowId: string;
            category: import("../../../prisma/generated/enums.js").Category;
            order: number;
            isInitial: boolean;
            isFinal: boolean;
            color: string | null;
            position: import("@prisma/client/runtime/client").JsonValue | null;
            allowedNextCategories: import("../../../prisma/generated/enums.js").Category[];
        }) | null;
        linkedUser: {
            email: string;
            id: string;
            name: string;
        } | null;
        tasks: {
            masterRecordId: string;
            id: string;
            createdAt: Date;
            status: import("../../../prisma/generated/enums.js").TaskStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            workflowInstanceId: string;
            currentStep: import("@prisma/client/runtime/client").JsonValue;
            completedAt: Date | null;
            dueAt: Date | null;
            stageId: string;
            assignedToId: string | null;
            assignedById: string | null;
        }[];
        createdBy: {
            email: string;
            id: string;
            name: string;
        } | null;
    } & {
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        masterObjectId: string;
        currentStageId: string | null;
        linkedUserId: string | null;
        schemaId: string;
        createdById: string | null;
    }) | null>;
};
export default masterRecordRepository;
//# sourceMappingURL=masterRecord.repository.d.ts.map