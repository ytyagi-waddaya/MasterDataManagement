import { z } from "zod";
export declare const zUUID: z.ZodUUID;
export declare const zUUIDOptional: z.ZodOptional<z.ZodUUID>;
export declare const zJson: z.ZodAny;
export declare const transitionSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    fromStageId: z.ZodUUID;
    toStageId: z.ZodUUID;
    transitionType: z.ZodEnum<{
        NORMAL: "NORMAL";
        APPROVAL: "APPROVAL";
        SEND_BACK: "SEND_BACK";
        REVIEW: "REVIEW";
        AUTO: "AUTO";
    }>;
    triggerStrategy: z.ZodDefault<z.ZodEnum<{
        ANY_ALLOWED: "ANY_ALLOWED";
        ALL_ALLOWED: "ALL_ALLOWED";
        CREATOR_ONLY: "CREATOR_ONLY";
        ASSIGNEE_ONLY: "ASSIGNEE_ONLY";
        APPROVER_ONLY: "APPROVER_ONLY";
        SYSTEM_ONLY: "SYSTEM_ONLY";
    }>>;
    approvalStrategy: z.ZodOptional<z.ZodEnum<{
        ALL: "ALL";
        ANY: "ANY";
        MAJORITY: "MAJORITY";
    }>>;
    approvalConfig: z.ZodOptional<z.ZodObject<{
        mode: z.ZodEnum<{
            PARALLEL: "PARALLEL";
            SEQUENTIAL: "SEQUENTIAL";
        }>;
        levels: z.ZodOptional<z.ZodArray<z.ZodObject<{
            order: z.ZodNumber;
            roleIds: z.ZodDefault<z.ZodArray<z.ZodUUID>>;
            userIds: z.ZodDefault<z.ZodArray<z.ZodUUID>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    autoTrigger: z.ZodDefault<z.ZodBoolean>;
    condition: z.ZodOptional<z.ZodAny>;
    metadata: z.ZodOptional<z.ZodAny>;
    allowedRoleIds: z.ZodDefault<z.ZodArray<z.ZodUUID>>;
    allowedUserIds: z.ZodDefault<z.ZodArray<z.ZodUUID>>;
}, z.core.$strip>;
export declare const createFullWorkflowSchema: z.ZodObject<{
    publish: z.ZodOptional<z.ZodBoolean>;
    stages: z.ZodArray<z.ZodObject<{
        tempId: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        isInitial: z.ZodBoolean;
        isFinal: z.ZodBoolean;
        order: z.ZodNumber;
        category: z.ZodEnum<{
            NORMAL: "NORMAL";
            APPROVAL: "APPROVAL";
            DRAFT: "DRAFT";
            SUBMITTED: "SUBMITTED";
            UNDER_REVIEW: "UNDER_REVIEW";
            CORRECTION: "CORRECTION";
            ON_HOLD: "ON_HOLD";
            REJECTED: "REJECTED";
            COMPLETED: "COMPLETED";
        }>;
        color: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodAny>;
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    transitions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        fromStageId: z.ZodUUID;
        toStageId: z.ZodUUID;
        transitionType: z.ZodEnum<{
            NORMAL: "NORMAL";
            APPROVAL: "APPROVAL";
            SEND_BACK: "SEND_BACK";
            REVIEW: "REVIEW";
            AUTO: "AUTO";
        }>;
        triggerStrategy: z.ZodDefault<z.ZodEnum<{
            ANY_ALLOWED: "ANY_ALLOWED";
            ALL_ALLOWED: "ALL_ALLOWED";
            CREATOR_ONLY: "CREATOR_ONLY";
            ASSIGNEE_ONLY: "ASSIGNEE_ONLY";
            APPROVER_ONLY: "APPROVER_ONLY";
            SYSTEM_ONLY: "SYSTEM_ONLY";
        }>>;
        approvalStrategy: z.ZodOptional<z.ZodEnum<{
            ALL: "ALL";
            ANY: "ANY";
            MAJORITY: "MAJORITY";
        }>>;
        approvalConfig: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<{
                PARALLEL: "PARALLEL";
                SEQUENTIAL: "SEQUENTIAL";
            }>;
            levels: z.ZodOptional<z.ZodArray<z.ZodObject<{
                order: z.ZodNumber;
                roleIds: z.ZodDefault<z.ZodArray<z.ZodUUID>>;
                userIds: z.ZodDefault<z.ZodArray<z.ZodUUID>>;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
        autoTrigger: z.ZodDefault<z.ZodBoolean>;
        condition: z.ZodOptional<z.ZodAny>;
        metadata: z.ZodOptional<z.ZodAny>;
        allowedRoleIds: z.ZodDefault<z.ZodArray<z.ZodUUID>>;
        allowedUserIds: z.ZodDefault<z.ZodArray<z.ZodUUID>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const createWorkflowDefinitionSchema: z.ZodObject<{
    name: z.ZodString;
    resourceId: z.ZodUUID;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateWorkflowSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    resourceId: z.ZodOptional<z.ZodUUID>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    code: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const workflowIdSchema: z.ZodObject<{
    workflowId: z.ZodUUID;
}, z.core.$strip>;
export declare const categoryEnum: z.ZodEnum<{
    NORMAL: "NORMAL";
    APPROVAL: "APPROVAL";
    DRAFT: "DRAFT";
    SUBMITTED: "SUBMITTED";
    UNDER_REVIEW: "UNDER_REVIEW";
    CORRECTION: "CORRECTION";
    ON_HOLD: "ON_HOLD";
    REJECTED: "REJECTED";
    COMPLETED: "COMPLETED";
}>;
export declare const createStageSchema: z.ZodObject<{
    workflowId: z.ZodUUID;
    name: z.ZodString;
    order: z.ZodDefault<z.ZodNumber>;
    color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isInitial: z.ZodDefault<z.ZodBoolean>;
    isFinal: z.ZodDefault<z.ZodBoolean>;
    category: z.ZodDefault<z.ZodEnum<{
        NORMAL: "NORMAL";
        APPROVAL: "APPROVAL";
        DRAFT: "DRAFT";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        CORRECTION: "CORRECTION";
        ON_HOLD: "ON_HOLD";
        REJECTED: "REJECTED";
        COMPLETED: "COMPLETED";
    }>>;
    allowedNextCategories: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        NORMAL: "NORMAL";
        APPROVAL: "APPROVAL";
        DRAFT: "DRAFT";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        CORRECTION: "CORRECTION";
        ON_HOLD: "ON_HOLD";
        REJECTED: "REJECTED";
        COMPLETED: "COMPLETED";
    }>>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
}, z.core.$strip>;
export type ApprovalConfig = {
    mode: "SEQUENTIAL" | "PARALLEL";
    levels?: Array<{
        roleId?: string;
        userId?: string;
        required?: boolean;
    }>;
    approvers?: Array<{
        roleId?: string;
        userId?: string;
    }>;
    strategy?: "ALL" | "ANY";
    onReject?: "STOP" | "SEND_BACK" | "PREVIOUS_STAGE";
};
export declare const stageIdSchema: z.ZodObject<{
    stageId: z.ZodUUID;
}, z.core.$strip>;
export declare const createStagesSchema: z.ZodArray<z.ZodObject<{
    workflowId: z.ZodUUID;
    name: z.ZodString;
    order: z.ZodDefault<z.ZodNumber>;
    color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isInitial: z.ZodDefault<z.ZodBoolean>;
    isFinal: z.ZodDefault<z.ZodBoolean>;
    category: z.ZodDefault<z.ZodEnum<{
        NORMAL: "NORMAL";
        APPROVAL: "APPROVAL";
        DRAFT: "DRAFT";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        CORRECTION: "CORRECTION";
        ON_HOLD: "ON_HOLD";
        REJECTED: "REJECTED";
        COMPLETED: "COMPLETED";
    }>>;
    allowedNextCategories: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        NORMAL: "NORMAL";
        APPROVAL: "APPROVAL";
        DRAFT: "DRAFT";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        CORRECTION: "CORRECTION";
        ON_HOLD: "ON_HOLD";
        REJECTED: "REJECTED";
        COMPLETED: "COMPLETED";
    }>>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
}, z.core.$strip>>;
export declare const updateStageSchema: z.ZodObject<{
    stageId: z.ZodUUID;
    name: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    isInitial: z.ZodOptional<z.ZodBoolean>;
    isFinal: z.ZodOptional<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodAny>;
    category: z.ZodDefault<z.ZodEnum<{
        NORMAL: "NORMAL";
        APPROVAL: "APPROVAL";
        DRAFT: "DRAFT";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        CORRECTION: "CORRECTION";
        ON_HOLD: "ON_HOLD";
        REJECTED: "REJECTED";
        COMPLETED: "COMPLETED";
    }>>;
}, z.core.$strip>;
/** BULK REORDER STAGES */
export declare const reorderStagesSchema: z.ZodObject<{
    stages: z.ZodArray<z.ZodObject<{
        id: z.ZodUUID;
        order: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const createTransitionSchema: z.ZodObject<{
    workflowId: z.ZodUUID;
    fromStageId: z.ZodUUID;
    toStageId: z.ZodUUID;
    label: z.ZodOptional<z.ZodString>;
    allowedRoleIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
    allowedUserIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
    condition: z.ZodOptional<z.ZodAny>;
    requiresApproval: z.ZodDefault<z.ZodBoolean>;
    autoTrigger: z.ZodDefault<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
export declare const updateTransitionSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    allowedRoleIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    allowedUserIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    condition: z.ZodOptional<z.ZodAny>;
    requiresApproval: z.ZodOptional<z.ZodBoolean>;
    autoTrigger: z.ZodOptional<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
export declare const transitionIdSchema: z.ZodObject<{
    transitionId: z.ZodUUID;
}, z.core.$strip>;
export declare const createInstanceSchema: z.ZodObject<{
    workflowCode: z.ZodOptional<z.ZodString>;
    workflowId: z.ZodOptional<z.ZodUUID>;
    resourceType: z.ZodString;
    resourceId: z.ZodString;
    createdById: z.ZodOptional<z.ZodUUID>;
    context: z.ZodOptional<z.ZodAny>;
    operationId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const transitionInstanceSchema: z.ZodObject<{
    instanceId: z.ZodUUID;
    targetStageId: z.ZodOptional<z.ZodUUID>;
    targetStageCode: z.ZodOptional<z.ZodString>;
    actorId: z.ZodUUID;
    actionLabel: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    context: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
export declare const instanceQuerySchema: z.ZodObject<{
    resourceType: z.ZodOptional<z.ZodString>;
    resourceId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export declare const instanceIdSchema: z.ZodObject<{
    instanceId: z.ZodUUID;
}, z.core.$strip>;
export declare const moveInstanceSchema: z.ZodObject<{
    instanceId: z.ZodString;
    toStageId: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodAny>;
    performedById: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createHistorySchema: z.ZodObject<{
    workflowInstanceId: z.ZodUUID;
    fromStageId: z.ZodOptional<z.ZodUUID>;
    toStageId: z.ZodUUID;
    performedById: z.ZodOptional<z.ZodUUID>;
    notes: z.ZodOptional<z.ZodString>;
    actionLabel: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
export declare const allowedSortColumns: readonly ["name", "description", "isSystem", "isActive", "id", "createdAt", "updatedAt", "deletedAt"];
export declare const workflowFilterSchema: z.ZodObject<{
    skip: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    take: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    isActive: z.ZodDefault<z.ZodEnum<{
        active: "active";
        all: "all";
        inactive: "inactive";
    }>>;
    search: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    name: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    createdFrom: z.ZodOptional<z.ZodString>;
    createdTo: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        id: "id";
        createdAt: "createdAt";
        name: "name";
        updatedAt: "updatedAt";
        deletedAt: "deletedAt";
        isActive: "isActive";
        description: "description";
        isSystem: "isSystem";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strict>;
export type CreateWorkflowDefinitionInput = z.infer<typeof createWorkflowDefinitionSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
export type CreateStageInput = z.infer<typeof createStageSchema>;
export type CreateStagesInput = z.infer<typeof createStagesSchema>;
export type UpdateStageInput = z.infer<typeof updateStageSchema>;
export type ReorderStagesInput = z.infer<typeof reorderStagesSchema>;
export type CreateTransitionInput = z.infer<typeof createTransitionSchema>;
export type UpdateTransitionInput = z.infer<typeof updateTransitionSchema>;
export type CreateInstanceInput = z.infer<typeof createInstanceSchema>;
export type TransitionInstanceInput = z.infer<typeof transitionInstanceSchema>;
export type InstanceQuery = z.infer<typeof instanceQuerySchema>;
export type CreateHistoryInput = z.infer<typeof createHistorySchema>;
export type workflowId = z.infer<typeof workflowIdSchema>;
export type stageId = z.infer<typeof stageIdSchema>;
export type transistionId = z.infer<typeof transitionIdSchema>;
export type instanceId = z.infer<typeof instanceIdSchema>;
export type WorkflowFilterInput = z.infer<typeof workflowFilterSchema>;
export type MoveInstanceInput = z.infer<typeof moveInstanceSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
export type CreateFullWorkflowInput = z.infer<typeof createFullWorkflowSchema>;
//# sourceMappingURL=workflow.types.d.ts.map