import {
  Prisma,
  FieldDataType,
  FieldCategory,
  FieldType,
} from "../../prisma/generated/client.js";
import crypto from "crypto";
import { BadRequestException } from "../utils/appError.js";

/* ======================================================
   TYPES
===================================================== */

type FieldConfig = Record<string, any>; // already Zod-validated upstream

type SchemaField = {
  key: string;
  label: string;
  fieldType: FieldType;
  dataType: FieldDataType;
  category: FieldCategory;
  config: Record<string, any>;
  required: boolean;
};

/* ======================================================
   FIELD CONFIG → FIELD DEFINITIONS
===================================================== */

// export function extractFieldsFromSchema(schema: FieldConfig[]): SchemaField[] {
//   const fields: SchemaField[] = schema.map((field) => {
//     if (!field?.meta?.key) {
//       throw new BadRequestException("Field meta.key is required");
//     }

//     if (!field?.data?.type) {
//       throw new BadRequestException(
//         `Field "${field.meta.key}" is missing data.type`
//       );
//     }

//     const widget = field.ui?.widget ?? "TEXT";

//     if (!(widget in FieldType)) {
//       throw new BadRequestException(
//         `Invalid widget "${widget}" for field "${field.meta.key}"`
//       );
//     }

//     if (
//       field.meta.category === FieldCategory.CALCULATED &&
//       !field.behavior?.formula
//     ) {
//       throw new BadRequestException(
//         `Calculated field "${field.meta.key}" must have a formula`
//       );
//     }

//     return {
//       key: field.meta.key,
//       label: field.meta.label,
//       fieldType: widget as FieldType,
//       dataType: field.data.type as FieldDataType,
//       category: field.meta.category as FieldCategory,
//       config: {
//         ui: field.ui,
//         validation: field.validation,
//         visibility: field.visibility,
//         permissions: field.permissions,
//         behavior: field.behavior,
//         integration: field.integration,
//       },
//       required: Boolean(field.validation?.required),
//     };
//   });

//   /* --------- UNIQUE FIELD KEYS --------- */
//   const keys = new Set<string>();
//   for (const f of fields) {
//     if (keys.has(f.key)) {
//       throw new BadRequestException(`Duplicate field key "${f.key}"`);
//     }
//     keys.add(f.key);
//   }

//   return fields;
// }

export function extractFieldsFromSchema(schema: FieldConfig[]): SchemaField[] {
  const keys = new Set<string>();

  return schema.map((field) => {
    if (!field?.meta?.key) {
      throw new BadRequestException("Field meta.key is required");
    }

    if (keys.has(field.meta.key)) {
      throw new BadRequestException(
        `Duplicate field key "${field.meta.key}"`
      );
    }
    keys.add(field.meta.key);

    if (!field?.data?.type) {
      throw new BadRequestException(
        `Field "${field.meta.key}" is missing data.type`
      );
    }

    const widget = field.ui?.widget ?? "TEXT";
    if (!(widget in FieldType)) {
      throw new BadRequestException(
        `Invalid widget "${widget}" for field "${field.meta.key}"`
      );
    }

    return {
      key: field.meta.key,
      label: field.meta.label,
      fieldType: widget as FieldType,
      dataType: field.data.type as FieldDataType,
      category: field.meta.category as FieldCategory,
      required: Boolean(field.validation?.required),

      // 🔑 STORE FULL UI CONFIG
      config: {
        ui: {
          ...field.ui,
          layout: {
            width: field.ui?.layout?.width ?? "full",
            order: field.ui?.layout?.order ?? 0,
            section: field.ui?.layout?.section ?? "default",
          },
        },
        validation: field.validation,
        visibility: field.visibility,
        permissions: field.permissions,
        behavior: field.behavior,
        integration: field.integration,
      },
    };
  });
}


/* ======================================================
   FIELD DIFF ENGINE
===================================================== */

export async function applyFieldDiff({
  tx,
  masterObjectId,
  previousSchemaId,
  newSchemaId,
  schemaJson,
}: {
  tx: Prisma.TransactionClient;
  masterObjectId: string;
  previousSchemaId: string | null;
  newSchemaId: string;
  schemaJson: FieldConfig[];
}) {
  const incomingFields = extractFieldsFromSchema(schemaJson);

  const previousFields = previousSchemaId
    ? await tx.fieldDefinition.findMany({
        where: { schemaId: previousSchemaId, deletedAt: null },
      })
    : [];

  const previousByKey = new Map(previousFields.map((f) => [f.key, f]));
  const seenKeys = new Set<string>();

  for (const [order, field] of incomingFields.entries()) {
    seenKeys.add(field.key);
    const previous = previousByKey.get(field.key);

    const normalizedConfig =
      field.config && Object.keys(field.config).length > 0
        ? field.config
        : Prisma.JsonNull;

    if (!previous) {
      await tx.fieldDefinition.create({
        data: {
          masterObjectId,
          schemaId: newSchemaId,
          key: field.key,
          label: field.label,
          fieldType: field.fieldType,
          dataType: field.dataType,
          category: field.category,
          config: normalizedConfig,
          isRequired: field.required,
          isActive: true,
          order,
        },
      });
      continue;
    }

    /* -------- IMMUTABILITY RULES -------- */

    if (previous.dataType !== field.dataType) {
      throw new BadRequestException(
        `Cannot change data type of field "${field.key}"`
      );
    }

    if (previous.fieldType !== field.fieldType) {
      throw new BadRequestException(
        `Cannot change UI widget of field "${field.key}"`
      );
    }

    if (previous.category !== field.category) {
      throw new BadRequestException(
        `Cannot change category of field "${field.key}"`
      );
    }

    const prevConfig = asJsonObject(previous.config);
    const prevFormula = prevConfig.behavior?.formula;
    const nextFormula = field.config.behavior?.formula;

    if (
      prevFormula &&
      JSON.stringify(prevFormula) !== JSON.stringify(nextFormula)
    ) {
      throw new BadRequestException(
        `Cannot modify formula of calculated field "${field.key}"`
      );
    }

    /* -------- CARRY FORWARD -------- */

    await tx.fieldDefinition.create({
      data: {
        masterObjectId,
        schemaId: newSchemaId,
        key: field.key,
        label: field.label,
        fieldType: field.fieldType,
        dataType: field.dataType,
        category: previous.category,
        config: normalizedConfig,
        isRequired: field.required,
        isSystem: previous.isSystem,
        isActive: true,
        order,
      },
    });
  }

  /* -------- SOFT DELETE REMOVED FIELDS -------- */

  for (const oldField of previousFields) {
    if (!seenKeys.has(oldField.key)) {
      await tx.fieldDefinition.create({
        data: {
          masterObjectId,
          schemaId: newSchemaId,
          key: oldField.key,
          label: oldField.label,
          fieldType: oldField.fieldType,
          dataType: oldField.dataType,
          category: oldField.category,
          config: oldField.config ?? Prisma.JsonNull,
          isRequired: oldField.isRequired,
          isActive: false,
          isLocked: true,
          order: oldField.order,
        },
      });
    }
  }
}

/* ======================================================
   SCHEMA PUBLISH WITH DIFF
===================================================== */

export async function publishSchemaWithDiff({
  tx,
  masterObjectId,
  schemaJson,
  publish,
  createdById,
}: {
  tx: Prisma.TransactionClient;
  masterObjectId: string;
  schemaJson: FieldConfig[];
  publish: boolean;
  createdById?: string | null;
}) {
  const previousSchema = await tx.masterObjectSchema.findFirst({
    where: { masterObjectId },
    orderBy: { version: "desc" },
  });

  const checksum = hashSchema(schemaJson);

  if (previousSchema && previousSchema.checksum === checksum) {
    throw new BadRequestException("No schema changes detected");
  }

  if (publish) {
    await tx.masterObjectSchema.updateMany({
      where: { masterObjectId, status: "PUBLISHED" },
      data: { status: "ARCHIVED" },
    });
  }

  const newSchema = await tx.masterObjectSchema.create({
    data: {
      masterObjectId,
      version: (previousSchema?.version ?? 0) + 1,
      status: publish ? "PUBLISHED" : "DRAFT",
      layout: schemaJson,
      checksum,
      createdById: createdById ?? null,
      publishedAt: publish ? new Date() : null,
    },
  });

  await applyFieldDiff({
    tx,
    masterObjectId,
    previousSchemaId: previousSchema?.id ?? null,
    newSchemaId: newSchema.id,
    schemaJson,
  });

  return newSchema;
}

/* ======================================================
   HELPERS
===================================================== */

function hashSchema(schema: any): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(schema))
    .digest("hex");
}

function asJsonObject(
  value: Prisma.JsonValue | null | undefined
): Record<string, any> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, any>;
  }
  return {};
}


