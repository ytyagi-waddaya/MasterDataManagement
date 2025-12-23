import { HttpStatusCodeType } from "../config/http.config.js";
import { ErrorCodeEnumType } from "../enums/error-code.enum.js";
export interface AppErrorDetails {
    [key: string]: any;
}
export declare class AppError extends Error {
    readonly name: string;
    readonly statusCode: HttpStatusCodeType;
    readonly errorCode: ErrorCodeEnumType;
    readonly details: AppErrorDetails | undefined;
    readonly isOperational: boolean;
    readonly cause?: unknown;
    constructor(message: string, statusCode?: HttpStatusCodeType, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    isOperational?: boolean, cause?: unknown);
    toJSON(): {
        name: string;
        message: string;
        statusCode: HttpStatusCodeType;
        errorCode: "INTERNAL_SERVER_ERROR" | "SERVICE_UNAVAILABLE" | "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_INVALID_TOKEN" | "AUTH_USER_NOT_FOUND" | "AUTH_NOT_FOUND" | "AUTH_TOO_MANY_ATTEMPTS" | "AUTH_UNAUTHORIZED_ACCESS" | "AUTH_TOKEN_NOT_FOUND" | "ACCESS_UNAUTHORIZED" | "VALIDATION_ERROR" | "RESOURCE_NOT_FOUND" | "DB_CONNECTION_FAILED" | "RATE_LIMIT_EXCEEDED";
        details: AppErrorDetails | undefined;
        isOperational: boolean;
    };
}
export declare class HttpException extends AppError {
    constructor(message?: string, statusCode?: HttpStatusCodeType, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
export declare class InternalServerException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
export declare class NotFoundException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
export declare class BadRequestException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
export declare class UnauthorizedException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
export declare class ForbiddenException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
export declare class ConflictException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
export declare class TooManyRequestsException extends AppError {
    retryAfterSeconds: number | undefined;
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    retryAfterSeconds?: number | undefined, // <-- explicit
    cause?: unknown);
}
export declare class UnprocessableEntityException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
export declare class ValidationException extends UnprocessableEntityException {
    constructor(message?: string, errorCode?: ErrorCodeEnumType, details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown);
}
//# sourceMappingURL=appError.d.ts.map