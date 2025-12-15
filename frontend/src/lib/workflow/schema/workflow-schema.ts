export interface Workflow {
  id: string;
  name: string;
  code: string;
  version: number;
  resource: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
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
