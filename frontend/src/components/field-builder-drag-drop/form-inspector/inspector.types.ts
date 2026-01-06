import { FieldMeta } from "../condition-builder/ConditionGroupView";
import { mapEditorTypeToFieldDataType } from "../condition-builder/mapEditorTypeToConditionType";
import { EditorNode, FormSection } from "../contracts/editor.contract";

export type InspectorTab = "GENERAL" | "VALIDATION" | "VISIBILITY" | "API";

export interface InspectorProps {
  node: EditorNode | null;
  section: FormSection | null;
  sections: FormSection[];
  onNodeChange: (node: EditorNode) => void;
  onSectionChange: (section: FormSection) => void;

  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}



/* helper */
export function collectFields(sections: FormSection[]): FieldMeta[] {
  const result: FieldMeta[] = [];

  const walk = (nodes: EditorNode[]) => {
    for (const n of nodes) {
      console.log("Walking node:", n.kind);
      if (n.kind === "FIELD") {
        result.push({
          key: n.field.key,
          label: n.field.label,
          type:mapEditorTypeToFieldDataType(n.field.type),
        });
      }

      if (n.kind === "LAYOUT" && "slots" in n) {
        n.slots.forEach((s) => walk(s.children));
      }
    }
  };

  sections?.forEach((s) => walk(s.nodes));
  return result;
}

