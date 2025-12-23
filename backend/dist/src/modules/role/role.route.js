import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import roleController from "./role.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createRoleSchema, roleFilterSchema, roleIdSchema, roleIdsSchema, updateRoleSchema, } from "./dto/role.dto.js";
const router = Router();
router.patch("/bulk/archive", validate(roleIdsSchema, "body"), asyncHandler(roleController.archiveRoles));
router.patch("/bulk/restore", validate(roleIdsSchema, "body"), asyncHandler(roleController.restoreRoles));
router.delete("/bulk", validate(roleIdsSchema, "body"), asyncHandler(roleController.deleteRoles));
router.post("/", validate(createRoleSchema, "body"), asyncHandler(roleController.createRole));
router.get("/", validate(roleFilterSchema, "query"), asyncHandler(roleController.getRoles));
router.get("/:roleId", validate(roleIdSchema, "params"), asyncHandler(roleController.getRoleById));
router.put("/:roleId", validate(roleIdSchema, "params"), validate(updateRoleSchema, "body"), asyncHandler(roleController.updateRoleById));
router.patch("/:roleId/archive", validate(roleIdSchema, "params"), asyncHandler(roleController.archiveRole));
router.patch("/:roleId/restore", validate(roleIdSchema, "params"), asyncHandler(roleController.restoreRole));
router.delete("/:roleId", validate(roleIdSchema, "params"), asyncHandler(roleController.deleteRole));
export default router;
//# sourceMappingURL=role.route.js.map