import { useFormBuilderStore } from "../../state/useFormBuilderStore";

export function DataTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);

  return (
    <div className="space-y-3">
      <h4 className="font-semibold">Data</h4>

      <div className="text-sm text-gray-600">
        Type: <b>{field.data.type}</b>
      </div>

      {/* Default value */}
      <input
        className="border p-2 w-full"
        placeholder="Default value"
        value={field.data.default ?? ""}
        onChange={(e) =>
          updateField(field.meta.key, {
            data: { ...field.data, default: e.target.value },
          })
        }
      />

      {/* Nullable */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={field.data.nullable ?? false}
          onChange={(e) =>
            updateField(field.meta.key, {
              data: { ...field.data, nullable: e.target.checked },
            })
          }
        />
        Nullable (allow empty)
      </label>

      {/* Precision / Scale (NUMBER only) */}
      {field.data.type === "NUMBER" && (
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            className="border p-2"
            placeholder="Precision"
            value={field.data.precision ?? ""}
            onChange={(e) =>
              updateField(field.meta.key, {
                data: {
                  ...field.data,
                  precision: Number(e.target.value),
                },
              })
            }
          />

          <input
            type="number"
            className="border p-2"
            placeholder="Scale"
            value={field.data.scale ?? ""}
            onChange={(e) =>
              updateField(field.meta.key, {
                data: {
                  ...field.data,
                  scale: Number(e.target.value),
                },
              })
            }
          />
        </div>
      )}
    </div>
  );
}
