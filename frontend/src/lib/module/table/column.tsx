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
} from "../dialog/module-actions-dialog";

import {
  useUpdateModule,
  useArchiveModule,
  useRestoreModule,
  useDeleteModule,
} from "../hook/index";
import { Module } from "./moduleTable";
import { FormDialog } from "@/components/dialog/edit-dialog";
import { UpdateModuleInput } from "../schema/module-schema";
import { EditModuleForm } from "../form/edit-module";
import { IfAllowed } from "@/store/auth";

export const moduleColumns: ColumnDef<Module>[] = [
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
    header: "Module Name",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
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
    accessorKey: "key",
    header: "Key",
    enableSorting: false,
    cell: ({ row }) => (row.getValue("key") ),
  },
  {
    accessorKey: "isSystem",
    header: "System Module",
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
      const module = row.original;
      const isActive = row.getValue("isActive") as boolean;

      const [openArchive, setOpenArchive] = React.useState(false);
      const [openRestore, setOpenRestore] = React.useState(false);
      const [openDelete, setOpenDelete] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);

      // mutation hooks
      const softDeleteModule = useArchiveModule();
      const restoreModule = useRestoreModule();
      const deleteModule = useDeleteModule();
      const updateModule = useUpdateModule();

      const handleView = () => router.push(`/modules/${module.id}`);
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
              <IfAllowed action="READ" resource="MODULE" >
              <DropdownMenuItem onClick={handleView}>
                <Eye className="mr-2 w-4 h-4" /> View
              </DropdownMenuItem>
              </IfAllowed>

              {isActive ? (
                <>
                  <IfAllowed action="UPDATE" resource="MODULE" >
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 w-4 h-4" /> Edit
                  </DropdownMenuItem>
                  </IfAllowed>
                  <IfAllowed action="ARCHIVE" resource="MODULE" >
                  <DropdownMenuItem onClick={() => setOpenArchive(true)}>
                    <Archive className="mr-2 w-4 h-4" /> Archive
                  </DropdownMenuItem>
                  </IfAllowed>
                </>
              ) : (
                <>
                  <IfAllowed action="RESTORE" resource="MODULE" >
                  <DropdownMenuItem onClick={() => setOpenRestore(true)}>
                    <RotateCcw className="mr-2 w-4 h-4" /> Restore
                  </DropdownMenuItem>
                  </IfAllowed>
                  <IfAllowed action="DELETE" resource="MODULE" >
                  <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                    <Trash2 className="mr-2 w-4 h-4" /> Delete
                  </DropdownMenuItem>
                  </IfAllowed>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ArchiveDialog
            open={openArchive}
            onOpenChange={setOpenArchive}
            moduleName={module.name}
            onConfirm={() =>
              softDeleteModule.mutate(module.id, {
                onSuccess: () => setOpenArchive(false),
              })
            }
          />

          <RestoreDialog
            open={openRestore}
            onOpenChange={setOpenRestore}
            moduleName={module.name}
            onConfirm={() =>
              restoreModule.mutate(module.id, {
                onSuccess: () => setOpenRestore(false),
              })
            }
          />

          <DeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            moduleName={module.name}
            onConfirm={() =>
              deleteModule.mutate(module.id, {
                onSuccess: () => setOpenDelete(false),
              })
            }
          />
          <FormDialog<UpdateModuleInput>
            open={openEdit}
            onOpenChange={setOpenEdit}
            title="Edit Module"
            description="Modify module details and system assignment."
            initialValues={{
              name: module.name,
              description: module.description ?? "",
              isSystem: module.isSystem,
              isActive: module.isActive,
            }}
            onSave={(data) =>
              updateModule.mutate(
                {
                  moduleId: module.id,
                  payload: data,
                },
                { onSuccess: () => setOpenEdit(false) }
              )
            }
            FormComponent={EditModuleForm}
            disabled={module.isSystem}
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
