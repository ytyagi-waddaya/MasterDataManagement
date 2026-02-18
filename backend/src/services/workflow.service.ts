import {
  ApprovalStrategy,
  AuditAction,
  AuditEntity,
  Category,
  HistoryAction,
  PerformedByType,
  Prisma,
  TransitionType,
  TriggerStrategy,
  WorkflowInstanceStatus,
  WorkflowStage,
} from "../../prisma/generated/client.js";
import workflowRepository from "../repositories/workflow.repository.js";
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "../utils/appError.js";
import { createAuditLog } from "../utils/auditLog.js";
import { ActorMeta } from "../types/action.types.js";
import {
  CreateFullWorkflowInput,
  createFullWorkflowSchema,
  CreateInstanceInput,
  createInstanceSchema,
  CreateStagesInput,
  CreateWorkflowDefinitionInput,
  createWorkflowDefinitionSchema,
  MoveInstanceInput,
  moveInstanceSchema,
  stageId,
  stageIdSchema,
  transistionId,
  UpdateStageInput,
  UpdateWorkflowInput,
  updateWorkflowSchema,
  WorkflowFilterInput,
  workflowFilterSchema,
  workflowId,
  workflowIdSchema,
} from "../types/workflow.types.js";
import {
  generateStageCode,
  generateWorkflowCodeAndVersion,
} from "../utils/workflowCode.js";
import { prisma } from "../lib/prisma.js";
import { validateWorkflowGraph } from "../utils/workflowGraph.js";
import { OutboxService } from "../outbox/outbox.service.js";

const WorkflowService = {
  // createFullWorkflow: async (
  //   data: {
  //     name: string;
  //     description?: string;
  //     resourceId: string;
  //     stages: CreateStagesInput;
  //     transitions: any[];
  //   },
  //   meta?: ActorMeta
  // ) => {
  //   const actorId = meta?.actorId;
  //   if (!actorId) throw new BadRequestException("Actor ID is required.");

  //   const validated = createWorkflowSchema.parse({
  //     name: data.name,
  //     description: data.description,
  //     resourceId: data.resourceId,
  //   });

  //   // Validate resource
  //   const resource = await prisma.resource.findUnique({
  //     where: { id: validated.resourceId },
  //   });
  //   if (!resource) throw new BadRequestException("Invalid resourceId.");

  //   // Prevent missing initial stage
  //   const hasInitial = data.stages.some((s) => s.isInitial);
  //   if (!hasInitial)
  //     throw new BadRequestException("At least one stage must be initial.");

  //   // Generate workflow code + version
  //   const { code, version } = await generateWorkflowCodeAndVersion(
  //     validated.name
  //   );

  //   // Prevent duplicate workflow
  //   const duplicate = await workflowRepository.findByCodeAndVersion(
  //     code,
  //     version
  //   );
  //   if (duplicate)
  //     throw new BadRequestException(
  //       "Workflow with this name/version already exists."
  //     );

  //   return prisma.$transaction(async (tx: any) => {
  //     /*
  //      * STEP 1 — Create Workflow
  //      */
  //     const workflow = await workflowRepository.createWorkflow(
  //       {
  //         name: validated.name,
  //         description: validated.description ?? null,
  //         resource: { connect: { id: validated.resourceId } },
  //         code,
  //         version,
  //         createdBy: { connect: { id: actorId } },
  //       },
  //       tx
  //     );

  //     await createAuditLog({
  //       userId: actorId,
  //       entity: AuditEntity.WORKFLOW,
  //       action: AuditAction.CREATE,
  //       comment: "Workflow created",
  //       after: workflow,
  //       ipAddress: meta?.ipAddress ?? null,
  //       userAgent: meta?.userAgent ?? null,
  //     });

  //     /*
  //      * STEP 2 — Create Stages
  //      */
  //     const createdStages: Record<string, string> = {};

  //     for (const stageInput of data.stages) {
  //       const { name } = stageInput;

  //       if (!name) throw new BadRequestException("Stage name is required");

  //       // Ensure stage name unique
  //       const dupName = await tx.workflowStage.findFirst({
  //         where: { workflowId: workflow.id, name },
  //       });
  //       if (dupName)
  //         throw new BadRequestException(`Stage "${name}" already exists`);

  //       // Ensure only one initial stage
  //       if (stageInput.isInitial) {
  //         const existingInitial = await tx.workflowStage.findFirst({
  //           where: { workflowId: workflow.id, isInitial: true },
  //         });
  //         if (existingInitial)
  //           throw new BadRequestException("Only one initial stage allowed.");
  //       }

  //       // Generate unique stage code
  //       const stageCode = await generateStageCode(workflow.id, name, tx);

  //       const dupCode = await workflowRepository.findByCode(
  //         workflow.id,
  //         stageCode,
  //         tx
  //       );
  //       if (dupCode)
  //         throw new BadRequestException(
  //           `Stage with code "${stageCode}" already exists`
  //         );

  //       const created = await workflowRepository.createStage(
  //         {
  //           ...stageInput,
  //           code: stageCode,
  //           workflowId: workflow.id,
  //         },
  //         tx
  //       );

  //       createdStages[name] = created.id;

  //       await createAuditLog({
  //         userId: actorId,
  //         entity: AuditEntity.WORKFLOW,
  //         action: AuditAction.CREATE,
  //         comment: `Stage created: ${created.name}`,
  //         after: created,
  //         ipAddress: meta?.ipAddress ?? null,
  //         userAgent: meta?.userAgent ?? null,
  //       });
  //     }

  //     /*
  //      * STEP 3 — Create Transitions
  //      */
  //     const createdTransitions = [];

  //     for (const t of data.transitions) {
  //       let fromStageId = createdStages[t.fromStageId] ?? t.fromStageId;
  //       let toStageId = createdStages[t.toStageId] ?? t.toStageId;

  //       // Validate source/target stages
  //       const fromStage = await workflowRepository.findByStageId(
  //         fromStageId,
  //         tx
  //       );
  //       if (!fromStage)
  //         throw new BadRequestException(`Invalid fromStageId: ${fromStageId}`);

  //       const toStage = await workflowRepository.findByStageId(toStageId, tx);
  //       if (!toStage)
  //         throw new BadRequestException(`Invalid toStageId: ${toStageId}`);

  //       // Prevent same-stage transition
  //       if (fromStageId === toStageId)
  //         throw new BadRequestException(
  //           "Transition cannot point to the same stage"
  //         );

  //       // Prevent outgoing transitions from final stage
  //       if (fromStage.isFinal)
  //         throw new BadRequestException(
  //           `Final stage "${fromStage.name}" cannot have outgoing transitions`
  //         );

  //       // Prevent duplicate transitions
  //       const duplicate = await tx.workflowTransition.findFirst({
  //         where: { workflowId: workflow.id, fromStageId, toStageId },
  //       });
  //       if (duplicate)
  //         throw new BadRequestException(
  //           `Transition from "${fromStage.name}" → "${toStage.name}" already exists`
  //         );

  //       const createdTransition = await workflowRepository.createTransition(
  //         {
  //           ...t,
  //           fromStageId,
  //           toStageId,
  //           workflowId: workflow.id,
  //         },
  //         tx
  //       );

  //       createdTransitions.push(createdTransition);

  //       await createAuditLog({
  //         userId: actorId,
  //         entity: AuditEntity.WORKFLOW,
  //         action: AuditAction.CREATE,
  //         comment: `Transition created: ${t.label ?? ""}`,
  //         after: createdTransition,
  //         ipAddress: meta?.ipAddress ?? null,
  //         userAgent: meta?.userAgent ?? null,
  //       });
  //     }

  //     /*
  //      * STEP 4 — Validate Graph Structure
  //      */
  //     await validateWorkflowGraph(workflow.id, tx);

  //     return {
  //       workflow,
  //       stages: createdStages,
  //       transitions: createdTransitions,
  //     };
  //   });
  // },
  //////////////
  // saveWorkflowGraph: async (
  //   workflowId: string,
  //   data: {
  //     stages: Array<{
  //       tempId?: string;
  //       name: string;
  //       order: number;
  //       isInitial: boolean;
  //       isFinal: boolean;
  //       category: Category;
  //       color?: string;
  //       metadata?: any;
  //       allowedNextCategories?: Category[];
  //       position?: { x: number; y: number };
  //     }>;
  //     transitions: Array<{
  //       fromStageId: string;
  //       toStageId: string;
  //       label?: string;
  //       transitionType?: TransitionType;
  //       triggerStrategy?: TriggerStrategy;
  //       approvalStrategy?: ApprovalStrategy;
  //       autoTrigger?: boolean;
  //       condition?: any;
  //       metadata?: any;
  //       approvalConfig?: any;
  //       allowedRoleIds?: string[];
  //       allowedUserIds?: string[];
  //     }>;
  //   },
  //   meta?: ActorMeta
  // ) => {
  //   const actorId = meta?.actorId;
  //   if (!actorId) throw new BadRequestException("Actor ID is required");

  //   const workflow = await prisma.workflowDefinition.findUnique({
  //     where: { id: workflowId },
  //   });

  //   if (!workflow) throw new BadRequestException("Workflow not found");
  //   if (workflow.status !== "DRAFT") {
  //     throw new BadRequestException("Only DRAFT workflows can be edited");
  //   }

  //   /* ---------- BASIC STAGE VALIDATION ---------- */
  //   const initialStages = data.stages.filter((s) => s.isInitial);
  //   if (initialStages.length !== 1) {
  //     throw new BadRequestException("Exactly one initial stage is required");
  //   }

  //   const finalStages = data.stages.filter((s) => s.isFinal);
  //   if (!finalStages.length) {
  //     throw new BadRequestException("At least one final stage is required");
  //   }

  //   /* ---------- UNIQUE STAGE NAMES ---------- */
  //   const stageNames = data.stages.map((s) => s.name.trim().toLowerCase());
  //   if (stageNames.length !== new Set(stageNames).size) {
  //     throw new BadRequestException("Stage names must be unique");
  //   }

  //   return prisma.$transaction(async (tx) => {
  //     /* ---------- DELETE OLD GRAPH ---------- */
  //     await tx.workflowTransition.deleteMany({ where: { workflowId } });
  //     await tx.workflowStage.deleteMany({ where: { workflowId } });

  //     /* ---------- CREATE STAGES ---------- */
  //     const stageMap: Record<string, string> = {};

  //     for (const s of data.stages) {
  //       const stageCode = await generateStageCode(workflow.id, s.name, tx);

  //       const stage = await tx.workflowStage.create({
  //         data: {
  //           workflowId,
  //           name: s.name,
  //           code: stageCode,
  //           order: s.order,
  //           isInitial: s.isInitial,
  //           isFinal: s.isFinal,
  //           category: s.category,
  //           color: s.color ?? null,
  //           metadata: s.metadata ?? Prisma.JsonNull,
  //           position: s.position
  //             ? (s.position as Prisma.InputJsonValue)
  //             : Prisma.JsonNull,
  //           allowedNextCategories: s.allowedNextCategories ?? [],
  //         },
  //       });

  //       stageMap[s.tempId ?? s.name] = stage.id;
  //     }

  //     /* ---------- CREATE TRANSITIONS ---------- */
  //     for (const t of data.transitions) {
  //       const fromStageId = stageMap[t.fromStageId] ?? t.fromStageId;
  //       const toStageId = stageMap[t.toStageId] ?? t.toStageId;

  //       const transitionType = t.transitionType ?? "NORMAL";
  //       const triggerStrategy = t.triggerStrategy ?? "ANY_ALLOWED";

  //       /* ---------- TRIGGER STRATEGY RULES ---------- */
  //       if (transitionType === "AUTO" && triggerStrategy !== "SYSTEM_ONLY") {
  //         throw new BadRequestException(
  //           "AUTO transitions must use SYSTEM_ONLY trigger strategy"
  //         );
  //       }

  //       if (triggerStrategy === "SYSTEM_ONLY" && transitionType !== "AUTO") {
  //         throw new BadRequestException(
  //           "SYSTEM_ONLY trigger strategy is only valid for AUTO transitions"
  //         );
  //       }

  //       if (
  //         triggerStrategy === "APPROVER_ONLY" &&
  //         transitionType !== "APPROVAL"
  //       ) {
  //         throw new BadRequestException(
  //           "APPROVER_ONLY trigger strategy is only valid for APPROVAL transitions"
  //         );
  //       }

  //       /* ---------- REVIEW ---------- */
  //       if (transitionType === "REVIEW" && fromStageId !== toStageId) {
  //         throw new BadRequestException(
  //           "REVIEW transition must be a self-loop"
  //         );
  //       }

  //       /* ---------- AUTO ---------- */
  //       if (
  //         transitionType === "AUTO" &&
  //         (t.allowedRoleIds?.length || t.allowedUserIds?.length)
  //       ) {
  //         throw new BadRequestException(
  //           "AUTO transitions cannot have users or roles"
  //         );
  //       }

  //       /* ---------- APPROVAL ---------- */
  //       if (transitionType === "APPROVAL") {
  //         if (!t.approvalStrategy) {
  //           throw new BadRequestException(
  //             "approvalStrategy is required for APPROVAL transitions"
  //           );
  //         }

  //         if (!t.approvalConfig) {
  //           throw new BadRequestException(
  //             "approvalConfig is required for APPROVAL transitions"
  //           );
  //         }

  //         const config = t.approvalConfig;

  //         if (config.mode === "SEQUENTIAL") {
  //           if (!Array.isArray(config.levels) || !config.levels.length) {
  //             throw new BadRequestException(
  //               "Sequential approval requires approval levels"
  //             );
  //           }

  //           const orders = config.levels.map((l: any) => l.order);
  //           if (orders.length !== new Set(orders).size) {
  //             throw new BadRequestException(
  //               "Approval levels must have unique order"
  //             );
  //           }
  //         }

  //         if (config.mode === "PARALLEL") {
  //           const level = config.levels?.[0];
  //           const count =
  //             (level?.userIds?.length ?? 0) + (level?.roleIds?.length ?? 0);

  //           if (!count) {
  //             throw new BadRequestException(
  //               "Parallel approval requires users or roles"
  //             );
  //           }
  //         }
  //       }

  //       if (transitionType !== "APPROVAL" && t.approvalConfig) {
  //         throw new BadRequestException(
  //           "approvalConfig is only allowed for APPROVAL transitions"
  //         );
  //       }

  //       /* ---------- CREATE TRANSITION ---------- */
  //       const transitionData: Prisma.WorkflowTransitionCreateInput = {
  //         workflow: { connect: { id: workflow.id } },
  //         fromStage: { connect: { id: fromStageId } },
  //         toStage: { connect: { id: toStageId } },

  //         label: t.label ?? null,
  //         transitionType,
  //         triggerStrategy,

  //         approvalStrategy:
  //           transitionType === "APPROVAL" ? t.approvalStrategy ?? "ALL" : "ALL",

  //         autoTrigger: Boolean(t.autoTrigger),

  //         condition: t.condition ?? Prisma.JsonNull,
  //         metadata: t.metadata ?? Prisma.JsonNull,

  //         approvalConfig:
  //           transitionType === "APPROVAL"
  //             ? t.approvalConfig ?? Prisma.JsonNull
  //             : Prisma.JsonNull,
  //       };

  //       if (t.allowedRoleIds?.length) {
  //         transitionData.allowedRoles = {
  //           create: t.allowedRoleIds.map((roleId) => ({ roleId })),
  //         };
  //       }

  //       if (t.allowedUserIds?.length) {
  //         transitionData.allowedUsers = {
  //           create: t.allowedUserIds.map((userId) => ({ userId })),
  //         };
  //       }

  //       await tx.workflowTransition.create({ data: transitionData });
  //     }

  //     /* ---------- FINAL GRAPH VALIDATION ---------- */
  //     await validateWorkflowGraph(workflow.id, tx);

  //     return workflow;
  //   });
  // },
  saveWorkflowGraph: async (
    workflowId: string,
    data: CreateFullWorkflowInput,
    meta?: ActorMeta
  ) => {
    const actorId = meta?.actorId;
    if (!actorId) throw new BadRequestException("Actor ID is required");
    const normalized = {
      ...data,
      transitions: data.transitions.map((t: any) => ({
        ...t,
        approvalConfig: t.approvalConfig ?? undefined,
        approvalStrategy: t.approvalStrategy ?? undefined,
        allowedDepartmentIds: t.allowedDepartmentIds ?? [],
        allowedRoleIds: t.allowedRoleIds ?? [],
        allowedUserIds: t.allowedUserIds ?? [],
      })),
    };

    const validated = createFullWorkflowSchema.parse(normalized);

    // 🔒 Zod is the source of truth
    // const validated = createFullWorkflowSchema.parse(data);

    const workflow = await prisma.workflowDefinition.findUnique({
      where: { id: workflowId },
    });
    if (!workflow) throw new BadRequestException("Workflow not found");
    if (workflow.status !== "DRAFT") {
      throw new BadRequestException("Only DRAFT workflows can be edited");
    }

    return prisma.$transaction(async (tx) => {
      /* ---------- CLEAR OLD GRAPH ---------- */
      await tx.workflowTransition.deleteMany({ where: { workflowId } });
      await tx.workflowStage.deleteMany({ where: { workflowId } });

      /* ---------- CREATE STAGES ---------- */
      const stageMap = new Map<string, string>();

      for (const s of validated.stages) {
        const stage = await tx.workflowStage.create({
          data: {
            workflowId,
            name: s.name,
            code: await generateStageCode(workflowId, s.name, tx),
            order: s.order,
            isInitial: s.isInitial,
            isFinal: s.isFinal,
            category: s.category,
            color: s.color ?? null,
            metadata: s.metadata ?? Prisma.JsonNull,
            position: s.position ?? Prisma.JsonNull,
            allowedNextCategories: s.allowedNextCategories ?? [],
          },
        });

        stageMap.set(s.tempId, stage.id);
      }

      /* ---------- CREATE TRANSITIONS ---------- */
      for (const t of validated.transitions) {
        const fromStageId = stageMap.get(t.fromStageId);
        const toStageId = stageMap.get(t.toStageId);

        if (!fromStageId || !toStageId) {
          throw new BadRequestException("Transition references invalid stage");
        }

        await tx.workflowTransition.create({
          data: {
            workflowId,
            fromStageId,
            toStageId,
            label: t.label ?? null,
            transitionType: t.transitionType,
            triggerStrategy: t.triggerStrategy,
            approvalStrategy: t.approvalStrategy ?? "ALL",
            autoTrigger: t.autoTrigger,
            condition: t.condition ?? Prisma.JsonNull,
            metadata: t.metadata ?? Prisma.JsonNull,
            approvalConfig:
              t.transitionType === "APPROVAL"
                ? (t.approvalConfig as Prisma.InputJsonValue)
                : Prisma.JsonNull,
            allowedDepartments: {
              create: t.allowedDepartmentIds.map((departmentId) => ({
                departmentId,
              })),
            },

            allowedRoles: {
              create: t.allowedRoleIds.map((roleId) => ({ roleId })),
            },
            allowedUsers: {
              create: t.allowedUserIds.map((userId) => ({ userId })),
            },
          },
        });
      }

      /* ---------- FINAL GRAPH VALIDATION ---------- */
      await validateWorkflowGraph(workflowId, tx);

      return workflow;
    });
  },

  createWorkflow: async (
    data: CreateWorkflowDefinitionInput,
    meta?: ActorMeta
  ) => {
    const validatedData = createWorkflowDefinitionSchema.parse(data);

    const createdById = meta?.actorId;
    if (!createdById) {
      throw new BadRequestException("Actor ID is required");
    }

    const resourceExists = await prisma.resource.findUnique({
      where: { id: validatedData.resourceId },
    });

    if (!resourceExists) {
      throw new BadRequestException(
        "Invalid resourceId — resource does not exist."
      );
    }

    const { code, version } = await generateWorkflowCodeAndVersion(
      validatedData.name
    );

    const duplicate = await workflowRepository.findByCodeAndVersion(
      code,
      version
    );

    if (duplicate) {
      throw new BadRequestException(
        "Workflow with the same version already exists. Try again."
      );
    }

    const workflow = await workflowRepository.createWorkflow({
      name: validatedData.name,
      description: validatedData.description ?? null,

      resource: {
        connect: { id: validatedData.resourceId },
      },

      code,
      version,

      status: "DRAFT", // ✅ EXPLICIT
      isActive: false, // ✅ DRAFT should never be active

      createdBy: {
        connect: { id: createdById },
      },
    });

    await createAuditLog({
      userId: createdById,
      entity: AuditEntity.WORKFLOW,
      action: AuditAction.CREATE,
      comment: "Workflow created",
      after: workflow,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return workflow;
  },

  publishWorkflow: async (workflowId: string, meta?: ActorMeta) => {
    const actorId = meta?.actorId;
    if (!actorId) throw new BadRequestException("Actor ID is required");

    const workflow = await prisma.workflowDefinition.findUnique({
      where: { id: workflowId },
    });
    if (!workflow) throw new BadRequestException("Workflow not found");
    if (workflow.status !== "DRAFT") {
      throw new BadRequestException("Only DRAFT workflows can be published");
    }

    await prisma.$transaction(async (tx) => {
      await validateWorkflowGraph(workflowId, tx);

      await tx.workflowDefinition.update({
        where: { id: workflowId },
        data: {
          status: "PUBLISHED",
          isActive: true,
          publishedAt: new Date(),
          publishedById: actorId,
        },
      });
    });

    return { workflowId, status: "PUBLISHED" };
  },

  getWorkflows: async (options?: Partial<WorkflowFilterInput>) => {
    const filters = workflowFilterSchema.parse(options || {});

    return await workflowRepository.read(filters);
  },

  getWorkflowById: async ({ workflowId }: workflowId) => {
    const parsedId = workflowIdSchema.parse({ workflowId });

    const workflow = await workflowRepository.getWorkflowById(parsedId);

    if (!workflow) throw new NotFoundException("Workflow not found");

    // return workflow;
    return {
      ...workflow,
      // transitions: workflow.transitions.map((t) => ({
      //   ...t,
      //   allowedDepartmentIds:
      //     t.allowedDepartments?.map((d) => d.departmentId) ?? [],

      //   // ✅ flatten permissions
      //   allowedRoleIds: t.allowedRoles?.map((r) => r.roleId) ?? [],
      //   allowedUserIds: t.allowedUsers?.map((u) => u.userId) ?? [],

      //   // ❌ hide join tables from frontend
      //   allowedDepartments: undefined,
      //   allowedRoles: undefined,
      //   allowedUsers: undefined,
      // })),

      transitions: workflow.transitions.map((t) => ({
        ...t,

        // ✅ flatten department permissions
        allowedDepartmentIds:
          (t.allowedDepartments ?? []).map(
            (d: { departmentId: string }) => d.departmentId
          ),

        // ✅ flatten role permissions
        allowedRoleIds:
          (t.allowedRoles ?? []).map(
            (r: { roleId: string }) => r.roleId
          ),

        // ✅ flatten user permissions
        allowedUserIds:
          (t.allowedUsers ?? []).map(
            (u: { userId: string }) => u.userId
          ),

        // ✅ hide join tables from frontend
        allowedDepartments: undefined,
        allowedRoles: undefined,
        allowedUsers: undefined,
      })),

    };
  },

  updateWorkflow: async (
    id: workflowId,
    data: UpdateWorkflowInput,
    meta?: ActorMeta
  ) => {
    const parsedId = workflowIdSchema.parse(id);
    const validatedData = updateWorkflowSchema.parse(data);

    // Fetch existing workflow
    const existing = await workflowRepository.getWorkflowById(parsedId);
    if (!existing) throw new NotFoundException("Workflow not found.");

    // Check duplicate name if changing
    if (validatedData.name && validatedData.name !== existing.name) {
      const duplicate = await workflowRepository.isDuplicateName(
        validatedData.name,
        parsedId.workflowId
      );
      if (duplicate) {
        throw new BadRequestException("Workflow name already exists.");
      }
    }

    if (validatedData.resourceId) {
      const resourceExists = await prisma.resource.findUnique({
        where: { id: validatedData.resourceId },
      });
      if (!resourceExists) {
        throw new BadRequestException(
          "Invalid resourceId — resource not found."
        );
      }
    }

    // Build Prisma update payload
    let dataToUpdate: Prisma.WorkflowDefinitionUpdateInput = {};

    if (validatedData.name !== undefined) {
      dataToUpdate.name = { set: validatedData.name };
    }

    if (validatedData.description !== undefined) {
      dataToUpdate.description = { set: validatedData.description };
    }

    if (validatedData.resourceId !== undefined) {
      dataToUpdate.resource = {
        connect: { id: validatedData.resourceId },
      };
    }

    if (validatedData.isActive !== undefined) {
      dataToUpdate.isActive = { set: validatedData.isActive };
    }

    // Do NOT allow manual code/version override unless provided intentionally
    if (validatedData.code !== undefined) {
      dataToUpdate.code = { set: validatedData.code };
    }

    if (validatedData.version !== undefined) {
      dataToUpdate.version = { set: validatedData.version };
    }

    // Perform update inside transaction
    const updated = await prisma.$transaction(async (tx: any) => {
      // If name changed: regenerate workflow code + version
      if (validatedData.name && validatedData.name !== existing.name) {
        const { code, version } = await generateWorkflowCodeAndVersion(
          validatedData.name,
          tx
        );

        dataToUpdate.code = { set: code };
        dataToUpdate.version = { set: version };
      }

      const mod = await tx.workflowDefinition.update({
        where: { id: parsedId.workflowId },
        data: dataToUpdate,
      });

      // Audit log
      await tx.auditLog.create({
        data: {
          userId: meta?.actorId ?? null,
          entity: AuditEntity.WORKFLOW,
          action: AuditAction.UPDATE,
          comment: "Workflow updated",
          before: existing,
          after: mod,
          ipAddress: meta?.ipAddress ?? null,
          userAgent: meta?.userAgent ?? null,
          performedBy: meta?.performedBy ?? PerformedByType.USER,
        },
      });

      // Outbox
      await OutboxService.createOutboxEvent(tx, {
        entity: "workflow",
        action: "updated",
        payload: {
          moduleId: mod.id,
          name: mod.name,
        },
      });

      return mod;
    });

    return updated;
  },

  archiveWorkflow: async ({ workflowId }: workflowId, meta: ActorMeta) => {
    const parsedId = workflowIdSchema.parse({ workflowId });

    const existing = await workflowRepository.getWorkflowById(parsedId);
    if (!existing) throw new NotFoundException("Workflow not found");

    const archived = await workflowRepository.ArchiveWorkflow(parsedId);
    if (!archived) throw new NotFoundException("Workflow not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.WORKFLOW,
      action: AuditAction.ARCHIVE,
      comment: "Workflow archived",
      before: existing,
      after: archived,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return archived;
  },

  restoreWorkflow: async ({ workflowId }: workflowId, meta: ActorMeta) => {
    const parsedId = workflowIdSchema.parse({ workflowId });

    const existing = await workflowRepository.getWorkflowById(parsedId);
    if (!existing) throw new NotFoundException("Workflow not found");

    const restored = await workflowRepository.RestoredWorkflow(parsedId);
    if (!restored) throw new NotFoundException("Workflow not found.");

    // Audit (DELETE)
    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.WORKFLOW,
      action: AuditAction.DELETE,
      comment: "Workflow restored",
      before: existing,
      after: null,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return restored;
  },

  deleteWorkflow: async ({ workflowId }: workflowId, meta: ActorMeta) => {
    const parsedId = workflowIdSchema.parse({ workflowId });

    const existing = await workflowRepository.getWorkflowById(parsedId);
    if (!existing) throw new NotFoundException("Workflow not found");

    const hasInstances = await prisma.workflowInstance.findFirst({
      where: { workflowId: parsedId.workflowId },
    });

    if (hasInstances) {
      throw new BadRequestException(
        "Cannot delete workflow because instances exist. Archive instead."
      );
    }

    const deleted = await workflowRepository.DeleteWorkflow(parsedId);
    if (!deleted) throw new NotFoundException("Workflow not found.");

    // Audit (DELETE)
    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.WORKFLOW,
      action: AuditAction.DELETE,
      comment: "Workflow permanently deleted",
      before: existing,
      after: null,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return deleted;
  },

  /* -------------------------------------------------------------------------- */
  /*                                   STAGES                                   */
  /* -------------------------------------------------------------------------- */

  createStages: async (
    { workflowId }: workflowId,
    data: CreateStagesInput,
    meta?: ActorMeta
  ) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    if (!parsedId) throw new BadRequestException("workflowId is required.");

    if (!Array.isArray(data) || data.length === 0) {
      throw new BadRequestException("No stages provided.");
    }

    if (!meta?.actorId) {
      throw new BadRequestException("Actor ID is required.");
    }

    return prisma.$transaction(async (tx: any) => {
      const createdStages: WorkflowStage[] = [];

      for (const stageInput of data) {
        const { name } = stageInput;

        if (!name) throw new BadRequestException("Stage name is required.");

        // RULE 1 — Unique Name
        const duplicateName = await tx.workflowStage.findFirst({
          where: { workflowId: parsedId.workflowId, name },
        });
        if (duplicateName) {
          throw new BadRequestException(`Stage name "${name}" already exists`);
        }

        // RULE 2 — Only One Initial Stage
        if (stageInput.isInitial) {
          const hasInitial = await tx.workflowStage.findFirst({
            where: { workflowId, isInitial: true },
          });
          if (hasInitial) {
            throw new BadRequestException("Only one initial stage is allowed.");
          }
        }

        // RULE 3 — Only One Final Stage
        if (stageInput.isFinal) {
          const hasFinal = await tx.workflowStage.findFirst({
            where: { workflowId, isFinal: true },
          });
          if (hasFinal) {
            throw new BadRequestException("Only one final stage is allowed.");
          }
        }

        // Auto-generate code if not provided
        const code = await generateStageCode(workflowId, name, tx);

        // RULE 4 — Unique Code Check
        const duplicateCode: any = await workflowRepository.findByCode(
          workflowId,
          code,
          tx
        );
        if (duplicateCode) {
          throw new BadRequestException(
            `Stage with code "${code}" already exists`
          );
        }

        // Create the Stage
        const stage = await workflowRepository.createStage(
          { ...stageInput, code },
          tx
        );

        createdStages.push(stage);

        // Audit
        await createAuditLog({
          userId: meta.actorId!,
          entity: AuditEntity.WORKFLOW,
          action: AuditAction.CREATE,
          comment: `Stage created: ${stage.name}`,
          after: stage,
          ipAddress: meta.ipAddress ?? null,
          userAgent: meta.userAgent ?? null,
          performedBy: meta.performedBy ?? PerformedByType.USER,
        });
      }

      return createdStages;
    });
  },

  updateStages: async (
    { workflowId }: workflowId,
    stagesData: UpdateStageInput | UpdateStageInput[],
    meta?: ActorMeta
  ) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    const workflowExists = await workflowRepository.getWorkflowById(parsedId);
    if (!workflowExists) throw new NotFoundException("Workflow not found");

    if (!stagesData) throw new BadRequestException("No stage data provided");

    const stagesArray = Array.isArray(stagesData) ? stagesData : [stagesData];

    return prisma.$transaction(async (tx: any) => {
      const updatedStages: WorkflowStage[] = [];

      for (const input of stagesArray) {
        const stage = await workflowRepository.findByStageId(input.stageId, tx);
        if (!stage) {
          throw new BadRequestException(`Stage ${input.stageId} not found`);
        }

        /** ------------------------------------------------------------------
         * 1. Validate unique name (if changed)
         * ------------------------------------------------------------------ */
        if (input.name && input.name !== stage.name) {
          const nameExists = await tx.workflowStage.findFirst({
            where: {
              workflowId,
              name: input.name,
              id: { not: stage.id },
            },
          });
          if (nameExists) {
            throw new BadRequestException(
              `Stage name "${input.name}" already exists in this workflow`
            );
          }
        }

        /** ------------------------------------------------------------------
         * 2. Validate initial stage constraint
         * ------------------------------------------------------------------ */
        if (input.isInitial === true) {
          const existingInitial = await tx.workflowStage.findFirst({
            where: {
              workflowId,
              isInitial: true,
              id: { not: stage.id },
            },
          });
          if (existingInitial) {
            throw new BadRequestException("Only one initial stage is allowed");
          }
        }

        /** ------------------------------------------------------------------
         * 3. Validate final stage constraint
         * ------------------------------------------------------------------ */
        if (input.isFinal === true) {
          const existingFinal = await tx.workflowStage.findFirst({
            where: {
              workflowId,
              isFinal: true,
              id: { not: stage.id },
            },
          });
          if (existingFinal) {
            throw new BadRequestException("Only one final stage is allowed");
          }
        }

        /** ------------------------------------------------------------------
         * 4. AUTO-GENERATE CODE ONLY IF NAME CHANGED
         * ------------------------------------------------------------------ */
        let newCode = stage.code; // default → keep existing code

        if (input.name && input.name !== stage.name) {
          newCode = await generateStageCode(workflowId, input.name, tx);

          // Ensure generated code is unique
          const codeExists = await workflowRepository.findByCode(
            workflowId,
            newCode,
            tx
          );
          if (codeExists) {
            throw new BadRequestException(
              `Generated code "${newCode}" already exists. Try different stage name.`
            );
          }
        }

        /** ------------------------------------------------------------------
         * 5. Prepare update payload (never allow user-supplied code)
         * ------------------------------------------------------------------ */
        const { stageId, ...rest } = input;

        const updatePayload = {
          ...rest,
          code: newCode,
        };

        /** ------------------------------------------------------------------
         * 6. Apply update
         * ------------------------------------------------------------------ */
        const updated = await workflowRepository.updateStage(
          stage.id,
          updatePayload,
          tx
        );
        updatedStages.push(updated);

        /** ------------------------------------------------------------------
         * 7. Audit log
         * ------------------------------------------------------------------ */
        if (meta?.actorId) {
          await createAuditLog({
            userId: meta.actorId,
            entity: AuditEntity.WORKFLOW,
            action: AuditAction.UPDATE,
            comment: `Stage updated (${stage.name})`,
            before: stage,
            after: updated,
            ipAddress: meta.ipAddress ?? null,
            userAgent: meta.userAgent ?? null,
            performedBy: meta.performedBy ?? PerformedByType.USER,
          });
        }
      }

      return Array.isArray(stagesData) ? updatedStages : updatedStages[0];
    });
  },

  deleteStages: async (
    { workflowId }: workflowId,
    stagesData: stageId | stageId[],
    meta?: ActorMeta
  ) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    const workflowExists = await workflowRepository.getWorkflowById(parsedId);
    if (!workflowExists) throw new NotFoundException("Workflow not found");

    if (!stagesData) throw new BadRequestException("No stage data provided");

    const stagesArray = Array.isArray(stagesData) ? stagesData : [stagesData];

    return prisma.$transaction(async (tx: any) => {
      const deletedStages: WorkflowStage[] = [];

      for (const { stageId } of stagesArray) {
        const stage = await workflowRepository.findByStageId(stageId, tx);
        if (!stage) throw new BadRequestException(`Stage ${stageId} not found`);

        /** ------------------------------------------------------------------
         * 1. Prevent deletion if transitions depend on this stage
         * ------------------------------------------------------------------ */
        const transitionsExist = await tx.workflowTransition.findFirst({
          where: {
            OR: [{ fromStageId: stageId }, { toStageId: stageId }],
          },
        });

        if (transitionsExist) {
          throw new BadRequestException(
            `Stage "${stage.name}" cannot be deleted because transitions depend on it.`
          );
        }

        /** ------------------------------------------------------------------
         * 2. Prevent deletion if workflow instances reference this stage
         * ------------------------------------------------------------------ */
        const instanceExists = await tx.workflowInstance.findFirst({
          where: { currentStageId: stageId },
        });

        if (instanceExists) {
          throw new BadRequestException(
            `Stage "${stage.name}" cannot be deleted because workflow instances refer to it.`
          );
        }

        /** ------------------------------------------------------------------
         * 3. Perform deletion
         * ------------------------------------------------------------------ */
        const deleted = await workflowRepository.deleteStage(stageId, tx);
        deletedStages.push(deleted);

        /** ------------------------------------------------------------------
         * 4. Audit log
         * ------------------------------------------------------------------ */
        if (meta?.actorId) {
          await createAuditLog({
            userId: meta.actorId,
            entity: AuditEntity.WORKFLOW,
            action: AuditAction.DELETE,
            comment: `Stage deleted: ${stage.name}`,
            before: stage,
            after: null,
            ipAddress: meta.ipAddress ?? null,
            userAgent: meta.userAgent ?? null,
            performedBy: meta.performedBy ?? PerformedByType.USER,
          });
        }
      }

      return Array.isArray(stagesData) ? deletedStages : deletedStages[0];
    });
  },

  getStagesByWorkflowId: async ({ workflowId }: workflowId) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    const stages = await workflowRepository.findByWorkflowId(parsedId);
    return stages;
  },

  getStagesByWorkflowIdandStageId: async (
    { workflowId }: workflowId,
    { stageId }: stageId
  ) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    const parsedStageId = stageIdSchema.parse({ stageId });
    const stages = await workflowRepository.getStagesByWorkflowIdandStageId(
      parsedId,
      parsedStageId
    );
    return stages;
  },

  // /* -------------------------------------------------------------------------- */
  // /*                              TRANSITION                                    */
  // /* -------------------------------------------------------------------------- */

  //   createTransitions: async (
  //     { workflowId }: workflowId,
  //     transitionsData: any[],
  //     meta?: ActorMeta
  //   ) => {
  //     const parsedId = workflowIdSchema.parse({ workflowId });
  //     if (!workflowId) throw new BadRequestException("workflowId is required.");

  //     if (!Array.isArray(transitionsData) || transitionsData.length === 0) {
  //       throw new BadRequestException("No transitions provided.");
  //     }

  //     const workflowExists = await workflowRepository.getWorkflowById(parsedId);
  //     if (!workflowExists) throw new NotFoundException("Workflow not found");

  //     return prisma.$transaction(async (tx: any) => {
  //       const createdTransitions = [];

  //       for (const t of transitionsData) {
  //         const {
  //           fromStageId,
  //           toStageId,
  //           label,
  //           allowedUserIds,
  //           allowedRoleIds,
  //         } = t;

  //         // Validate stage existence
  //         const fromStage = await workflowRepository.findByStageId(
  //           fromStageId,
  //           tx
  //         );
  //         if (!fromStage)
  //           throw new BadRequestException(
  //             `fromStageId "${fromStageId}" does not exist`
  //           );

  //         const toStage = await workflowRepository.findByStageId(toStageId, tx);
  //         if (!toStage)
  //           throw new BadRequestException(
  //             `toStageId "${toStageId}" does not exist`
  //           );

  //         // Cannot create transition to same stage
  //         if (fromStageId === toStageId)
  //           throw new BadRequestException(
  //             "A transition cannot point to the same stage"
  //           );

  //         // Prevent duplicate transitions
  //         const duplicate = await tx.workflowTransition.findFirst({
  //           where: { workflowId, fromStageId, toStageId },
  //         });

  //         if (duplicate) {
  //           throw new BadRequestException(
  //             `Transition from "${fromStage.name}" to "${toStage.name}" already exists`
  //           );
  //         }

  //         // Create transition
  //         const created = await workflowRepository.createTransition(
  //           { ...t, workflowId },
  //           tx
  //         );

  //         createdTransitions.push(created);

  //         // After creating transition
  // if (allowedRoleIds?.length) {
  //   await tx.workflowTransitionAllowedRole.createMany({
  //     data: allowedRoleIds.map(roleId => ({
  //       transitionId: created.id,
  //       roleId,
  //     }))
  //   });
  // }

  // if (allowedUserIds?.length) {
  //   await tx.workflowTransitionAllowedUser.createMany({
  //     data: allowedUserIds.map(userId => ({
  //       transitionId: created.id,
  //       userId,
  //     }))
  //   });
  // }

  //         // Optional audit
  //         if (meta?.actorId) {
  //           await createAuditLog({
  //             userId: meta.actorId,
  //             entity: AuditEntity.WORKFLOW,
  //             action: AuditAction.CREATE,
  //             comment: `Transition created ${label ?? ""}`,
  //             after: created,
  //             ipAddress: meta.ipAddress ?? null,
  //             userAgent: meta.userAgent ?? null,
  //           });
  //         }
  //       }

  //       // Validate graph consistency
  //       await validateWorkflowGraph(workflowId);

  //       return createdTransitions;
  //     });
  //   },

  createTransitions: async (
    { workflowId }: workflowId,
    transitionsData: any[],
    meta?: ActorMeta
  ) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    if (!workflowId) throw new BadRequestException("workflowId is required.");

    if (!Array.isArray(transitionsData) || transitionsData.length === 0) {
      throw new BadRequestException("No transitions provided.");
    }

    const workflowExists = await workflowRepository.getWorkflowById(parsedId);
    if (!workflowExists) throw new NotFoundException("Workflow not found");

    return prisma.$transaction(async (tx: any) => {
      const createdTransitions = [];

      for (const t of transitionsData) {
        const {
          fromStageId,
          toStageId,
          label,
          allowedUserIds,
          allowedRoleIds,
          allowedDepartmentIds,
        } = t;

        // Validate stage existence
        const fromStage = await workflowRepository.findByStageId(
          fromStageId,
          tx
        );
        if (!fromStage)
          throw new BadRequestException(
            `fromStageId "${fromStageId}" does not exist`
          );

        const toStage = await workflowRepository.findByStageId(toStageId, tx);
        if (!toStage)
          throw new BadRequestException(
            `toStageId "${toStageId}" does not exist`
          );

        // Rule: cannot transition to same stage
        if (fromStageId === toStageId)
          throw new BadRequestException(
            "A transition cannot point to the same stage"
          );

        // Rule: cannot create outgoing transitions from final stage
        if (fromStage.isFinal) {
          throw new BadRequestException(
            `Cannot create transition from final stage "${fromStage.name}".`
          );
        }

        // Rule: cannot create incoming transitions into initial stage
        if (toStage.isInitial) {
          throw new BadRequestException(
            `Cannot create transition into initial stage "${toStage.name}".`
          );
        }

        // Prevent duplicate transitions
        const duplicate = await tx.workflowTransition.findFirst({
          where: { workflowId, fromStageId, toStageId },
        });

        if (duplicate) {
          throw new BadRequestException(
            `Transition from "${fromStage.name}" to "${toStage.name}" already exists`
          );
        }

        // Create transition
        const created = await workflowRepository.createTransition(
          { ...t, workflowId },
          tx
        );

        createdTransitions.push(created);

        // Save allowed roles
        if (allowedRoleIds?.length) {
          await tx.workflowTransitionAllowedRole.createMany({
            data: allowedRoleIds.map((roleId: any) => ({
              transitionId: created.id,
              roleId,
            })),
          });
        }

        // Save allowed users
        if (allowedUserIds?.length) {
          await tx.workflowTransitionAllowedUser.createMany({
            data: allowedUserIds.map((userId: any) => ({
              transitionId: created.id,
              userId,
            })),
          });
        }

        if (allowedDepartmentIds?.length) {
          await tx.workflowTransitionAllowedDepartment.createMany({
            data: allowedDepartmentIds.map((departmentId: any) => ({
              transitionId: created.id,
              departmentId,
            })),
          });
        }

        // Audit log
        if (meta?.actorId) {
          await createAuditLog({
            userId: meta.actorId,
            entity: AuditEntity.WORKFLOW,
            action: AuditAction.CREATE,
            comment: `Transition created ${label ?? ""}`,
            after: created,
            ipAddress: meta.ipAddress ?? null,
            userAgent: meta.userAgent ?? null,
          });
        }
      }

      // Graph consistency
      // await validateWorkflowGraph(workflowId);

      return createdTransitions;
    });
  },

  getTransitions: async ({ workflowId }: workflowId) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    if (!workflowId) throw new BadRequestException("workflowId is required.");

    const workflowExists = await workflowRepository.getWorkflowById(parsedId);
    if (!workflowExists) {
      throw new NotFoundException("Workflow not found");
    }

    return workflowRepository.findTransitionsByWorkflowId(workflowId);
  },

  getTransitionById: async (
    { workflowId }: workflowId,
    transitionId: string
  ) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    if (!parsedId) throw new BadRequestException("workflowId is required.");

    const workflowExists = await workflowRepository.getWorkflowById(parsedId);
    if (!workflowExists) throw new NotFoundException("Workflow not found");

    const transition = await workflowRepository.findById(transitionId);
    if (!transition) throw new NotFoundException("Transition not found");

    return transition;
  },

  // updateTransition: async (
  //   { workflowId }: workflowId,
  //   transitionId: string,
  //   data: any,
  //   meta?: ActorMeta
  // ) => {
  //   const parsedId = workflowIdSchema.parse({ workflowId });
  //   if (!parsedId) throw new BadRequestException("workflowId is required.");

  //   const workflowExists = await workflowRepository.getWorkflowById(parsedId);
  //   if (!workflowExists) throw new NotFoundException("Workflow not found");

  //   const existing = await workflowRepository.findById(transitionId);
  //   if (!existing) throw new NotFoundException("Transition not found");

  //   return prisma.$transaction(async (tx: any) => {
  //     // If fromStageId or toStageId are being updated, validate them
  //     if (data.fromStageId) {
  //       const from = await workflowRepository.findByStageId(
  //         data.fromStageId,
  //         tx
  //       );
  //       if (!from)
  //         throw new BadRequestException(
  //           `fromStageId "${data.fromStageId}" does not exist`
  //         );
  //     }

  //     if (data.toStageId) {
  //       const to = await workflowRepository.findByStageId(data.toStageId, tx);
  //       if (!to)
  //         throw new BadRequestException(
  //           `toStageId "${data.toStageId}" does not exist`
  //         );
  //     }

  //     // Prevent same-stage transition
  //     if (
  //       data.fromStageId &&
  //       data.toStageId &&
  //       data.fromStageId === data.toStageId
  //     ) {
  //       throw new BadRequestException(
  //         "A transition cannot point to the same stage"
  //       );
  //     }

  //     if (data.allowedRoleIds) {
  //       await tx.workflowTransitionAllowedRole.deleteMany({
  //         where: { transitionId },
  //       });
  //       await tx.workflowTransitionAllowedRole.createMany({
  //         data: data.allowedRoleIds.map((roleId) => ({ transitionId, roleId })),
  //       });
  //     }

  //     if (data.allowedUserIds) {
  //       await tx.workflowTransitionAllowedUser.deleteMany({
  //         where: { transitionId },
  //       });
  //       await tx.workflowTransitionAllowedUser.createMany({
  //         data: data.allowedUserIds.map((userId) => ({ transitionId, userId })),
  //       });
  //     }

  //     // Update transition
  //     const updated = await workflowRepository.updateTransition(
  //       transitionId,
  //       data,
  //       tx
  //     );

  //     await validateWorkflowGraph(workflowId);

  //     return updated;
  //   });
  // },

  //   updateTransition: async (
  //   { workflowId }: workflowId,
  //   transitionId: string,
  //   data: any,
  //   meta?: ActorMeta
  // ) => {
  //   const parsedId = workflowIdSchema.parse({ workflowId });
  //   if (!parsedId) throw new BadRequestException("workflowId is required.");

  //   const workflowExists = await workflowRepository.getWorkflowById(parsedId);
  //   if (!workflowExists) throw new NotFoundException("Workflow not found");

  //   const existing = await workflowRepository.findById(transitionId);
  //   if (!existing) throw new NotFoundException("Transition not found");

  //   return prisma.$transaction(async (tx: any) => {
  //     /** ------------------------------------------------------------------
  //      * 1. Determine final fromStage & toStage (new or existing)
  //      * ------------------------------------------------------------------ */
  //     const finalFromStageId = data.fromStageId ?? existing.fromStageId;
  //     const finalToStageId = data.toStageId ?? existing.toStageId;

  //     const fromStage = await workflowRepository.findByStageId(
  //       finalFromStageId,
  //       tx
  //     );
  //     if (!fromStage)
  //       throw new BadRequestException(
  //         `fromStageId "${finalFromStageId}" does not exist`
  //       );

  //     const toStage = await workflowRepository.findByStageId(finalToStageId, tx);
  //     if (!toStage)
  //       throw new BadRequestException(
  //         `toStageId "${finalToStageId}" does not exist`
  //       );

  //     /** ------------------------------------------------------------------
  //      * 2. Prevent invalid transitions
  //      * ------------------------------------------------------------------ */

  //     // Same stage → not allowed
  //     if (finalFromStageId === finalToStageId) {
  //       throw new BadRequestException(
  //         "A transition cannot point to the same stage"
  //       );
  //     }

  //     // Cannot transition FROM a final stage
  //     if (fromStage.isFinal) {
  //       throw new BadRequestException(
  //         `Cannot create or update transition from final stage "${fromStage.name}".`
  //       );
  //     }

  //     // Cannot transition INTO an initial stage
  //     if (toStage.isInitial) {
  //       throw new BadRequestException(
  //         `Cannot create or update transition into initial stage "${toStage.name}".`
  //       );
  //     }

  //     /** ------------------------------------------------------------------
  //      * 3. Update allowed roles & users
  //      * ------------------------------------------------------------------ */

  //     if (data.allowedRoleIds) {
  //       await tx.workflowTransitionAllowedRole.deleteMany({
  //         where: { transitionId },
  //       });

  //       await tx.workflowTransitionAllowedRole.createMany({
  //         data: data.allowedRoleIds.map((roleId:any) => ({
  //           transitionId,
  //           roleId,
  //         })),
  //       });
  //     }

  //     if (data.allowedUserIds) {
  //       await tx.workflowTransitionAllowedUser.deleteMany({
  //         where: { transitionId },
  //       });

  //       await tx.workflowTransitionAllowedUser.createMany({
  //         data: data.allowedUserIds.map((userId:any) => ({
  //           transitionId,
  //           userId,
  //         })),
  //       });
  //     }

  //     /** ------------------------------------------------------------------
  //      * 4. Apply transition update
  //      * ------------------------------------------------------------------ */
  //     const updated = await workflowRepository.updateTransition(
  //       transitionId,
  //       data,
  //       tx
  //     );

  //     /** ------------------------------------------------------------------
  //      * 5. Validate graph integrity
  //      * ------------------------------------------------------------------ */
  //     await validateWorkflowGraph(workflowId);

  //     return updated;
  //   });
  // },

  updateTransition: async (
    { workflowId }: workflowId,
    transitionId: string,
    data: any,
    meta?: ActorMeta
  ) => {
    const parsedId = workflowIdSchema.parse({ workflowId });
    if (!parsedId) throw new BadRequestException("workflowId is required.");

    const workflowExists = await workflowRepository.getWorkflowById(parsedId);
    if (!workflowExists) throw new NotFoundException("Workflow not found");

    const existing = await workflowRepository.findById(transitionId);
    if (!existing) throw new NotFoundException("Transition not found");

    return prisma.$transaction(async (tx) => {
      /* -------------------------------------------------------------
       * 1. VALIDATE STAGE UPDATES (only if client passed new IDs)
       * ----------------------------------------------------------- */
      if (data.fromStageId) {
        const from = await workflowRepository.findByStageId(
          data.fromStageId,
          tx
        );
        if (!from)
          throw new BadRequestException(
            `fromStageId "${data.fromStageId}" does not exist`
          );
      }

      if (data.toStageId) {
        const to = await workflowRepository.findByStageId(data.toStageId, tx);
        if (!to)
          throw new BadRequestException(
            `toStageId "${data.toStageId}" does not exist`
          );
      }

      if (
        data.fromStageId &&
        data.toStageId &&
        data.fromStageId === data.toStageId
      ) {
        throw new BadRequestException(
          "A transition cannot point to the same stage"
        );
      }

      /* -------------------------------------------------------------
       * 2. HANDLE ALLOWED ROLE UPDATES
       * ----------------------------------------------------------- */
      if (Array.isArray(data.allowedRoleIds)) {
        await tx.workflowTransitionAllowedRole.deleteMany({
          where: { transitionId },
        });

        if (data.allowedRoleIds.length > 0) {
          await tx.workflowTransitionAllowedRole.createMany({
            data: data.allowedRoleIds.map((roleId: any) => ({
              transitionId,
              roleId,
            })),
          });
        }
      }

      /* -------------------------------------------------------------
       * 3. HANDLE ALLOWED USER UPDATES
       * ----------------------------------------------------------- */
      if (Array.isArray(data.allowedUserIds)) {
        await tx.workflowTransitionAllowedUser.deleteMany({
          where: { transitionId },
        });

        if (data.allowedUserIds.length > 0) {
          await tx.workflowTransitionAllowedUser.createMany({
            data: data.allowedUserIds.map((userId: any) => ({
              transitionId,
              userId,
            })),
          });
        }
      }

      /* -------------------------------------------------------------
       * 4. FILTER OUT RELATIONAL FIELDS BEFORE UPDATE
       * ----------------------------------------------------------- */
      const safeData = { ...data };
      delete safeData.allowedUserIds;
      delete safeData.allowedRoleIds;

      // WARNING: Do not allow updating fromStageId or toStageId directly
      delete safeData.fromStageId;
      delete safeData.toStageId;

      /* -------------------------------------------------------------
       * 5. UPDATE TRANSITION
       * ----------------------------------------------------------- */
      const updated = await workflowRepository.updateTransition(
        transitionId,
        safeData,
        tx
      );

      /* -------------------------------------------------------------
       * 6. Validate workflow graph again
       * ----------------------------------------------------------- */
      await validateWorkflowGraph(workflowId, tx);

      /* -------------------------------------------------------------
       * 7. AUDIT LOG
       * ----------------------------------------------------------- */
      if (meta?.actorId) {
        await createAuditLog({
          userId: meta.actorId,
          entity: AuditEntity.WORKFLOW,
          action: AuditAction.UPDATE,
          comment: `Transition updated`,
          before: existing,
          after: updated,
          ipAddress: meta.ipAddress ?? null,
          userAgent: meta.userAgent ?? null,
          performedBy: meta.performedBy ?? PerformedByType.USER,
        });
      }

      return updated;
    });
  },

  deleteTransition: async (
    { workflowId }: workflowId,
    transitionId: string,
    meta?: ActorMeta
  ) => {
    const parsedId = workflowIdSchema.parse({ workflowId });

    if (!transitionId) {
      throw new BadRequestException("Transition ID is required.");
    }

    const workflowExists = await workflowRepository.getWorkflowById(parsedId);
    if (!workflowExists) throw new NotFoundException("Workflow not found");

    return prisma.$transaction(async (tx: any) => {
      const existing = await workflowRepository.findById(transitionId, tx);
      if (!existing) {
        throw new BadRequestException(`Transition ${transitionId} not found`);
      }

      const deleted = await workflowRepository.deleteTransition(
        transitionId,
        tx
      );

      if (meta?.actorId) {
        await createAuditLog({
          userId: meta.actorId,
          entity: AuditEntity.WORKFLOW,
          action: AuditAction.DELETE,
          comment: `Transition deleted`,
          before: existing,
          after: null,
          ipAddress: meta.ipAddress ?? null,
          userAgent: meta.userAgent ?? null,
          performedBy: meta.performedBy ?? PerformedByType.USER,
        });
      }

      // await validateWorkflowGraph(workflowId);

      return deleted;
    });
  },

  /* -------------------------------------------------------------------------- */
  /*                                   INSTANCE                                 */
  /* -------------------------------------------------------------------------- */

  // moveInstance: async (
  //   workflowId: string,
  //   input: MoveInstanceInput,
  //   meta?: ActorMeta
  // ) => {
  //   const workflow = await workflowRepository.getWorkflowWithStages(workflowId);
  //   if (!workflow) throw new NotFoundException("Workflow not found");

  //   const payload = moveInstanceSchema.parse(input);

  //   // Load instance
  //   const instance = await workflowRepository.getInstanceById(
  //     payload.instanceId
  //   );
  //   if (!instance) throw new NotFoundException("Workflow instance not found");
  //   if (instance.endedAt)
  //     throw new BadRequestException("Instance already closed");

  //   // Validate target stage
  //   const toStage = workflow.stages.find(
  //     (s: any) => s.id === payload.toStageId
  //   );
  //   if (!toStage)
  //     throw new BadRequestException("Target stage not part of workflow");

  //   // Prevent moving back to initial stage
  //   if (toStage.isInitial) {
  //     throw new BadRequestException("Cannot move back to initial stage");
  //   }

  //   // Validate transition from current → target
  //   const transitions = await workflowRepository.getTransitionsForStage(
  //     instance.workflowId,
  //     instance.currentStageId
  //   );

  //   const allowedTransition = transitions.find(
  //     (t: any) => t.toStageId === toStage.id
  //   );

  //   if (!allowedTransition)
  //     throw new BadRequestException("No valid transition for this stage move");

  //   // -------------------------------
  //   // Permission Checks
  //   // -------------------------------
  //   const allowedUserIds =
  //     allowedTransition.allowedUsers?.map((u: any) => u.userId) ?? [];

  //   const allowedRoleIds =
  //     allowedTransition.allowedRoles?.map((r: any) => r.roleId) ?? [];

  //   if (allowedUserIds.length || allowedRoleIds.length) {
  //     const performerId = meta?.actorId ?? payload.performedById;
  //     if (!performerId) throw new ForbiddenException("Performer info required");

  //     // 1. Direct user permission
  //     if (allowedUserIds.includes(performerId)) {
  //       // approved
  //     }
  //     // 2. Role-based permission
  //     else if (allowedRoleIds.length) {
  //       const performerRoles = await workflowRepository.getUserRoleIds(
  //         performerId
  //       );
  //       const hasAccess = performerRoles.some((r) =>
  //         allowedRoleIds.includes(r)
  //       );

  //       if (!hasAccess)
  //         throw new ForbiddenException(
  //           "Performer does not have required role for this transition"
  //         );
  //     }
  //     // 3. No match
  //     else {
  //       throw new ForbiddenException(
  //         "Performer not allowed for this transition"
  //       );
  //     }
  //   }

  //   // -------------------------------
  //   // Transaction
  //   // -------------------------------
  //   return prisma.$transaction(async (tx: any) => {
  //     const before = instance;
  //     const now = new Date();
  //     const previousStageId = instance.currentStageId;

  //     // Update instance stage
  //     const updated = toStage.isFinal
  //       ? await workflowRepository.updateCurrentStage(
  //           instance.id,
  //           {
  //             currentStage: { connect: { id: toStage.id } },
  //             status: WorkflowInstanceStatus.COMPLETED,
  //             endedAt: now,
  //           },
  //           tx
  //         )
  //       : await workflowRepository.updateCurrentStage(
  //           instance.id,
  //           {
  //             currentStage: { connect: { id: toStage.id } },
  //             updatedAt: now,
  //           },
  //           tx
  //         );

  //     // -------------------------------
  //     // Create History Entry
  //     // -------------------------------
  //     const historyData: Prisma.WorkflowHistoryCreateInput = {
  //       workflowInstance: { connect: { id: instance.id } },
  //       fromStage: { connect: { id: previousStageId } },
  //       toStage: { connect: { id: toStage.id } },
  //       actionLabel: allowedTransition.label ?? "transition",
  //       notes: payload.notes ?? null,
  //       metadata: payload.metadata ?? null,
  //       createdAt: now,
  //       actionType: HistoryAction.AUTO_TRANSITION,
  //     };

  //     if (allowedTransition.id) {
  //       historyData.workflowTransition = {
  //         connect: { id: allowedTransition.id },
  //       };
  //     }

  //     if (meta?.actorId) {
  //       historyData.performedBy = { connect: { id: meta.actorId } };
  //     }

  //     await workflowRepository.createHistory(historyData, tx);

  //     const notifyUsers = await getNotificationTargetsForStage(
  //       workflowId,
  //       toStage.id
  //     );
  //     // -------------------------------
  //     // Outbox Event
  //     // -------------------------------
  //     await OutboxService.createOutboxEvent(tx, {
  //       entity: "workflow",
  //       action: toStage.isFinal ? "instance.completed" : "instance.moved",
  //       payload: {
  //         instanceId: instance.id,
  //         fromStageId: previousStageId,
  //         toStageId: toStage.id,
  //         transitionId: allowedTransition.id,
  //         workflowId,
  //         actorId: meta?.actorId ?? null,
  //       },
  //       targetUsers: notifyUsers,
  //     });

  //     // -------------------------------
  //     // Audit Log
  //     // -------------------------------
  //     await createAuditLog({
  //       userId: meta?.actorId ?? null,
  //       entity: AuditEntity.WORKFLOW,
  //       action: AuditAction.UPDATE,
  //       comment: `Moved instance ${instance.id} from ${previousStageId} to ${toStage.id}`,
  //       before,
  //       after: updated,
  //       ipAddress: meta?.ipAddress ?? null,
  //       userAgent: meta?.userAgent ?? null,
  //     });

  //     return updated;
  //   });
  // },

  closeInstance: async (
    workflowId: string,
    instanceId: string,
    meta?: ActorMeta
  ) => {
    const workflow = await workflowRepository.getWorkflowWithStages(workflowId);
    if (!workflow) {
      throw new NotFoundException("Workflow not found");
    }
    const instance = await workflowRepository.getInstanceById(instanceId);
    if (!instance) throw new NotFoundException("Workflow instance not found");
    if (instance.endedAt)
      throw new BadRequestException("Instance already closed");

    return prisma.$transaction(async (tx: any) => {
      const now = new Date();
      const closed = await workflowRepository.closeInstance(
        instanceId,
        now,
        tx
      );

      await workflowRepository.createHistory(
        {
          workflowInstanceId: instanceId,
          fromStageId: instance.currentStageId,
          toStageId: instance.currentStageId,
          performedById: meta?.actorId ?? null,
          actionLabel: "close",
          notes: "Instance closed",
          createdAt: now,
        } as any,
        tx
      );

      await OutboxService.createOutboxEvent(tx, {
        entity: "workflow",
        action: "instance.closed",
        payload: {
          instanceId,
          stageId: instance.currentStageId,
          workflowId,
          actorId: meta?.actorId ?? null,
        },
        targetUsers: [],
      });

      await createAuditLog({
        userId: meta?.actorId ?? null,
        entity: AuditEntity.WORKFLOW,
        action: AuditAction.DELETE,
        comment: "Closed workflow instance",
        before: instance,
        after: closed,
        ipAddress: meta?.ipAddress ?? null,
        userAgent: meta?.userAgent ?? null,
      });

      return closed;
    });
  },

  getInstance: async (workflowId: string, instanceId: string) => {
    const workflow = await workflowRepository.getWorkflowWithStages(workflowId);
    if (!workflow) {
      throw new NotFoundException("Workflow not found");
    }
    const instance = await workflowRepository.getInstanceById(instanceId);
    if (!instance) throw new NotFoundException("Workflow instance not found");
    return instance;
  },

  listInstancesByWorkflow: async (
    workflowId: string,
    options?: { skip?: number; take?: number }
  ) => {
    const skip = options?.skip ?? 0;
    const take = options?.take ?? 20;
    const [data, total] = await Promise.all([
      prisma.workflowInstance.findMany({
        where: { workflowId },
        include: { currentStage: true },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.workflowInstance.count({ where: { workflowId } }),
    ]);

    return { data, total, page: Math.floor(skip / take) + 1, pageSize: take };
  },

  getHistoryForRecord: async (recordId: string) => {
    // 1️⃣ find latest workflow instance for this record
    const instance = await prisma.workflowInstance.findFirst({
      where: {
        resourceType: "MASTER_RECORD",
        resourceId: recordId,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!instance) {
      throw new NotFoundException("No workflow instance found for this record");
    }

    // 2️⃣ fetch history
    const history = await prisma.workflowHistory.findMany({
      where: {
        workflowInstanceId: instance.id,
      },
      orderBy: { createdAt: "asc" },
      include: {
        fromStage: { select: { id: true, name: true, code: true } },
        toStage: { select: { id: true, name: true, code: true } },
        performedBy: { select: { id: true, name: true, email: true } },
        workflowTransition: {
          select: { id: true, label: true, transitionType: true },
        },
      },
    });

    return {
      instanceId: instance.id,
      workflowId: instance.workflowId,
      status: instance.status,
      history: history.map((h) => ({
        id: h.id,
        actionType: h.actionType,
        label: h.actionLabel,
        fromStage: h.fromStage,
        toStage: h.toStage,
        performedBy: h.performedBy,
        notes: h.notes,
        createdAt: h.createdAt,
        transition: h.workflowTransition,
      })),
    };
  },

  // approveInstance: async (
  //   workflowId: string,
  //   payload: any,
  //   meta: ActorMeta
  // ) => {
  //   return WorkflowService.moveInstance(workflowId, payload, meta);
  // },

  // rejectInstance: async (workflowId: string, payload: any, meta: ActorMeta) => {
  //   return WorkflowService.moveInstance(workflowId, payload, meta);
  // },
};

export default WorkflowService;

async function resolveUsersFromRoles(roleIds: string[]) {
  if (!roleIds.length) return [];

  const roleMembers = await prisma.userRole.findMany({
    where: { roleId: { in: roleIds } },
    select: { userId: true },
  });

  return roleMembers.map((m) => m.userId);
}

async function getNotificationTargetsForStage(
  workflowId: string,
  stageId: string
) {
  // Fetch transitions FROM the new stage
  const nextTransitions = await prisma.workflowTransition.findMany({
    where: { workflowId, fromStageId: stageId },
    include: {
      allowedUsers: true,
      allowedRoles: true,
      allowedDepartments: true,
    },
  });

  if (!nextTransitions.length) return [];

  const directUsers = nextTransitions.flatMap((t) =>
    t.allowedUsers.map((u) => u.userId)
  );

  const roleIds = nextTransitions.flatMap((t) =>
    t.allowedRoles.map((r) => r.roleId)
  );

  const roleUsers = await resolveUsersFromRoles(roleIds);

  return Array.from(new Set([...directUsers, ...roleUsers]));
}
