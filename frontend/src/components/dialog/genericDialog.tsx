"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type DialogSize = "sm" | "md" | "lg" | string;

interface GenericDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: (props: { close: () => void }) => React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  size?: DialogSize;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmDisabled?: boolean;
  scrollable?: boolean;
}

export const GenericDialog: React.FC<GenericDialogProps> = ({
  trigger,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  open,
  onOpenChange,
  size = "md",
  confirmDisabled = false,
  scrollable = false,
}) => {
  const sizeClass =
    size === "sm"
      ? "max-w-sm"
      : size === "md"
      ? "max-w-md"
      : size === "lg"
      ? "max-w-lg"
      : size;

  const contentClass = [
    sizeClass,
    scrollable ? "max-h-[80vh] flex flex-col" : "",
  ].join(" ");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className={contentClass}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <div className={scrollable ? "flex-1 overflow-y-auto my-4" : "my-4"}>
          {children({ close: () => onOpenChange(false) })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>

          <Button onClick={onConfirm} disabled={confirmDisabled}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
