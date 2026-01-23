// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@/components/ui/accordion";
// import {
//   useGrantAllModulePermissions,
//   useRevokeAllModulePermissions,
//   useRolePermissions,
//   useUpdateRolePermissionAccess,
// } from "../hooks";
// import { ConditionEditorDialog } from "@/components/condition-builder/ConditionEditorDialog";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// /**
//  * Clean, production-ready PermissionManager
//  * - Proper loading guard
//  * - Derives counts reliably from backend source of truth
//  * - Optimistic UI with rollback on mutation errors
//  * - Clear responsibilities and well-typed props
//  */

// type PermissionState = "full" | "conditional" | "none";

// type Permission = {
//   id: string;
//   name: string;
//   key: string;
//   action: { id: string; name: string; key: string };
//   resource: {
//     id: string;
//     name: string;
//     key: string;
//     module: { id: string; name: string };
//   };
// };

// type GroupedPermissions = Record<string, Permission[]>;

// export default function PermissionManager({
//   groupedPermissions,
//   roleName,
//   roleId,
// }: {
//   groupedPermissions: GroupedPermissions;
//   roleName: string;
//   roleId: string;
// }) {
//   // --- Backend data
//   const {
//     data: rolePermissions,
//     isLoading,
//     isError,
//   } = useRolePermissions(roleId);

//   // --- Local UI state: map permissionId -> PermissionState
//   const [states, setStates] = useState<Map<string, PermissionState>>(new Map());

//   // Conditional editor state
//   const [editingPermission, setEditingPermission] = useState<string | null>(
//     null
//   );
//   const [openDialog, setOpenDialog] = useState(false);
//   const [conditionsDraft, setConditionsDraft] = useState<any | null>(null);

//   // Mutations
//   const updatePermission = useUpdateRolePermissionAccess();
//   const grantAllMutation = useGrantAllModulePermissions();
//   const revokeAllMutation = useRevokeAllModulePermissions();

//   const hasModule = (moduleName: string) => {
//     const first = groupedPermissions[moduleName]?.[0];
//     return Boolean(first?.resource?.module?.id);
//   };

//   // --- Helper: map backend accessLevel -> UI state
//   const backendToState = (accessLevel?: string | null): PermissionState => {
//     if (!accessLevel) return "none";
//     switch (accessLevel) {
//       case "FULL":
//       case "full":
//         return "full";
//       case "CONDITIONAL":
//       case "conditional":
//         return "conditional";
//       default:
//         return "none";
//     }
//   };

//   // --- Sync backend -> local states when backend data changes
//   // Use rolePermissions as the single source of truth. Only run when rolePermissions changes.
//   useEffect(() => {
//     if (!rolePermissions) return;

//     const map = new Map<string, PermissionState>();

//     Object.values(groupedPermissions).forEach((perms) => {
//       perms.forEach((p) => {
//         const backend = rolePermissions.find(
//           (rp: any) => rp.permissionId === p.id
//         );
//         map.set(p.id, backendToState(backend?.accessLevel));
//       });
//     });

//     setStates(map);
//   }, [rolePermissions, groupedPermissions]);

//   // --- Counts derived from the local states (which are initialized from backend)
//   const counts = useMemo(() => {
//     let full = 0;
//     let conditional = 0;
//     let none = 0;

//     for (const v of states.values()) {
//       if (v === "full") full++;
//       else if (v === "conditional") conditional++;
//       else none++;
//     }

//     return { full, conditional, none };
//   }, [states]);

//   // --- Optimistic state updater with rollback support
//   function optimisticUpdate(permissionId: string, next: PermissionState) {
//     setStates((prev) => {
//       const copy = new Map(prev);
//       copy.set(permissionId, next);
//       return copy;
//     });
//   }

//   function rollbackState(old: Map<string, PermissionState>) {
//     setStates(new Map(old));
//   }

//   // --- Action handlers
//   const setPermissionState = (permissionId: string, next: PermissionState) => {
//     const old = new Map(states);
//     optimisticUpdate(permissionId, next);

//     const payload: any = {
//       accessLevel:
//         next === "full"
//           ? "FULL"
//           : next === "conditional"
//           ? "CONDITIONAL"
//           : "NONE",
//     };

//     updatePermission.mutate(
//       payload
//         ? { roleId, permissionId, payload }
//         : { roleId, permissionId, payload },
//       {
//         onError: () => rollbackState(old),
//       }
//     );
//   };

//   // When user selects conditional, open dialog first (optimistic UI already set)
//   const changePermissionState = (
//     permissionId: string,
//     next: PermissionState
//   ) => {
//     const old = new Map(states);
//     optimisticUpdate(permissionId, next);

//     if (next === "conditional") {
//       const backend = rolePermissions?.find(
//         (rp: any) => rp.permissionId === permissionId
//       );

//       // Load saved backend conditions (or null if none)
//       setConditionsDraft(backend?.conditions ?? null);

//       setEditingPermission(permissionId);
//       setOpenDialog(true);
//       return;
//     }

//     // full / none
//     setPermissionState(permissionId, next);
//   };

//   const saveCondition = (finalCondition: any) => {
//     if (!editingPermission) return;
//     const permissionId = editingPermission;
//     const old = new Map(states);

//     // already optimistically set to conditional when we opened dialog
//     updatePermission.mutate(
//       {
//         roleId,
//         permissionId,
//         payload: { accessLevel: "CONDITIONAL", conditions: finalCondition },
//       },
//       {
//         onError: () => rollbackState(old),
//       }
//     );

//     setEditingPermission(null);
//     setOpenDialog(false);
//   };

//   // Grant all in module (optimistic bulk)
//   const grantAllInModule = (moduleName: string) => {
//     const moduleId =
//       groupedPermissions[moduleName]?.[0]?.resource?.module?.id ?? null;
//     if (!moduleId) return;

//     const old = new Map(states);

//     // optimistic UI
//     setStates((prev) => {
//       const copy = new Map(prev);
//       groupedPermissions[moduleName]?.forEach((p) => copy.set(p.id, "full"));
//       return copy;
//     });

//     grantAllMutation.mutate(
//       { roleId, moduleId },
//       {
//         onError: () => rollbackState(old),
//       }
//     );
//   };

//   const revokeAllInModule = (moduleName: string) => {
//     const moduleId =
//       groupedPermissions[moduleName]?.[0]?.resource?.module?.id ?? null;
//     if (!moduleId) return;

//     const old = new Map(states);

//     setStates((prev) => {
//       const copy = new Map(prev);
//       groupedPermissions[moduleName]?.forEach((p) => copy.set(p.id, "none"));
//       return copy;
//     });

//     revokeAllMutation.mutate(
//       { roleId, moduleId },
//       {
//         onError: () => rollbackState(old),
//       }
//     );
//   };

//   // --- Condition preview helper (kept simple)
//   function formatConditionPreview(condition: any): string {
//     if (!condition) return "";
//     if (condition.field && condition.operator) {
//       return `${condition.field} ${condition.operator} ${
//         Array.isArray(condition.value)
//           ? `[${condition.value.join(", ")}]`
//           : condition.value
//       }`;
//     }
//     if (condition.op && Array.isArray(condition.rules)) {
//       return condition.rules
//         .map((r: any) => formatConditionPreview(r))
//         .join(` ${condition.op} `);
//     }
//     return "Condition";
//   }

//   // --- Loading / error guards
//   if (isLoading) {
//     return (
//       <div className="p-4">
//         <h3 className="text-lg">Loading permissions…</h3>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-4">
//         <h3 className="text-lg text-red-600">Failed to load permissions</h3>
//       </div>
//     );
//   }

//   // --- UI
//   return (
//     <>
//       <div className="space-y-4">
//         <div className="bg-white shadow-xs border rounded-sm p-4">
//           <h3 className="text-xl">Manage {roleName} Permissions</h3>
//           <p className="text-sm text-muted-foreground">
//             Click on any permission to change its access level
//           </p>

//           <div className="grid grid-cols-3 gap-16 my-4">
//             <Card className="p-4 border-green-200 bg-green-50 rounded-md text-center">
//               <div className="text-xl text-green-700">{counts.full}</div>
//               <div className="mt-1 text-green-700">Full Access</div>
//             </Card>

//             <Card className="p-4 border-amber-200 bg-amber-50 rounded-lg text-center">
//               <div className="text-xl text-amber-700">{counts.conditional}</div>
//               <div className="mt-1 text-amber-700">Conditional</div>
//             </Card>

//             <Card className="p-4 border-rose-200 bg-rose-50 rounded-lg text-center">
//               <div className="text-xl text-rose-700">{counts.none}</div>
//               <div className="mt-1 text-rose-700">No Access</div>
//             </Card>
//           </div>
//         </div>

//         <Accordion type="multiple" className="space-y-4 w-full">
//           {Object.entries(groupedPermissions).map(
//             ([moduleName, permissions]) => (
//               <AccordionItem key={moduleName} value={moduleName}>
//                 <div className="rounded-md border bg-white shadow-sm overflow-hidden">
//                   <AccordionTrigger className="flex items-center justify-between px-5 py-4 bg-transparent border-none hover:no-underline">
//                     <div className="flex items-center gap-3">
//                       <div className="w-fit px-3 py-2 rounded-md bg-indigo-50 text-indigo-500 text-[16px] font-light">
//                         {moduleName}
//                       </div>
//                       <div className="text-[16px] text-muted-foreground font-light">
//                         {permissions.length} permissions
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       {hasModule(moduleName) && (
//                         <>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               grantAllInModule(moduleName);
//                             }}
//                             className="border border-green-200 bg-green-50 text-green-700"
//                           >
//                             Grant All
//                           </Button>

//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               revokeAllInModule(moduleName);
//                             }}
//                             className="border border-rose-200 bg-rose-50 text-rose-700"
//                           >
//                             Revoke All
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                   </AccordionTrigger>

//                   <AccordionContent>
//                     <div className="border-t divide-y">
//                       {permissions.map((p) => {
//                         const current = states.get(p.id) ?? "none";

//                         return (
//                           <div
//                             key={p.id}
//                             className="flex items-center justify-between py-4 px-6"
//                           >
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <span className="font-normal text-[16px]">
//                                   {p.resource.name}
//                                 </span>
//                                 <Badge variant="secondary" className="text-xs">
//                                   {p.action.key}
//                                 </Badge>
//                               </div>

//                               <div className="text-sm text-muted-foreground mt-1">
//                                 {p.key}
//                               </div>
//                             </div>

//                             <div className="flex items-center gap-3">
//                               <button
//                                 onClick={() => setPermissionState(p.id, "full")}
//                                 className={`px-4 py-2 rounded-md border ${
//                                   current === "full"
//                                     ? "bg-green-50 border-green-300 text-green-700"
//                                     : "border-gray-200 text-gray-700 bg-white"
//                                 }`}
//                               >
//                                 ✓ Full
//                               </button>

//                               {/* <button
//                                 onClick={() =>
//                                   changePermissionState(p.id, "conditional")
//                                 }
//                                 className={`px-4 py-2 rounded-md border opacity-60 cursor-not-allowed ${
//                                   current === "conditional"
//                                     ? "bg-amber-50 border-amber-300 text-amber-700"
//                                     : "border-gray-200 text-gray-700 bg-white"
//                                 }`}
//                                 disabled
//                               >
//                                 ! Conditional
//                               </button> */}
//                               <TooltipProvider>
//                                 <Tooltip>
//                                   <TooltipTrigger asChild>
//                                     {/* wrapper needed because disabled buttons don't trigger events */}
//                                     <span className="inline-block">
//                                       <button
//                                         onClick={() =>
//                                           changePermissionState(
//                                             p.id,
//                                             "conditional"
//                                           )
//                                         }
//                                         className={`px-4 py-2 rounded-md border ${
//                                           current === "conditional"
//                                             ? "bg-amber-50 border-amber-300 text-amber-700"
//                                             : "border-gray-200 text-gray-700 bg-white"
//                                         }`}
//                                         disabled
//                                       >
//                                         ! Conditional
//                                       </button>
//                                     </span>
//                                   </TooltipTrigger>

//                                   <TooltipContent side="top">
//                                     <p className="text-sm">
//                                       🚧 Coming soon
//                                     </p>
//                                   </TooltipContent>
//                                 </Tooltip>
//                               </TooltipProvider>

//                               <button
//                                 onClick={() => setPermissionState(p.id, "none")}
//                                 className={`px-4 py-2 rounded-md border ${
//                                   current === "none"
//                                     ? "bg-rose-50 border-rose-300 text-rose-700"
//                                     : "border-gray-200 text-gray-700 bg-white"
//                                 }`}
//                               >
//                                 ✕ None
//                               </button>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </AccordionContent>
//                 </div>
//               </AccordionItem>
//             )
//           )}
//         </Accordion>
//       </div>

//       <ConditionEditorDialog
//         open={openDialog}
//         onOpenChange={setOpenDialog}
//         defaultValue={conditionsDraft}
//         onSave={(g) => saveCondition(g)}
//         fieldHints={["ticket.createdBy", "ticket.status", "project.ownerId"]}
//         operators={[
//           "=",
//           "!=",
//           ">",
//           "<",
//           "in",
//           "not in",
//           "contains",
//           "startsWith",
//           "before",
//           "after",
//         ]}
//         title="Edit Access Conditions"
//       />
//     </>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  useGrantAllModulePermissions,
  useRevokeAllModulePermissions,
  useRolePermissions,
  useUpdateRolePermissionAccess,
} from "../hooks";
import { ConditionEditorDialog } from "@/components/condition-builder/ConditionEditorDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Check,
  X,
  AlertCircle,
  ChevronRight,
  Users,
  Shield,
} from "lucide-react";
import { ComingSoonTooltip } from "@/components/ComingSoonTooltip";

/**
 * Clean, production-ready PermissionManager
 * - Proper loading guard
 * - Derives counts reliably from backend source of truth
 * - Optimistic UI with rollback on mutation errors
 * - Clear responsibilities and well-typed props
 */

type PermissionState = "full" | "conditional" | "none";

type Permission = {
  id: string;
  name: string;
  key: string;
  action: { id: string; name: string; key: string };
  resource: {
    id: string;
    name: string;
    key: string;
    module: { id: string; name: string };
  };
};

type GroupedPermissions = Record<string, Permission[]>;

export default function PermissionManager({
  groupedPermissions,
  roleName,
  roleId,
}: {
  groupedPermissions: GroupedPermissions;
  roleName: string;
  roleId: string;
}) {
  // --- Backend data
  const {
    data: rolePermissions,
    isLoading,
    isError,
  } = useRolePermissions(roleId);

  // --- Local UI state: map permissionId -> PermissionState
  const [states, setStates] = useState<Map<string, PermissionState>>(new Map());

  // Conditional editor state
  const [editingPermission, setEditingPermission] = useState<string | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [conditionsDraft, setConditionsDraft] = useState<any | null>(null);

  // Mutations
  const updatePermission = useUpdateRolePermissionAccess();
  const grantAllMutation = useGrantAllModulePermissions();
  const revokeAllMutation = useRevokeAllModulePermissions();

  const hasModule = (moduleName: string) => {
    const first = groupedPermissions[moduleName]?.[0];
    return Boolean(first?.resource?.module?.id);
  };

  // --- Helper: map backend accessLevel -> UI state
  const backendToState = (accessLevel?: string | null): PermissionState => {
    if (!accessLevel) return "none";
    switch (accessLevel) {
      case "FULL":
      case "full":
        return "full";
      case "CONDITIONAL":
      case "conditional":
        return "conditional";
      default:
        return "none";
    }
  };

  // --- Sync backend -> local states when backend data changes
  // Use rolePermissions as the single source of truth. Only run when rolePermissions changes.
  useEffect(() => {
    if (!rolePermissions) return;

    const map = new Map<string, PermissionState>();

    Object.values(groupedPermissions).forEach((perms) => {
      perms.forEach((p) => {
        const backend = rolePermissions.find(
          (rp: any) => rp.permissionId === p.id
        );
        map.set(p.id, backendToState(backend?.accessLevel));
      });
    });

    setStates(map);
  }, [rolePermissions, groupedPermissions]);

  // --- Counts derived from the local states (which are initialized from backend)
  const counts = useMemo(() => {
    let full = 0;
    let conditional = 0;
    let none = 0;

    for (const v of states.values()) {
      if (v === "full") full++;
      else if (v === "conditional") conditional++;
      else none++;
    }

    return { full, conditional, none };
  }, [states]);

  // --- Optimistic state updater with rollback support
  function optimisticUpdate(permissionId: string, next: PermissionState) {
    setStates((prev) => {
      const copy = new Map(prev);
      copy.set(permissionId, next);
      return copy;
    });
  }

  function rollbackState(old: Map<string, PermissionState>) {
    setStates(new Map(old));
  }

  // --- Action handlers
  const setPermissionState = (permissionId: string, next: PermissionState) => {
    const old = new Map(states);
    optimisticUpdate(permissionId, next);

    const payload: any = {
      accessLevel:
        next === "full"
          ? "FULL"
          : next === "conditional"
          ? "CONDITIONAL"
          : "NONE",
    };

    updatePermission.mutate(
      payload
        ? { roleId, permissionId, payload }
        : { roleId, permissionId, payload },
      {
        onError: () => rollbackState(old),
      }
    );
  };

  // When user selects conditional, open dialog first (optimistic UI already set)
  const changePermissionState = (
    permissionId: string,
    next: PermissionState
  ) => {
    const old = new Map(states);
    optimisticUpdate(permissionId, next);

    if (next === "conditional") {
      const backend = rolePermissions?.find(
        (rp: any) => rp.permissionId === permissionId
      );

      // Load saved backend conditions (or null if none)
      setConditionsDraft(backend?.conditions ?? null);

      setEditingPermission(permissionId);
      setOpenDialog(true);
      return;
    }

    // full / none
    setPermissionState(permissionId, next);
  };

  const saveCondition = (finalCondition: any) => {
    if (!editingPermission) return;
    const permissionId = editingPermission;
    const old = new Map(states);

    // already optimistically set to conditional when we opened dialog
    updatePermission.mutate(
      {
        roleId,
        permissionId,
        payload: { accessLevel: "CONDITIONAL", conditions: finalCondition },
      },
      {
        onError: () => rollbackState(old),
      }
    );

    setEditingPermission(null);
    setOpenDialog(false);
  };

  // Grant all in module (optimistic bulk)
  const grantAllInModule = (moduleName: string) => {
    const moduleId =
      groupedPermissions[moduleName]?.[0]?.resource?.module?.id ?? null;
    if (!moduleId) return;

    const old = new Map(states);

    // optimistic UI
    setStates((prev) => {
      const copy = new Map(prev);
      groupedPermissions[moduleName]?.forEach((p) => copy.set(p.id, "full"));
      return copy;
    });

    grantAllMutation.mutate(
      { roleId, moduleId },
      {
        onError: () => rollbackState(old),
      }
    );
  };

  const revokeAllInModule = (moduleName: string) => {
    const moduleId =
      groupedPermissions[moduleName]?.[0]?.resource?.module?.id ?? null;
    if (!moduleId) return;

    const old = new Map(states);

    setStates((prev) => {
      const copy = new Map(prev);
      groupedPermissions[moduleName]?.forEach((p) => copy.set(p.id, "none"));
      return copy;
    });

    revokeAllMutation.mutate(
      { roleId, moduleId },
      {
        onError: () => rollbackState(old),
      }
    );
  };

  // --- Loading / error guards
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="space-y-3 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-sm text-gray-500">Loading permissions...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-red-800">
            Failed to load permissions
          </h3>
          <p className="text-sm text-red-600 mt-1">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  // --- UI
  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-500" />
                <h1 className="text-2xl font-semibold text-gray-900">
                  Permissions
                </h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Managing permissions for{" "}
                <span className="font-medium text-indigo-600">{roleName}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>Role</span>
            </div>
          </div>

          {/* Stats Cards - Minimal */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-linear-to-br from-green-50 to-green-25 border border-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Full Access
                  </p>
                  <p className="text-2xl font-bold text-green-900 mt-1">
                    {counts.full}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-amber-50 to-amber-25 border border-amber-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700">
                    Conditional
                  </p>
                  <p className="text-2xl font-bold text-amber-900 mt-1">
                    {counts.conditional}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-gray-50 to-gray-25 border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">No Access</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {counts.none}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <X className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Click on any permission to change its access level
          </p>

          <Accordion type="multiple" className="space-y-3">
            {Object.entries(groupedPermissions).map(
              ([moduleName, permissions]) => (
                <AccordionItem
                  key={moduleName}
                  value={moduleName}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-gray-50">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-50">
                          <ChevronRight className="h-4 w-4 text-indigo-500 accordion-chevron" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-900 text-left">
                            {moduleName}
                          </h3>
                          <p className="text-sm text-gray-500 text-left">
                            {permissions.length} permission
                            {permissions.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {hasModule(moduleName) && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                grantAllInModule(moduleName);
                              }}
                              className="h-8 px-3 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              Grant All
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                revokeAllInModule(moduleName);
                              }}
                              className="h-8 px-3 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            >
                              Revoke All
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-0">
                    <div className="space-y-6 py-4">
                      {(() => {
                        // Group permissions by resource name
                        const groupedByResource = permissions.reduce(
                          (acc, p) => {
                            if (!acc[p.resource.name]) {
                              acc[p.resource.name] = [];
                            }
                            acc[p.resource.name].push(p);
                            return acc;
                          },
                          {} as Record<string, typeof permissions>
                        );

                        return Object.entries(groupedByResource).map(
                          ([resourceName, resourcePerms]) => (
                            <div key={resourceName} className="space-y-3">
                              {/* Resource Header */}
                              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                <div className="space-y-1">
                                  <h4 className="text-base font-semibold text-gray-900">
                                    {resourceName}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {resourcePerms.length} permission
                                    {resourcePerms.length !== 1 ? "s" : ""}
                                  </p>
                                </div>

                                {/* Quick actions for this resource */}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      resourcePerms.forEach((p) =>
                                        setPermissionState(p.id, "full")
                                      );
                                    }}
                                    className="text-xs px-3 py-1.5 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                                  >
                                    Allow All
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      resourcePerms.forEach((p) =>
                                        setPermissionState(p.id, "none")
                                      );
                                    }}
                                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    Deny All
                                  </button>
                                </div>
                              </div>

                              {/* Permissions Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {resourcePerms.map((p) => {
                                  const current = states.get(p.id) ?? "none";

                                  return (
                                    <div
                                      key={p.id}
                                      className="group relative border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all bg-white"
                                    >
                                      {/* Status indicator */}
                                      <div className="absolute top-4 right-4">
                                        <div
                                          className={`h-3 w-3 rounded-full ${
                                            current === "full"
                                              ? "bg-green-500"
                                              : current === "conditional"
                                              ? "bg-amber-500"
                                              : "bg-gray-300"
                                          }`}
                                        />
                                      </div>

                                      <div className="space-y-3">
                                        {/* Action and Module */}
                                        <div className="space-y-1">
                                          <div className="flex items-center gap-2">
                                            <Badge
                                              variant="outline"
                                              className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-200"
                                            >
                                              {p.action.name}
                                            </Badge>
                                            {p.resource.module?.name && (
                                              <span className="text-xs text-gray-500">
                                                {p.resource.module.name}
                                              </span>
                                            )}
                                          </div>

                                          <h5 className="text-sm font-medium text-gray-900">
                                            {p.action.name} {resourceName}
                                          </h5>
                                        </div>

                                        {/* Permission Key */}
                                        <div className="bg-gray-50 rounded-lg p-2">
                                          <code className="text-xs text-gray-600 font-mono break-all">
                                            {p.key}
                                          </code>
                                        </div>

                                        {/* Access Controls */}
                                        <div className="pt-2">
                                          <div className="flex items-center justify-between">
                                            {/* Quick Toggle Buttons */}
                                            <div className="flex items-center gap-1">
                                              <button
                                                onClick={() =>
                                                  setPermissionState(
                                                    p.id,
                                                    "full"
                                                  )
                                                }
                                                className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border ${
                                                  current === "full"
                                                    ? "border-green-300 bg-green-50 text-green-700"
                                                    : "border-gray-200 text-gray-600 hover:bg-green-50 hover:border-green-200"
                                                }`}
                                              >
                                                <Check className="h-3.5 w-3.5" />
                                                Allow
                                              </button>

                                              <ComingSoonTooltip>
                                                <button
                                                  onClick={() =>
                                                    changePermissionState(
                                                      p.id,
                                                      "conditional"
                                                    )
                                                  }
                                                  className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border cursor-not-allowed ${
                                                    current === "conditional"
                                                      ? "border-amber-300 bg-amber-50 text-amber-700"
                                                      : "border-gray-200 text-gray-400 bg-gray-50"
                                                  }`}
                                                  disabled
                                                >
                                                  <AlertCircle className="h-3.5 w-3.5" />
                                                  Conditional
                                                </button>
                                              </ComingSoonTooltip>

                                              <button
                                                onClick={() =>
                                                  setPermissionState(
                                                    p.id,
                                                    "none"
                                                  )
                                                }
                                                className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border ${
                                                  current === "none"
                                                    ? "border-gray-300 bg-gray-100 text-gray-700"
                                                    : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                                }`}
                                              >
                                                <X className="h-3.5 w-3.5" />
                                                Deny
                                              </button>
                                            </div>

                                            {/* Status Label */}
                                            <span
                                              className={`text-xs font-medium px-2 py-1 rounded ${
                                                current === "full"
                                                  ? "text-green-700 bg-green-50"
                                                  : current === "conditional"
                                                  ? "text-amber-700 bg-amber-50"
                                                  : "text-gray-600 bg-gray-50"
                                              }`}
                                            >
                                              {current.charAt(0).toUpperCase() +
                                                current.slice(1)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )
                        );
                      })()}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      </div>

      <ConditionEditorDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        defaultValue={conditionsDraft}
        onSave={(g) => saveCondition(g)}
        fieldHints={["ticket.createdBy", "ticket.status", "project.ownerId"]}
        operators={[
          "=",
          "!=",
          ">",
          "<",
          "in",
          "not in",
          "contains",
          "startsWith",
          "before",
          "after",
        ]}
        title="Edit Access Conditions"
      />

      <style jsx global>{`
        .accordion-chevron {
          transition: transform 200ms ease;
        }
        [data-state="open"] .accordion-chevron {
          transform: rotate(90deg);
        }
      `}</style>
    </>
  );
}
