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
  router,
  resourceId
}: {
  record: any;
  workflowId?: string;
  router: any;
  resourceId:string
}) {
  const [openArchive, setOpenArchive] = useState(false);
  const [openRestore, setOpenRestore] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSendApproval, setOpenSendApproval] = useState(false);

  const archiveMutation = useArchiveRecord();
  const restoreMutation = useRestoreRecord();
  const deleteMutation = useDeleteRecord();

  const hasWorkflow = Boolean(workflowId);

  // ✅ CORRECT: hook accepts ONLY workflowId
  const startInstanceMutation = hasWorkflow
    ? useStartInstance(workflowId!)
    : null;

  const handleSendForApproval = () => {
    if (!startInstanceMutation) return;

    startInstanceMutation.mutate(
      {
        recordId: record.id,
        masterObjectId: record.masterObjectId,
      },
      {
        onSuccess: () => {
          setOpenSendApproval(false);
        },
      }
    );
  };

  const isActive = !record.deletedAt;
  // const handleView = () => router.push(`/record/${record.id}`);
  const handleView = () => {
    router.push(`/resources/${resourceId}/record/${record.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <EllipsisVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleView}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>

          {/* Send for Approval */}
          <DropdownMenuItem
            disabled={!hasWorkflow}
            onClick={() => setOpenSendApproval(true)}
          >
            <Send className="mr-2 h-4 w-4" />
            Send for Approval
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

      <SendApprovalDialog
        open={openSendApproval}
        onOpenChange={setOpenSendApproval}
        name={record.id}
        onConfirm={handleSendForApproval}
        loading={startInstanceMutation?.isPending ?? false}
      />
    </>
  );
}
