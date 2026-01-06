import { FieldKey } from "./condition.contract";
import { FieldIntegration } from "./field-config.contract";
import { EditorFieldType } from "./fieldPalette.contract";
import { VisibilityRule } from "./visibility.contract";

/* ======================================================
   EDITOR CONTRACT (EDITOR STATE ONLY)
====================================================== */

export type LayoutSpan = 3 | 4 | 6 | 8 | 12;

/* ================= FIELD ================= */

export interface EditorField {
  id: string;
  key: FieldKey;

  label: string;
  type: EditorFieldType;

  category?: "INPUT" | "SYSTEM" | "CALCULATED" | "REFERENCE";

  layout: {
    span: LayoutSpan;
  };

  required?: boolean;
  deprecated?: boolean;
  readOnly?: boolean;

  validation?: {
    min?: number;
    max?: number;
    regex?: string;
  };

  options?: { label: string; value: string }[];

  format?: {
    style: "currency" | "percent" | "decimal";
    currency?: string;
  };

  visibility?: {
    defaultVisible?: boolean;
    rule?: VisibilityRule;
  };

  placeholder?: string;
  defaultValue?: string;
  description?: string;

  integration?: FieldIntegration;
}

/* ================= NODES ================= */

export interface FieldNode {
  id: string;
  kind: "FIELD";
  field: EditorField;
}

/* ================= CONTAINER SLOT ================= */

export interface ContainerSlot {
  id: string;
  title?: string;
  config?: {
    span?: LayoutSpan;
  };
  children: EditorNode[];
}

/* ================= SECTIONS ================= */

export interface FormSection {
  id: string;
  title: string;
  nodes: EditorNode[];
  collapsed?: boolean;
}

/* ================= INSERT POSITION ================= */

export type InsertPos = {
  sectionId: string;
  nodeId: string;
  position: "before" | "after";
};

/* ================= LAYOUT BASE ================= */

interface BaseLayoutNode<T = unknown> {
  id: string;
  kind: "LAYOUT";
  config?: T;
}

/* ================= SLOT-BASED LAYOUTS ================= */

export interface ColumnsLayoutNode extends BaseLayoutNode {
  type: "columns";
  slots: ContainerSlot[];
}

export interface TabsLayoutNode extends BaseLayoutNode {
  type: "tabs";
  slots: ContainerSlot[];
}

export interface AccordionLayoutNode extends BaseLayoutNode {
  type: "accordion";
  slots: ContainerSlot[];
}

export interface RepeaterLayoutNode extends BaseLayoutNode<{ label?: string, minItems?:number, maxItems?:number| null }> {
  type: "repeater";
  slots: ContainerSlot[];
}

/* ================= SIMPLE LAYOUTS ================= */

export interface DividerLayoutNode extends BaseLayoutNode<{ text?: string }> {
  type: "divider";
}

export interface HeadingLayoutNode
  extends BaseLayoutNode<{
    text?: string;
    level?: number;
    description?: string;
  }> {
  type: "heading";
}

export interface SpacerLayoutNode extends BaseLayoutNode<{ height?: number }> {
  type: "spacer";
}

/* ================= UNION ================= */

export type LayoutNode =
  | ColumnsLayoutNode
  | TabsLayoutNode
  | AccordionLayoutNode
  | RepeaterLayoutNode
  | DividerLayoutNode
  | HeadingLayoutNode
  | SpacerLayoutNode;

export type EditorNode = FieldNode | LayoutNode;

/* ================= SLOT TYPE GUARD ================= */

export type SlotLayoutType = "columns" | "tabs" | "accordion" | "repeater";

export type SlotLayoutNode = Extract<LayoutNode, { type: SlotLayoutType }>;

export type EditorSelection =
  | { type: "NODE"; nodeId: string }
  | { type: "SLOT"; layoutId: string; slotId: string }
  | { type: "SECTION"; sectionId: string }
  | null;
