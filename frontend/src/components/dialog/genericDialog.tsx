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

export type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | string;

interface GenericDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: (props: { close: () => void }) => React.ReactNode;
  showFooter?: boolean; // ✅ toggle footer
  footer?: React.ReactNode;
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
  showFooter = true,
  footer,
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
      ? "min-w-sm"
      : size === "md"
        ? "min-w-md"
        : size === "lg"
          ? "min-w-lg"
          : size === "xl"
            ? "min-w-3xl"
            : size === "2xl"
              ? "min-w-5xl"
              : size;

  // const contentClass = [
  //   sizeClass,
  //   scrollable ? "min-h-[40vh] flex flex-col" : "",
  // ].join(" ");
  const contentClass = [
    "max-w-none", // remove width cap
    sizeClass, // e.g. "min-w-[98vw]"
    scrollable ? "flex flex-col h-[98vh]" : "",
  ].join(" ");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className={contentClass}>
        {/* <DialogContent className="min-w-[98vw]"> */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className={scrollable ? "flex-1 overflow-y-auto my-4 scrollbar-hide" : "my-4"}>
          {children({ close: () => onOpenChange(false) })}
        </div>

        {showFooter && (
          <>
            {footer ? (
              footer
            ) : (
              <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  {cancelText}
                </Button>

                <Button onClick={onConfirm} disabled={confirmDisabled}>
                  {confirmText}
                </Button>
              </DialogFooter>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
