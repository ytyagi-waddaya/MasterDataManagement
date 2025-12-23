import { UpdateAccessLevelInput } from "./dto/rolePermission.dto.js";
import { ActorMeta } from "../../types/action.types.js";
declare const rolePermissionService: {
    /** Update a single permission using FULL, NONE, CONDITIONAL */
    updateAccessLevel: ({ roleId, permissionId, input, meta, }: {
        roleId: string;
        permissionId: string;
        input: UpdateAccessLevelInput;
        meta?: ActorMeta;
    }) => Promise<{
        before: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roleId: string;
            conditions: import("@prisma/client/runtime/client").JsonValue | null;
            expression: string | null;
            permissionId: string;
            accessLevel: import("../../../prisma/generated/enums.js").AccessLevel;
        } | null;
        after: any;
    }>;
    /** Grant all permissions of a module */
    grantAllModulePermissions: ({ roleId, moduleId, }: {
        roleId: string;
        moduleId: string;
    }) => Promise<{
        count: number;
    }>;
    /** Revoke all permissions of a module */
    revokeAllModulePermissions: ({ roleId, moduleId, }: {
        roleId: string;
        moduleId: string;
    }) => Promise<{
        revoked: number;
    }>;
};
export default rolePermissionService;
//# sourceMappingURL=rolePermission.service.d.ts.map