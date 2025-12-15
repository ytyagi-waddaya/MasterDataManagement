import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import auditLogController from "../controllers/auditLog.controller.js";

const router = Router();

// GET /api/audit-logs
router.get("/", asyncHandler(auditLogController.getAll));

// GET /api/audit-logs/user/:userId
router.get("/user/:userId", asyncHandler(auditLogController.getByUserId));

export default router;
