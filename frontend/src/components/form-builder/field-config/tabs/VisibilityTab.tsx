import { VisibilityRuleBuilder } from "../../components/VisibilityRuleBuilder";
import { useFormBuilderStore } from "../../state/useFormBuilderStore";
import { NodePath } from "../../state/useFormBuilderStore";
import { VisibilityRule } from "../../node.types";
import { formatVisibilityRule } from "../../components/formatVisibilityRule";

/* ======================================================
   PROPS
====================================================== */

type FieldTargetProps = {
  target: "FIELD";
  fieldKey: string;
};

type NodeTargetProps = {
  target: "NODE";
  nodePath: NodePath;
};

type Props = FieldTargetProps | NodeTargetProps;

/* ======================================================
   COMPONENT
====================================================== */

// export function VisibilityTab(props: Props) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const updateLayoutNode = useFormBuilderStore((s) => s.updateLayoutNode);
//   const updatePresentationNode = useFormBuilderStore(
//     (s) => s.updatePresentationNode,
//   );
//   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);
//   const schema = useFormBuilderStore((s) => s.schema);

//   /* ================= FIELD ================= */

//   if (props.target === "FIELD") {
//     const field = fieldConfigs.find((f) => f.meta.key === props.fieldKey);

//     if (!field) {
//       return <div className="p-4 text-red-500 text-sm">Field not found</div>;
//     }

//     <p className="text-xs text-gray-500 italic mb-2">
//       {formatVisibilityRule(field.visibility, fieldConfigs)}
//     </p>;

//     return (
//       <VisibilityRuleBuilder
//         value={field.visibility}
//         onChange={(rule) => updateField(props.fieldKey, { visibility: rule })}
//       />
//     );
//   }

//   /* ================= NODE ================= */

//   const { nodePath } = props;

//   return (
//     <VisibilityRuleBuilder
//       value={getNodeVisibility(schema, nodePath)}
//       onChange={(rule) => {
//         updateLayoutNode(nodePath, (n) => {
//           n.visibility = rule;
//         });

//         updatePresentationNode(nodePath, (n) => {
//           n.visibility = rule;
//         });
//       }}
//     />
//   );
// }

export function VisibilityTab(props: Props) {
  const updateField = useFormBuilderStore((s) => s.updateField);
  const updateLayoutNode = useFormBuilderStore((s) => s.updateLayoutNode);
  const updatePresentationNode = useFormBuilderStore(
    (s) => s.updatePresentationNode
  );
  const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);
  const schema = useFormBuilderStore((s) => s.schema);

  /* ================= FIELD ================= */

  if (props.target === "FIELD") {
    const field = fieldConfigs.find((f) => f.meta.key === props.fieldKey);

    if (!field) {
      return <div className="p-4 text-red-500 text-sm">Field not found</div>;
    }

    return (
      <div className="space-y-2">
        <p className="text-xs text-gray-500 italic">
          {formatVisibilityRule(field.visibility, fieldConfigs)}
        </p>

        <VisibilityRuleBuilder
          value={field.visibility}
          onChange={(rule) =>
            updateField(props.fieldKey, { visibility: rule })
          }
        />
      </div>
    );
  }

  /* ================= NODE ================= */

  const { nodePath } = props;

  return (
    <VisibilityRuleBuilder
      value={getNodeVisibility(schema, nodePath)}
      onChange={(rule) => {
        updateLayoutNode(nodePath, (n) => {
          n.visibility = rule;
        });

        updatePresentationNode(nodePath, (n) => {
          n.visibility = rule;
        });
      }}
    />
  );
}


/* ======================================================
   HELPERS
====================================================== */

function getNodeVisibility(
  schema: any,
  path: NodePath,
): VisibilityRule | undefined {
  const section = schema.layout.sections.find(
    (s: any) => s.id === path.sectionId,
  );
  if (!section) return undefined;

  function visit(nodes: any[]): VisibilityRule | undefined {
    for (const n of nodes) {
      if (n.id === path.nodeId) return n.visibility;

      if (n.kind === "LAYOUT") {
        if (n.type === "repeater") {
          const found = visit(n.children);
          if (found !== undefined) return found;
        }

        if (n.slots) {
          for (const slot of n.slots) {
            const found = visit(slot.children);
            if (found !== undefined) return found;
          }
        }
      }
    }
    return undefined;
  }

  return visit(section.nodes);
}
