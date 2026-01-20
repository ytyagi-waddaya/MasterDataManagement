"use client";

import { useParams } from "next/navigation";
import { useMasterObjectForEditor } from "@/lib/masterObject/hook";
import { FormBuilder } from "@/components/field-builder-drag-drop/FormBuilder";

export default function CreateMasterObjectPage() {
  const params = useParams<{ id: string }>();
  const masterObjectId = params.id;

  const { data, isLoading } = useMasterObjectForEditor(masterObjectId);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Master object not found</div>;

  const draftSchema = data.schemas?.find((s: any) => s.status === "DRAFT");

  const publishedSchema = data.schemas?.find(
    (s: any) => s.status === "PUBLISHED"
  );

  const activeSchema = draftSchema ?? publishedSchema ?? null;

  return (
    <div className="p-4 space-y-6">
      {/* ✅ Form Builder hydrated from backend */}
      {/* <FormBuilder
        masterObjectId={masterObjectId}
        initialSchema={activeSchema?.layout ?? null}
      /> */}
      <FormBuilder
        masterObjectId={masterObjectId}
        initialSchema={{
          version: data.activeSchema?.version ?? 1,
          layout: data.activeSchema?.layout ?? [],
          fieldDefinitions: data.activeSchema?.fieldDefinitions ?? [],
        }}
        isPublished={data.isRunnable}
      />
    </div>
  );
}
