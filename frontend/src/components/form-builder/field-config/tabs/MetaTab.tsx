// import { useFormBuilderStore } from "../../state/useFormBuilderStore";

// export function MetaTab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);

//   return (
//     <div className="space-y-3">
//       <h4 className="font-semibold">Meta</h4>

//       {/* Label */}
//       <input
//         className="border p-2 w-full"
//         value={field.meta.label}
//         placeholder="Field label"
//         onChange={(e) =>{
//           updateField(field.meta.key, {
//             meta: { ...field.meta, label: e.target.value },
//           })}
//         }
//       />

//       {/* Category (read-only) */}
//       <div className="text-sm text-gray-600">
//         Category: <b>{field.meta.category}</b>
//       </div>

//       {/* Governance indicators */}
//       {field.meta.locked && (
//         <div className="text-xs text-orange-600">
//           This field is locked
//         </div>
//       )}

//       {field.meta.deprecated && (
//         <div className="text-xs text-red-600">
//           This field is deprecated
//         </div>
//       )}
//     </div>
//   );
// }

import { useFormBuilderStore } from "../../state/useFormBuilderStore";

export function MetaTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);

  return (
    <div className="space-y-5">
      {/* Field Label */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Field Label
        </label>
        <input
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
          value={field.meta.label}
          placeholder="Enter field label"
          onChange={(e) => {
            updateField(field.meta.key, {
              meta: { ...field.meta, label: e.target.value },
            });
          }}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Display name shown to users
        </p>
      </div>

      {/* Field Information Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Category */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Category</span>
          </div>
          <div className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-800 dark:text-gray-200">
            {field.meta.category}
          </div>
        </div>

        {/* Field Key */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Field ID</span>
          </div>
          <div className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm font-mono text-gray-600 dark:text-gray-400 truncate">
            {field.meta.key}
          </div>
        </div>
      </div>

      {/* Governance Indicators */}
      <div className="space-y-2">
        {field.meta.locked && (
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
            <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Field is Locked
              </p>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
                Configuration cannot be modified
              </p>
            </div>
          </div>
        )}

        {field.meta.deprecated && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <svg className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Field is Deprecated
              </p>
              <p className="text-xs text-red-600/80 dark:text-red-400/80">
                This field is marked for removal in future versions
              </p>
            </div>
          </div>
        )}

        {/* No indicators message */}
        {!field.meta.locked && !field.meta.deprecated && (
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Field is Active
              </p>
              <p className="text-xs text-green-600/80 dark:text-green-400/80">
                No governance restrictions applied
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}