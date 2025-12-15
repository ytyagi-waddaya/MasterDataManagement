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

  // --- Condition preview helper (kept simple)
  function formatConditionPreview(condition: any): string {
    if (!condition) return "";
    if (condition.field && condition.operator) {
      return `${condition.field} ${condition.operator} ${
        Array.isArray(condition.value)
          ? `[${condition.value.join(", ")}]`
          : condition.value
      }`;
    }
    if (condition.op && Array.isArray(condition.rules)) {
      return condition.rules
        .map((r: any) => formatConditionPreview(r))
        .join(` ${condition.op} `);
    }
    return "Condition";
  }

  // --- Loading / error guards
  if (isLoading) {
    return (
      <div className="p-4">
        <h3 className="text-lg">Loading permissions…</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <h3 className="text-lg text-red-600">Failed to load permissions</h3>
      </div>
    );
  }

  // --- UI
  return (
    <>
      <div className="space-y-4">
        <div className="bg-white shadow-xs border rounded-sm p-4">
          <h3 className="text-xl">Manage {roleName} Permissions</h3>
          <p className="text-sm text-muted-foreground">
            Click on any permission to change its access level
          </p>

          <div className="grid grid-cols-3 gap-16 my-4">
            <Card className="p-4 border-green-200 bg-green-50 rounded-md text-center">
              <div className="text-xl text-green-700">{counts.full}</div>
              <div className="mt-1 text-green-700">Full Access</div>
            </Card>

            <Card className="p-4 border-amber-200 bg-amber-50 rounded-lg text-center">
              <div className="text-xl text-amber-700">{counts.conditional}</div>
              <div className="mt-1 text-amber-700">Conditional</div>
            </Card>

            <Card className="p-4 border-rose-200 bg-rose-50 rounded-lg text-center">
              <div className="text-xl text-rose-700">{counts.none}</div>
              <div className="mt-1 text-rose-700">No Access</div>
            </Card>
          </div>
        </div>

        <Accordion type="multiple" className="space-y-4 w-full">
          {Object.entries(groupedPermissions).map(
            ([moduleName, permissions]) => (
              <AccordionItem key={moduleName} value={moduleName}>
                <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                  <AccordionTrigger className="flex items-center justify-between px-5 py-4 bg-transparent border-none hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-fit px-3 py-2 rounded-md bg-indigo-50 text-indigo-500 text-[16px] font-light">
                        {moduleName}
                      </div>
                      <div className="text-[16px] text-muted-foreground font-light">
                        {permissions.length} permissions
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
                            className="border border-green-200 bg-green-50 text-green-700"
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
                            className="border border-rose-200 bg-rose-50 text-rose-700"
                          >
                            Revoke All
                          </Button>
                        </>
                      )}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="border-t divide-y">
                      {permissions.map((p) => {
                        const current = states.get(p.id) ?? "none";

                        return (
                          <div
                            key={p.id}
                            className="flex items-center justify-between py-4 px-6"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-normal text-[16px]">
                                  {p.resource.name}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {p.action.key}
                                </Badge>
                              </div>

                              <div className="text-sm text-muted-foreground mt-1">
                                {p.key}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setPermissionState(p.id, "full")}
                                className={`px-4 py-2 rounded-md border ${
                                  current === "full"
                                    ? "bg-green-50 border-green-300 text-green-700"
                                    : "border-gray-200 text-gray-700 bg-white"
                                }`}
                              >
                                ✓ Full
                              </button>

                              <button
                                onClick={() =>
                                  changePermissionState(p.id, "conditional")
                                }
                                className={`px-4 py-2 rounded-md border ${
                                  current === "conditional"
                                    ? "bg-amber-50 border-amber-300 text-amber-700"
                                    : "border-gray-200 text-gray-700 bg-white"
                                }`}
                              >
                                ! Conditional
                              </button>

                              <button
                                onClick={() => setPermissionState(p.id, "none")}
                                className={`px-4 py-2 rounded-md border ${
                                  current === "none"
                                    ? "bg-rose-50 border-rose-300 text-rose-700"
                                    : "border-gray-200 text-gray-700 bg-white"
                                }`}
                              >
                                ✕ None
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            )
          )}
        </Accordion>
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
    </>
  );
}
