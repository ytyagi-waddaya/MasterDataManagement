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

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Validation</h4>

      {/* Required */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={rules.some((r: any) => r.type === "REQUIRED")}
          onChange={() =>
            toggleRule("REQUIRED", {
              type: "REQUIRED",
              message: "Required",
            })
          }
        />
        Required
      </label>

      {/* Email */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={rules.some((r: any) => r.type === "EMAIL")}
          onChange={() =>
            toggleRule("EMAIL", {
              type: "EMAIL",
              message: "Invalid email",
            })
          }
        />
        Email format
      </label>

      {/* Regex */}
      <input
        className="border p-2 w-full"
        placeholder="Regex pattern"
        value={
          rules.find((r: any) => r.type === "REGEX")?.params?.regex ?? ""
        }
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

      {/* Min / Max (NUMBER) */}
      {field.data.type === "NUMBER" && (
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            className="border p-2"
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

          <input
            type="number"
            placeholder="Max"
            className="border p-2"
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
      )}
    </div>
  );
}

// import { useFormBuilderStore } from "../../state/useFormBuilderStore";
// import {
//   CheckCircle,
//   AlertCircle,
//   Mail,
//   Hash,
//   Minus,
//   Plus,
//   Regex,
//   CheckSquare,
//   XCircle,
//   Info,
//   Shield,
//   Zap,
//   ChevronRight
// } from "lucide-react";
// import { useState } from "react";

// export function ValidationTab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const rules = field.validation?.rules ?? [];
//   const [regexInput, setRegexInput] = useState(
//     rules.find((r: any) => r.type === "REGEX")?.params?.regex ?? ""
//   );

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

//   const hasRequired = rules.some((r: any) => r.type === "REQUIRED");
//   const hasEmail = rules.some((r: any) => r.type === "EMAIL");
//   const hasRegex = rules.some((r: any) => r.type === "REGEX");
//   const minRule = rules.find((r: any) => r.type === "MIN");
//   const maxRule = rules.find((r: any) => r.type === "MAX");

//   const getValidationCount = () => {
//     let count = 0;
//     if (hasRequired) count++;
//     if (hasEmail) count++;
//     if (hasRegex) count++;
//     if (minRule) count++;
//     if (maxRule) count++;
//     return count;
//   };

//   return (
//     <div className="space-y-5">
//       {/* Header */}
//       <div>
//         <div className="flex items-center gap-2 mb-1">
//           <Shield className="w-4 h-4 text-gray-500" />
//           <h4 className="text-xs font-semibold text-gray-900 tracking-wide uppercase">Validation Rules</h4>
//         </div>
//         <p className="text-xs text-gray-500">Define rules to validate user input and ensure data quality</p>
//       </div>

//       {/* Validation Status Card */}
//       <div className="bg-linear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <CheckCircle className="w-4 h-4 text-gray-500" />
//             <h5 className="text-xs font-semibold text-gray-900">Validation Status</h5>
//           </div>
//           <span className={`text-[10px] px-2 py-1 rounded-full ${
//             getValidationCount() > 0
//               ? 'bg-green-100 text-green-700 border border-green-200'
//               : 'bg-gray-100 text-gray-700 border border-gray-200'
//           } font-semibold`}>
//             {getValidationCount()} rule{getValidationCount() !== 1 ? 's' : ''} active
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-lg font-bold text-gray-900 mb-1">Field Validation</div>
//             <div className="text-xs text-gray-500">
//               Configure rules to validate user input before submission
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Basic Validation Rules */}
//       <div className="space-y-4">
//         {/* Required Rule */}
//         <div className="bg-white border border-gray-300 rounded-xl p-4 hover:border-gray-400 transition-all duration-200 shadow-sm">
//           <label className="flex items-center justify-between cursor-pointer">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   className="sr-only"
//                   checked={hasRequired}
//                   onChange={() =>
//                     toggleRule("REQUIRED", {
//                       type: "REQUIRED",
//                       message: "This field is required",
//                     })
//                   }
//                 />
//                 <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
//                   hasRequired
//                     ? 'bg-blue-500 border-blue-500'
//                     : 'bg-white border-gray-300'
//                 }`}>
//                   {hasRequired && <CheckSquare className="w-3 h-3 text-white" />}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm font-semibold text-gray-900">Required Field</div>
//                 <div className="text-xs text-gray-500">User must provide a value</div>
//               </div>
//             </div>
//             <div className={`px-2.5 py-1 rounded text-xs font-semibold ${
//               hasRequired
//                 ? 'bg-blue-100 text-blue-700 border border-blue-200'
//                 : 'bg-gray-100 text-gray-600 border border-gray-200'
//             }`}>
//               {hasRequired ? 'Enforced' : 'Optional'}
//             </div>
//           </label>
//         </div>

//         {/* Email Validation */}
//         <div className="bg-white border border-gray-300 rounded-xl p-4 hover:border-gray-400 transition-all duration-200 shadow-sm">
//           <label className="flex items-center justify-between cursor-pointer">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   className="sr-only"
//                   checked={hasEmail}
//                   onChange={() =>
//                     toggleRule("EMAIL", {
//                       type: "EMAIL",
//                       message: "Please enter a valid email address",
//                     })
//                   }
//                 />
//                 <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
//                   hasEmail
//                     ? 'bg-green-500 border-green-500'
//                     : 'bg-white border-gray-300'
//                 }`}>
//                   {hasEmail && <CheckSquare className="w-3 h-3 text-white" />}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm font-semibold text-gray-900">Email Format</div>
//                 <div className="text-xs text-gray-500">Validate email address structure</div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Mail className="w-4 h-4 text-gray-400" />
//               <div className={`px-2.5 py-1 rounded text-xs font-semibold ${
//                 hasEmail
//                   ? 'bg-green-100 text-green-700 border border-green-200'
//                   : 'bg-gray-100 text-gray-600 border border-gray-200'
//               }`}>
//                 {hasEmail ? 'Enabled' : 'Disabled'}
//               </div>
//             </div>
//           </label>
//         </div>
//       </div>

//       {/* Regex Validation */}
//       <div className="bg-linear-to-br from-purple-50/30 to-purple-100/20 border border-purple-200 rounded-xl p-4 shadow-sm">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <Regex className="w-4 h-4 text-purple-600" />
//             <h5 className="text-xs font-semibold text-gray-900">Custom Pattern (Regex)</h5>
//           </div>
//           <span className={`text-[10px] px-2 py-1 rounded-full ${
//             hasRegex
//               ? 'bg-purple-100 text-purple-700 border border-purple-200'
//               : 'bg-gray-100 text-gray-600 border border-gray-200'
//           }`}>
//             {hasRegex ? 'Active' : 'Inactive'}
//           </span>
//         </div>
//         <div className="space-y-3">
//           <input
//             className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 placeholder:text-gray-400 shadow-sm font-mono"
//             placeholder="Enter regex pattern (e.g., ^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$)"
//             value={regexInput}
//             onChange={(e) => {
//               setRegexInput(e.target.value);
//               if (e.target.value.trim()) {
//                 setRules([
//                   ...rules.filter((r: any) => r.type !== "REGEX"),
//                   {
//                     type: "REGEX",
//                     params: { regex: e.target.value },
//                     message: "Value does not match required pattern",
//                   },
//                 ]);
//               } else {
//                 setRules(rules.filter((r: any) => r.type !== "REGEX"));
//               }
//             }}
//           />
//           <div className="flex items-center gap-2 text-xs text-gray-600">
//             <Info className="w-3.5 h-3.5" />
//             Enter a regular expression pattern to validate against
//           </div>
//         </div>
//       </div>

//       {/* Numeric Range Validation */}
//       {field.data.type === "NUMBER" && (
//         <div className="bg-linear-to-br from-amber-50/30 to-amber-100/20 border border-amber-200 rounded-xl p-4 shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <Hash className="w-4 h-4 text-amber-600" />
//               <h5 className="text-xs font-semibold text-gray-900">Numeric Range</h5>
//             </div>
//             <span className="text-[10px] px-2 py-1 bg-white border border-amber-300 text-amber-700 rounded-full">
//               Number Specific
//             </span>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             {/* Minimum Value */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label className="text-xs font-medium text-gray-900 flex items-center gap-1.5">
//                   <Minus className="w-3.5 h-3.5 text-gray-500" />
//                   Minimum Value
//                 </label>
//                 <span className="text-[10px] text-gray-500">Optional</span>
//               </div>
//               <div className="relative">
//                 <input
//                   type="number"
//                   className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 placeholder:text-gray-400 shadow-sm appearance-none"
//                   placeholder="e.g., 0"
//                   value={minRule?.params?.min ?? ""}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value.trim()) {
//                       setRules([
//                         ...rules.filter((r: any) => r.type !== "MIN"),
//                         {
//                           type: "MIN",
//                           params: { min: Number(value) },
//                           message: `Value must be at least ${value}`,
//                         },
//                       ]);
//                     } else {
//                       setRules(rules.filter((r: any) => r.type !== "MIN"));
//                     }
//                   }}
//                 />
//               </div>
//               <p className="text-[10px] text-gray-500">Smallest allowed value</p>
//             </div>

//             {/* Maximum Value */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label className="text-xs font-medium text-gray-900 flex items-center gap-1.5">
//                   <Plus className="w-3.5 h-3.5 text-gray-500" />
//                   Maximum Value
//                 </label>
//                 <span className="text-[10px] text-gray-500">Optional</span>
//               </div>
//               <div className="relative">
//                 <input
//                   type="number"
//                   className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 placeholder:text-gray-400 shadow-sm appearance-none"
//                   placeholder="e.g., 100"
//                   value={maxRule?.params?.max ?? ""}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value.trim()) {
//                       setRules([
//                         ...rules.filter((r: any) => r.type !== "MAX"),
//                         {
//                           type: "MAX",
//                           params: { max: Number(value) },
//                           message: `Value must be at most ${value}`,
//                         },
//                       ]);
//                     } else {
//                       setRules(rules.filter((r: any) => r.type !== "MAX"));
//                     }
//                   }}
//                 />
//               </div>
//               <p className="text-[10px] text-gray-500">Largest allowed value</p>
//             </div>
//           </div>

//           {/* Range Display */}
//           <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs font-semibold text-gray-900">Range Summary</span>
//               <span className="text-[10px] text-gray-500">Current constraints</span>
//             </div>
//             <div className="flex items-center justify-center gap-3">
//               <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
//                 {minRule ? minRule.params.min : "−∞"}
//               </div>
//               <div className="flex-1 h-px bg-linear-to-r from-amber-400 to-amber-300"></div>
//               <ChevronRight className="w-4 h-4 text-amber-500" />
//               <div className="flex-1 h-px bg-linear-to-r from-amber-300 to-amber-400"></div>
//               <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
//                 {maxRule ? maxRule.params.max : "+∞"}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Active Rules Summary */}
//       {getValidationCount() > 0 && (
//         <div className="bg-linear-to-br from-green-50/50 to-green-100/30 border border-green-200 rounded-xl p-4 shadow-sm">
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               <h5 className="text-xs font-semibold text-gray-900">Active Rules</h5>
//             </div>
//             <span className="text-[10px] px-2 py-1 bg-white border border-green-300 text-green-700 rounded-full">
//               {getValidationCount()} active
//             </span>
//           </div>
//           <div className="space-y-2">
//             {hasRequired && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-gray-700">Required field</span>
//               </div>
//             )}
//             {hasEmail && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-gray-700">Email format validation</span>
//               </div>
//             )}
//             {hasRegex && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-gray-700">Custom pattern validation</span>
//               </div>
//             )}
//             {minRule && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-gray-700">Minimum value: {minRule.params.min}</span>
//               </div>
//             )}
//             {maxRule && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-gray-700">Maximum value: {maxRule.params.max}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Validation Info */}
//       <div className="p-3 bg-linear-to-br from-blue-50/50 to-blue-100/30 border border-blue-200 rounded-lg">
//         <div className="flex items-start gap-2">
//           <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
//           <p className="text-xs text-blue-700">
//             Validation rules run on both client and server. They ensure data quality and prevent invalid submissions.
//             Users see error messages when validation fails.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }