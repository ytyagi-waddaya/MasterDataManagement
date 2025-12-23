import { Request, Response } from "express";
declare const masterRecordController: {
    createMasterRecord: (req: Request, res: Response) => Promise<void>;
    getMasterRecords: (req: Request, res: Response) => Promise<void>;
    getMasterRecord: (req: Request, res: Response) => Promise<void>;
    archiveMasterRecord: (req: Request, res: Response) => Promise<void>;
    restoreMasterRecord: (req: Request, res: Response) => Promise<void>;
    deleteMasterRecord: (req: Request, res: Response) => Promise<void>;
};
export default masterRecordController;
//# sourceMappingURL=masterRecord.controller.d.ts.map