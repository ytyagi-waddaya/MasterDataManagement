import { AuditAction, AuditEntity, PerformedByType } from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
import { MasterRecordFilterInput } from "./dto/masterRecord.dto.js";
declare const masterRecordService: {
    createRecord: (masterObjectId: string, data: any, meta?: ActorMeta) => Promise<{
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
    }>;
    getRecords: (options?: Partial<MasterRecordFilterInput>) => Promise<{
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
    getRecordById: (recordId: string) => Promise<{
        auditLogs: {
            masterRecordId: string | null;
            userId: string | null;
            entity: AuditEntity;
            action: AuditAction;
            comment: string | null;
            step: import("@prisma/client/runtime/client").JsonValue | null;
            before: import("@prisma/client/runtime/client").JsonValue | null;
            after: import("@prisma/client/runtime/client").JsonValue | null;
            ipAddress: string | null;
            userAgent: string | null;
            performedBy: PerformedByType;
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
    }>;
    archiveRecord: (recordId: string, meta?: ActorMeta) => Promise<{
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
    }>;
    restoreRecord: (recordId: string, meta?: ActorMeta) => Promise<{
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
    }>;
    deleteRecord: (recordId: string, meta?: ActorMeta) => Promise<{
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
    }>;
};
export default masterRecordService;
//# sourceMappingURL=masterRecord.service.d.ts.map