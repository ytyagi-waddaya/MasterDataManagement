// "use client";

// import { useDroppable } from "@dnd-kit/core";
// import React from "react";

// export function ContainerDropZone({
//   containerId,
//   slotId,
//   children,
// }: {
//   containerId: string;
//   slotId: string;
//   children: React.ReactNode;
// }) {
//   const {
//     setNodeRef,
//     isOver,
//     active,
//   } = useDroppable({
//     id: `slot:${slotId}`,
//     data: {
//       type: "CONTAINER_SLOT",
//       containerId,
//       slotId,
//     },
//   });

//   /* ✅ Only highlight when dragging a FIELD */
//   const isFieldDragging = active?.data.current?.type === "FIELD"
//     || active?.data.current?.type === "PALETTE_FIELD";

//   const showHighlight = isOver && isFieldDragging;
//   const isEmpty = React.Children.count(children) === 0;

//   return (
//     <div
//       ref={setNodeRef}
//       className={`
//         min-h-
//         rounded border border-dashed
//         transition-all
//         ${showHighlight
//           ? "bg-primary/15 border-primary ring-1 ring-primary"
//           : "border-muted"}
//       `}
//     >
//       {isEmpty && (
//         <div
//           className={`
//             text-xs p-2 italic
//             ${showHighlight
//               ? "text-primary font-medium"
//               : "text-muted-foreground"}
//           `}
//         >
//           Drop here
//         </div>
//       )}

//       {children}
//     </div>
//   );
// }

"use client";

import { useDroppable } from "@dnd-kit/core";
import React from "react";

export function ContainerDropZone({
  containerId,
  slotId,
  children,
}: {
  containerId: string;
  slotId: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: `slot:${slotId}`,
    data: {
      type: "CONTAINER_SLOT",
      containerId,
      slotId,
    },
  });

  const isDragging =
    active?.data.current?.type === "FIELD" ||
    active?.data.current?.type === "PALETTE_FIELD";

  return (
    <div
      ref={setNodeRef}
      className={`rounded border border-dashed transition
        ${isOver && isDragging
          ? "bg-primary/10 border-primary ring-1 ring-primary"
          : "border-muted"}
      `}
      style={{
        pointerEvents: isDragging ? "auto" : "none",
      }}
    >
      {/* children MUST receive pointer events */}
      <div style={{ pointerEvents: "auto" }}>
        {children}
      </div>
    </div>
  );
}
