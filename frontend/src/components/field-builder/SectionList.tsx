import { Button } from "@/components/ui/button";
import type { FormSection, DynamicField } from "./types/DynamicField";
import { nanoid } from "nanoid";
import { SectionCard } from "./SectionCard";

export function SectionList({
  sections,
  setSections,
  onEditField,
}: {
  sections: FormSection[];
  setSections: (s: FormSection[]) => void;
  onEditField: (f: DynamicField) => void;
}) {
  function addSection() {
    setSections([
      ...sections,
      {
        id: nanoid(),
        title: "New Section",
        order: sections.length,
        fields: [],
      },
    ]);
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          sections={sections}
          setSections={setSections}
          onEditField={onEditField}
        />
      ))}

      <Button variant="outline" onClick={addSection}>
        + Add Section
      </Button>
    </div>
  );
}
