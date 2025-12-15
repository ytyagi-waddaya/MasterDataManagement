import { Prisma } from "../../../prisma/generated/client.js";
import { prisma } from "../../lib/prisma.js";
import {
  masterObjectFilterInput,
  masterObjectId,
} from "./dto/masterObject.dto.js";

const masterObjectRepository = {
  create: (data: Prisma.MasterObjectCreateInput) => {
    return prisma.masterObject.create({ data });
  },

  read: async (filters: masterObjectFilterInput) => {
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

  readOne: ({ masterObjectId }: masterObjectId) => {
    return prisma.masterObject.findUnique({ where: { id: masterObjectId } });
  },

  findById: (id: string) => {
    return prisma.masterObject.findUnique({
      where: { id },
      include: {
        resources: true,
        records: true,
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

  findByName: (name: string) => {
    return prisma.masterObject.findFirst({ where: { name } });
  },

  isDuplicateName: async (name: string, id: string) => {
    return prisma.masterObject.findFirst({
      where: {
        name,
        id: { not: id },
      },
    });
  },

  update: (id: string, data: Prisma.MasterObjectUpdateInput) => {
    return prisma.masterObject.update({
      where: { id },
      data,
    });
  },

  archive: ({ masterObjectId }: masterObjectId) => {
    return prisma.masterObject.update({
      where: { id: masterObjectId },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  },

  restore: ({ masterObjectId }: masterObjectId) => {
    return prisma.masterObject.update({
      where: { id: masterObjectId },
      data: {
        deletedAt: null,
        isActive: true,
      },
    });
  },

  delete: ({ masterObjectId }: masterObjectId) => {
    return prisma.masterObject.delete({
      where: { id: masterObjectId },
    });
  },

  findManyByIds: (ids: string[]) => {
    return prisma.masterObject.findMany({
      where: { id: { in: ids } },
      include: { resources: true },
    });
  },
};

export default masterObjectRepository;

const buildModuleWhere = (filters: masterObjectFilterInput) => {
  const where: any = {};

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
