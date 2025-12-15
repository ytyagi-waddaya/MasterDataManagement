"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Role } from "./roleTable";
import { PermissionsDialog } from "../dialog/permissions-dialog";
import { AppDispatch } from "@/store";
import { toggleRowSelection } from "@/store/dataTableSlice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Archive,
  Edit,
  EllipsisVertical,
  Eye,
  RotateCcw,
  Trash2,
} from "lucide-react";  
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArchiveDialog,
  DeleteDialog,
  RestoreDialog,
} from "../dialog/role-actions-dialogs";
import { FormDialog } from "../../../components/dialog/edit-dialog";
import { EditRoleForm } from "../form/edit-role";
import { UpdateRoleInput } from "../schema/role-schema";

import {
  useArchiveRole,
  useRestoreRole,
  useDeleteRole,
  useUpdateRole,
} from "../hooks/index";

export const roleColumns: ColumnDef<Role>[] = [
  {
    id: "select",
    accessorFn: () => "",
    enableSorting: false, 
    enableHiding: false,
    header: ({ table }) => {
      const allSelected = table.getIsAllRowsSelected();
      const someSelected = table.getIsSomeRowsSelected();

      return (
        <Checkbox
          checked={allSelected ? true : someSelected ? "indeterminate" : false}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <RowCheckbox rowId={row.id} isSelected={row.getIsSelected()} />
    ),
  },
  {
    accessorKey: "name",
    header: "Role Name",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    enableSorting: false,
    cell: ({ row }) => {
      const permissionsArray = row.getValue("permissions") as any[];
      const permissions = permissionsArray.map((p) => p.permission.name);

      const visible = permissions.slice(0, 4);
      const hiddenCount = permissions.length - 4;

      const getColor = (value: string) => {
        const action = value.split(":")[0].toLowerCase();
        switch (action) {
          case "create":
            return "bg-green-200 text-green-800";
          case "update":
            return "bg-yellow-200 text-yellow-800";
          case "delete":
            return "bg-red-200 text-red-800";
          case "read":
            return "bg-blue-200 text-blue-800";
          default:
            return "bg-gray-200 text-gray-800";
        }
      };

      return (
        <div className="max-w-[330px] whitespace-normal flex flex-wrap gap-1 p-1 ">
          {visible.map((item, index) => (
            <Badge key={index} className={`text-[12px] ${getColor(item)}`}>
              {item}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <PermissionsDialog permissions={permissions} count={hiddenCount} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;

      return (
        <span
          className={`inline-block px-2 py-1 text-[12px] font-medium rounded-full ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "isSystem",
    header: "System Role",
    enableSorting: false,
    cell: ({ row }) => (row.getValue("isSystem") ? "Yes" : "No"),
  },

  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const role = row.original;
      const isActive = row.getValue("isActive") as boolean;

      const [openArchive, setOpenArchive] = React.useState(false);
      const [openRestore, setOpenRestore] = React.useState(false);
      const [openDelete, setOpenDelete] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);

      // mutation hooks
      const archiveRole = useArchiveRole();
      const restoreRole = useRestoreRole();
      const deleteRole = useDeleteRole();
      const updateRole = useUpdateRole();

      const handleView = () => router.push(`/roles/${role.id}`);
      const handleEdit = () => setOpenEdit(true);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleView}>
                <Eye className="mr-2 w-4 h-4" /> View
              </DropdownMenuItem>

              {isActive ? (
                <>
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 w-4 h-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpenArchive(true)}>
                    <Archive className="mr-2 w-4 h-4" /> Archive
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => setOpenRestore(true)}>
                    <RotateCcw className="mr-2 w-4 h-4" /> Restore
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                    <Trash2 className="mr-2 w-4 h-4" /> Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ArchiveDialog
            open={openArchive}
            onOpenChange={setOpenArchive}
            roleName={role.name}
            onConfirm={() =>
              archiveRole.mutate(role.id, {
                onSuccess: () => setOpenArchive(false),
              })
            }
          />

          <RestoreDialog
            open={openRestore}
            onOpenChange={setOpenRestore}
            roleName={role.name}
            onConfirm={() =>
              restoreRole.mutate(role.id, {
                onSuccess: () => setOpenRestore(false),
              })
            }
          />

          <DeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            roleName={role.name}
            onConfirm={() =>
              deleteRole.mutate(role.id, {
                onSuccess: () => setOpenDelete(false),
              })
            }
          />
          <FormDialog<UpdateRoleInput>
            open={openEdit}
            onOpenChange={setOpenEdit}
            title="Edit Role"
            description="Modify role details and system assignment."
            initialValues={{
              name: role.name,
              description: role.description ?? "",
              isSystem: role.isSystem,
              isActive: role.isActive,
            }}
            onSave={(data) =>
              updateRole.mutate(
                {
                  roleId: role.id,
                  payload: data,
                },
                { onSuccess: () => setOpenEdit(false) }
              )
            }
            FormComponent={EditRoleForm}
            disabled={role.isSystem}
          />
        </>
      );
    },
  },
];

interface RowCheckboxProps {
  rowId: string;
  isSelected: boolean;
}

const RowCheckbox: React.FC<RowCheckboxProps> = ({ rowId, isSelected }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={() => dispatch(toggleRowSelection(rowId))}
      aria-label="Select row"
    />
  );
};
