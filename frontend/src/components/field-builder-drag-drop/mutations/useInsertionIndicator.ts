import { useState } from "react";

export type InsertPos = {
  sectionId: string;
  nodeId: string;
  position: "before" | "after";
} | null;

/* ======================================================
   INSERT INDICATOR (UI ONLY)
====================================================== */
export function useInsertionIndicator() {
  const [insertPos, setInsertPos] = useState<InsertPos>(null);

  return {
    insertPos,
    setInsertPos,
    clear: () => setInsertPos(null),
  };
}
