import { useFormBuilderStore } from "../../state/useFormBuilderStore";

export function MetaTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);

  return (
    <div className="space-y-3">
      <h4 className="font-semibold">Meta</h4>

      {/* Label */}
      <input
        className="border p-2 w-full"
        value={field.meta.label}
        placeholder="Field label"
        onChange={(e) =>
          updateField(field.meta.key, {
            meta: { ...field.meta, label: e.target.value },
          })
        }
      />

      {/* Category (read-only) */}
      <div className="text-sm text-gray-600">
        Category: <b>{field.meta.category}</b>
      </div>

      {/* Governance indicators */}
      {field.meta.locked && (
        <div className="text-xs text-orange-600">
          This field is locked
        </div>
      )}

      {field.meta.deprecated && (
        <div className="text-xs text-red-600">
          This field is deprecated
        </div>
      )}
    </div>
  );
}
