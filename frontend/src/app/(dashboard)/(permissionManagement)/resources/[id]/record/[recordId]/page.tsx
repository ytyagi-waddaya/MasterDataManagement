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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Printer, FileText, Layout, ChevronLeft } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useRecord } from "@/lib/masterRecord/hooks";
import { RecordHeader } from "@/lib/masterRecord/components/RecordHeader";

import { WorkflowTimeline } from "@/lib/workflow/timeline/workflow-timeline";
import { useWorkflowHistory } from "@/lib/workflow/hooks/useWorkflow";

import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";

import { FormRenderer } from "@/components/form-builder/runtime/FormRenderer";
import { normalizeMasterObjectFromBackend } from "@/components/form-builder/normalizeMasterObject";
import { useRuntimeFormStore } from "@/components/form-builder/runtime/runtimeFormStore";

import SmartFormDesigner from "@/components/smart-form/SmartFormDesigner";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ================= PRINT PDF ================= */

function handlePrint(record: any, normalized: any) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Vendor Onboarding Record", 14, 15);

  doc.setFontSize(10);
  doc.text(`Record Code: ${record.code}`, 14, 22);
  doc.text(
    `Created At: ${new Date(record.createdAt).toLocaleDateString()}`,
    14,
    28,
  );

  const rows: any[] = [];

  normalized.fieldConfigs.forEach((field: any) => {
    const key = field.meta.key;
    const label = field.meta.label;
    const value = record.data?.[key] ?? "-";
    rows.push([label, String(value)]);
  });

  autoTable(doc, {
    startY: 35,
    head: [["Field", "Value"]],
    body: rows,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [240, 240, 240] },
  });

  doc.save(`${record.code}.pdf`);
}

/* ================= PAGE ================= */

export default function RecordDetailsPage() {
  const { recordId } = useParams() as { recordId: string };

  const [pageMode, setPageMode] = useState<"VIEW" | "SMART_FORM">("VIEW");

  /* ================= RECORD ================= */
  const { data: record, isLoading, refetch } = useRecord(recordId);
  console.log("RecordDetailsPage record:", record);
  /* ================= WORKFLOW ================= */
  const { data: history = [], isLoading: historyLoading } =
    useWorkflowHistory(recordId);

  /* ================= SCHEMA ================= */
  const masterObjectId = record?.masterObjectId;
  const { data: masterObject } = useMasterObjectForRuntime(masterObjectId);

  const normalized = useMemo(() => {
    if (!masterObject) return null;
    return normalizeMasterObjectFromBackend(masterObject, "RUNTIME");
  }, [masterObject]);

  /* ================= STORE ================= */
  const setValue = useRuntimeFormStore((s) => s.setValue);
  const setFieldConfigs = useRuntimeFormStore((s) => s.setFieldConfigs);
  const reset = useRuntimeFormStore((s) => s.reset);

  useEffect(() => {
    if (!record?.data || !normalized) return;

    reset();
    setFieldConfigs(normalized.fieldConfigs);

    Object.entries(record.data).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [record, normalized, reset, setFieldConfigs, setValue]);

  /* ================= LOADING STATES ================= */

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-pulse text-sm text-gray-400">
          Loading record...
        </div>
      </div>
    );

  if (!record)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-sm text-gray-500">Record not found</div>
      </div>
    );

  if (!masterObject || !normalized?.schema)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-sm text-gray-500">Schema not found</div>
      </div>
    );

  /* ================= RENDER ================= */

  // conditional grid class: full-width for SMART_FORM, 3/1 split for VIEW
  const gridClass =
    pageMode === "SMART_FORM"
      ? "grid grid-cols-1 gap-5"
      : "grid grid-cols-1 lg:grid-cols-4 gap-5";

  const leftColumnClass =
    pageMode === "SMART_FORM" ? "col-span-1 space-y-2" : "lg:col-span-3 space-y-2";

  const smartFormWrapperClass =
    pageMode === "SMART_FORM"
      ? "bg-white border rounded-lg p-0 min-h-[calc(100vh-160px)] overflow-auto"
      : "bg-white border rounded-lg p-4";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <Button
            className="h-8 w-8 p-0"
            variant="ghost"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              {record.code || "Untitled Record"}
            </h1>
            <p className="text-sm text-gray-500">
              View and manage record information
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className={gridClass}>
          {/* LEFT */}
          <div className={leftColumnClass}>
            {/* Action Bar */}
            <div className="bg-white border rounded-lg p-4 flex justify-between items-center">
              <RecordHeader record={record} onRefresh={refetch} />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem
                    onClick={() => handlePrint(record, normalized)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setPageMode("SMART_FORM")}
                  >
                    <Layout className="h-4 w-4 mr-2" />
                    Smart Form (Design)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* FORM / SMART FORM */}
            <div className={smartFormWrapperClass}>
              {pageMode === "VIEW" ? (
                <div className="p-4">
                  <FormRenderer
                    schema={normalized.schema}
                    fields={normalized.fieldConfigs}
                    mode="VIEW"
                    initialValues={record.data}
                  />
                </div>
              ) : (
                // SMART_FORM mode: make designer full height & pass onBack to restore view
                <div className="h-[calc(100vh-220px)]">
                  <SmartFormDesigner
                    masterObject={masterObject}
                    record={record}
                    onBack={() => setPageMode("VIEW")}
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT - Activity Timeline: render only in VIEW mode */}
          {pageMode === "VIEW" && (
            <div className="lg:col-span-1">
              <div className="sticky top-4 bg-white border rounded-lg p-5">
                <h3 className="text-sm font-medium uppercase text-gray-700 mb-1">
                  Activity Timeline
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Recent actions and updates
                </p>

                {historyLoading ? (
                  <div className="text-sm text-gray-400">Loading...</div>
                ) : history.length === 0 ? (
                  <div className="text-sm text-gray-400">No activity</div>
                ) : (
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                    <WorkflowTimeline history={history} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
