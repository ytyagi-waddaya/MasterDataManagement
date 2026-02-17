import { Prisma } from "../../../prisma/generated/client.js";
import {
  CreateUserInput,
  UpdateUserInput,
  UserEmail,
  userFilterInput,
  UserId,
  UserIds,
} from "./dto/user.dto.js";
import { prisma } from "../../lib/prisma.js";
import logger from "../../utils/logger.js";

const usersRepository = {
  create: (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data });
  },

  /** Bulk create users */
  createMany: (data: CreateUserInput[]) => {
    return prisma.user.createMany({ data });
  },

  read: async (filters: userFilterInput) => {
    const where = buildUserWhere(filters);
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: filters.skip,
        take: filters.take,
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
        include: {
          roles: { include: { role: true } },
          department: {
            include: {
              department: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data,
      total,
      page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
      pageSize: filters.take || 10,
    };
  },

  // readOne: ({ userId }: UserId) => {
  //   return prisma.user.findUnique({
  //     where: { id: userId },
  //     include: { roles: { include: { role: true } } },
  //   });
  // },

  // me: ({ userId }: { userId: string }) => {
  //   return prisma.user.findUnique({
  //     where: { id: userId },
  //     include: {
  //       roles: {
  //         include: {
  //           role: {
  //             include: {
  //               permissions: {
  //                 include: {
  //                   permission: {
  //                     include: {
  //                       resource: true,
  //                       action: true,
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
  readOne: ({ userId }: UserId) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        department: {
          include: {
            department: true,
          },
        },
      },
    });
  },


  me: ({ userId }: { userId: string }) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        department: {
          include: {
            department: true,

          },
        },
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: {
                      include: {
                        resource: true,
                        action: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  },


  findByEmail: ({ email }: UserEmail) => {
    return prisma.user.findUnique({
      where: { email }, // compound unique field
      include: {
        roles: { include: { role: true } },
        department: {
          include: {
            department: true,
          },
        },
      },
    });
  },

  findByOnlyEmail: ({ email }: UserEmail) => {
    try {
      return prisma.user.findUnique({
        where: { email },
        include: {
          roles: { include: { role: true } },
          department: {
            include: {
              department: true,
            },
          },
        },
      });

    } catch (err: any) {
      if (err?.code === "P1017") {
        logger.warn("[repo:user] prisma connection closed – retrying once");
        return prisma.user.findUnique({
          where: { email },
          include: {
            roles: { include: { role: true } },
            department: {
              include: {
                department: true,
              },
            },
          },
        });
      }
      throw err;
    }

  },

  findByEmails: (emails: string[]): Promise<UserEmail[]> =>
    prisma.user.findMany({
      where: {
        email: { in: emails },
      },
      select: { email: true },
    }),

  exists: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!user;
  },

  update: ({ userId }: UserId, data: Prisma.UserUpdateInput) => {
    return prisma.user.update({ where: { id: userId }, data });
  },

  archive: async ({ userId }: UserId) => {
    return await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date(), status: "INACTIVE" },
    });
  },

  activate: async ({ userId }: UserId) => {
    return await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: null, status: "ACTIVE" },
    });
  },

  delete: async ({ userId }: UserId) => {
    return await prisma.user.delete({
      where: { id: userId },
    });
  },

  findActiveUsers: (skip = 0, take = 10) => {
    return prisma.user.findMany({
      where: { deletedAt: null },
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: { roles: { include: { role: true } } },
    });
  },

  countAll: (where?: Record<string, any>) => {
    const baseWhere = { deletedAt: null, ...where };
    return prisma.user.count({ where: baseWhere });
  },

  getStats: async () => {
    const [total, active, deleted] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.user.count({ where: { deletedAt: { not: null } } }),
    ]);

    const byRole = await prisma.userRole.groupBy({
      by: ["roleId"],
      _count: { userId: true },
      orderBy: { roleId: "asc" },
    });

    const roleIds: string[] = byRole.map((r) => r.roleId);

    const roles: { id: string; name: string }[] = await prisma.role.findMany({
      where: { id: { in: roleIds } },
      select: { id: true, name: true },
    });

    const rolesWithCount = byRole.map((r) => {
      const roleFound = roles.find((role) => role.id === r.roleId);
      return { role: roleFound?.name || "Unknown", count: r._count.userId };
    });

    return { total, active, deleted, byRole: rolesWithCount };
  },

  getSignupStats: async (days = 30) => {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const users: { createdAt: Date }[] = await prisma.user.findMany({
      where: { createdAt: { gte: since }, deletedAt: null },
      select: { createdAt: true },
    });

    const stats: Record<string, number> = {};

    users.forEach((u) => {
      // Explicitly assert date is string
      const date = u.createdAt.toISOString().split("T")[0] as string;
      stats[date] = (stats[date] || 0) + 1;
    });

    return Object.entries(stats).map(([date, count]) => ({ date, count }));
  },

  findManyByIds: (UserIds: string[]) => {
    return prisma.user.findMany({ where: { id: { in: UserIds } } });
  },
};

export default usersRepository;

const buildUserWhere = (filters: userFilterInput) => {
  const where: any = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
      {
        department: {
          some: {
            department: {
              name: {
                contains: filters.search,
                mode: "insensitive",
              },
            },
          },
        },
      },
      { location: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.email) {
    where.email = { contains: filters.email, mode: "insensitive" };
  }

  if (filters.department) {
    where.department = {
      some: {
        department: {
          name: {
            contains: filters.department,
            mode: "insensitive",
          },
        },
      },
    };
  }

  if (filters.location) {
    where.location = { contains: filters.location, mode: "insensitive" };
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.role) {
    where.roles = {
      some: {
        roleId: filters.role,
      },
    };
  }

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

  // --------------------------------------------
  // SOFT-DELETED USERS? (Optional)
  // If you want to EXCLUDE soft-deleted by default:
  // where.deletedAt = null;
  // --------------------------------------------
  // Add based on business rules:
  // e.g., only include active soft-delete:
  //
  // if (filters.status !== "INACTIVE") {
  //   where.deletedAt = null;
  // }
  //

  return where;
};
