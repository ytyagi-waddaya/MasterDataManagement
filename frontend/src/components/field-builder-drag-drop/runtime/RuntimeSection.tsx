
import { FormSection } from "../contracts/editor.contract";
import { RuntimeNodeRenderer } from "./RuntimeNodeRenderer";

export function RuntimeSection({ section }: { section: FormSection }) {
  if (section.collapsed) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{section.title}</h2>

      {section.nodes.map((node) => (
        <RuntimeNodeRenderer
          key={node.id}
          node={node} // ✅ EditorNode
          values={{}}
          errors={{}}
          onChange={() => {}}
        />
      ))}
    </div>
  );
}
