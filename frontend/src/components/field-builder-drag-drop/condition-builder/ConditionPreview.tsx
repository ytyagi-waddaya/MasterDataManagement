// import { ConditionNode } from "../contracts/condition.contract";
// import { getSampleValue } from "./condition.helpers";
// import { FieldMeta } from "./ConditionGroupView";
// import { evaluateCondition } from "./evaluateCondition";
// import { conditionToSummary } from "./conditionSummary";

// export function ConditionPreview({
//   condition,
//   fields,
// }: {
//   condition: ConditionNode;
//   fields: readonly FieldMeta[];
// }) {
//   const sampleValues = Object.fromEntries(
//     fields.map((f) => [f.key, getSampleValue(f.type)])
//   );

//   const result = evaluateCondition(condition, sampleValues);
//   const summary = conditionToSummary(condition, fields);

//   return (
//     <div className="mt-4 rounded-md border p-3 bg-muted/30 space-y-2">
//       {/* Summary */}
//       <div className="text-sm font-medium">
//         <span className="text-muted-foreground">Show if </span>
//         {summary}
//       </div>

//       {/* Sample values */}
//       <pre className="text-xs bg-background p-2 rounded">
//         {JSON.stringify(sampleValues, null, 2)}
//       </pre>

//       {/* Result */}
//       <div
//         className={`text-sm font-medium ${
//           result ? "text-green-600" : "text-red-500"
//         }`}
//       >
//         {result
//           ? "✔ Field will be visible"
//           : "✖ Field will be hidden"}
//       </div>
//     </div>
//   );
// }


import { ConditionNode } from "../contracts/condition.contract";
import { getSampleValue } from "./condition.helpers";
import { evaluateCondition } from "./evaluateCondition";
import { conditionToSummary } from "./conditionSummary";
import { Eye, EyeOff, CheckCircle, XCircle, Code } from "lucide-react";
import { FieldMeta } from "./condition.types";
import { ConditionFieldRef } from "./condition-field-ref";

export function ConditionPreview({
  condition,
  fields,
}: {
  condition: ConditionNode;
  fields: readonly ConditionFieldRef[];
}) {
  const sampleValues = Object.fromEntries(
    fields.map((f) => [f.key, getSampleValue(f.type)])
  );

  const result = evaluateCondition(condition, sampleValues);
  const summary = conditionToSummary(condition, fields);

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-gray-500" />
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Preview & Test
        </div>
      </div>

      {/* Summary */}
      <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="flex items-start gap-2">
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-0.5">
            Show if:
          </div>
          <div className="text-sm text-gray-800 dark:text-gray-200 font-mono flex-1">
            {summary}
          </div>
        </div>
      </div>

      {/* Sample Values */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-gray-500" />
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Test Values
          </div>
        </div>
        <div className="relative">
          <pre className="
            text-xs p-3 rounded-lg border 
            border-gray-200 dark:border-gray-800
            bg-white dark:bg-gray-900
            overflow-x-auto
            font-mono
          ">
            {JSON.stringify(sampleValues, null, 2)}
          </pre>
          <div className="absolute top-2 right-2 text-xs text-gray-400 dark:text-gray-500">
            {Object.keys(sampleValues).length} fields
          </div>
        </div>
      </div>

      {/* Result */}
      <div className={`
        flex items-center gap-3 p-3 rounded-lg border
        ${result 
          ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20" 
          : "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20"
        }
      `}>
        {result ? (
          <>
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
            <div className="flex-1">
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                Field will be visible
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                Condition is satisfied with test values
              </div>
            </div>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
            <div className="flex-1">
              <div className="text-sm font-medium text-red-700 dark:text-red-300">
                Field will be hidden
              </div>
              <div className="text-xs text-red-600 dark:text-red-400">
                Condition is not satisfied with test values
              </div>
            </div>
          </>
        )}
        <div className="text-xs px-2 py-1 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          {result ? "Visible" : "Hidden"}
        </div>
      </div>

      {/* Explanation */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Preview shows how the condition evaluates with sample values.
        Actual visibility depends on real form data at runtime.
      </div>
    </div>
  );
}