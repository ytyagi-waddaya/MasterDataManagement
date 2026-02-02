// import { useFormBuilderStore } from "../../state/useFormBuilderStore";

// export function DataTab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);

//   return (
//     <div className="space-y-3">
//       <h4 className="font-semibold">Data</h4>

//       <div className="text-sm text-gray-600">
//         Type: <b>{field.data.type}</b>
//       </div>

//       {/* Default value */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Default value"
//         value={field.data.default ?? ""}
//         onChange={(e) =>
//           updateField(field.meta.key, {
//             data: { ...field.data, default: e.target.value },
//           })
//         }
//       />

//       {/* Nullable */}
//       <label className="flex items-center gap-2 text-sm">
//         <input
//           type="checkbox"
//           checked={field.data.nullable ?? false}
//           onChange={(e) =>
//             updateField(field.meta.key, {
//               data: { ...field.data, nullable: e.target.checked },
//             })
//           }
//         />
//         Nullable (allow empty)
//       </label>

//       {/* Precision / Scale (NUMBER only) */}
//       {field.data.type === "NUMBER" && (
//         <div className="grid grid-cols-2 gap-2">
//           <input
//             type="number"
//             className="border p-2"
//             placeholder="Precision"
//             value={field.data.precision ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 data: {
//                   ...field.data,
//                   precision: Number(e.target.value),
//                 },
//               })
//             }
//           />

//           <input
//             type="number"
//             className="border p-2"
//             placeholder="Scale"
//             value={field.data.scale ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 data: {
//                   ...field.data,
//                   scale: Number(e.target.value),
//                 },
//               })
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }



import { useFormBuilderStore } from "../../state/useFormBuilderStore";

export function DataTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);

  return (
    <div className="space-y-5">
      {/* Type Display */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Data Type
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            The type of data this field stores
          </p>
        </div>
        <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {field.data.type}
          </span>
        </div>
      </div>

      {/* Default Value */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Default Value
        </label>
        <input
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
          placeholder="Enter default value"
          value={field.data.default ?? ""}
          onChange={(e) =>
            updateField(field.meta.key, {
              data: { ...field.data, default: e.target.value },
            })
          }
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Pre-filled value when creating new records
        </p>
      </div>

      {/* Nullable */}
      <div className="flex items-start gap-3 p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center h-5 mt-0.5">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-0"
            checked={field.data.nullable ?? false}
            onChange={(e) =>
              updateField(field.meta.key, {
                data: { ...field.data, nullable: e.target.checked },
              })
            }
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Allow Empty Values
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            When checked, this field can be left empty
          </p>
        </div>
      </div>

      {/* Precision / Scale (NUMBER only) */}
      {field.data.type === "NUMBER" && (
        <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number Configuration
            </h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Set precision and scale for numeric values
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                Precision
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                placeholder="Total digits"
                value={field.data.precision ?? ""}
                onChange={(e) =>
                  updateField(field.meta.key, {
                    data: {
                      ...field.data,
                      precision: e.target.value ? Number(e.target.value) : undefined,
                    },
                  })
                }
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total digits
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                Scale
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                placeholder="Decimal places"
                value={field.data.scale ?? ""}
                onChange={(e) =>
                  updateField(field.meta.key, {
                    data: {
                      ...field.data,
                      scale: e.target.value ? Number(e.target.value) : undefined,
                    },
                  })
                }
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Decimal places
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}