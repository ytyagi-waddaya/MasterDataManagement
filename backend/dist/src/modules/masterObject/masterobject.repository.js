import { prisma } from "../../lib/prisma.js";
const masterObjectRepository = {
    create: (data) => {
        return prisma.masterObject.create({ data });
    },
    read: async (filters) => {
        const where = buildModuleWhere(filters);
        const [data, total] = await Promise.all([
            prisma.masterObject.findMany({
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
    readOne: ({ masterObjectId }) => {
        return prisma.masterObject.findUnique({ where: { id: masterObjectId } });
    },
    findById: (id) => {
        return prisma.masterObject.findUnique({
            where: { id },
            include: {
                resources: true,
                schemas: {
                    where: { status: "PUBLISHED" },
                    orderBy: { version: "desc" },
                    take: 1,
                },
            },
        });
    },
    findByIdObj: (id) => {
        return prisma.masterObject.findUnique({
            where: { id },
            include: {
                /* =====================================================
                 MASTEROBJECT CORE
              ===================================================== */
                resources: true,
                formEventHooks: {
                    where: { deletedAt: null },
                },
                recordPermissions: {
                    where: { deletedAt: null },
                    include: {
                        role: true,
                        user: true,
                    },
                },
                /* =====================================================
                 SCHEMAS (LATEST FIRST)
              ===================================================== */
                schemas: {
                    where: { deletedAt: null },
                    orderBy: { version: "desc" },
                    include: {
                        /* =================================================
                         FIELD DEFINITIONS (ORDER IS CRITICAL)
                      ================================================= */
                        fieldDefinitions: {
                            where: { deletedAt: null },
                            orderBy: { order: "asc" },
                            include: {
                                /* -------- PERMISSIONS -------- */
                                fieldPermissions: {
                                    where: { deletedAt: null },
                                    include: {
                                        role: true,
                                        user: true,
                                    },
                                },
                                /* -------- VALIDATION RULES -------- */
                                fieldValidationRules: {
                                    where: { deletedAt: null },
                                    orderBy: { order: "asc" },
                                },
                                /* -------- FORMULA -------- */
                                fieldFormula: true,
                                /* -------- REFERENCE -------- */
                                fieldReference: {
                                    include: {
                                        targetObject: {
                                            select: {
                                                id: true,
                                                name: true,
                                                key: true,
                                            },
                                        },
                                    },
                                },
                                /* -------- CONDITIONAL BINDINGS -------- */
                                fieldConditionBindings: {
                                    where: { deletedAt: null },
                                },
                            },
                        },
                        /* =================================================
                         SCHEMA CHANGE LOG
                      ================================================= */
                        schemaChanges: {
                            where: { deletedAt: null },
                            orderBy: { createdAt: "desc" },
                        },
                    },
                },
                /* =====================================================
                 INBOUND FIELD REFERENCES (OTHER OBJECTS)
              ===================================================== */
                fieldReferences: {
                    where: { deletedAt: null },
                    include: {
                        field: {
                            select: {
                                id: true,
                                key: true,
                                label: true,
                            },
                        },
                    },
                },
            },
        });
    },
    findByIdWithSchema: ({ id, includeDraft, }) => {
        return prisma.masterObject.findUnique({
            where: { id },
            include: {
                resources: true,
                schemas: {
                    where: includeDraft
                        ? { status: { in: ["PUBLISHED", "DRAFT"] } }
                        : { status: "PUBLISHED" },
                    orderBy: { version: "desc" },
                    take: 1,
                },
            },
        });
    },
    findMany: () => {
        return prisma.masterObject.findMany({
            include: {
                resources: true,
            },
        });
    },
    findByName: (name) => {
        return prisma.masterObject.findFirst({ where: { name } });
    },
    isDuplicateName: async (name, id) => {
        return prisma.masterObject.findFirst({
            where: {
                name,
                id: { not: id },
            },
        });
    },
    update: (id, data) => {
        return prisma.masterObject.update({
            where: { id },
            data,
        });
    },
    archive: ({ masterObjectId }) => {
        return prisma.masterObject.update({
            where: { id: masterObjectId },
            data: {
                deletedAt: new Date(),
                isActive: false,
            },
        });
    },
    restore: ({ masterObjectId }) => {
        return prisma.masterObject.update({
            where: { id: masterObjectId },
            data: {
                deletedAt: null,
                isActive: true,
            },
        });
    },
    delete: ({ masterObjectId }) => {
        return prisma.masterObject.delete({
            where: { id: masterObjectId },
        });
    },
    findManyByIds: (ids) => {
        return prisma.masterObject.findMany({
            where: { id: { in: ids } },
            include: { resources: true },
        });
    },
};
export default masterObjectRepository;
const buildModuleWhere = (filters) => {
    const where = {};
    // Search
    if (filters.search) {
        where.OR = [
            { name: { contains: filters.search, mode: "insensitive" } },
            { key: { contains: filters.search, mode: "insensitive" } },
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
//# sourceMappingURL=masterobject.repository.js.map