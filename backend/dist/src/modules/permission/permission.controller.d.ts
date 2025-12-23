import { Request, Response } from "express";
declare const permissionController: {
    getPermissions: (req: Request, res: Response) => Promise<void>;
    getPermissionById: (req: Request, res: Response) => Promise<void>;
    getPermissionsByRole: (req: Request, res: Response) => Promise<void>;
    getPermissionsByResource: (req: Request, res: Response) => Promise<void>;
    getPermissionsByAction: (req: Request, res: Response) => Promise<void>;
    generatePermissions: (req: Request, res: Response) => Promise<void>;
    updatePermissionById: (req: Request, res: Response) => Promise<void>;
    updatePermissionCondition: (req: Request, res: Response) => Promise<void>;
    archivePermission: (req: Request, res: Response) => Promise<void>;
    restorePermission: (req: Request, res: Response) => Promise<void>;
    deletePermission: (req: Request, res: Response) => Promise<void>;
    archivePermissions: (req: Request, res: Response) => Promise<void>;
    restorePermissions: (req: Request, res: Response) => Promise<void>;
    deletePermissions: (req: Request, res: Response) => Promise<void>;
    assignPermissionsToRole: (req: Request, res: Response) => Promise<void>;
};
export default permissionController;
//# sourceMappingURL=permission.controller.d.ts.map