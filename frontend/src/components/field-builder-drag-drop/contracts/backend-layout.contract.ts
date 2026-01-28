// contracts/backend-layout.contract.ts

export type BackendFieldNode = {
  id: string;
  kind: "FIELD";
  field: {
    key: string;
    layout: {
      span: number;
    };
  };
};

export type BackendLayoutNodeWithSlots = {
  id: string;
  kind: "LAYOUT";
  type: "columns" | "tabs" | "accordion" | "repeater";
  slots: {
    id: string;
    title?: string;
    config?: any;
    children: BackendEditorNode[];
  }[];
  config?: any;
};

export type BackendLayoutNodeSimple = {
  id: string;
  kind: "LAYOUT";
  type: "heading" | "divider" | "spacer";
  config?: any;
};

export type BackendEditorNode =
  | BackendFieldNode
  | BackendLayoutNodeWithSlots
  | BackendLayoutNodeSimple;

export type BackendFormSection = {
  id: string;
  title: string;
  collapsed?: boolean;
  nodes: BackendEditorNode[];
};
