// src/routes/health.route.ts
import { Router } from "express";
import { HTTPSTATUS } from "../config/http.config.js";
import { sendResponse } from "../utils/response.js";
import { isReady as healthIsReady } from "../utils/health.js";
const router = Router();
router.get("/live", (_req, res) => {
    sendResponse({
        res,
        statusCode: HTTPSTATUS.OK,
        message: "Liveness probe successful",
        data: { status: "UP", uptime: process.uptime() },
    });
});
router.get("/ready", (_req, res) => {
    if (healthIsReady()) {
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            message: "Readiness probe successful",
            data: { status: "UP", timestamp: new Date().toISOString() },
        });
    }
    else {
        sendResponse({
            res,
            statusCode: HTTPSTATUS.SERVICE_UNAVAILABLE,
            message: "Readiness probe failed",
            data: { status: "DOWN", timestamp: new Date().toISOString() },
        });
    }
});
export default router;
//# sourceMappingURL=health.route.js.map