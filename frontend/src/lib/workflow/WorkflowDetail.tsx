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

///////////////////////////////////////////

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

// import { WorkflowPreviewFullScreen } from "@/lib/workflow/preview/WorkflowPreviewFullScreen";

// import {
//   ArrowLeft,
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
//   Eye,
// } from "lucide-react";

// /* ======================================================
//    SAFE HELPERS
// ====================================================== */

// function getStageName(stage: any): string {
//   if (!stage) return "—";
//   if (typeof stage === "string") return stage;

//   if (typeof stage === "object") {
//     if (typeof stage.name === "string") return stage.name;
//     if (typeof stage.name === "object" && stage.name?.name) return stage.name.name;
//   }
//   return "—";
// }

// function getTransitionStageName(stage: any): string {
//   if (!stage) return "—";
//   if (typeof stage === "string") return stage;
//   if (typeof stage === "object" && stage.name) return stage.name;
//   return "—";
// }

// /* ======================================================
//    TYPES
// ====================================================== */

// interface WorkflowDetailProps {
//   workflow: {
//     id?: string;
//     name: string;
//     description?: string;
//     resource?: { id: string; name: string };
//     createdAt?: string;
//     updatedAt?: string;
//     createdBy?: string;

//     stages: {
//       name: any;
//       order: number;
//       isInitial: boolean;
//       isFinal: boolean;
//       id?: string;
//       tempId?: string;
//       position?: { x: number; y: number };
//       category?: string;
//     }[];

//     transitions: {
//       label: string;
//       fromStage: any;
//       toStage: any;
//       allowedRoleIds: string[];
//       allowedUserIds: string[];
//       requiresApproval: boolean;
//       autoTrigger: boolean;
//       id?: string;
//       tempId?: string;
//       fromStageId?: string;
//       toStageId?: string;
//       transitionType?: string;
//     }[];
//   };
//   onBack?: () => void;
// }

// /* ======================================================
//    MAIN COMPONENT
// ====================================================== */

// export function WorkflowDetail({ workflow, onBack }: WorkflowDetailProps) {
//   const [previewOpen, setPreviewOpen] = React.useState(false);

//   // ✅ CLICK TO OPEN/CLOSE
//   const [openCard, setOpenCard] = React.useState<{
//     info: boolean;
//     stages: boolean;
//     flow: boolean;
//     transitions: boolean;
//   }>({
//     info: true,          // default open
//     stages: false,
//     flow: false,
//     transitions: false,
//   });

//   const toggle = (key: keyof typeof openCard) => {
//     setOpenCard((p) => ({ ...p, [key]: !p[key] }));
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 py-8 px-4">
//       <div className="w-full max-w-7xl mx-auto space-y-6">
//         {/* ---------------- HEADER ---------------- */}
//         <div className="flex items-start justify-between gap-3">
//           <div className="space-y-1">
//             <div className="flex items-center gap-3">
//               {onBack && (
//                 <Button variant="ghost" size="icon" onClick={onBack}>
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//               )}
//               <h1 className="text-slate-900 font-semibold">{workflow.name}</h1>
//             </div>
//             <p className="text-slate-600 ml-12">
//               {workflow.description || "No description provided"}
//             </p>
//           </div>
// {/* 
//           <Button
//             type="button"
//             variant="outline"
//             className="rounded-xl"
//             onClick={() => setPreviewOpen(true)}
//           >
//             <Eye className="h-4 w-4 mr-2" />
//             Preview
//           </Button> */}
//         </div>

//         {/* <WorkflowPreviewFullScreen
//           open={previewOpen}
//           onOpenChange={setPreviewOpen}
//           workflow={workflow as any}
//         /> */}

//         {/* ---------------- INFO (CLICKABLE) ---------------- */}
//         <div className="bg-white rounded-xl border">
//           <button
//             type="button"
//             onClick={() => toggle("info")}
//             className="w-full px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-2">
//               <WorkflowIcon className="h-5 w-5" />
//               <h2>Workflow Information</h2>
//             </div>
//             <span className="text-xs text-slate-500">
//               {openCard.info ? "Hide" : "Show"}
//             </span>
//           </button>

//           {openCard.info && (
//             <div className="p-6 grid gap-4 md:grid-cols-2">
//               <InfoBlock label="Workflow ID" value={workflow.id || "N/A"} />
//               <InfoBlock label="Resource" value={workflow.resource?.name || "N/A"} />

//               {workflow.createdAt && (
//                 <InfoBlock
//                   label="Created At"
//                   icon={<Calendar className="h-4 w-4" />}
//                   value={new Date(workflow.createdAt).toLocaleDateString()}
//                 />
//               )}

//               {workflow.updatedAt && (
//                 <InfoBlock
//                   label="Last Updated"
//                   icon={<Calendar className="h-4 w-4" />}
//                   value={new Date(workflow.updatedAt).toLocaleDateString()}
//                 />
//               )}

//               {workflow.createdBy && (
//                 <InfoBlock
//                   label="Created By"
//                   icon={<User className="h-4 w-4" />}
//                   value={workflow.createdBy}
//                 />
//               )}
//             </div>
//           )}
//         </div>

//         {/* ---------------- STAGES (CLICKABLE) ---------------- */}
//         <div className="bg-white rounded-xl border">
//           <button
//             type="button"
//             onClick={() => toggle("stages")}
//             className="w-full px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-2">
//               <GitBranch className="h-5 w-5" />
//               <h2>Stages</h2>
//             </div>
//             <span className="text-xs text-slate-500">
//               {openCard.stages ? "Hide" : "Show"} ({workflow.stages.length})
//             </span>
//           </button>

//           {openCard.stages && (
//             <div className="p-6">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Stage Name</TableHead>
//                     <TableHead className="text-center">Order</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                   {workflow.stages
//                     .slice()
//                     .sort((a, b) => a.order - b.order)
//                     .map((stage, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <div className="flex items-center gap-2">
//                             <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
//                               {stage.order + 1}
//                             </div>
//                             {getStageName(stage)}
//                           </div>
//                         </TableCell>

//                         <TableCell className="text-center">{stage.order}</TableCell>

//                         <TableCell>
//                           {stage.isInitial ? (
//                             <BadgeStage type="initial" />
//                           ) : stage.isFinal ? (
//                             <BadgeStage type="final" />
//                           ) : (
//                             <BadgeStage type="intermediate" />
//                           )}
//                         </TableCell>

//                         <TableCell>
//                           <Badge variant="outline">Active</Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </div>

//         {/* ---------------- FLOW (CLICKABLE) ---------------- */}
//         <div className="bg-white rounded-xl border">
//           <button
//             type="button"
//             onClick={() => toggle("flow")}
//             className="w-full px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-2">
//               <Route className="h-5 w-5" />
//               <h2>Workflow Flow</h2>
//             </div>
//             <span className="text-xs text-slate-500">
//               {openCard.flow ? "Hide" : "Show"}
//             </span>
//           </button>

//           {openCard.flow && (
//             <div className="p-6 flex gap-4 overflow-x-auto">
//               {workflow.stages.map((stage, index) => (
//                 <React.Fragment key={index}>
//                   <FlowStage stage={stage} />
//                   {index < workflow.stages.length - 1 && (
//                     <ArrowRight className="h-5 w-5 text-slate-400" />
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ---------------- TRANSITIONS (CLICKABLE) ---------------- */}
//         <div className="bg-white rounded-xl border">
//           <button
//             type="button"
//             onClick={() => toggle("transitions")}
//             className="w-full px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-2">
//               <Route className="h-5 w-5" />
//               <h2>Transitions</h2>
//             </div>
//             <span className="text-xs text-slate-500">
//               {openCard.transitions ? "Hide" : "Show"} ({workflow.transitions.length})
//             </span>
//           </button>

//           {openCard.transitions && (
//             <div className="p-6 space-y-4">
//               {workflow.transitions.length === 0 ? (
//                 <EmptyTransitions />
//               ) : (
//                 workflow.transitions.map((t, idx) => <TransitionCard key={idx} t={t} />)
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ======================================================
//    SMALL COMPONENTS
// ====================================================== */

// function InfoBlock({ label, value, icon }: any) {
//   return (
//     <div>
//       <span className="text-sm text-slate-600">{label}</span>
//       <div className="flex items-center gap-2 mt-1">
//         {icon}
//         <p>{value}</p>
//       </div>
//     </div>
//   );
// }

// function BadgeStage({ type }: any) {
//   if (type === "initial") {
//     return (
//       <Badge variant="outline">
//         <Circle className="h-3 w-3 mr-1 fill-green-600" />
//         Initial
//       </Badge>
//     );
//   }

//   if (type === "final") {
//     return (
//       <Badge variant="outline">
//         <CheckCircle className="h-3 w-3 mr-1" />
//         Final
//       </Badge>
//     );
//   }

//   return <Badge variant="outline">Intermediate</Badge>;
// }

// function FlowStage({ stage }: any) {
//   return (
//     <div className="flex flex-col items-center gap-2 min-w-[140px]">
//       <div className="h-16 w-16 rounded-full border flex items-center justify-center bg-white">
//         {stage.isInitial ? (
//           <Circle className="h-6 w-6 fill-green-600" />
//         ) : stage.isFinal ? (
//           <CheckCircle className="h-6 w-6" />
//         ) : (
//           <span>{stage.order + 1}</span>
//         )}
//       </div>
//       <p className="text-sm">{getStageName(stage)}</p>
//     </div>
//   );
// }

// function EmptyTransitions() {
//   return (
//     <div className="text-center py-12 text-slate-500">
//       <Route className="h-12 w-12 mx-auto mb-3" />
//       <p>No transitions defined</p>
//     </div>
//   );
// }

// function TransitionCard({ t }: any) {
//   return (
//     <div className="p-5 border rounded-lg bg-white">
//       <div className="flex items-start justify-between gap-3 mb-4">
//         <div>
//           <h3 className="font-medium">{t.label}</h3>
//           <div className="flex items-center gap-2 text-sm text-slate-600">
//             <span>{getTransitionStageName(t.fromStage)}</span>
//             <ArrowRight className="h-3 w-3" />
//             <span>{getTransitionStageName(t.toStage)}</span>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           {t.requiresApproval && (
//             <Badge variant="outline">
//               <Check className="h-3 w-3 mr-1" />
//               Approval Required
//             </Badge>
//           )}
//           {t.autoTrigger && (
//             <Badge variant="outline">
//               <Zap className="h-3 w-3 mr-1" />
//               Auto Trigger
//             </Badge>
//           )}
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
//         <IdList label="Allowed Roles" list={t.allowedRoleIds} icon={<Shield className="h-4 w-4" />} />
//         <IdList label="Allowed Users" list={t.allowedUserIds} icon={<User className="h-4 w-4" />} />
//       </div>
//     </div>
//   );
// }

// function IdList({ label, list, icon }: any) {
//   return (
//     <div>
//       <div className="flex items-center gap-2 mb-2 text-sm font-medium">
//         {icon}
//         {label}
//       </div>

//       {list && list.length ? (
//         <div className="flex flex-wrap gap-1">
//           {list.map((id: string) => (
//             <Badge key={id} variant="outline">
//               {id}
//             </Badge>
//           ))}
//         </div>
//       ) : (
//         <p className="text-sm text-slate-400">No restrictions</p>
//       )}
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  ChevronDown,
  Hash,
  Type,
  FileText,
  Link,
  Users,
  Settings,
  Clock,
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

  return (
    <div className="h-full bg-linear-to-b from-white to-gray-50/30">
      {/* Header */}
      {/* <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onBack}
                  className="h-8 w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <WorkflowIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {workflow.name}
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {workflow.description || "No description provided"}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="px-2 py-2">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stages Card */}
            <Card className="border-gray-200/70 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
                      <GitBranch className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Stages</h3>
                      <p className="text-sm text-gray-500">
                        {workflow.stages.length} stages in sequence
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-gray-50">
                    {workflow.stages.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workflow.stages
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((stage, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="shrink-0 h-10 w-10 rounded-full bg-linear-to-br from-gray-100 to-white border flex items-center justify-center">
                          {stage.isInitial ? (
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Circle className="h-3 w-3 fill-green-600" />
                            </div>
                          ) : stage.isFinal ? (
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-blue-600" />
                            </div>
                          ) : (
                            <span className="text-sm font-medium text-gray-700">
                              {stage.order + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {getStageName(stage)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`
                                text-xs px-2 py-0.5
                                ${stage.isInitial 
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : stage.isFinal
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-gray-50 text-gray-600 border-gray-200"
                                }
                              `}
                            >
                              {stage.isInitial ? "Initial" : stage.isFinal ? "Final" : "Intermediate"}
                            </Badge>
                            <span className="text-xs text-gray-500">Order: {stage.order}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Transitions Card */}
            <Card className="border-gray-200/70 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-purple-50 flex items-center justify-center">
                      <Route className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Transitions</h3>
                      <p className="text-sm text-gray-500">
                        Paths between stages with rules
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-gray-50">
                    {workflow.transitions.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {workflow.transitions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Route className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No transitions defined</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {workflow.transitions.map((t, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{t.label}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <span className="font-medium">{getTransitionStageName(t.fromStage)}</span>
                                <ArrowRight className="h-3 w-3" />
                                <span className="font-medium">{getTransitionStageName(t.toStage)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {t.requiresApproval && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                <Check className="h-3 w-3 mr-1" />
                                Approval
                              </Badge>
                            )}
                            {t.autoTrigger && (
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                <Zap className="h-3 w-3 mr-1" />
                                Auto
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Shield className="h-4 w-4" />
                              <span>Allowed Roles</span>
                            </div>
                            {t.allowedRoleIds?.length ? (
                              <div className="flex flex-wrap gap-1">
                                {t.allowedRoleIds.slice(0, 3).map((id: string) => (
                                  <Badge 
                                    key={id} 
                                    variant="outline" 
                                    className="text-xs bg-gray-50"
                                  >
                                    {id}
                                  </Badge>
                                ))}
                                {t.allowedRoleIds.length > 3 && (
                                  <Badge variant="outline" className="text-xs bg-gray-50">
                                    +{t.allowedRoleIds.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-400">No role restrictions</p>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Users className="h-4 w-4" />
                              <span>Allowed Users</span>
                            </div>
                            {t.allowedUserIds?.length ? (
                              <div className="flex flex-wrap gap-1">
                                {t.allowedUserIds.slice(0, 3).map((id: string) => (
                                  <Badge 
                                    key={id} 
                                    variant="outline" 
                                    className="text-xs bg-gray-50"
                                  >
                                    {id}
                                  </Badge>
                                ))}
                                {t.allowedUserIds.length > 3 && (
                                  <Badge variant="outline" className="text-xs bg-gray-50">
                                    +{t.allowedUserIds.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-400">No user restrictions</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card className="border-gray-200/70 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-gray-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Details</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <DetailItem
                  icon={<Hash className="h-4 w-4" />}
                  label="Workflow ID"
                  value={workflow.id || "N/A"}
                />
                <DetailItem
                  icon={<Type className="h-4 w-4" />}
                  label="Resource"
                  value={workflow.resource?.name || "N/A"}
                />
                {workflow.createdBy && (
                  <DetailItem
                    icon={<User className="h-4 w-4" />}
                    label="Created By"
                    value={workflow.createdBy}
                  />
                )}
                {workflow.createdAt && (
                  <DetailItem
                    icon={<Calendar className="h-4 w-4" />}
                    label="Created"
                    value={new Date(workflow.createdAt).toLocaleDateString()}
                  />
                )}
                {workflow.updatedAt && (
                  <DetailItem
                    icon={<Clock className="h-4 w-4" />}
                    label="Last Updated"
                    value={new Date(workflow.updatedAt).toLocaleDateString()}
                  />
                )}
              </CardContent>
            </Card>

            {/* Flow Visualization */}
            <Card className="border-gray-200/70 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-indigo-50 flex items-center justify-center">
                    <Route className="h-4 w-4 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Flow Overview</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-4">
                  {workflow.stages
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((stage, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center gap-2 min-w-[100px]">
                          <div className={`
                            h-12 w-12 rounded-full border-2 flex items-center justify-center
                            ${stage.isInitial 
                              ? "border-green-200 bg-green-50" 
                              : stage.isFinal
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-200 bg-white"
                            }
                          `}>
                            {stage.isInitial ? (
                              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                                <Circle className="h-3 w-3 fill-green-600" />
                              </div>
                            ) : stage.isFinal ? (
                              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                                <CheckCircle className="h-3 w-3 text-blue-600" />
                              </div>
                            ) : (
                              <span className="text-sm font-medium text-gray-700">
                                {stage.order + 1}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 text-center truncate w-full">
                            {getStageName(stage)}
                          </p>
                        </div>
                        {index < workflow.stages.length - 1 && (
                          <div className="h-0.5 w-8 bg-gray-200" />
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-gray-200/70 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-amber-50 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Summary</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <div className="text-2xl font-semibold text-gray-900">
                      {workflow.stages.length}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Stages</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <div className="text-2xl font-semibold text-gray-900">
                      {workflow.transitions.length}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Transitions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <WorkflowPreviewFullScreen
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        workflow={workflow as any}
      />
    </div>
  );
}

/* ======================================================
   SMALL COMPONENTS
====================================================== */

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
      </div>
    </div>
  );
}