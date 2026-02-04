// "use client";

// import { useParams } from "next/navigation";
// import { useRecord } from "@/lib/masterRecord/hooks";
// import { RecordHeader } from "@/lib/masterRecord/components/RecordHeader";
// import { RecordFormRenderer } from "@/lib/masterRecord/components/RecordFormRenderer";
// import { WorkflowTimeline } from "@/lib/workflow/timeline/workflow-timeline";
// import { useWorkflowHistory } from "@/lib/workflow/hooks/useWorkflow";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";

// export default function RecordDetailsPage() {
//   const { recordId } = useParams() as { recordId: string };

//   const { data: record, isLoading, refetch } = useRecord(recordId);
//   const { data: history = [], isLoading: historyLoading } =
//     useWorkflowHistory(recordId);

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
//         <div className="animate-pulse text-sm text-gray-400">
//           Loading record...
//         </div>
//       </div>
//     );

//   if (!record)
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
//         <div className="text-sm text-gray-500">Record not found</div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex items-start gap-3">
//             <Button
//               className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 mt-0.5 shrink-0"
//               onClick={() => window.history.back()}
//               variant="ghost"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             <div className="flex-1 min-w-0">
//               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
//                 <div className="min-w-0">
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <h1 className="text-xl font-semibold text-gray-900 truncate">
//                       {record.code || "Untitled Record"}
//                     </h1>
//                     <div className="hidden sm:inline-flex text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
//                       ID: {recordId.substring(0, 8)}...
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-0.5">
//                     View and manage record information
//                   </p>
//                 </div>

//                 <div className="sm:hidden">
//                   <div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
//                     ID: {recordId.substring(0, 8)}...
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
//           {/* Left Column: Form & Details */}
//           <div className="lg:col-span-3 space-y-2">
//             {/* Action Bar Card */}
//             <div className="bg-white rounded-lg border border-gray-200">
//               <div className="p-4">
//                 <RecordHeader record={record} onRefresh={refetch} />
//               </div>
//             </div>

//             {/* Form Card */}
//             <div className="bg-white rounded-lg border border-gray-200">
//               <div className="p-2">
//                 <div className="space-y-4">
//                   <RecordFormRenderer record={record} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Workflow Timeline */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-4">
//               <div className="bg-white rounded-lg border border-gray-200">
//                 <div className="p-5">
//                   {/* Timeline Header */}
//                   <div className="mb-5">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
//                           Activity Timeline
//                         </h3>
//                         <p className="text-xs text-gray-500 mt-0.5">
//                           Recent actions and updates
//                         </p>
//                       </div>
//                       {history.length > 0 && (
//                         <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
//                           {history.length}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Timeline Content */}
//                   {historyLoading ? (
//                     <div className="flex flex-col items-center justify-center py-8">
//                       <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-200 border-t-blue-600 mb-3"></div>
//                       <div className="text-sm text-gray-400">Loading...</div>
//                     </div>
//                   ) : history.length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="text-sm text-gray-500">No activity</div>
//                       <div className="text-xs text-gray-400 mt-0.5">
//                         Actions will appear here
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="relative">
//                       {/* Timeline items */}
//                       <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 scrollbar-hide">
//                         <WorkflowTimeline history={history} />
//                       </div>
//                     </div>
//                   )}

//                   {/* Last Updated */}
//                   {history.length > 0 && (
//                     <div className="mt-5 pt-4 border-t border-gray-100">
//                       <div className="text-xs text-gray-500 flex items-center justify-between">
//                         <span>Last activity</span>
//                         <span className="font-medium text-gray-700">
//                           {(() => {
//                             try {
//                               const latestHistory = history[0];
//                               const dateStr = latestHistory?.createdAt;
//                               if (!dateStr) return "Recently";

//                               const date = new Date(dateStr);
//                               if (isNaN(date.getTime())) return "Recently";

//                               return date.toLocaleDateString("en-US", {
//                                 month: "short",
//                                 day: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               });
//                             } catch {
//                               return "Recently";
//                             }
//                           })()}
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Import the actual components instead of redefining them
// // If you need to modify RecordHeader and WorkflowActionBar,
// // do it in their respective files

"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useRecord } from "@/lib/masterRecord/hooks";
import { RecordHeader } from "@/lib/masterRecord/components/RecordHeader";

import { WorkflowTimeline } from "@/lib/workflow/timeline/workflow-timeline";
import { useWorkflowHistory } from "@/lib/workflow/hooks/useWorkflow";

import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";

import { FormRenderer } from "@/components/form-builder/runtime/FormRenderer";
// import { useFormBuilderStore } from "@/components/form-builder/state/useFormBuilderStore";
import { normalizeMasterObjectFromBackend } from "@/components/form-builder/normalizeMasterObject";
import { useRuntimeFormStore } from "@/components/form-builder/runtime/runtimeFormStore";

export default function RecordDetailsPage() {
  const { recordId } = useParams() as { recordId: string };

  /* ================= RECORD ================= */
  const { data: record, isLoading, refetch } = useRecord(recordId);

  /* ================= WORKFLOW ================= */
  const { data: history = [], isLoading: historyLoading } =
    useWorkflowHistory(recordId);

  /* ================= SCHEMA ================= */
  const masterObjectId = record?.masterObjectId;
  const { data: masterObject } = useMasterObjectForRuntime(masterObjectId);
  // const normalized = normalizeMasterObjectFromBackend(masterObject, "RUNTIME");
  const normalized = useMemo(() => {
    if (!masterObject) return null;
    return normalizeMasterObjectFromBackend(masterObject, "RUNTIME");
  }, [masterObject]);

  /* ================= STORE ================= */
  const setValue = useRuntimeFormStore((s) => s.setValue);
  const setFieldConfigs = useRuntimeFormStore((s) => s.setFieldConfigs);
  const reset = useRuntimeFormStore((s) => s.reset);
  useEffect(() => {
    if (!record?.values) return;
    if (!normalized) return;

    reset();
    setFieldConfigs(normalized.fieldConfigs);

    Object.entries(record.values).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [record, normalized, reset, setFieldConfigs, setValue]);

  /* ================= LOADING STATES ================= */
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-pulse text-sm text-gray-400">
          Loading record...
        </div>
      </div>
    );

  if (!record)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-sm text-gray-500">Record not found</div>
      </div>
    );

  if (!masterObject)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-sm text-gray-500">Schema not found</div>
      </div>
    );

  /* ================= NORMALIZE SCHEMA ================= */

  if (!normalized?.schema)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-sm text-gray-500">
          No published schema available
        </div>
      </div>
    );

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <Button
              className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 mt-0.5 shrink-0"
              onClick={() => window.history.back()}
              variant="ghost"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-semibold text-gray-900 truncate">
                      {record.code || "Untitled Record"}
                    </h1>
                    <div className="hidden sm:inline-flex text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
                      ID: {recordId.substring(0, 8)}...
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    View and manage record information
                  </p>
                </div>

                <div className="sm:hidden">
                  <div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
                    ID: {recordId.substring(0, 8)}...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-2">
            {/* Action Bar */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4">
                <RecordHeader record={record} onRefresh={refetch} />
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 space-y-4">
                <FormRenderer
                  schema={normalized.schema}
                  fields={normalized.fieldConfigs}
                  mode="VIEW"
                  initialValues={record?.data}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Workflow */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="mb-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                          Activity Timeline
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Recent actions and updates
                        </p>
                      </div>
                      {history.length > 0 && (
                        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                          {history.length}
                        </span>
                      )}
                    </div>
                  </div>

                  {historyLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-200 border-t-blue-600 mb-3" />
                      <div className="text-sm text-gray-400">Loading...</div>
                    </div>
                  ) : history.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-sm text-gray-500">No activity</div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        Actions will appear here
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 scrollbar-hide">
                      <WorkflowTimeline history={history} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
