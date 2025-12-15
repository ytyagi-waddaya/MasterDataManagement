import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import masterRecordController from "./masterRecord.controller.js";
import { requireAuth } from "../../middlewares/authMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import { masterRecordFilterSchema } from "./dto/masterRecord.dto.js";


const router = Router();

router.post(
  "/",
  requireAuth,
  asyncHandler(masterRecordController.createMasterRecord)
);

router.get(
  "/",
  requireAuth,
   validate(masterRecordFilterSchema, "query"),
  asyncHandler(masterRecordController.getMasterRecords)
);

router.get(
  "/:recordId",
  requireAuth,
  asyncHandler(masterRecordController.getMasterRecord)
);

router.patch(
  "/:recordId/archive",
  asyncHandler(masterRecordController.archiveMasterRecord)
);

router.patch(
  "/:recordId/restore",
  asyncHandler(masterRecordController.restoreMasterRecord)
);

router.delete("/:recordId", asyncHandler(masterRecordController.deleteMasterRecord));

export default router;
