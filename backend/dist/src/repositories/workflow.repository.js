import { prisma } from "../lib/prisma.js";
const WorkflowRepository = {
    /* -------------------------------------------------------------------------- */
    /*                               WORKFLOW DEFINITION                          */
    /* -------------------------------------------------------------------------- */
    createWorkflow: (data, tx) => {
        const client = tx ?? prisma;
        return client.workflowDefinition.create({ data });
    },
    findByCodeAndVersion: (code, version) => {
        return prisma.workflowDefinition.findUnique({
            where: { code_version: { code, version } },
        });
    },
    read: async (filters) => {
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
    getWorkflowById: ({ workflowId }) => {
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
    ArchiveWorkflow: ({ workflowId }) => {
        return prisma.workflowDefinition.update({
            where: { id: workflowId },
            data: { deletedAt: new Date(), isActive: false },
        });
    },
    RestoredWorkflow: ({ workflowId }) => {
        return prisma.workflowDefinition.update({
            where: { id: workflowId },
            data: { deletedAt: new Date(), isActive: true },
        });
    },
    DeleteWorkflow: ({ workflowId }) => {
        return prisma.workflowDefinition.delete({
            where: { id: workflowId },
        });
    },
    isDuplicateName: async (name, workflowId) => {
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
    findByCode: async (workflowId, code, tx = prisma) => {
        return tx.workflowStage.findFirst({
            where: { workflowId, code },
        });
    },
    createStage: async (data, tx = prisma) => {
        return tx.workflowStage.create({ data });
    },
    findByStageId: async (stageId, tx = prisma) => {
        return tx.workflowStage.findUnique({ where: { id: stageId } });
    },
    updateStage: async (stageId, data, tx = prisma) => {
        return tx.workflowStage.update({
            where: { id: stageId },
            data,
        });
    },
    deleteStage: async (stageId, tx = prisma) => {
        return tx.workflowStage.delete({
            where: { id: stageId },
        });
    },
    findByWorkflowId: async ({ workflowId }, tx = prisma) => {
        return tx.workflowStage.findMany({
            where: { workflowId },
            orderBy: { order: "asc" }, // ensure stages are returned in order
        });
    },
    getStagesByWorkflowIdandStageId: async ({ workflowId }, { stageId }, tx = prisma) => {
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
    createTransition: async (data, tx = prisma) => {
        const { allowedRoleIds = [], allowedUserIds = [], ...rest } = data;
        return tx.workflowTransition.create({
            data: {
                ...rest,
                allowedRoles: {
                    create: allowedRoleIds.map(roleId => ({
                        roleId,
                    })),
                },
                allowedUsers: {
                    create: allowedUserIds.map(userId => ({
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
    findById: async (id, tx = prisma) => {
        return tx.workflowTransition.findUnique({ where: { id } });
    },
    updateTransition: async (id, data, tx = prisma) => {
        return tx.workflowTransition.update({ where: { id }, data });
    },
    deleteTransition: async (transitionId, tx = prisma) => {
        return tx.workflowTransition.delete({
            where: { id: transitionId },
        });
    },
    findTransitionsByWorkflowId(workflowId, tx = prisma) {
        return tx.workflowTransition.findMany({
            where: { workflowId },
        });
    },
    /* -------------------------------------------------------------------------- */
    /*                                   INSTANCE                                 */
    /* -------------------------------------------------------------------------- */
    createInstance: (data, tx = prisma) => {
        return tx.workflowInstance.create({ data });
    },
    getInstanceById: async (id, tx = prisma) => {
        return tx.workflowInstance.findUnique({
            where: { id },
            include: {
                workflow: true,
                currentStage: true,
                histories: { orderBy: { createdAt: "asc" } },
            },
        });
    },
    findActiveInstanceForResource: async (workflowId, resourceType, resourceId, tx = prisma) => {
        return tx.workflowInstance.findFirst({
            where: { workflowId, resourceType, resourceId, endedAt: null },
        });
    },
    updateCurrentStage: async (instanceId, update, tx = prisma) => {
        return tx.workflowInstance.update({
            where: { id: instanceId },
            data: update,
        });
    },
    closeInstance: async (instanceId, endedAt, tx = prisma) => {
        return tx.workflowInstance.update({
            where: { id: instanceId },
            data: { endedAt, status: "COMPLETED" },
        });
    },
    createHistory: async (data, tx = prisma) => {
        return tx.workflowHistory.create({ data });
    },
    getTransitionsForStage: async (workflowId, fromStageId, tx = prisma) => {
        return tx.workflowTransition.findMany({
            where: { workflowId, fromStageId },
            include: {
                allowedUsers: { select: { userId: true } },
                allowedRoles: { select: { roleId: true } },
            },
        });
    },
    getTransitionById: async (id, tx = prisma) => {
        return tx.workflowTransition.findUnique({ where: { id } });
    },
    // helper: fetch workflow and stages
    getWorkflowWithStages: async (workflowId, tx = prisma) => {
        return tx.workflowDefinition.findUnique({
            where: { id: workflowId },
            include: { stages: { orderBy: { order: "asc" } }, transitions: true },
        });
    },
    getUserRoleIds: async (userId) => {
        const roles = await prisma.userRole.findMany({
            where: { userId },
            select: { roleId: true },
        });
        return roles.map((r) => r.roleId);
    },
};
export default WorkflowRepository;
const buildModuleWhere = (filters) => {
    const where = {};
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
    }
    else if (filters.isActive === "inactive") {
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
//# sourceMappingURL=workflow.repository.js.map