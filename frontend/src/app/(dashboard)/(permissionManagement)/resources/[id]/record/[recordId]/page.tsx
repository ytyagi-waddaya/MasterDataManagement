"use client";

import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecord } from "@/lib/masterRecord/hooks";
import { RecordHeader } from "@/lib/masterRecord/components/RecordHeader";
import { RecordFormRenderer } from "@/lib/masterRecord/components/RecordFormRenderer";
import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
// import { WorkflowTimeline } from "@/lib/masterRecord/components/WorkflowTimeline";

export default function RecordDetailsPage() {
  const { recordId } = useParams() as { recordId: string };
  const { data: record, isLoading, refetch } = useRecord(recordId);

  if (isLoading || !record) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button
          className="h-8 w-8"
          onClick={() => window.history.back()}
          variant="outline"
        >
          <ChevronLeft />
        </Button>

        <RecordHeader record={record} onRefresh={refetch} />
      </div>

      {/* Record Form */}
      <RecordFormRenderer record={record} />
      {/* <FormRuntimePreview sections={sections} /> */}

      {/* Workflow Timeline */}
      {/* {record.workflowInstanceId && (
        <WorkflowTimeline instanceId={record.workflowInstanceId} />
      )} */}
    </div>
  );
}

//         <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
//           {JSON.stringify(recordData, null, 2)}
//         </pre>
