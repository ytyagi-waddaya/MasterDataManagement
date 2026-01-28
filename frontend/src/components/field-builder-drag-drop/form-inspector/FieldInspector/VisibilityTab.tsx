// "use client";

// import { nanoid } from "nanoid";
// import { EditorNode } from "../../contracts/editor.contract";
// import { ConditionBuilder } from "../../condition-builder/ConditionBuilder";
// import { Expression } from "../../contracts/expression.contract";
// import { ExpressionEditor } from "../../expression/ExpressionEditor";
// import { Eye, EyeOff, Code, Filter } from "lucide-react";
// import { FieldMeta } from "../../condition-builder/condition.types";
// import { ConditionFieldRef } from "../../condition-builder/condition-field-ref";

// /* ================= TYPES ================= */

// type FieldNode = Extract<EditorNode, { kind: "FIELD" }>;
// type Visibility = FieldNode["field"]["visibility"];
// type VisibilityRule = NonNullable<Visibility>["rule"];

// /* ================= COMPONENT ================= */

// export function VisibilityTab({
//   node,
//   onChange,
//   fields,
// }: {
//   node: FieldNode;
//   onChange: (node: EditorNode) => void;
//   fields: readonly FieldMeta[];
// }) {
//   const visibility = node.field.visibility;

//   function updateVisibility(rule?: VisibilityRule) {
//     onChange({
//       ...node,
//       field: {
//         ...node.field,
//         visibility: rule ? { rule } : undefined,
//       },
//     });
//   }

//   const rule = visibility?.rule;

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex items-center gap-2">
//         <Eye className="h-4 w-4 text-gray-500" />
//         <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
//           Visibility Rules
//         </div>
//       </div>

//       {/* Mode Selector */}
//       <div>
//         <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
//           When should this field be visible?
//         </label>
//         <div className="grid grid-cols-3 gap-2">
//           <button
//             onClick={() => updateVisibility(undefined)}
//             className={`
//               flex flex-col items-center justify-center p-3 rounded-lg border transition-all
//               ${
//                 !rule
//                   ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
//                   : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400"
//               }
//             `}
//           >
//             <Eye className="h-5 w-5 mb-1" />
//             <span className="text-xs font-medium">Always</span>
//           </button>

//           <button
//             onClick={() => {
//               const firstField = fields[0];
//               if (!firstField) return;

//               updateVisibility({
//                 type: "CONDITION",
//                 condition: {
//                   id: nanoid(),
//                   kind: "GROUP",
//                   combinator: "AND",
//                   children: [
//                     {
//                       id: nanoid(),
//                       kind: "RULE",
//                       field: firstField.key,
//                       operator: "EQUALS",
//                       value: "",
//                     },
//                   ],
//                 },
//               });
//             }}
//             className={`
//               flex flex-col items-center justify-center p-3 rounded-lg border transition-all
//               ${
//                 rule?.type === "CONDITION"
//                   ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
//                   : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400"
//               }
//             `}
//           >
//             <Filter className="h-5 w-5 mb-1" />
//             <span className="text-xs font-medium">Condition</span>
//           </button>

//           <button
//             onClick={() => {
//               updateVisibility({
//                 type: "EXPRESSION",
//                 expression: {} as Expression,
//               });
//             }}
//             className={`
//               flex flex-col items-center justify-center p-3 rounded-lg border transition-all
//               ${
//                 rule?.type === "EXPRESSION"
//                   ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
//                   : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400"
//               }
//             `}
//           >
//             <Code className="h-5 w-5 mb-1" />
//             <span className="text-xs font-medium">Expression</span>
//           </button>
//         </div>
//       </div>

//       {/* Current Mode Description */}
//       <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
//         <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
//           {!rule
//             ? "Always Visible"
//             : rule.type === "CONDITION"
//               ? "Conditional Visibility"
//               : "Expression-based Visibility"}
//         </div>
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           {!rule
//             ? "Field will always be visible to users."
//             : rule.type === "CONDITION"
//               ? "Field visibility depends on other field values."
//               : "Field visibility controlled by JavaScript expression."}
//         </p>
//       </div>

//       {/* ================= CONDITION BUILDER ================= */}
//       {rule?.type === "CONDITION" && (
//         <div className="space-y-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
//           <div className="flex items-center gap-2">
//             <Filter className="h-4 w-4 text-gray-500" />
//             <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
//               Condition Rules
//             </div>
//           </div>
//           <ConditionBuilder
//             value={rule.condition}
//             fields={fields}
//             onChange={(updated) =>
//               updateVisibility({
//                 type: "CONDITION",
//                 condition: updated,
//               })
//             }
//           />
//         </div>
//       )}

//       {/* ================= EXPRESSION EDITOR ================= */}
//       {rule?.type === "EXPRESSION" && (
//         <div className="space-y-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
//           <div className="flex items-center gap-2">
//             <Code className="h-4 w-4 text-gray-500" />
//             <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
//               JavaScript Expression
//             </div>
//           </div>
//           <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//             Return true to show field, false to hide. Use field names as
//             variables.
//           </div>
//           <ExpressionEditor
//             value={rule.expression.expression}
//             fields={fields}
//             onChange={(text) =>
//               updateVisibility({
//                 type: "EXPRESSION",
//                 expression: {
//                   expression: text,
//                   language: "js",
//                 },
//               })
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { nanoid } from "nanoid";
import { EditorNode, EditorFieldDefinition } from "../../contracts/editor.contract";
import { ConditionBuilder } from "../../condition-builder/ConditionBuilder";
import { ExpressionEditor } from "../../expression/ExpressionEditor";
import { Expression } from "../../contracts/expression.contract";
import { Eye, Code, Filter } from "lucide-react";
import { ConditionFieldRef } from "../../condition-builder/condition-field-ref";

/* ================= TYPES ================= */

type FieldNode = Extract<EditorNode, { kind: "FIELD" }>;
type Visibility = FieldNode["field"]["visibility"];
type VisibilityRule = NonNullable<Visibility>["rule"];

/* ================= COMPONENT ================= */

export function VisibilityTab({
  node,
  onChange,
  fields,
}: {
  node: FieldNode;
  onChange: (node: EditorNode) => void;
  fields: readonly EditorFieldDefinition[];
}) {
  const visibility = node.field.visibility;
  const rule = visibility?.rule;

  /** 🔑 projection: editor → condition */
const conditionFields: ConditionFieldRef[] = fields.map((f) => ({
  key: f.key,
  label: f.label,
  type: f.type, // ✅ REQUIRED
}));


  function updateVisibility(rule?: VisibilityRule) {
    onChange({
      ...node,
      field: {
        ...node.field,
        visibility: rule ? { rule } : undefined,
      },
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-gray-500" />
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Visibility Rules
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => updateVisibility(undefined)}
          className={`p-3 rounded-lg border ${
            !rule ? "border-blue-500 bg-blue-50" : "border-gray-200"
          }`}
        >
          <Eye className="h-5 w-5 mx-auto" />
          <span className="text-xs">Always</span>
        </button>

        <button
          onClick={() => {
            const firstField = conditionFields[0];
            if (!firstField) return;

            updateVisibility({
              type: "CONDITION",
              condition: {
                id: nanoid(),
                kind: "GROUP",
                combinator: "AND",
                children: [
                  {
                    id: nanoid(),
                    kind: "RULE",
                    field: firstField.key,
                    operator: "EQUALS",
                    value: "",
                  },
                ],
              },
            });
          }}
          className={`p-3 rounded-lg border ${
            rule?.type === "CONDITION"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <Filter className="h-5 w-5 mx-auto" />
          <span className="text-xs">Condition</span>
        </button>

        <button
          onClick={() =>
            updateVisibility({
              type: "EXPRESSION",
              expression: { expression: "", language: "js" } as Expression,
            })
          }
          className={`p-3 rounded-lg border ${
            rule?.type === "EXPRESSION"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <Code className="h-5 w-5 mx-auto" />
          <span className="text-xs">Expression</span>
        </button>
      </div>

      {/* CONDITION BUILDER */}
      {rule?.type === "CONDITION" && (
        <ConditionBuilder
          value={rule.condition}
          fields={conditionFields}
          onChange={(updated) =>
            updateVisibility({
              type: "CONDITION",
              condition: updated,
            })
          }
        />
      )}

      {/* EXPRESSION */}
      {rule?.type === "EXPRESSION" && (
        <ExpressionEditor
          value={rule.expression.expression}
          fields={conditionFields}
          onChange={(text) =>
            updateVisibility({
              type: "EXPRESSION",
              expression: {
                expression: text,
                language: "js",
              },
            })
          }
        />
      )}
    </div>
  );
}
