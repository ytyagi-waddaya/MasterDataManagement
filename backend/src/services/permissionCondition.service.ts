// import { SavePermissionConditionsDto, SaveRolePermissionConditionsDto } from "../validators/condition.schema.js";
// import { validateConditionGroupAsync, clearRegistryCache } from "./conditionValidator.js";

// import { z } from "zod";
// import { redis } from "../redis/client.js";
// import { permission } from "process";
// import permissionRepository from "../modules/permission/permission.repository.js";
// import rolePermissionRepository from "../modules/rolePermission/rolePermission.repository.js";

// // const repo = new PermissionConditionRepository();

// export class PermissionConditionService {
//   async savePermissionConditions(payload: z.infer<typeof SavePermissionConditionsDto>, tenantId?: string, meta?: any) {
//     SavePermissionConditionsDto.parse(payload);
//     // validate fields against registry
//     await validateConditionGroupAsync(payload.conditions);

//     // optional expression generation (you can keep your generator)
//     const expression = payload.expression ?? generateExpressionFromConditionGroup(payload.conditions);

//     // persist
//     const res = await permissionRepository.savePermissionConditions(payload.permissionId, payload.conditions, expression);

//     // publish invalidation: permission-level
//     await redis.publish("permission:conditions:invalidate", JSON.stringify({
//       permissionId: payload.permissionId,
//       tenantId
//     }));

//     return res;
//   }

//   async getPermissionConditions(permissionId: string) {
//     return permissionRepository.getPermissionConditions(permissionId);
//   }

//   // async saveRolePermissionConditions(payload: z.infer<typeof SaveRolePermissionConditionsDto>, tenantId?: string, meta?: any) {
//   //   SaveRolePermissionConditionsDto.parse(payload);
//   //   await validateConditionGroupAsync(payload.conditions);
//   //   const expression = payload.expression ?? generateExpressionFromConditionGroup(payload.conditions);
//   //   const res = await rolePermissionRepository.saveRolePermissionConditions(payload.rolePermissionId, payload.conditions, expression);

//   //   // publish invalidation for rolePermission
//   //   await redis.publish("rolepermission:conditions:invalidate", JSON.stringify({
//   //     rolePermissionId: payload.rolePermissionId,
//   //     tenantId
//   //   }));

//   //   return res;
//   // }

//   // async getRolePermissionConditions(rolePermissionId: string) {
//   //   return rolePermissionRepository.getRolePermissionConditions(rolePermissionId);
//   // }
// }

// /**
//  * keep your expression generator implementation here or import it
//  */
// function generateExpressionFromConditionGroup(group: any): string {
//   // same as previous generator — safe, only for logging/debug
//   // ... implement or import your generator
//   return "compiled-expression";
// }

import {
  SavePermissionConditionsDto,
  SaveRolePermissionConditionsDto,
} from "../validators/condition.schema.js";
import {
  validateConditionGroupAsync,
  clearRegistryCache,
} from "./conditionValidator.js";

import { z } from "zod";
import { redis, USE_REDIS } from "../redis/client.js";
import permissionRepository from "../modules/permission/permission.repository.js";
import rolePermissionRepository from "../modules/rolePermission/rolePermission.repository.js";
import { logger } from "../utils/logger.js";

// const repo = new PermissionConditionRepository();

export class PermissionConditionService {
  async savePermissionConditions(
    payload: z.infer<typeof SavePermissionConditionsDto>,
    tenantId?: string,
    meta?: any
  ) {
    SavePermissionConditionsDto.parse(payload);

    // validate fields against registry
    await validateConditionGroupAsync(payload.conditions);

    // optional expression generation
    const expression =
      payload.expression ??
      generateExpressionFromConditionGroup(payload.conditions);

    // persist
    const res = await permissionRepository.savePermissionConditions(
      payload.permissionId,
      payload.conditions,
      expression
    );

    // publish invalidation: permission-level
    if (!USE_REDIS || !redis) {
      logger.warn(
        "[permissionCondition] redis disabled, skipping cache invalidation"
      );
      return res;
    }

    try {
      await redis.publish(
        "permission:conditions:invalidate",
        JSON.stringify({
          permissionId: payload.permissionId,
          tenantId,
        })
      );
    } catch (err) {
      logger.error(
        "[permissionCondition] failed to publish invalidation",
        err
      );
    }

    return res;
  }

  async getPermissionConditions(permissionId: string) {
    return permissionRepository.getPermissionConditions(permissionId);
  }

  // async saveRolePermissionConditions(
  //   payload: z.infer<typeof SaveRolePermissionConditionsDto>,
  //   tenantId?: string,
  //   meta?: any
  // ) {
  //   SaveRolePermissionConditionsDto.parse(payload);
  //   await validateConditionGroupAsync(payload.conditions);
  //
  //   const expression =
  //     payload.expression ??
  //     generateExpressionFromConditionGroup(payload.conditions);
  //
  //   const res =
  //     await rolePermissionRepository.saveRolePermissionConditions(
  //       payload.rolePermissionId,
  //       payload.conditions,
  //       expression
  //     );
  //
  //   if (!USE_REDIS || !redis) {
  //     logger.warn(
  //       "[permissionCondition] redis disabled, skipping role-permission invalidation"
  //     );
  //     return res;
  //   }
  //
  //   try {
  //     await redis.publish(
  //       "rolepermission:conditions:invalidate",
  //       JSON.stringify({
  //         rolePermissionId: payload.rolePermissionId,
  //         tenantId,
  //       })
  //     );
  //   } catch (err) {
  //     logger.error(
  //       "[permissionCondition] failed to publish role-permission invalidation",
  //       err
  //     );
  //   }
  //
  //   return res;
  // }

  // async getRolePermissionConditions(rolePermissionId: string) {
  //   return rolePermissionRepository.getRolePermissionConditions(rolePermissionId);
  // }
}

/**
 * keep your expression generator implementation here or import it
 */
function generateExpressionFromConditionGroup(group: any): string {
  // same as previous generator — safe, only for logging/debug
  return "compiled-expression";
}
