// import { EditorNode } from "../../contracts/editor.contract";

// export function ValidationTab({
//   node,
//   onChange,
// }: {
//   node: Extract<EditorNode, { kind: "FIELD" }>;
//   onChange: (node: EditorNode) => void;
// }) {
//   return (
//     <div className="text-sm">
//       <label className="flex gap-2">
//         <input
//           type="checkbox"
//           checked={node.field.required ?? false}
//           onChange={(e) =>
//             onChange({
//               ...node,
//               field: {
//                 ...node.field,
//                 required: e.target.checked,
//               },
//             })
//           }
//         />
//         Required
//       </label>
//     </div>
//   );
// }
import { EditorNode } from "../../contracts/editor.contract";
import { EditorFieldType } from "../../contracts/fieldPalette.contract";
import { Shield, AlertCircle, Hash, Type, Mail, Globe, Phone, CheckSquare, List, Calendar } from "lucide-react";

export function ValidationTab({
  node,
  onChange,
}: {
  node: Extract<EditorNode, { kind: "FIELD" }>;
  onChange: (node: EditorNode) => void;
}) {
  const f = node.field;
  const fieldType = f.type as EditorFieldType;
  const validation = f.validation || {};

  function update(patch: Partial<typeof f>) {
    onChange({
      ...node,
      field: { ...f, ...patch },
    });
  }

  function updateValidation(patch: Partial<typeof validation>) {
    update({
      validation: { ...validation, ...patch }
    });
  }

  const isTextBased = ["text", "textarea", "email", "phone", "url", "password"].includes(fieldType);
  const isNumberBased = ["number", "currency", "percentage"].includes(fieldType);
  const canHavePattern = ["text", "textarea", "email", "phone", "url", "password"].includes(fieldType);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Shield className="h-4 w-4 text-gray-500" />
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Validation Rules
        </div>
      </div>

      {/* Required */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-4 w-4 text-gray-500" />
          <div>
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Required
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              User must fill this field
            </div>
          </div>
        </div>
        <button
          onClick={() => update({ required: !f.required })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            f.required ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              f.required ? "translate-x-6" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Min/Max Length for text fields */}
      {isTextBased && (
        <div className="space-y-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-gray-500" />
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Length Limits
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                Min Length
              </label>
              <input
                type="number"
                min="0"
                value={f.min ?? ""}
                onChange={(e) => update({ 
                  min: e.target.value ? Number(e.target.value) : undefined 
                })}
                placeholder="No limit"
                className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                Max Length
              </label>
              <input
                type="number"
                min="1"
                value={f.max ?? ""}
                onChange={(e) => update({ 
                  max: e.target.value ? Number(e.target.value) : undefined 
                })}
                placeholder="No limit"
                className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Min/Max for number fields */}
      {isNumberBased && (
        <div className="space-y-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-500" />
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Value Range
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                Minimum
              </label>
              <input
                type="number"
                value={validation.min ?? ""}
                onChange={(e) => updateValidation({ 
                  min: e.target.value ? Number(e.target.value) : undefined 
                })}
                placeholder="No limit"
                className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                Maximum
              </label>
              <input
                type="number"
                value={validation.max ?? ""}
                onChange={(e) => updateValidation({ 
                  max: e.target.value ? Number(e.target.value) : undefined 
                })}
                placeholder="No limit"
                className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Pattern/Regex validation */}
      {canHavePattern && (
        <div className="space-y-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-500" />
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Pattern Validation
            </div>
          </div>
          
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Regular Expression
            </label>
            <input
              value={validation.regex ?? ""}
              onChange={(e) => updateValidation({ regex: e.target.value || undefined })}
              placeholder="e.g., ^[A-Za-z]+$"
              className="w-full  px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 font-mono text-xs"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Leave empty for no pattern validation
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Error Message
            </label>
            <input
              value={f.patternMessage ?? ""}
              onChange={(e) => update({ patternMessage: e.target.value || undefined })}
              placeholder="Value must match the required pattern"
              className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      )}

      {/* Field-specific validations */}
      <div className="space-y-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Field-Specific Rules
        </div>
        
        {/* Email validation */}
        {fieldType === "email" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Must be a valid email
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              Auto
            </div>
          </div>
        )}

        {/* URL validation */}
        {fieldType === "url" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Must be a valid URL
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              Auto
            </div>
          </div>
        )}

        {/* Phone validation */}
        {fieldType === "phone" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Must be a valid phone number
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              Auto
            </div>
          </div>
        )}

        {/* Date validation */}
        {(fieldType === "date" || fieldType === "datetime") && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Must be a valid date
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              Auto
            </div>
          </div>
        )}
      </div>

      {/* Custom Error Message */}
      <div className="space-y-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-gray-500" />
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Custom Error Message
          </div>
        </div>
        
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
            Error shown when validation fails
          </label>
          <input
            value={f.errorMessage ?? ""}
            onChange={(e) => update({ errorMessage: e.target.value || undefined })}
            placeholder="Please enter a valid value"
            className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
        </div>
      </div>
    </div>
  );
}