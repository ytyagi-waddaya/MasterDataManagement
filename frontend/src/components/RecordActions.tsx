"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Eye,
  Edit,
  Archive,
  RotateCcw,
  Trash2,
  EllipsisVertical,
  Send,
} from "lucide-react";

import {
  ArchiveDialog,
  DeleteDialog,
  RestoreDialog,
  SendApprovalDialog,
} from "./dialogs";

import {
  useArchiveRecord,
  useDeleteRecord,
  useRestoreRecord,
} from "@/lib/masterRecord/hooks";
import { useStartInstance } from "@/lib/workflow/hooks";

export function RecordActions({
  record,
  workflowId,
}: {
  record: any;
  workflowId?: string;
}) {
  console.log("RECORD:", record);
  console.log("WORKFLOW ID:", workflowId);
  const [openArchive, setOpenArchive] = useState(false);
  const [openRestore, setOpenRestore] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSendApproval, setOpenSendApproval] = useState(false);

  const archiveMutation = useArchiveRecord();
  const restoreMutation = useRestoreRecord();
  const deleteMutation = useDeleteRecord();

  // ------------------------------------------------------------
  // 🟢 Workflow Trigger Mutation (Send for Approval)
  // ------------------------------------------------------------

  // You need to know which workflow the master object uses
  if (!workflowId) {
    console.error("Missing workflowId for record:", record);
    return null;
  }

  const startInstanceMutation = useStartInstance(workflowId);

  const handleSendForApproval = () => {
    startInstanceMutation.mutate(
      {
        recordId: record.id,
        masterObjectId: record.masterObjectId,
      },
      {
        onSuccess: () => {
          console.log("Workflow started successfully");
          setOpenSendApproval(false);
        },
        onError: (err) => {
          console.error("Workflow start failed", err);
        },
      }
    );
  };

  const isActive = !record.deletedAt;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <EllipsisVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => alert("View Record")}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>

          {/* Send for Approval */}
          <DropdownMenuItem onClick={() => setOpenSendApproval(true)}>
            <Send className="mr-2 h-4 w-4" /> Send for Approval
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => alert("Edit form coming soon")}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>

          {isActive ? (
            <DropdownMenuItem onClick={() => setOpenArchive(true)}>
              <Archive className="mr-2 h-4 w-4" /> Archive
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={() => setOpenRestore(true)}>
                <RotateCcw className="mr-2 h-4 w-4" /> Restore
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs */}
      <ArchiveDialog
        open={openArchive}
        onOpenChange={setOpenArchive}
        name={record.id}
        onConfirm={() =>
          archiveMutation.mutate(record.id, {
            onSuccess: () => setOpenArchive(false),
          })
        }
      />

      <RestoreDialog
        open={openRestore}
        onOpenChange={setOpenRestore}
        name={record.id}
        onConfirm={() =>
          restoreMutation.mutate(record.id, {
            onSuccess: () => setOpenRestore(false),
          })
        }
      />

      <DeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        name={record.id}
        onConfirm={() =>
          deleteMutation.mutate(record.id, {
            onSuccess: () => setOpenDelete(false),
          })
        }
      />

      {/* SEND FOR APPROVAL DIALOG */}
      <SendApprovalDialog
        open={openSendApproval}
        onOpenChange={setOpenSendApproval}
        name={record.id}
        onConfirm={handleSendForApproval}
        loading={startInstanceMutation.isPending}
      />
    </>
  );
}
