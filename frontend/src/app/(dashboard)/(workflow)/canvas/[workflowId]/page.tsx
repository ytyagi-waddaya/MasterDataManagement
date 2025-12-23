"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useWorkflowBuilderStore } from "@/store/useWorkflowBuilderStore";
import { useWorkflow } from "@/lib/workflow/hooks/useWorkflow";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import WorkflowCanvasWithForm from "@/lib/workflow/builder/WorkflowCanvasWithForm";
import { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

export default function WorkflowCanvasPage() {
  const router = useRouter();
  const { workflowId } = useParams() as { workflowId: string };

  const storedForm = useWorkflowBuilderStore((s) => s.form);
  const setForm = useWorkflowBuilderStore((s) => s.setForm);

  const { data: workflow, isLoading } = useWorkflow(workflowId);
const WorkflowStatus = workflow.status;
  const rebuiltForm = useForm<WorkflowFormValues>({
    defaultValues: {
      name: workflow?.name ?? "",
      resourceId: workflow?.resourceId ?? "",
      description: workflow?.description ?? "",
      stages: workflow?.stages ?? [],
      transitions: workflow?.transitions ?? [],
    },
  });

  useEffect(() => {
    if (!storedForm && workflow) {
      setForm(rebuiltForm);
    }
  }, [storedForm, workflow, rebuiltForm, setForm]);

  const form = storedForm ?? rebuiltForm;

  if (isLoading) {
    return <div className="p-4">Loading workflow...</div>;
  }

  if (!workflow) {
    return (
      <div className="p-4 text-red-500">
        Workflow not found
      </div>
    );
  }

  return (
    <WorkflowCanvasWithForm
      workflowId={workflowId}
      WorkflowStatus={WorkflowStatus}
      form={form}
      onBack={() => router.push(`/create-workflow/${workflowId}`)}
    />
  );
}
