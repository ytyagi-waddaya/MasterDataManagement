import { Request, Response } from "express";
declare const masterObjectController: {
    getMasterObject: (req: Request, res: Response) => Promise<void>;
    getMasterObjects: (req: Request, res: Response) => Promise<void>;
    updateMasterObject: (req: Request, res: Response) => Promise<void>;
    archiveMasterObject: (req: Request, res: Response) => Promise<void>;
    restoreMasterObject: (req: Request, res: Response) => Promise<void>;
    deleteMasterObject: (req: Request, res: Response) => Promise<void>;
};
export default masterObjectController;
//# sourceMappingURL=masterObject.controller.d.ts.map