import { Request, Response, NextFunction } from "express";
export declare const authorizePolicy: (resource: string, action: string) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authorizePolicy.d.ts.map