import { useState } from "react";
import { RuntimeField } from "../RuntimeField";
import { generateId } from "@/utils/id";

export function RuntimeRepeater({ node, fields }: any) {
  const min = node.config?.minItems ?? 0;
  const max = node.config?.maxItems ?? Infinity;

  const [rows, setRows] = useState<string[]>(
    node._rows?.length
      ? node._rows
      : Array.from({ length: min }).map(() =>
          generateId()
        ),
  );

  /* ======================================================
     ACTIONS
  ====================================================== */

  function addRow() {
    if (rows.length >= max) return;
    setRows([...rows, generateId()]);
  }

  function removeRow(rowId: string) {
    if (rows.length <= min) return;
    setRows(rows.filter((r) => r !== rowId));
  }

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="border rounded p-4 space-y-4">
      <h4 className="font-semibold">
        {node.config?.itemLabel ?? "Items"}
      </h4>

      {rows.map((rowId: string, index: number) => (
        <div
          key={rowId}
          className="border p-3 rounded space-y-3 relative"
        >
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Item {index + 1}
            </div>

            {rows.length > min && (
              <button
                type="button"
                onClick={() => removeRow(rowId)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-12 gap-4">
            {node.children.map((child: any) =>
              child.kind === "FIELD" ? (
                <RuntimeField
                  key={`${rowId}-${child.id}`}
                  fieldKey={child.field.key}
                  fields={fields}
                  rowId={rowId}
                />
              ) : null
            )}
          </div>
        </div>
      ))}

      {rows.length < max && (
        <button
          type="button"
          onClick={addRow}
          className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
        >
          ➕ {node.config?.addLabel ?? "Add item"}
        </button>
      )}
    </div>
  );
}
