export interface Workflow {
  id: string;
  name: string;
  code: string;
  version: number;
  resource: string;
  description?: string;
  isActive: boolean;
  createdAt: string;

  publish?: boolean;         // true => Published, false/undefined => Draft
  status?: "DRAFT" | "PUBLISHED" | string; // optional if backend sends status
}

export interface WorkflowListResponse {
  data: Workflow[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Stage {
  id: string;
  name: string;
  code: string;
  workflowId: string;
  order: number;
  isInitial: boolean;
  isFinal: boolean;
  color?: string | null;
}

export interface Transition {
  id: string;
  label?: string | null;
  workflowId: string;
  fromStageId: string;
  toStageId: string;
  allowedUserIds?: string[];
  allowedRoleIds?: string[];
}

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  resourceType: string;
  resourceId: string;
  currentStageId: string;
  createdAt: string;
  updatedAt: string;
  endedAt?: string | null;
}

import { z } from "zod";

export const zUUID = z.uuid("Invalid UUID");

export const zUUIDOptional = z.uuid().optional();

export const zJson = z.any();


const nameSchema = z
  .string({ message: "Module name is required" })
  .min(2, { message: "Module name must be at least 2 characters long" })
  .max(50, { message: "Module name cannot exceed 50 characters" });

const descriptionSchema = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((val) => {
    if (val === undefined || val === null) return null;
    const t = (val as string).trim();
    return t.length === 0 ? null : t;
  })
  .default(null);
/* -------------------------------------------------------------------------- */
/*                         WORKFLOW DEFINITION SCHEMAS                        */
/* -------------------------------------------------------------------------- */

export const createWorkflowSchema = z.object({
  name: nameSchema, 
  resourceId: z.uuid(),
  description: descriptionSchema,
  isActive: z.boolean().optional().default(true),
});

export const updateWorkflowSchema = createWorkflowSchema.partial().extend({
isActive: z.boolean().optional(),
code: z.string().optional(),
version: z.number().int().positive().optional(),
});


export const workflowIdSchema = z.object({
  workflowId: zUUID,
});


export const workflowQuerySchema = z.object({
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  resource: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(20),
});

/* -------------------------------------------------------------------------- */
/*                                STAGE SCHEMAS                               */
/* -------------------------------------------------------------------------- */

export const createStageSchema = z.object({
  workflowId: zUUID,
  name: z.string().min(1),
  order: z.number().int().nonnegative().default(0),
  color: z.string().optional(),
  isInitial: z.boolean().default(false),
  isFinal: z.boolean().default(false),
  metadata: zJson.optional(),
});

export const stageIdSchema = z.object({
  stageId: zUUID,
});

export const createStagesSchema = z.array(createStageSchema);

export const updateStageSchema = z.object({
  name: z.string().optional(),
  order: z.number().int().nonnegative().optional(),
  color: z.string().optional(),
  isInitial: z.boolean().optional(),
  isFinal: z.boolean().optional(),
  metadata: z.any().optional(),
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
  condition: z.any().optional(),
  requiresApproval: z.boolean().optional(),
  autoTrigger: z.boolean().optional(),
  metadata: z.any().optional(),
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

export const workflowFilterSchema = z.object({
  search: z.string().optional(),
  resource: z.string().optional(),
  status: z.enum(["all", "active", "inactive"]).optional(),
  skip: z.number().optional().default(0),
  take: z.number().optional().default(10),
});

/* =====================
   APPROVAL SCHEMAS
===================== */
export const TriggerStrategyEnum = z.enum([
  "ANY_ALLOWED",
  "ALL_ALLOWED",
  "CREATOR_ONLY",
  "ASSIGNEE_ONLY",
  "APPROVER_ONLY",
  "SYSTEM_ONLY",
]);


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

export const TransitionTypeEnum = z.enum([
  "NORMAL",
  "APPROVAL",
  "SEND_BACK",
  "REVIEW",
  "AUTO",
]);

export const ApprovalStrategyEnum = z.enum(["ALL", "ANY", "MAJORITY"]);

/* ----------------------------------
   APPROVAL
---------------------------------- */

const approvalLevelSchema = z
  .object({
    order: z.number().int().positive(),
    roleIds: z.array(zUUID).default([]),
    userIds: z.array(zUUID).default([]),
  })
  .refine((v) => v.roleIds.length || v.userIds.length, {
    message: "Each approval level must have at least one role or user",
  });

const approvalConfigSchema = z.object({
  mode: z.enum(["PARALLEL", "SEQUENTIAL"]),
  levels: z.array(approvalLevelSchema).optional(),
});

/* ----------------------------------
   TRANSITION
---------------------------------- */

export const transitionSchema = z
  .object({
    label: z.string().optional(),

    fromStageId: zUUID,
    toStageId: zUUID,

    transitionType: TransitionTypeEnum,

    /** 🔥 NEW */
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
    /* ---------------- SELF LOOP RULES ---------------- */

    if (
      t.fromStageId === t.toStageId &&
      !["REVIEW", "AUTO"].includes(t.transitionType)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only REVIEW or AUTO transitions may be self-loops",
        path: ["transitionType"],
      });
    }

    if (t.transitionType === "REVIEW" && t.fromStageId !== t.toStageId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "REVIEW transition must be a self-loop",
        path: ["toStageId"],
      });
    }

    /* ---------------- TRIGGER STRATEGY RULES ---------------- */

    if (t.transitionType === "AUTO" && t.triggerStrategy !== "SYSTEM_ONLY") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "AUTO transitions must use SYSTEM_ONLY trigger strategy",
        path: ["triggerStrategy"],
      });
    }

    if (
      t.triggerStrategy === "SYSTEM_ONLY" &&
      t.transitionType !== "AUTO"
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SYSTEM_ONLY trigger strategy is only valid for AUTO transitions",
        path: ["triggerStrategy"],
      });
    }

    if (
      t.triggerStrategy === "APPROVER_ONLY" &&
      t.transitionType !== "APPROVAL"
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "APPROVER_ONLY trigger strategy is only valid for APPROVAL transitions",
        path: ["triggerStrategy"],
      });
    }

    /* ---------------- APPROVAL ---------------- */

    if (t.transitionType === "APPROVAL") {
      if (!t.approvalConfig) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "approvalConfig is required for APPROVAL transitions",
        });
      }

      if (!t.approvalStrategy) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "approvalStrategy is required for APPROVAL transitions",
        });
      }

      if (
        t.approvalStrategy === "MAJORITY" &&
        t.approvalConfig?.mode === "SEQUENTIAL"
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "MAJORITY strategy is only allowed for PARALLEL approvals",
          path: ["approvalStrategy"],
        });
      }

      /* 🔥 PARALLEL = ONE LEVEL ONLY */
      if (
        t.approvalConfig?.mode === "PARALLEL" &&
        t.approvalConfig.levels &&
        t.approvalConfig.levels.length > 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PARALLEL approval supports only one level",
          path: ["approvalConfig.levels"],
        });
      }

      /* 🔥 MAJORITY needs at least 2 approvers */
      if (
        t.approvalStrategy === "MAJORITY" &&
        t.approvalConfig?.mode === "PARALLEL"
      ) {
        const level = t.approvalConfig.levels?.[0];
        const count =
          (level?.roleIds.length ?? 0) +
          (level?.userIds.length ?? 0);

        if (count < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "MAJORITY approval requires at least 2 approvers",
            path: ["approvalStrategy"],
          });
        }
      }
    }

    /* ---------------- AUTO ---------------- */

    if (
      t.transitionType === "AUTO" &&
      (t.allowedRoleIds.length || t.allowedUserIds.length)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "AUTO transitions cannot have users or roles",
      });
    }

    /* ---------------- NON-APPROVAL ---------------- */

    if (t.transitionType !== "APPROVAL") {
      if (t.approvalConfig) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "approvalConfig only allowed for APPROVAL transitions",
        });
      }

      if (t.approvalStrategy) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "approvalStrategy only allowed for APPROVAL transitions",
        });
      }
    }
  });


/* ----------------------------------
   WORKFLOW GRAPH (FRONTEND)
---------------------------------- */

export const createFullWorkflowSchema = z
  .object({
    publish: z.boolean().optional(), // ✅ backend-compatible

    stages: z.array(
      z.object({
        tempId: z.string().optional(),
        name: z.string().min(1, "Stage name required"),
        isInitial: z.boolean(),
        isFinal: z.boolean(),
        order: z.number().int().nonnegative(),
        category: CategoryEnum,
        color: z.string().optional(),
        metadata: zJson.optional(),
      })
    ),

    transitions: z.array(transitionSchema).default([]),
  })
  .superRefine((data, ctx) => {
    const initial = data.stages.filter((s) => s.isInitial);
    const finals = data.stages.filter((s) => s.isFinal);

    /* EXACTLY ONE INITIAL */
    if (initial.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Exactly one initial stage is required",
        path: ["stages"],
      });
    }

    /* AT LEAST ONE FINAL */
    if (!finals.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one final stage is required",
        path: ["stages"],
      });
    }

    /* INITIAL ≠ FINAL */
    for (const s of data.stages) {
      if (s.isInitial && s.isFinal) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "A stage cannot be both initial and final",
          path: ["stages"],
        });
      }
    }

    /* UNIQUE STAGE NAMES */
    const names = data.stages.map((s) => s.name);
    if (names.length !== new Set(names).size) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Stage names must be unique",
        path: ["stages"],
      });
    }
  });

/* -------------------------------------------------------------------------- */
/*                                TYPE EXPORTS                                */
/* -------------------------------------------------------------------------- */

export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
export type WorkflowQuery = z.infer<typeof workflowQuerySchema>;

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
export type CreateFullWorkflowInput = z.infer<typeof createFullWorkflowSchema>;



