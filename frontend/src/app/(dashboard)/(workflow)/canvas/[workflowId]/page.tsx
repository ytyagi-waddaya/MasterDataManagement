// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { useWorkflowBuilderStore } from "@/store/useWorkflowBuilderStore";
// import { useWorkflow } from "@/lib/workflow/hooks/useWorkflow";
// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
// import WorkflowCanvasWithForm from "@/lib/workflow/builder/WorkflowCanvasWithForm";
// import { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

// export default function WorkflowCanvasPage() {
//   const router = useRouter();
//   const { workflowId } = useParams() as { workflowId: string };

//   const storedForm = useWorkflowBuilderStore((s) => s.form);
//   const setForm = useWorkflowBuilderStore((s) => s.setForm);

//   const { data: workflow, isLoading } = useWorkflow(workflowId);
// const WorkflowStatus = workflow.status;
//   const rebuiltForm = useForm<WorkflowFormValues>({
//     defaultValues: {
//       name: workflow?.name ?? "",
//       resourceId: workflow?.resourceId ?? "",
//       description: workflow?.description ?? "",
//       stages: workflow?.stages ?? [],
//       transitions: workflow?.transitions ?? [],
//     },
//   });

//   useEffect(() => {
//     if (!storedForm && workflow) {
//       setForm(rebuiltForm);
//     }
//   }, [storedForm, workflow, rebuiltForm, setForm]);

//   const form = storedForm ?? rebuiltForm;

//   if (isLoading) {
//     return <div className="p-4">Loading workflow...</div>;
//   }

//   if (!workflow) {
//     return (
//       <div className="p-4 text-red-500">
//         Workflow not found
//       </div>
//     );
//   }

//   return (
//     <WorkflowCanvasWithForm
//       workflowId={workflowId}
//       WorkflowStatus={WorkflowStatus}
//       form={form}
//       onBack={() => router.push(`/create-workflow/${workflowId}`)}
//     />
//   );
// }


//////////////////
// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useWorkflowBuilderStore } from "@/store/useWorkflowBuilderStore";
// import { useWorkflow } from "@/lib/workflow/hooks/useWorkflow";
// import { useForm } from "react-hook-form";
// import { useEffect, useMemo } from "react";
// import WorkflowCanvasWithForm from "@/lib/workflow/builder/WorkflowCanvasWithForm";
// import { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

// import { useRoleList } from "@/lib/role/hooks";
// import { useUserList } from "@/lib/user/hooks";

// export default function WorkflowCanvasPage() {
//   const router = useRouter();
//   const { workflowId } = useParams() as { workflowId: string };

//   const storedForm = useWorkflowBuilderStore((s) => s.form);
//   const setForm = useWorkflowBuilderStore((s) => s.setForm);

//   const { data: workflow, isLoading } = useWorkflow(workflowId);

//   const { data: roleList = [] } = useRoleList();
//   const { data: userList = [] } = useUserList();

//   // 🔑 CHECK: graph already exists?
//   const hasGraph = useMemo(() => {
//     return Array.isArray(workflow?.stages) && workflow.stages.length > 0;
//   }, [workflow]);

//   const rebuiltForm = useForm<WorkflowFormValues>({
//     defaultValues: hasGraph
//       ? {
//           name: workflow?.name ?? "",
//           resourceId: workflow?.resourceId ?? "",
//           description: workflow?.description ?? "",
//           stages: workflow?.stages ?? [],
//           transitions: workflow?.transitions ?? [],
//         }
//       : {
//           name: workflow?.name ?? "",
//           resourceId: workflow?.resourceId ?? "",
//           description: workflow?.description ?? "",
//           stages: [],        // 🆕 blank canvas
//           transitions: [],
//         },
//   });

//   useEffect(() => {
//     if (!storedForm && workflow) {
//       setForm(rebuiltForm);
//     }
//   }, [storedForm, workflow, rebuiltForm, setForm]);

//   const form = storedForm ?? rebuiltForm;

//   if (isLoading) return <div className="p-4">Loading workflow...</div>;
//   if (!workflow) return <div className="p-4 text-red-500">Workflow not found</div>;

//   return (
//     <WorkflowCanvasWithForm
//       form={form}
//       WorkflowStatus={workflow.status}
//       roleList={roleList}
//       userList={userList}
//       onBack={() => router.push(`/create-workflow/${workflowId}`)}
//     />
//   );
// }

/////////////////////////////////

// "use client";

// import { useEffect, useMemo, useRef } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";

// import { useWorkflow } from "@/lib/workflow/hooks/useWorkflow";
// import { useRoleList } from "@/lib/role/hooks";
// import { useUserList } from "@/lib/user/hooks";

// import { useWorkflowBuilderStore } from "@/store/useWorkflowBuilderStore";
// import WorkflowCanvasWithForm from "@/lib/workflow/builder/WorkflowCanvasWithForm";
// import type { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

// const EMPTY: WorkflowFormValues = {
//   name: "",
//   resourceId: "",
//   description: "",
//   stages: [],
//   transitions: [],
//   publish: false,
// };

// export default function WorkflowCanvasPage() {
//   const router = useRouter();
//   const params = useParams() as { workflowId?: string };
//   const workflowId = params?.workflowId ?? "";

//   const { data: workflow, isLoading } = useWorkflow(workflowId);

//   const { data: roleList = [] } = useRoleList();
//   const { data: userList = [] } = useUserList();

//   // store draft for this workflow
//   const draft = useWorkflowBuilderStore((s) =>
//     workflowId ? s.drafts[workflowId] ?? null : null
//   );
//   const upsertDraft = useWorkflowBuilderStore((s) => s.upsertDraft);

//   const hydratingRef = useRef(false);
//   const hydratedOnceRef = useRef(false);

//   // graph exists?
//   const hasGraph = useMemo(() => {
//     return Array.isArray(workflow?.stages) && workflow!.stages.length > 0;
//   }, [workflow]);

//   // initial default values: draft > backend > empty
//   const defaultValues = useMemo<WorkflowFormValues>(() => {
//     if (draft?.values) return draft.values;

//     if (workflow) {
//       return hasGraph
//         ? {
//             name: workflow?.name ?? "",
//             resourceId: workflow?.resourceId ?? "",
//             description: workflow?.description ?? "",
//             stages: workflow?.stages ?? [],
//             transitions: workflow?.transitions ?? [],
//             publish: false,
//           }
//         : {
//             name: workflow?.name ?? "",
//             resourceId: workflow?.resourceId ?? "",
//             description: workflow?.description ?? "",
//             stages: [],
//             transitions: [],
//             publish: false,
//           };
//     }

//     return EMPTY;
//   }, [draft?.values, workflow, hasGraph]);

//   const form = useForm<WorkflowFormValues>({
//     defaultValues,
//     mode: "onChange",
//   });

//   // reset hydration once per workflowId
//   useEffect(() => {
//     hydratedOnceRef.current = false;
//   }, [workflowId]);

//   // hydrate: draft first, else backend once
//   useEffect(() => {
//     if (!workflowId) return;
//     if (hydratedOnceRef.current) return;

//     // 1) draft exists
//     if (draft?.values) {
//       hydratingRef.current = true;
//       form.reset(draft.values);
//       hydratingRef.current = false;
//       hydratedOnceRef.current = true;
//       return;
//     }

//     // 2) backend workflow
//     if (workflow) {
//       hydratingRef.current = true;
//       form.reset(defaultValues);
//       hydratingRef.current = false;

//       // create initial draft so refresh pe rahe
//       upsertDraft(workflowId, {
//         step: draft?.step ?? 1,
//         values: form.getValues(),
//       });

//       hydratedOnceRef.current = true;
//     }
//   }, [workflowId, workflow, draft?.values, defaultValues, form, upsertDraft, draft?.step]);

//   // auto-save changes to draft (sync)
//   useEffect(() => {
//     if (!workflowId) return;

//     const sub = form.watch((values) => {
//       if (hydratingRef.current) return;
//       upsertDraft(workflowId, {
//         step: draft?.step ?? 1,
//         values: values as WorkflowFormValues,
//       });
//     });

//     return () => sub.unsubscribe();
//   }, [form, workflowId, upsertDraft, draft?.step]);

//   if (isLoading) return <div className="p-4">Loading workflow...</div>;
//   if (!workflow) return <div className="p-4 text-red-500">Workflow not found</div>;

//   return (
//     <WorkflowCanvasWithForm
//       form={form}
//       WorkflowStatus={workflow.status}
//       roleList={roleList}
//       userList={userList}
//       onBack={() => router.push(`/create-workflow/${workflowId}`)}
//     />
//   );
// }



"use client";

import { useEffect, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useWorkflow, useWorkflowVisualizer } from "@/lib/workflow/hooks/useWorkflow";
import { useRoleList } from "@/lib/role/hooks";
import { useUserList } from "@/lib/user/hooks";
import { useDepartments } from "@/lib/department/hooks/useDepartment";

import { useWorkflowBuilderStore } from "@/store/useWorkflowBuilderStore";
import WorkflowCanvasWithForm from "@/lib/workflow/builder/WorkflowCanvasWithForm";
import type { WorkflowFormValues } from "@/lib/workflow/forms/workflowForm";

const EMPTY: WorkflowFormValues = {
  name: "",
  resourceId: "",
  description: "",
  stages: [],
  transitions: [],
  publish: false,
};

function buildValuesFromBackend(workflow: any, visualizer?: any): WorkflowFormValues {
  const vizNodes: any[] = Array.isArray(visualizer?.nodes) ? visualizer.nodes : [];
  const vizEdges: any[] = Array.isArray(visualizer?.edges) ? visualizer.edges : [];

  const wfStages: any[] = Array.isArray(workflow?.stages) ? workflow.stages : [];
  const wfTransitions: any[] = Array.isArray(workflow?.transitions) ? workflow.transitions : [];

  const stagesSource = wfStages.length > 0 ? wfStages : vizNodes;

  const mappedStages = stagesSource.map((s: any, i: number) => {
    const id = s.id ?? s.stageId ?? s.tempId ?? `${i}`;
    const viz = vizNodes.find((n) => String(n.id) === String(id));

    return {
      ...(s?.name ? s : {}),
      tempId: String(id),
      name: String(s.name ?? s.label ?? viz?.label ?? ""),
      category: String(s.category ?? viz?.category ?? "DRAFT"),
      isInitial: Boolean(s.isInitial ?? viz?.isInitial ?? false),
      isFinal: Boolean(s.isFinal ?? viz?.isFinal ?? false),
      position: s.position ?? viz?.position ?? undefined,
      order: s.order ?? i,
    };
  });

  const transitionsSource =
    wfTransitions.length > 0
      ? wfTransitions
      : vizEdges.map((e: any) => ({
          id: e.id,
          fromStageId: e.from,
          toStageId: e.to,
          label: e.label ?? "",
          transitionType: e.transitionType ?? "NORMAL",
          triggerStrategy: e.triggerStrategy ?? "ANY_ALLOWED",
          approvalStrategy: "ALL",
          allowedRoleIds: [],
          allowedUserIds: [],
          autoTrigger: !!e.autoTrigger,
        }));

  const mappedTransitions = transitionsSource
    .map((t: any, idx: number) => {
      const id = t.id ?? t.transitionId ?? t.tempId ?? `${idx}`;
      return {
        ...t,
        tempId: String(id),
        fromStageId: String(t.fromStageId ?? t.fromStage?.id ?? t.from ?? ""),
        toStageId: String(t.toStageId ?? t.toStage?.id ?? t.to ?? ""),
        label: t.label ?? "",
        transitionType: t.transitionType ?? "NORMAL",
        triggerStrategy: t.triggerStrategy ?? "ANY_ALLOWED",
        approvalStrategy: t.approvalStrategy ?? "ALL",
        allowedRoleIds: t.allowedRoleIds ?? [],
        allowedUserIds: t.allowedUserIds ?? [],
        autoTrigger: !!t.autoTrigger,
      };
    })
    .filter((t) => t.fromStageId && t.toStageId);

  return {
    name: workflow?.name ?? visualizer?.name ?? "",
    resourceId: workflow?.resourceId ?? "",
    description: workflow?.description ?? "",
    stages: mappedStages,
    transitions: mappedTransitions,
    publish: false,
  };
}

export default function WorkflowCanvasPage() {
  const router = useRouter();
  const { workflowId = "" } = useParams() as { workflowId?: string };

  const { data: workflow, isLoading } = useWorkflow(workflowId);

  const vizQuery = useWorkflowVisualizer(workflowId);
  const visualizer = vizQuery.data;
  const vizLoading = vizQuery.isLoading;

  const { data: roleList = [] } = useRoleList();
  const { data: userList = [] } = useUserList();
  const { data: departmentList = [] } = useDepartments();

  const draft = useWorkflowBuilderStore((s) =>
    workflowId ? s.drafts?.[workflowId] ?? null : null
  );
  const upsertDraft = useWorkflowBuilderStore((s) => s.upsertDraft);

  const hydratingRef = useRef(false);
  const hydratedForIdRef = useRef<string | null>(null);

  const lastSavedJsonRef = useRef<string>("");
  const saveTimerRef = useRef<any>(null);

  const backendHasGraph = useMemo(() => {
    const wfHas = Array.isArray(workflow?.stages) && workflow.stages.length > 0;
    const vizHas = Array.isArray(visualizer?.nodes) && visualizer.nodes.length > 0;
    return wfHas || vizHas;
  }, [workflow, visualizer]);

  const draftHasGraph = useMemo(() => {
    const st = draft?.values?.stages?.length ?? 0;
    const tr = draft?.values?.transitions?.length ?? 0;
    return st > 0 || tr > 0;
  }, [draft]);

  // ✅ NEW: Draft is usable for canvas only if ALL stages have tempId
  const draftCanvasReady = useMemo(() => {
    const st = draft?.values?.stages ?? [];
    if (!Array.isArray(st) || st.length === 0) return false;
    return st.every((s: any) => !!s?.tempId);
  }, [draft]);

  const form = useForm<WorkflowFormValues>({
    defaultValues: EMPTY,
    mode: "onChange",
  });

  // ✅ HYDRATE ONCE PER workflowId (no infinite reset loop)
  useEffect(() => {
    if (!workflowId) return;
    if (isLoading) return;
    if (!workflow) return;
    if (vizLoading) return;

    // already hydrated this workflowId
    if (hydratedForIdRef.current === workflowId) return;

    const values: WorkflowFormValues = (() => {
      // prefer draft only if it has graph AND canvas-ready tempIds
      if (backendHasGraph) {
        if (draftHasGraph && draftCanvasReady && draft?.values) return draft.values as WorkflowFormValues;
        return buildValuesFromBackend(workflow, visualizer);
      }

      // backend no graph
      if (draft?.values) return draft.values as WorkflowFormValues;

      return {
        name: workflow?.name ?? "",
        resourceId: workflow?.resourceId ?? "",
        description: workflow?.description ?? "",
        stages: [],
        transitions: [],
        publish: false,
      };
    })();

    hydratingRef.current = true;
    form.reset(values);
    hydratingRef.current = false;

    hydratedForIdRef.current = workflowId;

    lastSavedJsonRef.current = JSON.stringify(values ?? {});
    if (!draft?.values) {
      upsertDraft(workflowId, { step: 1, values });
    }
  }, [
    workflowId,
    isLoading,
    workflow,
    vizLoading,
    visualizer,
    backendHasGraph,
    draftHasGraph,
    draftCanvasReady,
    draft?.values,
    form,
    upsertDraft,
  ]);

  // ✅ AUTOSAVE (debounced + equality + skip during reset)
  useEffect(() => {
    if (!workflowId) return;

    const sub = form.watch((values) => {
      if (hydratingRef.current) return;

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

      saveTimerRef.current = setTimeout(() => {
        const json = JSON.stringify(values ?? {});
        if (json === lastSavedJsonRef.current) return;
        lastSavedJsonRef.current = json;

        upsertDraft(workflowId, {
          step: draft?.step ?? 1,
          values: values as WorkflowFormValues,
        });
      }, 250);
    });

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      sub.unsubscribe();
    };
  }, [form, workflowId, upsertDraft, draft?.step]);

  if (isLoading || vizLoading) return <div className="p-4">Loading workflow...</div>;
  if (!workflow) return <div className="p-4 text-red-500">Workflow not found</div>;

  return (
    <WorkflowCanvasWithForm
      workflowId={workflowId}
      form={form}
      WorkflowStatus={workflow.status}
      roleList={roleList}
      userList={userList}
      departmentList={departmentList} 
      onBack={() => router.push(`/create-workflow/${workflowId}`)}
    />
  );
}
