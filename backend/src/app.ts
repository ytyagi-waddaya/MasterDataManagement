// src/app.ts
import "dotenv/config";
import express from "express";
import { HTTPSTATUS } from "./config/http.config";
import { config } from "./config/app.config";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";

import healthRoutes from "./routes/health.route";
import testRoutes from "./routes/test.route";

import { AppError } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enum";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { requestIdMiddleware } from "./middlewares/requestIdMiddleware";

// use Redis-backed limiter (rate-limiter-flexible)
import { rateLimitMiddleware } from "./middlewares/rateLimiterRedis";

// typed morgan -> logger wrapper
import { httpLogger } from "./utils/logger";


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

// Apply Redis-backed rate limiter to API routes (and others as needed).
// Example: protect all /api routes (adjust to your routing structure).
app.use("/api", rateLimitMiddleware);

// 404 handler — returns standard error via your global error handler
app.use((req, _res, next) => {
  next(new AppError("Route not found", HTTPSTATUS.NOT_FOUND, ErrorCodeEnum.RESOURCE_NOT_FOUND));
});

// Global error handler (last)
app.use(globalErrorHandler);

export default app;
