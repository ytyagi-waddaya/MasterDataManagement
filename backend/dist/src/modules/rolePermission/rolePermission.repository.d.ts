import { AccessLevel, Prisma } from "../../../prisma/generated/client.js";
declare const rolePermissionRepository: {
    /** Assign a permission to a role (with or without conditions) */
    assignPermissionToRole: (roleId: string, permissionId: string, accessLevel: AccessLevel, conditions?: any, expression?: string | null) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
        permissionId: string;
        accessLevel: AccessLevel;
    }>;
    /** Remove a single permission from role */
    removePermissionFromRole: (roleId: string, permissionId: string) => Promise<Prisma.BatchPayload>;
    /** Get all permission IDs belonging to a module */
    getModulePermissionIds: (moduleId: string) => Promise<string[]>;
};
export default rolePermissionRepository;
//# sourceMappingURL=rolePermission.repository.d.ts.map