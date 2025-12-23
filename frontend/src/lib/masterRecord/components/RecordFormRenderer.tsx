export function RecordFormRenderer({ record }: { record: any }) {
  const mode =
    ["DRAFT", "CORRECTION"].includes(record.currentStage?.category)
      ? "EDIT"
      : "VIEW";

  return (
    <div className="border rounded p-4">
      <pre className="text-xs bg-muted p-2 rounded">
        Mode: {mode}
      </pre>

      {/* Replace with your dynamic form renderer */}
      <pre className="text-xs">
        {JSON.stringify(record.data, null, 2)}
      </pre>
    </div>
  );
}
