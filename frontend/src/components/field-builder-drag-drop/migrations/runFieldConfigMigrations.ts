import { FieldConfig, CURRENT_SCHEMA_VERSION } from "../contracts/field-config.contract";
import { FIELD_CONFIG_MIGRATIONS } from "../contracts/field-config.migrations";


export function migrateFieldConfig(config: FieldConfig): FieldConfig {
  let current = config;

  while (current.schemaVersion < CURRENT_SCHEMA_VERSION) {
    const migration = FIELD_CONFIG_MIGRATIONS.find(
      m => m.from === current.schemaVersion
    );

    if (!migration) {
      throw new Error(
        `No migration found from version ${current.schemaVersion}`
      );
    }

    current = migration.migrate(current);
  }

  return current;
}
