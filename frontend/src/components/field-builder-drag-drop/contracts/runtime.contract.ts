import { FieldConfig } from "./field-config.contract";

export interface RuntimeFieldState {
  value?: any;
  visible: boolean;
  readOnly: boolean;
  errors?: string[];
}

export interface RuntimeField {
  id:string;
  config: FieldConfig;
  state: RuntimeFieldState;
}
