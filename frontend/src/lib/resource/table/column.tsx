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
} from "../dialog/resource-actions-dialog";

import {
  useUpdateResource,
  useArchiveResource,
  useRestoreResource,
  useDeleteResource,
} from "../hook/index";
import { Resource } from "./resourceTable";
import { FormDialog } from "@/components/dialog/edit-dialog";
import { UpdateResourceInput } from "../schema/resource-schema";
import { EditResourceForm } from "../form/edit-resource";

export const resourceColumns: ColumnDef<Resource>[] = [
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
    header: "Resource Name",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
  },
  {
    id: "moduleId",
    header: "Module",
    enableSorting: false,
    cell: ({ row }) => row.original.module?.name || "-",
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
    header: "System Resource",
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
      const resource = row.original;
      const isActive = row.getValue("isActive") as boolean;

      const [openArchive, setOpenArchive] = React.useState(false);
      const [openRestore, setOpenRestore] = React.useState(false);
      const [openDelete, setOpenDelete] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);

      // mutation hooks
      const softDeleteResource = useArchiveResource();
      const restoreResource = useRestoreResource();
      const deleteResource = useDeleteResource();
      const updateResource = useUpdateResource();

      const handleView = () => router.push(`/resources/${resource.id}`);
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
            resourceName={resource.name}
            onConfirm={() =>
              softDeleteResource.mutate(resource.id, {
                onSuccess: () => setOpenArchive(false),
              })
            }
          />

          <RestoreDialog
            open={openRestore}
            onOpenChange={setOpenRestore}
            resourceName={resource.name}
            onConfirm={() =>
              restoreResource.mutate(resource.id, {
                onSuccess: () => setOpenRestore(false),
              })
            }
          />

          <DeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            resourceName={resource.name}
            onConfirm={() =>
              deleteResource.mutate(resource.id, {
                onSuccess: () => setOpenDelete(false),
              })
            }
          />
          <FormDialog<UpdateResourceInput>
            open={openEdit}
            onOpenChange={setOpenEdit}
            title="Edit Resource"
            description="Modify resource details and system assignment."
            initialValues={{
              name: resource.name,
              description: resource.description ?? "",
              isSystem: resource.isSystem,
              isActive: resource.isActive,
            }}
            onSave={(data) =>
              updateResource.mutate(
                {
                  resourceId: resource.id,
                  payload: data,
                },
                { onSuccess: () => setOpenEdit(false) }
              )
            }
            FormComponent={EditResourceForm}
            disabled={resource.isSystem}
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
