import { z } from "zod";

/* =====================
   COMMON
===================== */

export const zUUID = z.string().uuid("Invalid UUID");
export const zUUIDOptional = z.uuid().optional();
export const zJson = z.unknown();

/* =====================
   ENUMS (Industry-grade)
===================== */

export const TriggerStrategyEnum = z.enum([
  "ANY_ALLOWED", // any allowed role/user
  "ALL_ALLOWED", // all allowed role/users must agree
  "CREATOR_ONLY", // workflow initiator
  "ASSIGNEE_ONLY", // current assignee
  "APPROVER_ONLY", // approval authority
  "SYSTEM_ONLY", // automation / system
]);

export const TransitionTypeEnum = z.enum([
  "NORMAL", // manual move
  "APPROVAL", // approval-gated
  "SEND_BACK", // rollback / correction
  "REVIEW", // no stage change
  "AUTO", // system triggered
]);

export const ApprovalStrategyEnum = z.enum(["ALL", "ANY", "MAJORITY"]);

export const CategoryEnum = z.enum([
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
  .refine(
    (v) => v.roleIds.length > 0 || v.userIds.length > 0,
    "Each approval level must define at least one role or user"
  );

const approvalConfigSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("PARALLEL"),
    levels: z.array(approvalLevelSchema).min(1),
  }),
  z.object({
    mode: z.literal("SEQUENTIAL"),
    levels: z.array(approvalLevelSchema).min(1),
  }),
]);

/* =====================
   TRANSITION (Industry-safe)
===================== */

export const transitionSchema = z
  .object({
    label: z.string().optional(),

    fromStageId: zUUID,
    toStageId: zUUID,

    transitionType: TransitionTypeEnum,
    triggerStrategy: TriggerStrategyEnum.default("ANY_ALLOWED"),

    approvalStrategy: ApprovalStrategyEnum.optional(),
    approvalConfig: approvalConfigSchema.optional().nullable(),

    autoTrigger: z.boolean().default(false),
    condition: zJson.optional(),
    metadata: zJson.optional(),

    allowedRoleIds: z.array(zUUID).default([]),
    allowedUserIds: z.array(zUUID).default([]),
  })
  .superRefine((t, ctx) => {
    /* ---------- REVIEW ---------- */
    if (t.transitionType === "REVIEW" && t.fromStageId !== t.toStageId) {
      ctx.addIssue("REVIEW transition must be a self-loop");
    }

    /* ---------- SEND BACK ---------- */
    if (t.transitionType === "SEND_BACK" && t.fromStageId === t.toStageId) {
      ctx.addIssue("SEND_BACK cannot be a self-loop");
    }

    /* ---------- AUTO ---------- */
    if (t.transitionType === "AUTO") {
      if (t.triggerStrategy !== "SYSTEM_ONLY") {
        ctx.addIssue("AUTO transitions must use SYSTEM_ONLY trigger strategy");
      }

      if (!t.condition) {
        ctx.addIssue("AUTO transitions must define a condition");
      }

      if (t.allowedRoleIds.length || t.allowedUserIds.length) {
        ctx.addIssue("AUTO transitions cannot have users or roles");
      }
    }

    if (t.triggerStrategy === "SYSTEM_ONLY" && t.transitionType !== "AUTO") {
      ctx.addIssue("SYSTEM_ONLY trigger is valid only for AUTO transitions");
    }

    /* ---------- APPROVER ONLY ---------- */
    if (
      t.triggerStrategy === "APPROVER_ONLY" &&
      t.transitionType !== "APPROVAL"
    ) {
      ctx.addIssue("APPROVER_ONLY is valid only for APPROVAL transitions");
    }

    /* ---------- APPROVAL ---------- */
    if (t.transitionType === "APPROVAL") {
      if (!t.approvalStrategy || !t.approvalConfig) {
        ctx.addIssue(
          "APPROVAL transitions require approvalStrategy and approvalConfig"
        );
      }

      const { mode, levels } = t.approvalConfig ?? {};
      if (!levels?.length) {
        ctx.addIssue("Approval transitions must define approval levels");
      }

      if (mode === "SEQUENTIAL") {
        if (!levels || levels.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Sequential approval requires approval levels",
          });
          return;
        }

        const orders = levels.map((l) => l.order);
        const sorted = [...orders].sort((a, b) => a - b);

        if (orders.some((o, i) => o !== sorted[i])) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Sequential approval levels must be strictly ordered",
          });
        }
      }
    }

    if (t.transitionType !== "APPROVAL") {
      if (t.approvalConfig || t.approvalStrategy) {
        ctx.addIssue(
          "Approval fields are allowed only for APPROVAL transitions"
        );
      }
    }

    /* ---------- TRIGGER STRATEGY SAFETY ---------- */
    // if (
    //   (t.triggerStrategy === "ANY_ALLOWED" ||
    //     t.triggerStrategy === "ALL_ALLOWED") &&
    //   !t.allowedRoleIds.length &&
    //   !t.allowedUserIds.length
    // ) {
    //   ctx.addIssue(`${t.triggerStrategy} requires at least one role or user`);
    // }
    if (
      (t.triggerStrategy === "ANY_ALLOWED" ||
        t.triggerStrategy === "ALL_ALLOWED") &&
      t.transitionType !== "APPROVAL" && // approval uses approvers instead
      !t.allowedRoleIds.length &&
      !t.allowedUserIds.length
    ) {
      ctx.addIssue(`${t.triggerStrategy} requires at least one role or user`);
    }
  });

/* =====================
   WORKFLOW GRAPH
===================== */

export const createFullWorkflowSchema = z
  .object({
    publish: z.boolean().optional(),

    stages: z.array(
      z.object({
        tempId: z.string().min(1, "Stage tempId is required"),
        name: z.string().min(1),
        isInitial: z.boolean(),
        isFinal: z.boolean(),
        order: z.number().int().nonnegative(),
        category: CategoryEnum,
        allowedNextCategories: z.array(CategoryEnum).default([]),
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
    /* ---------- INITIAL / FINAL ---------- */
    const initial = data.stages.filter((s) => s.isInitial);
    const finals = data.stages.filter((s) => s.isFinal);

    if (initial.length !== 1) {
      ctx.addIssue("Exactly one initial stage is required");
    }

    if (!finals.length) {
      ctx.addIssue("At least one final stage is required");
    }

    for (const s of data.stages) {
      if (s.isInitial && s.isFinal) {
        ctx.addIssue("Stage cannot be both initial and final");
      }
    }

    /* ---------- UNIQUE STAGE NAMES ---------- */
    const names = data.stages.map((s) => s.name.trim().toLowerCase());
    if (names.length !== new Set(names).size) {
      ctx.addIssue("Stage names must be unique");
    }

    /* ---------- TRANSITION REFERENCES ---------- */
    const stageIds = new Set(data.stages.map((s) => s.tempId));

    for (const t of data.transitions) {
      if (!stageIds.has(t.fromStageId)) {
        ctx.addIssue(
          `Transition fromStageId "${t.fromStageId}" does not exist`
        );
      }
      if (!stageIds.has(t.toStageId)) {
        ctx.addIssue(`Transition toStageId "${t.toStageId}" does not exist`);
      }
    }
  });

/* =====================
   WORKFLOW DEFINITION
===================== */

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
