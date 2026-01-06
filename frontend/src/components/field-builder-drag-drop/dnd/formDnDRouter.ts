// import { DragEndEvent } from "@dnd-kit/core";
// import { normalizeDnDEvent } from "./normalizeDragEvent";
// import { FormSection } from "../contracts/editor.contract";

// import {
//   addFieldToSection,
//   addFieldAtPosition,
//   addFieldToContainerSlot,
// } from "../mutations/add";

// import { moveFieldAtPosition, moveFieldToSection, moveFieldToSlot } from "../mutations/move";

// type SetSections = React.Dispatch<React.SetStateAction<FormSection[]>>;
// type SetSelectedNodeId = (id: string | null) => void;

// type MutationResult = {
//   sections: FormSection[];
//   createdId?: string;
// };

// /* ======================================================
//    FORM DnD ROUTER (FIELD + LAYOUT)
// ====================================================== */
// /* ======================================================
//    FORM DnD ROUTER (FIELD + LAYOUT + AUTO SELECT)
// ====================================================== */
// export function formDnDRouter(
//   event: DragEndEvent,
//   setSections: SetSections,
//   setSelectedNodeId: (id: string | null) => void
// ) {
//   const { drag, drop } = normalizeDnDEvent(event);
//   if (!drag || !drop) return;
  
//   if (drop.type === "CONTAINER_SLOT" && drag.type === "PALETTE_LAYOUT") {
//     return;
//   }

//   if (drag.type === "PALETTE_FIELD" || drag.type === "PALETTE_LAYOUT") {
//     setSections((prev) => {
//       let rawResult:
//         | FormSection[]
//         | { sections: FormSection[]; createdId?: string }
//         | null = null;

//       if (drop.type === "SECTION") {
//         rawResult = drop.insertPos
//           ? addFieldAtPosition(
//               prev,
//               drag.item,
//               drop.insertPos.sectionId,
//               drop.insertPos.nodeId,
//               drop.insertPos.position
//             )
//           : addFieldToSection(prev, drag.item, drop.sectionId);
//       }

//       if (drop.type === "CONTAINER_SLOT" && drag.type === "PALETTE_FIELD") {
//         rawResult = addFieldToContainerSlot(
//           prev,
//           drag.item,
//           drop.containerId,
//           drop.slotId
//         );
//       }

//       if (!rawResult) return prev;

//       const { sections, createdId } = normalizeResult(rawResult);

//       if (createdId) {
//         queueMicrotask(() => setSelectedNodeId(createdId));
//       }

//       return sections;
//     });

//     return;
//   }

// if (drag.type === "FIELD") {
//   setSections((prev) => {
//     if (drop.type === "SECTION") {
//       return drop.insertPos
//         ? moveFieldAtPosition(
//             prev,
//             drag.fieldId,
//             drop.insertPos.sectionId,
//             drop.insertPos.nodeId,
//             drop.insertPos.position
//           )
//         : moveFieldToSection(
//             prev,
//             drag.fieldId,
//             drop.sectionId
//           );
//     }

//     if (drop.type === "CONTAINER_SLOT") {
//       return moveFieldToSlot(
//         prev,
//         drag.fieldId,
//         drop.containerId,
//         drop.slotId
//       );
//     }

//     return prev;
//   });
// }

// }

// function normalizeResult(
//   result: FormSection[] | { sections: FormSection[]; createdId?: string }
// ): { sections: FormSection[]; createdId?: string } {
//   if (Array.isArray(result)) {
//     return { sections: result };
//   }
//   return result;
// }

// //WHEN CLICK ON THE FIELD inside the layout then only layout is being clicked

import { DragEndEvent } from "@dnd-kit/core";
import { normalizeDnDEvent } from "./normalizeDragEvent";
import { FormSection } from "../contracts/editor.contract";

import {
  addFieldToSection,
  addFieldAtPosition,
  addFieldToContainerSlot,
} from "../mutations/add";

import {
  moveFieldAtPosition,
  moveFieldToSection,
  moveFieldToSlot,
} from "../mutations/move";

type SetSections = React.Dispatch<React.SetStateAction<FormSection[]>>;
type OnNodeCreated = (id: string) => void;

/* ======================================================
   FORM DnD ROUTER (SELECTION-AGNOSTIC)
====================================================== */
export function formDnDRouter(
  event: DragEndEvent,
  setSections: SetSections,
  onNodeCreated?: OnNodeCreated
) {
  const { drag, drop } = normalizeDnDEvent(event);
  if (!drag || !drop) return;

  /* 🚫 Disallow dropping layouts inside slots */
  if (drop.type === "CONTAINER_SLOT" && drag.type === "PALETTE_LAYOUT") {
    return;
  }

  /* ================= PALETTE → CANVAS ================= */
  if (drag.type === "PALETTE_FIELD" || drag.type === "PALETTE_LAYOUT") {
    setSections((prev) => {
      let result:
        | FormSection[]
        | { sections: FormSection[]; createdId?: string }
        | null = null;

      if (drop.type === "SECTION") {
        result = drop.insertPos
          ? addFieldAtPosition(
              prev,
              drag.item,
              drop.insertPos.sectionId,
              drop.insertPos.nodeId,
              drop.insertPos.position
            )
          : addFieldToSection(prev, drag.item, drop.sectionId);
      }

      if (
        drop.type === "CONTAINER_SLOT" &&
        drag.type === "PALETTE_FIELD"
      ) {
        result = addFieldToContainerSlot(
          prev,
          drag.item,
          drop.containerId,
          drop.slotId
        );
      }

      if (!result) return prev;

      const { sections, createdId } = normalizeResult(result);

      // ✅ Optional auto-selection hook
      if (createdId && onNodeCreated) {
        queueMicrotask(() => onNodeCreated(createdId));
      }

      return sections;
    });

    return;
  }

  /* ================= CANVAS → CANVAS ================= */
  if (drag.type === "FIELD") {
    setSections((prev) => {
      if (drop.type === "SECTION") {
        return drop.insertPos
          ? moveFieldAtPosition(
              prev,
              drag.fieldId,
              drop.insertPos.sectionId,
              drop.insertPos.nodeId,
              drop.insertPos.position
            )
          : moveFieldToSection(prev, drag.fieldId, drop.sectionId);
      }

      if (drop.type === "CONTAINER_SLOT") {
        return moveFieldToSlot(
          prev,
          drag.fieldId,
          drop.containerId,
          drop.slotId
        );
      }

      return prev;
    });
  }
}

/* ======================================================
   NORMALIZER
====================================================== */

function normalizeResult(
  result: FormSection[] | { sections: FormSection[]; createdId?: string }
): { sections: FormSection[]; createdId?: string } {
  return Array.isArray(result) ? { sections: result } : result;
}
