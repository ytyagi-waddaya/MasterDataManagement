import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestException } from "../utils/appError.js";

/**
 * validate(schema, 'body' | 'query' | 'params')
 * - runs Zod parse on the specified part of the request
 * - replaces that part with the parsed result (so defaults/transforms apply)
 */
export const validate =
  (schema: ZodType<any>, prop: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[prop]);

    if (!result.success) {
      const formatted = result.error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("; ");

      return next(new BadRequestException(formatted || "Invalid input"));
    }

    // Express 5: req.query is read-only → mutate, don't reassign
    const target = req[prop] as any;

    Object.keys(target).forEach((k) => delete target[k]); // clear old keys  
    Object.assign(target, result.data); // assign parsed keys

    return next();
  };