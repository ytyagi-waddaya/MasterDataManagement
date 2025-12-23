import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
/**
 * validate(schema, 'body' | 'query' | 'params')
 * - runs Zod parse on the specified part of the request
 * - replaces that part with the parsed result (so defaults/transforms apply)
 */
export declare const validate: (schema: ZodType<any>, prop?: "body" | "query" | "params") => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map