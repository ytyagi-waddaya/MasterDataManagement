import { useFormBuilderStore } from "../state/useFormBuilderStore";
import { SectionRenderer } from "./SectionRenderer";
import { PersistedFormSchema } from "@/lib/masterObject/schema/masterObject.schema";

type Section =
  PersistedFormSchema["layout"]["sections"][number];

export function FormCanvas() {
  const sections = useFormBuilderStore(
    (s) => s.schema.layout.sections,
  );

  if (!sections || sections.length === 0) {
    return (
      <div className="rounded border border-dashed p-6 text-center text-sm text-gray-400">
        No sections yet. Click “Add Section” to start building.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section: Section) => (
        <SectionRenderer
          key={section.id}
          section={section}
        />
      ))}
    </div>
  );
}
