// import { create } from "zustand";
// import { UseFormReturn } from "react-hook-form";
// import { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

// type WorkflowBuilderStore = {
//   form: UseFormReturn<WorkflowFormValues> | null;
//   step: number;
//   setForm: (form: UseFormReturn<WorkflowFormValues>) => void;
//   // clearForm: () => void;
//   setStep: (step: number) => void;
// };

// export const useWorkflowBuilderStore = create<WorkflowBuilderStore>((set) => ({
//   form: null,
//   step: 1,
//   setForm: (form) => set({ form }),
//   setStep: (step) => set({ step }),
//   // clearForm: () => set({ form: null }),
// }));



"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

const EMPTY_VALUES: WorkflowFormValues = {
  name: "",
  resourceId: "",
  description: "",
  stages: [],
  transitions: [],
  publish: false,
};

export type WorkflowDraft = {
  step: number;
  values: WorkflowFormValues;
  updatedAt: number;
};

export type WorkflowBuilderStore = {
  drafts: Record<string, WorkflowDraft>;
  hasHydrated: boolean;

  setHasHydrated: (v: boolean) => void;

  upsertDraft: (
    workflowId: string,
    patch: Partial<Omit<WorkflowDraft, "updatedAt">>
  ) => void;

  removeDraft: (workflowId: string) => void;
  clearDraft: (workflowId: string) => void; // alias
  clearAllDrafts: () => void;
};

export const useWorkflowBuilderStore = create<WorkflowBuilderStore>()(
  persist(
    (set, get) => ({
      drafts: {},
      hasHydrated: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      upsertDraft: (workflowId, patch) => {
        if (!workflowId) return;

        const prev = get().drafts[workflowId];

        const next: WorkflowDraft = {
          step: patch.step ?? prev?.step ?? 1,
          values: patch.values ?? prev?.values ?? EMPTY_VALUES,
          updatedAt: Date.now(),
        };

        set({
          drafts: {
            ...get().drafts,
            [workflowId]: next,
          },
        });
      },

      removeDraft: (workflowId) => {
        const next = { ...get().drafts };
        delete next[workflowId];
        set({ drafts: next });
      },

      clearDraft: (workflowId) => {
        const next = { ...get().drafts };
        delete next[workflowId];
        set({ drafts: next });
      },

      clearAllDrafts: () => set({ drafts: {} }),
    }),
    {
      name: "workflow-builder-drafts-v1",
      partialize: (s) => ({ drafts: s.drafts }),
      onRehydrateStorage: () => (state, error) => {
        if (!error) state?.setHasHydrated(true);
      },
    }
  )
);
