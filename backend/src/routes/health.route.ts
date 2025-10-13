// src/routes/health.route.ts
import { Router, Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { sendResponse } from "../utils/response";
import { isReady as healthIsReady } from "../utils/health";

const router = Router();

router.get("/live", (_req: Request, res: Response) => {
  sendResponse({
    res,
    statusCode: HTTPSTATUS.OK,
    message: "Liveness probe successful",
    data: { status: "UP", uptime: process.uptime() },
  });
});

router.get("/ready", (_req: Request, res: Response) => {
  if (healthIsReady()) {
    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      message: "Readiness probe successful",
      data: { status: "UP", timestamp: new Date().toISOString() },
    });
  } else {
    sendResponse({
      res,
      statusCode: HTTPSTATUS.SERVICE_UNAVAILABLE,
      message: "Readiness probe failed",
      data: { status: "DOWN", timestamp: new Date().toISOString() },
    });
  }
});

export default router;
