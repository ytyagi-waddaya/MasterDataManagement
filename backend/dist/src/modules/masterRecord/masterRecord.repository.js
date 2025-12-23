import { prisma } from "../../lib/prisma.js";
const masterRecordRepository = {
    read: async (filters) => {
        const where = buildMasterRecordWhere(filters);
        const orderBy = buildOrderBy(filters);
        const [records, total] = await Promise.all([
            prisma.masterRecord.findMany({
                where,
                skip: filters.skip,
                take: filters.take,
                orderBy,
                include: {
                    currentStage: {
                        select: {
                            id: true,
                            name: true,
                            code: true,
                            order: true,
                            color: true,
                        },
                    },
                    masterObject: {
                        select: {
                            id: true,
                            name: true,
                            key: true,
                            resources: {
                                select: {
                                    id: true,
                                    name: true,
                                    workflows: true,
                                },
                            },
                        },
                    },
                },
            }),
            prisma.masterRecord.count({ where }),
        ]);
        return {
            records,
            total,
            page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
            pageSize: filters.take || 10,
        };
    },
    archive: (recordId) => {
        return prisma.masterRecord.update({
            where: { id: recordId },
            data: { deletedAt: new Date(), isActive: false },
        });
    },
    restore: (recordId) => {
        return prisma.masterRecord.update({
            where: { id: recordId },
            data: { deletedAt: null, isActive: true },
        });
    },
    delete: (recordId) => {
        return prisma.masterRecord.delete({ where: { id: recordId } });
    },
    readOne: (recordId) => {
        return prisma.masterRecord.findUnique({ where: { id: recordId } });
    },
    getById: async (recordId) => {
        return prisma.masterRecord.findUnique({
            where: { id: recordId },
            include: {
                // ⭐ The current workflow stage (NEW)
                currentStage: {
                    include: {
                        outgoingTransitions: true, // optional but useful (available actions)
                        incomingTransitions: true, // optional
                    },
                },
                // ⭐ MasterObject and its connected Resource + Workflow Definitions
                masterObject: {
                    select: {
                        id: true,
                        name: true,
                        key: true,
                        resources: {
                            select: {
                                id: true,
                                name: true,
                                workflows: {
                                    include: {
                                        stages: true, // full workflow model
                                        transitions: true,
                                    },
                                },
                            },
                        },
                    },
                },
                // ⭐ Who created the record
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                // ⭐ Linked user (optional)
                linkedUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                // ⭐ Related tasks
                tasks: true,
                // ⭐ Audit log
                auditLogs: true,
                // ⭐ Workflow instance/history (optional but recommended)
                // workflowInstance: true,
                // workflowHistory: true,
            },
        });
    },
    //   getById: async (recordId: string, opts?: { includeWorkflow?: boolean }) => {
    //   const includeWorkflow = opts?.includeWorkflow ?? false;
    //   return prisma.masterRecord.findUnique({
    //     where: { id: recordId },
    //     include: {
    //       currentStage: {
    //         include: {
    //           outgoingTransitions: includeWorkflow,
    //           incomingTransitions: includeWorkflow,
    //         },
    //       },
    //       masterObject: {
    //         select: {
    //           id: true,
    //           name: true,
    //           key: true,
    //           fields: true,
    //           resources: includeWorkflow
    //             ? {
    //                 select: {
    //                   id: true,
    //                   name: true,
    //                   workflows: {
    //                     include: {
    //                       stages: true,
    //                       transitions: true,
    //                     },
    //                   },
    //                 },
    //               }
    //             : false,
    //         },
    //       },
    //       createdBy: {
    //         select: { id: true, name: true, email: true },
    //       },
    //       linkedUser: {
    //         select: { id: true, name: true, email: true },
    //       },
    //       tasks: {
    //         include: {
    //           assignees: true,
    //           stage: true,
    //         },
    //       },
    //       auditLogs: true,
    //       workflowInstance: includeWorkflow
    //         ? {
    //             include: {
    //               currentStage: true,
    //               histories: true,
    //             },
    //           }
    //         : false,
    //     },
    //   });
    // },
};
export default masterRecordRepository;
const buildMasterRecordWhere = (filters) => {
    const where = {
        masterObjectId: filters.masterObjectId,
    };
    // isActive → maps to deletedAt
    if (filters.isActive === "active") {
        where.deletedAt = null;
        where.isActive = true;
    }
    else if (filters.isActive === "inactive") {
        where.deletedAt = { not: null };
        where.isActive = false;
    }
    if (filters.stageId) {
        where.currentStageId = filters.stageId;
    }
    // search across JSON fields
    if (filters.search) {
        where.OR = [
            {
                data: {
                    // * Only works for textual JSON fields —
                    contains: filters.search,
                },
            },
        ];
    }
    // date filters
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
const buildOrderBy = (filters) => {
    // Sort by stage.name
    if (filters.sortBy === "currentStageName") {
        return {
            currentStage: {
                name: filters.sortOrder,
            },
        };
    }
    // Sort by stageId
    if (filters.sortBy === "currentStageId") {
        return {
            currentStageId: filters.sortOrder,
        };
    }
    // Default sort (createdAt, updatedAt, id)
    return {
        [filters.sortBy]: filters.sortOrder,
    };
};
//# sourceMappingURL=masterRecord.repository.js.map