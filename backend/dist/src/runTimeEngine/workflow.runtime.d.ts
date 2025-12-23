import { Prisma } from "../../prisma/generated/client.js";
export declare function enforceTransitionPermission(userId: string, transition: any, tx: Prisma.TransactionClient): Promise<void>;
export declare function evaluateCondition(condition: any, resourceId: string): boolean;
export declare function moveToNextStage({ tx, instance, transition, actorId, comment, }: any): Promise<void>;
export declare function handleApprovalTransition({ tx, instance, transition, input, actorId, }: any): Promise<void>;
//# sourceMappingURL=workflow.runtime.d.ts.map