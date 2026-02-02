// import { useFormBuilderStore } from "../../state/useFormBuilderStore";

// export function PermissionTab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const permissions = field.permissions ?? {};

//   function update(patch: any) {
//     updateField(field.meta.key, {
//       permissions: { ...permissions, ...patch },
//     });
//   }

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">Permissions</h4>

//       <input
//         className="border p-2 w-full"
//         placeholder="Read roles (comma separated)"
//         value={(permissions.read?.roles ?? []).join(",")}
//         onChange={(e) =>
//           update({
//             read: {
//               roles: e.target.value.split(",").filter(Boolean),
//             },
//           })
//         }
//       />

//       <input
//         className="border p-2 w-full"
//         placeholder="Write roles (comma separated)"
//         value={(permissions.write?.roles ?? []).join(",")}
//         onChange={(e) =>
//           update({
//             write: {
//               roles: e.target.value.split(",").filter(Boolean),
//             },
//           })
//         }
//       />
//     </div>
//   );
// }

import { useFormBuilderStore } from "../../state/useFormBuilderStore";

export function PermissionTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);
  const permissions = field.permissions ?? {};

  function update(patch: any) {
    updateField(field.meta.key, {
      permissions: { ...permissions, ...patch },
    });
  }

  const readRoles = (permissions.read?.roles ?? []).join(", ");
  const writeRoles = (permissions.write?.roles ?? []).join(", ");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
          Field Permissions
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Control which user roles can read or modify this field
        </p>
      </div>

      {/* Read Permissions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Read Access
            </label>
          </div>
          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
            {readRoles ? readRoles.split(",").length : 0} roles
          </span>
        </div>
        
        <div>
          <input
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            placeholder="admin, user, viewer (comma separated)"
            value={readRoles}
            onChange={(e) =>
              update({
                read: {
                  roles: e.target.value.split(",").map(r => r.trim()).filter(Boolean),
                },
              })
            }
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
            Users with these roles can view this field
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white dark:bg-gray-900 text-xs text-gray-500 dark:text-gray-400">
            Permission Levels
          </span>
        </div>
      </div>

      {/* Write Permissions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Write Access
            </label>
          </div>
          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
            {writeRoles ? writeRoles.split(",").length : 0} roles
          </span>
        </div>
        
        <div>
          <input
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors"
            placeholder="admin, editor (comma separated)"
            value={writeRoles}
            onChange={(e) =>
              update({
                write: {
                  roles: e.target.value.split(",").map(r => r.trim()).filter(Boolean),
                },
              })
            }
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
            Users with these roles can modify this field
          </p>
        </div>
      </div>

      {/* Info Note */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Permission Guidelines
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
              <li>• Separate multiple roles with commas</li>
              <li>• Write access implies read access</li>
              <li>• Empty field allows all roles</li>
              <li>• Roles are case-sensitive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}