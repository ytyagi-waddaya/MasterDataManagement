import { z } from "zod";

export const zUUID = z.uuid("Invalid UUID");

export const zUUIDOptional = z.uuid().optional();

export const zJson = z.any();

/* -------------------------------------------------------------------------- */
/*                         WORKFLOW DEFINITION SCHEMAS                        */
/* -------------------------------------------------------------------------- */

export const createWorkflowSchema = z.object({
  name: z.string().min(1),
  resourceId: zUUID,
  description: z.string().optional(),
});

export const updateWorkflowSchema = createWorkflowSchema.partial().extend({
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

export const createStageSchema = z.object({
  workflowId: zUUID,
  name: z.string().min(1),
  order: z.number().int().nonnegative().default(0),
  color: z.string().optional(),
  isInitial: z.boolean().default(false),
  isFinal: z.boolean().default(false),
  metadata: zJson.optional(),
  category: z.enum([
  "DRAFT",
  "SUBMITTED",
  "NORMAL",
  "UNDER_REVIEW",
  "APPROVAL",
  "CORRECTION",
  "ON_HOLD",
  "REJECTED",
  "COMPLETED"
]).default("NORMAL"),

});

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
  category: z.enum([
  "DRAFT",
  "SUBMITTED",
  "NORMAL",
  "UNDER_REVIEW",
  "APPROVAL",
  "CORRECTION",
  "ON_HOLD",
  "REJECTED",
  "COMPLETED"
]).default("NORMAL"),

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


  ///////////////////////////////////////////////
  export const createFullWorkflowSchema = z.object({
  name: z.string().min(1, "Workflow name is required"),
  resourceId: zUUID,
  description: z.string().optional(),

  stages: z.array(
    z.object({
      name: z.string().min(1, "Stage name required"),
      isInitial: z.boolean().default(false),
      isFinal: z.boolean().default(false),
      order: z.number().int().nonnegative().default(0),
      color: z.string().optional(),
      metadata: zJson.optional(),
      category: z.enum([
      "DRAFT",
      "SUBMITTED",
      "NORMAL",
      "UNDER_REVIEW",
      "APPROVAL",
      "CORRECTION",
      "ON_HOLD",
      "REJECTED",
      "COMPLETED"
    ]).default("NORMAL"),
  })
  ).min(1, "At least one stage is required"),

  transitions: z.array(
    z.object({
      label: z.string().optional(),
      fromStageIndex: z.number().int().nonnegative(),
      toStageIndex: z.number().int().nonnegative(),

      allowedRoleIds: z.array(z.string()).default([]),
      allowedUserIds: z.array(z.string()).default([]),

      condition: zJson.optional(),
      requiresApproval: z.boolean().default(false),
      autoTrigger: z.boolean().default(false),
      metadata: zJson.optional(),
    })
  ).optional().default([]),
});


// export const createTaskSchema = z.object({
//   workflowInstanceId: zUUID,
//   stageId: zUUID,
//   masterRecordId: zUUID,

//   currentStep: zJson.default({}),
//   status: z.enum(["Pending", "InProgress", "Completed"]).default("Pending"),

//   assignedToId: zUUIDOptional,
// });

// export const updateTaskSchema = z.object({
//   taskId: zUUID,
//   currentStep: zJson.optional(),
//   status: z.enum(["Pending", "InProgress", "Completed"]).optional(),

//   assignedToId: zUUIDOptional,
// });

// export const createTaskAssignmentSchema = z.object({
//   taskId: zUUID,
//   userId: zUUID,
// });


// export const taskQuerySchema = z.object({
//   workflowInstanceId: zUUID.optional(),
//   stageId: zUUID.optional(),
//   status: z.enum(["Pending", "InProgress", "Completed"]).optional(),
//   page: z.number().int().positive().default(1),
//   limit: z.number().int().positive().default(20),
// });


/* -------------------------------------------------------------------------- */
/*                                TYPE EXPORTS                                */
/* -------------------------------------------------------------------------- */


export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
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


