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

/////////////////////////////////////

// "use client";

// import { useEffect, useMemo, useRef } from "react";
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

// const EMPTY_VALUES: WorkflowFormValues = {
//   name: "",
//   resourceId: "",
//   description: "",
//   stages: [],
//   transitions: [],
//   publish: false,
// };

// // ✅ stable id generator (client only)
// function makeId() {
//   // @ts-ignore
//   return globalThis?.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
// }

// /**
//  * ✅ IMPORTANT FIX:
//  * - Ensure stages/transitions ALWAYS have tempId before saving to zustand draft
//  * - Also normalize transitions from/to to match stage tempIds (mapping)
//  */
// function ensureTempIds(values: WorkflowFormValues): WorkflowFormValues {
//   const rawStages = Array.isArray(values?.stages) ? values.stages : [];
//   const stageIdToTempId = new Map<string, string>();

//   const stages = rawStages.map((s: any, i: number) => {
//     const base =
//       s?.tempId ??
//       s?.id ??
//       s?.stageId ??
//       s?.uuid ??
//       s?.code ??
//       null;

//     const tempId = String(s?.tempId ?? base ?? makeId());
//     if (base != null) stageIdToTempId.set(String(base), tempId);

//     return {
//       ...s,
//       tempId,
//     };
//   });

//   const rawTransitions = Array.isArray(values?.transitions) ? values.transitions : [];
//   const transitions = rawTransitions.map((t: any, i: number) => {
//     const base =
//       t?.tempId ??
//       t?.id ??
//       t?.transitionId ??
//       t?.uuid ??
//       t?.code ??
//       null;

//     const tempId = String(t?.tempId ?? base ?? makeId());

//     const fromRaw = t?.fromStageId ?? t?.fromStage?.id ?? t?.from ?? "";
//     const toRaw = t?.toStageId ?? t?.toStage?.id ?? t?.to ?? "";

//     const fromStageId = stageIdToTempId.get(String(fromRaw)) ?? String(fromRaw ?? "");
//     const toStageId = stageIdToTempId.get(String(toRaw)) ?? String(toRaw ?? "");

//     return {
//       ...t,
//       tempId,
//       fromStageId,
//       toStageId,
//     };
//   });

//   return {
//     ...values,
//     stages,
//     transitions,
//   };
// }

// export default function WorkflowBuilder({
//   workflowId,
//   onBack,
// }: {
//   workflowId: string;
//   onBack?: () => void;
// }) {
//   const router = useRouter();

//   /* ---------- STORE (draft) ---------- */
//   const draft = useWorkflowBuilderStore((s) =>
//     workflowId ? s.drafts[workflowId] ?? null : null
//   );
//   const upsertDraft = useWorkflowBuilderStore((s) => s.upsertDraft);
//   const clearDraft = useWorkflowBuilderStore((s) => s.clearDraft);

//   // current step from store (persisted)
//   const step = draft?.step ?? 1;

//   // avoid loops while hydrating/resetting
//   const hydratingRef = useRef(false);
//   const hydratedOnceRef = useRef(false);

//   /* ---------- BACKEND ---------- */
//   const { data: workflow, isLoading } = useWorkflow(workflowId);
//   const saveWorkflowGraph = useSaveWorkflowGraph(workflowId);

//   /* ---------- FORM ---------- */
//   const defaultValues = useMemo<WorkflowFormValues>(() => {
//     return draft?.values ?? EMPTY_VALUES;
//   }, [draft?.values]);

//   const form = useForm<WorkflowFormValues>({
//     defaultValues,
//     mode: "onChange",
//   });

//   const { control, handleSubmit, getValues } = form;

//   /* ---------- FIELD ARRAYS ---------- */
//   const stageArray = useFieldArray({ control, name: "stages" });
//   const transitionArray = useFieldArray({ control, name: "transitions" });

//   const watchedStages = form.watch("stages") ?? [];
//   const stagesCount = watchedStages.length;

//   /* =====================================================
//      ✅ HYDRATION PRIORITY:
//      1) If draft exists => use draft values (even after refresh)
//      2) Else use backend workflow values (first time load)
//   ===================================================== */
//   useEffect(() => {
//     hydratedOnceRef.current = false;
//   }, [workflowId]);

//   useEffect(() => {
//     if (hydratedOnceRef.current) return;

//     // 1) draft exists -> apply it (ensure tempIds)
//     if (draft?.values) {
//       const normalized = ensureTempIds(draft.values);
//       hydratingRef.current = true;
//       form.reset(normalized);
//       hydratingRef.current = false;
//       hydratedOnceRef.current = true;

//       // keep draft normalized too
//       upsertDraft(workflowId, { step: draft?.step ?? 1, values: normalized });
//       return;
//     }

//     // 2) no draft -> when workflow arrives, hydrate from backend (ensure tempIds)
//     if (workflow) {
//       const normalized = ensureTempIds({
//         name: workflow.name ?? "",
//         description: workflow.description ?? "",
//         resourceId: workflow.resource?.id ?? workflow.resourceId ?? "",
//         stages: workflow.stages ?? [],
//         transitions: workflow.transitions ?? [],
//         publish: false,
//       });

//       hydratingRef.current = true;
//       form.reset(normalized);
//       hydratingRef.current = false;

//       // also create first draft so refresh pe rahe (normalized!)
//       upsertDraft(workflowId, {
//         step: 1,
//         values: normalized,
//       });

//       hydratedOnceRef.current = true;
//     }
//   }, [draft?.values, draft?.step, workflow, workflowId, form, upsertDraft]);

//   /* =====================================================
//      ✅ AUTO-SAVE DRAFT ON EVERY CHANGE (client-side only)
//      - Save button dabane tak backend pe nahi jayega
//      - FIX: Always save normalized values (tempId etc.)
//   ===================================================== */
//   useEffect(() => {
//     const sub = form.watch((values) => {
//       if (hydratingRef.current) return;

//       upsertDraft(workflowId, {
//         step,
//         values: ensureTempIds(values as WorkflowFormValues),
//       });
//     });

//     return () => sub.unsubscribe();
//   }, [form, workflowId, upsertDraft, step]);

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

//   const setStep = (next: number) => {
//     upsertDraft(workflowId, { step: next, values: ensureTempIds(form.getValues()) });
//   };

//   /* ---------- SUBMIT ---------- */
//   const onSubmit = async (values: WorkflowFormValues) => {
//     const normalized = ensureTempIds(values);

//     await saveWorkflowGraph.mutateAsync({
//       publish: normalized.publish,
//       stages: normalized.stages.map((s, i) => ({ ...s, order: i })),
//       transitions: normalized.transitions,
//     });

//     // ✅ save successful => draft clear (optional)
//     clearDraft(workflowId);
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

//         <Button variant="default" onClick={() => router.push(`/canvas/${workflowId}`)}>
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
//             stages={watchedStages}
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

// "use client";

// import { useEffect, useMemo, useRef } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   ChevronLeft,
//   Workflow,
//   GitBranch,
//   Route,
//   FileCheck,
//   Eye,
//   Save,
//   ArrowLeft,
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
//   { id: 1, name: "Workflow Info", icon: Workflow, color: "bg-blue-500" },
//   { id: 2, name: "Stages", icon: GitBranch, color: "bg-purple-500" },
//   { id: 3, name: "Transitions", icon: Route, color: "bg-amber-500" },
//   { id: 4, name: "Review", icon: FileCheck, color: "bg-emerald-500" },
// ];

// const EMPTY_VALUES: WorkflowFormValues = {
//   name: "",
//   resourceId: "",
//   description: "",
//   stages: [],
//   transitions: [],
//   publish: false,
// };

// // ✅ stable id generator (client only)
// function makeId() {
//   // @ts-ignore
//   return globalThis?.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
// }

// /**
//  * ✅ IMPORTANT FIX:
//  * - Ensure stages/transitions ALWAYS have tempId before saving to zustand draft
//  * - Also normalize transitions from/to to match stage tempIds (mapping)
//  */
// function ensureTempIds(values: WorkflowFormValues): WorkflowFormValues {
//   const rawStages = Array.isArray(values?.stages) ? values.stages : [];
//   const stageIdToTempId = new Map<string, string>();

//   const stages = rawStages.map((s: any, i: number) => {
//     const base = s?.tempId ?? s?.id ?? s?.stageId ?? s?.uuid ?? s?.code ?? null;

//     const tempId = String(s?.tempId ?? base ?? makeId());
//     if (base != null) stageIdToTempId.set(String(base), tempId);

//     return {
//       ...s,
//       tempId,
//     };
//   });

//   const rawTransitions = Array.isArray(values?.transitions)
//     ? values.transitions
//     : [];
//   const transitions = rawTransitions.map((t: any, i: number) => {
//     const base =
//       t?.tempId ?? t?.id ?? t?.transitionId ?? t?.uuid ?? t?.code ?? null;

//     const tempId = String(t?.tempId ?? base ?? makeId());

//     const fromRaw = t?.fromStageId ?? t?.fromStage?.id ?? t?.from ?? "";
//     const toRaw = t?.toStageId ?? t?.toStage?.id ?? t?.to ?? "";

//     const fromStageId =
//       stageIdToTempId.get(String(fromRaw)) ?? String(fromRaw ?? "");
//     const toStageId = stageIdToTempId.get(String(toRaw)) ?? String(toRaw ?? "");

//     return {
//       ...t,
//       tempId,
//       fromStageId,
//       toStageId,
//     };
//   });

//   return {
//     ...values,
//     stages,
//     transitions,
//   };
// }

// export default function WorkflowBuilder({
//   workflowId,
//   onBack,
// }: {
//   workflowId: string;
//   onBack?: () => void;
// }) {
//   const router = useRouter();

//   /* ---------- STORE (draft) ---------- */
//   const draft = useWorkflowBuilderStore((s) =>
//     workflowId ? s.drafts[workflowId] ?? null : null
//   );
//   const upsertDraft = useWorkflowBuilderStore((s) => s.upsertDraft);
//   const clearDraft = useWorkflowBuilderStore((s) => s.clearDraft);

//   // current step from store (persisted)
//   const step = draft?.step ?? 1;

//   // avoid loops while hydrating/resetting
//   const hydratingRef = useRef(false);
//   const hydratedOnceRef = useRef(false);

//   /* ---------- BACKEND ---------- */
//   const { data: workflow, isLoading } = useWorkflow(workflowId);
//   const saveWorkflowGraph = useSaveWorkflowGraph(workflowId);

//   /* ---------- FORM ---------- */
//   const defaultValues = useMemo<WorkflowFormValues>(() => {
//     return draft?.values ?? EMPTY_VALUES;
//   }, [draft?.values]);

//   const form = useForm<WorkflowFormValues>({
//     defaultValues,
//     mode: "onChange",
//   });

//   const { control, handleSubmit, getValues } = form;

//   /* ---------- FIELD ARRAYS ---------- */
//   const stageArray = useFieldArray({ control, name: "stages" });
//   const transitionArray = useFieldArray({ control, name: "transitions" });

//   const watchedStages = form.watch("stages") ?? [];
//   const stagesCount = watchedStages.length;

//   /* =====================================================
//      ✅ HYDRATION PRIORITY:
//      1) If draft exists => use draft values (even after refresh)
//      2) Else use backend workflow values (first time load)
//   ===================================================== */
//   useEffect(() => {
//     hydratedOnceRef.current = false;
//   }, [workflowId]);

//   useEffect(() => {
//     if (hydratedOnceRef.current) return;

//     // 1) draft exists -> apply it (ensure tempIds)
//     if (draft?.values) {
//       const normalized = ensureTempIds(draft.values);
//       hydratingRef.current = true;
//       form.reset(normalized);
//       hydratingRef.current = false;
//       hydratedOnceRef.current = true;

//       // keep draft normalized too
//       upsertDraft(workflowId, { step: draft?.step ?? 1, values: normalized });
//       return;
//     }

//     // 2) no draft -> when workflow arrives, hydrate from backend (ensure tempIds)
//     if (workflow) {
//       const normalized = ensureTempIds({
//         name: workflow.name ?? "",
//         description: workflow.description ?? "",
//         resourceId: workflow.resource?.id ?? workflow.resourceId ?? "",
//         stages: workflow.stages ?? [],
//         transitions: workflow.transitions ?? [],
//         publish: false,
//       });

//       hydratingRef.current = true;
//       form.reset(normalized);
//       hydratingRef.current = false;

//       // also create first draft so refresh pe rahe (normalized!)
//       upsertDraft(workflowId, {
//         step: 1,
//         values: normalized,
//       });

//       hydratedOnceRef.current = true;
//     }
//   }, [draft?.values, draft?.step, workflow, workflowId, form, upsertDraft]);

//   /* =====================================================
//      ✅ AUTO-SAVE DRAFT ON EVERY CHANGE (client-side only)
//      - Save button dabane tak backend pe nahi jayega
//      - FIX: Always save normalized values (tempId etc.)
//   ===================================================== */
//   useEffect(() => {
//     const sub = form.watch((values) => {
//       if (hydratingRef.current) return;

//       upsertDraft(workflowId, {
//         step,
//         values: ensureTempIds(values as WorkflowFormValues),
//       });
//     });

//     return () => sub.unsubscribe();
//   }, [form, workflowId, upsertDraft, step]);

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

//   const setStep = (next: number) => {
//     upsertDraft(workflowId, {
//       step: next,
//       values: ensureTempIds(form.getValues()),
//     });
//   };

//   /* ---------- SUBMIT ---------- */
//   const onSubmit = async (values: WorkflowFormValues) => {
//     const normalized = ensureTempIds(values);

//     await saveWorkflowGraph.mutateAsync({
//       publish: normalized.publish,
//       stages: normalized.stages.map((s, i) => ({ ...s, order: i })),
//       transitions: normalized.transitions,
//     });

//     // ✅ save successful => draft clear (optional)
//     clearDraft(workflowId);
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-8 w-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
//       </div>
//     );

//   if (!workflow)
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <div className="text-gray-600 mb-4">Workflow not found</div>
//         <Button variant="outline" onClick={() => router.back()}>
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Go Back
//         </Button>
//       </div>
//     );

//   const Icon = STEPS[step - 1].icon;
//   return (
//     <div className="min-h-screen bg-linear-to-b from-white to-gray-50/30">
//       {/* Header */}
//       <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
//         <div className="max-w-4xl mx-auto px-2 py-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={
//                   onBack ? onBack : () => router.push(`/workflow/${workflowId}`)
//                 }
//                 className="h-9 w-9 p-0 rounded-lg hover:bg-gray-100"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>

//               <div className="flex items-center gap-3">
//                 <div
//                   className={`h-8 w-8 rounded-lg ${
//                     STEPS[step - 1].color
//                   } flex items-center justify-center`}
//                 >
//                   <Icon className="h-4 w-4 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg font-semibold text-gray-900">
//                     Configure Workflow
//                   </h1>
//                   <p className="text-sm text-gray-500 mt-0.5">
//                     {workflow.name}
//                   </p>
//                 </div>
//                 <div>
//                   <h2 className="font-semibold text-gray-900">
//                     Workflow Designer
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-1">
//                     ID:{" "}
//                     <span className="font-mono text-gray-700">
//                       {workflowId}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <Badge variant="outline" className="bg-gray-50 text-xs">
//                 Step {step}/{STEPS.length}
//               </Badge>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => router.push(`/canvas/${workflowId}`)}
//                 className="border-gray-200 text-gray-600 hover:text-gray-900"
//               >
//                 <Eye className="h-4 w-4 mr-2" />
//                 Visual Builder
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-6 py-8">
//         {/* Stepper */}
//         <div className="mb-8">
//           <Stepper
//             currentStep={step}
//             steps={STEPS}
//             onStepClick={setStep}
//             canNavigateTo={canNavigateTo}
//           />
//         </div>

//         {/* Step Content */}
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//           <form
//             id="workflow-form"
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-6"
//           >
//             {step === 1 && (
//               <WorkflowInfoStep
//                 form={form}
//                 resources={resources ?? []}
//                 workflowStatus={workflow.status}
//               />
//             )}

//             {step === 2 && (
//               <StagesStep form={form as any} stageArray={stageArray} />
//             )}

//             {step === 3 && (
//               <TransitionsStep
//                 form={form as any}
//                 transitionArray={transitionArray}
//                 stages={watchedStages}
//                 roleList={roles ?? []}
//                 userList={users ?? []}
//               />
//             )}

//             {step === 4 && <ReviewStep form={form} />}
//           </form>
//         </div>

//         {/* Navigation */}
//         <div className="flex items-center justify-between mt-8">
//           <div className="text-sm text-gray-500">
//             {step === 2 && stagesCount < 2 && (
//               <span className="text-amber-600">At least 2 stages required</span>
//             )}
//             {step === 3 && transitionArray.fields.length === 0 && (
//               <span className="text-amber-600">
//                 At least 1 transition required
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             {step > 1 && (
//               <Button
//                 variant="outline"
//                 onClick={() => setStep(step - 1)}
//                 className="text-gray-600 hover:text-gray-900"
//               >
//                 Back
//               </Button>
//             )}

//             {step < STEPS.length && (
//               <Button
//                 onClick={() => setStep(step + 1)}
//                 disabled={!canNavigateTo(step + 1)}
//                 className="bg-gray-900 hover:bg-gray-800 text-white px-6"
//               >
//                 Continue
//               </Button>
//             )}

//             {step === STEPS.length && (
//               <Button
//                 type="submit"
//                 form="workflow-form"
//                 className="bg-gray-900 hover:bg-gray-800 text-white px-6"
//               >
//                 <Save className="h-4 w-4 mr-2" />
//                 Save Workflow
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Workflow,
  Eye,
  Save,
  ArrowLeft,
  Settings,
  Layers,
  ArrowRight,
  CheckCircle,
  HelpCircle,
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
import { WorkflowBuilderGuide } from "../WorkflowBuilderGuide";
import { makeId } from "@/utils/id";

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
  { id: 1, name: "Info", icon: Settings, color: "bg-blue-500" },
  { id: 2, name: "Stages", icon: Layers, color: "bg-purple-500" },
  { id: 3, name: "Transitions", icon: ArrowRight, color: "bg-amber-500" },
  { id: 4, name: "Review", icon: CheckCircle, color: "bg-emerald-500" },
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


/**
 * ✅ IMPORTANT FIX:
 * - Ensure stages/transitions ALWAYS have tempId before saving to zustand draft
 * - Also normalize transitions from/to to match stage tempIds (mapping)
 */
function ensureTempIds(values: WorkflowFormValues): WorkflowFormValues {
  const rawStages = Array.isArray(values?.stages) ? values.stages : [];
  const stageIdToTempId = new Map<string, string>();

  const stages = rawStages.map((s: any, i: number) => {
    const base = s?.tempId ?? s?.id ?? s?.stageId ?? s?.uuid ?? s?.code ?? null;

    const tempId = String(s?.tempId ?? base ?? makeId());
    if (base != null) stageIdToTempId.set(String(base), tempId);

    return {
      ...s,
      tempId,
    };
  });

  const rawTransitions = Array.isArray(values?.transitions)
    ? values.transitions
    : [];
  const transitions = rawTransitions.map((t: any, i: number) => {
    const base =
      t?.tempId ?? t?.id ?? t?.transitionId ?? t?.uuid ?? t?.code ?? null;

    const tempId = String(t?.tempId ?? base ?? makeId());

    const fromRaw = t?.fromStageId ?? t?.fromStage?.id ?? t?.from ?? "";
    const toRaw = t?.toStageId ?? t?.toStage?.id ?? t?.to ?? "";

    const fromStageId =
      stageIdToTempId.get(String(fromRaw)) ?? String(fromRaw ?? "");
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
  const [isGuideOpen, setIsGuideOpen] = useState(false);
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
    upsertDraft(workflowId, {
      step: next,
      values: ensureTempIds(form.getValues()),
    });
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

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    );

  if (!workflow)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-gray-600 mb-4">Workflow not found</div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );

  const currentStepConfig = STEPS[step - 1];
  const Icon = currentStepConfig.icon;

  return (
    <div className="h-full bg-linear-to-b from-white to-gray-50/30">
      {/* Modern Minimal Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={
                  onBack ? onBack : () => router.push(`/workflow/${workflowId}`)
                }
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Workflow className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Configure Workflow
                  </span>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {workflow.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <WorkflowBuilderGuide
                open={isGuideOpen}
                onOpenChange={setIsGuideOpen}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <HelpCircle className="h-4 w-4 mr-1.5" />
                  <span className="text-xs">Guide</span>
                </Button>
              </WorkflowBuilderGuide>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/canvas/${workflowId}`)}
                className="text-gray-600 hover:text-gray-900"
              >
                <Eye className="h-4 w-4 mr-1.5" />
                <span className="text-xs">Visual</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stepper - Simplified */}
        <div className="mb-8">
          <Stepper
            currentStep={step}
            steps={STEPS}
            onStepClick={setStep}
            canNavigateTo={canNavigateTo}
          />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form
            id="workflow-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {step === 1 && (
              <WorkflowInfoStep
                form={form}
                resources={resources ?? []}
                workflowStatus={workflow.status}
              />
            )}

            {step === 2 && (
              <StagesStep form={form as any} stageArray={stageArray} />
            )}

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
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-500">
            {step === 2 && stagesCount < 2 && (
              <span className="text-amber-600">At least 2 stages required</span>
            )}
            {step === 3 && transitionArray.fields.length === 0 && (
              <span className="text-amber-600">
                At least 1 transition required
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="text-gray-600 hover:text-gray-900"
              >
                Back
              </Button>
            )}

            {step < STEPS.length && (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canNavigateTo(step + 1)}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Continue
              </Button>
            )}

            {step === STEPS.length && (
              <Button
                type="submit"
                form="workflow-form"
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Workflow
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
