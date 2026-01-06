import { FormSection } from "../contracts/editor.contract";

export function SectionInspector({
  section,
  onChange,
}: {
  section: FormSection;
  onChange: (section: FormSection) => void;
}) {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="text-xs font-medium">Title</label>
        <input
          value={section.title}
          onChange={(e) =>
            onChange({ ...section, title: e.target.value })
          }
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={section.collapsed ?? false}
          onChange={(e) =>
            onChange({
              ...section,
              collapsed: e.target.checked,
            })
          }
        />
        Collapsed by default
      </label>
    </div>
  );
}
