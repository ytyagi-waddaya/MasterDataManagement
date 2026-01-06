import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import resourcesController from "./resource.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  createResourceSchema,
  resourceFilterSchema,
  resourceIdSchema,
  resourceIdsSchema,
  updateResourceSchema,
} from "./dto/resource.dto.js";
import { requireAuth } from "../../middlewares/authMiddleware.js";
 
const router = Router();

//  router.post("/bulk", asyncHandler(resourcesController.createResourceBulk));
router.patch(
  "/bulk/archive",
  validate(resourceIdsSchema, "body"),
  asyncHandler(resourcesController.archiveResources)
);
router.patch(
  "/bulk/restore",
  validate(resourceIdsSchema, "body"),
  asyncHandler(resourcesController.restoreResources)
);
router.delete(
  "/bulk",
  validate(resourceIdsSchema, "body"),
  asyncHandler(resourcesController.deleteResources)
);

router.post(
  "/",
  validate(createResourceSchema, "body"),
  asyncHandler(resourcesController.createResource)
);

router.get(
  "/",
  validate(resourceFilterSchema, "query"),
  asyncHandler(resourcesController.getResources)
);

router.get(
  "/:resourceId",
  validate(resourceIdSchema, "params"),
  asyncHandler(resourcesController.getResourceById)
);
router.get(
  "/:resourceId/fields",
  resourcesController.getFields
);
router.put(
  "/:resourceId",
  validate(resourceIdSchema, "params"),
  validate(updateResourceSchema, "body"),
  asyncHandler(resourcesController.updateResourceById)
);
router.patch("/:resourceId/archive", 
  asyncHandler(resourcesController.archiveResource));

router.patch(
  "/:resourceId/restore",
  validate(resourceIdSchema, "params"),
  asyncHandler(resourcesController.restoreResource)
);
router.delete(
  "/:resourceId",
  validate(resourceIdSchema, "params"),
  asyncHandler(resourcesController.deleteResource)
);

export default router;
