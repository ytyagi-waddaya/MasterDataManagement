import { Request, Response } from "express";
export declare const rolePermissionController: {
    updateAccessLevel: (req: Request, res: Response) => Promise<void>;
    grantAllModulePermissions: (req: Request, res: Response) => Promise<void>;
    revokeAllModulePermissions: (req: Request, res: Response) => Promise<void>;
    getRolePermissions: (req: Request, res: Response) => Promise<void>;
};
export default rolePermissionController;
//# sourceMappingURL=rolePermission.controller.d.ts.map