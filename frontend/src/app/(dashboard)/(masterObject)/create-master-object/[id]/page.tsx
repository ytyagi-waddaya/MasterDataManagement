"use client";

import { use, useState, useEffect } from "react";
import { FieldBuilder } from "@/components/field-builder/FieldBuilder";
import { FormPreview } from "@/components/field-builder/FormPreview";
import type { FormSection } from "@/components/field-builder/types/DynamicField";
import {
  useUpdateMasterObject,
  useMasterObject,
} from "@/lib/masterObject/hook";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function CreateMasterObjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: masterObjectId } = use(params);

  const { data: masterObjectData, isLoading } = useMasterObject(masterObjectId);
  const updateMasterObject = useUpdateMasterObject();

  const [sections, setSections] = useState<FormSection[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  // 🚀 Normalize backend fields (handles Prisma { set: [] })
  useEffect(() => {
    if (masterObjectData?.fields) {
      const raw = masterObjectData.fields as any;
      const normalized = Array.isArray(raw.set) ? raw.set : raw;
      setSections(normalized as FormSection[]);
    }
  }, [masterObjectData]);

  function handleSave(s: FormSection[]) {
    setSections(s);

    updateMasterObject.mutate({
      masterObjectId,
      payload: { fields: s },
    });
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button
          className="h-8 w-8"
          onClick={() => window.history.back()}
          variant="outline"
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-semibold">Edit Master Object Fields</h1>
      </div>

      {!previewMode ? (
        <FieldBuilder
          initialSections={sections}
          onSave={handleSave}
          onPreview={(s) => {
            setSections(s);
            setPreviewMode(true);
          }}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Live Preview</h2>
            <button
              onClick={() => setPreviewMode(false)}
              className="px-4 py-2 border rounded bg-white"
            >
              Back to Builder
            </button>
          </div>

          <FormPreview sections={sections} />
        </>
      )}
    </div>
  );
}
