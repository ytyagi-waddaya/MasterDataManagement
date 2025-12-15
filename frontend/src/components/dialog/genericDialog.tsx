// "use client";

// import * as React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// interface GenericDialogProps {
//   trigger: React.ReactNode;
//   title: string;
//   description?: string;
//   children: (props: { close: () => void }) => React.ReactNode;
//   confirmText?: string;
//   cancelText?: string;
//   onConfirm?: () => void;
//   size?: "sm" | "md" | "lg";
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   confirmDisabled?: boolean;
// }

// export const GenericDialog: React.FC<GenericDialogProps> = ({
//   trigger,
//   title,
//   description,
//   children,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   onConfirm,
//   open,
//   onOpenChange,
//   size = "md",
//   confirmDisabled = false,
// }) => {

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogTrigger asChild>{trigger}</DialogTrigger>

//       <DialogContent className={`max-w-${size}`}>
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           {description && <DialogDescription>{description}</DialogDescription>}
//         </DialogHeader>

//         <div className="my-4">{children({ close: () => onOpenChange(false) })}</div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             {cancelText}
//           </Button>
//           <Button onClick={onConfirm} disabled={confirmDisabled}>
//             {confirmText}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

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

interface GenericDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: (props: { close: () => void }) => React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  size?: "sm" | "md" | "lg";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmDisabled?: boolean;
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
}) => {

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }[size];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className={sizeClass}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="my-4">
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
