import { z } from "zod";

export const zUUID = z.uuid("Invalid UUID");

export const zUUIDOptional = z.uuid().optional();

export const zJson = z.any();

const TriggerStrategyEnum = z.enum([
  "ANY_ALLOWED",
  "ALL_ALLOWED",
  "CREATOR_ONLY",
  "ASSIGNEE_ONLY",
  "APPROVER_ONLY",
  "SYSTEM_ONLY",
]);

const TransitionTypeEnum = z.enum([
  "NORMAL",
  "APPROVAL",
  "SEND_BACK",
  "REVIEW",
  "AUTO",
]);

const ApprovalStrategyEnum = z.enum(["ALL", "ANY", "MAJORITY"]);

const CategoryEnum = z.enum([
  "DRAFT",
  "SUBMITTED",
  "NORMAL",
  "UNDER_REVIEW",
  "APPROVAL",
  "CORRECTION",
  "ON_HOLD",
  "REJECTED",
  "COMPLETED",
]);


/* =====================
   APPROVAL
===================== */

const approvalLevelSchema = z
  .object({
    order: z.number().int().positive(),
    roleIds: z.array(zUUID).default([]),
    userIds: z.array(zUUID).default([]),
  })
  .refine(v => v.roleIds.length || v.userIds.length, {
    message: "Each approval level must have at least one role or user",
  });

const approvalConfigSchema = z.object({
  mode: z.enum(["PARALLEL", "SEQUENTIAL"]),
  levels: z.array(approvalLevelSchema).optional(),
});



/* =====================
   TRANSITION
===================== */

export const transitionSchema = z
  .object({
    label: z.string().optional(),

    fromStageId: zUUID,
    toStageId: zUUID,

    transitionType: TransitionTypeEnum,

    /** ✅ REQUIRED FOR BACKEND */
    triggerStrategy: TriggerStrategyEnum.default("ANY_ALLOWED"),

    approvalStrategy: ApprovalStrategyEnum.optional(),
    approvalConfig: approvalConfigSchema.optional(),

    autoTrigger: z.boolean().default(false),
    condition: zJson.optional(),
    metadata: zJson.optional(),

    allowedRoleIds: z.array(zUUID).default([]),
    allowedUserIds: z.array(zUUID).default([]),
  })
  .superRefine((t, ctx) => {
    /* ---------------- REVIEW ---------------- */
    if (t.transitionType === "REVIEW" && t.fromStageId !== t.toStageId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "REVIEW transition must be a self-loop",
      });
    }

    /* ---------------- AUTO SAFETY ---------------- */
    if (t.transitionType === "AUTO") {
      if (t.triggerStrategy !== "SYSTEM_ONLY") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "AUTO transitions must use SYSTEM_ONLY trigger strategy",
        });
      }

      if (t.allowedRoleIds.length || t.allowedUserIds.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "AUTO transitions cannot have users or roles",
        });
      }
    }

    if (
      t.triggerStrategy === "SYSTEM_ONLY" &&
      t.transitionType !== "AUTO"
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SYSTEM_ONLY trigger strategy is only valid for AUTO transitions",
      });
    }

    /* ---------------- APPROVER_ONLY ---------------- */
    if (
      t.triggerStrategy === "APPROVER_ONLY" &&
      t.transitionType !== "APPROVAL"
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "APPROVER_ONLY trigger strategy is only valid for APPROVAL transitions",
      });
    }

    /* ---------------- APPROVAL ---------------- */
    if (t.transitionType === "APPROVAL") {
      if (!t.approvalConfig || !t.approvalStrategy) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "APPROVAL transitions require approvalConfig and approvalStrategy",
        });
      }
    }

    /* ---------------- NON-APPROVAL ---------------- */
    if (t.transitionType !== "APPROVAL") {
      if (t.approvalConfig || t.approvalStrategy) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Approval fields are only allowed for APPROVAL transitions",
        });
      }
    }
  });


/* =====================
   WORKFLOW SCHEMA
===================== */

export const createFullWorkflowSchema = z
  .object({
    publish: z.boolean().optional(),

    stages: z.array(
      z.object({
        tempId: z.string().optional(),
        name: z.string().min(1),
        isInitial: z.boolean(),
        isFinal: z.boolean(),
        order: z.number().int().nonnegative(),
        category: CategoryEnum,
        color: z.string().optional(),
        metadata: zJson.optional(),
        position: z
          .object({
            x: z.number(),
            y: z.number(),
          })
          .optional(),
      })
    ),

    transitions: z.array(transitionSchema).default([]),
  })
  .superRefine((data, ctx) => {
    const initial = data.stages.filter(s => s.isInitial);
    const finals = data.stages.filter(s => s.isFinal);

    if (initial.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Exactly one initial stage is required",
      });
    }

    if (!finals.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one final stage is required",
      });
    }

    for (const s of data.stages) {
      if (s.isInitial && s.isFinal) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Stage cannot be both initial and final",
        });
      }
    }
  });


/* -------------------------------------------------------------------------- */
/*                         WORKFLOW DEFINITION SCHEMAS                        */
/* -------------------------------------------------------------------------- */

export const createWorkflowDefinitionSchema = z.object({
  name: z.string().min(1, "Workflow name is required"),
  resourceId: zUUID,
  description: z.string().optional(),
});

export const updateWorkflowSchema = createWorkflowDefinitionSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
    code: z.string().optional(),
    version: z.number().int().positive().optional(),
  });

export const workflowIdSchema = z.object({
  workflowId: zUUID,
});

/* -------------------------------------------------------------------------- */
/*                                STAGE SCHEMAS                               */
/* -------------------------------------------------------------------------- */

export const categoryEnum = z.enum([
  "DRAFT",
  "SUBMITTED",
  "NORMAL",
  "UNDER_REVIEW",
  "APPROVAL",
  "CORRECTION",
  "ON_HOLD",
  "REJECTED",
  "COMPLETED",
]);

export const createStageSchema = z.object({
  workflowId: zUUID,

  name: z.string().min(1, "Stage name is required"),

  order: z.number().int().nonnegative().default(0),

  color: z.string().nullable().optional(),

  isInitial: z.boolean().default(false),
  isFinal: z.boolean().default(false),

  category: categoryEnum.default("NORMAL"),

  /** ✅ NEW — category-based governance */
  allowedNextCategories: z.array(categoryEnum).default([]),

  metadata: zJson.nullable().optional(),
});

export type ApprovalConfig = {
  mode: "SEQUENTIAL" | "PARALLEL";

  // SEQUENTIAL
  levels?: Array<{
    roleId?: string;
    userId?: string;
    required?: boolean; // default true
  }>;

  // PARALLEL
  approvers?: Array<{
    roleId?: string;
    userId?: string;
  }>;
  strategy?: "ALL" | "ANY"; // default ALL

  onReject?: "STOP" | "SEND_BACK" | "PREVIOUS_STAGE";
};

export const stageIdSchema = z.object({
  stageId: zUUID,
});

export const createStagesSchema = z.array(createStageSchema);

export const updateStageSchema = z.object({
  stageId: z.uuid(),
  name: z.string().optional(),
  order: z.number().int().nonnegative().optional(),
  color: z.string().optional(),
  isInitial: z.boolean().optional(),
  isFinal: z.boolean().optional(),
  metadata: zJson.optional(),
  category: z
    .enum([
      "DRAFT",
      "SUBMITTED",
      "NORMAL",
      "UNDER_REVIEW",
      "APPROVAL",
      "CORRECTION",
      "ON_HOLD",
      "REJECTED",
      "COMPLETED",
    ])
    .default("NORMAL"),
});

/** BULK REORDER STAGES */
export const reorderStagesSchema = z.object({
  stages: z.array(
    z.object({
      id: zUUID,
      order: z.number().int().nonnegative(),
    })
  ),
});

/* -------------------------------------------------------------------------- */
/*                             TRANSITION SCHEMAS                              */
/* -------------------------------------------------------------------------- */

export const createTransitionSchema = z.object({
  workflowId: zUUID,
  fromStageId: zUUID,
  toStageId: zUUID,
  label: z.string().optional(),
  allowedRoleIds: z.array(z.string()).default([]),
  allowedUserIds: z.array(z.string()).default([]),
  condition: zJson.optional(),
  requiresApproval: z.boolean().default(false),
  autoTrigger: z.boolean().default(false),
  metadata: zJson.optional(),
});

export const updateTransitionSchema = z.object({
  label: z.string().optional(),
  allowedRoleIds: z.array(z.string()).optional(),
  allowedUserIds: z.array(z.string()).optional(),
  condition: zJson.optional(),
  requiresApproval: z.boolean().optional(),
  autoTrigger: z.boolean().optional(),
  metadata: zJson.optional(),
});

export const transitionIdSchema = z.object({
  transitionId: zUUID,
});

/* -------------------------------------------------------------------------- */
/*                         WORKFLOW INSTANCE SCHEMAS                          */
/* -------------------------------------------------------------------------- */

export const createInstanceSchema = z.object({
  workflowCode: z.string().optional(),
  workflowId: zUUID.optional(),
  resourceType: z.string().min(1),
  resourceId: z.string().min(1),
  createdById: zUUIDOptional,
  context: zJson.optional(),

  operationId: z.string().uuid().optional(),
});

export const transitionInstanceSchema = z.object({
  instanceId: zUUID,
  targetStageId: zUUID.optional(),
  targetStageCode: z.string().optional(),
  actorId: zUUID,
  actionLabel: z.string().optional(),
  notes: z.string().optional(),
  context: zJson.optional(),
});

export const instanceQuerySchema = z.object({
  resourceType: z.string().optional(),
  resourceId: z.string().optional(),
  status: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(20),
});

export const instanceIdSchema = z.object({
  instanceId: zUUID,
});

export const moveInstanceSchema = z.object({
  instanceId: z.string(),
  toStageId: z.string(),
  notes: z.string().optional(),
  metadata: z.any().optional(),
  performedById: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/*                            WORKFLOW HISTORY SCHEMAS                        */
/* -------------------------------------------------------------------------- */

export const createHistorySchema = z.object({
  workflowInstanceId: zUUID,
  fromStageId: zUUIDOptional,
  toStageId: zUUID,
  performedById: zUUIDOptional,
  notes: z.string().optional(),
  actionLabel: z.string().optional(),
  metadata: zJson.optional(),
});

/* -------------------------------------------------------------------------- */
/*                                WORKFLOW FILTER                             */
/* -------------------------------------------------------------------------- */

export const allowedSortColumns = [
  "name",
  "description",
  "isSystem",
  "isActive",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
] as const;

export const workflowFilterSchema = z
  .object({
    skip: z.coerce.number().int().min(0).default(0),
    take: z.coerce.number().int().min(1).max(100).default(10),

    isActive: z.enum(["all", "active", "inactive"]).default("all"),

    search: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v?.length ? v : undefined)),

    name: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v?.length ? v : undefined)),

    createdFrom: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date format"),

    createdTo: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date format"),

    sortBy: z.enum(allowedSortColumns).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict();

/* -------------------------------------------------------------------------- */
/*                                TYPE EXPORTS                                */
/* -------------------------------------------------------------------------- */

export type CreateWorkflowDefinitionInput = z.infer<
  typeof createWorkflowDefinitionSchema
>;
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
