declare class WorkflowVisualizerService {
    getWorkflowVisualizer(workflowId: string): Promise<{
        workflowId: string;
        name: string;
        nodes: {
            id: string;
            label: string;
            isInitial: boolean;
            isFinal: boolean;
            category: import("../../prisma/generated/enums.js").Category;
            position: string | number | boolean | import("@prisma/client/runtime/client").JsonObject | import("@prisma/client/runtime/client").JsonArray | undefined;
        }[];
        edges: {
            id: string;
            from: string;
            to: string;
            label: string | undefined;
            transitionType: import("../../prisma/generated/enums.js").TransitionType;
            triggerStrategy: import("../../prisma/generated/enums.js").TriggerStrategy;
            autoTrigger: boolean;
            approvalStrategy: import("../../prisma/generated/enums.js").ApprovalStrategy | undefined;
            approvalConfig: import("@prisma/client/runtime/client").JsonValue | undefined;
        }[];
    }>;
}
export declare const workflowVisualizerService: WorkflowVisualizerService;
export {};
//# sourceMappingURL=workflowVisualizer.service.d.ts.map