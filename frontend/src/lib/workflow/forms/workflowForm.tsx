"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { useResourceList } from "@/lib/resource/hook";
import { useRoleList } from "@/lib/role/hooks";
import { useUserList } from "@/lib/user/hooks";

import { useCreateFullWorkflow } from "../hooks/useWorkflow";

import { Workflow, GitBranch, Route, FileCheck, ArrowLeft } from "lucide-react";

import { Stepper } from "../Stepper";
import { WorkflowInfoStep } from "../WorkflowInfoStep";
import { StagesStep } from "../StagesStep";
import { TransitionsStep } from "../TransitionsStep";
import { ReviewStep } from "../ReviewStep";

// ----------------------------------------------------
const STEPS = [
  { id: 1, name: "Workflow Info", icon: Workflow },
  { id: 2, name: "Stages", icon: GitBranch },
  { id: 3, name: "Transitions", icon: Route },
  { id: 4, name: "Review", icon: FileCheck },
];

// ----------------------------------------------------
export interface WorkflowFormValues {
  name: string;
  resourceId: string;
  description: string;

  stages: {
    name: string;
    isInitial: boolean;
    isFinal: boolean;
    order: number;
  }[];

  transitions: {
    label: string;
    fromStageId: string;
    toStageId: string;
    allowedRoleIds: string[];
    allowedUserIds: string[];
    requiresApproval: boolean;
    autoTrigger: boolean;
  }[];
}

// ----------------------------------------------------
export default function WorkflowBuilder({ onBack }: any) {
  const createFullWorkflow = useCreateFullWorkflow();

  const [step, setStep] = useState(1);

  const form = useForm<WorkflowFormValues>({
    defaultValues: {
      name: "",
      resourceId: "",
      description: "",
      stages: [],
      transitions: [],
    },
  });

  const { control, handleSubmit, watch } = form;

  const stageArray = useFieldArray({ control, name: "stages" });
  const transitionArray = useFieldArray({ control, name: "transitions" });

  const stages = watch("stages");

  const { data: resources} = useResourceList();

  const { data: roles} = useRoleList();
  const { data: users} = useUserList();

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  // ----------------------------------------------------
  // FINAL SUBMIT — CREATE FULL WORKFLOW
  // ----------------------------------------------------
  const onSubmit = async (values: WorkflowFormValues) => {
    await createFullWorkflow.mutateAsync({
      name: values.name,
      description: values.description,
      resourceId: values.resourceId,

      stages: values.stages.map((s, index) => ({
        name: s.name,
        isInitial: s.isInitial,
        isFinal: s.isFinal,
        order: index,
      })),

      transitions: values.transitions,
    });

    alert("Workflow created successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 p-6">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        Create Workflow
      </h1>

      <div className="flex justify-center">
        <Stepper currentStep={step} steps={STEPS} />
      </div>

      <form id="workflow-form" onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <WorkflowInfoStep form={form} resources={resources} />
        )}

        {step === 2 && <StagesStep form={form} stageArray={stageArray} />}

        {step === 3 && (
          <TransitionsStep
            form={form}
            transitionArray={transitionArray}
            stages={stages}
            roleList={roles}
            userList={users}
          />
        )}

        {step === 4 && <ReviewStep form={form} />}
      </form>

      <div className="flex justify-between mt-4">
        {step > 1 && <Button onClick={back}>Back</Button>}

        {step < 4 && <Button onClick={next}>Next</Button>}

        {step === 4 && (
          <Button type="submit" form="workflow-form">
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}
