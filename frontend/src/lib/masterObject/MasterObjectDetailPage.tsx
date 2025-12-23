"use client";

import { Button } from "@/components/ui/button";
import { Plus, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useMasterObjectForRuntime, useUpdateMasterObject } from "./hook";
import { RuntimeForm } from "@/components/field-builder/form-renderer/RuntimeForm";
import { buildRuntimeFields } from "@/components/field-builder/runtime/buildRuntimeFields";


export default function MasterObjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const { data, isLoading } =
    useMasterObjectForRuntime(params.id);

  const updateMasterObject = useUpdateMasterObject();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const { name, activeSchema, isRunnable } = data;

  const runtimeFields = buildRuntimeFields(
    activeSchema?.layout ?? []
  );

  function handlePublish() {
    updateMasterObject.mutate(
      {
        masterObjectId: params.id,
        payload: { publish: true },
      },
      {
        onSuccess: () => toast.success("Schema published"),
        onError: () => toast.error("Publish failed"),
      }
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="rounded-lg border bg-white p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">{name}</h3>

          {!isRunnable && (
            <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
              Draft
            </span>
          )}

          <div className="ml-auto flex gap-2">
            {!isRunnable && (
              <Button onClick={handlePublish}>
                <UploadCloud size={16} />
                Publish
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() =>
                router.push(`/create-master-object/${params.id}`)
              }
            >
              <Plus size={16} />
              Edit Fields
            </Button>
          </div>
        </div>

        {/* Runtime Read-only Form */}
        {activeSchema?.layout ? (
          <RuntimeForm
            fields={runtimeFields}
            values={{}}          // empty values for preview
            onChange={() => {}}
            readOnly
          />
        ) : (
          <div className="text-sm text-muted-foreground">
            No published schema available.
          </div>
        )}
      </div>
    </div>
  );
}
