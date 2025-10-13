// src/utils/response.ts
import { Response } from "express";
import {
  HTTPSTATUS,
  HttpStatusCodeType,
  HttpStatusMessageMap,
} from "../config/http.config";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  statusCode: HttpStatusCodeType;
  statusText: string;
  timestamp: string;
  requestId?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

/** Options for sendResponse */
interface ApiResponseOptions<T = unknown> {
  res: Response;
  statusCode?: HttpStatusCodeType;
  success?: boolean;           // if omitted, derived from statusCode (<400)
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
  requestId?: string;          // optional explicit requestId override
}

/**
 * Send a consistent API response.
 * - Will not send a body for 204 No Content.
 * - Sets X-Request-Id header when available.
 */
export const sendResponse = <T = unknown>({
  res,
  statusCode = HTTPSTATUS.OK,
  success,
  message,
  data,
  meta,
  requestId,
}: ApiResponseOptions<T>): void => {
  // default success if caller didn't pass it
  const resolvedSuccess = typeof success === "boolean" ? success : statusCode < 400;

  // resolve requestId: explicit option -> res.locals -> response header if already set
  const resolvedRequestId =
    requestId ?? (res.locals && (res.locals.requestId as string | undefined)) ?? res.getHeader("X-Request-Id") ?? undefined;

  // If 204 No Content, send only the status code with no body (per spec)
  if (statusCode === HTTPSTATUS.NO_CONTENT) {
    if (resolvedRequestId) {
      res.setHeader("X-Request-Id", String(resolvedRequestId));
    }
    res.status(HTTPSTATUS.NO_CONTENT).send();
    return;
  }

  const payload: ApiResponse<T> = {
    success: resolvedSuccess,
    message: message ?? HttpStatusMessageMap[statusCode] ?? "Unknown Status",
    statusCode,
    statusText: HttpStatusMessageMap[statusCode] ?? "Unknown Status",
    timestamp: new Date().toISOString(),
  };

  if (resolvedRequestId) {
    payload.requestId = String(resolvedRequestId);
    // ensure header sent for clients and logs
    res.setHeader("X-Request-Id", String(resolvedRequestId));
  }

  if (data !== undefined) {
    payload.data = data;
  }
  if (meta && Object.keys(meta).length > 0) {
    payload.meta = meta;
  }

  // Ensure JSON content-type
  if (!res.getHeader("Content-Type")) {
    res.type("application/json");
  }

  res.status(statusCode).json(payload);
};
