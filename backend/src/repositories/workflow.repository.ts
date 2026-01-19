import {
  Prisma,
  WorkflowHistory,
  WorkflowInstance,
  WorkflowStage,
  WorkflowTransition,
} from "../../prisma/generated/client.js";
import {
  stageId,
  WorkflowFilterInput,
  workflowId,
} from "../types/workflow.types.js";
import { prisma } from "../lib/prisma.js";
import { workerData } from "node:worker_threads";

const WorkflowRepository = {
  /* -------------------------------------------------------------------------- */
  /*                               WORKFLOW DEFINITION                          */
  /* -------------------------------------------------------------------------- */

  createWorkflow: (
    data: Prisma.WorkflowDefinitionCreateInput,
    tx?: Prisma.TransactionClient
  ) => {
    const client = tx ?? prisma;
    return client.workflowDefinition.create({ data });
  },

  findByCodeAndVersion: (code: string, version: number) => {
    return prisma.workflowDefinition.findUnique({
      where: { code_version: { code, version } },
    });
  },

  read: async (filters: WorkflowFilterInput) => {
    const where = buildModuleWhere(filters);
    const [data, total] = await Promise.all([
      prisma.workflowDefinition.findMany({
        where,
        skip: filters.skip,
        take: filters.take,
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
      }),
      prisma.workflowDefinition.count({ where }),
    ]);

    return {
      data,
      total,
      page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
      pageSize: filters.take || 10,
    };
  },

  getWorkflowById: ({ workflowId }: workflowId) => {
    return prisma.workflowDefinition.findUnique({
      where: { id: workflowId },

      include: {
        resource: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        stages: {
          orderBy: { order: "asc" },
          include: {
            outgoingTransitions: true,
            incomingTransitions: true,
          },
        },

        transitions: {
          include: {
            fromStage: true,
            toStage: true,
            allowedRoles: true,
            allowedUsers: true,
          },
        },

        // instances: {
        //   include: {
        //     currentStage: true,
        //     histories: {
        //       include: {
        //         fromStage: true,
        //         toStage: true,
        //         workflowTransition: true,
        //         performedBy: {
        //           select: {
        //             id: true,
        //             name: true,
        //             email: true,
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
      },
    });
  },

  ArchiveWorkflow: ({ workflowId }: workflowId) => {
    return prisma.workflowDefinition.update({
      where: { id: workflowId },
      data: { deletedAt: new Date(), isActive: false },
    });
  },

  RestoredWorkflow: ({ workflowId }: workflowId) => {
    return prisma.workflowDefinition.update({
      where: { id: workflowId },
      data: { deletedAt: new Date(), isActive: true },
    });
  },

  DeleteWorkflow: ({ workflowId }: workflowId) => {
    return prisma.workflowDefinition.delete({
      where: { id: workflowId },
    });
  },

  isDuplicateName: async (name: string, workflowId: string) => {
    return prisma.workflowDefinition.findFirst({
      where: {
        name,
        id: { not: workflowId },
      },
    });
  },

  /* -------------------------------------------------------------------------- */
  /*                                   STAGES                                   */
  /* -------------------------------------------------------------------------- */

  findByCode: async (
    workflowId: string,
    code: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowStage | null> => {
    return tx.workflowStage.findFirst({
      where: { workflowId, code },
    });
  },

  createStage: async (
    data: any,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowStage> => {
    return tx.workflowStage.create({ data });
  },

  findByStageId: async (
    stageId: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowStage | null> => {
    return tx.workflowStage.findUnique({ where: { id: stageId } });
  },

  updateStage: async (
    stageId: string,
    data: any,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowStage> => {
    return tx.workflowStage.update({
      where: { id: stageId },
      data,
    });
  },

  deleteStage: async (
    stageId: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowStage> => {
    return tx.workflowStage.delete({
      where: { id: stageId },
    });
  },

  findByWorkflowId: async (
    { workflowId }: workflowId,
    tx: typeof prisma = prisma
  ): Promise<WorkflowStage[]> => {
    return tx.workflowStage.findMany({
      where: { workflowId },
      orderBy: { order: "asc" }, // ensure stages are returned in order
    });
  },

  getStagesByWorkflowIdandStageId: async (
    { workflowId }: workflowId,
    { stageId }: stageId,
    tx: typeof prisma = prisma
  ): Promise<WorkflowStage[]> => {
    return tx.workflowStage.findMany({
      where: { workflowId, id: stageId },
      orderBy: { order: "asc" }, // ensure stages are returned in order
    });
  },

  /* -------------------------------------------------------------------------- */
  /*                                   TRANSITION                               */
  /* -------------------------------------------------------------------------- */

  // createTransition: async (
  //   data: any,
  //   tx: Prisma.TransactionClient | typeof prisma = prisma
  // ): Promise<WorkflowTransition> => {
  //   return tx.workflowTransition.create({ data });
  // },
  createTransition: async (
    data: {
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
    },
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ) => {
    const { allowedRoleIds = [], allowedUserIds = [], ...rest } = data;

    return tx.workflowTransition.create({
      data: {
        ...rest,

        allowedRoles: {
          create: allowedRoleIds.map((roleId) => ({
            roleId,
          })),
        },

        allowedUsers: {
          create: allowedUserIds.map((userId) => ({
            userId,
          })),
        },
      },
    });
  },

  // repositories/workflow.repository.ts

  // export const createTransition = async (
  //   data: {
  //     label?: string;
  //     fromStageId: string;
  //     toStageId: string;
  //     workflowId: string;
  //     allowedRoleIds?: string[];
  //     allowedUserIds?: string[];
  //     transitionType?: TransitionType;
  //     approvalConfig?: any;
  //     reviewOnly?: boolean;
  //     autoTrigger?: boolean;
  //     condition?: any;
  //     metadata?: any;
  //   },
  //   tx: any
  // ) => {
  //   const {
  //     allowedRoleIds = [],
  //     allowedUserIds = [],
  //     ...rest
  //   } = data;

  //   return tx.workflowTransition.create({
  //     data: {
  //       ...rest,
  //       allowedRoles: {
  //         create: allowedRoleIds.map((roleId) => ({ roleId })),
  //       },
  //       allowedUsers: {
  //         create: allowedUserIds.map((userId) => ({ userId })),
  //       },
  //     },
  //   });
  // };

  findById: async (
    id: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowTransition | null> => {
    return tx.workflowTransition.findUnique({ where: { id } });
  },

  updateTransition: async (
    id: string,
    data: any,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowTransition> => {
    return tx.workflowTransition.update({ where: { id }, data });
  },

  deleteTransition: async (
    transitionId: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowTransition> => {
    return tx.workflowTransition.delete({
      where: { id: transitionId },
    });
  },

  findTransitionsByWorkflowId(workflowId: string, tx = prisma) {
    return tx.workflowTransition.findMany({
      where: { workflowId },
    });
  },

  /* -------------------------------------------------------------------------- */
  /*                                   INSTANCE                                 */
  /* -------------------------------------------------------------------------- */

  createInstance: (
    data: Prisma.WorkflowInstanceCreateInput,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ) => {
    return tx.workflowInstance.create({ data });
  },

  getInstanceById: async (
    id: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowInstance | null> => {
    return tx.workflowInstance.findUnique({
      where: { id },
      include: {
        workflow: true,
        currentStage: true,
        histories: { orderBy: { createdAt: "asc" } },
      },
    });
  },

  findActiveInstanceForResource: async (
    workflowId: string,
    resourceType: string,
    resourceId: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowInstance | null> => {
    return tx.workflowInstance.findFirst({
      where: { workflowId, resourceType, resourceId, endedAt: null },
    });
  },

  updateCurrentStage: async (
    instanceId: string,
    update: Prisma.WorkflowInstanceUpdateInput,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowInstance> => {
    return tx.workflowInstance.update({
      where: { id: instanceId },
      data: update,
    });
  },

  closeInstance: async (
    instanceId: string,
    endedAt: Date,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowInstance> => {
    return tx.workflowInstance.update({
      where: { id: instanceId },
      data: { endedAt, status: "COMPLETED" },
    });
  },

  createHistory: async (
    data: Prisma.WorkflowHistoryCreateInput,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ): Promise<WorkflowHistory> => {
    return tx.workflowHistory.create({ data });
  },

  getTransitionsForStage: async (
    workflowId: string,
    fromStageId: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ) => {
    return tx.workflowTransition.findMany({
      where: { workflowId, fromStageId },
      include: {
        allowedUsers: { select: { userId: true } },
        allowedRoles: { select: { roleId: true } },
      },
    });
  },

  getTransitionById: async (
    id: string,
    tx: Prisma.TransactionClient | typeof prisma = prisma
  ) => {
    return tx.workflowTransition.findUnique({ where: { id } });
  },

  // helper: fetch workflow and stages
  getWorkflowWithStages: async (workflowId: string, tx = prisma) => {
    return tx.workflowDefinition.findUnique({
      where: { id: workflowId },
      include: { stages: { orderBy: { order: "asc" } }, transitions: true },
    });
  },

  getUserRoleIds: async (userId: string): Promise<string[]> => {
    const roles = await prisma.userRole.findMany({
      where: { userId },
      select: { roleId: true },
    });

    return roles.map((r: any) => r.roleId);
  },
};

export default WorkflowRepository;

const buildModuleWhere = (filters: WorkflowFilterInput) => {
  const where: any = {};

  // Search
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { code: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  // Name filter
  if (filters.name) {
    where.name = { contains: filters.name, mode: "insensitive" };
  }

  // Active / inactive / archived
  if (filters.isActive === "active") {
    where.isActive = true;
    where.deletedAt = null;
  } else if (filters.isActive === "inactive") {
    where.isActive = false;
    where.deletedAt = { not: null };
  }

  // Date filters
  if (filters.createdFrom || filters.createdTo) {
    where.createdAt = {};
    if (filters.createdFrom) {
      where.createdAt.gte = new Date(filters.createdFrom);
    }
    if (filters.createdTo) {
      const end = new Date(filters.createdTo);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }

  return where;
};
