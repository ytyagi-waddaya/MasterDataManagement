import { Prisma } from "../../../prisma/generated/client.js";
import {
  RoleFilterInput,
  RoleId,
} from "./dto/role.dto.js";
import { prisma } from "../../lib/prisma.js";

const roleRepository = {
  create: (data: Prisma.RoleCreateInput) => {
    return prisma.role.create({ data });
  },

  read: async (filters: RoleFilterInput) => {
    const where = buildModuleWhere(filters);
    const [data, total] = await Promise.all([
      prisma.role.findMany({
        where,
        skip: filters.skip,
        take: filters.take,
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      }),
      prisma.role.count({ where }),
    ]);

    return {
      data,
      total,
      page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
      pageSize: filters.take || 10,
    };
  },

  update: ({ roleId }: RoleId, data: Prisma.RoleUpdateInput) => {
    return prisma.role.update({
      where: { id: roleId },
      data,
    });
  },

  archive: ({ roleId }: RoleId) => {
    return prisma.role.update({
      where: { id: roleId },
      data: { deletedAt: new Date(), isActive: false },
    });
  },

  restore: ({ roleId }: RoleId) => {
    return prisma.role.update({
      where: { id: roleId },
      data: { deletedAt: null, isActive: true },
    });
  },

  delete: ({ roleId }: RoleId) => {
    return prisma.role.delete({ where: { id: roleId } });
  },

  findByKey: async (key: string) => {
    return prisma.role.findUnique({ where: { key } });
  },

  findByNameAndTenant: (name: string) => {
    return prisma.role.findFirst({
      where: { name },
    });
  },

  readOne: ({ roleId }: RoleId) => {
    return prisma.role.findUnique({ where: { id: roleId } });
  },

  roleById: ({ roleId }: RoleId) => {
    return prisma.role.findUnique({
      where: { id: roleId },
      include: {
        users: {
          include: {
            user: true,
            role: false,
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
        parents: {
          include: {
            parent: true,
          },
        },
        children: {
          include: {
            child: true,
          },
        },
      },
    });
  },

  findManyByIds: (RoleIds: string[]) => {
    return prisma.role.findMany({ where: { id: { in: RoleIds } } });
  },

  isDuplicateName: async (name: string, roleId: string) => {
    return prisma.role.findFirst({
      where: {
        name,
        id: { not: roleId },
      },
    });
  },
};

export default roleRepository;

// GET	/hierarchy	Get role hierarchy tree
// POST	/assign	Assign users to a role ({ roleId, userIds[] })
// POST	/revoke	Remove users from a role ({ roleId, userIds[] })
// POST	/attach-permission	Attach permissions to a role ({ roleId, permissionIds[] })
// POST	/detach-permission	Remove permissions from a role ({ roleId, permissionIds[] })

const buildModuleWhere = (filters: RoleFilterInput) => {
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
