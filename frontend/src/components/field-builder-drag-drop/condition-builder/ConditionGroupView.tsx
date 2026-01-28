// import { ConditionNode, ConditionGroup } from "../contracts/condition.contract";
// import {
//   addGroup,
//   addRule,
//   removeChild,
//   updateChild,
// } from "./condition.helpers";
// import { ConditionRuleRow } from "./ConditionRuleRow";
// import { FieldKey } from "../contracts/condition.contract";
// import { FieldDataType } from "./condition-ui.schema";

// export type FieldMeta = {
//   key: FieldKey;
//   label: string;
//   type: FieldDataType;
// };

// export function ConditionGroupView({
//   node,
//   onChange,
//   onDelete,
//   fields,
// }: {
//   node: ConditionNode;
//   onChange: (n: ConditionNode) => void;
//   onDelete?: () => void;
//   fields: readonly FieldMeta[];
// }) {
//   /* ================= RULE ================= */
//   if (node.kind === "RULE") {
//     return (
//       <ConditionRuleRow
//         rule={node}
//         fields={fields}
//         onChange={onChange}
//         onDelete={onDelete ?? (() => {})}
//       />
//     );
//   }

//   {
//     /* ================= GROUP ================= */
//   }
//   const group = node;

//   const fallbackField = fields[0]?.key ?? ("" as FieldKey);

//   return (
//     <div className="rounded-md border-l-2 border-primary/30 pl-4 space-y-3">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <span className="text-xs text-muted-foreground">Match</span>

//           <select
//             value={group.combinator}
//             onChange={(e) =>
//               onChange({
//                 ...group,
//                 combinator: e.target.value as "AND" | "OR",
//               })
//             }
//             className="rounded border px-2 py-1 text-xs"
//           >
//             <option value="AND">ALL conditions</option>
//             <option value="OR">ANY condition</option>
//           </select>
//         </div>

//         {onDelete && (
//           <button
//             className="text-xs text-red-500 hover:text-red-600"
//             onClick={() => {
//               if (
//                 node.kind === "GROUP" &&
//                 node.children.length > 1 &&
//                 !confirm("Delete this group and all its conditions?")
//               ) {
//                 return;
//               }

//               onDelete();
//             }}
//           >
//             ✕
//           </button>
//         )}
//       </div>

//       {/* Children */}
//       <div className="space-y-2">
//         {group.children.map((child, index) => (
//           <ConditionGroupView
//             key={child.id}
//             node={child}
//             fields={fields}
//             onChange={(updated) => onChange(updateChild(group, index, updated))}
//             onDelete={() => onChange(removeChild(group, index, fallbackField))}
//           />
//         ))}
//       </div>

//       {/* Actions */}
//       {/* Actions */}
//       <div className="flex gap-2 pt-2">
//         <button
//           className="text-xs px-2 py-1 rounded border hover:bg-muted"
//           onClick={() => onChange(addRule(group, fallbackField))}
//         >
//           + Add condition
//         </button>

//         <button
//           className="text-xs px-2 py-1 rounded border hover:bg-muted"
//           onClick={() => onChange(addGroup(group, fallbackField))}
//         >
//           + Add group
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { ConditionNode, ConditionGroup, FieldKey } from "../contracts/condition.contract";
// import {
//   addGroup,
//   addRule,
//   removeChild,
//   updateChild,
// } from "./condition.helpers";
// import { ConditionRuleRow } from "./ConditionRuleRow";
// import clsx from "clsx";
// import { FieldDataType } from "./condition-ui.schema";

// export type FieldMeta = {
//   key: FieldKey
//   label: string;
//   type: FieldDataType;
// };
// export function ConditionGroupView({
//   node,
//   onChange,
//   onDelete,
//   fields,
//   depth = 0,
// }: {
//   node: ConditionNode;
//   onChange: (n: ConditionNode) => void;
//   onDelete?: () => void;
//   fields: readonly FieldMeta[];
//   depth?: number;
// }) {
//   /* ================= RULE ================= */
//   if (node.kind === "RULE") {
//     return (
//       <div className="relative pl-6">
//         {/* tree elbow */}
//         <span className="absolute left-2 top-3 h-px w-3 bg-muted-foreground/40" />

//         <ConditionRuleRow
//           rule={node}
//           fields={fields}
//           onChange={onChange}
//           onDelete={onDelete ?? (() => {})}
//         />
//       </div>
//     );
//   }

//   /* ================= GROUP ================= */
//   const group = node as ConditionGroup;
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div
//       className={clsx(
//         "relative pl-6 space-y-3",
//         depth > 0 && "border-l border-muted-foreground/30"
//       )}
//     >
//       {/* vertical line */}
//       {depth > 0 && (
//         <span className="absolute left-2 top-0 bottom-0 w-px bg-muted-foreground/30" />
//       )}

//       {/* ================= HEADER ================= */}
//       <div className="flex items-center gap-2 text-xs">
//         <button
//           onClick={() => setCollapsed((v) => !v)}
//           className="w-5 h-5 flex items-center justify-center rounded hover:bg-muted"
//         >
//           {collapsed ? "▶" : "▼"}
//         </button>

//         <span className="text-muted-foreground">Match</span>

//         <select
//           value={group.combinator}
//           onChange={(e) =>
//             onChange({
//               ...group,
//               combinator: e.target.value as "AND" | "OR",
//             })
//           }
//           className="rounded border px-2 py-1 text-xs bg-background"
//         >
//           <option value="AND">ALL</option>
//           <option value="OR">ANY</option>
//         </select>

//         {onDelete && (
//           <button
//             className="ml-auto text-red-500 hover:text-red-600"
//             onClick={() => {
//               if (
//                 group.children.length > 1 &&
//                 !confirm("Delete this group and all its conditions?")
//               )
//                 return;
//               onDelete();
//             }}
//           >
//             ✕
//           </button>
//         )}
//       </div>

//       {/* ================= CHILDREN ================= */}
//       {!collapsed && (
//         <div className="space-y-2">
//           {group.children.map((child, index) => (
//             <ConditionGroupView
//               key={child.id}
//               node={child}
//               fields={fields}
//               depth={depth + 1}
//               onChange={(updated) =>
//                 onChange(updateChild(group, index, updated))
//               }
//               onDelete={() =>
//                 onChange(removeChild(group, index, fields[0]?.key))
//               }
//             />
//           ))}
//         </div>
//       )}

//       {/* ================= ACTIONS ================= */}
//       {!collapsed && (
//         <div className="flex gap-2 pt-1">
//           <button
//             className="text-xs px-2 py-1 rounded border hover:bg-muted"
//             onClick={() => onChange(addRule(group, fields[0]?.key))}
//           >
//             + Condition
//           </button>

//           <button
//             className="text-xs px-2 py-1 rounded border hover:bg-muted"
//             onClick={() => onChange(addGroup(group, fields[0]?.key))}
//           >
//             + Group
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { ConditionNode, ConditionGroup} from "../contracts/condition.contract";
import {
  addGroup,
  addRule,
  removeChild,
  updateChild,
} from "./condition.helpers";
import { ConditionRuleRow } from "./ConditionRuleRow";
import { Plus, ChevronDown, ChevronRight, X, FolderPlus } from "lucide-react";
import { FieldMeta } from "./condition.types";
import { ConditionFieldRef } from "./condition-field-ref";


export function ConditionGroupView({
  node,
  onChange,
  onDelete,
  fields,
  depth = 0,
}: {
  node: ConditionNode;
  onChange: (n: ConditionNode) => void;
  onDelete?: () => void;
  fields: readonly ConditionFieldRef[];
  depth?: number;
}) {
  /* ================= RULE ================= */
  if (node.kind === "RULE") {
    return (
      <div className="relative pl-5">
        {/* Tree indicator line */}
        <div className="absolute left-2 top-1/2 w-3 h-px bg-gray-300 dark:bg-gray-700 transform -translate-y-1/2" />
        
        <ConditionRuleRow
          rule={node}
          fields={fields}
          onChange={onChange}
          onDelete={onDelete ?? (() => {})}
        />
      </div>
    );
  }

  /* ================= GROUP ================= */
  const group = node as ConditionGroup;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`relative pl-5 space-y-3 ${
        depth > 0 ? "border-l border-gray-200 dark:border-gray-800" : ""
      }`}
    >
      {/* Vertical line for nested groups */}
      {depth > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
      )}

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white dark:hover:bg-gray-700 transition-colors"
          title={collapsed ? "Expand group" : "Collapse group"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Match
          </span>
          
          <select
            value={group.combinator}
            onChange={(e) =>
              onChange({
                ...group,
                combinator: e.target.value as "AND" | "OR",
              })
            }
            className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <option value="AND">All of the following</option>
            <option value="OR">Any of the following</option>
          </select>
        </div>

        {onDelete && (
          <button
            className="ml-auto p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              if (
                group.children.length > 1 &&
                !confirm("Delete this group and all its conditions?")
              )
                return;
              onDelete();
            }}
            title="Delete group"
          >
            <X className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
          </button>
        )}
      </div>

      {/* ================= CHILDREN ================= */}
      {!collapsed && (
        <div className="space-y-2 pl-2">
          {group.children.map((child, index) => (
            <ConditionGroupView
              key={child.id}
              node={child}
              fields={fields}
              depth={depth + 1}
              onChange={(updated) =>
                onChange(updateChild(group, index, updated))
              }
              onDelete={() =>
                onChange(removeChild(group, index, fields[0]?.key))
              }
            />
          ))}
        </div>
      )}

      {/* ================= ACTIONS ================= */}
      {!collapsed && (
        <div className="flex gap-2 pl-2">
          <button
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => onChange(addRule(group, fields[0]?.key))}
          >
            <Plus className="h-3 w-3" />
            <span>Add Condition</span>
          </button>

          <button
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => onChange(addGroup(group, fields[0]?.key))}
          >
            <FolderPlus className="h-3 w-3" />
            <span>Add Group</span>
          </button>
        </div>
      )}
    </div>
  );
}