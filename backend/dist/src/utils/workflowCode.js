import slugify from "slugify";
import { prisma } from "../lib/prisma.js";
/**
 * Generate a stable workflow code from name
 * Example: "Material Request" → "MATERIAL_REQUEST"
 */
export function generateWorkflowCode(name) {
    return slugify.default(name, {
        replacement: "_",
        lower: false,
        strict: true,
        trim: true,
    }).toUpperCase();
}
/**
 * Generate next version for a workflow code
 * Example:
 * MATERIAL_REQUEST → version 1 (if none found)
 * MATERIAL_REQUEST → version 2 (if last was 1)
 */
export async function generateNextWorkflowVersion(code, tx = prisma) {
    const last = await tx.workflowDefinition.findFirst({
        where: { code },
        orderBy: { version: "desc" },
    });
    return last ? last.version + 1 : 1;
}
/**
 * Combined helper for convenience (optional)
 */
export async function generateWorkflowCodeAndVersion(name, tx = prisma) {
    const code = generateWorkflowCode(name);
    const version = await generateNextWorkflowVersion(code, tx);
    return { code, version };
}
export async function generateStageCode(workflowId, name, tx = prisma) {
    const baseCode = slugify.default(name, {
        replacement: "_",
        lower: false,
        strict: true,
        trim: true,
    }).toUpperCase();
    // Find last code with same baseCode
    const lastStage = await tx.workflowStage.findFirst({
        where: {
            workflowId,
            code: { startsWith: baseCode },
        },
        orderBy: { code: "desc" },
    });
    if (!lastStage)
        return baseCode;
    // Check if last code already has a number suffix
    const match = lastStage.code.match(/_(\d+)$/);
    const nextSuffix = match ? Number(match[1]) + 1 : 1;
    return `${baseCode}_${nextSuffix}`;
}
//# sourceMappingURL=workflowCode.js.map