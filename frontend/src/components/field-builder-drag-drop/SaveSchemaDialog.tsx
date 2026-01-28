// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useMemo, useState } from "react";

// import {
//   useMasterObjectForRuntime,
//   useUpdateMasterObject,
// } from "@/lib/masterObject/hook";
// import { buildRuntimeSchema } from "./types/buildRuntimeSchema";
// import { buildBackendSchema } from "./types/buildBackendSchema";
// import { FieldDefinition } from "./contracts/field-definition.contract";

// type SaveSchemaDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   masterObjectId: string;
//   schema: {
//     version: number;
//     layout: {
//       sections: any[];
//     };
//      fieldDefinitions?: FieldDefinition[];
//   };
// };

// export function SaveSchemaDialog({
//   open,
//   onClose,
//   masterObjectId,
//   schema,
// }: SaveSchemaDialogProps) {
//   const updateMasterObject = useUpdateMasterObject();
//   const { refetch } = useMasterObjectForRuntime(masterObjectId);

//   const [showJson, setShowJson] = useState(false);

//   /* =====================================================
//      BUILD FINAL PAYLOAD (SINGLE SOURCE OF TRUTH)
//   ===================================================== */

//   const payload = useMemo(() => {
//   if (!schema?.layout?.sections?.length) return null;

//   const runtimeFields = buildRuntimeSchema(
//     schema.layout.sections,
//     // schema.fieldDefinitions ?? [] // ✅ now exists
//   );

//   const fieldConfig = buildBackendSchema(runtimeFields);

//   return {
//     schema: {
//       version: schema.version,
//       layout: {
//         sections: schema.layout.sections,
//       },
//     },
//     fieldConfig,
//   };
// }, [schema]);

//   function handleSave(publish: boolean) {
//     if (!payload) {
//       toast.error("Schema is invalid");
//       return;
//     }

//     updateMasterObject.mutate(
//       {
//         masterObjectId,
//         payload: {
//           ...payload,
//           publish,
//         },
//       },
//       {
//         onSuccess: async () => {
//           toast.success(
//             publish
//               ? "Schema published successfully"
//               : "Schema saved as draft"
//           );
//           await refetch();
//           onClose();
//         },
//         onError: (err: any) => {
//           toast.error(
//             err?.response?.data?.message || "Failed to save schema"
//           );
//         },
//       }
//     );
//   }

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
//         <DialogHeader>
//           <DialogTitle>Save Form Schema</DialogTitle>
//         </DialogHeader>

//         {/* ================= JSON PREVIEW ================= */}
//         {payload && (
//           <div className="border rounded bg-muted/30">
//             <button
//               className="w-full text-left px-3 py-2 text-sm font-medium"
//               onClick={() => setShowJson((v) => !v)}
//             >
//               {showJson ? "▼" : "▶"} Payload sent to backend
//             </button>

//             {showJson && (
//               <pre className="text-xs p-3 overflow-auto max-h-[300px] bg-black text-green-400 rounded-b">
// {JSON.stringify(payload, null, 2)}
//               </pre>
//             )}
//           </div>
//         )}

//         {/* ================= ACTIONS ================= */}
//         <div className="flex justify-end gap-2 pt-4">
//           <Button
//             variant="outline"
//             onClick={onClose}
//             disabled={updateMasterObject.isPending}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="secondary"
//             onClick={() => handleSave(false)}
//             disabled={updateMasterObject.isPending}
//           >
//             Save Draft
//           </Button>

//           <Button
//             onClick={() => handleSave(true)}
//             disabled={updateMasterObject.isPending}
//           >
//             Save & Publish
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useMemo, useState } from "react";

// import {
//   useMasterObjectForRuntime,
//   useUpdateMasterObject,
// } from "@/lib/masterObject/hook";

// import { buildRuntimeSchema } from "./types/buildRuntimeSchema";
// import { buildBackendSchema } from "./types/buildBackendSchema";
// import { FieldDefinition } from "./contracts/field-definition.contract";
// import { usePublishMasterObject } from "@/lib/masterObject/hook/useMasterObject";

// type SaveSchemaDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   masterObjectId: string;
//   schema: {
//     version: number;
//     layout: {
//       sections: any[];
//     };
//     fieldDefinitions?: FieldDefinition[];
//   };
// };

// export function SaveSchemaDialog({
//   open,
//   onClose,
//   masterObjectId,
//   schema,
// }: SaveSchemaDialogProps) {
//   const updateMasterObject = useUpdateMasterObject();
//   const publishMasterObject = usePublishMasterObject();
//   const { refetch } = useMasterObjectForRuntime(masterObjectId);

//   const [showJson, setShowJson] = useState(false);

//   /* =====================================================
//      BUILD FINAL PAYLOAD (SINGLE SOURCE OF TRUTH)
//   ===================================================== */
//   const payload = useMemo(() => {
//     if (!schema?.layout?.sections?.length) return null;

//     const runtimeFields = buildRuntimeSchema(schema.layout.sections);
//     const fieldConfig = buildBackendSchema(runtimeFields);

//     return {
//       schema: {
//         version: schema.version,
//         layout: {
//           sections: schema.layout.sections,
//         },
//       },
//       fieldConfig,
//     };
//   }, [schema]);

//   /* =====================================================
//      ACTIONS
//   ===================================================== */

//   async function handleSaveDraft() {
//     if (!payload) {
//       toast.error("Schema is invalid");
//       return;
//     }

//     updateMasterObject.mutate(
//       {
//         masterObjectId,
//         payload,
//       },
//       {
//         onSuccess: async () => {
//           toast.success("Schema saved as draft");
//           await refetch();
//           onClose();
//         },
//       }
//     );
//   }

//   async function handlePublish() {
//     if (!payload) {
//       toast.error("Schema is invalid");
//       return;
//     }

//     publishMasterObject.mutate(
//       {
//         masterObjectId,
//         schema: payload.schema,
//         fieldConfig: payload.fieldConfig,
//       },
//       {
//         onSuccess: async () => {
//           toast.success("Schema published successfully");
//           await refetch();
//           onClose();
//         },
//       }
//     );
//   }

//   const isPending =
//     updateMasterObject.isPending || publishMasterObject.isPending;

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
//         <DialogHeader>
//           <DialogTitle>Save Form Schema</DialogTitle>
//         </DialogHeader>

//         {/* ================= JSON PREVIEW ================= */}
//         {payload && (
//           <div className="border rounded bg-muted/30">
//             <button
//               className="w-full text-left px-3 py-2 text-sm font-medium"
//               onClick={() => setShowJson((v) => !v)}
//             >
//               {showJson ? "▼" : "▶"} Payload sent to backend
//             </button>

//             {showJson && (
//               <pre className="text-xs p-3 overflow-auto max-h-[300px] bg-black text-green-400 rounded-b">
// {JSON.stringify(payload, null, 2)}
//               </pre>
//             )}
//           </div>
//         )}

//         {/* ================= ACTIONS ================= */}
//         <div className="flex justify-end gap-2 pt-4">
//           <Button
//             variant="outline"
//             onClick={onClose}
//             disabled={isPending}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="secondary"
//             onClick={handleSaveDraft}
//             disabled={isPending}
//           >
//             Save Draft
//           </Button>

//           <Button
//             onClick={handlePublish}
//             disabled={isPending}
//           >
//             Save & Publish
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Code2, ChevronDown, ChevronRight, Save, Globe, X } from "lucide-react";

import {
  useMasterObjectForRuntime,
  useUpdateMasterObject,
} from "@/lib/masterObject/hook";

import { buildRuntimeSchema } from "./types/buildRuntimeSchema";
import { buildBackendSchema } from "./types/buildBackendSchema";
import { FieldDefinition } from "./contracts/field-definition.contract";
import { usePublishMasterObject } from "@/lib/masterObject/hook/useMasterObject";
import { buildBackendLayoutSchema } from "./types/buildBackendLayoutSchema";

type SaveSchemaDialogProps = {
  open: boolean;
  onClose: () => void;
  masterObjectId: string;
  schema: {
    version: number;
    layout: {
      sections: any[];
    };
    fieldDefinitions?: FieldDefinition[];

  };
};

export function SaveSchemaDialog({
  open,
  onClose,
  masterObjectId,
  schema,
}: SaveSchemaDialogProps) {
  const updateMasterObject = useUpdateMasterObject();
  const publishMasterObject = usePublishMasterObject();
  const { refetch } = useMasterObjectForRuntime(masterObjectId);

  const [showJson, setShowJson] = useState(false);

  /* =====================================================
     BUILD FINAL PAYLOAD (SINGLE SOURCE OF TRUTH)
  ===================================================== */
  const payload = useMemo(() => {
    if (!schema?.layout?.sections?.length) return null;
    if (!schema?.layout?.sections?.length) return null;

    const runtimeFields = buildRuntimeSchema(schema.layout.sections);
    const fieldConfig = buildBackendSchema(runtimeFields);

    return {
      schema: {
        version: schema.version,
        layout: {
          sections: buildBackendLayoutSchema(schema.layout.sections), // ✅ REQUIRED
        },
      },
      fieldConfig,
    };
  }, [schema]);

  /* =====================================================
     ACTIONS
  ===================================================== */

  async function handleSaveDraft() {
    if (!payload) {
      toast.error("Schema is invalid");
      return;
    }

    updateMasterObject.mutate(
      {
        masterObjectId,
        payload: {
          schema: payload.schema,
          // fieldConfig: payload.fieldConfig,
        },
      },
      {
        onSuccess: async () => {
          toast.success("Schema saved as draft");
          await refetch();
          onClose();
        },
      },
    );
  }

  // async function handlePublish() {
  //   if (!payload) {
  //     toast.error("Schema is invalid");
  //     return;
  //   }

  //   // publishMasterObject.mutate(
  //   //   {
  //   //     masterObjectId,
  //   //     // schema: payload.schema,
  //   //     // fieldConfig: payload.fieldConfig,
  //   //   },
  //     // {
  //     //   onSuccess: async () => {
  //     //     toast.success("Schema published successfully");
  //     //     await refetch();
  //     //     onClose();
  //     //   },
  //     // },
  //   );
  // }

  const isPending =
    updateMasterObject.isPending || publishMasterObject.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl h-2/3 p-0 overflow-hidden border shadow-xl">
        <DialogHeader className="px-6 pt-6 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Save Schema
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Choose how you want to save your schema changes
          </p>
        </DialogHeader>

        {/* ================= JSON PREVIEW ================= */}
        {payload && (
          <div className="border-y">
            <button
              className="w-full flex items-center justify-between px-6 py-3 text-sm hover:bg-gray-50 transition-colors"
              onClick={() => setShowJson((v) => !v)}
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span className="font-medium">Preview Payload</span>
              </div>
              {showJson ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {showJson && (
              <div className="px-6 pb-4">
                <div className="rounded-lg border bg-gray-950 overflow-hidden">
                  <pre className="text-xs p-4 overflow-auto max-h-48 text-gray-300">
                    {JSON.stringify(payload, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= ACTIONS ================= */}
        <div className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isPending}
              className="h-auto py-3 flex flex-col items-center justify-center gap-2 border hover:border-gray-300 transition-all"
            >
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </div>
              <span className="text-xs text-gray-500 font-normal">
                Save changes privately
              </span>
            </Button>

            <Button
              // onClick={handlePublish}
              disabled={isPending}
              className="h-auto py-3 flex flex-col items-center justify-center gap-2 transition-all"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Save & Publish</span>
              </div>
              <span className="text-xs opacity-90 font-normal">
                Make changes live
              </span>
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
