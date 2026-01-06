import { InsertPos } from "../contracts/editor.contract";
import { PaletteItem } from "../contracts/fieldPalette.contract";

/* ======================================================
   DRAG SOURCE
====================================================== */

export type DragData =
  | {
      type: "PALETTE_FIELD";
      item: PaletteItem;
    }
  | {
      type: "PALETTE_LAYOUT";
      item: PaletteItem;
    }
  | {
      type: "FIELD";
      fieldId: string;
      fromSectionId: string 
    }
  | {
      type: "SECTION";
      sectionId: string;
    };

/* ======================================================
   DROP TARGET
====================================================== */

export type DropData =
  | {
      type: "SECTION";
      sectionId: string;
      insertPos?: InsertPos;
    }
  | {
      type: "CONTAINER_SLOT";
      containerId: string;
      slotId: string;
    };
