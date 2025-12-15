import { Prisma } from "../../../prisma/generated/client.js";
import { prisma } from "../../lib/prisma.js";
import {
  PermissionFilterInput,
  PermissionId,
} from "./dto/permission.dto.js";

const permissionRepository = {
  read: async (filters: PermissionFilterInput) => {
    const where = buildModuleWhere(filters);

    const [data, total] = await Promise.all([
      prisma.permission.findMany({
        where,
        skip: filters.skip,
        take: filters.take,
        orderBy: { [filters.sortBy]: filters.sortOrder },
        include: {
          action: true,
          resource: {
            include: {
              module: true,
            },
          },
        },
      }),
      prisma.permission.count({ where }),
    ]);

    return {
      data,
      total,
      page: Math.floor(filters.skip / filters.take) + 1,
      pageSize: filters.take,
    };
  },

  readOne: ({ permissionId }: PermissionId) => {
    return prisma.permission.findUnique({
      where: { id: permissionId },
      include: { action: true, resource: true },
    });
  },

  permissionById: ({ permissionId }: PermissionId) => {
    return prisma.permission.findUnique({
      where: { id: permissionId },
      include: { action: true, resource: true },
    });
  },

  update: (
    { permissionId }: PermissionId,
    data: Prisma.PermissionUpdateInput
  ) => {
    return prisma.permission.update({
      where: { id: permissionId },
      data,
    });
  },

  isDuplicateName: async (name: string, permissionId: string) => {
    return prisma.permission.findFirst({
      where: {
        name,
        id: { not: permissionId },
      },
    });
  },

  findManyByIds: (ids: string[]) => {
    return prisma.permission.findMany({
      where: { id: { in: ids } },
    });
  },

  archive: ({ permissionId }: PermissionId) => {
    return prisma.permission.update({
      where: { id: permissionId },
      data: { deletedAt: new Date(), isActive: false },
    });
  },

  restore: ({ permissionId }: PermissionId) => {
    return prisma.permission.update({
      where: { id: permissionId },
      data: { deletedAt: null, isActive: true },
    });
  },

  delete: ({ permissionId }: PermissionId) => {
    return prisma.permission.delete({
      where: { id: permissionId },
    });
  },

  archiveMany: (ids: string[]) => {
    return prisma.permission.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: new Date(), isActive: false },
    });
  },

  restoreMany: (ids: string[]) => {
    return prisma.permission.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: null, isActive: true },
    });
  },

  deleteMany: (ids: string[]) => {
    return prisma.permission.deleteMany({
      where: { id: { in: ids } },
    });
  },

  findByRoleId: (roleId: string) => {
    return prisma.permission.findMany({
      where: {
        roles: { some: { roleId } },
        deletedAt: null,
      },
      include: { action: true, resource: true },
    });
  },

  findByResourceId: (resourceId: string) => {
    return prisma.permission.findMany({
      where: { resourceId, deletedAt: null },
      include: { action: true, resource: true },
    });
  },

  findByActionId: (actionId: string) => {
    return prisma.permission.findMany({
      where: { actionId, deletedAt: null },
      include: { action: true, resource: true },
    });
  },

    savePermissionConditions: (permissionId: string, conditions: any, expression?: string) => {
    return prisma.permission.update({
      where: { id: permissionId },
      data: {
        conditions,
        expression: expression ?? null,
        updatedAt: new Date()
      }
    });
  },

  getPermissionConditions: (permissionId: string) => {
    return prisma.permission.findUnique({
      where: { id: permissionId },
      select: { id: true, conditions: true, expression: true }
    });
  }
};

export default permissionRepository;

const buildModuleWhere = (filters: PermissionFilterInput) => {
  const where: any = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { key: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.resourceId) where.resourceId = filters.resourceId;
  if (filters.actionId) where.actionId = filters.actionId;
  if (filters.moduleId) where.moduleId = filters.moduleId;

  if (filters.isActive === "active") {
    where.isActive = true;
    where.deletedAt = null;
  } else if (filters.isActive === "inactive") {
    where.isActive = false;
  }

  if (filters.isSystem === "true") where.isSystem = true;
  else if (filters.isSystem === "false") where.isSystem = false;

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
