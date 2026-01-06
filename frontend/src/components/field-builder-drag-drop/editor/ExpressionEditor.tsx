export function ExpressionEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium">Expression</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='{{ user.role === "admin" }}'
        className="w-full rounded border p-2 font-mono text-xs"
        rows={4}
      />
    </div>
  );
}
