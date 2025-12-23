import { create } from "zustand";
import { UseFormReturn } from "react-hook-form";
import { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

type WorkflowBuilderStore = {
  form: UseFormReturn<WorkflowFormValues> | null;
  step: number;
  setForm: (form: UseFormReturn<WorkflowFormValues>) => void;
  // clearForm: () => void;
  setStep: (step: number) => void;
};

export const useWorkflowBuilderStore = create<WorkflowBuilderStore>((set) => ({
  form: null,
  step: 1,
  setForm: (form) => set({ form }),
  setStep: (step) => set({ step }),
  // clearForm: () => set({ form: null }),
}));
