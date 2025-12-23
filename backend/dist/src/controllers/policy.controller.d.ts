import { Request, Response } from "express";
declare const policyController: {
    createPolicy: (req: Request, res: Response) => Promise<void>;
    createPoliciesBulk: (req: Request, res: Response) => Promise<void>;
    getPolicies: (req: Request, res: Response) => Promise<void>;
    getPolicyById: (req: Request, res: Response) => Promise<void>;
    updatePolicyById: (req: Request, res: Response) => Promise<void>;
    softDeletePolicy: (req: Request, res: Response) => Promise<void>;
    restorePolicy: (req: Request, res: Response) => Promise<void>;
    deletePolicy: (req: Request, res: Response) => Promise<void>;
    softDeleteManyPolicies: (req: Request, res: Response) => Promise<void>;
    restoreManyPolicies: (req: Request, res: Response) => Promise<void>;
    deleteManyPolicies: (req: Request, res: Response) => Promise<void>;
};
export default policyController;
//# sourceMappingURL=policy.controller.d.ts.map