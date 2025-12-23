import { SavePermissionConditionsDto } from "../validators/condition.schema.js";
import { z } from "zod";
export declare class PermissionConditionService {
    savePermissionConditions(payload: z.infer<typeof SavePermissionConditionsDto>, tenantId?: string, meta?: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        resourceId: string;
        key: string;
        isSystem: boolean;
        category: string | null;
        actionId: string;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        expression: string | null;
    }>;
    getPermissionConditions(permissionId: string): Promise<{
        id: string;
        conditions: import("@prisma/client/runtime/client").JsonValue;
        expression: string | null;
    } | null>;
}
//# sourceMappingURL=permissionCondition.service.d.ts.map