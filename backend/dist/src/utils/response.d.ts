import { Response } from "express";
import { HttpStatusCodeType } from "../config/http.config.js";
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
    success?: boolean;
    message?: string;
    data?: T;
    meta?: Record<string, unknown>;
    requestId?: string;
}
/**
 * Send a consistent API response.
 * - Will not send a body for 204 No Content.
 * - Sets X-Request-Id header when available.
 */
export declare const sendResponse: <T = unknown>({ res, statusCode, success, message, data, meta, requestId, }: ApiResponseOptions<T>) => void;
export {};
//# sourceMappingURL=response.d.ts.map