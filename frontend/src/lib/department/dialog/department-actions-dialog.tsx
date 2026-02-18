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

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  departmentName: string;
}

// 🔶 Archive Dialog
export const ArchiveDialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  departmentName,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Archive Department</DialogTitle>
      </DialogHeader>

      <p>
        Are you sure you want to archive the department{" "}
        <span className="font-medium text-orange-800">
          {departmentName}
        </span>
        ?
      </p>

      <DialogFooter>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          className="bg-orange-200 text-orange-800 hover:bg-orange-300"
          onClick={onConfirm}
        >
          Archive
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// 🟢 Restore Dialog
export const RestoreDialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  departmentName,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Restore Department</DialogTitle>
      </DialogHeader>

      <p>
        Are you sure you want to restore the department{" "}
        <span className="font-medium text-green-800">
          {departmentName}
        </span>
        ?
      </p>

      <DialogFooter>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          className="bg-green-200 text-green-800 hover:bg-green-300"
          onClick={onConfirm}
        >
          Restore
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// 🔴 Delete Dialog
export const DeleteDialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  departmentName,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Department</DialogTitle>
      </DialogHeader>

      <p>
        Are you sure you want to delete the department{" "}
        <span className="font-medium text-red-800">
          {departmentName}
        </span>
        ? This action cannot be undone.
      </p>

      <DialogFooter>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          className="bg-red-200 text-red-800 hover:bg-red-300"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
