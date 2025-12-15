import { Router } from "express";
import policyController from "../controllers/policy.controller.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = Router();

// Create
router.post("/", asyncHandler(policyController.createPolicy));
router.post("/bulk", asyncHandler(policyController.createPoliciesBulk));

// Read
router.get("/", asyncHandler(policyController.getPolicies));
router.get("/:id", asyncHandler(policyController.getPolicyById));

// Update
router.put("/:id", asyncHandler(policyController.updatePolicyById));

// Soft delete & restore
router.patch("/soft-delete/:id", asyncHandler(policyController.softDeletePolicy));
router.patch("/restore/:id", asyncHandler(policyController.restorePolicy));
router.patch("/soft-delete/bulk", asyncHandler(policyController.softDeleteManyPolicies));
router.patch("/restore/bulk", asyncHandler(policyController.restoreManyPolicies));

// Hard delete
router.delete("/:id", asyncHandler(policyController.deletePolicy));
router.delete("/bulk", asyncHandler(policyController.deleteManyPolicies));

// router.post("/evaluate", policyController.evaluatePolicy);

export default router;
