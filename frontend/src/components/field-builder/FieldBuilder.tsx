"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { DynamicField, FieldType, FormSection } from "./types/DynamicField";
import { AddSectionButton } from "./AddSectionButton";
import { AddFieldButton } from "./AddFieldButton";
import { FieldEditor } from "./FieldEditor";
import { sortSections } from "./utils";
import { Button } from "@/components/ui/button";

export function FieldBuilder({
  initialSections = [],
  onSave,
  onPreview,
}: {
  initialSections?: FormSection[];
  onSave: (sections: FormSection[]) => void;
  onPreview: (sections: FormSection[]) => void;
}) {
  const [sections, setSections] = useState<FormSection[]>(
    initialSections.length
      ? sortSections(initialSections)
      : [
          {
            id: crypto.randomUUID(),
            title: "Default",
            order: 1,
            fields: [],
            collapsed: false,
          },
        ]
  );

  useEffect(() => {
    if (initialSections.length) {
      setSections(sortSections(initialSections));
    }
  }, [initialSections]);

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const allFields = sections.flatMap((s) => s.fields);

  // -----------------------------------------------------
  // SECTION CRUD
  // -----------------------------------------------------

  function updateSection(id: string, patch: Partial<FormSection>) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  }

  function addSection() {
    setSections((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: `Section ${prev.length + 1}`,
        order: prev.length + 1,
        fields: [],
        collapsed: false,
      },
    ]);
  }

  function deleteSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  // -----------------------------------------------------
  // FIELD CRUD
  // -----------------------------------------------------

  function addFieldToSection(sectionId: string, type: FieldType) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              fields: [
                ...s.fields,
                {
                  id: crypto.randomUUID(),
                  label: `${type} field`,
                  key: `${type}_${s.fields.length + 1}`, // NEW
                  type,
                  required: false,
                  placeholder: "",
                  defaultValue: null,
                  order: s.fields.length + 1,
                  layout: "full",
                  options:
                    type === "select" || type === "radio" ? [] : undefined,
                  visibleIf: null,
                  showInList: false, // NEW
                  permissions: undefined,
                },
              ],
            }
          : s
      )
    );
  }

  function deleteField(fieldId: string) {
    setSections((prev) =>
      prev.map((s) => ({
        ...s,
        fields: s.fields.filter((f) => f.id !== fieldId),
      }))
    );

    if (selectedFieldId === fieldId) setSelectedFieldId(null);
  }

  // ⭐ DUPLICATE FIELD SUPPORT
  function duplicateField(fieldId: string) {
    setSections((prev) =>
      prev.map((sec) => {
        const field = sec.fields.find((f) => f.id === fieldId);
        if (!field) return sec;

        const clone = {
          ...field,
          id: crypto.randomUUID(),
          key: `${field.key}_copy_${Date.now()}`, // Ensure unique key
          label: field.label + " Copy",
          order: sec.fields.length + 1,
        };

        return {
          ...sec,
          fields: [...sec.fields, clone],
        };
      })
    );
  }

  function moveFieldToSection(fieldId: string, targetSectionId: string) {
    let moving: DynamicField | undefined;

    const afterRemove = sections.map((s) => {
      const idx = s.fields.findIndex((f) => f.id === fieldId);
      if (idx !== -1) {
        moving = s.fields[idx];

        const newFields = s.fields
          .filter((f) => f.id !== fieldId)
          .map((f, i) => ({ ...f, order: i + 1 }));

        return { ...s, fields: newFields };
      }
      return s;
    });

    if (!moving) return;

    setSections(
      afterRemove.map((s) =>
        s.id === targetSectionId
          ? {
              ...s,
              fields: [
                ...s.fields,
                { ...moving!, order: s.fields.length + 1 },
              ],
            }
          : s
      )
    );
  }

  // -----------------------------------------------------
  // UPDATED PATCH HANDLER
  // -----------------------------------------------------
  function handleFieldUpdate(fieldId: string, patch: any) {
    if (patch.__delete) return deleteField(fieldId);
    if (patch.__duplicate) return duplicateField(fieldId);
    if (patch.__moveToSection) return moveFieldToSection(fieldId, patch.__moveToSection);

    updateField(fieldId, patch);
  }

  function updateField(fieldId: string, patch: Partial<DynamicField>) {
    setSections((prev) =>
      prev.map((s) => ({
        ...s,
        fields: s.fields.map((f) =>
          f.id === fieldId ? { ...f, ...patch } : f
        ),
      }))
    );
  }

  return (
    <div className="h-[80vh] flex flex-col border rounded overflow-hidden">
      {/* HEADER */}
      <header className="flex items-center justify-between p-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Field Builder</h2>
          <AddSectionButton onClick={addSection} />
        </div>

        <div className="flex items-center gap-2">
          <AddFieldButton
            onClick={() => addFieldToSection(sections[0].id, "text")}
          />
          <Button onClick={() => onSave(sortSections(sections))}>Save</Button>
          <Button variant="outline" onClick={() => onPreview(sortSections(sections))}>
            Live Preview
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-72 border-r p-3 bg-white overflow-auto">
          {sections.map((sec) => (
            <div key={sec.id} className="border rounded p-2 mb-4">
              <div className="flex items-center justify-between mb-2">
                <input
                  value={sec.title}
                  onChange={(e) => updateSection(sec.id, { title: e.target.value })}
                  className="text-sm border px-2 py-1 rounded"
                />
                <button onClick={() => deleteSection(sec.id)} className="text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="space-y-1">
                {sec.fields.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFieldId(f.id)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedFieldId === f.id ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* MAIN CANVAS */}
        <main className="flex-1 p-4 overflow-auto bg-gray-50">
          {sections.map((sec) => (
            <div key={sec.id} className="mb-6">
              <h3 className="font-semibold">{sec.title}</h3>

              {sec.fields.map((f) => (
                <div
                  key={f.id}
                  className={`p-3 border rounded my-2 bg-white ${
                    selectedFieldId === f.id ? "ring-2 ring-blue-200" : ""
                  }`}
                  onClick={() => setSelectedFieldId(f.id)}
                >
                  <div className="font-medium">{f.label}</div>
                  <div className="text-xs text-gray-500">{f.type}</div>
                  <div className="text-xs text-gray-400">
                    Key: {f.key}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </main>

        {/* RIGHT PANEL - FIELD EDITOR */}
        <aside className="w-96 border-l bg-white p-4 overflow-auto">
          {selectedFieldId ? (
            (() => {
              const field = allFields.find((f) => f.id === selectedFieldId);
              if (!field) return <div>Field removed</div>;

              return (
                <FieldEditor
                  field={field}
                  allFields={allFields}
                  sections={sections}
                  onUpdate={(patch) => handleFieldUpdate(selectedFieldId, patch)}
                />
              );
            })()
          ) : (
            <div className="text-sm text-gray-500">Select a field to edit</div>
          )}
        </aside>
      </div>
    </div>
  );
}
