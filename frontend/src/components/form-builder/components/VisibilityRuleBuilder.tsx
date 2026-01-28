// import {
//   VisibilityRule,
//   VisibilityCondition,
//   VisibilityGroup,
//   VisibilityNode,
// } from "../node.types";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";

// /* ======================================================
//    TYPES
// ====================================================== */

// type Props = {
//   value?: VisibilityRule;
//   onChange: (rule?: VisibilityRule) => void;
// };

// const OP_LABEL: Record<string, string> = {
//   EQUALS: "=",
//   NOT_EQUALS: "≠",
//   GREATER_THAN: ">",
//   LESS_THAN: "<",
//   IN: "IN",
//   NOT_IN: "NOT IN",
// };

// /* ======================================================
//    HELPERS
// ====================================================== */

// function normalizeGroup(group: VisibilityGroup): VisibilityGroup | undefined {
//   const conditions = group.conditions.filter(Boolean);

//   if (!conditions.length) return undefined;

//   return {
//     ...group,
//     conditions,
//   };
// }

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function VisibilityRuleBuilder({ value, onChange }: Props) {
//   const fields = useFormBuilderStore((s) => s.fieldConfigs);

//   const rule: VisibilityGroup = value ?? {
//     type: "group",
//     logic: "AND",
//     conditions: [],
//   };

//   function updateGroup(next: VisibilityGroup | undefined) {
//     onChange(next && next.conditions.length ? next : undefined);
//   }

//   function addCondition() {
//     if (!fields.length) return;

//     updateGroup({
//       ...rule,
//       conditions: [
//         ...rule.conditions,
//         {
//           type: "condition",
//           fieldKey: fields[0].meta.key,
//           operator: "EQUALS",
//           value: "",
//         },
//       ],
//     });
//   }

//   function updateCondition(
//     index: number,
//     patch: Partial<VisibilityCondition>,
//   ) {
//     const next = [...rule.conditions];
//     const target = next[index];

//     if (target?.type !== "condition") return;

//     next[index] = { ...target, ...patch };

//     updateGroup({ ...rule, conditions: next });
//   }

//   function removeCondition(index: number) {
//     const next = rule.conditions.filter((_, i) => i !== index);
//     updateGroup({ ...rule, conditions: next });
//   }

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">Visibility</h4>

//       {/* AND / OR */}
//       <select
//         className="border p-2 text-sm"
//         value={rule.logic}
//         onChange={(e) =>
//           updateGroup({
//             ...rule,
//             logic: e.target.value as "AND" | "OR",
//           })
//         }
//       >
//         <option value="AND">ALL conditions (AND)</option>
//         <option value="OR">ANY condition (OR)</option>
//       </select>

//       {/* CONDITIONS */}
//       {rule.conditions.map((c, i) => {
//         if (c.type !== "condition") return null;

//         const field = fields.find(
//           (f) => f.meta.key === c.fieldKey,
//         );
//         if (!field) return null;

//         return (
//           <div key={i} className="flex gap-2 items-center">
//             {/* FIELD */}
//             <select
//               className="border p-2 text-sm"
//               value={c.fieldKey}
//               onChange={(e) =>
//                 updateCondition(i, {
//                   fieldKey: e.target.value,
//                   value: "",
//                 })
//               }
//             >
//               {fields.map((f) => (
//                 <option key={f.meta.key} value={f.meta.key}>
//                   {f.meta.label}
//                 </option>
//               ))}
//             </select>

//             {/* OPERATOR */}
//             <select
//               className="border p-2 text-sm"
//               value={c.operator}
//               onChange={(e) =>
//                 updateCondition(i, {
//                   operator: e.target.value as any,
//                 })
//               }
//             >
//               {Object.entries(OP_LABEL).map(([op, label]) => (
//                 <option key={op} value={op}>
//                   {label}
//                 </option>
//               ))}
//             </select>

//             {/* VALUE */}
//             <input
//               className="border p-2 text-sm"
//               value={c.value ?? ""}
//               onChange={(e) =>
//                 updateCondition(i, {
//                   value: e.target.value,
//                 })
//               }
//             />

//             {/* REMOVE */}
//             <button
//               type="button"
//               className="text-red-500 text-xs"
//               onClick={() => removeCondition(i)}
//             >
//               ✕
//             </button>
//           </div>
//         );
//       })}

//       <button
//         type="button"
//         className="text-sm border px-3 py-1"
//         onClick={addCondition}
//       >
//         ➕ Add condition
//       </button>
//     </div>
//   );
// }

import {
  VisibilityRule,
  VisibilityCondition,
  VisibilityGroup,
  VisibilityNode,
} from "../node.types";
import { useFormBuilderStore } from "../state/useFormBuilderStore";

/* ======================================================
   TYPES
====================================================== */

type Props = {
  value?: VisibilityRule;
  onChange: (rule?: VisibilityRule) => void;
};

const OP_LABEL: Record<string, string> = {
  EQUALS: "=",
  NOT_EQUALS: "≠",
  GREATER_THAN: ">",
  LESS_THAN: "<",
  IN: "IN",
  NOT_IN: "NOT IN",
};

/* ======================================================
   HELPERS
====================================================== */

function normalize(node?: VisibilityNode): VisibilityNode | undefined {
  if (!node) return undefined;

  if (node.type === "condition") return node;

  const cleaned = node.conditions
    .map(normalize)
    .filter(Boolean) as VisibilityNode[];

  if (!cleaned.length) return undefined;

  return {
    ...node,
    conditions: cleaned,
  };
}

/* ======================================================
   CONDITION NODE (RECURSIVE)
====================================================== */

function ConditionNode({
  node,
  onUpdate,
  onRemove,
}: {
  node: VisibilityNode;
  onUpdate: (next?: VisibilityNode) => void;
  onRemove: () => void;
}) {
  const fields = useFormBuilderStore((s) => s.fieldConfigs);

  /* ---------- GROUP ---------- */
  if (node.type === "group") {
    return (
      <div className="border rounded p-3 space-y-3 bg-gray-50">
        {/* LOGIC + REMOVE */}
        <div className="flex items-center gap-2">
          <select
            className="border p-1 text-sm"
            value={node.logic}
            onChange={(e) =>
              onUpdate({
                ...node,
                logic: e.target.value as "AND" | "OR",
              })
            }
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>

          <button
            type="button"
            className="text-red-500 text-xs"
            onClick={onRemove}
          >
            ✕ Remove group
          </button>
        </div>

        {/* EMPTY STATE */}
        {node.conditions.length === 0 && (
          <div className="text-xs text-gray-400 italic">No conditions yet</div>
        )}

        {/* CHILD CONDITIONS */}
        {node.conditions.map((child, i) => (
          <ConditionNode
            key={i}
            node={child}
            onUpdate={(next) => {
              const copy = [...node.conditions];
              if (next) copy[i] = next;
              else copy.splice(i, 1);

              onUpdate(
                normalize({
                  ...node,
                  conditions: copy,
                }),
              );
            }}
            onRemove={() => {
              const copy = node.conditions.filter((_, idx) => idx !== i);
              onUpdate(
                normalize({
                  ...node,
                  conditions: copy,
                }),
              );
            }}
          />
        ))}

        {/* ACTION BUTTONS — ALWAYS VISIBLE */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            className="text-xs border px-2 py-1"
            onClick={() =>
              onUpdate({
                ...node,
                conditions: [
                  ...node.conditions,
                  {
                    type: "condition",
                    fieldKey: fields[0]?.meta.key ?? "",
                    operator: "EQUALS",
                    value: "",
                  },
                ],
              })
            }
          >
            ➕ Condition
          </button>

          <button
            type="button"
            className="text-xs border px-2 py-1"
            onClick={() =>
              onUpdate({
                ...node,
                conditions: [
                  ...node.conditions,
                  {
                    type: "group",
                    logic: "AND",
                    conditions: [],
                  },
                ],
              })
            }
          >
            ➕ Group
          </button>
        </div>
      </div>
    );
  }

  /* ---------- CONDITION ---------- */
  return (
    <div className="flex gap-2 items-center">
      <select
        className="border p-2 text-sm"
        value={node.fieldKey}
        onChange={(e) =>
          onUpdate({ ...node, fieldKey: e.target.value, value: "" })
        }
      >
        {fields.map((f) => (
          <option key={f.meta.key} value={f.meta.key}>
            {f.meta.label}
          </option>
        ))}
      </select>

      <select
        className="border p-2 text-sm"
        value={node.operator}
        onChange={(e) =>
          onUpdate({
            ...node,
            operator: e.target.value as any,
          })
        }
      >
        {Object.entries(OP_LABEL).map(([op, label]) => (
          <option key={op} value={op}>
            {label}
          </option>
        ))}
      </select>

      <input
        className="border p-2 text-sm"
        value={node.value ?? ""}
        onChange={(e) =>
          onUpdate({
            ...node,
            value: e.target.value,
          })
        }
      />

      <button type="button" className="text-red-500 text-xs" onClick={onRemove}>
        ✕
      </button>
    </div>
  );
}

/* ======================================================
   ROOT BUILDER
====================================================== */

export function VisibilityRuleBuilder({ value, onChange }: Props) {
  const root: VisibilityGroup = value ?? {
    type: "group",
    logic: "AND",
    conditions: [],
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Visibility</h4>

      <ConditionNode
        node={root}
        onUpdate={(next) =>
          onChange(next ? (next as VisibilityRule) : undefined)
        }
        onRemove={() => onChange(undefined)}
      />
    </div>
  );
}
