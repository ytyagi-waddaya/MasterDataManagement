import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import actionsController from "./action.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  actionFilterSchema,
  actionIdSchema,
  actionIdsSchema,
  createActionSchema,
} from "./dto/action.dto.js";
import {
  createResourceSchema,
  updateResourceSchema,
} from "../resource/dto/resource.dto.js";

const router = Router();

// router.post("/bulk", asyncHandler(actionsController.createActionBulk));
router.patch(
  "/bulk/archive",
  validate(actionIdsSchema, "body"),
  asyncHandler(actionsController.archiveActions)
);
router.patch(
  "/bulk/restore",
  validate(actionIdsSchema, "body"),
  asyncHandler(actionsController.restoreActions)
);
router.delete(
  "/bulk",
  validate(actionIdsSchema, "body"),
  asyncHandler(actionsController.deleteActions)
);

router.post(
  "/",
  validate(createActionSchema, "body"),
  asyncHandler(actionsController.createAction)
);

router.get(
  "/",
  validate(actionFilterSchema, "query"),
  asyncHandler(actionsController.getActions)
);
router.get(
  "/:actionId",
  validate(actionIdSchema, "params"),
  asyncHandler(actionsController.getActionById)
);
router.put(
  "/:actionId",
  validate(actionIdSchema, "params"),
  validate(updateResourceSchema, "body"),
  asyncHandler(actionsController.updateActionById)
);
router.patch(
  "/:actionId/archive",
  validate(actionIdSchema, "params"),
  asyncHandler(actionsController.archiveAction)
);
router.patch(
  "/:actionId/restore",
  validate(actionIdSchema, "params"),
  asyncHandler(actionsController.restoreAction)
);
router.delete(
  "/:actionId",
  validate(actionIdSchema, "params"),
  asyncHandler(actionsController.deleteAction)
);

export default router;
