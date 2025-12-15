import { Router } from "express";

import modulesController from "./module.controller.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import {
  createModuleSchema,
  moduleFilterSchema,
  moduleIdSchema,
  moduleIdsSchema,
  updateModuleSchema,
} from "./dto/module.dto.js";
import { validate } from "../../middlewares/validate.js";

const router = Router();

router.patch(
  "/bulk/archive",
  // authorize("module.archive"),
  validate(moduleIdsSchema, "body"),
  asyncHandler(modulesController.archiveModules)
);

router.patch(
  "/bulk/restore",
  validate(moduleIdsSchema, "body"),
  asyncHandler(modulesController.restoreModules)
);

router.delete(
  "/bulk",
  validate(moduleIdsSchema, "body"),
  asyncHandler(modulesController.deleteModules)
);

router.post(
  "/",
  validate(createModuleSchema, "body"),
  asyncHandler(modulesController.createModule)
);

router.get(
  "/",
  validate(moduleFilterSchema, "query"),
  asyncHandler(modulesController.getModules)
);

router.get(
  "/modules-with-resources",
  asyncHandler(modulesController.getModulesWithResources)
);

router.get(
  "/:moduleId",
  validate(moduleIdSchema, "params"),
  asyncHandler(modulesController.getModuleById)
);

router.put(
  "/:moduleId",
  validate(moduleIdSchema, "params"),
  validate(updateModuleSchema, "body"),
  asyncHandler(modulesController.updateModuleById)
);

router.patch(
  "/:moduleId/archive",
  validate(moduleIdSchema, "params"),
  asyncHandler(modulesController.archiveModule)
);

router.patch(
  "/:moduleId/restore",
  validate(moduleIdSchema, "params"),
  asyncHandler(modulesController.restoreModule)
);

router.delete(
  "/:moduleId",
  validate(moduleIdSchema, "params"),
  asyncHandler(modulesController.deleteModule)
);


export default router;
