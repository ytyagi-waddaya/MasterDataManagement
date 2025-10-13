// src/middleware/requestId.ts
import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

// Extend Request type
declare module "express-serve-static-core" {
  interface Request {
    requestId?: string;
  }
}

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const incomingRequestId = req.header("x-request-id");
  const requestId = incomingRequestId || uuid();

  req.requestId = requestId;
  // Keep header casing standard
  res.setHeader("X-Request-Id", requestId);

  next();
};
