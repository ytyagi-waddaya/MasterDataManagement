// "use client";

// import { useState } from "react";
// import {
//   useAssignUserRole,
//   useBulkAssignUserRoles,
//   useBulkRevokeUserRoles,
//   useRevokeUserRole,
//   useUser,
// } from "../hooks";

// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { useRoles } from "@/lib/role/hooks";
// import { RoleManager } from "./roleManager";
// import apiClient from "@/lib/api/apiClient";

// export default function UserDetail({ userId }: { userId: string }) {
//   const [page] = useState(1);
//   const [pageSize] = useState(100);
//   const [search] = useState("");
//   const [filters] = useState({});
//   const [sortColumn] = useState("createdAt");
//   const [sortOrder] = useState<"asc" | "desc">("desc");

//   const { data: userData } = useUser(userId);

//   const { data: roleData } = useRoles({
//     page,
//     limit: pageSize,
//     search,
//     filters,
//     sortBy: sortColumn,
//     sortOrder,
//   });

//   const roles = roleData?.roles.data ?? [];

//   const assignRole = useAssignUserRole();
//   const revokeRole = useRevokeUserRole();
//   const bulkAssign = useBulkAssignUserRoles();
//   const bulkRevoke = useBulkRevokeUserRoles();

//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="details" className="w-full">
//         <TabsList className="mb-4">
//           <TabsTrigger value="details">Details</TabsTrigger>
//           <TabsTrigger value="roles">Manage Roles</TabsTrigger>
//         </TabsList>

//         <TabsContent value="details">
//           <div className="rounded-lg border p-4 bg-gray-50">
//             <h3 className="text-lg font-semibold mb-2">User Details</h3>
//             <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
//               {JSON.stringify(userData, null, 2)}
//             </pre>
//           </div>
//         </TabsContent>

//         <TabsContent value="roles">
//           <RoleManager
//             roles={roles}
//             userId={userId}
//             userName={userData?.name}
//             assignedRoles={userData?.roles?.map((r: any) => r.roleId) ?? []}
//             onAssign={(roleId) =>
//               assignRole.mutateAsync({ userId: userId, roleId })
//             }
//             onUnassign={(roleId) =>
//               revokeRole.mutateAsync({ userId: userId, roleId })
//             }
//             onAssignMany={(roleIds) =>
//               bulkAssign.mutateAsync({ userId: userId, roleIds })
//             }
//             onUnassignMany={(roleIds) =>
//               bulkRevoke.mutateAsync({ userId: userId, roleIds })
//             }
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import {
//   useAssignUserRole,
//   useBulkAssignUserRoles,
//   useBulkRevokeUserRoles,
//   useRevokeUserRole,
//   useUser,
// } from "../hooks";

// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { useRoles } from "@/lib/role/hooks";
// import { RoleManager } from "./roleManager";
// import { Button } from "@/components/ui/button";
// import {
//   User,
//   Mail,
//   Shield,
//   Calendar,
//   ChevronRight,
//   ChevronLeft,
//   Building,
//   MapPin,
//   CheckCircle2,
//   Key,
//   Users
// } from "lucide-react";

// export default function UserDetail({ userId }: { userId: string }) {
//   const [page] = useState(1);
//   const [pageSize] = useState(100);
//   const [search] = useState("");
//   const [filters] = useState({});
//   const [sortColumn] = useState("createdAt");
//   const [sortOrder] = useState<"asc" | "desc">("desc");
//   const [activeTab, setActiveTab] = useState<"details" | "roles">("details");

//   const { data: userData } = useUser(userId);
//   const { data: roleData } = useRoles({
//     page,
//     limit: pageSize,
//     search,
//     filters,
//     sortBy: sortColumn,
//     sortOrder,
//   });

//   const roles = roleData?.roles.data ?? [];
//   const assignRole = useAssignUserRole();
//   const revokeRole = useRevokeUserRole();
//   const bulkAssign = useBulkAssignUserRoles();
//   const bulkRevoke = useBulkRevokeUserRoles();

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const statusColor = userData?.status === "ACTIVE"
//     ? "bg-green-100 text-green-700 border-green-200"
//     : "bg-gray-100 text-gray-700 border-gray-200";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sticky Header */}
//       <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center gap-4">
//           {/* Back Button */}
//           <Button
//             className="h-8 w-8 p-0 rounded-lg border-gray-300 hover:bg-gray-100"
//             onClick={() => window.history.back()}
//             variant="outline"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>

//           {/* User Info */}
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-lg bg-linear-to-br from-gray-900 to-gray-800">
//               <User className="h-5 w-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg font-semibold text-gray-900">{userData?.name}</h1>
//               <p className="text-sm text-gray-600 flex items-center gap-1">
//                 <Mail className="h-3 w-3" />
//                 {userData?.email}
//               </p>
//             </div>
//           </div>

//           {/* Status Badge - pushed to right */}
//           <div className="ml-auto">
//             <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
//               {userData?.status}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Panel - User Profile */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Profile Card */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6">
//               <div className="flex items-start gap-4 mb-6">
//                 <div className="h-16 w-16 rounded-full bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center">
//                   <div className="text-white text-xl font-medium">
//                     {userData?.name?.charAt(0)}
//                   </div>
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">{userData?.name}</h2>
//                   <p className="text-sm text-gray-600 mt-1">{userData?.email}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <div className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
//                       {userData?.status}
//                     </div>
//                     <div className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
//                       {userData?.type}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Info Grid */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between py-2">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <Building className="h-4 w-4" />
//                     <span className="text-sm">Department</span>
//                   </div>
//                   <span className="text-gray-900 font-medium">
//                     {userData?.department || "—"}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between py-2">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <MapPin className="h-4 w-4" />
//                     <span className="text-sm">Location</span>
//                   </div>
//                   <span className="text-gray-900 font-medium">
//                     {userData?.location || "—"}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between py-2">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <Calendar className="h-4 w-4" />
//                     <span className="text-sm">Member Since</span>
//                   </div>
//                   <span className="text-gray-900 font-medium">
//                     {formatDate(userData?.createdAt)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Assigned Roles */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-medium text-gray-900">Current Roles</h3>
//                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                   {userData?.roles?.length || 0} assigned
//                 </span>
//               </div>
//               <div className="space-y-2">
//                 {userData?.roles?.map((userRole: any) => (
//                   <div
//                     key={userRole.id}
//                     className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="p-1.5 rounded-md bg-blue-100">
//                         <Shield className="h-3.5 w-3.5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{userRole.role.name}</p>
//                         <p className="text-xs text-gray-500">{userRole.role.key}</p>
//                       </div>
//                     </div>
//                     <ChevronRight className="h-4 w-4 text-gray-400" />
//                   </div>
//                 )) || (
//                   <div className="text-center py-4 text-gray-500 text-sm">
//                     No roles assigned
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Main Content */}
//           <div className="lg:col-span-2">
//             {/* Tab Navigation */}
//             <div className="mb-8">
//               <div className="flex space-x-1 border-b border-gray-200">
//                 <button
//                   onClick={() => setActiveTab("details")}
//                   className={`px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
//                     activeTab === "details"
//                       ? "text-gray-900 border-b-2 border-gray-900"
//                       : "text-gray-500 hover:text-gray-900"
//                   }`}
//                 >
//                   <User className="h-4 w-4" />
//                   User Details
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("roles")}
//                   className={`px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
//                     activeTab === "roles"
//                       ? "text-gray-900 border-b-2 border-gray-900"
//                       : "text-gray-500 hover:text-gray-900"
//                   }`}
//                 >
//                   <Users className="h-4 w-4" />
//                   Role Management
//                 </button>
//               </div>
//             </div>

//             {/* Tab Content */}
//             {activeTab === "details" ? (
//               /* Details Content */
//               <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
//                   {/* Column 1 */}
//                   <div className="p-6">
//                     <div className="mb-6">
//                       <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
//                         Basic Information
//                       </h3>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="text-xs text-gray-500 block mb-1">Email Address</label>
//                           <div className="flex items-center gap-2 text-gray-900">
//                             <Mail className="h-4 w-4 text-gray-400" />
//                             {userData?.email}
//                           </div>
//                         </div>
//                         <div>
//                           <label className="text-xs text-gray-500 block mb-1">User Type</label>
//                           <div className="flex items-center gap-2 text-gray-900">
//                             <User className="h-4 w-4 text-gray-400" />
//                             {userData?.type}
//                           </div>
//                         </div>
//                         <div>
//                           <label className="text-xs text-gray-500 block mb-1">Account Status</label>
//                           <div className="flex items-center gap-2">
//                             <CheckCircle2 className={`h-4 w-4 ${userData?.status === "ACTIVE" ? "text-green-500" : "text-gray-400"}`} />
//                             <span className={`font-medium ${userData?.status === "ACTIVE" ? "text-green-600" : "text-gray-600"}`}>
//                               {userData?.status}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Column 2 */}
//                   <div className="p-6">
//                     <div className="mb-6">
//                       <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
//                         System Information
//                       </h3>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="text-xs text-gray-500 block mb-1">User ID</label>
//                           <div className="flex items-center gap-2 text-gray-900 font-mono text-sm">
//                             <Key className="h-4 w-4 text-gray-400" />
//                             {userData?.id}
//                           </div>
//                         </div>
//                         <div>
//                           <label className="text-xs text-gray-500 block mb-1">Created</label>
//                           <div className="flex items-center gap-2 text-gray-900">
//                             <Calendar className="h-4 w-4 text-gray-400" />
//                             {formatDate(userData?.createdAt)}
//                           </div>
//                         </div>
//                         <div>
//                           <label className="text-xs text-gray-500 block mb-1">Last Updated</label>
//                           <div className="flex items-center gap-2 text-gray-900">
//                             <Calendar className="h-4 w-4 text-gray-400" />
//                             {formatDate(userData?.updatedAt)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               /* Role Management Content */
//               <div className="bg-white rounded-xl border border-gray-200 p-6">
//                 <RoleManager
//                   roles={roles}
//                   userId={userId}
//                   userName={userData?.name}
//                   assignedRoles={userData?.roles?.map((r: any) => r.roleId) ?? []}
//                   onAssign={(roleId) =>
//                     assignRole.mutateAsync({ userId: userId, roleId })
//                   }
//                   onUnassign={(roleId) =>
//                     revokeRole.mutateAsync({ userId: userId, roleId })
//                   }
//                   onAssignMany={(roleIds) =>
//                     bulkAssign.mutateAsync({ userId: userId, roleIds })
//                   }
//                   onUnassignMany={(roleIds) =>
//                     bulkRevoke.mutateAsync({ userId: userId, roleIds })
//                   }
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Shield,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Building,
  MapPin,
  CheckCircle2,
  Key,
  Users,
  MoreVertical,
  Pencil,
  Download,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComingSoonTooltip } from "@/components/ComingSoonTooltip";

export default function UserDetail({ userId }: { userId: string }) {
  const [page] = useState(1);
  const [pageSize] = useState(100);
  const [search] = useState("");
  const [filters] = useState({});
  const [sortColumn] = useState("createdAt");
  const [sortOrder] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState<"details" | "roles">("details");

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusColor =
    userData?.status === "ACTIVE"
      ? "bg-green-50 text-green-700 border border-green-200"
      : "bg-gray-50 text-gray-700 border border-gray-200";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="max-w-7xl mx-auto">
            {/* Top Row - Navigation & Actions */}
            <div className="flex items-center justify-end mb-6">
              {/* Left - Navigation */}
              {/* <div className="flex items-center gap-4">
                <Button
                  className="h-9 w-9 p-0 rounded-lg border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  onClick={() => window.history.back()}
                  variant="outline"
                  aria-label="Go back"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div> */}

              {/* Right - Action Buttons */}
              <div className="flex items-center gap-2">
                {/* <Button
                  variant="outline"
                  className="h-9 px-3 text-gray-700 hover:bg-gray-50 border-gray-200"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                <Button
                  variant="outline"
                  className="h-9 px-3 text-gray-700 hover:bg-gray-50 border-gray-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button> */}
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
                  <Button className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit User
                  </Button>
                </ComingSoonTooltip>
                {/* 
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 w-9 p-0 hover:bg-gray-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <span className="h-4 w-4 mr-2">⚠️</span>
                      Deactivate User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </div>
            </div>

            {/* User Profile Row */}
            <div className="flex items-start justify-between">
              {/* User Info */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-xl bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-sm">
                    <div className="text-white text-xl font-semibold">
                      {userData?.name?.charAt(0)}
                    </div>
                  </div>
                  {userData?.status === "ACTIVE" && (
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {userData?.name}
                    </h1>
                    <div
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor} flex items-center gap-1`}
                    >
                      {userData?.status === "ACTIVE" && (
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      )}
                      {userData?.status}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      {userData?.email}
                    </div>
                    <div className="h-4 w-px bg-gray-300" />
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-4 w-4" />
                      {userData?.type}
                    </div>
                    <div className="h-4 w-px bg-gray-300" />
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Joined {formatDate(userData?.createdAt)}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-6 mt-4">
                    <div>
                      <div className="text-xs text-gray-500">
                        Assigned Roles
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {userData?.roles?.length || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Department</div>
                      <div className="text-sm font-medium text-gray-900">
                        {userData?.department || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="text-sm font-medium text-gray-900">
                        {userData?.location || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-3 px-1 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                  activeTab === "details"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 hover:text-gray-700 border-transparent"
                }`}
              >
                <User className="h-4 w-4" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("roles")}
                className={`py-3 px-1 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                  activeTab === "roles"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 hover:text-gray-700 border-transparent"
                }`}
              >
                <Shield className="h-4 w-4" />
                Role Management
                {userData?.roles?.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                    {userData.roles.length}
                  </span>
                )}
              </button>
              <ComingSoonTooltip>
                <button
                  className="py-3 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors border-b-2 border-transparent flex items-center gap-2"
                  disabled
                >
                  <Calendar className="h-4 w-4" />
                  Activity Log
                </button>
              </ComingSoonTooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Quick Actions & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions Card */}
            <ComingSoonTooltip>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-10 text-gray-700 hover:bg-gray-50"
                    disabled
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-10 text-gray-700 hover:bg-gray-50"
                    disabled
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Add to Team
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-10 text-blue-600 hover:bg-blue-50"
                    disabled
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </ComingSoonTooltip>
            {/* Assigned Roles Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Current Roles</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => setActiveTab("roles")}
                >
                  Manage
                </Button>
              </div>
              <div className="space-y-3">
                {userData?.roles?.map((userRole: any) => (
                  <div
                    key={userRole.id}
                    className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => setActiveTab("roles")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-blue-100">
                          <Shield className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {userRole.role.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {userRole.role.key}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Assigned {formatDate(userRole.assignedAt)}
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-4">
                    <Shield className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      No roles assigned
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                      onClick={() => setActiveTab("roles")}
                    >
                      Assign Roles
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "details" ? (
              /* Overview Content */
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="text-sm text-gray-500 mb-2">User ID</div>
                    <div className="font-mono text-sm text-gray-900 truncate">
                      {userData?.id}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="text-sm text-gray-500 mb-2">
                      Last Updated
                    </div>
                    <div className="text-gray-900">
                      {formatDate(userData?.updatedAt)}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="text-sm text-gray-500 mb-2">
                      Account Type
                    </div>
                    <div className="text-gray-900">{userData?.type}</div>
                  </div>
                </div>

                {/* Detailed Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-6">
                    User Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Email Address
                        </div>
                        <div className="flex items-center gap-2 text-gray-900">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {userData?.email}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          User Status
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              userData?.status === "ACTIVE"
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              userData?.status === "ACTIVE"
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          >
                            {userData?.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Department
                        </div>
                        <div className="flex items-center gap-2 text-gray-900">
                          <Building className="h-4 w-4 text-gray-400" />
                          {userData?.department || "Not specified"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Location
                        </div>
                        <div className="flex items-center gap-2 text-gray-900">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {userData?.location || "Not specified"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Role Management Content */
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <RoleManager
                  roles={roles}
                  userId={userId}
                  userName={userData?.name}
                  assignedRoles={
                    userData?.roles?.map((r: any) => r.roleId) ?? []
                  }
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
