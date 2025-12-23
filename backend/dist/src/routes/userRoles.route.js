import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import userRolesController from "../controllers/userRoles.controller.js";
const router = Router();
router.post("/bulk/assign", asyncHandler(userRolesController.assignUserRolesBulk));
router.delete("/bulk/revoke", asyncHandler(userRolesController.revokeUserRolesBulk));
router.post("/:userId/roles/:roleId/assign", asyncHandler(userRolesController.assignUserRole));
router.delete("/:userId/roles/:roleId/revoke", asyncHandler(userRolesController.revokeUserRole));
router.get("/by-user/:userId", asyncHandler(userRolesController.getRolesByUser));
router.get("/by-role/:roleId", asyncHandler(userRolesController.getUsersByRole));
export default router;
//# sourceMappingURL=userRoles.route.js.map