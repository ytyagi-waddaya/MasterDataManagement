import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import usersController from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  createUserSchema,
  updateUserSchema,
  userFilterSchema,
  userIdSchema,
  userIdsSchema,
} from "./dto/user.dto.js";
import { requireAuth } from "../../middlewares/authMiddleware.js";

const router = Router();

// router.post("/bulk", asyncHandler(usersController.createUsers));
router.patch(
  "/bulk/archive",
  validate(userIdsSchema, "body"),
  asyncHandler(usersController.archiveUsers)
);
router.patch(
  "/bulk/restore",
  validate(userIdsSchema, "body"),
  asyncHandler(usersController.restoreUsers)
);
router.delete(
  "/bulk",
  validate(userIdsSchema, "body"),
  asyncHandler(usersController.deleteUsers)
);

router.post(
  "/",
  validate(createUserSchema, "body"),
  asyncHandler(usersController.createUser)
);

router.get("/stats", asyncHandler(usersController.getUserStats));

router.get("/me", requireAuth,  asyncHandler(usersController.me));

router.get(
  "/",
  validate(userFilterSchema, "query"),
  asyncHandler(usersController.getUsers)
);
router.get(
  "/:userId",
  validate(userIdSchema, "params"),
  asyncHandler(usersController.getUser)
);
router.put(
  "/:userId",
  validate(userIdSchema, "params"),
  validate(updateUserSchema, "body"),
  asyncHandler(usersController.updateUser)
);
router.patch(
  "/:userId/archive",
  validate(userIdSchema, "params"),
  asyncHandler(usersController.archiveUser)
);
router.patch(
  "/:userId/restore",
  validate(userIdSchema, "params"),
  asyncHandler(usersController.restoreUser)
);
router.delete(
  "/:userId",
  validate(userIdSchema, "params"),
  asyncHandler(usersController.deleteUser)
);

router.post(
  "/:userId/assign-department",
  validate(userIdSchema, "params"),
  asyncHandler(usersController.assignDepartment)
);

// GET all departments of user
router.get(
  "/:userId/departments",
  validate(userIdSchema, "params"),
  asyncHandler(usersController.getUserDepartments)
);

// REMOVE department(s) from user
router.delete(
  "/:userId/remove-department",
  validate(userIdSchema, "params"),
  asyncHandler(usersController.removeDepartment)
);

router.get(
  "/:userId/available-roles",
  validate(userIdSchema, "params"),
  asyncHandler(usersController.getAvailableRoles)
);

export default router;
