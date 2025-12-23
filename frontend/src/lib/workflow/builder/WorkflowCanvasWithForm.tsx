"use client";

import { Button } from "@/components/ui/button";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import WorkflowCanvas from "@/lib/workflow/builder/WorkflowCanvas";
import { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

type Props = {
  workflowId: string;
  WorkflowStatus: string;
  form: UseFormReturn<WorkflowFormValues>;
  onBack: () => void;
};

export default function WorkflowCanvasWithForm({
  workflowId,
  WorkflowStatus,
  form,
  onBack,
}: Props) {
  /* ---------- SAFE: form is guaranteed ---------- */
  const stageArray = useFieldArray<WorkflowFormValues>({
    control: form.control,
    name: "stages",
  });

  const transitionArray = useFieldArray<WorkflowFormValues>({
    control: form.control,
    name: "transitions",
  });

  return (
    <div className="h-screen w-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="font-semibold">Workflow Visual Builder</h2>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={onBack}>
            Back to Form
          </Button>
          <Button onClick={onBack}>Save & Return</Button>
        </div>
      </div>

      {/* CANVAS */}
      <div className="flex-1">
        <WorkflowCanvas
          //   workflowId={workflowId}
          WorkflowStatus={WorkflowStatus}
          form={form}
          stageArray={stageArray}
          transitionArray={transitionArray}
          mode="edit"
        />
      </div>
    </div>
  );
}
