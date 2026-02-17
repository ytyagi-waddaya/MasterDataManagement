
"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Role {
  id: string;
  name: string;
  description?: string;
  permissionCount?: number;
}
interface Department {
  id: string;
  name: string;
}

interface RoleManagerProps {
  roles: Role[];
  userId: string;
  userName: string;
  departments?: { id: string; name: string }[];   // ✅ optional
  onDepartmentChange?: (departmentId: string) => void;
  assignedRoles: string[];

  // SINGLE assignment
  onAssign: (roleId: string) => Promise<void>;
  onUnassign: (roleId: string) => Promise<void>;

  // BULK assignment
  onAssignMany: (roleIds: string[]) => Promise<void>;
  onUnassignMany: (roleIds: string[]) => Promise<void>;
}

export function RoleManager({
  roles,
  userId,
  userName,
  departments,
  assignedRoles,
  onDepartmentChange,
  onAssign,
  onUnassign,
  onAssignMany,
  onUnassignMany,
}: RoleManagerProps) {
  const [selected, setSelected] = useState<string[]>(assignedRoles);
  const [search, setSearch] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [singleLoading, setSingleLoading] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  // Sync when user reloads
  useEffect(() => {
    setSelected(assignedRoles);
  }, [assignedRoles]);

  // Search
  const filteredRoles = useMemo(() => {
    if (!search.trim()) return roles;
    return roles.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
  }, [roles, search]);

  // When clicking checkbox → IMMEDIATE assign/unassign
  const toggleSingleRole = async (roleId: string) => {
    const isSelected = selected.includes(roleId);
    setSingleLoading(roleId);

    try {
      if (isSelected) {
        await onUnassign(roleId);
        toast.success("Role removed");
        setSelected((prev) => prev.filter((id) => id !== roleId));
      } else {
        await onAssign(roleId);
        toast.success("Role assigned");
        setSelected((prev) => [...prev, roleId]);
      }
    } catch (err) {
      toast.error("Failed to update role");
    } finally {
      setSingleLoading(null);
    }
  };

  const handleBulkAssign = async () => {
    const toAssign = selected.filter((id) => !assignedRoles.includes(id));
    if (!toAssign.length) return toast.info("Nothing to assign.");

    setBulkLoading(true);
    try {
      await onAssignMany(toAssign);
      toast.success("Roles assigned in bulk");
    } catch {
      toast.error("Bulk assign failed");
    }
    setBulkLoading(false);
  };

  const handleBulkUnassign = async () => {
    const toRemove = selected.filter((id) => assignedRoles.includes(id));
    if (!toRemove.length) return toast.info("Nothing to unassign.");

    setBulkLoading(true);
    try {
      await onUnassignMany(toRemove);
      toast.success("Roles removed in bulk");
    } catch {
      toast.error("Bulk unassign failed");
    }
    setBulkLoading(false);
  };

 useEffect(() => {
  if (!selectedDepartment && departments?.length) {
    const firstDept = departments[0].id;
    setSelectedDepartment(firstDept);
    onDepartmentChange?.(firstDept);
  }
}, [departments, selectedDepartment]);



  return (
    <div className="space-y-6">
      {/* Header + Search */}
      <div className="flex gap-4 items-center">
        {departments && onDepartmentChange && (
          <select
            className="border rounded px-3 py-2 text-sm"
            value={selectedDepartment}
            onChange={(e) => {
              const deptId = e.target.value;
              setSelectedDepartment(deptId);
              onDepartmentChange(deptId);
            }}
          >
            <option value="">Select Department</option>
            {departments.map((dept: Department) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        )}


        
      </div>

      <div className="flex justify-between items-center">
        {/* <h3 className="text-lg font-semibold">Manage {userName} Roles</h3> */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Manage Roles
          </h3>
          <p className="text-sm text-gray-600">
            Assign or remove roles for {userName}
          </p>
        </div>
        <Input
          placeholder="Search roles..."
          className="w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid of Roles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoles.map((role) => {
          const checked = selected.includes(role.id);
          const loading = singleLoading === role.id;

          return (
            <div
              key={role.id}
              className={`border rounded-lg p-4 cursor-pointer transition hover:bg-gray-50 ${checked ? "bg-blue-50 border-blue-300" : "bg-white"
                }`}
              onClick={() => toggleSingleRole(role.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={checked}
                  disabled={loading}
                  onCheckedChange={() => toggleSingleRole(role.id)}
                />

                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{role.name}</div>

                    {loading && (
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    )}
                  </div>

                  {role.description && (
                    <div className="text-xs text-muted-foreground">
                      {role.description}
                    </div>
                  )}

                  {role.permissionCount !== undefined && (
                    <span className="text-[11px] mt-1 inline-block bg-gray-200 rounded px-2 py-0.5">
                      {role.permissionCount} permissions
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredRoles.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-6">
            No roles found.
          </p>
        )}
      </div>

      {/* Bulk Actions */}
      {/* <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Selected: {selected.length}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleBulkUnassign}
            disabled={bulkLoading || selected.length === 0}
          >
            {bulkLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Unassign Selected"}
          </Button>

          <Button
            onClick={handleBulkAssign}
            disabled={bulkLoading || selected.length === 0}
          >
            {bulkLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Assign Selected"}
          </Button>
        </div>
      </div> */}
    </div>
  );
}
