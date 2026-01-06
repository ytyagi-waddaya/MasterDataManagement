// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import {
//   CheckCircle,
//   Layers,
//   Route,
//   FileText,
//   ChevronRight,
//   Eye,
// } from "lucide-react";
// import { validateWorkflowGraph } from "./validateWorkflowGraph";

// export function ReviewStep({ form }: any) {
//   const data = form.watch();
//   const validation = validateWorkflowGraph(data);

//   // Calculate stats
//   const approvalTransitions =
//     data.transitions?.filter((t: any) => t.transitionType === "APPROVAL")
//       ?.length || 0;
//   const autoTransitions =
//     data.transitions?.filter((t: any) => t.transitionType === "AUTO")?.length ||
//     0;
//   const initialStage = data.stages?.find((s: any) => s.isInitial);
//   const finalStage = data.stages?.find((s: any) => s.isFinal);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-sm font-medium text-gray-900">
//             Review Configuration
//           </h3>
//           <p className="text-xs text-gray-500 mt-0.5">
//             Final check before saving
//           </p>
//         </div>
//         {validation.isValid && (
//           <Badge
//             variant="outline"
//             className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
//           >
//             <CheckCircle className="h-3 w-3 mr-1" />
//             Ready
//           </Badge>
//         )}
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-4 gap-3">
//         <div className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500 mb-1">Stages</p>
//               <p className="text-lg font-semibold text-gray-900">
//                 {data.stages?.length || 0}
//               </p>
//             </div>
//             <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center">
//               <Layers className="h-4 w-4 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         <div className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500 mb-1">Transitions</p>
//               <p className="text-lg font-semibold text-gray-900">
//                 {data.transitions?.length || 0}
//               </p>
//             </div>
//             <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center">
//               <Route className="h-4 w-4 text-amber-600" />
//             </div>
//           </div>
//         </div>

//         <div className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500 mb-1">Approval</p>
//               <p className="text-lg font-semibold text-gray-900">
//                 {approvalTransitions}
//               </p>
//             </div>
//             <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
//               <CheckCircle className="h-4 w-4 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500 mb-1">Auto</p>
//               <p className="text-lg font-semibold text-gray-900">
//                 {autoTransitions}
//               </p>
//             </div>
//             <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center">
//               <Route className="h-4 w-4 text-green-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Workflow Details */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <Card className="border-gray-200">
//           <CardContent className="p-4">
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <div className="h-4 w-4 rounded bg-gray-100 flex items-center justify-center">
//                   <FileText className="h-3 w-3 text-gray-600" />
//                 </div>
//                 <Label className="text-xs text-gray-500">Workflow Name</Label>
//               </div>
//               <p className="text-sm font-medium text-gray-900 pl-6">
//                 {data.name || "—"}
//               </p>

//               <div className="pt-3 border-t">
//                 <div className="flex items-center gap-2">
//                   <div className="h-4 w-4 rounded bg-gray-100 flex items-center justify-center">
//                     <ChevronRight className="h-3 w-3 text-gray-600" />
//                   </div>
//                   <Label className="text-xs text-gray-500">Resource</Label>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900 pl-6">
//                   {data.resourceId || "—"}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-gray-200">
//           <CardContent className="p-4">
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <div className="h-4 w-4 rounded bg-gray-100 flex items-center justify-center">
//                   <Eye className="h-3 w-3 text-gray-600" />
//                 </div>
//                 <Label className="text-xs text-gray-500">Flow Details</Label>
//               </div>

//               <div className="space-y-2 pl-6">
//                 {initialStage && (
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-gray-600">Initial Stage</span>
//                     <Badge className="text-xs bg-green-100 text-green-700">
//                       {initialStage.name}
//                     </Badge>
//                   </div>
//                 )}

//                 {finalStage && (
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-gray-600">Final Stage</span>
//                     <Badge className="text-xs bg-blue-100 text-blue-700">
//                       {finalStage.name}
//                     </Badge>
//                   </div>
//                 )}

//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-600">Description</span>
//                   <span className="text-xs text-gray-500 truncate max-w-[150px]">
//                     {data.description || "No description"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* JSON Preview Toggle */}
//       <div className="space-y-2">
//         <div className="relative">
//           <pre className="text-xs text-gray-700 bg-gray-50 p-4 pl-6 rounded-lg border border-gray-200 overflow-x-auto max-h-[250px] font-mono">
//             {JSON.stringify(data, null, 2)}
//           </pre>
//         </div>
//       </div>

//       {/* Status Indicator */}
//       {validation.isValid && (
//         <div className="p-3 border border-emerald-200 rounded-lg bg-emerald-50/50">
//           <div className="flex items-center gap-2">
//             <CheckCircle className="h-4 w-4 text-emerald-600" />
//             <div>
//               <p className="text-xs font-medium text-emerald-700">
//                 Configuration Complete
//               </p>
//               <p className="text-xs text-emerald-600">
//                 All checks passed. Ready to save.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Layers,
  Route,
  FileText,
  ChevronRight,
  Eye,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { validateWorkflowGraph } from "./validateWorkflowGraph";

export function ReviewStep({ form }: any) {
  const data = form.watch();

  // 🔥 RUN VALIDATION
  const validation = validateWorkflowGraph(data);

  const hasErrors = validation.errors.length > 0;
  const hasWarnings = validation.warnings.length > 0;

  // Calculate stats
  const approvalTransitions =
    data.transitions?.filter((t: any) => t.transitionType === "APPROVAL")
      ?.length || 0;

  const autoTransitions =
    data.transitions?.filter((t: any) => t.transitionType === "AUTO")?.length ||
    0;

  const initialStage = data.stages?.find((s: any) => s.isInitial);
  const finalStage = data.stages?.find((s: any) => s.isFinal);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            Review Configuration
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Final check before saving
          </p>
        </div>

        {/* STATUS BADGE */}
        {!hasErrors ? (
          <Badge
            variant="outline"
            className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Ready
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-xs bg-red-50 text-red-700 border-red-200"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Fix Errors
          </Badge>
        )}
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard
          label="Stages"
          value={data.stages?.length || 0}
          icon={<Layers className="h-4 w-4 text-purple-600" />}
          color="purple"
        />
        <StatCard
          label="Transitions"
          value={data.transitions?.length || 0}
          icon={<Route className="h-4 w-4 text-amber-600" />}
          color="amber"
        />
        <StatCard
          label="Approval"
          value={approvalTransitions}
          icon={<CheckCircle className="h-4 w-4 text-blue-600" />}
          color="blue"
        />
        <StatCard
          label="Auto"
          value={autoTransitions}
          icon={<Route className="h-4 w-4 text-green-600" />}
          color="green"
        />
      </div>

      {/* ================= VALIDATION RESULTS ================= */}
      {(hasErrors || hasWarnings) && (
        <div className="space-y-3">
          {/* ERRORS */}
          {hasErrors && (
            <div className="border border-red-200 rounded-lg bg-red-50/50 p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <p className="text-xs font-medium text-red-700">
                  Errors (must fix)
                </p>
              </div>
              <ul className="space-y-1 text-xs text-red-700 pl-6 list-disc">
                {validation.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* WARNINGS */}
          {hasWarnings && (
            <div className="border border-amber-200 rounded-lg bg-amber-50/50 p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <p className="text-xs font-medium text-amber-700">
                  Warnings
                </p>
              </div>
              <ul className="space-y-1 text-xs text-amber-700 pl-6 list-disc">
                {validation.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ================= WORKFLOW DETAILS ================= */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <FieldRow
                icon={<FileText className="h-3 w-3 text-gray-600" />}
                label="Workflow Name"
                value={data.name || "—"}
              />

              <div className="pt-3 border-t">
                <FieldRow
                  icon={<ChevronRight className="h-3 w-3 text-gray-600" />}
                  label="Resource"
                  value={data.resourceId || "—"}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <FieldRow
                icon={<Eye className="h-3 w-3 text-gray-600" />}
                label="Flow Details"
              />

              <div className="space-y-2 pl-6">
                {initialStage && (
                  <RowBadge label="Initial Stage" value={initialStage.name} color="green" />
                )}

                {finalStage && (
                  <RowBadge label="Final Stage" value={finalStage.name} color="blue" />
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Description</span>
                  <span className="text-xs text-gray-500 truncate max-w-[150px]">
                    {data.description || "No description"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= JSON PREVIEW ================= */}
      <div className="space-y-2">
        <pre className="text-xs text-gray-700 bg-gray-50 p-4 pl-6 rounded-lg border border-gray-200 overflow-x-auto max-h-[250px] font-mono">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      {/* ================= SUCCESS ================= */}
      {!hasErrors && (
        <div className="p-3 border border-emerald-200 rounded-lg bg-emerald-50/50">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <div>
              <p className="text-xs font-medium text-emerald-700">
                Configuration Complete
              </p>
              <p className="text-xs text-emerald-600">
                All checks passed. Ready to save.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================================================
   SMALL UI HELPERS (NO UI CHANGE, JUST CLEAN CODE)
====================================================== */

function StatCard({ label, value, icon }: any) {
  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
        <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

function FieldRow({ icon, label, value }: any) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <Label className="text-xs text-gray-500">{label}</Label>
      </div>
      {value !== undefined && (
        <p className="text-sm font-medium text-gray-900 pl-6">
          {value}
        </p>
      )}
    </div>
  );
}

function RowBadge({ label, value, color }: any) {
  const colors: any = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-600">{label}</span>
      <Badge className={`text-xs ${colors[color]}`}>
        {value}
      </Badge>
    </div>
  );
}
