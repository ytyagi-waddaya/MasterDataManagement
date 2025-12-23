import { Request, Response } from "express";
declare const moduleController: {
    createModule: (req: Request, res: Response) => Promise<void>;
    getModules: (req: Request, res: Response) => Promise<void>;
    getModuleById: (req: Request, res: Response) => Promise<void>;
    updateModuleById: (req: Request, res: Response) => Promise<void>;
    archiveModule: (req: Request, res: Response) => Promise<void>;
    restoreModule: (req: Request, res: Response) => Promise<void>;
    deleteModule: (req: Request, res: Response) => Promise<void>;
    archiveModules: (req: Request, res: Response) => Promise<void>;
    restoreModules: (req: Request, res: Response) => Promise<void>;
    deleteModules: (req: Request, res: Response) => Promise<void>;
    getModulesWithResources: (req: Request, res: Response) => Promise<void>;
};
export default moduleController;
//# sourceMappingURL=module.controller.d.ts.map