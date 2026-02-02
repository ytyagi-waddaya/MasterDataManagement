// import { VisibilityRuleBuilder } from "../../components/VisibilityRuleBuilder";
// import { useFormBuilderStore } from "../../state/useFormBuilderStore";
// import { NodePath } from "../../state/useFormBuilderStore";
// import { VisibilityRule } from "../../node.types";
// import { formatVisibilityRule } from "../../components/formatVisibilityRule";

// /* ======================================================
//    PROPS
// ====================================================== */

// type FieldTargetProps = {
//   target: "FIELD";
//   fieldKey: string;
// };

// type NodeTargetProps = {
//   target: "NODE";
//   nodePath: NodePath;
// };

// type Props = FieldTargetProps | NodeTargetProps;

// /* ======================================================
//    COMPONENT
// ====================================================== */

// // export function VisibilityTab(props: Props) {
// //   const updateField = useFormBuilderStore((s) => s.updateField);
// //   const updateLayoutNode = useFormBuilderStore((s) => s.updateLayoutNode);
// //   const updatePresentationNode = useFormBuilderStore(
// //     (s) => s.updatePresentationNode,
// //   );
// //   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);
// //   const schema = useFormBuilderStore((s) => s.schema);

// //   /* ================= FIELD ================= */

// //   if (props.target === "FIELD") {
// //     const field = fieldConfigs.find((f) => f.meta.key === props.fieldKey);

// //     if (!field) {
// //       return <div className="p-4 text-red-500 text-sm">Field not found</div>;
// //     }

// //     <p className="text-xs text-gray-500 italic mb-2">
// //       {formatVisibilityRule(field.visibility, fieldConfigs)}
// //     </p>;

// //     return (
// //       <VisibilityRuleBuilder
// //         value={field.visibility}
// //         onChange={(rule) => updateField(props.fieldKey, { visibility: rule })}
// //       />
// //     );
// //   }

// //   /* ================= NODE ================= */

// //   const { nodePath } = props;

// //   return (
// //     <VisibilityRuleBuilder
// //       value={getNodeVisibility(schema, nodePath)}
// //       onChange={(rule) => {
// //         updateLayoutNode(nodePath, (n) => {
// //           n.visibility = rule;
// //         });

// //         updatePresentationNode(nodePath, (n) => {
// //           n.visibility = rule;
// //         });
// //       }}
// //     />
// //   );
// // }

// export function VisibilityTab(props: Props) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const updateLayoutNode = useFormBuilderStore((s) => s.updateLayoutNode);
//   const updatePresentationNode = useFormBuilderStore(
//     (s) => s.updatePresentationNode
//   );
//   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);
//   const schema = useFormBuilderStore((s) => s.schema);

//   /* ================= FIELD ================= */

//   if (props.target === "FIELD") {
//     const field = fieldConfigs.find((f) => f.meta.key === props.fieldKey);

//     if (!field) {
//       return <div className="p-4 text-red-500 text-sm">Field not found</div>;
//     }

//     return (
//       <div className="space-y-2">
//         <p className="text-xs text-gray-500 italic">
//           {formatVisibilityRule(field.visibility, fieldConfigs)}
//         </p>

//         <VisibilityRuleBuilder
//           value={field.visibility}
//           onChange={(rule) =>
//             updateField(props.fieldKey, { visibility: rule })
//           }
//         />
//       </div>
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


// /* ======================================================
//    HELPERS
// ====================================================== */

// function getNodeVisibility(
//   schema: any,
//   path: NodePath,
// ): VisibilityRule | undefined {
//   const section = schema.layout.sections.find(
//     (s: any) => s.id === path.sectionId,
//   );
//   if (!section) return undefined;

//   function visit(nodes: any[]): VisibilityRule | undefined {
//     for (const n of nodes) {
//       if (n.id === path.nodeId) return n.visibility;

//       if (n.kind === "LAYOUT") {
//         if (n.type === "repeater") {
//           const found = visit(n.children);
//           if (found !== undefined) return found;
//         }

//         if (n.slots) {
//           for (const slot of n.slots) {
//             const found = visit(slot.children);
//             if (found !== undefined) return found;
//           }
//         }
//       }
//     }
//     return undefined;
//   }

//   return visit(section.nodes);
// }


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
      return (
        <div className="p-4 text-sm text-red-500 dark:text-red-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Field not found</span>
          </div>
        </div>
      );
    }

    const ruleText = formatVisibilityRule(field.visibility, fieldConfigs);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
            Visibility Conditions
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Control when this field is visible based on other field values
          </p>
        </div>

        {/* Current Rule Preview */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md">
          <div className="flex items-center gap-2 mb-1.5">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Current Rule</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
            {ruleText || (
              <span className="text-gray-400 dark:text-gray-500 italic">
                No visibility conditions set
              </span>
            )}
          </p>
        </div>

        {/* Rule Builder */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Condition Builder
            </label>
          </div>
          <VisibilityRuleBuilder
            value={field.visibility}
            onChange={(rule) =>
              updateField(props.fieldKey, { visibility: rule })
            }
          />
        </div>
      </div>
    );
  }

  /* ================= NODE ================= */

  const { nodePath } = props;
  const currentRule = getNodeVisibility(schema, nodePath);
  const ruleText = formatVisibilityRule(currentRule, fieldConfigs);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
          Visibility Conditions
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Control when this element is visible based on field values
        </p>
      </div>

      {/* Current Rule Preview */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md">
        <div className="flex items-center gap-2 mb-1.5">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Current Rule</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
          {ruleText || (
            <span className="text-gray-400 dark:text-gray-500 italic">
              No visibility conditions set
            </span>
          )}
        </p>
      </div>

      {/* Rule Builder */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Condition Builder
          </label>
        </div>
        <VisibilityRuleBuilder
          value={currentRule}
          onChange={(rule) => {
            updateLayoutNode(nodePath, (n) => {
              n.visibility = rule;
            });

            updatePresentationNode(nodePath, (n) => {
              n.visibility = rule;
            });
          }}
        />
      </div>

      {/* Info Note */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">
              Visibility Logic
            </p>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
              Elements are hidden when conditions evaluate to false. Use logical operators (AND/OR) to create complex rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   HELPERS
====================================================== */

function getNodeVisibility(
  schema: any,
  path: NodePath
): VisibilityRule | undefined {
  const section = schema.layout.sections.find(
    (s: any) => s.id === path.sectionId
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