import { Request, Response } from "express";
declare const roleController: {
    createRole: (req: Request, res: Response) => Promise<void>;
    getRoles: (req: Request, res: Response) => Promise<void>;
    getRoleById: (req: Request, res: Response) => Promise<void>;
    updateRoleById: (req: Request, res: Response) => Promise<void>;
    archiveRole: (req: Request, res: Response) => Promise<void>;
    restoreRole: (req: Request, res: Response) => Promise<void>;
    deleteRole: (req: Request, res: Response) => Promise<void>;
    archiveRoles: (req: Request, res: Response) => Promise<void>;
    restoreRoles: (req: Request, res: Response) => Promise<void>;
    deleteRoles: (req: Request, res: Response) => Promise<void>;
};
export default roleController;
//# sourceMappingURL=role.controller.d.ts.map