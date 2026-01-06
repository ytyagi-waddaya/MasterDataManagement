import { FieldConfig } from "../contracts/field-config.contract";


export interface FieldConfigMigration {
  from: number;
  to: number;
  description: string;
  migrate: (old: FieldConfig) => FieldConfig;
}
