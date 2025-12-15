"use client";

import { GenericDialog } from "@/components/dialog/genericDialog";
import * as React from "react";

interface CreateDialogProps {
  trigger: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  onCreate: () => void;
  size?: "sm" | "md" | "lg";
}

export const CreateDialog: React.FC<CreateDialogProps> = ({
  trigger,
  title = "Create Item",
  children,
  onCreate,
  size = "md",
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <GenericDialog
      trigger={trigger}
      title={title}
      confirmText="Create"
      cancelText="Cancel"
      onConfirm={() => {
        onCreate();
        setOpen(false);
      }}
      size={size}
      open={open}
      onOpenChange={setOpen}
    >
      {({ close }) => (
        <> {children} </>
      )}
    </GenericDialog>
  );
};
