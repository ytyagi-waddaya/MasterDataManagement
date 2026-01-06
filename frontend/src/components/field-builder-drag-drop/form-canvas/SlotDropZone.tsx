import { useDroppable } from "@dnd-kit/core";

export function SlotDropZone({
  containerId,
  slotId,
  children,
}: {
  containerId: string;
  slotId: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot:${slotId}`,
    data: {
      type: "CONTAINER_SLOT",
      containerId,
      slotId,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-12 rounded-md p-2 transition
        ${isOver ? "bg-primary/10 ring-2 ring-primary" : "ring-1 ring-muted"}
      `}
    >
      {children}
    </div>
  );
}
