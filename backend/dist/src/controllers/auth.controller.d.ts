import { Request, Response } from "express";
declare const authController: {
    login: (req: Request, res: Response) => Promise<void>;
    refreshToken: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
};
export default authController;
//# sourceMappingURL=auth.controller.d.ts.map