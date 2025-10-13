// src/middleware/asyncHandler.ts
import { NextFunction, Request, Response, RequestHandler } from "express";

export type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncHandler = (controller: AsyncController): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};
