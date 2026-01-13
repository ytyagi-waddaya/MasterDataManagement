import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";
import { useMemo } from "react";
export function RecordFormRenderer({ record }: { record: any }) {
  const mode =
    ["DRAFT", "CORRECTION"].includes(record.currentStage?.category)
      ? "EDIT"
      : "VIEW";

    const { data: runtimeObject } = useMasterObjectForRuntime(
    record.masterObjectId
  );
  const publishedSchema = useMemo(() => {
    if (!runtimeObject?.schemas) return null;
    return (
      runtimeObject.schemas.find((s: any) => s.status === "PUBLISHED") ?? null
    );
  }, [runtimeObject]);  

  return (
    <div className="border rounded p-4">
      <pre className="text-xs bg-muted p-2 rounded">
        Mode: {mode}
      </pre>
       <FormRuntimePreview
        // sections={schema.sections}
        sections={publishedSchema?.layout.sections ?? []}
        initialValues={record.data}
        readOnly
        hideDebug
      />
       
      {/* Replace with your dynamic form renderer */}
      <pre className="text-xs">
        {JSON.stringify(record, null, 2)}
      </pre>
     
    </div>
  );
}



// import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
// import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";
// import { useMemo, useState } from "react";
// import { useCreateRecord } from "../hooks";
// import { useResource } from "@/lib/resource/hook/useResource";
// export function RecordFormRenderer({ record }: { record: any }) {
//   const mode =
//     ["DRAFT", "CORRECTION"].includes(record.currentStage?.category)
//       ? "EDIT"
//       : "VIEW";
//   const isDraft = record?.currentStage?.code === "DRAFT";
//   const createRecord = useCreateRecord();

//   const [formData, setFormData] = useState<Record<string, any>>({});
//   const { data: resourceData, isLoading: loadingResource } =
//     useResource(record?.masterObject?.resource?.id);

//   const masterObject = resourceData?.masterObject ?? null;
//   const { data: runtimeObject } = useMasterObjectForRuntime(
//     record.masterObjectId
//   );
//   const publishedSchema = useMemo(() => {
//     if (!runtimeObject?.schemas) return null;
//     return (
//       runtimeObject.schemas.find((s: any) => s.status === "PUBLISHED") ?? null
//     );
//   }, [runtimeObject]);
//   const handleSubmit = (values: Record<string, any>, close: () => void) => {
//     if (!masterObject?.id) return;

//     createRecord.mutate(
//       { masterObjectId: masterObject.id, data: values },
//       {
//         onSuccess: () => {
//           setFormData({});
//           close();
//         },
//       }
//     );
//   };
//   return (
//     <div className="border rounded p-4">
//       <pre className="text-xs bg-muted p-2 rounded">
//         Mode: {mode}
//       </pre>
//       {isDraft ? (
//         <FormRuntimePreview
//           sections={publishedSchema?.layout.sections ?? []}
//           hideDebug
//           onSubmit={(values) => {
//             handleSubmit(values, close); // ✅ form submits directly
//           }}
//         />
//       ) : (
//         <FormRuntimePreview
//           sections={publishedSchema?.layout.sections ?? []}
//           initialValues={record.data}
//           readOnly
//           hideDebug
//         />
//       )}
//       {/* Replace with your dynamic form renderer */}
//       <pre className="text-xs">
//         {JSON.stringify(record, null, 2)}
//       </pre>
//     </div>
//   );
// }
