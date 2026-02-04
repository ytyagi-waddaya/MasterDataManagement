// "use client";

// import React, { useState } from "react";
// import { GenericDialog, DialogSize } from "@/components/dialog/genericDialog";
// import { Button } from "../ui/button";
// import { Plus } from "lucide-react";

// export function CreateButton<T extends Record<string, any>>({
//   triggerText,
//   title,
//   children,
//   onSubmit,
//   confirmDisabled = false,
//   disabled = false,            // ✅ NEW
//   onOpenReset,
//   size = "md",
// }: {
//   triggerText: string;
//   title: string;
//   children: (props: { close: () => void }) => React.ReactNode;
//   onSubmit: (close: () => void) => void;
//   confirmDisabled?: boolean;
//   disabled?: boolean;          // ✅ NEW
//   onOpenReset?: () => void;
//   size?: DialogSize;
// }) {
//   const [open, setOpen] = useState(false);

//   const handleOpenChange = (isOpen: boolean) => {
//     if (disabled) return;       // ✅ HARD BLOCK
//     if (isOpen) {
//       onOpenReset?.();
//     }
//     setOpen(isOpen);
//   };

//   return (
//     <GenericDialog
//       title={title}
//       open={open}
//       onOpenChange={handleOpenChange}
//       size={size}
//       trigger={
//         <Button
//           className="flex items-center gap-2"
//           disabled={disabled}    // ✅ REAL DISABLE
//         >
//           <Plus className="w-4 h-4" />
//           {triggerText}
//         </Button>
//       }
//       confirmText="Create"
//       confirmDisabled={confirmDisabled}
//       onConfirm={() => onSubmit(() => setOpen(false))}
//     >
//       {({ close }) => children({ close })}
//     </GenericDialog>
//   );
// }

"use client";

import React, { useState } from "react";
import { GenericDialog, DialogSize } from "@/components/dialog/genericDialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function CreateButton<T extends Record<string, any>>({
  triggerText,
  title,
  children,
  onSubmit,
  confirmDisabled = false,
  disabled = false,
  onOpenReset,
  size = "md",
  showFooter = true, // ✅ NEW
  footer,
  scrollable = false,
}: {
  triggerText: string;
  title: string;
  children: (props: { close: () => void }) => React.ReactNode;
  onSubmit?: (close: () => void) => void; // ✅ OPTIONAL
  confirmDisabled?: boolean;
  disabled?: boolean;
  onOpenReset?: () => void;
  size?: DialogSize;
  showFooter?: boolean; // ✅ NEW
  footer?: React.ReactNode; // ✅ NEW
   scrollable?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (disabled) return;
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
      showFooter={showFooter} // ✅ NEW
      footer={footer}
      scrollable={scrollable}
      trigger={
        <Button className="flex items-center gap-2" disabled={disabled}>
          <Plus className="w-4 h-4" />
          {triggerText}
        </Button>
      }
      confirmText="Create"
      confirmDisabled={confirmDisabled}
      onConfirm={() => {
        // ✅ SAFE: only call if provided
        onSubmit?.(() => setOpen(false));
      }}
    >
      {({ close }) => children({ close })}
    </GenericDialog>
  );
}
