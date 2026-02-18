import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { validate } from "../../middlewares/validate.js";
import departmentController from "./department.controller.js";
import {
  departmentIdSchema,
  departmentIdsSchema,
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./dto/department.dto.js";

const router = Router();

/* -------------------- BULK -------------------- */

router.patch(
  "/bulk/archive",
  validate(departmentIdsSchema, "body"),
  asyncHandler(departmentController.archiveDepartments)
);

router.patch(
  "/bulk/restore",
  validate(departmentIdsSchema, "body"),
  asyncHandler(departmentController.restoreDepartments)
);

router.delete(
  "/bulk",
  validate(departmentIdsSchema, "body"),
  asyncHandler(departmentController.deleteDepartments)
);

/* -------------------- CRUD -------------------- */

router.post(
  "/",
  validate(createDepartmentSchema, "body"),
  asyncHandler(departmentController.create)
);

router.get("/", asyncHandler(departmentController.getAll));

router.get(
  "/:departmentId",
  validate(departmentIdSchema, "params"),
  asyncHandler(departmentController.getById)
);

router.put(
  "/:departmentId",
  validate(departmentIdSchema, "params"),
  validate(updateDepartmentSchema, "body"),
  asyncHandler(departmentController.update)
);

/* -------------------- SINGLE ARCHIVE/RESTORE -------------------- */

router.patch(
  "/:departmentId/archive",
  validate(departmentIdSchema, "params"),
  asyncHandler(departmentController.archiveDepartment)
);

router.patch(
  "/:departmentId/restore",
  validate(departmentIdSchema, "params"),
  asyncHandler(departmentController.restoreDepartment)
);

router.delete(
  "/:departmentId",
  validate(departmentIdSchema, "params"),
  asyncHandler(departmentController.deleteDepartment)
);

/* -------------------- ROLE ASSIGN -------------------- */

router.post("/assign-role", asyncHandler(departmentController.assignRole));
router.post("/remove-role", asyncHandler(departmentController.removeRole));

/* -------------------- GET ROLES BY DEPARTMENT -------------------- */

router.get(
  "/:departmentId/roles",
  validate(departmentIdSchema, "params"),
  asyncHandler(departmentController.getDepartmentRoles)
);


export default router;
