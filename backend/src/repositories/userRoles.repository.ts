import { prisma } from "../lib/prisma.js";
import { RoleIds } from "../modules/role/dto/role.dto.js";
import { UserIds } from "../modules/user/dto/user.dto.js";
import { RoleId, UserId } from "../types/userRoles.types.js";

const userRolesRepository = {
  /** Assign a single role to a single user */
  assign: async (userId: UserId, roleId: RoleId) => {
    return prisma.userRole.create({
      data: { userId: userId.userId, roleId: roleId.roleId },
    });
  },

  /** Assign multiple roles to multiple users */
  assignMany: async (
    userIds: UserIds,
    roleIds: RoleIds,
  ) => {
    const userIdArray = userIds.userIds;
    const roleIdArray = roleIds.roleIds;

    const data = userIdArray.flatMap((uid: string) =>
      roleIdArray.map((rid: string) => ({
        userId: uid,
        roleId: rid,
      }))
    );

    return prisma.userRole.createMany({
      data,
      skipDuplicates: true,
    });
  },

  /** Revoke a single role from a single user */
  revoke: async (userId: UserId, roleId: RoleId) => {
    return prisma.userRole.delete({
      where: {
        userId_roleId: {
          userId: userId.userId,
          roleId: roleId.roleId,
        },
      },
    });
  },

  /** Revoke multiple roles from multiple users */
  revokeMany: async (
    userIds: UserIds,
    roleIds: RoleIds,
  ) => {
    const userIdArray = userIds.userIds;
    const roleIdArray = roleIds.roleIds;

    return prisma.userRole.deleteMany({
      where: {
        userId: { in: userIdArray },
        roleId: { in: roleIdArray },
      },
    });
  },

  /** Get all roles assigned to a specific user */
  findRolesByUser: async (userId: UserId) => {
    return prisma.userRole.findMany({
      where: { userId: userId.userId },
      include: { role: true },
    });
  },

  /** Get all users assigned to a specific role */
  findUsersByRole: async (roleId: RoleId) => {
    return prisma.userRole.findMany({
      where: { roleId: roleId.roleId },
      include: { user: true },
    });
  },
};

export default userRolesRepository;
