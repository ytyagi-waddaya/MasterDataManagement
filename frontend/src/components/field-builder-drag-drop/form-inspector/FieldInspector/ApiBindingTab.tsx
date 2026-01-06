// "use client";

// import { useMemo } from "react";
// import { useResourceList } from "@/lib/resource/hook";
// import { EditorNode, EditorField } from "../../contracts/editor.contract";
// import { useResourceFields } from "@/lib/resource/hook/useResource";

// type FieldNode = Extract<EditorNode, { kind: "FIELD" }>;

// export function ApiBindingTab({
//   node,
//   onChange,
// }: {
//   node: FieldNode;
//   onChange: (node: EditorNode) => void;
// }) {
//   const { data: resources = [] } = useResourceList();

//   const apiSource = node.field.integration?.apiSource;

//   const resourceKey = apiSource?.url
//     ? apiSource.url.replace("/resource/", "")
//     : "";

//   const { data: resourceFields } = useResourceFields(resourceKey);

//   /* ----------------------------------------
//      Helpers
//   ---------------------------------------- */
//   function updateApiSource(
//     patch: Partial<NonNullable<EditorField["integration"]>["apiSource"]>
//   ) {
//     onChange({
//       ...node,
//       field: {
//         ...node.field,
//         integration: {
//           apiSource: {
//             sourceType: "INTERNAL",
//             method: "GET",
//             url: "",
//             labelField: "",
//             valueField: "",
//             ...apiSource,
//             ...patch,
//           },
//         },
//       },
//     });
//   }

//   const fields = resourceFields?.fields ?? [];

//   const labelCandidates = useMemo(
//     () =>
//       fields.filter(
//         (f:any) =>
//           f.type === "STRING" &&
//           !f.isReference
//       ),
//     [fields]
//   );

//   const valueCandidates = useMemo(
//     () =>
//       fields.filter(
//         (f:any) =>
//           f.primary ||
//           f.type === "STRING" ||
//           f.type === "NUMBER"
//       ),
//     [fields]
//   );

//   /* ----------------------------------------
//      UI
//   ---------------------------------------- */
//   return (
//     <div className="space-y-4 text-sm">
//       <div className="font-medium">API Data Source</div>

//       {/* ================= RESOURCE ================= */}
//       <div>
//         <label className="block text-xs font-medium mb-1">
//           Resource
//         </label>
//         <select
//           value={resourceKey}
//           onChange={(e) =>
//             updateApiSource({
//               url: `/resource/${e.target.value}`,
//               labelField: "",
//               valueField: "",
//             })
//           }
//           className="w-full border rounded px-2 py-1"
//         >
//           <option value="">Select resource</option>
//           {resources.map((r: { label: string; value: string }) => (
//             <option key={r.value} value={r.value}>
//               {r.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* ================= LABEL FIELD ================= */}
//       {resourceKey && (
//         <div>
//           <label className="block text-xs font-medium mb-1">
//             Label field (shown to user)
//           </label>
//           <select
//             value={apiSource?.labelField ?? ""}
//             onChange={(e) =>
//               updateApiSource({ labelField: e.target.value })
//             }
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">Select label field</option>
//             {labelCandidates.map((f:any) => (
//               <option key={f.key} value={f.key}>
//                 {f.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* ================= VALUE FIELD ================= */}
//       {resourceKey && (
//         <div>
//           <label className="block text-xs font-medium mb-1">
//             Value field (stored value)
//           </label>
//           <select
//             value={apiSource?.valueField ?? ""}
//             onChange={(e) =>
//               updateApiSource({ valueField: e.target.value })
//             }
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">Select value field</option>
//             {valueCandidates.map((f:any) => (
//               <option key={f.key} value={f.key}>
//                 {f.label}
//                 {f.primary ? " (Primary)" : ""}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* ================= METHOD ================= */}
//       {resourceKey && (
//         <div>
//           <label className="block text-xs font-medium mb-1">
//             HTTP Method
//           </label>
//           <select
//             value={apiSource?.method ?? "GET"}
//             onChange={(e) =>
//               updateApiSource({
//                 method: e.target.value as "GET" | "POST",
//               })
//             }
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="GET">GET</option>
//             <option value="POST">POST</option>
//           </select>
//         </div>
//       )}

//       {/* ================= INFO ================= */}
//       <p className="text-xs text-muted-foreground">
//         This field will load its selectable options dynamically from the
//         selected resource.
//       </p>
//     </div>
//   );
// }

// "use client";

// import { useMemo } from "react";
// import { EditorNode, EditorField } from "../../contracts/editor.contract";
// import { useResourceList } from "@/lib/resource/hook";
// import { useResourceFields } from "@/lib/resource/hook/useResource";
// import { useUserList } from "@/lib/user/hooks";
// import { useRoleList } from "@/lib/role/hooks";

// type FieldNode = Extract<EditorNode, { kind: "FIELD" }>;

// /* ================= CONSTANTS ================= */

// const SYSTEM_SOURCES = ["USER", "ROLE"] as const;

// const HIDDEN_SOURCES = [
//   "MODULE",
//   "RESOURCE",
//   "ACTION",
//   "PERMISSION",
//   "DASHBOARD",
// ] as const;

// /* ================= COMPONENT ================= */

// export function ApiBindingTab({
//   node,
//   onChange,
// }: {
//   node: FieldNode;
//   onChange: (node: EditorNode) => void;
// }) {
//   /* ----------------------------------------
//      DATA
//   ---------------------------------------- */
//   const { data: resources = [] } = useResourceList();
//   const { data: users = [] } = useUserList(); // label/value only
//   const { data: roles = [] } = useRoleList(); // label/value only

//   const apiSource = node.field.integration?.apiSource;

//   const resourceKey = apiSource?.url
//     ? apiSource.url.replace("/resource/", "")
//     : "";

//   const isUser = resourceKey === "USER";
//   const isRole = resourceKey === "ROLE";
//   const isSystem = isUser || isRole;

//   const { data: resourceFields } = useResourceFields(
//     !isSystem ? resourceKey : ""
//   );

//   /* ----------------------------------------
//      FILTER RESOURCES (REMOVE SYSTEM + HIDDEN)
//   ---------------------------------------- */
//   const visibleResources = useMemo(
//     () =>
//       resources.filter(
//         (r: { value: string }) =>
//           !HIDDEN_SOURCES.includes(r.value as any) &&
//           !SYSTEM_SOURCES.includes(r.value as any)
//       ),
//     [resources]
//   );

//   /* ----------------------------------------
//      NORMALIZED FIELD LIST
//   ---------------------------------------- */
//   const fields = useMemo(() => {
//     if (isUser) {
//       return [
//         { key: "value", label: "User ID", type: "STRING", primary: true },
//         { key: "label", label: "User Name", type: "STRING" },
//       ];
//     }

//     if (isRole) {
//       return [
//         { key: "value", label: "Role ID", type: "STRING", primary: true },
//         { key: "label", label: "Role Name", type: "STRING" },
//       ];
//     }

//     return resourceFields?.fields ?? [];
//   }, [isUser, isRole, resourceFields]);

//   /* ----------------------------------------
//      LABEL / VALUE CANDIDATES
//   ---------------------------------------- */
//   const labelCandidates = useMemo(
//     () => fields.filter((f: any) => f.type === "STRING"),
//     [fields]
//   );

//   const valueCandidates = useMemo(
//     () =>
//       fields.filter(
//         (f: any) => f.primary || f.type === "STRING" || f.type === "NUMBER"
//       ),
//     [fields]
//   );

//   /* ----------------------------------------
//      UPDATE HANDLER
//   ---------------------------------------- */
//   function updateApiSource(
//     patch: Partial<NonNullable<EditorField["integration"]>["apiSource"]>
//   ) {
//     onChange({
//       ...node,
//       field: {
//         ...node.field,
//         integration: {
//           apiSource: {
//             sourceType: "INTERNAL",
//             method: "GET",
//             url: "",
//             labelField: "",
//             valueField: "",
//             ...apiSource,
//             ...patch,
//           },
//         },
//       },
//     });
//   }

//   /* ----------------------------------------
//      UI
//   ---------------------------------------- */
//   return (
//     <div className="space-y-4 text-sm">
//       <div className="font-medium">API Data Source</div>

//       {/* ================= SOURCE ================= */}
//       <div>
//         <label className="block text-xs font-medium mb-1">
//           Source
//         </label>

//         <select
//           value={resourceKey}
//           onChange={(e) =>
//             updateApiSource({
//               url: `/resource/${e.target.value}`,
//               labelField: "",
//               valueField: "",
//             })
//           }
//           className="w-full border rounded px-2 py-1"
//         >
//           <option value="">Select source</option>

//           {/* SYSTEM */}
//           <optgroup label="System">
//             <option value="USER">User</option>
//             <option value="ROLE">Role</option>
//           </optgroup>

//           {/* MASTER OBJECTS */}
//           <optgroup label="Data">
//             {visibleResources.map(
//               (r: { label: string; value: string }) => (
//                 <option key={r.value} value={r.value}>
//                   {r.label}
//                 </option>
//               )
//             )}
//           </optgroup>
//         </select>
//       </div>

//       {/* ================= LABEL FIELD ================= */}
//       {resourceKey && (
//         <div>
//           <label className="block text-xs font-medium mb-1">
//             Label field (shown to user)
//           </label>

//           <select
//             value={apiSource?.labelField ?? ""}
//             onChange={(e) =>
//               updateApiSource({ labelField: e.target.value })
//             }
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">Select label field</option>
//             {labelCandidates.map((f: any) => (
//               <option key={f.key} value={f.key}>
//                 {f.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* ================= VALUE FIELD ================= */}
//       {resourceKey && (
//         <div>
//           <label className="block text-xs font-medium mb-1">
//             Value field (stored)
//           </label>

//           <select
//             value={apiSource?.valueField ?? ""}
//             onChange={(e) =>
//               updateApiSource({ valueField: e.target.value })
//             }
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">Select value field</option>
//             {valueCandidates.map((f: any) => (
//               <option key={f.key} value={f.key}>
//                 {f.label}
//                 {f.primary ? " (Primary)" : ""}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* ================= INFO ================= */}
//       <p className="text-xs text-muted-foreground">
//         Options for this field will be loaded dynamically from the selected
//         source.
//       </p>
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";
import { EditorNode, EditorField } from "../../contracts/editor.contract";
import { useResourceList } from "@/lib/resource/hook";
import { useResourceFields } from "@/lib/resource/hook/useResource";
import { useUserList } from "@/lib/user/hooks";
import { useRoleList } from "@/lib/role/hooks";
import { Database, Users, Shield, Info } from "lucide-react";

type FieldNode = Extract<EditorNode, { kind: "FIELD" }>;

/* ================= CONSTANTS ================= */

const SYSTEM_SOURCES = ["USER", "ROLE"] as const;

const HIDDEN_SOURCES = [
  "MODULE",
  "RESOURCE",
  "ACTION",
  "PERMISSION",
  "DASHBOARD",
] as const;

/* ================= COMPONENT ================= */

export function ApiBindingTab({
  node,
  onChange,
}: {
  node: FieldNode;
  onChange: (node: EditorNode) => void;
}) {
  /* ----------------------------------------
     DATA
  ---------------------------------------- */
  const { data: resources = [] } = useResourceList();
  const { data: users = [] } = useUserList(); // label/value only
  const { data: roles = [] } = useRoleList(); // label/value only

  const apiSource = node.field.integration?.apiSource;

  const resourceKey = apiSource?.url
    ? apiSource.url.replace("/resource/", "")
    : "";

  const isUser = resourceKey === "USER";
  const isRole = resourceKey === "ROLE";
  const isSystem = isUser || isRole;

  const { data: resourceFields } = useResourceFields(
    !isSystem ? resourceKey : ""
  );

  /* ----------------------------------------
     FILTER RESOURCES (REMOVE SYSTEM + HIDDEN)
  ---------------------------------------- */
  const visibleResources = useMemo(
    () =>
      resources.filter(
        (r: { value: string }) =>
          !HIDDEN_SOURCES.includes(r.value as any) &&
          !SYSTEM_SOURCES.includes(r.value as any)
      ),
    [resources]
  );

  /* ----------------------------------------
     NORMALIZED FIELD LIST
  ---------------------------------------- */
  const fields = useMemo(() => {
    if (isUser) {
      return [
        { key: "value", label: "User ID", type: "STRING", primary: true },
        { key: "label", label: "User Name", type: "STRING" },
      ];
    }

    if (isRole) {
      return [
        { key: "value", label: "Role ID", type: "STRING", primary: true },
        { key: "label", label: "Role Name", type: "STRING" },
      ];
    }

    return resourceFields?.fields ?? [];
  }, [isUser, isRole, resourceFields]);

  /* ----------------------------------------
     LABEL / VALUE CANDIDATES
  ---------------------------------------- */
  const labelCandidates = useMemo(
    () => fields.filter((f: any) => f.type === "STRING"),
    [fields]
  );

  const valueCandidates = useMemo(
    () =>
      fields.filter(
        (f: any) => f.primary || f.type === "STRING" || f.type === "NUMBER"
      ),
    [fields]
  );

  /* ----------------------------------------
     UPDATE HANDLER
  ---------------------------------------- */
  function updateApiSource(
    patch: Partial<NonNullable<EditorField["integration"]>["apiSource"]>
  ) {
    onChange({
      ...node,
      field: {
        ...node.field,
        integration: {
          apiSource: {
            sourceType: "INTERNAL",
            method: "GET",
            url: "",
            labelField: "",
            valueField: "",
            ...apiSource,
            ...patch,
          },
        },
      },
    });
  }

  /* ----------------------------------------
     UI
  ---------------------------------------- */
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Database className="h-4 w-4 text-gray-500" />
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          API Data Binding
        </div>
      </div>

      {/* Info */}
      <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Dynamic Data Source
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Options for this field will be loaded dynamically from the selected source at runtime.
        </p>
      </div>

      {/* Source Selection */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Data Source
          </label>
          <div className="relative">
            <select
              value={resourceKey}
              onChange={(e) =>
                updateApiSource({
                  url: `/resource/${e.target.value}`,
                  labelField: "",
                  valueField: "",
                })
              }
              className="
                w-full text-sm px-3 py-2 rounded-lg border
                border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-900
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
              "
            >
              <option value="">Select a data source</option>

              {/* SYSTEM */}
              <optgroup label="System Entities">
                <option value="USER">Users</option>
                <option value="ROLE">Roles</option>
              </optgroup>

              {/* MASTER OBJECTS */}
              {visibleResources.length > 0 && (
                <optgroup label="Data Resources">
                  {visibleResources.map(
                    (r: { label: string; value: string }) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    )
                  )}
                </optgroup>
              )}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Database className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Label Field */}
        {resourceKey && (
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Display Field
            </label>
            <div className="relative">
              <select
                value={apiSource?.labelField ?? ""}
                onChange={(e) =>
                  updateApiSource({ labelField: e.target.value })
                }
                className="
                  w-full text-sm px-3 py-2 rounded-lg border
                  border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-900
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
              >
                <option value="">Select display field</option>
                {labelCandidates.map((f: any) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Users className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Field shown to users in dropdown
            </p>
          </div>
        )}

        {/* Value Field */}
        {resourceKey && (
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Storage Field
            </label>
            <div className="relative">
              <select
                value={apiSource?.valueField ?? ""}
                onChange={(e) =>
                  updateApiSource({ valueField: e.target.value })
                }
                className="
                  w-full text-sm px-3 py-2 rounded-lg border
                  border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-900
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
              >
                <option value="">Select storage field</option>
                {valueCandidates.map((f: any) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                    {f.primary && (
                      <span className="text-blue-500 ml-1">(Primary)</span>
                    )}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Field value stored in database
            </p>
          </div>
        )}
      </div>

      {/* Status */}
      {resourceKey && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
          <Info className="h-4 w-4 text-blue-500" />
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <span className="font-medium">
              {isUser ? "Users" : isRole ? "Roles" : visibleResources.find((r: any) => r.value === resourceKey)?.label}
            </span>
            {" "}source selected • {fields.length} fields available
          </div>
        </div>
      )}
    </div>
  );
}