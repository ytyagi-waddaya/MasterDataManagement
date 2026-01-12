



// export function ConditionRuleRow({
//   rule,
//   onChange,
//   onDelete,
//   fields,
// }: {
//   rule: ConditionLeaf;
//   onChange: (r: ConditionLeaf) => void;
//   onDelete: () => void;
//   fields: readonly FieldMeta[];
// }) {
//   const fieldMeta = fields.find((f) => f.key === rule.field);
//   const operators = fieldMeta
//     ? getOperatorsForFieldType(fieldMeta.type)
//     : [];

//   const safeOperator =
//     operators.find((op) => op.operator === rule.operator)?.operator ??
//     operators[0]?.operator;

//   const operatorMeta = CONDITION_OPERATORS_UI.find(
//     (o) => o.operator === safeOperator
//   );

//   return (
//     <div className="flex items-center gap-2 w-full">
//       {/* FIELD */}
//       <select
//         className="rounded-md border px-2 py-1 text-sm"
//         value={rule.field}
//         onChange={(e) =>
//           onChange(
//             createRuleForOperator(
//               e.target.value as FieldKey,
//               "EXISTS"
//             )
//           )
//         }
//       >
//         {fields.map((f) => (
//           <option key={f.key} value={f.key}>
//             {f.label}
//           </option>
//         ))}
//       </select>

//       {/* OPERATOR */}
//       <select
//         className="rounded-md border px-2 py-1 text-sm"
//         value={safeOperator}
//         onChange={(e) =>
//           onChange(
//             changeOperator(
//               rule,
//               e.target.value as ConditionLeaf["operator"]
//             )
//           )
//         }
//       >
//         {operators.map((op) => (
//           <option key={op.operator} value={op.operator}>
//             {op.label}
//           </option>
//         ))}
//       </select>

//       {/* VALUE */}
//       {operatorMeta?.requiresValue &&
//         operatorMeta.inputType !== "NONE" &&
//         "value" in rule && (
//           <div className="flex-1">
//             <ValueInput
//               type={operatorMeta.inputType}
//               value={rule.value as any}
//               onChange={(v) =>
//                 onChange({ ...rule, value: v })
//               }
//             />
//           </div>
//         )}

//       {/* DELETE */}
//       <button
//         onClick={onDelete}
//         className="text-muted-foreground hover:text-red-500 text-sm"
//         title="Remove condition"
//       >
//         ✕
//       </button>
//     </div>
//   );
// }


// export function ConditionRuleRow({
//   rule,
//   onChange,
//   onDelete,
//   fields,
// }: {
//   rule: ConditionLeaf;
//   onChange: (r: ConditionLeaf) => void;
//   onDelete: () => void;
//   fields: readonly FieldMeta[];
// }) {
//   const fieldMeta = fields.find((f) => f.key === rule.field);
//   const operators = fieldMeta
//     ? getOperatorsForFieldType(fieldMeta.type)
//     : [];

//   const safeOperator =
//     operators.find((op) => op.operator === rule.operator)?.operator ??
//     operators[0]?.operator;

//   const operatorMeta = CONDITION_OPERATORS_UI.find(
//     (o) => o.operator === safeOperator
//   );

//   return (
//     <div className="
//       flex items-center gap-2
//       rounded-md border bg-background
//       px-2 py-1
//       hover:bg-muted/40
//     ">
//       <select className="text-sm border rounded px-2 py-1">
//         {fields.map((f) => (
//           <option key={f.key} value={f.key}>
//             {f.label}
//           </option>
//         ))}
//       </select>

//       <select className="text-sm border rounded px-2 py-1">
//         {operators.map((op) => (
//           <option key={op.operator} value={op.operator}>
//             {op.label}
//           </option>
//         ))}
//       </select>

//       {operatorMeta?.requiresValue &&
//         operatorMeta.inputType !== "NONE" &&
//         "value" in rule && (
//           <ValueInput
//             type={operatorMeta.inputType}
//             value={rule.value as any}
//             onChange={(v) =>
//               onChange({ ...rule, value: v })
//             }
//           />
//         )}

//       <button
//         onClick={onDelete}
//         className="text-muted-foreground hover:text-red-500"
//         title="Remove"
//       >
//         ✕
//       </button>
//     </div>
//   );
// }


// import {
//   CONDITION_OPERATORS_UI,
//   getOperatorsForFieldType,
//   FieldDataType,
// } from "./condition-ui.schema";
// import { createRuleForOperator, changeOperator } from "./condition.helpers";
// import { ConditionLeaf, FieldKey } from "../contracts/condition.contract";
// import { ValueInput } from "./ValueInput";

// import { X } from "lucide-react";

// type FieldMeta = {
//   key: FieldKey;
//   label: string;
//   type: FieldDataType;
// };

// export function ConditionRuleRow({
//   rule,
//   onChange,
//   onDelete,
//   fields,
// }: {
//   rule: ConditionLeaf;
//   onChange: (r: ConditionLeaf) => void;
//   onDelete: () => void;
//   fields: readonly FieldMeta[];
// }) {
//   const fieldMeta = fields.find((f) => f.key === rule.field);
//   const operators = fieldMeta
//     ? getOperatorsForFieldType(fieldMeta.type)
//     : [];

//   const safeOperator =
//     operators.find((op) => op.operator === rule.operator)?.operator ??
//     operators[0]?.operator;

//   const operatorMeta = CONDITION_OPERATORS_UI.find(
//     (o) => o.operator === safeOperator
//   );

//   return (
//     <div className="
//       flex items-center gap-2
//       rounded-lg border border-gray-200 dark:border-gray-800
//       px-3 py-2
//       hover:border-gray-300 dark:hover:border-gray-700
//       transition-colors
//     ">
//       {/* Field Selector */}
//       <select
//         value={rule.field}
//         onChange={(e) => onChange({ ...rule, field: e.target.value })}
//         className="
//           text-sm px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700
//           bg-white dark:bg-gray-900
//           min-w-[140px]
//         "
//       >
//         {fields.map((f) => (
//           <option key={f.key} value={f.key}>
//             {f.label}
//           </option>
//         ))}
//       </select>

//       {/* Operator Selector */}
//       <select
//         value={safeOperator}
//         onChange={(e) => onChange({ ...rule, operator: e.target.value as any })}
//         className="
//           text-sm px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700
//           bg-white dark:bg-gray-900
//           min-w-[100px]
//         "
//       >
//         {operators.map((op) => (
//           <option key={op.operator} value={op.operator}>
//             {op.label}
//           </option>
//         ))}
//       </select>

//       {/* Value Input */}
//       {operatorMeta?.requiresValue &&
//         operatorMeta.inputType !== "NONE" &&
//         "value" in rule && (
//           <div className="flex-1 min-w-[120px]">
//             <ValueInput
//               type={operatorMeta.inputType}
//               value={rule.value as any}
//               onChange={(v) =>
//                 onChange({ ...rule, value: v })
//               }
//             />
//           </div>
//         )}

//       {/* Delete Button */}
//       <button
//         onClick={onDelete}
//         className="
//           p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800
//           transition-colors
//         "
//         title="Remove condition"
//       >
//         <X className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
//       </button>
//     </div>
//   );
// }

import {
  CONDITION_OPERATORS_UI,
  getOperatorsForFieldType,
  FieldDataType,
} from "./condition-ui.schema";
import { createRuleForOperator, changeOperator } from "./condition.helpers";
import { ConditionLeaf, FieldKey } from "../contracts/condition.contract";
import { ValueInput } from "./ValueInput";

import { X } from "lucide-react";
import { FieldMeta } from "./condition.types";


export function ConditionRuleRow({
  rule,
  onChange,
  onDelete,
  fields,
}: {
  rule: ConditionLeaf;
  onChange: (r: ConditionLeaf) => void;
  onDelete: () => void;
  fields: readonly FieldMeta[];
}) {
  const fieldMeta = fields.find((f) => f.key === rule.field);
  const operators = fieldMeta
    ? getOperatorsForFieldType(fieldMeta.type)
    : [];

  const safeOperator =
    operators.find((op) => op.operator === rule.operator)?.operator ??
    operators[0]?.operator;

  const operatorMeta = CONDITION_OPERATORS_UI.find(
    (o) => o.operator === safeOperator
  );

  return (
    <div className="
      flex flex-wrap gap-2
      rounded-lg border border-gray-200 dark:border-gray-800
      p-3
      hover:border-gray-300 dark:hover:border-gray-700
      transition-colors
    ">
      {/* First row: Field and Operator */}
      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
        <select
          value={rule.field}
          onChange={(e) => onChange({ ...rule, field: e.target.value as FieldKey })}
          className="
            text-sm px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900
            flex-1
          "
        >
          {fields.map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          value={safeOperator}
          onChange={(e) => onChange({ ...rule, operator: e.target.value as any })}
          className="
            text-sm px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900
            min-w-[100px]
          "
        >
          {operators.map((op) => (
            <option key={op.operator} value={op.operator}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      {/* Second row: Value Input or spacer */}
      {operatorMeta?.requiresValue &&
        operatorMeta.inputType !== "NONE" &&
        "value" in rule && (
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <div className="flex-1">
              <ValueInput
                type={operatorMeta.inputType}
                value={rule.value as any}
                onChange={(v) =>
                  onChange({ ...rule, value: v })
                }
              />
            </div>
            <button
              onClick={onDelete}
              className="
                p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors hrink-0
              "
              title="Remove condition"
            >
              <X className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
        )}

      {/* Delete button when no value input */}
      {(!operatorMeta?.requiresValue || operatorMeta.inputType === "NONE") && (
        <button
          onClick={onDelete}
          className="
            p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800
            transition-colors self-start ml-auto
          "
          title="Remove condition"
        >
          <X className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
        </button>
      )}
    </div>
  );
}