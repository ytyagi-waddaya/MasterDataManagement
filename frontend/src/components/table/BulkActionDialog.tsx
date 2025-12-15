"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface BulkActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  actionType: "archive" | "delete" | "export" | "restore";
  selectedCount: number;
}

export const BulkActionDialog: React.FC<BulkActionDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  actionType,
  selectedCount,
}) => {
  const getTitle = () => {
    switch (actionType) {
      case "archive":
        return "Archive Roles";
      case "delete":
        return "Delete Roles";
      case "export":
        return "Export Roles";
      case "restore":
        return "Restore Roles";
    }
  };

  const getMessage = () => {
    const countSpan = (
      <span className="font-semibold text-gray-800">{selectedCount}</span>
    );

    switch (actionType) {
      case "archive":
        return (
          <>
            Are you sure you want to archive {countSpan} selected role(s)?
          </>
        );
      case "delete":
        return (
          <>
            Are you sure you want to delete {countSpan} selected role(s)? This
            action cannot be undone.
          </>
        );
      case "export":
        return <>Do you want to export {countSpan} selected role(s)?</>;
      case "restore":
        return <>Are you sure you want to restore {countSpan} selected role(s)?</>;
    }
  };

  const getButtonClass = () => {
    switch (actionType) {
      case "archive":
        return "bg-orange-200 text-orange-800 hover:bg-orange-300";
      case "delete":
        return "bg-red-200 text-red-800 hover:bg-red-300";
      case "export":
        return "bg-blue-200 text-blue-800 hover:bg-blue-300";
      case "restore":
        return "bg-green-200 text-green-800 hover:bg-green-300";
    }
  };

  const getButtonText = () => {
    switch (actionType) {
      case "archive":
        return "Archive";
      case "delete":
        return "Delete";
      case "export":
        return "Export";
      case "restore":
        return "Restore";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <p className="my-2">{getMessage()}</p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className={getButtonClass()} onClick={onConfirm}>
            {getButtonText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
