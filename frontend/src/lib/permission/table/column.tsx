"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "../dialog/permission-actions-dialog";

import {
  useUpdatePermission,
  useArchivePermission,
  useRestorePermission,
  useDeletePermission,
} from "../hooks/index";
import { Permission } from "./permissionTable";
import { EditPermissionForm } from "../form/edit-permission";
import { FormDialog } from "@/components/dialog/edit-dialog";
import { UpdatePermissionInput } from "../schema/permission-schema";

export const permissionColumns: ColumnDef<Permission>[] = [
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
    accessorKey: "moduleId",
    header: "Module",
    accessorFn: (row) => row.resource?.module?.name ?? "-",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "resourceId",
    header: "Resource",
    accessorFn: (row) => row.resource?.name ?? "-",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "actionId",
    header: "Action",
    accessorFn: (row) => row.action?.name ?? "-",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Permission",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
    enableHiding: true,
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
    header: "System Permission",
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
      const permission = row.original;
      const isActive = row.getValue("isActive") as boolean;

      const [openArchive, setOpenArchive] = React.useState(false);
      const [openRestore, setOpenRestore] = React.useState(false);
      const [openDelete, setOpenDelete] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);

      // mutation hooks
      const softDeletePermission = useArchivePermission();
      const restorePermission = useRestorePermission();
      const deletePermission = useDeletePermission();
      const updatePermission = useUpdatePermission();

      const handleView = () => router.push(`/permissions/${permission.id}`);
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
            permissionName={permission.name}
            onConfirm={() =>
              softDeletePermission.mutate(permission.id, {
                onSuccess: () => setOpenArchive(false),
              })
            }
          />

          <RestoreDialog
            open={openRestore}
            onOpenChange={setOpenRestore}
            permissionName={permission.name}
            onConfirm={() =>
              restorePermission.mutate(permission.id, {
                onSuccess: () => setOpenRestore(false),
              })
            }
          />

          <DeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            permissionName={permission.name}
            onConfirm={() =>
              deletePermission.mutate(permission.id, {
                onSuccess: () => setOpenDelete(false),
              })
            }
          />
          <FormDialog<UpdatePermissionInput>
            open={openEdit}
            onOpenChange={setOpenEdit}
            title="Edit Permission"
            description="update the permission’s details and configuration settings"
            initialValues={{
              name: permission.name,
              description: permission.description ?? "",
              isSystem: permission.isSystem,
              isActive: permission.isActive,
            }}
            onSave={(data) =>
              updatePermission.mutate(
                {
                  permissionId: permission.id,
                  payload: data,
                },
                { onSuccess: () => setOpenEdit(false) }
              )
            }
            FormComponent={EditPermissionForm}
            disabled={permission.isSystem}
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
