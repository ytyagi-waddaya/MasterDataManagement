import { prisma } from "../../lib/prisma.js";
import { AccessLevel, Prisma } from "../../../prisma/generated/client.js";

const rolePermissionRepository = {
  /** Assign a permission to a role (with or without conditions) */
  assignPermissionToRole: async (
    roleId: string,
    permissionId: string,
    accessLevel: AccessLevel,
    conditions?: any,
    expression?: string | null
  ) => {
    const normalizedConditions = conditions ?? null;
    const normalizedExpression = expression ?? null;

    return prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: { roleId, permissionId },
      },
      update: {
        accessLevel,
        conditions: normalizedConditions,
        expression: normalizedExpression,
      },
      create: {
        roleId,
        permissionId,
        accessLevel,
        conditions: normalizedConditions,
        expression: normalizedExpression,
      },
    });
  },

  /** Remove a single permission from role */
  removePermissionFromRole: async (roleId: string, permissionId: string) => {
    return prisma.rolePermission.deleteMany({
      where: { roleId, permissionId },
    });
  },

  /** Get all permission IDs belonging to a module */
  getModulePermissionIds: async (moduleId: string): Promise<string[]> => {
    const permissions = await prisma.permission.findMany({
      where: {
        resource: {
          moduleId: moduleId,
        },
      },
      select: { id: true },
    });

    return permissions.map((p) => p.id);
  },
};

export default rolePermissionRepository;

//   saveRolePermissionConditions:(rolePermissionId: string, conditions: any, expression?: string) => {
//   return prisma.rolePermission.update({
//     where: { id: rolePermissionId },
//     data: {
//       conditions,
//       expression: expression ?? null,
//       updatedAt: new Date()
//     }
//   });
// },

// getRolePermissionConditions:(rolePermissionId: string) => {
//   return prisma.rolePermission.findUnique({
//     where: { id: rolePermissionId },
//     select: { id: true, conditions: true, expression: true, roleId: true, permissionId: true }
//   });
// }
