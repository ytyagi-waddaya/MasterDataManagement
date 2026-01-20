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
} from "../dialog/action-actions-dialog";

import {
  useUpdateAction,
  useArchiveAction,
  useRestoreAction,
  useDeleteAction,
} from "../hooks/index";
import { Action } from "./actionTable";
import { EditActionForm } from "../form/edit-action";
import { FormDialog } from "@/components/dialog/edit-dialog";
import { UpdateActionInput } from "../schema/action-schema";
import IfAllowed from "@/store/auth/IfAllowed";

export const actionColumns: ColumnDef<Action>[] = [
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
    header: "Action Name",
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
    accessorKey: "isSystem",
    header: "System Action",
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
      const action = row.original;
      const isActive = row.getValue("isActive") as boolean;

      const [openArchive, setOpenArchive] = React.useState(false);
      const [openRestore, setOpenRestore] = React.useState(false);
      const [openDelete, setOpenDelete] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);

      // mutation hooks
      const softDeleteAction = useArchiveAction();
      const restoreAction = useRestoreAction();
      const deleteAction = useDeleteAction();
      const updateAction = useUpdateAction();

      const handleView = () => router.push(`/actions/${action.id}`);
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
              <IfAllowed action="READ" resource="ACTION" >
              <DropdownMenuItem onClick={handleView}>
                <Eye className="mr-2 w-4 h-4" /> View
              </DropdownMenuItem>
              </IfAllowed>

              {isActive ? (
                <>
                  <IfAllowed action="UPDATE" resource="ACTION" >
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 w-4 h-4" /> Edit
                  </DropdownMenuItem>
                  </IfAllowed>
                  <IfAllowed action="ARCHIVE" resource="ACTION" >
                  <DropdownMenuItem onClick={() => setOpenArchive(true)}>
                    <Archive className="mr-2 w-4 h-4" /> Archive
                  </DropdownMenuItem>
                  </IfAllowed>
                </>
              ) : (
                <>
                  <IfAllowed action="RESTORE" resource="ACTION" >
                  <DropdownMenuItem onClick={() => setOpenRestore(true)}>
                    <RotateCcw className="mr-2 w-4 h-4" /> Restore
                  </DropdownMenuItem>
                  </IfAllowed>
                  <IfAllowed action="DELETE" resource="ACTION" >
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
            actionName={action.name}
            onConfirm={() =>
              softDeleteAction.mutate(action.id, {
                onSuccess: () => setOpenArchive(false),
              })
            }
          />

          <RestoreDialog
            open={openRestore}
            onOpenChange={setOpenRestore}
            actionName={action.name}
            onConfirm={() =>
              restoreAction.mutate(action.id, {
                onSuccess: () => setOpenRestore(false),
              })
            }
          />

          <DeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            actionName={action.name}
            onConfirm={() =>
              deleteAction.mutate(action.id, {
                onSuccess: () => setOpenDelete(false),
              })
            }
          />
          <FormDialog<UpdateActionInput>
            open={openEdit}
            onOpenChange={setOpenEdit}
            title="Edit Action"
            description="update the action’s details and configuration settings"
            initialValues={{
              name: action.name,
              description: action.description ?? "",
              isSystem: action.isSystem,
              isActive: action.isActive,
            }}
            onSave={(data) =>
              updateAction.mutate(
                {
                  actionId: action.id,
                  payload: data,
                },
                { onSuccess: () => setOpenEdit(false) }
              )
            }
            FormComponent={EditActionForm}
            disabled={action.isSystem}
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
