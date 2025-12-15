import { Prisma } from "../../../prisma/generated/client.js";
import { prisma } from "../../lib/prisma.js";
import { ModuleFilterInput, ModuleId } from "./dto/module.dto.js";

const moduleRepository = {
  create: async (data: Prisma.ModuleCreateInput) => {
    return prisma.module.create({ data });
  },

  read: async (filters: ModuleFilterInput) => {
    const where = buildModuleWhere(filters);

    const [data, total] = await Promise.all([
      prisma.module.findMany({
        where,
        skip: filters.skip,
        take: filters.take,
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
      }),

      prisma.module.count({ where }),
    ]);

    return {
      data,
      total,
      page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
      pageSize: filters.take || 10,
    };
  },

  update: async ({ moduleId }: ModuleId, data: Prisma.ModuleUpdateInput) => {
    return prisma.module.update({
      where: { id: moduleId },
      data,
    });
  },

  archive: async ({ moduleId }: ModuleId) => {
    return prisma.module.update({
      where: { id: moduleId },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  },

  restore: async ({ moduleId }: ModuleId) => {
    return prisma.module.update({
      where: { id: moduleId },
      data: {
        isActive: true,
        deletedAt: null,
      },
    });
  },

  delete: async ({ moduleId }: ModuleId) => {
    return prisma.module.delete({ where: { id: moduleId } });
  },

  readOne: async ({ moduleId }: ModuleId) => {
    return prisma.module.findUnique({ where: { id: moduleId } });
  },

  findByKey: async (key: string) => {
    return prisma.module.findUnique({ where: { key } });
  },

  findByNameAndTenant: async (name: string) => {
    return prisma.module.findFirst({ where: { name } });
  },

  isDuplicateName: async (name: string, moduleId: string) => {
    return prisma.module.findFirst({
      where: { name, id: { not: moduleId } },
    });
  },

  findManyByIds: async (moduleIds: string[]) => {
    return prisma.module.findMany({ where: { id: { in: moduleIds } } });
  },
};

export default moduleRepository;

// function

const buildModuleWhere = (filters: ModuleFilterInput) => {
  const where: any = {};

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
  } else if (filters.isActive === "inactive") {
    where.isActive = false;
    where.deletedAt = { not: null };
  }

  // isSystem
  if (filters.isSystem === "true") where.isSystem = true;
  else if (filters.isSystem === "false") where.isSystem = false;

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
