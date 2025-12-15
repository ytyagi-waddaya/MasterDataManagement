// components/fieldBuilder/FormPreview.tsx
"use client";

import { DynamicField, FormSection } from "./types/DynamicField";
import { groupFieldsIntoRows, layoutToClass, sortFields, sortSections } from "./utils";
import { useState } from "react";

/**
 * FormPreview renders sections with responsive horizontal rows based on field.layout
 */
export function FormPreview({ sections }: { sections: FormSection[] }) {
  const [data, setData] = useState<Record<string, any>>({});

  const handleChange = (id: string, v: any) => setData((p) => ({ ...p, [id]: v }));

  return (
    <div className="max-w-4xl mx-auto p-6">
      {sortSections(sections).map((section) => {
        const fields = sortFields(section.fields);
        const rows = groupFieldsIntoRows(fields);

        return (
          <section key={section.id} className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>

            <div className="space-y-4">
              {rows.map((row, i) => (
                <div key={i} className="flex gap-4">
                  {row.map((f) => (
                    <div key={f.id} className={`${layoutToClass(f.layout)} min-w-0`}>
                      <div className="bg-white p-3 border rounded">
                        {f.type !== "checkbox" && (
                          <label className="block text-sm font-medium mb-1">
                            {f.label} {f.required && <span className="text-red-500">*</span>}
                          </label>
                        )}

                        {/* Render control */}
                        {renderPreviewControl(f, data[f.id], (v: any) => handleChange(f.id, v))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** helper to render control */
function renderPreviewControl(field: DynamicField, value: any, onChange: (v: any) => void) {
  switch (field.type) {
    case "text":
    case "email":
    case "phone":
    case "currency":
      return (
        <input
          className="w-full px-3 py-2 border rounded"
          placeholder={field.placeholder ?? ""}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <input
          type="number"
          className="w-full px-3 py-2 border rounded"
          value={value ?? ""}
          placeholder={field.placeholder ?? ""}
          min={field.min ?? undefined}
          max={field.max ?? undefined}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
      );
    case "textarea":
      return (
        <textarea
          className="w-full px-3 py-2 border rounded"
          placeholder={field.placeholder ?? ""}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "select":
    case "radio":
      return (
        <select
          className="w-full px-3 py-2 border rounded"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select…</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return (
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span>{field.label}</span>
        </label>
      );
    case "date":
    case "datetime":
      return (
        <input
          type={field.type === "date" ? "date" : "datetime-local"}
          className="w-full px-3 py-2 border rounded"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return null;
  }
}
