// "use client";

// import { useEffect, useRef } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   ChevronLeft,
//   Workflow,
//   GitBranch,
//   Route,
//   FileCheck,
// } from "lucide-react";

// import { useResourceList } from "@/lib/resource/hook";
// import { useRoleList } from "@/lib/role/hooks";
// import { useUserList } from "@/lib/user/hooks";

// import { useSaveWorkflowGraph, useWorkflow } from "../hooks/useWorkflow";
// import { Stepper } from "../Stepper";
// import { WorkflowInfoStep } from "../WorkflowInfoStep";
// import { StagesStep } from "../StagesStep";
// import { TransitionsStep } from "../TransitionsStep";
// import { ReviewStep } from "../ReviewStep";

// import { useWorkflowBuilderStore } from "@/store/useWorkflowBuilderStore";
// import { useRouter } from "next/navigation";

// /* ===================== TYPES ===================== */

// export type WorkflowFormValues = {
//   name: string;
//   resourceId: string;
//   description?: string;
//   stages: any[];
//   transitions: any[];
//   publish?: boolean;
// };

// /* ===================== STEPS ===================== */

// const STEPS = [
//   { id: 1, name: "Workflow Info", icon: Workflow },
//   { id: 2, name: "Stages", icon: GitBranch },
//   { id: 3, name: "Transitions", icon: Route },
//   { id: 4, name: "Review", icon: FileCheck },
// ];

// /* ===================== MAIN ===================== */

// export default function WorkflowBuilder({
//   workflowId,
//   onBack,
// }: {
//   workflowId: string;
//   onBack?: () => void;
// }) {
//   const router = useRouter();
//   const hydratedRef = useRef(false);

//   /* ---------- ZUSTAND (ALWAYS FIRST) ---------- */
//   const step = useWorkflowBuilderStore((s) => s.step);
//   const setStep = useWorkflowBuilderStore((s) => s.setStep);
//   const storedForm = useWorkflowBuilderStore((s) => s.form);
//   const setForm = useWorkflowBuilderStore((s) => s.setForm);

//   /* ---------- BACKEND ---------- */
//   const { data: workflow, isLoading } = useWorkflow(workflowId);
//   const saveWorkflowGraph = useSaveWorkflowGraph(workflowId);
  
//   /* ---------- ALWAYS CREATE LOCAL FORM ---------- */
//   const localForm = useForm<WorkflowFormValues>({
//     defaultValues: {
//       name: "",
//       resourceId: "",
//       description: "",
//       stages: [],
//       transitions: [],
//     },
//     mode: "onChange",
//   });

//   /* ---------- SINGLE SOURCE OF TRUTH ---------- */
//   const form = storedForm ?? localForm;

//   const { control, handleSubmit, watch, getValues } = form;

//   /* ---------- FIELD ARRAYS (SAFE) ---------- */
//   const stageArray = useFieldArray({ control, name: "stages" });
//   const transitionArray = useFieldArray({ control, name: "transitions" });

//   // const stages = watch("stages") ?? [];
//   const stages = stageArray.fields;


//   /* ---------- REGISTER FORM ONCE ---------- */
//   useEffect(() => {
//     if (!storedForm) {
//       setForm(localForm);
//     }
//   }, [storedForm, setForm, localForm]);

//   /* ---------- HYDRATE FROM BACKEND (ONCE ONLY) ---------- */
//   useEffect(() => {
//     if (!workflow || hydratedRef.current || storedForm) return;

//     localForm.reset({
//       name: workflow.name ?? "",
//       description: workflow.description ?? "",
//       resourceId: workflow.resource?.id ?? workflow.resourceId ?? "",
//       stages: workflow.stages ?? [],
//       transitions: workflow.transitions ?? [],
//     });

//     hydratedRef.current = true;
//   }, [workflow, storedForm, localForm]);

//   /* ---------- DATA ---------- */
//   const { data: resources } = useResourceList();
//   const { data: roles } = useRoleList();
//   const { data: users } = useUserList();

//   /* ---------- VALIDATION ---------- */
//   const isWorkflowInfoValid = () => {
//     const values = getValues();
//     return Boolean(values?.name && values?.resourceId);
//   };

//  const canNavigateTo = (target: number) => {
//   // Always allow going back
//   if (target < step) return true;

//   // Leaving Step 1 → Step 2
//   if (step === 1) {
//     return isWorkflowInfoValid();
//   }

//   // Leaving Step 2 → Step 3
//   if (step === 2) {
//     return stages.length >= 2;
//   }

//   // Leaving Step 3 → Step 4
//   if (step === 3) {
//     return transitionArray.fields.length > 0;
//   }

//   return true;
// };


//   /* ---------- SUBMIT ---------- */
//   const onSubmit = async (values: WorkflowFormValues) => {
//     await saveWorkflowGraph.mutateAsync({
//       publish: values.publish,
//       stages: values.stages.map((s, i) => ({ ...s, order: i })),
//       transitions: values.transitions,
//     });
//   };

//   /* ---------- LOADING (AFTER HOOKS) ---------- */
//   if (isLoading) {
//     return <div className="p-6">Loading workflow...</div>;
//   }

//   /* ===================== RENDER ===================== */

//   return (
//     <div className="max-w-7xl mx-auto space-y-4 p-6">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           {onBack && (
//             <Button variant="ghost" size="icon" onClick={onBack}>
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//           )}
//           <h1 className="text-2xl font-bold">Configure Workflow</h1>
//         </div>

//         <Button
//           variant="secondary"
//           onClick={() => router.push(`/canvas/${workflowId}`)}
//         >
//           Use Visual Builder
//         </Button>
//       </div>

//       <Stepper
//         currentStep={step}
//         steps={STEPS}
//         onStepClick={setStep}
//         canNavigateTo={canNavigateTo}
//       />

//       <form id="workflow-form" onSubmit={handleSubmit(onSubmit)}>
//         {step === 1 && (
//           <WorkflowInfoStep form={form} resources={resources ?? []} workflowStatus={workflow.status} />
//         )}

//         {step === 2 && (
//           <StagesStep form={form as any} stageArray={stageArray} />
//         )}

//         {step === 3 && (
//           <TransitionsStep
//             form={form as any}
//             transitionArray={transitionArray}
//             stages={stages}
//             roleList={roles ?? []}
//             userList={users ?? []}
//           />
//         )}

//         {step === 4 && <ReviewStep form={form} />}
//       </form>

//       <div className="flex justify-between mt-6">
//         {step > 1 && (
//           <Button variant="outline" onClick={() => setStep(step - 1)}>
//             Back
//           </Button>
//         )}

//         {step < STEPS.length && (
//           <Button
//             onClick={() => setStep(step + 1)}
//             disabled={!canNavigateTo(step + 1)}
//           >
//             Next
//           </Button>
//         )}

//         {step === STEPS.length && (
//           <Button type="submit" form="workflow-form">
//             Finish
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useRef, useMemo } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, Workflow, GitBranch, Route, FileCheck } from "lucide-react";

// import { useResourceList } from "@/lib/resource/hook";
// import { useRoleList } from "@/lib/role/hooks";
// import { useUserList } from "@/lib/user/hooks";

// import { useSaveWorkflowGraph, useWorkflow } from "../hooks/useWorkflow";
// import { Stepper } from "../Stepper";
// import { WorkflowInfoStep } from "../WorkflowInfoStep";
// import { StagesStep } from "../StagesStep";
// import { TransitionsStep } from "../TransitionsStep";
// import { ReviewStep } from "../ReviewStep";

// import { useWorkflowBuilderStore } from "@/store/useWorkflowBuilderStore";
// import { useRouter } from "next/navigation";

// /* ===================== TYPES ===================== */
// export type WorkflowFormValues = {
//   name: string;
//   resourceId: string;
//   description?: string;
//   stages: any[];
//   transitions: any[];
//   publish?: boolean;
// };

// /* ===================== STEPS ===================== */
// const STEPS = [
//   { id: 1, name: "Workflow Info", icon: Workflow },
//   { id: 2, name: "Stages", icon: GitBranch },
//   { id: 3, name: "Transitions", icon: Route },
//   { id: 4, name: "Review", icon: FileCheck },
// ];

// export default function WorkflowBuilder({
//   workflowId,
//   onBack,
// }: {
//   workflowId: string;
//   onBack?: () => void;
// }) {
//   const router = useRouter();

//   // hydration guard
//   const hydratedRef = useRef(false);

//   /* ---------- ZUSTAND ---------- */
//   const step = useWorkflowBuilderStore((s) => s.step);
//   const setStep = useWorkflowBuilderStore((s) => s.setStep);

//   const storedForm = useWorkflowBuilderStore((s) => s.form);
//   const setForm = useWorkflowBuilderStore((s) => s.setForm);

//   const storeWorkflowId = useWorkflowBuilderStore((s) => s.workflowId);
//   const setWorkflowId = useWorkflowBuilderStore((s) => s.setWorkflowId);
//   const resetStore = useWorkflowBuilderStore((s) => s.reset);

//   /* ---------- BACKEND ---------- */
//   const { data: workflow, isLoading } = useWorkflow(workflowId);
//   const saveWorkflowGraph = useSaveWorkflowGraph(workflowId);

//   /* ---------- LOCAL FORM (ALWAYS CREATE) ---------- */
//   const localForm = useForm<WorkflowFormValues>({
//     defaultValues: {
//       name: "",
//       resourceId: "",
//       description: "",
//       stages: [],
//       transitions: [],
//     },
//     mode: "onChange",
//   });

//   /**
//    * ✅ ACTIVE FORM RULE:
//    * - Agar store me same workflowId ka form hai -> use storedForm
//    * - warna localForm (fresh)
//    */
//   const form = useMemo(() => {
//     if (storedForm && storeWorkflowId === workflowId) return storedForm;
//     return localForm;
//   }, [storedForm, storeWorkflowId, workflowId, localForm]);

//   const { control, handleSubmit, getValues } = form;

//   /* ---------- FIELD ARRAYS ---------- */
//   const stageArray = useFieldArray({ control, name: "stages" });
//   const transitionArray = useFieldArray({ control, name: "transitions" });

//   // ✅ real-time stages for transitions step
//   const watchedStages = form.watch("stages") ?? [];
//   const stagesCount = watchedStages.length;

//   /* =====================================================
//      ✅ WORKFLOW CHANGE => CLEAR STALE STORE
//   ===================================================== */
//   useEffect(() => {
//     // if route changed to different workflow, reset store
//     if (storeWorkflowId !== workflowId) {
//       hydratedRef.current = false;

//       // clear old form/step
//       resetStore();

//       // bind new workflowId + form
//       setWorkflowId(workflowId);
//       setForm(localForm);
//       setStep(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [workflowId]);

//   /* =====================================================
//      ✅ HYDRATION (run once per workflowId)
//      Always reset ACTIVE form (jo actual use ho raha)
//   ===================================================== */
//   useEffect(() => {
//     if (!workflow) return;
//     if (hydratedRef.current) return;

//     form.reset({
//       name: workflow.name ?? "",
//       description: workflow.description ?? "",
//       resourceId: workflow.resource?.id ?? workflow.resourceId ?? "",
//       stages: workflow.stages ?? [],
//       transitions: workflow.transitions ?? [],
//     });

//     hydratedRef.current = true;
//   }, [workflow, workflowId, form]);

//   /* ---------- DATA ---------- */
//   const { data: resources } = useResourceList();
//   const { data: roles } = useRoleList();
//   const { data: users } = useUserList();

//   /* ---------- VALIDATION ---------- */
//   const isWorkflowInfoValid = () => {
//     const values = getValues();
//     return Boolean(values?.name && values?.resourceId);
//   };

//   const canNavigateTo = (target: number) => {
//     if (target < step) return true;
//     if (step === 1) return isWorkflowInfoValid();
//     if (step === 2) return stagesCount >= 2;
//     if (step === 3) return transitionArray.fields.length > 0;
//     return true;
//   };

//   /* ---------- SUBMIT ---------- */
//   const onSubmit = async (values: WorkflowFormValues) => {
//     await saveWorkflowGraph.mutateAsync({
//       publish: values.publish,
//       stages: values.stages.map((s, i) => ({ ...s, order: i })),
//       transitions: values.transitions,
//     });
//   };

//   if (isLoading) return <div className="p-6">Loading workflow...</div>;
//   if (!workflow) return <div className="p-6">Workflow not found.</div>;

//   return (
//     <div className="max-w-7xl mx-auto space-y-4 p-6">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           {onBack && (
//             <Button variant="ghost" size="icon" onClick={onBack}>
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//           )}
//           <h1 className="text-2xl font-bold">Configure Workflow</h1>
//         </div>

//         <Button variant="secondary" onClick={() => router.push(`/canvas/${workflowId}`)}>
//           Use Visual Builder
//         </Button>
//       </div>

//       <Stepper
//         currentStep={step}
//         steps={STEPS}
//         onStepClick={setStep}
//         canNavigateTo={canNavigateTo}
//       />

//       <form id="workflow-form" onSubmit={handleSubmit(onSubmit)}>
//         {step === 1 && (
//           <WorkflowInfoStep
//             form={form}
//             resources={resources ?? []}
//             workflowStatus={workflow.status}
//           />
//         )}

//         {step === 2 && <StagesStep form={form as any} stageArray={stageArray} />}

//         {step === 3 && (
//           <TransitionsStep
//             form={form as any}
//             transitionArray={transitionArray}
//             stages={watchedStages} // ✅ real stage values
//             roleList={roles ?? []}
//             userList={users ?? []}
//           />
//         )}

//         {step === 4 && <ReviewStep form={form} />}
//       </form>

//       <div className="flex justify-between mt-6">
//         {step > 1 && (
//           <Button variant="outline" onClick={() => setStep(step - 1)}>
//             Back
//           </Button>
//         )}

//         {step < STEPS.length && (
//           <Button onClick={() => setStep(step + 1)} disabled={!canNavigateTo(step + 1)}>
//             Next
//           </Button>
//         )}

//         {step === STEPS.length && (
//           <Button type="submit" form="workflow-form">
//             Finish
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Workflow, GitBranch, Route, FileCheck } from "lucide-react";

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

const EMPTY_VALUES: WorkflowFormValues = {
  name: "",
  resourceId: "",
  description: "",
  stages: [],
  transitions: [],
  publish: false,
};

// ✅ stable id generator (client only)
function makeId() {
  // @ts-ignore
  return globalThis?.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

/**
 * ✅ IMPORTANT FIX:
 * - Ensure stages/transitions ALWAYS have tempId before saving to zustand draft
 * - Also normalize transitions from/to to match stage tempIds (mapping)
 */
function ensureTempIds(values: WorkflowFormValues): WorkflowFormValues {
  const rawStages = Array.isArray(values?.stages) ? values.stages : [];
  const stageIdToTempId = new Map<string, string>();

  const stages = rawStages.map((s: any, i: number) => {
    const base =
      s?.tempId ??
      s?.id ??
      s?.stageId ??
      s?.uuid ??
      s?.code ??
      null;

    const tempId = String(s?.tempId ?? base ?? makeId());
    if (base != null) stageIdToTempId.set(String(base), tempId);

    return {
      ...s,
      tempId,
    };
  });

  const rawTransitions = Array.isArray(values?.transitions) ? values.transitions : [];
  const transitions = rawTransitions.map((t: any, i: number) => {
    const base =
      t?.tempId ??
      t?.id ??
      t?.transitionId ??
      t?.uuid ??
      t?.code ??
      null;

    const tempId = String(t?.tempId ?? base ?? makeId());

    const fromRaw = t?.fromStageId ?? t?.fromStage?.id ?? t?.from ?? "";
    const toRaw = t?.toStageId ?? t?.toStage?.id ?? t?.to ?? "";

    const fromStageId = stageIdToTempId.get(String(fromRaw)) ?? String(fromRaw ?? "");
    const toStageId = stageIdToTempId.get(String(toRaw)) ?? String(toRaw ?? "");

    return {
      ...t,
      tempId,
      fromStageId,
      toStageId,
    };
  });

  return {
    ...values,
    stages,
    transitions,
  };
}

export default function WorkflowBuilder({
  workflowId,
  onBack,
}: {
  workflowId: string;
  onBack?: () => void;
}) {
  const router = useRouter();

  /* ---------- STORE (draft) ---------- */
  const draft = useWorkflowBuilderStore((s) =>
    workflowId ? s.drafts[workflowId] ?? null : null
  );
  const upsertDraft = useWorkflowBuilderStore((s) => s.upsertDraft);
  const clearDraft = useWorkflowBuilderStore((s) => s.clearDraft);

  // current step from store (persisted)
  const step = draft?.step ?? 1;

  // avoid loops while hydrating/resetting
  const hydratingRef = useRef(false);
  const hydratedOnceRef = useRef(false);

  /* ---------- BACKEND ---------- */
  const { data: workflow, isLoading } = useWorkflow(workflowId);
  const saveWorkflowGraph = useSaveWorkflowGraph(workflowId);

  /* ---------- FORM ---------- */
  const defaultValues = useMemo<WorkflowFormValues>(() => {
    return draft?.values ?? EMPTY_VALUES;
  }, [draft?.values]);

  const form = useForm<WorkflowFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const { control, handleSubmit, getValues } = form;

  /* ---------- FIELD ARRAYS ---------- */
  const stageArray = useFieldArray({ control, name: "stages" });
  const transitionArray = useFieldArray({ control, name: "transitions" });

  const watchedStages = form.watch("stages") ?? [];
  const stagesCount = watchedStages.length;

  /* =====================================================
     ✅ HYDRATION PRIORITY:
     1) If draft exists => use draft values (even after refresh)
     2) Else use backend workflow values (first time load)
  ===================================================== */
  useEffect(() => {
    hydratedOnceRef.current = false;
  }, [workflowId]);

  useEffect(() => {
    if (hydratedOnceRef.current) return;

    // 1) draft exists -> apply it (ensure tempIds)
    if (draft?.values) {
      const normalized = ensureTempIds(draft.values);
      hydratingRef.current = true;
      form.reset(normalized);
      hydratingRef.current = false;
      hydratedOnceRef.current = true;

      // keep draft normalized too
      upsertDraft(workflowId, { step: draft?.step ?? 1, values: normalized });
      return;
    }

    // 2) no draft -> when workflow arrives, hydrate from backend (ensure tempIds)
    if (workflow) {
      const normalized = ensureTempIds({
        name: workflow.name ?? "",
        description: workflow.description ?? "",
        resourceId: workflow.resource?.id ?? workflow.resourceId ?? "",
        stages: workflow.stages ?? [],
        transitions: workflow.transitions ?? [],
        publish: false,
      });

      hydratingRef.current = true;
      form.reset(normalized);
      hydratingRef.current = false;

      // also create first draft so refresh pe rahe (normalized!)
      upsertDraft(workflowId, {
        step: 1,
        values: normalized,
      });

      hydratedOnceRef.current = true;
    }
  }, [draft?.values, draft?.step, workflow, workflowId, form, upsertDraft]);

  /* =====================================================
     ✅ AUTO-SAVE DRAFT ON EVERY CHANGE (client-side only)
     - Save button dabane tak backend pe nahi jayega
     - FIX: Always save normalized values (tempId etc.)
  ===================================================== */
  useEffect(() => {
    const sub = form.watch((values) => {
      if (hydratingRef.current) return;

      upsertDraft(workflowId, {
        step,
        values: ensureTempIds(values as WorkflowFormValues),
      });
    });

    return () => sub.unsubscribe();
  }, [form, workflowId, upsertDraft, step]);

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
    if (target < step) return true;
    if (step === 1) return isWorkflowInfoValid();
    if (step === 2) return stagesCount >= 2;
    if (step === 3) return transitionArray.fields.length > 0;
    return true;
  };

  const setStep = (next: number) => {
    upsertDraft(workflowId, { step: next, values: ensureTempIds(form.getValues()) });
  };

  /* ---------- SUBMIT ---------- */
  const onSubmit = async (values: WorkflowFormValues) => {
    const normalized = ensureTempIds(values);

    await saveWorkflowGraph.mutateAsync({
      publish: normalized.publish,
      stages: normalized.stages.map((s, i) => ({ ...s, order: i })),
      transitions: normalized.transitions,
    });

    // ✅ save successful => draft clear (optional)
    clearDraft(workflowId);
  };

  if (isLoading) return <div className="p-6">Loading workflow...</div>;
  if (!workflow) return <div className="p-6">Workflow not found.</div>;

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

        <Button variant="default" onClick={() => router.push(`/canvas/${workflowId}`)}>
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
          <WorkflowInfoStep
            form={form}
            resources={resources ?? []}
            workflowStatus={workflow.status}
          />
        )}

        {step === 2 && <StagesStep form={form as any} stageArray={stageArray} />}

        {step === 3 && (
          <TransitionsStep
            form={form as any}
            transitionArray={transitionArray}
            stages={watchedStages}
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
          <Button onClick={() => setStep(step + 1)} disabled={!canNavigateTo(step + 1)}>
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
