export interface FieldDefinition {
  id: string;
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'percentage' | 'boolean' | 'select';
  group: string;
  required?: boolean;
  defaultValue?: any;
  options?: string[];
}

export interface TableColumn {
  id: string;
  key: string;
  label: string;
  width: number;
  alignment: "left" | "center" | "right";
  type: 'text' | 'number' | 'currency' | 'date';
}

export interface CanvasElement {
  id: string;
  type:
    | "field"
    | "label"
    | "table"
    | "line"
    | "section"
    | "address"
    | "header"
    | "footer"
    | "logo"
    | "signature"
    | "barcode"
    | "rectangle";
  key?: string;
  label: string;
  data?: any;
  properties: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fontSize: number;
    fontFamily: string;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    alignment: "left" | "center" | "right";
    color: string;
    backgroundColor: string;
    borderWidth: number;
    borderColor: string;
    borderStyle: "solid" | "dashed" | "dotted";
    padding: number;
    margin: number;
    columns?: TableColumn[];
  };
}

export interface DataRecord {
  id?: string;
  code?: string;
  data: Record<string, any>;
  items?: Array<Record<string, any>>;
}

export interface SmartFormDesignerProps {
  masterObject?: any;
  record?: DataRecord;
  onBack?: () => void;
}