import { Request, Response } from "express";
declare const actionsController: {
    createAction: (req: Request, res: Response) => Promise<void>;
    getActions: (req: Request, res: Response) => Promise<void>;
    getActionById: (req: Request, res: Response) => Promise<void>;
    updateActionById: (req: Request, res: Response) => Promise<void>;
    archiveAction: (req: Request, res: Response) => Promise<void>;
    restoreAction: (req: Request, res: Response) => Promise<void>;
    deleteAction: (req: Request, res: Response) => Promise<void>;
    archiveActions: (req: Request, res: Response) => Promise<void>;
    restoreActions: (req: Request, res: Response) => Promise<void>;
    deleteActions: (req: Request, res: Response) => Promise<void>;
};
export default actionsController;
//# sourceMappingURL=action.controller.d.ts.map