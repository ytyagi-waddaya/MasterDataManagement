import { Router } from "express";
import masterObjectController from "./masterObject.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  updateMasterObjectSchema,
  masterObjectIdSchema,
  masterObjectFilterSchema,
} from "./dto/masterObject.dto.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { requireAuth } from "../../middlewares/authMiddleware.js";

const router = Router();


router.get(
  "/",
  validate(masterObjectFilterSchema, "query"),
  asyncHandler(masterObjectController.getMasterObjects)
);

router.get(
  "/:masterObjectId",
  requireAuth,
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.getMasterObject)
);

router.put(
  "/:masterObjectId",
  validate(masterObjectIdSchema, "params"),
  validate(updateMasterObjectSchema, "body"),
  asyncHandler(masterObjectController.updateMasterObject)
);

router.patch(
  "/:masterObjectId/archive",
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.archiveMasterObject)
);

router.patch(
  "/:masterObjectId/restore",
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.restoreMasterObject)
);

router.delete(
  "/:masterObjectId",
  validate(masterObjectIdSchema, "params"),
  asyncHandler(masterObjectController.deleteMasterObject)
);

export default router;
