export type WorkflowVisualizerNode = {
    id: string;
    label: string;
    isInitial: boolean;
    isFinal: boolean;
    category: string;
    position?: {
        x: number;
        y: number;
    };
};
export type WorkflowVisualizerEdge = {
    id: string;
    from: string;
    to: string;
    label?: string;
    transitionType: string;
    triggerStrategy: string;
    autoTrigger?: boolean;
    approvalStrategy?: string;
    approvalConfig?: any;
};
export type WorkflowVisualizerJSON = {
    workflowId: string;
    name: string;
    nodes: WorkflowVisualizerNode[];
    edges: WorkflowVisualizerEdge[];
};
//# sourceMappingURL=workflowVisualizer.dto.d.ts.map