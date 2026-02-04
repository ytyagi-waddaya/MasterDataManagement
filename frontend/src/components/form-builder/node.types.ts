/* ======================================================
   NODE TYPES — SINGLE SOURCE OF TRUTH
====================================================== */

export type LayoutType =
  | "heading"
  | "divider"
  | "spacer"
  | "repeater"
  | "columns"
  | "tabs";

/* ---------- FIELD ---------- */

export type FieldNode = WithVisibility & {
  kind: "FIELD";
  id: string;
  field: { key: string };
};

/* ---------- BASE LAYOUT ---------- */

type BaseLayoutNode<T extends LayoutType> = WithVisibility & {
  kind: "LAYOUT";
  id: string;
  type: T;
};

/* ---------- PRESENTATION ---------- */

export type HeadingLayoutNode = BaseLayoutNode<"heading"> & {
  config?: {
    level?: number;
    text?: string;
  };
};

export type DividerLayoutNode = BaseLayoutNode<"divider">;

export type SpacerLayoutNode = BaseLayoutNode<"spacer"> & {
  config?: {
    size?: string;
  };
};

/* ---------- STRUCTURE ---------- */

export type GenericLayoutNode = BaseLayoutNode<"columns" | "tabs"> & {
  slots: Slot[];
};

export type RepeaterLayoutNode = BaseLayoutNode<"repeater"> & {
  config?: {
    minItems?: number;
    maxItems?: number;
    addLabel?: string;
    itemLabel?: string;
  };
  children: Node[];
};

/* ---------- SLOT ---------- */

export type Slot =  WithVisibility & {
  id: string;
  title?: string;
  children: Node[];
};

/* ---------- UNION ---------- */

export type Node =
  | FieldNode
  | HeadingLayoutNode
  | DividerLayoutNode
  | SpacerLayoutNode
  | RepeaterLayoutNode
  | GenericLayoutNode;

export type VisibilityOperator =
  | "EQUAL"
  | "NOT_EQUAL"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_EQUAL"
  | "LESS_THAN_EQUAL"
  | "IN"
  | "NOT_IN";

export type VisibilityCondition = {
  type: "condition";
   field: string;   
  fieldKey?: string;
  operator: VisibilityOperator;
  value: any;
};

export type VisibilityGroup = {
  type: "group";
  logic: "AND" | "OR";
  conditions: VisibilityNode[];
};

export type VisibilityNode =
  | VisibilityCondition
  | VisibilityGroup;

export type VisibilityRule = VisibilityGroup;

type WithVisibility = {
  visibility?: VisibilityRule;
};


// ✅ ADD THIS

export type CalculationOperator =
  | "ADD"
  | "SUBTRACT"
  | "MULTIPLY"
  | "DIVIDE";

export type CalculationConfig = {
  operator: CalculationOperator;
  operands: string[]; // field keys
};
