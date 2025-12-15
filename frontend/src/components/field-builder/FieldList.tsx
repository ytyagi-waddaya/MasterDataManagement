// components/fieldBuilder/FieldList.tsx
"use client";

import { Button } from "@/components/ui/button";
import { DynamicField, FormSection } from "./types/DynamicField";

export default function FieldList({
  section,
  onSelectField,
  onDeleteField,
  onMoveFieldUp,
  onMoveFieldDown,
  onMoveFieldToSection,
  onToggleCollapse,
}: {
  section: FormSection;
  onSelectField: (f: DynamicField) => void;
  onDeleteField: (id: string) => void;
  onMoveFieldUp: (id: string) => void;
  onMoveFieldDown: (id: string) => void;
  onMoveFieldToSection: (fieldId: string, targetSectionId: string) => void;
  onToggleCollapse: (sectionId: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{section.title}</h3>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => onToggleCollapse(section.id)}>
            {section.collapsed ? "▸" : "▾"}
          </Button>
        </div>
      </div>

      {!section.collapsed && (
        <div className="space-y-2">
          {section.fields.map((f, idx) => (
            <div
              key={f.id}
              className="p-3 border rounded-md bg-white flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{f.label}</div>
                <div className="text-sm text-gray-500">
                  {f.type} · {f.layout ?? "full"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" onClick={() => onMoveFieldUp(f.id)} disabled={idx === 0}>
                  ↑
                </Button>
                <Button
                  size="icon"
                  onClick={() => onMoveFieldDown(f.id)}
                  disabled={idx === section.fields.length - 1}
                >
                  ↓
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onSelectField(f)}
                >
                  Edit
                </Button>

                <Button size="icon" variant="destructive" onClick={() => onDeleteField(f.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
