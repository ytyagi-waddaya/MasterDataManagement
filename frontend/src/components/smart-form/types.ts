export interface FieldDefinition {
  id: string;
  key: string;
  label: string;
  type: "text" | "number" | "date" | "currency" | "boolean";
  group: string;
}

export interface TableColumn {
  id: string;
  key: string;
  label: string;
  width: number;
  alignment: "left" | "center" | "right";
  type: "text" | "number" | "currency";
}

export interface CanvasElement {
  id: string;
  type:
    | "field"
    | "header"
    | "logo"
    | "address"
    | "table"
    | "signature"
    | "line"
    | "footer"
    | "image"
    | "formula"
    | "pageBreak";
  key?: string;
  label: string;
  data?: any;
  properties: {
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize: number;
    fontFamily: string;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    alignment: "left" | "center" | "right" | "justify";
    color: string;
    backgroundColor: string;
    borderWidth: number;
    borderColor: string;
    borderStyle: "solid" | "dashed" | "dotted";
    padding: number;
    margin: number;
    visible: boolean;
    zIndex: number;
    opacity: number;
    rotation: number;
    columns?: TableColumn[];
  };
}

export interface SmartFormTemplate {
  id: string;
  name: string;
  type: string;
  elements: CanvasElement[];
}

export interface DataRecord {
  id: string;
  code: string;
  type: string;
  status: string;
  data: Record<string, any>;
  items?: any[];
  totals?: Record<string, any>;
  metadata?: Record<string, any>;
}
