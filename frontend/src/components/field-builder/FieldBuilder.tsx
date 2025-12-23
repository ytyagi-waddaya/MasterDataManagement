import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DynamicField, FormSection } from "./types/DynamicField";
import { useEffect, useState } from "react";
import { BuilderHeader } from "./BuilderHeader";
import { SectionList } from "./SectionList";
import { FieldEditSheet } from "./FieldEditSheet";
import { FormPreviewTabs } from "./preview/FormPreviewTabs";
import { nanoid } from "nanoid";

export function FieldBuilder({
  initialSections,
  userRoles,
  onSave,
  onPublish,
}: {
  initialSections: FormSection[];
  userRoles: string[];
  onSave: (sections: FormSection[]) => void;
  onPublish: (sections: FormSection[]) => void;
}) {
  const [sections, setSections] = useState<FormSection[]>([]);
  const [selectedField, setSelectedField] =
    useState<DynamicField | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (initialSections.length > 0) {
      setSections(initialSections);
    } else {
      // ✅ Always create one default section
      setSections([
        {
          id: nanoid(),
          title: "Section 1",
          order: 0,
          fields: [],
          collapsed: false,
        },
      ]);
    }
  }, [initialSections]);

  return (
    <div className="space-y-6">
      <BuilderHeader
        onSave={() => onSave(sections)}
        onPublish={() => onPublish(sections)}
        onPreview={() => setPreviewOpen(true)}
      />

      <SectionList
        sections={sections}
        setSections={setSections}
        onEditField={setSelectedField}
      />

      <FieldEditSheet
        field={selectedField}
        userRoles={userRoles}
        onClose={() => setSelectedField(null)}
        onUpdate={(updated) => {
          setSections((prev) =>
            prev.map((s) => ({
              ...s,
              fields: s.fields.map((f) =>
                f.id === updated.id ? updated : f
              ),
            }))
          );
        }}
      />

      {/* 👁 PREVIEW DIALOG */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent
          className="min-w-[90vw] max-w-none max-h-[90vh] overflow-y-auto"
        >
          <FormPreviewTabs sections={sections} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
