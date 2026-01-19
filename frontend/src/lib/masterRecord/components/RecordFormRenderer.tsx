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
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="px-2 py-2 border-b border-slate-100 bg-linar-to-r from-slate-50 to-white flex justify-end">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <ModeBadge />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {publishedSchema ? (
          <div className="space-y-6">
              <FormRuntimePreview
                sections={publishedSchema.layout.sections ?? []}
                        fieldDefinitions={publishedSchema?.fieldDefinitions ?? []}
                initialValues={record.data}
                readOnly
                hideDebug
              /> 
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

//       {/* <pre className="text-xs">
//         {JSON.stringify(record, null, 2)}
//       </pre> */}