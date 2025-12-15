"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import * as React from "react";

interface FormDialogProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  initialValues: T;
  onSave: (data: T) => void;
  FormComponent: React.ComponentType<{
    initialValues: T;
    onSubmit: (data: T) => void;
    onClose: () => void;
    disabled?: boolean;
  }>;
  disabled?: boolean;
}

export const FormDialog = <T,>({
  open,
  onOpenChange,
  title,
  description,
  initialValues,
  onSave,
  FormComponent,
  disabled,
}: FormDialogProps<T>) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <FormComponent
          initialValues={initialValues}
          onSubmit={onSave}
          onClose={() => onOpenChange(false)}
          disabled={disabled}
        />
      </DialogContent>
    </Dialog>
  );
};
