import { prisma } from "../../lib/prisma.js";
const actionsRepository = {
    create: (data) => {
        return prisma.action.create({ data });
    },
    //   createMany: (data: Prisma.ActionCreateInput[]) => {
    //     return prisma.action.createMany({ data, skipDuplicates: true });
    //   },
    read: async (filters) => {
        const where = buildModuleWhere(filters);
        const [data, total] = await Promise.all([
            prisma.action.findMany({
                where,
                skip: filters.skip,
                take: filters.take,
                orderBy: {
                    [filters.sortBy]: filters.sortOrder,
                },
            }),
            prisma.resource.count({ where }),
        ]);
        return {
            data,
            total,
            page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
            pageSize: filters.take || 10,
        };
    },
    update: ({ actionId }, data) => {
        return prisma.action.update({
            where: { id: actionId },
            data,
        });
    },
    archive: ({ actionId }) => {
        return prisma.action.update({
            where: { id: actionId },
            data: { deletedAt: new Date(), isActive: false },
        });
    },
    restore: ({ actionId }) => {
        return prisma.action.update({
            where: { id: actionId },
            data: { deletedAt: null, isActive: true },
        });
    },
    delete: ({ actionId }) => {
        return prisma.action.delete({ where: { id: actionId } });
    },
    readOne: ({ actionId }) => {
        return prisma.action.findUnique({ where: { id: actionId } });
    },
    findByKey: async (key) => {
        return prisma.action.findUnique({ where: { key } });
    },
    findByNameAndTenant: (name) => {
        return prisma.action.findFirst({
            where: { name },
        });
    },
    findByNamesAndTenant: (names) => {
        return prisma.action.findMany({
            where: { name: { in: names } },
        });
    },
    isDuplicateName: async (name, actionId) => {
        return prisma.action.findFirst({
            where: {
                name,
                id: { not: actionId },
            },
        });
    },
    findManyByIds: (ActionIds) => {
        return prisma.action.findMany({
            where: { id: { in: ActionIds } },
        });
    },
};
export default actionsRepository;
const buildModuleWhere = (filters) => {
    const where = {};
    // Search
    if (filters.search) {
        where.OR = [
            { name: { contains: filters.search, mode: "insensitive" } },
            { key: { contains: filters.search, mode: "insensitive" } },
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
    // isSystem
    if (filters.isSystem === "true")
        where.isSystem = true;
    else if (filters.isSystem === "false")
        where.isSystem = false;
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
//# sourceMappingURL=action.repository.js.map