import { prisma } from "../lib/prisma.js";
import { NotFoundException } from "../utils/appError.js";
class WorkflowVisualizerService {
    async getWorkflowVisualizer(workflowId) {
        const workflow = await prisma.workflowDefinition.findUnique({
            where: { id: workflowId },
            include: {
                stages: true,
                transitions: true,
            },
        });
        if (!workflow) {
            throw new NotFoundException("Workflow not found");
        }
        return {
            workflowId: workflow.id,
            name: workflow.name,
            nodes: workflow.stages.map((stage) => ({
                id: stage.id,
                label: stage.name,
                isInitial: stage.isInitial,
                isFinal: stage.isFinal,
                category: stage.category,
                position: stage.position ?? undefined,
            })),
            edges: workflow.transitions.map((t) => ({
                id: t.id,
                from: t.fromStageId,
                to: t.toStageId,
                label: t.label ?? undefined,
                transitionType: t.transitionType,
                triggerStrategy: t.triggerStrategy,
                autoTrigger: t.autoTrigger,
                approvalStrategy: t.transitionType === "APPROVAL"
                    ? t.approvalStrategy
                    : undefined,
                approvalConfig: t.transitionType === "APPROVAL"
                    ? t.approvalConfig
                    : undefined,
            })),
        };
    }
}
export const workflowVisualizerService = new WorkflowVisualizerService();
//# sourceMappingURL=workflowVisualizer.service.js.map