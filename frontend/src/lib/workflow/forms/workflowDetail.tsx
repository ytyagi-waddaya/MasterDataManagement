"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WorkflowDetail } from "@/lib/workflow/WorkflowDetail";
import { useWorkflow } from "@/lib/workflow/hooks";
import WorkflowBuilder from "@/lib/workflow/forms/workflowForm";

export default function WorkflowDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: workflowData, isLoading } = useWorkflow(params.id);

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <div>Loading workflow...</div>;
  if (!workflowData) return <div>Workflow not found.</div>;

  const formattedWorkflow = {
    id: workflowData.id,
    name: workflowData.name,
    description: workflowData.description,
    resourceId: workflowData.resource?.id ?? workflowData.resourceId ?? "",
    resource:workflowData.resource,
    createdAt: workflowData.createdAt,
    updatedAt: workflowData.updatedAt,
    createdBy: workflowData.createdBy?.name ?? "Unknown",
    stages: (workflowData.stages ?? []).map((s: any) => ({
      name: s.name,
      order: s.order,
      isInitial: s.isInitial,
      isFinal: s.isFinal,
    })),
    transitions: (workflowData.transitions ?? []).map((t: any) => ({
      label: t.label,
      fromStage: workflowData.stages.find((s: any) => s.id === t.fromStageId)
        ?.name,
      toStage: workflowData.stages.find((s: any) => s.id === t.toStageId)?.name,
      allowedRoleIds: t.allowedRoleIds,
      allowedUserIds: t.allowedUserIds,
      requiresApproval: t.requiresApproval,
      autoTrigger: t.autoTrigger,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <div className="rounded-lg border p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Workflow Details</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(workflowData, null, 2)}
        </pre>
      </div> */}
      {/* {isEditing ? (
        <WorkflowBuilder
          id={params.id}
          onBack={() => setIsEditing(false)} // ← BACK GOES TO DETAIL VIEW
        />
      ) : ( */}
        <WorkflowDetail
          workflow={formattedWorkflow}
          onBack={() => router.back()}
          onEdit={() => setIsEditing(true)}
        />
      {/* )} */}
    </div>
  );
}
