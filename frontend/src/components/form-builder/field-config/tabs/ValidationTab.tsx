// import { useFormBuilderStore } from "../../state/useFormBuilderStore";

// export function ValidationTab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const rules = field.validation?.rules ?? [];

//   function setRules(newRules: any[]) {
//     updateField(field.meta.key, {
//       validation: { rules: newRules },
//     });
//   }

//   function toggleRule(type: string, rule: any) {
//     setRules(
//       rules.some((r: any) => r.type === type)
//         ? rules.filter((r: any) => r.type !== type)
//         : [...rules, rule]
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">Validation</h4>

//       {/* Required */}
//       <label className="flex items-center gap-2 text-sm">
//         <input
//           type="checkbox"
//           checked={rules.some((r: any) => r.type === "REQUIRED")}
//           onChange={() =>
//             toggleRule("REQUIRED", {
//               type: "REQUIRED",
//               message: "Required",
//             })
//           }
//         />
//         Required
//       </label>

//       {/* Email */}
//       <label className="flex items-center gap-2 text-sm">
//         <input
//           type="checkbox"
//           checked={rules.some((r: any) => r.type === "EMAIL")}
//           onChange={() =>
//             toggleRule("EMAIL", {
//               type: "EMAIL",
//               message: "Invalid email",
//             })
//           }
//         />
//         Email format
//       </label>

//       {/* Regex */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Regex pattern"
//         value={
//           rules.find((r: any) => r.type === "REGEX")?.params?.regex ?? ""
//         }
//         onChange={(e) =>
//           setRules([
//             ...rules.filter((r: any) => r.type !== "REGEX"),
//             {
//               type: "REGEX",
//               params: { regex: e.target.value },
//               message: "Invalid format",
//             },
//           ])
//         }
//       />

//       {/* Min / Max (NUMBER) */}
//       {field.data.type === "NUMBER" && (
//         <div className="grid grid-cols-2 gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             className="border p-2"
//             onChange={(e) =>
//               setRules([
//                 ...rules.filter((r: any) => r.type !== "MIN"),
//                 {
//                   type: "MIN",
//                   params: { min: Number(e.target.value) },
//                   message: "Too small",
//                 },
//               ])
//             }
//           />

//           <input
//             type="number"
//             placeholder="Max"
//             className="border p-2"
//             onChange={(e) =>
//               setRules([
//                 ...rules.filter((r: any) => r.type !== "MAX"),
//                 {
//                   type: "MAX",
//                   params: { max: Number(e.target.value) },
//                   message: "Too large",
//                 },
//               ])
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }
import { useFormBuilderStore } from "../../state/useFormBuilderStore";

export function ValidationTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);
  const rules = field.validation?.rules ?? [];

  function setRules(newRules: any[]) {
    updateField(field.meta.key, {
      validation: { rules: newRules },
    });
  }

  function toggleRule(type: string, rule: any) {
    setRules(
      rules.some((r: any) => r.type === type)
        ? rules.filter((r: any) => r.type !== type)
        : [...rules, rule]
    );
  }

  const hasRequired = rules.some((r: any) => r.type === "REQUIRED");
  const hasEmail = rules.some((r: any) => r.type === "EMAIL");
  const regexValue = rules.find((r: any) => r.type === "REGEX")?.params?.regex ?? "";
  const minValue = rules.find((r: any) => r.type === "MIN")?.params?.min ?? "";
  const maxValue = rules.find((r: any) => r.type === "MAX")?.params?.max ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
          Validation Rules
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Define rules to ensure data quality and integrity
        </p>
      </div>

      {/* Basic Validation Rules */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          Basic Rules
        </h4>
        
        <div className="space-y-2">
          {/* Required */}
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
            onClick={() =>
              toggleRule("REQUIRED", {
                type: "REQUIRED",
                message: "Required",
              })
            }
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${hasRequired ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}>
                {hasRequired && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Required Field
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  User must provide a value
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="sr-only"
              checked={hasRequired}
              readOnly
            />
          </div>

          {/* Email */}
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
            onClick={() =>
              toggleRule("EMAIL", {
                type: "EMAIL",
                message: "Invalid email",
              })
            }
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${hasEmail ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}>
                {hasEmail && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Validation
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Must be a valid email format
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="sr-only"
              checked={hasEmail}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Custom Validation */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          Custom Rules
        </h4>
        
        <div className="space-y-2">
          {/* Regex */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pattern (Regular Expression)
            </label>
            <input
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
              placeholder="Enter regex pattern (e.g., ^[A-Za-z]+$)"
              value={regexValue}
              onChange={(e) =>
                setRules([
                  ...rules.filter((r: any) => r.type !== "REGEX"),
                  {
                    type: "REGEX",
                    params: { regex: e.target.value },
                    message: "Invalid format",
                  },
                ])
              }
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Value must match this pattern
            </p>
          </div>
        </div>
      </div>

      {/* Numeric Range (for NUMBER type) */}
      {field.data.type === "NUMBER" && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Numeric Range
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Value
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="Min value"
                value={minValue}
                onChange={(e) =>
                  setRules([
                    ...rules.filter((r: any) => r.type !== "MIN"),
                    {
                      type: "MIN",
                      params: { min: Number(e.target.value) },
                      message: "Too small",
                    },
                  ])
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Maximum Value
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="Max value"
                value={maxValue}
                onChange={(e) =>
                  setRules([
                    ...rules.filter((r: any) => r.type !== "MAX"),
                    {
                      type: "MAX",
                      params: { max: Number(e.target.value) },
                      message: "Too large",
                    },
                  ])
                }
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Set minimum and maximum allowed values
          </p>
        </div>
      )}

      {/* Active Rules Summary */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Active Rules
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
            {rules.length} of 4
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {rules.length === 0 ? (
            <span className="text-xs text-gray-500 dark:text-gray-400 italic">
              No validation rules applied
            </span>
          ) : (
            rules.map((rule: any) => (
              <span
                key={rule.type}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {rule.type.toLowerCase()}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}