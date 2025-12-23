import { prisma } from "../../lib/prisma.js";
const rolePermissionRepository = {
    /** Assign a permission to a role (with or without conditions) */
    assignPermissionToRole: async (roleId, permissionId, accessLevel, conditions, expression) => {
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
    removePermissionFromRole: async (roleId, permissionId) => {
        return prisma.rolePermission.deleteMany({
            where: { roleId, permissionId },
        });
    },
    /** Get all permission IDs belonging to a module */
    getModulePermissionIds: async (moduleId) => {
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
//# sourceMappingURL=rolePermission.repository.js.map