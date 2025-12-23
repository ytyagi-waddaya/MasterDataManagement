import { Request, Response } from "express";
declare const resourcesController: {
    createResource: (req: Request, res: Response) => Promise<void>;
    getResources: (req: Request, res: Response) => Promise<void>;
    getResourceById: (req: Request, res: Response) => Promise<void>;
    updateResourceById: (req: Request, res: Response) => Promise<void>;
    archiveResource: (req: Request, res: Response) => Promise<void>;
    restoreResource: (req: Request, res: Response) => Promise<void>;
    deleteResource: (req: Request, res: Response) => Promise<void>;
    archiveResources: (req: Request, res: Response) => Promise<void>;
    restoreResources: (req: Request, res: Response) => Promise<void>;
    deleteResources: (req: Request, res: Response) => Promise<void>;
};
export default resourcesController;
//# sourceMappingURL=resource.controller.d.ts.map