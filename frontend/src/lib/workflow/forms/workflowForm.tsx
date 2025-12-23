"use client";

import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Workflow,
  GitBranch,
  Route,
  FileCheck,
} from "lucide-react";

import { useResourceList } from "@/lib/resource/hook";
import { useRoleList } from "@/lib/role/hooks";
import { useUserList } from "@/lib/user/hooks";

import { useSaveWorkflowGraph, useWorkflow } from "../hooks/useWorkflow";
import { Stepper } from "../Stepper";
import { WorkflowInfoStep } from "../WorkflowInfoStep";
import { StagesStep } from "../StagesStep";
import { TransitionsStep } from "../TransitionsStep";
import { ReviewStep } from "../ReviewStep";

import { useWorkflowBuilderStore } from "@/store/useWorkflowBuilderStore";
import { useRouter } from "next/navigation";

/* ===================== TYPES ===================== */

export type WorkflowFormValues = {
  name: string;
  resourceId: string;
  description?: string;
  stages: any[];
  transitions: any[];
  publish?: boolean;
};

/* ===================== STEPS ===================== */

const STEPS = [
  { id: 1, name: "Workflow Info", icon: Workflow },
  { id: 2, name: "Stages", icon: GitBranch },
  { id: 3, name: "Transitions", icon: Route },
  { id: 4, name: "Review", icon: FileCheck },
];

/* ===================== MAIN ===================== */

export default function WorkflowBuilder({
  workflowId,
  onBack,
}: {
  workflowId: string;
  onBack?: () => void;
}) {
  const router = useRouter();
  const hydratedRef = useRef(false);

  /* ---------- ZUSTAND (ALWAYS FIRST) ---------- */
  const step = useWorkflowBuilderStore((s) => s.step);
  const setStep = useWorkflowBuilderStore((s) => s.setStep);
  const storedForm = useWorkflowBuilderStore((s) => s.form);
  const setForm = useWorkflowBuilderStore((s) => s.setForm);

  /* ---------- BACKEND ---------- */
  const { data: workflow, isLoading } = useWorkflow(workflowId);
  const saveWorkflowGraph = useSaveWorkflowGraph(workflowId);
  
  /* ---------- ALWAYS CREATE LOCAL FORM ---------- */
  const localForm = useForm<WorkflowFormValues>({
    defaultValues: {
      name: "",
      resourceId: "",
      description: "",
      stages: [],
      transitions: [],
    },
    mode: "onChange",
  });

  /* ---------- SINGLE SOURCE OF TRUTH ---------- */
  const form = storedForm ?? localForm;

  const { control, handleSubmit, watch, getValues } = form;

  /* ---------- FIELD ARRAYS (SAFE) ---------- */
  const stageArray = useFieldArray({ control, name: "stages" });
  const transitionArray = useFieldArray({ control, name: "transitions" });

  // const stages = watch("stages") ?? [];
  const stages = stageArray.fields;


  /* ---------- REGISTER FORM ONCE ---------- */
  useEffect(() => {
    if (!storedForm) {
      setForm(localForm);
    }
  }, [storedForm, setForm, localForm]);

  /* ---------- HYDRATE FROM BACKEND (ONCE ONLY) ---------- */
  useEffect(() => {
    if (!workflow || hydratedRef.current || storedForm) return;

    localForm.reset({
      name: workflow.name ?? "",
      description: workflow.description ?? "",
      resourceId: workflow.resource?.id ?? workflow.resourceId ?? "",
      stages: workflow.stages ?? [],
      transitions: workflow.transitions ?? [],
    });

    hydratedRef.current = true;
  }, [workflow, storedForm, localForm]);

  /* ---------- DATA ---------- */
  const { data: resources } = useResourceList();
  const { data: roles } = useRoleList();
  const { data: users } = useUserList();

  /* ---------- VALIDATION ---------- */
  const isWorkflowInfoValid = () => {
    const values = getValues();
    return Boolean(values?.name && values?.resourceId);
  };

 const canNavigateTo = (target: number) => {
  // Always allow going back
  if (target < step) return true;

  // Leaving Step 1 → Step 2
  if (step === 1) {
    return isWorkflowInfoValid();
  }

  // Leaving Step 2 → Step 3
  if (step === 2) {
    return stages.length >= 2;
  }

  // Leaving Step 3 → Step 4
  if (step === 3) {
    return transitionArray.fields.length > 0;
  }

  return true;
};


  /* ---------- SUBMIT ---------- */
  const onSubmit = async (values: WorkflowFormValues) => {
    await saveWorkflowGraph.mutateAsync({
      publish: values.publish,
      stages: values.stages.map((s, i) => ({ ...s, order: i })),
      transitions: values.transitions,
    });
  };

  /* ---------- LOADING (AFTER HOOKS) ---------- */
  if (isLoading) {
    return <div className="p-6">Loading workflow...</div>;
  }

  /* ===================== RENDER ===================== */

  return (
    <div className="max-w-7xl mx-auto space-y-4 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold">Configure Workflow</h1>
        </div>

        <Button
          variant="secondary"
          onClick={() => router.push(`/canvas/${workflowId}`)}
        >
          Use Visual Builder
        </Button>
      </div>

      <Stepper
        currentStep={step}
        steps={STEPS}
        onStepClick={setStep}
        canNavigateTo={canNavigateTo}
      />

      <form id="workflow-form" onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <WorkflowInfoStep form={form} resources={resources ?? []} workflowStatus={workflow.status} />
        )}

        {step === 2 && (
          <StagesStep form={form as any} stageArray={stageArray} />
        )}

        {step === 3 && (
          <TransitionsStep
            form={form as any}
            transitionArray={transitionArray}
            stages={stages}
            roleList={roles ?? []}
            userList={users ?? []}
          />
        )}

        {step === 4 && <ReviewStep form={form} />}
      </form>

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}

        {step < STEPS.length && (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canNavigateTo(step + 1)}
          >
            Next
          </Button>
        )}

        {step === STEPS.length && (
          <Button type="submit" form="workflow-form">
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}
