// src/middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { HTTPSTATUS } from "../config/http.config.js";
import { AppError } from "../utils/appError.js";
import logger from "../utils/logger.js";

/**
 * Placeholder monitoring integration. Replace with Sentry/Honeycomb/Datadog call as needed.
 */
function sendToMonitoring(err: Error | AppError, meta: Record<string, unknown>) {
  // Example:
  // Sentry.withScope(scope => { scope.setExtras(meta); Sentry.captureException(err); });
  // For now we just log a debug line so you can wire real integration later.
  logger.debug("sendToMonitoring() called for non-operational error", { meta });
}

export const globalErrorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  // Normalize to AppError
  let appErr: AppError;
  if (err instanceof AppError) {
    appErr = err;
  } else if (err instanceof Error) {
    appErr = new AppError(
      err.message || "Unexpected error",
      HTTPSTATUS.INTERNAL_SERVER_ERROR,
      ("INTERNAL_SERVER_ERROR" as any),
      undefined,
      false,
      err,
    );
  } else {
    // Non-Error thrown (e.g., string or other)
    appErr = new AppError(
      "Unknown error",
      HTTPSTATUS.INTERNAL_SERVER_ERROR,
      ("INTERNAL_SERVER_ERROR" as any),
      { raw: err } as any,
      false,
    );
  }

  // Build structured meta for logging
  const meta: Record<string, unknown> = {
    code: appErr.errorCode,
    // include details only in logs (but be careful with PII)
    details: appErr.details,
    cause: (appErr as any).cause ?? undefined,
    stack: appErr.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    // requestId middleware should have set this
    requestId: (req as any).requestId,
    // include user id if available (use cautiously — avoid logging PII)
    userId: (req as any).user ? (req as any).user.id : undefined,
    retryAfterSeconds: (appErr as any).retryAfterSeconds ?? undefined,
    env: process.env.NODE_ENV ?? "unknown",
  };

  // Choose log level: operational errors are warnings, unexpected are errors
  if (appErr.isOperational) {
    // operational: likely a client issue or expected failure
    logger.warn(`${appErr.name}: ${appErr.message}`, meta);
  } else {
    // programmer/unexpected errors: log as error and notify monitoring
    logger.error(`${appErr.name}: ${appErr.message}`, meta);
    try {
      sendToMonitoring(appErr, meta);
    } catch (monitorErr) {
      // ensure monitoring failures don't crash the app
      logger.debug("Monitoring integration failed", { err: (monitorErr as Error).message ?? monitorErr });
    }
  }

  // Build safe response payload (sanitize in production)
  const responsePayload: Record<string, unknown> = {
    success: false,
    message: appErr.isOperational ? appErr.message : "Something went wrong",
    errorCode: appErr.errorCode,
    timestamp: new Date().toISOString(),
    requestId: (req as any).requestId,
  };

  // Include details only for operational errors or non-production debug
  if (appErr.isOperational && process.env.NODE_ENV !== "production") {
    responsePayload.details = appErr.details;
    responsePayload.stack = appErr.stack;
  } else if (appErr.isOperational && appErr.details) {
    // In production, optionally include minimal details (careful with PII)
    responsePayload.details = appErr.details;
  }

  // Set Retry-After header only when it's a valid number
  const retryAfter = (appErr as any).retryAfterSeconds;
  if (typeof retryAfter === "number" && Number.isFinite(retryAfter)) {
    res.setHeader("Retry-After", String(retryAfter));
  }

  // Ensure JSON content-type for consistency
  if (!res.getHeader("Content-Type")) {
    res.type("application/json");
  }

  // Send response
  res.status(appErr.statusCode || HTTPSTATUS.INTERNAL_SERVER_ERROR).json(responsePayload);
};
