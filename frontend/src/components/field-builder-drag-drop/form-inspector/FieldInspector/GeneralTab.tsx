import { EditorNode } from "../../contracts/editor.contract";
import { EditorFieldType } from "../../contracts/fieldPalette.contract";
import {
  Type,
  Hash,
  Calendar,
  CheckSquare,
  List,
  File,
  Database,
  CheckCircle,
  Star,
  ThumbsUp,
} from "lucide-react";

export function GeneralTab({
  node,
  onChange,
}: {
  node: Extract<EditorNode, { kind: "FIELD" }>;
  onChange: (node: EditorNode) => void;
}) {
  const f = node.field;
  const fieldType = f.type as EditorFieldType;

  function update(patch: Partial<typeof f>) {
    onChange({
      ...node,
      field: { ...f, ...patch },
    });
  }

  const fieldIcons: Record<EditorFieldType, React.ComponentType<any>> = {
    text: Type,
    textarea: Type,
    rich_text: Type,
    email: Type,
    phone: Type,
    url: Type,
    password: Type,
    number: Hash,
    currency: Hash,
    percentage: Hash,
    boolean: CheckSquare,
    consent: CheckSquare,
    select: List,
    multi_select: List,
    radio: List,
    rating: Star,
    scale: ThumbsUp,
    matrix: Hash,
    date: Calendar,
    datetime: Calendar,
    file: File,
    image: File,
    reference: Database,
    multi_reference: Database,
    user: Database,
    role: Database,
    status: CheckCircle,
    approval: CheckCircle,
    checklist: List,
    captcha: CheckCircle,
    json: Database,
  };

  const FieldIcon = fieldIcons[fieldType] || Type;

  return (
    <div className="space-y-4">
      {/* Label */}
      <div>
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Label
        </label>
        <input
          value={f.label}
          onChange={(e) => update({ label: e.target.value })}
          placeholder="Field label"
          className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Description
        </label>
        <textarea
          value={f.description ?? ""}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Help text for users"
          className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-[60px]"
          rows={2}
        />
      </div>

      {/* Field Type */}
      <div>
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Field Type
        </label>
        <div className="flex items-center gap-2 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <FieldIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {fieldType}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Type cannot be changed after creation
        </p>
      </div>

      {/* Placeholder */}
      {[
        "text",
        "textarea",
        "email",
        "phone",
        "url",
        "number",
        "currency",
        "percentage",
      ].includes(fieldType) && (
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Placeholder
          </label>
          <input
            value={f.placeholder ?? ""}
            onChange={(e) => update({ placeholder: e.target.value })}
            placeholder="Example placeholder text"
            className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
        </div>
      )}

      {/* Default Value */}
      {[
        "text",
        "textarea",
        "email",
        "phone",
        "url",
        "number",
        "currency",
        "percentage",
        "boolean",
        "select",
        "radio",
      ].includes(fieldType) && (
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Default Value
          </label>
          <input
            value={f.defaultValue ?? ""}
            onChange={(e) => update({ defaultValue: e.target.value })}
            placeholder="Default value"
            className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
        </div>
      )}

      {/* Options */}
      {/* {["select", "multi_select", "radio"].includes(fieldType) && (
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Options
          </label>
          <textarea
            value={f.options?.map((o) => o.label).join("\n") ?? ""}
            onChange={(e) =>
              update({
                options: e.target.value
                  .split("\n")
                  .filter((o) => o.trim())
                  .map((o) => ({
                    label: o.trim(),
                    value: o.trim(),
                  })),
              })
            }
            placeholder="Option 1\nOption 2\nOption 3"
            className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-20"
            rows={3}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Enter each option on a new line
          </p>
        </div>
      )} */}
      {["select", "multi_select", "radio"].includes(fieldType) && (
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Options
          </label>

          <textarea
            value={
              f.options
                ?.map((o) =>
                  o.label === o.value ? o.label : `${o.label} | ${o.value}`
                )
                .join("\n") ?? ""
            }
            onChange={(e) =>
              update({
                options: e.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => {
                    const [label, value] = line.split("|").map((s) => s.trim());

                    return {
                      label,
                      value: value ?? label, // fallback
                    };
                  }),
              })
            }
            placeholder={`High Priority | HIGH
Medium Priority | MEDIUM
Low Priority | LOW`}
            className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-20"
            rows={3}
          />

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            One option per line. Use <code>Label | Value</code> if you need a
            different stored value.
          </p>
        </div>
      )}
    </div>
  );
}
