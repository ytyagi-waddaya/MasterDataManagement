// "use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   ArrowLeft,
//   Edit,
//   Workflow as WorkflowIcon,
//   GitBranch,
//   Route,
//   Calendar,
//   User,
//   Shield,
//   CheckCircle,
//   Circle,
//   ArrowRight,
//   Check,
//   Zap,
// } from "lucide-react";
// interface WorkflowDetailProps {
//   workflow: {
//     id?: string;
//     name: string;
//     description?: string;
//     resourceId?: string;
//     resource:{
//       id:string,
//       name:string
//     };

//     createdAt?: string;
//     updatedAt?: string;
//     createdBy?: string;

//     stages: {
//       name: string;
//       order: number;
//       isInitial: boolean;
//       isFinal: boolean;
//     }[];

//     transitions: {
//       label: string;
//       fromStage: string;
//       toStage: string;
//       allowedRoleIds: string[];
//       allowedUserIds: string[];
//       requiresApproval: boolean;
//       autoTrigger: boolean;
//     }[];
//   };
//   onEdit?: () => void;
//   onBack?: () => void;
// }

// export function WorkflowDetail({ workflow, onEdit, onBack }: WorkflowDetailProps) {
//   return (
//     <div className="min-h-screen bg-slate-50 py-8 px-4">
//       <div className="w-full max-w-7xl mx-auto space-y-6">

//         {/* ------------------------ HEADER ------------------------ */}
//         <div className="flex items-start justify-between">
//           <div className="space-y-1">
//             <div className="flex items-center gap-3">
//               {onBack && (
//                 <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//               )}
//               <h1 className="text-slate-900 font-semibold">{workflow.name}</h1>
//             </div>

//             <p className="text-slate-600 ml-12">
//               {workflow.description || "No description provided"}
//             </p>
//           </div>

//           {/* {onEdit && (
//             <Button onClick={onEdit} className="bg-slate-900 hover:bg-slate-800 h-10">
//               <Edit className="h-4 w-4 mr-2" />
//               Edit Workflow
//             </Button>
//           )} */}
//         </div>

//         {/* ------------------------ WORKFLOW INFORMATION ------------------------ */}
//         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//           <div className="px-6 py-4 border-b bg-slate-50 border-slate-200 flex items-center gap-2">
//             <WorkflowIcon className="h-5 w-5 text-slate-700" />
//             <h2 className="text-slate-900">Workflow Information</h2>
//           </div>

//           <div className="p-6 grid gap-4 md:grid-cols-2">
//             <InfoBlock label="Workflow ID" value={workflow.id || "N/A"} />
//             <InfoBlock label="Resource" value={workflow.resource.name || "N/A"} />

//             {workflow.createdAt && (
//               <InfoBlock
//                 label="Created At"
//                 icon={<Calendar className="h-4 w-4 text-slate-400" />}
//                 value={new Date(workflow.createdAt).toLocaleDateString()}
//               />
//             )}

//             {workflow.updatedAt && (
//               <InfoBlock
//                 label="Last Updated"
//                 icon={<Calendar className="h-4 w-4 text-slate-400" />}
//                 value={new Date(workflow.updatedAt).toLocaleDateString()}
//               />
//             )}

//             {workflow.createdBy && (
//               <InfoBlock
//                 label="Created By"
//                 icon={<User className="h-4 w-4 text-slate-400" />}
//                 value={workflow.createdBy}
//               />
//             )}
//           </div>
//         </div>

//         {/* ------------------------ STAGES ------------------------ */}
//         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//           <SectionHeader
//             icon={<GitBranch className="h-5 w-5 text-slate-700" />}
//             title="Stages"
//             count={workflow.stages.length}
//           />

//           <div className="p-6">
//             <Table className="border border-slate-200 rounded-lg">
//               <TableHeader>
//                 <TableRow className="bg-slate-50">
//                   <TableHead>Stage Name</TableHead>
//                   <TableHead className="text-center w-24">Order</TableHead>
//                   <TableHead className="w-32">Type</TableHead>
//                   <TableHead className="w-32">Status</TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {workflow.stages
//                   .sort((a, b) => a.order - b.order)
//                   .map((stage, index) => (
//                     <TableRow key={index}>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100">
//                             {stage.order + 1}
//                           </div>
//                           {stage.name}
//                         </div>
//                       </TableCell>

//                       <TableCell className="text-center text-slate-600">
//                         {stage.order}
//                       </TableCell>

//                       <TableCell>
//                         {stage.isInitial ? (
//                           <BadgeStage type="initial" />
//                         ) : stage.isFinal ? (
//                           <BadgeStage type="final" />
//                         ) : (
//                           <BadgeStage type="intermediate" />
//                         )}
//                       </TableCell>

//                       <TableCell>
//                         <Badge variant="outline" className="bg-slate-50 border-slate-200">
//                           Active
//                         </Badge>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </div>
//         </div>

//         {/* ------------------------ FLOW DIAGRAM ------------------------ */}
//         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//           <SectionHeader
//             icon={<Route className="h-5 w-5 text-slate-700" />}
//             title="Workflow Flow"
//           />

//           <div className="p-6 flex items-center gap-4 overflow-x-auto pb-4">
//             {workflow.stages.map((stage, index) => (
//               <React.Fragment key={index}>
//                 <FlowStage stage={stage} />

//                 {index < workflow.stages.length - 1 && (
//                   <ArrowRight className="h-5 w-5 text-slate-400 shrink-0" />
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* ------------------------ TRANSITIONS ------------------------ */}
//         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//           <SectionHeader
//             icon={<Route className="h-5 w-5 text-slate-700" />}
//             title="Transitions"
//             count={workflow.transitions.length}
//           />

//           <div className="p-6 space-y-4">
//             {workflow.transitions.length === 0 ? (
//               <EmptyTransitions />
//             ) : (
//               workflow.transitions.map((t, idx) => <TransitionCard key={idx} t={t} index={idx} />)
//             )}
//           </div>
//         </div>

//         {/* ------------------------ SUMMARY ------------------------ */}
//         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//           <SectionHeader title="Summary" />

//           <div className="p-6 grid gap-6 md:grid-cols-3">
//             <SummaryBlock label="Total Stages" value={workflow.stages.length} />
//             <SummaryBlock label="Total Transitions" value={workflow.transitions.length} />
//             <SummaryBlock
//               label="Initial Stages"
//               value={workflow.stages.filter((s) => s.isInitial).length}
//             />
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// }

// /* ------------------------ REUSABLE COMPONENTS ------------------------ */

// function InfoBlock({
//   label,
//   value,
//   icon,
// }: {
//   label: string;
//   value: string | number;
//   icon?: React.ReactNode;
// }) {
//   return (
//     <div>
//       <span className="text-sm text-slate-600">{label}</span>
//       <div className="flex items-center gap-2 mt-1">
//         {icon}
//         <p className="text-slate-900">{value}</p>
//       </div>
//     </div>
//   );
// }

// function SectionHeader({
//   title,
//   icon,
//   count,
// }: {
//   title: string;
//   icon?: React.ReactNode;
//   count?: number;
// }) {
//   return (
//     <div className="px-6 py-4 border-b bg-slate-50 border-slate-200 flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         {icon}
//         <h2 className="text-slate-900">{title}</h2>
//       </div>
//       {count !== undefined && <span className="text-sm text-slate-600">{count}</span>}
//     </div>
//   );
// }

// function BadgeStage({ type }: { type: "initial" | "final" | "intermediate" }) {
//   if (type === "initial")
//     return (
//       <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
//         <Circle className="h-3 w-3 mr-1 fill-green-600 text-green-600" />
//         Initial
//       </Badge>
//     );

//   if (type === "final")
//     return (
//       <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
//         <CheckCircle className="h-3 w-3 mr-1" />
//         Final
//       </Badge>
//     );

//   return <Badge variant="outline">Intermediate</Badge>;
// }

// function FlowStage({ stage }: any) {
//   return (
//     <div className="flex flex-col items-center gap-2 min-w-[140px]">
//       <div
//         className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
//           stage.isInitial
//             ? "border-green-500 bg-green-50"
//             : stage.isFinal
//             ? "border-blue-500 bg-blue-50"
//             : "border-slate-300 bg-slate-50"
//         }`}
//       >
//         {stage.isInitial ? (
//           <Circle className="h-6 w-6 text-green-600 fill-green-600" />
//         ) : stage.isFinal ? (
//           <CheckCircle className="h-6 w-6 text-blue-600" />
//         ) : (
//           <span className="text-slate-700">{stage.order + 1}</span>
//         )}
//       </div>
//       <div className="text-center">
//         <p className="text-sm text-slate-900">{stage.name}</p>
//       </div>
//     </div>
//   );
// }

// function EmptyTransitions() {
//   return (
//     <div className="text-center py-12 text-slate-500">
//       <Route className="h-12 w-12 mx-auto mb-3 text-slate-300" />
//       <p>No transitions defined</p>
//     </div>
//   );
// }

// function TransitionCard({ t, index }: any) {
//   return (
//     <div className="p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
//             {index + 1}
//           </div>

//           <div>
//             <h3 className="text-slate-900">{t.label}</h3>
//             <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
//               <span>{t.fromStage}</span>
//               <ArrowRight className="h-3 w-3" />
//               <span>{t.toStage}</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {t.requiresApproval && (
//             <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
//               <Check className="h-3 w-3 mr-1" />
//               Approval Required
//             </Badge>
//           )}

//           {t.autoTrigger && (
//             <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
//               <Zap className="h-3 w-3 mr-1" />
//               Auto Trigger
//             </Badge>
//           )}
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-slate-100">
//         <div>
//           <LabelWithIcon label="Allowed Roles" icon={<Shield className="h-4 w-4" />} />
//           <IdList list={t.allowedRoleIds} />
//         </div>

//         <div>
//           <LabelWithIcon label="Allowed Users" icon={<User className="h-4 w-4" />} />
//           <IdList list={t.allowedUserIds} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function LabelWithIcon({ label, icon }: any) {
//   return (
//     <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
//       {icon}
//       {label}
//     </div>
//   );
// }

// function IdList({ list }: { list: string[] }) {
//   return list && list.length > 0 ? (
//     <div className="flex flex-wrap gap-1.5">
//       {list.map((id) => (
//         <Badge key={id} variant="outline" className="bg-slate-50">
//           {id}
//         </Badge>
//       ))}
//     </div>
//   ) : (
//     <p className="text-sm text-slate-400">No restrictions</p>
//   );
// }

// function SummaryBlock({ label, value }: any) {
//   return (
//     <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-200">
//       <div className="text-3xl text-slate-900 mb-1">{value}</div>
//       <div className="text-sm text-slate-600">{label}</div>
//     </div>
//   );
// }


"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { WorkflowPreviewFullScreen } from "@/lib/workflow/preview/WorkflowPreviewFullScreen";

import {
  ArrowLeft,
  Workflow as WorkflowIcon,
  GitBranch,
  Route,
  Calendar,
  User,
  Shield,
  CheckCircle,
  Circle,
  ArrowRight,
  Check,
  Zap,
  Eye,
} from "lucide-react";

/* ======================================================
   SAFE HELPERS
====================================================== */

function getStageName(stage: any): string {
  if (!stage) return "—";
  if (typeof stage === "string") return stage;

  if (typeof stage === "object") {
    if (typeof stage.name === "string") return stage.name;
    if (typeof stage.name === "object" && stage.name?.name) return stage.name.name;
  }
  return "—";
}

function getTransitionStageName(stage: any): string {
  if (!stage) return "—";
  if (typeof stage === "string") return stage;
  if (typeof stage === "object" && stage.name) return stage.name;
  return "—";
}

/* ======================================================
   TYPES
====================================================== */

interface WorkflowDetailProps {
  workflow: {
    id?: string;
    name: string;
    description?: string;
    resource?: { id: string; name: string };
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;

    stages: {
      name: any;
      order: number;
      isInitial: boolean;
      isFinal: boolean;
      id?: string;
      tempId?: string;
      position?: { x: number; y: number };
      category?: string;
    }[];

    transitions: {
      label: string;
      fromStage: any;
      toStage: any;
      allowedRoleIds: string[];
      allowedUserIds: string[];
      requiresApproval: boolean;
      autoTrigger: boolean;
      id?: string;
      tempId?: string;
      fromStageId?: string;
      toStageId?: string;
      transitionType?: string;
    }[];
  };
  onBack?: () => void;
}

/* ======================================================
   MAIN COMPONENT
====================================================== */

export function WorkflowDetail({ workflow, onBack }: WorkflowDetailProps) {
  const [previewOpen, setPreviewOpen] = React.useState(false);

  // ✅ CLICK TO OPEN/CLOSE
  const [openCard, setOpenCard] = React.useState<{
    info: boolean;
    stages: boolean;
    flow: boolean;
    transitions: boolean;
  }>({
    info: true,          // default open
    stages: false,
    flow: false,
    transitions: false,
  });

  const toggle = (key: keyof typeof openCard) => {
    setOpenCard((p) => ({ ...p, [key]: !p[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <h1 className="text-slate-900 font-semibold">{workflow.name}</h1>
            </div>
            <p className="text-slate-600 ml-12">
              {workflow.description || "No description provided"}
            </p>
          </div>
{/* 
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => setPreviewOpen(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button> */}
        </div>

        {/* <WorkflowPreviewFullScreen
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          workflow={workflow as any}
        /> */}

        {/* ---------------- INFO (CLICKABLE) ---------------- */}
        <div className="bg-white rounded-xl border">
          <button
            type="button"
            onClick={() => toggle("info")}
            className="w-full px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <WorkflowIcon className="h-5 w-5" />
              <h2>Workflow Information</h2>
            </div>
            <span className="text-xs text-slate-500">
              {openCard.info ? "Hide" : "Show"}
            </span>
          </button>

          {openCard.info && (
            <div className="p-6 grid gap-4 md:grid-cols-2">
              <InfoBlock label="Workflow ID" value={workflow.id || "N/A"} />
              <InfoBlock label="Resource" value={workflow.resource?.name || "N/A"} />

              {workflow.createdAt && (
                <InfoBlock
                  label="Created At"
                  icon={<Calendar className="h-4 w-4" />}
                  value={new Date(workflow.createdAt).toLocaleDateString()}
                />
              )}

              {workflow.updatedAt && (
                <InfoBlock
                  label="Last Updated"
                  icon={<Calendar className="h-4 w-4" />}
                  value={new Date(workflow.updatedAt).toLocaleDateString()}
                />
              )}

              {workflow.createdBy && (
                <InfoBlock
                  label="Created By"
                  icon={<User className="h-4 w-4" />}
                  value={workflow.createdBy}
                />
              )}
            </div>
          )}
        </div>

        {/* ---------------- STAGES (CLICKABLE) ---------------- */}
        <div className="bg-white rounded-xl border">
          <button
            type="button"
            onClick={() => toggle("stages")}
            className="w-full px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              <h2>Stages</h2>
            </div>
            <span className="text-xs text-slate-500">
              {openCard.stages ? "Hide" : "Show"} ({workflow.stages.length})
            </span>
          </button>

          {openCard.stages && (
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stage Name</TableHead>
                    <TableHead className="text-center">Order</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {workflow.stages
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((stage, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                              {stage.order + 1}
                            </div>
                            {getStageName(stage)}
                          </div>
                        </TableCell>

                        <TableCell className="text-center">{stage.order}</TableCell>

                        <TableCell>
                          {stage.isInitial ? (
                            <BadgeStage type="initial" />
                          ) : stage.isFinal ? (
                            <BadgeStage type="final" />
                          ) : (
                            <BadgeStage type="intermediate" />
                          )}
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* ---------------- FLOW (CLICKABLE) ---------------- */}
        <div className="bg-white rounded-xl border">
          <button
            type="button"
            onClick={() => toggle("flow")}
            className="w-full px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              <h2>Workflow Flow</h2>
            </div>
            <span className="text-xs text-slate-500">
              {openCard.flow ? "Hide" : "Show"}
            </span>
          </button>

          {openCard.flow && (
            <div className="p-6 flex gap-4 overflow-x-auto">
              {workflow.stages.map((stage, index) => (
                <React.Fragment key={index}>
                  <FlowStage stage={stage} />
                  {index < workflow.stages.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- TRANSITIONS (CLICKABLE) ---------------- */}
        <div className="bg-white rounded-xl border">
          <button
            type="button"
            onClick={() => toggle("transitions")}
            className="w-full px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              <h2>Transitions</h2>
            </div>
            <span className="text-xs text-slate-500">
              {openCard.transitions ? "Hide" : "Show"} ({workflow.transitions.length})
            </span>
          </button>

          {openCard.transitions && (
            <div className="p-6 space-y-4">
              {workflow.transitions.length === 0 ? (
                <EmptyTransitions />
              ) : (
                workflow.transitions.map((t, idx) => <TransitionCard key={idx} t={t} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   SMALL COMPONENTS
====================================================== */

function InfoBlock({ label, value, icon }: any) {
  return (
    <div>
      <span className="text-sm text-slate-600">{label}</span>
      <div className="flex items-center gap-2 mt-1">
        {icon}
        <p>{value}</p>
      </div>
    </div>
  );
}

function BadgeStage({ type }: any) {
  if (type === "initial") {
    return (
      <Badge variant="outline">
        <Circle className="h-3 w-3 mr-1 fill-green-600" />
        Initial
      </Badge>
    );
  }

  if (type === "final") {
    return (
      <Badge variant="outline">
        <CheckCircle className="h-3 w-3 mr-1" />
        Final
      </Badge>
    );
  }

  return <Badge variant="outline">Intermediate</Badge>;
}

function FlowStage({ stage }: any) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[140px]">
      <div className="h-16 w-16 rounded-full border flex items-center justify-center bg-white">
        {stage.isInitial ? (
          <Circle className="h-6 w-6 fill-green-600" />
        ) : stage.isFinal ? (
          <CheckCircle className="h-6 w-6" />
        ) : (
          <span>{stage.order + 1}</span>
        )}
      </div>
      <p className="text-sm">{getStageName(stage)}</p>
    </div>
  );
}

function EmptyTransitions() {
  return (
    <div className="text-center py-12 text-slate-500">
      <Route className="h-12 w-12 mx-auto mb-3" />
      <p>No transitions defined</p>
    </div>
  );
}

function TransitionCard({ t }: any) {
  return (
    <div className="p-5 border rounded-lg bg-white">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-medium">{t.label}</h3>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>{getTransitionStageName(t.fromStage)}</span>
            <ArrowRight className="h-3 w-3" />
            <span>{getTransitionStageName(t.toStage)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {t.requiresApproval && (
            <Badge variant="outline">
              <Check className="h-3 w-3 mr-1" />
              Approval Required
            </Badge>
          )}
          {t.autoTrigger && (
            <Badge variant="outline">
              <Zap className="h-3 w-3 mr-1" />
              Auto Trigger
            </Badge>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
        <IdList label="Allowed Roles" list={t.allowedRoleIds} icon={<Shield className="h-4 w-4" />} />
        <IdList label="Allowed Users" list={t.allowedUserIds} icon={<User className="h-4 w-4" />} />
      </div>
    </div>
  );
}

function IdList({ label, list, icon }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        {icon}
        {label}
      </div>

      {list && list.length ? (
        <div className="flex flex-wrap gap-1">
          {list.map((id: string) => (
            <Badge key={id} variant="outline">
              {id}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400">No restrictions</p>
      )}
    </div>
  );
}
