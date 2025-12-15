"use client";

import { useState } from "react";
import { usePermissions } from "@/lib/permission/hooks";
import { useRole } from "../hooks";
import PermissionManager from "./PermissionManager";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function RoleDetail({ id }: { id: string }) {
  const [page] = useState(1);
  const [pageSize] = useState(100);
  const [search] = useState("");
  const [filters] = useState({});
  const [sortColumn] = useState("createdAt");
  const [sortOrder] = useState<"asc" | "desc">("desc");

  const { data: roleData } = useRole(id);

  const { data: permissionData } = usePermissions({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });

  const groupByModule = (permissions: any[]) => {
    const grouped: Record<string, any[]> = {};

    permissions.forEach((p) => {
      const resourceKey = p.resource?.key ?? "UNKNOWN_RESOURCE";
      const moduleName = p.resource?.module?.name;

      // If no module → use readable version of resource key
      const groupName = moduleName ? moduleName : toReadableTitle(resourceKey);

      if (!grouped[groupName]) grouped[groupName] = [];
      grouped[groupName].push(p);
    });

    return grouped;
  };

  const groupedPermissions = groupByModule(
    permissionData?.permissions.data ?? []
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="rounded-lg border p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Role Details</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(roleData, null, 2)}
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionManager
            groupedPermissions={groupedPermissions}
            roleName={roleData?.name}
            roleId={id}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const toReadableTitle = (key: string = ""): string => {
  return key
    .toLowerCase() 
    .replace(/_/g, " ") 
    .replace(/\b\w/g, (c) => c.toUpperCase()); 
};

