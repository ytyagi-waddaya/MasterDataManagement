import { Request, Response } from "express";
declare const usersController: {
    createUser: (req: Request, res: Response) => Promise<void>;
    getUserStats: (req: Request, res: Response) => Promise<void>;
    me: (req: Request, res: Response) => Promise<void>;
    getUsers: (req: Request, res: Response) => Promise<void>;
    getUser: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<void>;
    archiveUser: (req: Request, res: Response) => Promise<void>;
    restoreUser: (req: Request, res: Response) => Promise<void>;
    deleteUser: (req: Request, res: Response) => Promise<void>;
    archiveUsers: (req: Request, res: Response) => Promise<void>;
    restoreUsers: (req: Request, res: Response) => Promise<void>;
    deleteUsers: (req: Request, res: Response) => Promise<void>;
};
export default usersController;
//# sourceMappingURL=user.controller.d.ts.map