import { EditorNode, LayoutSpan } from "../contracts/editor.contract";

export function FieldInspector({
  node,
  onChange,
}: {
  node: Extract<EditorNode, { kind: "FIELD" }>;
  onChange: (node: EditorNode) => void;
}) {
  const field = node.field;

  function update(patch: Partial<typeof field>) {
    onChange({
      ...node,
      field: {
        ...field,
        ...patch,
      },
    });
  }

  return (
    <div className="space-y-4 text-sm">
      {/* Label */}
      <div>
        <label className="block text-xs font-medium mb-1">Label</label>
        <input
          value={field.label}
          onChange={(e) => update({ label: e.target.value })}
          className="w-full rounded border px-2 py-1"
        />
      </div>

      {/* Key */}
      <div>
        <label className="block text-xs font-medium mb-1">Key</label>
        <input
          value={field.key}
          disabled
          className="w-full rounded border px-2 py-1 bg-muted text-muted-foreground"
        />
      </div>

      {/* Width */}
      <div>
        <label className="block text-xs font-medium mb-1">Width</label>
        <select
          value={field.layout.span}
          onChange={(e) =>
            update({
              layout: {
                ...field.layout,
                span: Number(e.target.value) as LayoutSpan,
              },
            })
          }
          className="w-full rounded border px-2 py-1"
        >
          <option value={12}>Full</option>
          <option value={6}>Half</option>
          <option value={4}>One Third</option>
          <option value={3}>Quarter</option>
        </select>
      </div>

      {/* Required */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={field.required ?? false}
          onChange={(e) => update({ required: e.target.checked })}
        />
        <span>Required</span>
      </div>

      {/* Read Only */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={field.readOnly ?? false}
          onChange={(e) => update({ readOnly: e.target.checked })}
        />
        <span>Read only</span>
      </div>
    </div>
  );
}
