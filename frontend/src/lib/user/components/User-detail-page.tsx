"use client";

import { useState } from "react";
import {
  useAssignUserRole,
  useBulkAssignUserRoles,
  useBulkRevokeUserRoles,
  useRevokeUserRole,
  useUser,
} from "../hooks";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRoles } from "@/lib/role/hooks";
import { RoleManager } from "./roleManager";
import apiClient from "@/lib/api/apiClient";

export default function UserDetail({ userId }: { userId: string }) {
  const [page] = useState(1);
  const [pageSize] = useState(100);
  const [search] = useState("");
  const [filters] = useState({});
  const [sortColumn] = useState("createdAt");
  const [sortOrder] = useState<"asc" | "desc">("desc");

  const { data: userData } = useUser(userId);

  const { data: roleData } = useRoles({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });

  const roles = roleData?.roles.data ?? [];

  const assignRole = useAssignUserRole();
  const revokeRole = useRevokeUserRole();
  const bulkAssign = useBulkAssignUserRoles();
  const bulkRevoke = useBulkRevokeUserRoles();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="roles">Manage Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="rounded-lg border p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">User Details</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <RoleManager
            roles={roles}
            userId={userId}
            userName={userData?.name}
            assignedRoles={userData?.roles?.map((r: any) => r.roleId) ?? []}
            onAssign={(roleId) =>
              assignRole.mutateAsync({ userId: userId, roleId })
            }
            onUnassign={(roleId) =>
              revokeRole.mutateAsync({ userId: userId, roleId })
            }
            onAssignMany={(roleIds) =>
              bulkAssign.mutateAsync({ userId: userId, roleIds })
            }
            onUnassignMany={(roleIds) =>
              bulkRevoke.mutateAsync({ userId: userId, roleIds })
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
