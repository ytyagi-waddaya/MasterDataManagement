// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Copy, Plus, UploadCloud } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { useMasterObjectForRuntime } from "./hook";
// import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
// import {
//   useDuplicateMasterObject,
//   useSubmitMasterObjectRecord,
// } from "./hook/useMasterObject";
// import { SaveSchemaDialog } from "@/components/field-builder-drag-drop/SaveSchemaDialog";

// export default function MasterObjectDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const router = useRouter();

//   const { data, isLoading } = useMasterObjectForRuntime(params.id);
//   const submitRecord = useSubmitMasterObjectRecord();
//   const duplicateSchema = useDuplicateMasterObject();

//   const [openPublishDialog, setOpenPublishDialog] = useState(false);

//   if (isLoading) return <div>Loading...</div>;
//   if (!data) return <div>Not found</div>;

//   const { name, activeSchema, isRunnable } = data;

//   /* ================= SUBMIT RECORD ================= */
//   function handleSubmit(values: Record<string, any>) {
//     submitRecord.mutate(
//       {
//         masterObjectId: params.id,
//         values,
//       },
//       {
//         onSuccess: () => toast.success("Record saved"),
//         onError: () => toast.error("Save failed"),
//       }
//     );
//   }

//   async function handleDuplicate() {
//     duplicateSchema.mutate(params.id, {
//       onSuccess: () => {
//         toast.success("Schema duplicated as draft");
//         router.push(`/create-master-object/${params.id}`);
//       },
//       onError: () => {
//         toast.error("Failed to duplicate schema");
//       },
//     });
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="rounded-lg border bg-white p-6 space-y-6">
//         {/* ================= HEADER ================= */}
//         <div className="flex items-center gap-3">
//           <h3 className="text-lg font-semibold">{name}</h3>

//           {/* STATUS BADGE */}
//           {isRunnable ? (
//             <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
//               Published
//             </span>
//           ) : (
//             <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
//               Draft
//             </span>
//           )}

//           {/* ACTIONS */}
//           <div className="ml-auto flex gap-2">
//             {/* ✅ Published → Duplicate */}
//             {isRunnable && (
//               <Button
//                 variant="outline"
//                 onClick={handleDuplicate}
//                 disabled={duplicateSchema.isPending}
//               >
//                 <Copy size={16} />
//                 Duplicate
//               </Button>
//             )}

//             {/* 🔒 Draft-only actions */}
//             {!isRunnable && (
//               <>
//                 <Button onClick={() => setOpenPublishDialog(true)}>
//                   <UploadCloud size={16} />
//                   Publish
//                 </Button>

//                 <Button
//                   variant="outline"
//                   onClick={() =>
//                     router.push(`/create-master-object/${params.id}`)
//                   }
//                 >
//                   <Plus size={16} />
//                   Edit Fields
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* ================= FORM ================= */}
//         {activeSchema ? (
//           <FormRuntimePreview
//             sections={activeSchema.layout?.sections ?? []}
//             onSubmit={handleSubmit}
//           />
//         ) : (
//           <div className="text-sm text-muted-foreground">
//             No schema available.
//           </div>
//         )}
//       </div>

//       {/* ================= SAVE & PUBLISH DIALOG ================= */}
//       {!isRunnable && activeSchema && (
//         <SaveSchemaDialog
//           open={openPublishDialog}
//           onClose={() => setOpenPublishDialog(false)}
//           masterObjectId={params.id}
//           schema={activeSchema}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Copy,
  Plus,
  UploadCloud,
  ArrowLeft,
  Loader2,
  ChevronLeft,
} from "lucide-react";

import { useMasterObjectForRuntime } from "./hook";
import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
import {
  useDuplicateMasterObject,
  useSubmitMasterObjectRecord,
} from "./hook/useMasterObject";
import { SaveSchemaDialog } from "@/components/field-builder-drag-drop/SaveSchemaDialog";
import { Button } from "@/components/ui/button";

export default function MasterObjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const { data, isLoading } = useMasterObjectForRuntime(params.id);
  const submitRecord = useSubmitMasterObjectRecord();
  const duplicateSchema = useDuplicateMasterObject();

  const [openPublishDialog, setOpenPublishDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          <p className="text-sm text-gray-500">Loading master object...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 flex items-center justify-center">
          <div className="h-6 w-6 rounded border border-gray-300 dark:border-gray-700" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {data?.name}
        </p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Go back
        </button>
      </div>
    );
  }

  const { name, activeSchema, isRunnable } = data;

  /* ================= SUBMIT RECORD ================= */
  function handleSubmit(values: Record<string, any>) {
    submitRecord.mutate(
      {
        masterObjectId: params.id,
        values,
      },
      {
        onSuccess: () => toast.success("Record saved successfully"),
        onError: () => toast.error("Failed to save record"),
      }
    );
  }

  async function handleDuplicate() {
    duplicateSchema.mutate(params.id, {
      onSuccess: () => {
        toast.success("Schema duplicated as draft");
        router.push(`/create-master-object/${params.id}`);
      },
      onError: () => {
        toast.error("Failed to duplicate schema");
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6 space-y-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                className="h-8 w-8"
                onClick={() => window.history.back()}
                variant="outline"
              >
                <ChevronLeft />
              </Button>

              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {name}
              </h1>
              {isRunnable ? (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Published
                </span>
              ) : (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                  Draft
                </span>
              )}
              {activeSchema && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {/* • {activeSchema.layout?.sections?.length || 0} sections */}
                </span>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-2">
            {/* Published → Duplicate */}
            {isRunnable && (
              <button
                onClick={handleDuplicate}
                disabled={duplicateSchema.isPending}
                className="
                  flex items-center gap-2 px-3 py-2 text-sm rounded-lg border
                  border-gray-300 dark:border-gray-700
                  hover:border-gray-400 dark:hover:border-gray-600
                  hover:bg-gray-50 dark:hover:bg-gray-800/50
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {duplicateSchema.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>Duplicate</span>
              </button>
            )}

            {/* Draft-only actions */}
            {!isRunnable && (
              <>
                <button
                  onClick={() => setOpenPublishDialog(true)}
                  className="
                    flex items-center gap-2 px-3 py-2 text-sm rounded-lg
                    bg-blue-600 text-white hover:bg-blue-700
                    transition-colors
                  "
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>Publish</span>
                </button>

                <button
                  onClick={() =>
                    router.push(`/create-master-object/${params.id}`)
                  }
                  className="
                    flex items-center gap-2 px-3 py-2 text-sm rounded-lg border
                    border-gray-300 dark:border-gray-700
                    hover:border-gray-400 dark:hover:border-gray-600
                    hover:bg-gray-50 dark:hover:bg-gray-800/50
                    transition-colors
                  "
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Edit Fields</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div>
          {activeSchema ? (
            <FormRuntimePreview
              sections={activeSchema.layout?.sections ?? []}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 flex items-center justify-center">
                <div className="h-8 w-8 rounded border border-gray-300 dark:border-gray-700" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                No schema available
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 max-w-md">
                Create a form schema to start collecting data
              </p>
              {!isRunnable && (
                <button
                  onClick={() =>
                    router.push(`/create-master-object/${params.id}`)
                  }
                  className="mt-4 flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create Schema
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= SAVE & PUBLISH DIALOG ================= */}
      {!isRunnable && activeSchema && (
        <SaveSchemaDialog
          open={openPublishDialog}
          onClose={() => setOpenPublishDialog(false)}
          masterObjectId={params.id}
          schema={activeSchema}
        />
      )}
    </div>
  );
}
