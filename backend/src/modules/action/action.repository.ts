import { prisma } from "../../lib/prisma.js";
import {
  ActionFilterInput,
  ActionId,
  CreateActionInput,
  UpdateActionInput,
} from "./dto/action.dto.js";
import { Prisma } from "../../../prisma/generated/client.js";

const actionsRepository = {
  create: (data: Prisma.ActionCreateInput) => {
    return prisma.action.create({ data });
  },

  //   createMany: (data: Prisma.ActionCreateInput[]) => {
  //     return prisma.action.createMany({ data, skipDuplicates: true });
  //   },

  read: async (filters: ActionFilterInput) => {
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

  update: ({ actionId }: ActionId, data: Prisma.ActionUpdateInput) => {
    return prisma.action.update({
      where: { id: actionId },
      data,
    });
  },

  archive: ({ actionId }: ActionId) => {
    return prisma.action.update({
      where: { id: actionId },
      data: { deletedAt: new Date(), isActive: false },
    });
  },

  restore: ({ actionId }: ActionId) => {
    return prisma.action.update({
      where: { id: actionId },
      data: { deletedAt: null, isActive: true },
    });
  },

  delete: ({ actionId }: ActionId) => {
    return prisma.action.delete({ where: { id: actionId } });
  },

  readOne: ({ actionId }: ActionId) => {
    return prisma.action.findUnique({ where: { id: actionId } });
  },

  findByKey: async (key: string) => {
    return prisma.action.findUnique({ where: { key } });
  },

  findByNameAndTenant: (name: string) => {
    return prisma.action.findFirst({
      where: { name },
    });
  },

  findByNamesAndTenant: (names: string[]) => {
    return prisma.action.findMany({
      where: { name: { in: names } },
    });
  },

  isDuplicateName: async (name: string, actionId: string) => {
    return prisma.action.findFirst({
      where: {
        name,
        id: { not: actionId },
      },
    });
  },

  findManyByIds: (ActionIds: string[]) => {
    return prisma.action.findMany({
      where: { id: { in: ActionIds } },
    });
  },
};

export default actionsRepository;

const buildModuleWhere = (filters: ActionFilterInput) => {
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
