import { FieldConfig} from "../contracts/field-config.contract";
import { FieldConfigMigration } from "../migrations/migration.contract";
export const FIELD_CONFIG_MIGRATIONS: FieldConfigMigration[] = [
  {
    from: 0,
    to: 1,
    description: "Add schemaVersion and normalize ui.layout",

    migrate(old: FieldConfig): FieldConfig {
      return {
        ...old,
        schemaVersion: 1,
        ui: old.ui
          ? {
              ...old.ui,
              layout: old.ui.layout ?? { width: "full" },
            }
          : undefined,
      };
    },
  },
];


