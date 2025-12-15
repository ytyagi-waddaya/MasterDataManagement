import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import permissionController from "./permission.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  permissionFilterSchema,
  permissionIdSchema,
  permissionIdsSchema,
  updatePermissionConditionSchema,
} from "./dto/permission.dto.js";
import { actionIdSchema } from "../action/dto/action.dto.js";
import { roleIdSchema } from "../role/dto/role.dto.js";

const router = Router();

router.post(
  "/generate",
  asyncHandler(permissionController.generatePermissions)
);

router.get(
  "/",
  validate(permissionFilterSchema, "query"),
  asyncHandler(permissionController.getPermissions)
);
router.get(
  "/:permissionId",
  validate(permissionIdSchema, "params"),
  asyncHandler(permissionController.getPermissionById)
);
router.get(
  "/by-role/:roleId",
  validate(roleIdSchema, "params"),
  asyncHandler(permissionController.getPermissionsByRole)
);
router.get(
  "/by-resource/:resourceId",
  validate(permissionIdSchema, "params"),
  asyncHandler(permissionController.getPermissionsByResource)
);
router.get(
  "/by-action/:actionId",
  validate(actionIdSchema, "params"),
  asyncHandler(permissionController.getPermissionsByAction)
);

router.put(
  "/:permissionId/condition",
  validate(permissionIdSchema, "params"),
  validate(updatePermissionConditionSchema, "body"),
  asyncHandler(permissionController.updatePermissionCondition)
);

router.patch(
  "/:permissionId/archive",
  validate(permissionIdSchema, "params"),
  asyncHandler(permissionController.archivePermission)
);

router.patch(
  "/:permissionId/restore",
  validate(permissionIdSchema, "params"),
  asyncHandler(permissionController.restorePermission)
);

router.delete(
  "/:permissionId",
  validate(permissionIdSchema, "params"),
  asyncHandler(permissionController.deletePermission)
);

router.patch(
  "/bulk/archive",
  validate(permissionIdsSchema, "body"),
  asyncHandler(permissionController.archivePermissions)
);
router.patch(
  "/bulk/restore",
  validate(permissionIdsSchema, "body"),
  asyncHandler(permissionController.restorePermissions)
);
router.delete(
  "/bulk/delete",
  validate(permissionIdsSchema, "body"),
  asyncHandler(permissionController.deletePermissions)
);

router.post(
  "/assign-to-role",
  asyncHandler(permissionController.assignPermissionsToRole)
);

// router.post("/:permissionId/conditions", permissionController.savePermissionConditions);
// router.get("/:permissionId/conditions", permissionController.getPermissionConditions);


export default router;
