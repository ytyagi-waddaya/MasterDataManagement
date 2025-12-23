// src/errors/app-error.ts
import { HTTPSTATUS } from "../config/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
export class AppError extends Error {
    name;
    statusCode;
    errorCode;
    details; // <-- explicit
    isOperational;
    cause;
    constructor(message, statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode = ErrorCodeEnum.INTERNAL_SERVER_ERROR, details, // <-- explicit
    isOperational = true, cause) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = new.target.name;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        this.isOperational = isOperational;
        this.cause = cause;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            errorCode: this.errorCode,
            details: this.details,
            isOperational: this.isOperational,
        };
    }
}
/* Specialized Errors */
export class HttpException extends AppError {
    constructor(message = "Http Exception Error", statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode = ErrorCodeEnum.INTERNAL_SERVER_ERROR, details, // <-- explicit
    cause) {
        super(message, statusCode, errorCode, details, true, cause);
    }
}
export class InternalServerException extends AppError {
    constructor(message = "Internal Server Error", errorCode = ErrorCodeEnum.INTERNAL_SERVER_ERROR, details, // <-- explicit
    cause) {
        super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode, details, false, cause);
    }
}
export class NotFoundException extends AppError {
    constructor(message = "Resource not found", errorCode = ErrorCodeEnum.RESOURCE_NOT_FOUND, details, // <-- explicit
    cause) {
        super(message, HTTPSTATUS.NOT_FOUND, errorCode, details, true, cause);
    }
}
export class BadRequestException extends AppError {
    constructor(message = "Bad Request", errorCode = ErrorCodeEnum.VALIDATION_ERROR, details, // <-- explicit
    cause) {
        super(message, HTTPSTATUS.BAD_REQUEST, errorCode, details, true, cause);
    }
}
export class UnauthorizedException extends AppError {
    constructor(message = "Unauthorized Access", errorCode = ErrorCodeEnum.ACCESS_UNAUTHORIZED, details, // <-- explicit
    cause) {
        super(message, HTTPSTATUS.UNAUTHORIZED, errorCode, details, true, cause);
    }
}
export class ForbiddenException extends AppError {
    constructor(message = "Forbidden", errorCode = ErrorCodeEnum.ACCESS_UNAUTHORIZED, details, // <-- explicit
    cause) {
        super(message, HTTPSTATUS.FORBIDDEN, errorCode, details, true, cause);
    }
}
export class ConflictException extends AppError {
    constructor(message = "Conflict", errorCode = ErrorCodeEnum.VALIDATION_ERROR, details, // <-- explicit
    cause) {
        super(message, HTTPSTATUS.CONFLICT, errorCode, details, true, cause);
    }
}
export class TooManyRequestsException extends AppError {
    retryAfterSeconds; // <-- explicit
    constructor(message = "Too Many Requests", errorCode = ErrorCodeEnum.AUTH_TOO_MANY_ATTEMPTS, details, // <-- explicit
    retryAfterSeconds, // <-- explicit
    cause) {
        super(message, HTTPSTATUS.TOO_MANY_REQUESTS, errorCode, details, true, cause);
        this.retryAfterSeconds = retryAfterSeconds;
    }
}
export class UnprocessableEntityException extends AppError {
    constructor(message = "Unprocessable Entity", errorCode = ErrorCodeEnum.VALIDATION_ERROR, details, // <-- explicit
    cause) {
        super(message, HTTPSTATUS.UNPROCESSABLE_ENTITY, errorCode, details, true, cause);
    }
}
export class ValidationException extends UnprocessableEntityException {
    constructor(message = "Validation failed", errorCode = ErrorCodeEnum.VALIDATION_ERROR, details, // <-- explicit
    cause) {
        super(message, errorCode, details, cause);
    }
}
//# sourceMappingURL=appError.js.map