import { nanoid } from "@reduxjs/toolkit";
import {
  EditorNode,
  ContainerSlot,
  LayoutSpan,
} from "../contracts/editor.contract";
import { FieldPaletteConfig, LayoutPaletteConfig, PaletteItem } from "../contracts/fieldPalette.contract";
import { createFieldKey, toFieldKey } from "../contracts/field-key";


/* ======================================================
   CREATE EDITOR NODE FROM PALETTE
====================================================== */

export function createEditorNodeFromPalette(
  paletteItem: PaletteItem
): EditorNode {
  const id = nanoid();

  /* ================= FIELD ================= */
  if (paletteItem.kind === "FIELD") {
    const cfg = paletteItem.defaultConfig as FieldPaletteConfig;

    return {
      id,
      kind: "FIELD",
      field: {
        id,
        key: toFieldKey(id),
        label: cfg.label,
        type: cfg.type,
        category: cfg.suggestedCategory ?? "INPUT",
        layout: cfg.layout ?? { span: 12 },
        format: cfg.format?.style
          ? {
              style: cfg.format.style,
              currency: cfg.format.currency,
            }
          : undefined,
        options: cfg.options,
        readOnly: cfg.readOnly,
      },
    };
  }

  /* ================= LAYOUT ================= */
  const cfg = paletteItem.defaultConfig as LayoutPaletteConfig;

  const makeSlot = (
    title?: string,
    span?: LayoutSpan
  ): ContainerSlot => ({
    id: nanoid(),
    title,
    config: span ? { span } : undefined,
    children: [],
  });

  switch (cfg.type) {
    case "columns":
      return {
        id,
        kind: "LAYOUT",
        type: "columns",
        slots: cfg.columns.map((c: { span: number }) =>
          makeSlot(undefined, c.span as LayoutSpan)
        ),
      };

    case "tabs":
      return {
        id,
        kind: "LAYOUT",
        type: "tabs",
        slots: cfg.tabs.map((t: { title: string }) =>
          makeSlot(t.title)
        ),
      };

    case "accordion":
      return {
        id,
        kind: "LAYOUT",
        type: "accordion",
        slots: cfg.panels.map((p: { title: string }) =>
          makeSlot(p.title)
        ),
      };

    case "repeater":
      return {
        id,
        kind: "LAYOUT",
        type: "repeater",
        slots: [makeSlot(cfg.itemLabel)],
        config: {
          minItems: cfg.minItems ?? 0,
          maxItems: cfg.maxItems ?? null,
        },
      };

    case "heading":
      return {
        id,
        kind: "LAYOUT",
        type: "heading",
        config: {
          text: cfg.text ?? "Heading",
        },
      };

    case "divider":
      return {
        id,
        kind: "LAYOUT",
        type: "divider",
      };

    case "spacer":
      return {
        id,
        kind: "LAYOUT",
        type: "spacer",
        config: {
          height: cfg.height ?? 16,
        },
      };

    default:
      throw new Error(`Unsupported layout type`);
  }
}
