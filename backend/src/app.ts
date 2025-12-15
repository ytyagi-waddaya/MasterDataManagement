// src/app.ts
import "dotenv/config";
import express from "express";
import { HTTPSTATUS } from "./config/http.config.js";
import { config } from "./config/app.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";

import healthRoutes from "./routes/health.route.js";
import testRoutes from "./routes/test.route.js";
import authRoutes from "./routes/auth.route.js";
import moduleRoutes from "./modules/module/module.routes.js";
import resourceRoutes from "./modules/resource/resource.routes.js";
import actionRoutes from "./modules/action/action.route.js";
import permissionRoutes from "./modules/permission/permission.route.js";
import roleRoutes from "./modules/role/role.route.js";
import userRoutes from "./modules/user/user.route.js";
import rolePermissionRoutes from "./modules/rolePermission/rolePermission.route.js";
import userRoleRoutes from "./routes/userRoles.route.js";
import policyRoutes from "./routes/policy.route.js";
import auditRoutes from "./routes/auditLog.route.js";
import workflowRoutes from "./routes/workflow.routes.js";
import notificationsRoutes from "../src/notifications/notifications.routes.js";
import masterObjectRoutes from "../src/modules/masterObject/masterObject.route.js";
import masterRecordRoutes from "../src/modules/masterRecord/masterRecord.route.js";


import { AppError } from "./utils/appError.js";
import { ErrorCodeEnum } from "./enums/error-code.enum.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { requestIdMiddleware } from "./middlewares/requestIdMiddleware.js";

// typed morgan -> logger wrapper
import { httpLogger } from "./utils/logger.js";


const app = express();
// Security basics
app.disable("x-powered-by");
if (config.NODE_ENV === "production") app.set("trust proxy", 1);

// Helmet defaults (disable CSP here only if you plan to configure it properly later)
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// optional: enable HSTS in production
if (config.NODE_ENV === "production") {
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    })
  );
}

// Ensure requestId is set before logging so all logs include it
app.use(requestIdMiddleware);

// HTTP logging (morgan -> winston wrapper). Runs early so all requests are logged.
app.use(httpLogger());

// CORS: safe origin handling (supports CSV in config.FRONTEND_ORIGIN)
const allowedOrigins = (config.FRONTEND_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow no-origin (curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) {
        // no configured origin list — deny in production
        if (config.NODE_ENV === "production") return callback(new Error("CORS not allowed"), false);
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    exposedHeaders: ["X-Request-Id", "Retry-After", "X-RateLimit-Remaining", "X-RateLimit-Reset"],
  })
);

// Body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Enable gzip compression
app.use(compression());

/**
 * Health routes — keep these BEFORE rate limiting so probes can always succeed.
 * /health/live and /health/ready should be quick and cheap.
 */
app.use("/health", healthRoutes);
app.use("/test", testRoutes);

app.use("/api/auth", authRoutes)
app.use("/api/module", moduleRoutes)
app.use("/api/user", userRoutes)
app.use("/api/action", actionRoutes)
app.use("/api/resource", resourceRoutes)
app.use("/api/role", roleRoutes)
app.use("/api/permission", permissionRoutes)
app.use("/api/role-permission", rolePermissionRoutes)
app.use("/api/user-role", userRoleRoutes)
app.use("/api/policy", policyRoutes)
app.use("/api/audit", auditRoutes)
app.use("/api/notifications", notificationsRoutes);
app.use("/api/workflow", workflowRoutes);
app.use("/api/master-object", masterObjectRoutes);
app.use("/api/master-record", masterRecordRoutes);

// 404 handler — returns standard error via your global error handler
app.use((req, _res, next) => {
  next(new AppError("Route not found", HTTPSTATUS.NOT_FOUND, ErrorCodeEnum.RESOURCE_NOT_FOUND));
});

// Global error handler
app.use(globalErrorHandler);

export default app;


// Action → Resource → Permission → Role → RolePermission → User → UserRole → RoleHierarchy → Policy
