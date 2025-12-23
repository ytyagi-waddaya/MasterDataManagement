import { Request, Response, NextFunction } from "express";
/**
 * Middleware factory:
 * checkPermission({ actionKey, resourceKey, getResourceById, requiredAccess: 'FULL'|'CONDITIONAL'|'ANY' })
 */
export declare function checkPermissionFactory(opts: {
    actionKey: string;
    resourceKey: string;
    getResourceById?: (id: string, fields?: string[]) => Promise<any>;
}): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=checkPermission.middleware.d.ts.map