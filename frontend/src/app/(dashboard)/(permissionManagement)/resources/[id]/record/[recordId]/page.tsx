// "use client";

// import { useParams } from "next/navigation";
// import { ChevronLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRecord } from "@/lib/masterRecord/hooks";
// import { RecordHeader } from "@/lib/masterRecord/components/RecordHeader";
// import { RecordFormRenderer } from "@/lib/masterRecord/components/RecordFormRenderer";
// import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
// import { WorkflowTimeline } from "@/lib/workflow/timeline/workflow-timeline";

// export default function RecordDetailsPage() {
//   const { recordId } = useParams() as { recordId: string };
//   const { data: record, isLoading, refetch } = useRecord(recordId);

//  if (isLoading) return <div>Loading...</div>;
// if (!record) return <div>Record not found</div>;


//   return (
//     <div className="flex flex-col gap-4 p-4">
//       {/* Header */}
//       <div className="flex items-center gap-2">
//         <Button
//           className="h-8 w-8"
//           onClick={() => window.history.back()}
//           variant="outline"
//         >
//           <ChevronLeft />
//         </Button>

//         <RecordHeader record={record} onRefresh={refetch} />
//       </div>

//       {/* Record Form */}
//       <RecordFormRenderer record={record} />

//       <WorkflowTimeline history={yourData.data.history} />
  
//     </div>
//   );
// }

//     {/* <FormRuntimePreview sections={sections} /> */}

//       {/* Workflow Timeline */}
//       {/* {record.workflowInstanceId && (
//         <WorkflowTimeline instanceId={record.workflowInstanceId} />
//       )} */}

// //         <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
// //           {JSON.stringify(recordData, null, 2)}
// //         </pre>


// "use client";

// import { useParams } from "next/navigation";
// import { ChevronLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRecord } from "@/lib/masterRecord/hooks";
// import { RecordHeader } from "@/lib/masterRecord/components/RecordHeader";
// import { RecordFormRenderer } from "@/lib/masterRecord/components/RecordFormRenderer";
// import { WorkflowTimeline } from "@/lib/workflow/timeline/workflow-timeline";
// import { useWorkflowHistory } from "@/lib/workflow/hooks/useWorkflow";

// export default function RecordDetailsPage() {
//   const { recordId } = useParams() as { recordId: string };

//   const { data: record, isLoading, refetch } = useRecord(recordId);

//   // 🔹 fetch workflow history for this record
//   const {
//     data: history = [],
//     isLoading: historyLoading,
//   } = useWorkflowHistory(recordId);
  

//   if (isLoading) return <div>Loading...</div>;
//   if (!record) return <div>Record not found</div>;

//   return (
//     <div className="flex flex-col gap-4 p-4">
//       {/* Header */}
//       <div className="flex items-center gap-2">
//         <Button
//           className="h-8 w-8"
//           onClick={() => window.history.back()}
//           variant="outline"
//         >
//           <ChevronLeft />
//         </Button>

//         <RecordHeader record={record} onRefresh={refetch} />
//       </div>

//       {/* Record Form */}
//       <RecordFormRenderer record={record} />

//       {/* Workflow Timeline */}
//       {historyLoading ? (
//         <div className="text-sm text-gray-500">Loading workflow history…</div>
//       ) : (
//         <WorkflowTimeline history={history} />
//       )}
//     </div>
//   );
// }
"use client";

import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecord } from "@/lib/masterRecord/hooks";
import { RecordHeader } from "@/lib/masterRecord/components/RecordHeader";
import { RecordFormRenderer } from "@/lib/masterRecord/components/RecordFormRenderer";
import { WorkflowTimeline } from "@/lib/workflow/timeline/workflow-timeline";
import { useWorkflowHistory } from "@/lib/workflow/hooks/useWorkflow";

export default function RecordDetailsPage() {
  const { recordId } = useParams() as { recordId: string };

  const { data: record, isLoading, refetch } = useRecord(recordId);

  const {
    data: history = [],
    isLoading: historyLoading,
  } = useWorkflowHistory(recordId);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-sm text-gray-400">Loading...</div>
    </div>
  );
  
  if (!record) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-sm text-gray-500">Record not found</div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Minimal Navigation */}
        <div className="mb-6">
          <Button
            className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
            onClick={() => window.history.back()}
            variant="ghost"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Header - Reduced visual weight */}
          <div className="border-b pb-4">
            <RecordHeader record={record} onRefresh={refetch} />
          </div>

          {/* Form Section - Clean and flat */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-700">Record Details</div>
            <RecordFormRenderer record={record} />
          </div>

          {/* Workflow Section - Minimal divider */}
          <div className="pt-6 border-t">
            <div className="text-sm font-medium text-gray-700 mb-4">Workflow History</div>
            
            {historyLoading ? (
              <div className="py-8 text-center">
                <div className="text-sm text-gray-400">Loading...</div>
              </div>
            ) : (
              <WorkflowTimeline history={history} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}