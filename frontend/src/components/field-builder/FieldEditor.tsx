"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Copy } from "lucide-react";
import { makeOption } from "./utils";
import {
  DynamicField,
  FieldOption,
  FieldType,
  FormSection,
} from "./types/DynamicField";

export function FieldEditor({
  field,
  allFields,
  sections,
  onUpdate,
}: {
  field: DynamicField;
  allFields: DynamicField[];
  sections: FormSection[];
  onUpdate: (
    patch:
      | Partial<DynamicField>
      | { __delete?: boolean; __duplicate?: boolean; __moveToSection?: string }
  ) => void;
}) {
  const [local, setLocal] = useState<DynamicField>(field);

  useEffect(() => setLocal(field), [field]);

  // -----------------------------
  // Utility: Generate key from label
  // -----------------------------
  function generateKey(label: string) {
    return label
      .toLowerCase()
      .trim()
      .replace(/[^\w]+/g, "_") // non-alphanum → _
      .replace(/^_+|_+$/g, ""); // trim edges
  }

  // -----------------------------
  // When label changes → update key ALWAYS
  // -----------------------------
  function handleLabelChange(label: string) {
    const newKey = generateKey(label);

    const patch = {
      label,
      key: newKey,
    };

    applyPatch(patch);
  }

  // Local apply patch
  function applyPatch(patch: Partial<DynamicField>) {
    const updated = { ...local, ...patch };
    setLocal(updated);
    onUpdate(patch);
  }

  // OPTION CRUD
  const addOption = (label?: string) => {
    const opt = label ? makeOption(label) : makeOption("Option");
    const updated: FieldOption[] = [...(local.options ?? []), opt];
    applyPatch({ options: updated });
  };

  const updateOption = (i: number, key: "label" | "value", val: string) => {
    const opts = [...(local.options ?? [])];
    opts[i] = { ...opts[i], [key]: val };
    applyPatch({ options: opts });
  };

  const removeOption = (i: number) => {
    const opts = [...(local.options ?? [])].filter((_, idx) => idx !== i);
    applyPatch({ options: opts });
  };

  const layoutOptions = [
    { value: "full", label: "Full (100%)" },
    { value: "half", label: "Half (50%)" },
    { value: "third", label: "Third (33%)" },
    { value: "two-third", label: "Two-third (66%)" },
    { value: "quarter", label: "Quarter (25%)" },
  ];

  return (
    <div className="space-y-4">
      {/* FIELD LABEL */}
      <div>
        <label className="text-sm font-medium block mb-1">Label</label>
        <input
          value={local.label}
          onChange={(e) => handleLabelChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* FIELD KEY (AUTO-UPDATING) */}
      <div>
        <label className="text-sm font-medium block mb-1">Field Key</label>
        <input
          value={local.key ?? ""}
          onChange={(e) => applyPatch({ key: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-xs text-gray-500">Auto-updates from Label always.</p>
      </div>

      {/* SHOW IN LIST */}
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!local.showInList}
            onChange={(e) => applyPatch({ showInList: e.target.checked })}
          />
          Show this field in list/table
        </label>
      </div>

      {/* PLACEHOLDER */}
      <div>
        <label className="text-sm font-medium block mb-1">Placeholder</label>
        <input
          value={local.placeholder ?? ""}
          onChange={(e) => applyPatch({ placeholder: e.target.value || null })}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* REQUIRED + TYPE + LAYOUT */}
      <div className="flex gap-2">
        <div>
          <label className="text-sm block mb-1">Required</label>
          <input
            type="checkbox"
            checked={!!local.required}
            onChange={(e) => applyPatch({ required: e.target.checked })}
          />
        </div>

        <div>
          <label className="text-sm block mb-1">Type</label>
          <select
            value={local.type}
            onChange={(e) => applyPatch({ type: e.target.value as FieldType })}
            className="px-2 py-1 border rounded"
          >
            {[
              "text",
              "textarea",
              "number",
              "select",
              "radio",
              "checkbox",
              "date",
              "datetime",
              "email",
              "phone",
              "currency",
            ].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm block mb-1">Layout</label>
          <select
            value={local.layout ?? "full"}
            onChange={(e) =>
              applyPatch({ layout: e.target.value as DynamicField["layout"] })
            }
            className="px-2 py-1 border rounded"
          >
            {layoutOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* NUMBER MIN/MAX */}
      {local.type === "number" && (
        <div className="flex gap-2">
          <div>
            <label className="text-sm block mb-1">Min</label>
            <input
              type="number"
              value={local.min ?? ""}
              onChange={(e) =>
                applyPatch({ min: e.target.value ? Number(e.target.value) : null })
              }
              className="px-2 py-1 border rounded"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Max</label>
            <input
              type="number"
              value={local.max ?? ""}
              onChange={(e) =>
                applyPatch({ max: e.target.value ? Number(e.target.value) : null })
              }
              className="px-2 py-1 border rounded"
            />
          </div>
        </div>
      )}

      {/* OPTIONS FOR SELECT / RADIO */}
      {(local.type === "select" || local.type === "radio") && (
        <div>
          <label className="text-sm font-medium block mb-2">Options</label>

          {(local.options ?? []).map((opt, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input
                value={opt.label}
                onChange={(e) => updateOption(i, "label", e.target.value)}
                className="px-2 py-1 border rounded flex-1"
              />
              <input
                value={opt.value}
                onChange={(e) => updateOption(i, "value", e.target.value)}
                className="px-2 py-1 border rounded flex-1"
              />
              <button onClick={() => removeOption(i)} className="text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <button
            onClick={() => addOption("Option")}
            className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-1"
          >
            <Plus size={12} /> Add Option
          </button>
        </div>
      )}

      {/* MOVE FIELD */}
      <div>
        <label className="text-sm font-medium block mb-2">Move to Section</label>
        <select
          onChange={(e) => {
            if (e.target.value) onUpdate({ __moveToSection: e.target.value });
          }}
          className="px-2 py-1 border rounded w-full"
        >
          <option value="">Select Section</option>
          {sections.map((sec) => (
            <option key={sec.id} value={sec.id}>
              {sec.title}
            </option>
          ))}
        </select>
      </div>

      {/* DUPLICATE + DELETE */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={() => onUpdate({ __duplicate: true })}
          className="px-3 py-2 bg-slate-200 rounded flex items-center gap-2"
        >
          <Copy size={16} /> Duplicate
        </button>

        <button
          onClick={() => onUpdate({ __delete: true })}
          className="px-3 py-2 bg-red-600 text-white rounded flex items-center gap-2"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
