"use client";

import { useRoles } from "@/lib/role/hooks";
import {
  useAssignDepartmentRoles,
  useRemoveDepartmentRoles,
} from "../hooks/useDepartment";

import { RoleManager } from "@/lib/user/components/roleManager";

export default function RoleDetails({
  department,
}: {
  department: any;
}) {
  const { data: roleData } = useRoles({
    page: 1,
    limit: 100,
    search: "",
    filters: {},
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const roles = roleData?.roles.data ?? [];

  const assignedRoles =
    department.departmentRoles?.map((dr: any) => dr.roleId) ?? [];

  const assignRoles = useAssignDepartmentRoles();
  const removeRoles = useRemoveDepartmentRoles();

  return (
    <div className="bg-white rounded-xl border p-6">
      <RoleManager
        roles={roles}
        userId={department.id}
        userName={department.name}
        assignedRoles={assignedRoles}
        onAssign={(roleId) =>
          assignRoles.mutateAsync({
            departmentId: department.id,
            roleIds: [roleId],
          })
        }
        onUnassign={(roleId) =>
          removeRoles.mutateAsync({
            departmentId: department.id,
            roleIds: [roleId],
          })
        }
        onAssignMany={(roleIds) =>
          assignRoles.mutateAsync({
            departmentId: department.id,
            roleIds,
          })
        }
        onUnassignMany={(roleIds) =>
          removeRoles.mutateAsync({
            departmentId: department.id,
            roleIds,
          })
        }
      />
    </div>
  );
}
