import * as Icons from "lucide-react";

/* ======================================================
   PALETTE CONTRACT (EDITOR INTENT ONLY)
   ⚠️ Editor-only. Never persisted directly.
====================================================== */

export type PaletteItemKind = "FIELD" | "LAYOUT";

/* ======================================================
   EDITOR FIELD TYPES (INTENT-LEVEL)
   - UI/UX intent only
   - Mapped later to canonical FieldConfig
====================================================== */

export type EditorFieldType =
  /* -------- Text -------- */
  | "text"
  | "textarea"
  | "rich_text"
  | "email"
  | "phone"
  | "url"
  | "password"

  /* -------- Numbers -------- */
  | "number"
  | "currency"
  | "percentage"

  /* -------- Boolean -------- */
  | "boolean"
  | "consent"

  /* -------- Selection -------- */
  | "select"
  | "multi_select"
  | "radio"
  | "rating"
  | "scale"
  | "matrix"

  /* -------- Date / Time -------- */
  | "date"
  | "datetime"

  /* -------- Files / Media -------- */
  | "file"
  | "image"

  /* -------- References -------- */
  | "reference"
  | "multi_reference"
  | "user"
  | "role"
  | "status"

  /* -------- Workflow / System -------- */
  | "approval"
  | "checklist"
  | "captcha"

  /* -------- Advanced -------- */
  | "json";

/* ======================================================
   FIELD PALETTE CONFIG
====================================================== */

export interface FieldPaletteConfig {
  /** Editor intent */
  type: EditorFieldType;

  /** Default label shown on drop */
  label: string;

  /** Suggested canonical category */
  suggestedCategory?: "INPUT" | "SYSTEM" | "CALCULATED" | "REFERENCE";

  /** Layout hint (editor only) */
  layout?: {
    span: LayoutSpan
  };

  /** Formatting hints */
  format?: {
    style?: "currency" | "percent" | "decimal";
    currency?: string;
  };

  /** Options for select-like fields */
  options?: { label: string; value: string }[];

  /** Default readonly state */
  readOnly?: boolean;
}

/* ======================================================
   LAYOUT PALETTE
====================================================== */

export type LayoutType =
  | "columns"
  | "tabs"
  | "accordion"
  | "repeater"
  | "divider"
  | "heading"
  | "spacer";

import { LayoutSpan } from "./editor.contract";

/* ================= LAYOUT PALETTE CONFIGS ================= */

export type ColumnsLayoutConfig = {
  type: "columns";
  columns: { span: LayoutSpan }[];
};

export type TabsLayoutConfig = {
  type: "tabs";
  tabs: { title: string }[];
};

export type AccordionLayoutConfig = {
  type: "accordion";
  panels: { title: string }[];
};

export type RepeaterLayoutConfig = {
  type: "repeater";
  minItems?: number;
  maxItems?: number | null;
  itemLabel?: string;
};

export type DividerLayoutConfig = {
  type: "divider";
};

export type HeadingLayoutConfig = {
  type: "heading";
  text?: string;
  level?: number;
};

export type SpacerLayoutConfig = {
  type: "spacer";
  height?: number;
};

/* ================= UNION ================= */

export type LayoutPaletteConfig =
  | ColumnsLayoutConfig
  | TabsLayoutConfig
  | AccordionLayoutConfig
  | RepeaterLayoutConfig
  | DividerLayoutConfig
  | HeadingLayoutConfig
  | SpacerLayoutConfig;

/* ======================================================
   PALETTE ITEM
====================================================== */

export interface PaletteItem {
  id: string;
  kind: PaletteItemKind;

  /** Display label */
  label: string;

  /** Lucide icon name */
  icon: keyof typeof Icons;

  /** Feature flags */
  hidden?: boolean;
  experimental?: boolean;

  /** Default editor config */
  defaultConfig: FieldPaletteConfig | LayoutPaletteConfig;
}

/* ======================================================
   PALETTE GROUP
====================================================== */

export interface PaletteGroup {
  group: string;
  items: PaletteItem[];
}
