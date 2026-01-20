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

import {
  useMasterObjectForRuntime,
  useUpdateMasterObject,
} from "@/lib/masterObject/hook";
import { buildRuntimeSchema } from "./types/buildRuntimeSchema";
import { buildBackendSchema } from "./types/buildBackendSchema";
import { FieldDefinition } from "./contracts/field-definition.contract";

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
  const { refetch } = useMasterObjectForRuntime(masterObjectId);

  const [showJson, setShowJson] = useState(false);

  /* =====================================================
     BUILD FINAL PAYLOAD (SINGLE SOURCE OF TRUTH)
  ===================================================== */

  const payload = useMemo(() => {
  if (!schema?.layout?.sections?.length) return null;

  const runtimeFields = buildRuntimeSchema(
    schema.layout.sections,
    // schema.fieldDefinitions ?? [] // ✅ now exists
  );

  const fieldConfig = buildBackendSchema(runtimeFields);

  return {
    schema: {
      version: schema.version,
      layout: {
        sections: schema.layout.sections,
      },
    },
    fieldConfig,
  };
}, [schema]);

  function handleSave(publish: boolean) {
    if (!payload) {
      toast.error("Schema is invalid");
      return;
    }

    updateMasterObject.mutate(
      {
        masterObjectId,
        payload: {
          ...payload,
          publish,
        },
      },
      {
        onSuccess: async () => {
          toast.success(
            publish
              ? "Schema published successfully"
              : "Schema saved as draft"
          );
          await refetch();
          onClose();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to save schema"
          );
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Save Form Schema</DialogTitle>
        </DialogHeader>

        {/* ================= JSON PREVIEW ================= */}
        {payload && (
          <div className="border rounded bg-muted/30">
            <button
              className="w-full text-left px-3 py-2 text-sm font-medium"
              onClick={() => setShowJson((v) => !v)}
            >
              {showJson ? "▼" : "▶"} Payload sent to backend
            </button>

            {showJson && (
              <pre className="text-xs p-3 overflow-auto max-h-[300px] bg-black text-green-400 rounded-b">
{JSON.stringify(payload, null, 2)}
              </pre>
            )}
          </div>
        )}

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={updateMasterObject.isPending}
          >
            Cancel
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleSave(false)}
            disabled={updateMasterObject.isPending}
          >
            Save Draft
          </Button>

          <Button
            onClick={() => handleSave(true)}
            disabled={updateMasterObject.isPending}
          >
            Save & Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
