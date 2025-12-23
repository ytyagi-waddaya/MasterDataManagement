import { prisma } from "../lib/prisma.js";
import { Prisma } from "../../prisma/generated/client.js";
/**
 * Generate a stable workflow code from name
 * Example: "Material Request" → "MATERIAL_REQUEST"
 */
export declare function generateWorkflowCode(name: string): string;
/**
 * Generate next version for a workflow code
 * Example:
 * MATERIAL_REQUEST → version 1 (if none found)
 * MATERIAL_REQUEST → version 2 (if last was 1)
 */
export declare function generateNextWorkflowVersion(code: string, tx?: Prisma.TransactionClient | typeof prisma): Promise<number>;
/**
 * Combined helper for convenience (optional)
 */
export declare function generateWorkflowCodeAndVersion(name: string, tx?: Prisma.TransactionClient | typeof prisma): Promise<{
    code: string;
    version: number;
}>;
export declare function generateStageCode(workflowId: string, name: string, tx?: Prisma.TransactionClient | typeof prisma): Promise<string>;
//# sourceMappingURL=workflowCode.d.ts.map