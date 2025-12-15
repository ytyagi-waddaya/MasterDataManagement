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
import { FormDialog } from "../../../components/dialog/edit-dialog";
import { UpdateWorkflowInput, Workflow } from "../schema/workflow-schema";
import {
  ArchiveDialog,
  DeleteDialog,
  RestoreDialog,
} from "../dialog/workflow-actions-dialog";
import { EditWorkflowForm } from "../forms/edit-workflow";
import {
  useArchiveWorkflow,
  useDeleteWorkflow,
  useRestoreWorkflow,
  useUpdateWorkflow,
} from "../hooks";

export const workflowColumns: ColumnDef<Workflow>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => {
      const all = table.getIsAllRowsSelected();
      const some = table.getIsSomeRowsSelected();

      return (
        <Checkbox
          checked={all ? true : some ? "indeterminate" : false}
          onCheckedChange={(val) => table.toggleAllRowsSelected(!!val)}
        />
      );
    },
    cell: ({ row }) => (
      <RowCheckbox rowId={row.id} isSelected={row.getIsSelected()} />
    ),
  },
  {
    accessorKey: "code",
    header: "Code",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Workflow",
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
      const isActive = row.original.isActive;
      return (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "version",
    header: "Version",
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const workflow = row.original;
      const isActive = row.getValue("isActive") as boolean;

      const [openEdit, setOpenEdit] = React.useState(false);
      const [openArchive, setOpenArchive] = React.useState(false);
      const [openRestore, setOpenRestore] = React.useState(false);
      const [openDelete, setOpenDelete] = React.useState(false);

      const archiveWorkflow = useArchiveWorkflow();
      const restoreWorkflow = useRestoreWorkflow();
      const deleteWorkflow = useDeleteWorkflow();
      const updateWorkflow = useUpdateWorkflow();

      const handleView = () => router.push(`/workflow/${workflow.id}`);
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
            workflowName={workflow.name}
            onConfirm={() =>
              archiveWorkflow.mutate(workflow.id, {
                onSuccess: () => setOpenArchive(false),
              })
            }
          />

          <RestoreDialog
            open={openRestore}
            onOpenChange={setOpenRestore}
            workflowName={workflow.name}
            onConfirm={() =>
              restoreWorkflow.mutate(workflow.id, {
                onSuccess: () => setOpenRestore(false),
              })
            }
          />

          <DeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            workflowName={workflow.name}
            onConfirm={() =>
              deleteWorkflow.mutate(workflow.id, {
                onSuccess: () => setOpenDelete(false),
              })
            }
          />
          <FormDialog<UpdateWorkflowInput>
            open={openEdit}
            onOpenChange={setOpenEdit}
            title="Edit Workflow"
            description="Modify workflow details and system assignment."
            initialValues={{
              name: workflow.name,
              description: workflow.description ?? "",
              isActive: workflow.isActive,
            }}
            onSave={(data) =>
              updateWorkflow.mutate(
                {
                  workflowId: workflow.id,
                  payload: data,
                },
                { onSuccess: () => setOpenEdit(false) }
              )
            }
            FormComponent={EditWorkflowForm}
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
