// src/middleware/rateLimiter.ts
import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { config } from "../config/app.config";
import { HTTPSTATUS } from "../config/http.config";
import { sendResponse } from "../utils/response";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import logger from "../utils/logger";
import { redisClient } from "../utils/redis";

// Config values
const GLOBAL_POINTS = Number(config.RATE_LIMIT_GLOBAL_POINTS ?? 600);
const GLOBAL_DURATION = Number(config.RATE_LIMIT_GLOBAL_DURATION ?? 600);
const GLOBAL_BLOCK_DURATION = Number(config.RATE_LIMIT_GLOBAL_BLOCK_DURATION ?? 60);

const LOGIN_POINTS = Number(config.RATE_LIMIT_LOGIN_POINTS ?? 5);
const LOGIN_DURATION = Number(config.RATE_LIMIT_LOGIN_DURATION ?? 15 * 60);
const LOGIN_BLOCK_DURATION = Number(config.RATE_LIMIT_LOGIN_BLOCK_DURATION ?? 15 * 60);

// Whether to fail-open (allow traffic) when Redis is unavailable. Set via env.
const FAIL_OPEN_ON_REDIS_ERROR = config.FAIL_OPEN_ON_REDIS_ERROR === "true";

const globalLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: `${config.NODE_ENV || "dev"}:rl_global`,
  points: GLOBAL_POINTS,
  duration: GLOBAL_DURATION,
  blockDuration: GLOBAL_BLOCK_DURATION,
});

const loginLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: `${config.NODE_ENV || "dev"}:rl_login`,
  points: LOGIN_POINTS,
  duration: LOGIN_DURATION,
  blockDuration: LOGIN_BLOCK_DURATION,
});

function getRateKey(req: Request): string {
  const userId = (req as any).user?.id;
  if (userId) return `user_${String(userId)}`;
  return `ip_${req.ip || req.connection.remoteAddress || "unknown"}`;
}

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const key = getRateKey(req);
  globalLimiter
    .consume(key)
    .then((rlRes) => {
      // set standard headers
      res.setHeader("X-RateLimit-Limit", String(GLOBAL_POINTS));
      res.setHeader("X-RateLimit-Remaining", String(Math.max(0, rlRes.remainingPoints)));
      next();
    })
    .catch((rej) => {
      if (rej instanceof Error) {
        // Redis or internal error
        logger.error("Rate limiter error", { err: rej, key });
        if (FAIL_OPEN_ON_REDIS_ERROR) {
          // allow request to continue (fail-open) but log
          return next();
        } else {
          // conservative: block request with 503
          return sendResponse({
            res,
            statusCode: HTTPSTATUS.SERVICE_UNAVAILABLE,
            success: false,
            message: "Rate limiter unavailable — try again later.",
            meta: { errorCode: ErrorCodeEnum.SERVICE_UNAVAILABLE },
          });
        }
      }
      // Normal rate limit rejection
      const retryAfterSec = Math.max(1, Math.ceil((rej.msBeforeNext ?? 0) / 1000));
      res.setHeader("Retry-After", String(retryAfterSec));
      logger.warn("Rate limit exceeded (global)", {
        key,
        route: req.originalUrl,
        ip: req.ip,
        requestId: (req as any).requestId,
      });
      sendResponse({
        res,
        statusCode: HTTPSTATUS.TOO_MANY_REQUESTS,
        success: false,
        message: "Too many requests — please slow down.",
        meta: {
          errorCode: ErrorCodeEnum.RATE_LIMIT_EXCEEDED,
          retryAfterSeconds: retryAfterSec,
        },
      });
    });
};

export const loginRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const key = `login_${req.ip || req.connection.remoteAddress || "unknown"}`;
  loginLimiter
    .consume(key)
    .then((rlRes) => {
      res.setHeader("X-RateLimit-Limit", String(LOGIN_POINTS));
      res.setHeader("X-RateLimit-Remaining", String(Math.max(0, rlRes.remainingPoints)));
      next();
    })
    .catch((rej) => {
      if (rej instanceof Error) {
        logger.error("Login rate limiter error", { err: rej, key });
        if (FAIL_OPEN_ON_REDIS_ERROR) return next();
        return sendResponse({
          res,
          statusCode: HTTPSTATUS.SERVICE_UNAVAILABLE,
          success: false,
          message: "Rate limiter unavailable — try again later.",
          meta: { errorCode: ErrorCodeEnum.SERVICE_UNAVAILABLE },
        });
      }
      const retryAfterSec = Math.max(1, Math.ceil((rej.msBeforeNext ?? 0) / 1000));
      res.setHeader("Retry-After", String(retryAfterSec));
      logger.warn("Rate limit exceeded (login)", { key, route: req.originalUrl });
      sendResponse({
        res,
        statusCode: HTTPSTATUS.TOO_MANY_REQUESTS,
        success: false,
        message: "Too many login attempts — try again later.",
        meta: {
          errorCode: ErrorCodeEnum.AUTH_TOO_MANY_ATTEMPTS,
          retryAfterSeconds: retryAfterSec,
        },
      });
    });
};

export const getRemainingPoints = async (req: Request) => {
  const key = getRateKey(req);
  try {
    const r = await globalLimiter.get(key);
    if (!r) return { remainingPoints: GLOBAL_POINTS, msBeforeNext: 0 };
    return { remainingPoints: Math.max(0, r.remainingPoints), msBeforeNext: r.msBeforeNext ?? 0 };
  } catch (err) {
    logger.debug("getRemainingPoints failed", { err });
    return { remainingPoints: GLOBAL_POINTS, msBeforeNext: 0 };
  }
};

export default {
  globalLimiter,
  loginLimiter,
  rateLimitMiddleware,
  loginRateLimiter,
  getRemainingPoints,
};
