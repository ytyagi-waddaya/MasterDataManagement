import { Router } from "express";
import masterObjectController from "./masterObject.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  updateMasterObjectSchema,
  masterObjectIdSchema,
  masterObjectFilterSchema,
  publishSchemaSchema,
} from "./dto/masterObject.dto.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { requireAuth } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get(
  "/",
  validate(masterObjectFilterSchema, "query"),
  asyncHandler(masterObjectController.getMasterObjects),
);

router.get(
  "/:masterObjectId",
  requireAuth,
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.getMasterObject),
);

// Save draft
router.put(
  "/:masterObjectId",
  requireAuth,
  validate(masterObjectIdSchema, "params"),
  validate(updateMasterObjectSchema, "body"),
  asyncHandler(masterObjectController.updateMasterObject)
);

// Publish new schema
router.post(
  "/:masterObjectId/publish",
  requireAuth,
  validate(masterObjectIdSchema, "params"),
  validate(publishSchemaSchema, "body"),
  asyncHandler(masterObjectController.publishMasterObject)
);

router.patch(
  "/:masterObjectId/archive",
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.archiveMasterObject),
);

router.patch(
  "/:masterObjectId/restore",
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.restoreMasterObject),
);

router.delete(
  "/:masterObjectId",
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.deleteMasterObject),
);

router.post(
  "/:masterObjectId/duplicate",
  requireAuth,
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.duplicateSchema),
);

export default router;
