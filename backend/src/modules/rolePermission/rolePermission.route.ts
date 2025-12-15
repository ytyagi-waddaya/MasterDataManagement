import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import rolePermissionController from "./rolePermission.controller.js";

const router = Router();

// Update single permission access level
router.patch(
  "/:roleId/permissions/:permissionId/access",
  asyncHandler(rolePermissionController.updateAccessLevel)
);

// Grant all permissions of a module
router.patch(
  "/:roleId/modules/:moduleId/grant-all",
  asyncHandler(rolePermissionController.grantAllModulePermissions)
);

// Revoke all permissions of a module
router.patch(
  "/:roleId/modules/:moduleId/revoke-all",
  asyncHandler(rolePermissionController.revokeAllModulePermissions)
);

router.get(
  "/:roleId/permissions",
  asyncHandler(rolePermissionController.getRolePermissions)
);

// router.post("/:rolePermissionId/conditions", rolePermissionController.saveRolePermissionConditions);
// router.get("/:rolePermissionId/conditions", rolePermissionController.getRolePermissionConditions);
export default router;
