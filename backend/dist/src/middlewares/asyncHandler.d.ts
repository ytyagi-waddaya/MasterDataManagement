import { NextFunction, Request, Response, RequestHandler } from "express";
export type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const asyncHandler: (controller: AsyncController) => RequestHandler;
//# sourceMappingURL=asyncHandler.d.ts.map