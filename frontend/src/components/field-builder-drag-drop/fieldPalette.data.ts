/* ======================================================
   FIELD PALETTE DATA (EDITOR ONLY)
====================================================== */

import { LayoutSpan } from "./contracts/editor.contract";
import { PaletteGroup } from "./contracts/fieldPalette.contract";

/** Layout span helpers (avoid type casts) */
const FULL: LayoutSpan = 12;
const HALF: LayoutSpan = 6;
const THIRD: LayoutSpan = 4;

export const FIELD_PALETTE: PaletteGroup[] = [
  /* ================= LAYOUT ================= */
  {
    group: "Presentation",
    items: [
      {
        id: "heading",
        kind: "LAYOUT",
        label: "Heading",
        icon: "Type",
        defaultConfig: {
          type: "heading",
          level: 3,
          text: "Heading",
        },
      },
      {
        id: "divider",
        kind: "LAYOUT",
        label: "Divider",
        icon: "SeparatorHorizontal",
        defaultConfig: {
          type: "divider",
        },
      },
      {
        id: "spacer",
        kind: "LAYOUT",
        label: "Spacer",
        icon: "MoveVertical",
        defaultConfig: {
          type: "spacer",
          height: 16,
        },
      },
    ],
  },

  {
    group: "Structure",
    items: [
      {
        id: "columns",
        kind: "LAYOUT",
        label: "Columns",
        icon: "Columns",
        defaultConfig: {
          type: "columns",
          columns: [{ span: HALF }, { span: HALF }],
        },
      },
      {
        id: "tabs",
        kind: "LAYOUT",
        label: "Tabs",
        icon: "NotebookTabs",
        defaultConfig: {
          type: "tabs",
          tabs: [{ title: "Tab 1" }, { title: "Tab 2" }],
        },
      },
      {
        id: "accordion",
        kind: "LAYOUT",
        label: "Accordion",
        icon: "ChevronsUpDown",
        defaultConfig: {
          type: "accordion",
          panels: [{ title: "Section 1" }, { title: "Section 2" }],
        },
      },
      {
        id: "repeater",
        kind: "LAYOUT",
        label: "Repeater",
        icon: "Repeat",
        defaultConfig: {
          type: "repeater",
          minItems: 0,
          maxItems: null,
          itemLabel: "Item",
        },
      },
    ],
  },

  /* ================= TEXT INPUTS ================= */
  {
    group: "Text inputs",
    items: [
      {
        id: "text",
        kind: "FIELD",
        label: "Text Input",
        icon: "Type",
        defaultConfig: {
          type: "text",
          label: "Text",
          layout: { span: FULL },
        },
      },
      {
        id: "email",
        kind: "FIELD",
        label: "Email",
        icon: "Mail",
        defaultConfig: {
          type: "email",
          label: "Email",
          layout: { span: HALF },
        },
      },
      {
        id: "password",
        kind: "FIELD",
        label: "Password",
        icon: "Key",
        defaultConfig: {
          type: "password",
          label: "Password",
          layout: { span: HALF },
        },
      },
      {
        id: "textarea",
        kind: "FIELD",
        label: "Text Area",
        icon: "AlignLeft",
        defaultConfig: {
          type: "textarea",
          label: "Description",
          layout: { span: FULL },
        },
      },
    ],
  },

  /* ================= NUMBER INPUTS ================= */
  {
    group: "Number inputs",
    items: [
      {
        id: "number",
        kind: "FIELD",
        label: "Number",
        icon: "Hash",
        defaultConfig: {
          type: "number",
          label: "Number",
          layout: { span: HALF },
        },
      },
      {
        id: "currency",
        kind: "FIELD",
        label: "Currency",
        icon: "IndianRupee",
        defaultConfig: {
          type: "currency",
          label: "Amount",
          layout: { span: HALF },
          format: { style: "currency", currency: "INR" },
        },
      },
      {
        id: "percentage",
        kind: "FIELD",
        label: "Percent",
        icon: "Percent",
        defaultConfig: {
          type: "percentage",
          label: "Percentage",
          layout: { span: THIRD },
        },
      },
    ],
  },

  /* ================= SELECT INPUTS ================= */
  {
    group: "Select inputs",
    items: [
      {
        id: "select",
        kind: "FIELD",
        label: "Select",
        icon: "ChevronDown",
        defaultConfig: {
          type: "select",
          label: "Select",
          layout: { span: HALF },
          options: [],
        },
      },
      {
        id: "multi_select",
        kind: "FIELD",
        label: "Multiselect",
        icon: "ListPlus",
        defaultConfig: {
          type: "multi_select",
          label: "Select Multiple",
          layout: { span: HALF },
          options: [],
        },
      },
      {
        id: "radio",
        kind: "FIELD",
        label: "Radio Group",
        icon: "ListChecks",
        defaultConfig: {
          type: "radio",
          label: "Choose One",
          layout: { span: HALF },
          options: [],
        },
      },
    ],
  },

  /* ================= BOOLEAN ================= */
  {
    group: "Boolean",
    items: [
      {
        id: "boolean",
        kind: "FIELD",
        label: "Switch",
        icon: "ToggleLeft",
        defaultConfig: {
          type: "boolean",
          label: "Yes / No",
          layout: { span: FULL },
        },
      },
    ],
  },

  /* ================= DATE ================= */
  {
    group: "Date",
    items: [
      {
        id: "date",
        kind: "FIELD",
        label: "Date",
        icon: "Calendar",
        defaultConfig: {
          type: "date",
          label: "Date",
          layout: { span: HALF },
        },
      },
      {
        id: "datetime",
        kind: "FIELD",
        label: "Date & Time",
        icon: "CalendarClock",
        defaultConfig: {
          type: "datetime",
          label: "Date & Time",
          layout: { span: HALF },
        },
      },
    ],
  },

  /* ================= FILE & IMAGE ================= */
  {
    group: "File and Image",
    items: [
      {
        id: "file",
        kind: "FIELD",
        label: "File Upload",
        icon: "Upload",
        defaultConfig: {
          type: "file",
          label: "Upload File",
          layout: { span: FULL },
        },
      },
      {
        id: "image",
        kind: "FIELD",
        label: "Image Upload",
        icon: "Image",
        defaultConfig: {
          type: "image",
          label: "Upload Image",
          layout: { span: FULL },
        },
      },
      {
        id: "rating",
        kind: "FIELD",
        label: "Rating",
        icon: "Star",
        defaultConfig: {
          type: "rating",
          label: "Rating",
          layout: { span: HALF },
        },
      },
    ],
  },

  /* ================= REFERENCE ================= */
  {
    group: "Reference",
    items: [
      {
        id: "reference",
        kind: "FIELD",
        label: "Reference",
        icon: "Link",
        defaultConfig: {
          type: "reference",
          label: "Related Record",
          suggestedCategory: "REFERENCE",
          layout: { span: HALF },
        },
      },
    ],
  },
];
