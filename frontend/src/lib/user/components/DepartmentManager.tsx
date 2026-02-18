"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Building, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface Department {
  id: string;
  name: string;
}

interface Props {
  departments: Department[];
  assignedDepartments: string[];

  activeDepartmentId?: string;
  onSelectDepartment: (departmentId: string | null) => void;

  onAssign: (departmentId: string) => Promise<void>;
  onRemove: (departmentIds: string[]) => Promise<void>;
}

export function DepartmentManager({
  departments,
  assignedDepartments,
  activeDepartmentId,
  onSelectDepartment,
  onAssign,
  onRemove,
}: Props) {
  const [selected, setSelected] = useState<string[]>(assignedDepartments);
  const [loading, setLoading] = useState<string | null>(null);

  // sync when backend updates
  useEffect(() => {
    setSelected(assignedDepartments);
  }, [assignedDepartments]);

  /**
   * CLICK BEHAVIOUR
   * ----------------
   * not assigned → assign + select
   * assigned → switch active department
   */
  const handleClick = async (deptId: string) => {
    const isAssigned = selected.includes(deptId);

    try {
      // assign first if not assigned
      if (!isAssigned) {
        setLoading(deptId);

        await onAssign(deptId);

        setSelected((prev) => [...prev, deptId]);
        toast.success("Department assigned");
      }

      // switch department context
      onSelectDepartment(deptId);
    } catch {
      toast.error("Failed to update department");
    } finally {
      setLoading(null);
    }
  };

  /**
   * REMOVE department
   */
  const handleRemove = async (
    e: React.MouseEvent,
    deptId: string
  ) => {
    e.stopPropagation();

    try {
      setLoading(deptId);

      await onRemove([deptId]);

      setSelected((prev) => prev.filter((id) => id !== deptId));

      // if active removed → reset roles view
      if (activeDepartmentId === deptId) {
        onSelectDepartment(null);
      }

      toast.success("Department removed");
    } catch {
      toast.error("Remove failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Departments
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => {
          const checked = selected.includes(dept.id);
          const isLoading = loading === dept.id;
          const isActive = activeDepartmentId === dept.id;

          return (
            <div
              key={dept.id}
              onClick={() => handleClick(dept.id)}
              className={`
                border rounded-xl p-4 cursor-pointer transition-all
                flex items-center justify-between
                ${
                  isActive
                    ? "bg-blue-100 border-blue-500 shadow-sm"
                    : checked
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white hover:bg-gray-50"
                }
              `}
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">
                <Checkbox checked={checked} disabled />

                <Building className="w-4 h-4 text-gray-500" />

                <span className="font-medium text-sm">
                  {dept.name}
                </span>
              </div>

              {/* RIGHT SIDE ACTIONS */}
              <div className="flex items-center gap-2">
                {isLoading && (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                )}

                {/* REMOVE BUTTON */}
                {checked && !isLoading && (
                  <button
                    onClick={(e) => handleRemove(e, dept.id)}
                    className="p-1 rounded hover:bg-red-100 transition"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
