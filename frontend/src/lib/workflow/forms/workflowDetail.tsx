"use client";

import { useRouter } from "next/navigation";
import { WorkflowDetail } from "@/lib/workflow/WorkflowDetail";
import { useWorkflow } from "@/lib/workflow/hooks";

import { Button } from "@/components/ui/button";
import { GitBranch, UploadCloud } from "lucide-react";
import { usePublishWorkflow } from "../hooks/useWorkflow";

export default function WorkflowDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const { data: workflowData, isLoading } = useWorkflow(params.id);
  const publishWorkflow = usePublishWorkflow(params.id);

  if (isLoading) return <div>Loading workflow...</div>;
  if (!workflowData) return <div>Workflow not found.</div>;

  const isDraft = workflowData.status === "DRAFT";

  const formattedWorkflow = {
    id: workflowData.id,
    name: workflowData.name,
    description: workflowData.description,
    resourceId: workflowData.resource?.id ?? workflowData.resourceId ?? "",
    resource: workflowData.resource,
    createdAt: workflowData.createdAt,
    updatedAt: workflowData.updatedAt,
    createdBy: workflowData.createdBy?.name ?? "Unknown",
    stages: workflowData.stages ?? [],
    transitions: workflowData.transitions ?? [],
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      {/* ACTION BAR */}
      <div className="flex justify-end gap-2 mb-4">
        {isDraft && (
          <Button
            variant="outline"
            onClick={() => publishWorkflow.mutate()
            }
            disabled={publishWorkflow.isPending}
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            {publishWorkflow.isPending
              ? "Publishing..."
              : "Publish"}
          </Button>
        )}

        <Button
          onClick={() =>
            router.push(`/create-workflow/${params.id}`)
          }
        >
          <GitBranch className="mr-2 h-4 w-4" />
          Build Workflow
        </Button>
      </div>

      {/* DETAILS */}
      <WorkflowDetail
        workflow={formattedWorkflow}
        onBack={() => router.back()}
      />
    </div>
  );
}
