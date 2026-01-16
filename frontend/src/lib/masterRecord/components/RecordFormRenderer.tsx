// import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
// import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";
// import { useMemo } from "react";
// export function RecordFormRenderer({ record }: { record: any }) {
//   const mode = ["DRAFT", "CORRECTION"].includes(record.currentStage?.category)
//     ? "EDIT"
//     : "VIEW";

//     const { data: runtimeObject } = useMasterObjectForRuntime(
//     record.masterObjectId
//   );
//   const publishedSchema = useMemo(() => {
//     if (!runtimeObject?.schemas) return null;
//     return (
//       runtimeObject.schemas.find((s: any) => s.status === "PUBLISHED") ?? null
//     );
//   }, [runtimeObject]);  

//   return (
//     <div className="border rounded p-4">
//       <pre className="text-xs bg-muted p-2 rounded">
//         Mode: {mode}
//       </pre>
//        <FormRuntimePreview
//         // sections={schema.sections}
//         sections={publishedSchema?.layout.sections ?? []}
//         initialValues={record.data}
//         readOnly
//         hideDebug
//       />
       
//       {/* Replace with your dynamic form renderer */}
//       {/* <pre className="text-xs">
//         {JSON.stringify(record, null, 2)}
//       </pre> */}
     
//     </div>
//   );
// }

import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";
import { useMemo } from "react";
import { BadgeCheck, BadgeX, Eye, Edit2 } from "lucide-react";

export function RecordFormRenderer({ record }: { record: any }) {
  const mode = ["DRAFT", "CORRECTION"].includes(record.currentStage?.category)
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

  const ModeBadge = () => {
    const isEditMode = mode === "EDIT";
    return (
      <div className="flex items-center gap-2">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${isEditMode ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>
          {isEditMode ? (
            <>
              <Edit2 className="w-3.5 h-3.5" />
              Edit Mode
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              View Mode
            </>
          )}
        </div>
        
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${publishedSchema ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {publishedSchema ? (
            <>
              <BadgeCheck className="w-3.5 h-3.5" />
              Schema Published
            </>
          ) : (
            <>
              <BadgeX className="w-3.5 h-3.5" />
              No Schema
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-linar-to-r from-slate-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Record Form</h3>
            <p className="text-sm text-slate-500 mt-1">
              {record.masterObjectId ? `Master Object: ${record.masterObjectId}` : 'No master object selected'}
            </p>
          </div>
          <ModeBadge />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {publishedSchema ? (
          <div className="space-y-6">
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <div className="text-sm text-slate-600 mb-3 font-medium">
                Form Preview
              </div>
              <FormRuntimePreview
                sections={publishedSchema.layout.sections ?? []}
                initialValues={record.data}
                readOnly
                hideDebug
              />
            </div>
            

          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <BadgeX className="w-6 h-6 text-slate-400" />
            </div>
            <h4 className="text-lg font-medium text-slate-700 mb-2">No Published Schema</h4>
            <p className="text-slate-500 max-w-md mx-auto">
              This record doesn't have a published schema available. Please check the master object configuration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}