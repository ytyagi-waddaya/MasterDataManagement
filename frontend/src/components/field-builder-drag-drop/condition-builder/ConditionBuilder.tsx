// "use client";

// import { ConditionNode } from "../contracts/condition.contract";
// import { ConditionGroupView, FieldMeta } from "./ConditionGroupView";
// import { ConditionPreview } from "./ConditionPreview";

// export function ConditionBuilder({
//   value,
//   onChange,
//   fields,
// }: {
//   value: ConditionNode;
//   onChange: (v: ConditionNode) => void;
//   fields: readonly FieldMeta[];
// }) {
//   return (
//     <div className="rounded-md border bg-background p-4 space-y-3">
//       <div className="text-xs font-medium text-muted-foreground">
//         Show this field when
//       </div>

//       <ConditionGroupView node={value} onChange={onChange} fields={fields} />
//       <ConditionPreview condition={value} fields={fields} />
//     </div>
//   );
// }

"use client";

import { ConditionNode } from "../contracts/condition.contract";
import { FieldMeta } from "./condition.types";
import { ConditionGroupView } from "./ConditionGroupView";
import { ConditionPreview } from "./ConditionPreview";
import { Filter } from "lucide-react";

export function ConditionBuilder({
  value,
  onChange,
  fields,
}: {
  value: ConditionNode;
  onChange: (v: ConditionNode) => void;
  fields: readonly FieldMeta[];
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Condition Builder
        </div>
      </div>

      {/* Instruction */}
      <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Show this field when:
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Set up conditions using the rules below. The field will only be visible when all conditions are met.
        </p>
      </div>

      {/* Condition Editor */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <ConditionGroupView node={value} onChange={onChange} fields={fields} />
      </div>

      {/* Preview */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800">
        <ConditionPreview condition={value} fields={fields} />
      </div>
    </div>
  );
}