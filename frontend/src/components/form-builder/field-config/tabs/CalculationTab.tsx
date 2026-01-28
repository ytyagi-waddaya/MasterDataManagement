import { useFormBuilderStore } from "../../state/useFormBuilderStore";

const OPERATORS = [
  { value: "ADD", label: "+" },
  { value: "SUBTRACT", label: "−" },
  { value: "MULTIPLY", label: "×" },
  { value: "DIVIDE", label: "÷" },
];

export function CalculationTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);
  const fields = useFormBuilderStore((s) => s.fieldConfigs);

  if (field.meta.category !== "CALCULATED") return null;

  const calculation = field.calculation ?? {
    operator: "ADD",
    operands: [],
  };

  function update(patch: any) {
    updateField(field.meta.key, {
      calculation: {
        ...calculation,
        ...patch,
      },
    });
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Calculation</h4>

      {/* OPERATOR */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Operation
        </label>
        <select
          className="border p-2 w-full"
          value={calculation.operator}
          onChange={(e) =>
            update({ operator: e.target.value })
          }
        >
          {OPERATORS?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* OPERANDS */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Fields
        </label>

        <div className="space-y-2">
          {calculation.operands?.map((key: string, i: number) => (
            <div key={i} className="flex gap-2">
              <select
                className="border p-2 flex-1"
                value={key}
                onChange={(e) => {
                  const next = [...calculation.operands];
                  next[i] = e.target.value;
                  update({ operands: next });
                }}
              >
                {fields
                  .filter((f) => f.data.type === "NUMBER")
                  .map((f) => (
                    <option
                      key={f.meta.key}
                      value={f.meta.key}
                    >
                      {f.meta.label}
                    </option>
                  ))}
              </select>

              <button
                type="button"
                className="text-red-500 text-xs"
                onClick={() =>
                  update({
                    operands: calculation.operands.filter(
                      (_: any, idx: number) => idx !== i,
                    ),
                  })
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="text-sm border px-3 py-1 mt-2"
          onClick={() =>
            update({
              operands: [...calculation.operands, ""],
            })
          }
        >
          ➕ Add field
        </button>
      </div>
    </div>
  );
}

// import { useFormBuilderStore } from "../../state/useFormBuilderStore";
// import {
//   Calculator,
//   Plus,
//   Minus,
//   X,
//   Divide,
//   Hash,
//   Zap,
//   AlertCircle,
//   Trash2,
//   Info,
//   ChevronDown,
//   CheckCircle,
//   TrendingUp,
//   Sparkles
// } from "lucide-react";

// const OPERATORS = [
//   { value: "ADD", label: "Addition", symbol: "+", icon: Plus, color: "from-green-50 to-green-100 text-green-700 border-green-200" },
//   { value: "SUBTRACT", label: "Subtraction", symbol: "−", icon: Minus, color: "from-blue-50 to-blue-100 text-blue-700 border-blue-200" },
//   { value: "MULTIPLY", label: "Multiplication", symbol: "×", icon: X, color: "from-amber-50 to-amber-100 text-amber-700 border-amber-200" },
//   { value: "DIVIDE", label: "Division", symbol: "÷", icon: Divide, color: "from-purple-50 to-purple-100 text-purple-700 border-purple-200" },
// ];

// export function CalculationTab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fields = useFormBuilderStore((s) => s.fieldConfigs);

//   if (field.meta.category !== "CALCULATED") {
//     return (
//       <div className="h-full flex flex-col items-center justify-center p-6 bg-linear-to-b from-white to-gray-50/50">
//         <div className="relative mb-4">
//           <div className="w-12 h-12 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
//             <Calculator className="w-5 h-5 text-gray-400" />
//           </div>
//           <div className="absolute -inset-1 bg-linear-to-r from-gray-200/50 to-transparent rounded-xl blur-sm -z-10"></div>
//         </div>
//         <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Not a Calculated Field</h3>
//         <p className="text-xs text-gray-500 max-w-40 text-center">
//           Calculation settings are only available for fields with "Calculated" category
//         </p>
//       </div>
//     );
//   }

//   const calculation = field.calculation ?? {
//     operator: "ADD",
//     operands: [],
//   };

//   function update(patch: any) {
//     updateField(field.meta.key, {
//       calculation: {
//         ...calculation,
//         ...patch,
//       },
//     });
//   }

//   const numericFields = fields.filter((f) => f.data.type === "NUMBER");
//   const selectedOperator = OPERATORS.find(op => op.value === calculation.operator);
//   const Icon = selectedOperator?.icon || Plus;

//   return (
//     <div className="space-y-5">
//       {/* Header */}
//       <div>
//         <div className="flex items-center gap-2 mb-1">
//           <Calculator className="w-4 h-4 text-gray-500" />
//           <h4 className="text-xs font-semibold text-gray-900 tracking-wide uppercase">Calculation Configuration</h4>
//         </div>
//         <p className="text-xs text-gray-500">Define dynamic calculations based on other numeric fields</p>
//       </div>

//       {/* Calculation Status */}
//       <div className="bg-linear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <Zap className="w-4 h-4 text-gray-500" />
//             <h5 className="text-xs font-semibold text-gray-900">Calculation Status</h5>
//           </div>
//           <span className={`text-[10px] px-2 py-1 rounded-full ${
//             calculation.operands.length > 0
//               ? 'bg-green-100 text-green-700 border border-green-200'
//               : 'bg-amber-100 text-amber-700 border border-amber-200'
//           } font-semibold`}>
//             {calculation.operands.length > 0 
//               ? `${calculation.operands.length} operand${calculation.operands.length !== 1 ? 's' : ''}`
//               : 'No operands'
//             }
//           </span>
//         </div>
//         <div className="space-y-2">
//           <div className="text-lg font-bold text-gray-900">Dynamic Calculation</div>
//           <div className="text-xs text-gray-500">
//             This field's value is calculated automatically based on other numeric fields
//           </div>
//         </div>
//       </div>

//       {/* Operator Selection */}
//       <div className="bg-linear-to-br from-blue-50/30 to-blue-100/20 border border-blue-200 rounded-xl p-4 shadow-sm">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <TrendingUp className="w-4 h-4 text-blue-600" />
//             <h5 className="text-xs font-semibold text-gray-900">Calculation Operator</h5>
//           </div>
//           <span className="text-[10px] px-2 py-1 bg-white border border-blue-300 text-blue-700 rounded-full">
//             Required
//           </span>
//         </div>
//         <div className="grid grid-cols-4 gap-2">
//           {OPERATORS.map((op) => {
//             const OpIcon = op.icon;
//             const isActive = calculation.operator === op.value;
//             return (
//               <button
//                 key={op.value}
//                 onClick={() => update({ operator: op.value })}
//                 className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
//                   isActive
//                     ? `${op.color.split(' ')[0]} ${op.color.split(' ')[1]} border-opacity-100 shadow-sm`
//                     : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
//                 }`}
//               >
//                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
//                   isActive ? 'bg-white/80' : 'bg-gray-100'
//                 }`}>
//                   <OpIcon className={`w-5 h-5 ${isActive ? op.color.split(' ')[2] : 'text-gray-600'}`} />
//                 </div>
//                 <div className="text-lg font-bold mb-1">{op.symbol}</div>
//                 <div className="text-[10px] font-medium">{op.label}</div>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Operands Configuration */}
//       <div className="bg-linear-to-br from-purple-50/30 to-purple-100/20 border border-purple-200 rounded-xl p-4 shadow-sm">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <Hash className="w-4 h-4 text-purple-600" />
//             <h5 className="text-xs font-semibold text-gray-900">Input Fields</h5>
//           </div>
//           <span className="text-[10px] px-2 py-1 bg-white border border-purple-300 text-purple-700 rounded-full">
//             {calculation.operands.length} selected
//           </span>
//         </div>

//         <div className="space-y-3">
//           {calculation.operands.map((key: string, i: number) => (
//             <div
//               key={i}
//               className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all duration-200 group"
//             >
//               <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
//                 {i + 1}
//               </div>
//               <div className="flex-1">
//                 <div className="relative">
//                   <select
//                     className="w-full px-3 py-1.5 text-sm bg-transparent border-none focus:outline-none focus:ring-0 appearance-none"
//                     value={key}
//                     onChange={(e) => {
//                       const next = [...calculation.operands];
//                       next[i] = e.target.value;
//                       update({ operands: next });
//                     }}
//                   >
//                     <option value="">Select a numeric field...</option>
//                     {numericFields.map((f) => (
//                       <option
//                         key={f.meta.key}
//                         value={f.meta.key}
//                       >
//                         {f.meta.label} ({f.meta.key})
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200 opacity-0 group-hover:opacity-100"
//                 onClick={() =>
//                   update({
//                     operands: calculation.operands.filter(
//                       (_: any, idx: number) => idx !== i,
//                     ),
//                   })
//                 }
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>

//         <button
//           type="button"
//           className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-b from-white to-gray-50 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all duration-200"
//           onClick={() =>
//             update({
//               operands: [...calculation.operands, ""],
//             })
//           }
//           disabled={numericFields.length === 0}
//         >
//           <Plus className="w-4 h-4" />
//           Add Input Field
//         </button>

//         {numericFields.length === 0 && (
//           <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
//             <div className="flex items-start gap-2">
//               <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
//               <p className="text-xs text-amber-700">
//                 No numeric fields found. Add number or currency fields to use them in calculations.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Calculation Preview */}
//       <div className="bg-linear-to-br from-green-50/30 to-green-100/20 border border-green-200 rounded-xl p-4 shadow-sm">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <Sparkles className="w-4 h-4 text-green-600" />
//             <h5 className="text-xs font-semibold text-gray-900">Calculation Preview</h5>
//           </div>
//           <span className="text-[10px] px-2 py-1 bg-white border border-green-300 text-green-700 rounded-full">
//             Live Preview
//           </span>
//         </div>
//         <div className="p-3 bg-white border border-gray-200 rounded-lg">
//           <div className="text-xs font-mono text-gray-700 text-center">
//             {calculation.operands.length > 0 ? (
//               <div className="flex items-center justify-center gap-2 flex-wrap">
//                 {calculation.operands.map((key: string, i: number) => {
//                   const field = numericFields.find(f => f.meta.key === key);
//                   return (
//                     <div key={i} className="flex items-center gap-1">
//                       <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
//                         {field?.meta.label || "?"}
//                       </div>
//                       {i < calculation.operands.length - 1 && (
//                         <span className="text-gray-400">
//                           {selectedOperator?.symbol}
//                         </span>
//                       )}
//                     </div>
//                   );
//                 })}
//                 <span className="text-gray-400 mx-2">→</span>
//                 <div className="px-2 py-1 bg-green-100 rounded text-xs font-medium text-green-700">
//                   {field.meta.label}
//                 </div>
//               </div>
//             ) : (
//               <div className="text-gray-500 italic">Add fields to see calculation preview</div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Calculation Info */}
//       <div className="p-3 bg-linear-to-br from-blue-50/50 to-blue-100/30 border border-blue-200 rounded-lg">
//         <div className="flex items-start gap-2">
//           <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
//           <p className="text-xs text-blue-700">
//             Calculated fields update automatically when any of their input fields change.
//             Calculations run in real-time and support basic arithmetic operations.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }