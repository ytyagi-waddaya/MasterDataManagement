// src/errors/app-error.ts
import { HTTPSTATUS, HttpStatusCodeType } from "../config/http.config";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../enums/error-code.enum";

export interface AppErrorDetails {
  [key: string]: any;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: HttpStatusCodeType;
  public readonly errorCode: ErrorCodeEnumType;
  public readonly details: AppErrorDetails | undefined; // <-- explicit
  public readonly isOperational: boolean;
  public readonly cause?: unknown;

  constructor(
    message: string,
    statusCode: HttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.INTERNAL_SERVER_ERROR,
    details?: AppErrorDetails | undefined, // <-- explicit
    isOperational = true,
    cause?: unknown,
  ) {
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
  constructor(
    message = "Http Exception Error",
    statusCode: HttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.INTERNAL_SERVER_ERROR,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, statusCode, errorCode, details, true, cause);
  }
}

export class InternalServerException extends AppError {
  constructor(
    message = "Internal Server Error",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.INTERNAL_SERVER_ERROR,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode, details, false, cause);
  }
}

export class NotFoundException extends AppError {
  constructor(
    message = "Resource not found",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.RESOURCE_NOT_FOUND,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode, details, true, cause);
  }
}

export class BadRequestException extends AppError {
  constructor(
    message = "Bad Request",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.VALIDATION_ERROR,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode, details, true, cause);
  }
}

export class UnauthorizedException extends AppError {
  constructor(
    message = "Unauthorized Access",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.ACCESS_UNAUTHORIZED,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode, details, true, cause);
  }
}

export class ForbiddenException extends AppError {
  constructor(
    message = "Forbidden",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.ACCESS_UNAUTHORIZED,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, HTTPSTATUS.FORBIDDEN, errorCode, details, true, cause);
  }
}

export class ConflictException extends AppError {
  constructor(
    message = "Conflict",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.VALIDATION_ERROR,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, HTTPSTATUS.CONFLICT, errorCode, details, true, cause);
  }
}

export class TooManyRequestsException extends AppError {
  public retryAfterSeconds: number | undefined; // <-- explicit

  constructor(
    message = "Too Many Requests",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.AUTH_TOO_MANY_ATTEMPTS,
    details?: AppErrorDetails | undefined, // <-- explicit
    retryAfterSeconds?: number | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, HTTPSTATUS.TOO_MANY_REQUESTS, errorCode, details, true, cause);
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class UnprocessableEntityException extends AppError {
  constructor(
    message = "Unprocessable Entity",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.VALIDATION_ERROR,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, HTTPSTATUS.UNPROCESSABLE_ENTITY, errorCode, details, true, cause);
  }
}

export class ValidationException extends UnprocessableEntityException {
  constructor(
    message = "Validation failed",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.VALIDATION_ERROR,
    details?: AppErrorDetails | undefined, // <-- explicit
    cause?: unknown,
  ) {
    super(message, errorCode, details, cause);
  }
}
