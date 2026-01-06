// import { DragEndEvent } from "@dnd-kit/core";
// import { DragData, DropData } from "./drag.types";

// export function normalizeDnDEvent(
//   event: DragEndEvent
// ): {
//   drag: DragData | null;
//   drop: DropData | null;
// } {
//   const { active, over } = event;
//   if (!over) return { drag: null, drop: null };

//   return {
//     drag: active.data.current as DragData,
//     drop: over.data.current as DropData,
//   };
// }

import { DragEndEvent } from "@dnd-kit/core";
import { DragData, DropData } from "./drag.types";

// export function normalizeDnDEvent(
//   event: DragEndEvent
// ): {
//   drag: DragData | null;
//   drop: DropData | null;
// } {
//   const { active, over } = event;

//   console.groupCollapsed("🔍 normalizeDnDEvent");
//   console.debug("active.id:", active?.id);
//   console.debug("active.data:", active?.data?.current);
//   console.debug("over?.id:", over?.id);
//   console.debug("over?.data:", over?.data?.current);
//   console.groupEnd();

//   if (!active?.data?.current || !over?.data?.current) {
//     console.warn("❌ Missing drag or drop data");
//     return { drag: null, drop: null };
//   }

//   return {
//     drag: active.data.current as DragData,
//     drop: over.data.current as DropData,
//   };
// }

export function normalizeDnDEvent(event: DragEndEvent) {
  const { active, over } = event;
  if (!over) return { drag: null, drop: null };

  return {
    drag: active.data.current,
    drop: over.data.current,
  };
}
