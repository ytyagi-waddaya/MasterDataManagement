// "use client";

// import { useState } from "react";
// import { usePermissions } from "@/lib/permission/hooks";
// import { useRole } from "../hooks";
// import PermissionManager from "./PermissionManager";

// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// export default function RoleDetail({ id }: { id: string }) {
//   const [page] = useState(1);
//   const [pageSize] = useState(100);
//   const [search] = useState("");
//   const [filters] = useState({});
//   const [sortColumn] = useState("createdAt");
//   const [sortOrder] = useState<"asc" | "desc">("desc");

//   const { data: roleData } = useRole(id);

//   const { data: permissionData } = usePermissions({
//     page,
//     limit: pageSize,
//     search,
//     filters,
//     sortBy: sortColumn,
//     sortOrder,
//   });

//   const groupByModule = (permissions: any[]) => {
//     const grouped: Record<string, any[]> = {};

//     permissions.forEach((p) => {
//       const resourceKey = p.resource?.key ?? "UNKNOWN_RESOURCE";
//       const moduleName = p.resource?.module?.name;

//       // If no module → use readable version of resource key
//       const groupName = moduleName ? moduleName : toReadableTitle(resourceKey);

//       if (!grouped[groupName]) grouped[groupName] = [];
//       grouped[groupName].push(p);
//     });

//     return grouped;
//   };

//   const groupedPermissions = groupByModule(
//     permissionData?.permissions.data ?? []
//   );

//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="details" className="w-full">
//         <TabsList className="mb-4">
//           <TabsTrigger value="details">Details</TabsTrigger>
//           <TabsTrigger value="permissions">Permissions</TabsTrigger>
//         </TabsList>

//         {/* <TabsContent value="details">
//           <div className="rounded-lg border p-4 bg-gray-50">
//             <h3 className="text-lg font-semibold mb-2">Role Details</h3>

//           </div>
//         </TabsContent> */}
//         <TabsContent value="details">
//   <div className="space-y-4">
//     {/* Minimal Header */}
//     <div className="bg-white border border-gray-200 rounded-lg p-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">
//             {roleData?.name}
//           </h2>
//           <div className="flex items-center gap-2 mt-1">
//             <code className="text-sm text-gray-500">{roleData?.key}</code>
//             <div className={`h-2 w-2 rounded-full ${
//               roleData?.isActive ? 'bg-green-500' : 'bg-gray-400'
//             }`} />
//             <span className="text-sm text-gray-500">
//               {roleData?.users?.length || 0} users
//             </span>
//             <span className="text-sm text-gray-500">
//               {roleData?.permissions?.length || 0} permissions
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Users - Minimal */}
//     {roleData?.users && roleData.users.length > 0 && (
//       <div className="bg-white border border-gray-200 rounded-lg p-4">
//         <h3 className="font-medium text-gray-900 mb-3">
//           Users ({roleData.users.length})
//         </h3>
//         <div className="space-y-2">
//           {roleData.users.map((userAssignment) => (
//             <div key={userAssignment.id} className="flex items-center justify-between py-2">
//               <div className="flex items-center gap-2">
//                 <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
//                   <span className="text-sm font-medium text-gray-700">
//                     {userAssignment.user.name?.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-900">
//                     {userAssignment.user.name}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     {userAssignment.user.email}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-xs text-gray-500">
//                 {new Date(userAssignment.assignedAt).toLocaleDateString()}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Permissions - Minimal */}
//     {roleData?.permissions && roleData.permissions.length > 0 && (
//       <div className="bg-white border border-gray-200 rounded-lg p-4">
//         <h3 className="font-medium text-gray-900 mb-3">
//           Permissions ({roleData.permissions.length})
//         </h3>
//         <div className="space-y-2">
//           {roleData.permissions.map((permissionAssignment) => (
//             <div key={permissionAssignment.id} className="py-2">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm font-medium text-gray-900">
//                   {permissionAssignment.permission.name}
//                 </span>
//                 <span className={`text-xs px-2 py-0.5 rounded ${
//                   permissionAssignment.accessLevel === 'FULL'
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}>
//                   {permissionAssignment.accessLevel}
//                 </span>
//               </div>
//               <div className="text-xs text-gray-500">
//                 {permissionAssignment.permission.key}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// </TabsContent>

//         <TabsContent value="permissions">
//           <PermissionManager
//             groupedPermissions={groupedPermissions}
//             roleName={roleData?.name}
//             roleId={id}
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// const toReadableTitle = (key: string = ""): string => {
//   return key
//     .toLowerCase()
//     .replace(/_/g, " ")
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// };

//             <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
//               {JSON.stringify(roleData, null, 2)}
//             </pre>

"use client";

import { useState } from "react";
import { usePermissions } from "@/lib/permission/hooks";
import { useRole } from "../hooks";
import PermissionManager from "./PermissionManager";
import {
  Users,
  Key,
  ChevronRight,
  Mail,
  Shield,
  UserPlus,
  Settings,
  Check,
  X,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComingSoonTooltip } from "@/components/ComingSoonTooltip";

export default function RoleDetail({ id }: { id: string }) {
  const [page] = useState(1);
  const [pageSize] = useState(100);
  const [search] = useState("");
  const [filters] = useState({});
  const [sortColumn] = useState("createdAt");
  const [sortOrder] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState<"overview" | "permissions">(
    "overview"
  );

  const { data: roleData } = useRole(id);
  const { data: permissionData } = usePermissions({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllPermissions, setShowAllPermissions] = useState(false);

  const groupByModule = (permissions: any[]) => {
    const grouped: Record<string, any[]> = {};

    permissions.forEach((p) => {
      const resourceKey = p.resource?.key ?? "UNKNOWN_RESOURCE";
      const moduleName = p.resource?.module?.name;
      const groupName = moduleName ? moduleName : toReadableTitle(resourceKey);

      if (!grouped[groupName]) grouped[groupName] = [];
      grouped[groupName].push(p);
    });

    return grouped;
  };
  const visibleUsers = showAllUsers
    ? roleData?.users
    : roleData?.users.slice(0, 4);

  const visiblePermissions = showAllPermissions
    ? roleData?.permissions
    : roleData?.permissions.slice(0, 4);

  const groupedPermissions = groupByModule(
    permissionData?.permissions.data ?? []
  );

  const userCount = roleData?.users?.length || 0;
  const permissionCount = roleData?.permissions?.length || 0;
  const activeUsers =
    roleData?.users?.filter(
      (u: { user: { status: string } }) => u.user.status === "ACTIVE"
    ).length || 0;
  const permissionsList = permissionData?.permissions?.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with subtle gradient */}
      <div className="bg-linear-to-r from-white via-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                {roleData?.isActive && (
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {roleData?.name}
                  </h1>
                  {roleData?.isSystem && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                      System
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <code className="text-sm text-gray-500 font-mono">
                    {roleData?.key}
                  </code>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-500">
                    {userCount} users • {permissionCount} permissions
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.history.back()}
                className="h-9 px-3.5 flex items-center gap-2 border-gray-300 hover:border-gray-400"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </Button>
              <ComingSoonTooltip>
                <button className="h-9 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Edit Role</span>
                </button>
              </ComingSoonTooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 py-8">
        {/* Sleek Tab Navigation */}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`relative px-1 py-2 text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
            {activeTab === "overview" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`relative px-1 py-2 text-sm font-medium transition-colors ${
              activeTab === "permissions"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Permissions
            {activeTab === "permissions" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
            )}
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Users */}
            <div className="lg:col-span-2 space-y-6">
              {/* Users Card */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900">Users</h2>
                        <p className="text-sm text-gray-500">
                          {activeUsers} active • {userCount} total
                        </p>
                      </div>
                    </div>
                    <ComingSoonTooltip>
                      <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                        <UserPlus className="h-4 w-4 inline mr-1.5" />
                        Assign
                      </button>
                    </ComingSoonTooltip>
                  </div>
                </div>

                {/* <div className="divide-y divide-gray-100"> */}
                <div className="max-h-150 overflow-y-auto divide-y scrollbar-hide">
                  {userCount > 0 ? (
                    // roleData.users.slice(0, 4).map(
                    visibleUsers.map(
                      (userAssignment: {
                        id: string;
                        assignedAt: string;
                        user: {
                          name: string;
                          email: string;
                          status: string;
                        };
                      }) => (
                        <div
                          key={userAssignment.id}
                          className="p-4 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-700">
                                  {userAssignment.user.name?.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {userAssignment.user.name}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {userAssignment.user.email}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(
                                userAssignment.assignedAt
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="p-8 text-center">
                      <Users className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">No users assigned</p>
                    </div>
                  )}

                  {userCount > 4 && !showAllUsers && (
                    <div className="p-4 text-center">
                      <button
                        onClick={() => setShowAllUsers(true)}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        View all {userCount} users{" "}
                        <ChevronRight className="h-4 w-4 inline ml-1" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Permissions Summary Card */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-green-50 flex items-center justify-center">
                        <Key className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          Permissions
                        </h2>
                        <p className="text-sm text-gray-500">
                          {permissionCount} total permissions
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab("permissions")}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Manage All
                    </button>
                  </div>
                </div>

                {/* <div className="divide-y divide-gray-100"> */}
                <div className="max-h-150 overflow-y-auto divide-y scrollbar-hide">
                  {permissionCount > 0 ? (
                    // roleData.permissions.slice(0, 4).map(
                    visiblePermissions.map(
                      (permissionAssignment: {
                        id: string;
                        accessLevel: string;
                        permission: {
                          name: string;
                          key: string;
                        };
                      }) => (
                        <div
                          key={permissionAssignment.id}
                          className="p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">
                                  {permissionAssignment.permission.name}
                                </span>
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                                    permissionAssignment.accessLevel === "FULL"
                                      ? "bg-green-50 text-green-700 border border-green-100"
                                      : "bg-gray-50 text-gray-700 border border-gray-200"
                                  }`}
                                >
                                  {permissionAssignment.accessLevel ===
                                  "FULL" ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                  {permissionAssignment.accessLevel}
                                </span>
                              </div>
                              <code className="text-xs text-gray-500 font-mono">
                                {permissionAssignment.permission.key}
                              </code>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="p-8 text-center">
                      <Key className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">
                        No permissions assigned
                      </p>
                    </div>
                  )}

                  {permissionCount > 4 && !showAllPermissions && (
                    <div className="p-4 text-center">
                      <button
                        onClick={() => setShowAllPermissions(true)}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        View all {permissionCount} permissions{" "}
                        <ChevronRight className="h-4 w-4 inline ml-1" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Role Info & Actions */}
            <div className="space-y-6">
              {/* Role Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Role Details
                </h3>

                <div className="space-y-4">
                  {roleData?.description && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1.5">
                        Description
                      </p>
                      <p className="text-sm text-gray-700">
                        {roleData.description}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Status</span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                          roleData?.isActive
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            roleData?.isActive ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                        {roleData?.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Created</span>
                      <span className="text-sm text-gray-700">
                        {roleData?.createdAt &&
                          new Date(roleData.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Last Updated
                      </span>
                      <span className="text-sm text-gray-700">
                        {roleData?.updatedAt &&
                          new Date(roleData.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>

                <div className="space-y-2">
                  <ComingSoonTooltip>
                    <button
                      className="w-full flex items-center justify-between p-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                      disabled
                    >
                      <div className="flex items-center gap-2.5">
                        <UserPlus className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                        <span>Assign New User</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400" />
                    </button>
                  </ComingSoonTooltip>
                  <button
                    onClick={() => setActiveTab("permissions")}
                    className="w-full flex items-center justify-between p-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Key className="h-4 w-4 text-gray-400 group-hover:text-green-500" />
                      <span>Manage Permissions</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400" />
                  </button>
                  <ComingSoonTooltip>
                    <button
                      className="w-full flex items-center justify-between p-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                      disabled
                    >
                      <div className="flex items-center gap-2.5">
                        <Settings className="h-4 w-4 text-gray-400 group-hover:text-purple-500" />
                        <span>Role Settings</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400" />
                    </button>
                  </ComingSoonTooltip>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === "permissions" && (
          <div>
            {permissionsList.length > 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-4">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        Permission Management
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Manage permissions for {roleData?.name} role
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-1">
                  <PermissionManager
                    groupedPermissions={groupedPermissions}
                    roleName={roleData?.name}
                    roleId={id}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Key className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No permissions configured
                </h3>
                <p className="text-gray-500 mb-6">
                  Add permissions to define what this role can access
                </p>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:border-gray-400 rounded-lg transition-colors">
                  Browse Permissions
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const toReadableTitle = (key: string = ""): string => {
  return key
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};
