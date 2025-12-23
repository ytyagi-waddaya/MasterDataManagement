import { Prisma } from "../../../prisma/generated/client.js";
import { prisma } from "../../lib/prisma.js";
import { ResourceFilterInput, ResourceId } from "./dto/resource.dto.js";

const resourcesRepository = {
  create: (data: Prisma.ResourceCreateInput) => {
    return prisma.resource.create({ data });
  },

  read: async (filters: ResourceFilterInput) => {
    const where = buildModuleWhere(filters);

    const [data, total] = await Promise.all([
      prisma.resource.findMany({
        where,
        skip: filters.skip,
        take: filters.take,
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
        include: {
          module: {
            select: {
              id: true,
              name: true,
            },
          },
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

  update: ({ resourceId }: ResourceId, data: Prisma.ResourceUpdateInput) => {
    return prisma.resource.update({
      where: { id: resourceId },
      data,
    });
  },

  archive: ({ resourceId }: ResourceId) => {
    return prisma.resource.update({
      where: { id: resourceId },
      data: { deletedAt: new Date(), isActive: false },
    });
  },

  restore: ({ resourceId }: ResourceId) => {
    return prisma.resource.update({
      where: { id: resourceId },
      data: { deletedAt: null, isActive: true },
    });
  },

  delete: ({ resourceId }: ResourceId) => {
    return prisma.resource.delete({ where: { id: resourceId } });
  },

  readOne: ({ resourceId }: ResourceId) => {
    return prisma.resource.findUnique({ where: { id: resourceId } });
  },

  getById: async ({ resourceId }: ResourceId) => {
    return prisma.resource.findUnique({
      where: { id: resourceId },
      include: {
        module: {
          select: { id: true, name: true },
        },
        masterObject: {
          select: {
            id: true,
            name: true,
            key: true,
            fieldDefinitions: true,
          },
        },
      },
    });
  },

  findByKey: async (key: string) => {
    return prisma.resource.findUnique({ where: { key } });
  },

  findByNameAndTenant: (name: string) => {
    return prisma.resource.findFirst({
      where: { name },
    });
  },

  findManyByIds: (ResourceIds: string[]) => {
    return prisma.resource.findMany({
      where: { id: { in: ResourceIds } },
    });
  },

  isDuplicateName: async (name: string, resourceId: string) => {
    return prisma.resource.findFirst({
      where: {
        name,
        id: { not: resourceId },
      },
    });
  },
};

export default resourcesRepository;

const buildModuleWhere = (filters: ResourceFilterInput) => {
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
