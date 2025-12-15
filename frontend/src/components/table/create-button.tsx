"use client";

import React, { useState, useRef } from "react";
import { GenericDialog } from "@/components/dialog/genericDialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function CreateButton<T extends Record<string, any>>({
  triggerText,
  title,
  children,
  onSubmit,
  confirmDisabled = false,
  onOpenReset,
  size = "md",
}: {
  triggerText: string;
  title: string;
  children: (props: { close: () => void }) => React.ReactNode;
  onSubmit: (close: () => void) => void;
  confirmDisabled?: boolean;
  onOpenReset?: () => void;
  size?: "sm" | "md" | "lg";
}) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpenReset?.(); 
    }
    setOpen(isOpen); 
  };

  return (
    <GenericDialog
      title={title}
      open={open}
      onOpenChange={handleOpenChange}
      size={size}
      trigger={
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> {triggerText}
        </Button>
      }
      confirmText="Create"
      confirmDisabled={confirmDisabled}
      onConfirm={() => onSubmit(() => setOpen(false))}
    >
      {({ close }) => children({ close })}
    </GenericDialog>
  );
}
