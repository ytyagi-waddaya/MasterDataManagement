"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const ArchiveDialog = ({ open, onOpenChange, name, onConfirm }: any) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Archive Record</DialogTitle>
      </DialogHeader>
      <p>Do you really want to archive record {name}?</p>
      <DialogFooter>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button className="bg-orange-200" onClick={onConfirm}>
          Archive
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const RestoreDialog = ({ open, onOpenChange, name, onConfirm }: any) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Restore Record</DialogTitle>
      </DialogHeader>
      <p>Restore archived record {name}?</p>
      <DialogFooter>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button className="bg-green-200" onClick={onConfirm}>
          Restore
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const DeleteDialog = ({ open, onOpenChange, name, onConfirm }: any) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Record</DialogTitle>
      </DialogHeader>
      <p>Delete record {name}? This action is permanent.</p>
      <DialogFooter>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button className="bg-red-200" onClick={onConfirm}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const SendApprovalDialog = ({ open, onOpenChange, name, onConfirm }: any) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Send for Approval</DialogTitle>
      </DialogHeader>

      <p>
        Send record <span className="font-semibold">{name}</span> for approval?
      </p>

      <DialogFooter>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>

        <Button
          className="bg-blue-200 text-blue-900 hover:bg-blue-300"
          onClick={onConfirm}
        >
          Send
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
