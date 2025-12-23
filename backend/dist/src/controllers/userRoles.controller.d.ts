import { Request, Response } from "express";
declare const userRolesController: {
    assignUserRole: (req: Request, res: Response) => Promise<void>;
    /** Assign multiple roles to users (bulk) */
    assignUserRolesBulk: (req: Request, res: Response) => Promise<void>;
    /** Revoke a single role from a user */
    revokeUserRole: (req: Request, res: Response) => Promise<void>;
    /** Revoke multiple roles from users (bulk) */
    revokeUserRolesBulk: (req: Request, res: Response) => Promise<void>;
    /** Get all roles assigned to a specific user */
    getRolesByUser: (req: Request, res: Response) => Promise<void>;
    /** Get all users assigned to a specific role */
    getUsersByRole: (req: Request, res: Response) => Promise<void>;
};
export default userRolesController;
//# sourceMappingURL=userRoles.controller.d.ts.map