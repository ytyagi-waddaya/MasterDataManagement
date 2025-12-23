import { SavePermissionConditionsDto } from "../validators/condition.schema.js";
import { validateConditionGroupAsync } from "./conditionValidator.js";
import { redis } from "../redis/client.js";
import permissionRepository from "../modules/permission/permission.repository.js";
// const repo = new PermissionConditionRepository();
export class PermissionConditionService {
    async savePermissionConditions(payload, tenantId, meta) {
        SavePermissionConditionsDto.parse(payload);
        // validate fields against registry
        await validateConditionGroupAsync(payload.conditions);
        // optional expression generation (you can keep your generator)
        const expression = payload.expression ?? generateExpressionFromConditionGroup(payload.conditions);
        // persist
        const res = await permissionRepository.savePermissionConditions(payload.permissionId, payload.conditions, expression);
        // publish invalidation: permission-level
        await redis.publish("permission:conditions:invalidate", JSON.stringify({
            permissionId: payload.permissionId,
            tenantId
        }));
        return res;
    }
    async getPermissionConditions(permissionId) {
        return permissionRepository.getPermissionConditions(permissionId);
    }
}
/**
 * keep your expression generator implementation here or import it
 */
function generateExpressionFromConditionGroup(group) {
    // same as previous generator — safe, only for logging/debug
    // ... implement or import your generator
    return "compiled-expression";
}
//# sourceMappingURL=permissionCondition.service.js.map