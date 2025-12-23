import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormSection, DynamicField } from "./types/DynamicField";
import { nanoid } from "nanoid";
import {
  Trash2,
  ChevronDown,
  ChevronRight,
  Copy,
} from "lucide-react";
import { layoutToColSpan } from "./form-renderer/layout";
import { FieldPreview } from "./FieldPreview";

export function SectionCard({
  section,
  sections,
  setSections,
  onEditField,
}: {
  section: FormSection;
  sections: FormSection[];
  setSections: (s: FormSection[]) => void;
  onEditField: (f: DynamicField) => void;
}) {
  /* =========================
     FIELD ACTIONS
  ========================= */

  function addField() {
    setSections(
      sections.map((s) =>
        s.id === section.id
          ? {
              ...s,
              fields: [
                ...s.fields,
                {
                  id: nanoid(),
                  key: `field_${nanoid(6)}`,
                  label: "New Field",
                  type: "text",
                  order: s.fields.length,
                },
              ],
            }
          : s
      )
    );
  }

  function deleteField(fieldId: string) {
    setSections(
      sections.map((s) =>
        s.id === section.id
          ? {
              ...s,
              fields: s.fields.filter(
                (f) => f.id !== fieldId
              ),
            }
          : s
      )
    );
  }

  function duplicateField(field: DynamicField) {
    const cloned: DynamicField = {
      ...field,
      id: nanoid(),
      key: `${field.key}_copy`,
      label: `${field.label} (Copy)`,
      order: field.order + 1,
    };

    setSections(
      sections.map((s) =>
        s.id === section.id
          ? {
              ...s,
              fields: [...s.fields, cloned],
            }
          : s
      )
    );
  }

  /* =========================
     SECTION ACTIONS
  ========================= */

  function toggleCollapse() {
    setSections(
      sections.map((s) =>
        s.id === section.id
          ? { ...s, collapsed: !s.collapsed }
          : s
      )
    );
  }

  function duplicateSection() {
    const clonedSection: FormSection = {
      ...section,
      id: nanoid(),
      title: `${section.title} (Copy)`,
      collapsed: false,
      fields: section.fields.map((f) => ({
        ...f,
        id: nanoid(),
        key: `${f.key}_copy`,
      })),
    };

    const index = sections.findIndex(
      (s) => s.id === section.id
    );

    setSections([
      ...sections.slice(0, index + 1),
      clonedSection,
      ...sections.slice(index + 1),
    ]);
  }

  function deleteSection() {
    // 🚫 Prevent deleting the last section
    if (sections.length === 1) return;

    setSections(
      sections.filter((s) => s.id !== section.id)
    );
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="border rounded p-4 space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2">
        {/* Collapse toggle */}
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleCollapse}
        >
          {section.collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </Button>

        {/* Title */}
        <Input
          value={section.title}
          onChange={(e) =>
            setSections(
              sections.map((s) =>
                s.id === section.id
                  ? { ...s, title: e.target.value }
                  : s
              )
            )
          }
          className="flex-1"
        />

        {/* Duplicate section */}
        <Button
          size="icon"
          variant="ghost"
          onClick={duplicateSection}
        >
          <Copy size={16} />
        </Button>

        {/* Delete section */}
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive"
          disabled={sections.length === 1}
          onClick={deleteSection}
        >
          <Trash2 size={16} />
        </Button>
      </div>

      {/* Collapsible content */}
      {!section.collapsed && (
        <>
          <div className="grid grid-cols-12 gap-3">
            {section.fields.map((field) => (
              <div
                key={field.id}
                className={layoutToColSpan(field.layout)}
              >
                <FieldPreview
                  field={field}
                  onEdit={() => onEditField(field)}
                  onDelete={() => deleteField(field.id)}
                  onDuplicate={() => duplicateField(field)}
                />
              </div>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={addField}
          >
            + Add Field
          </Button>
        </>
      )}
    </div>
  );
}
