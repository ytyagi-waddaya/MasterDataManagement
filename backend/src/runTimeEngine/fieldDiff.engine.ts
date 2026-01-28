import {
  Prisma,
  FieldDataType,
  FieldCategory,
  FieldType,
} from "../../prisma/generated/client.js";
import crypto from "crypto";
import { BadRequestException } from "../utils/appError.js";
import { WIDGET_TO_FIELD_TYPE } from "../modules/masterObject/dto/masterObject.dto.js";
import stringify from "json-stable-stringify";
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

export function extractFieldsFromSchema(schema: FieldConfig[]): SchemaField[] {
  if (!Array.isArray(schema)) {
    throw new BadRequestException(
      "fieldConfig must be an array of field definitions",
    );
  }

  const keys = new Set<string>();

  return schema.map((field) => {
    if (!field?.meta?.key) {
      throw new BadRequestException("Field meta.key is required");
    }

    if (keys.has(field.meta.key)) {
      throw new BadRequestException(`Duplicate field key "${field.meta.key}"`);
    }
    keys.add(field.meta.key);

    if (!field?.data?.type) {
      throw new BadRequestException(
        `Field "${field.meta.key}" is missing data.type`,
      );
    }

    if (
      field.ui?.widget === "FILE" &&
      field.integration?.file?.multiple &&
      field.data.type !== "JSON"
    ) {
      throw new BadRequestException(
        `Multiple file field "${field.meta.key}" must use JSON data type`,
      );
    }

    const widget = field.ui?.widget ?? "TEXT";
    const fieldType = WIDGET_TO_FIELD_TYPE[widget];

    if (!fieldType) {
      throw new BadRequestException(
        `Unsupported widget "${widget}" for field "${field.meta.key}"`,
      );
    }

    if (field.ui?.widget === "FILE" && !field.integration?.file) {
      throw new BadRequestException(
        `File field "${field.meta.key}" must define integration.file`,
      );
    }

    return {
      key: field.meta.key,
      label: field.meta.label,
      fieldType,
      dataType: field.data.type as FieldDataType,
      category: field.meta.category as FieldCategory,
      required: Boolean(
        field.validation?.rules?.some((r: any) => r.type === "REQUIRED"),
      ),

      config: {
        ui: field.ui ?? {},
        validation: field.validation,
        visibility: field.visibility,
        permissions: field.permissions,
        // behavior: field.behavior,
        behavior: {
          ...(field.behavior ?? {}),
          formula: field.calculation
            ? {
                expression: buildExpression(field.calculation),
                dependencies: field.calculation.operands,
              }
            : undefined,
        },
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
  publish,
}: {
  tx: Prisma.TransactionClient;
  masterObjectId: string;
  previousSchemaId: string | null;
  newSchemaId: string;
  schemaJson: FieldConfig[];
  publish?: boolean;
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
      const def = await tx.fieldDefinition.create({
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

      await syncFieldRules(tx, def.id, field.config);
      continue;
    }

    /* -------- IMMUTABILITY RULES -------- */

    if (previous.dataType !== field.dataType) {
      throw new BadRequestException(
        `Cannot change data type of field "${field.key}"`,
      );
    }

    if (previous.fieldType !== field.fieldType) {
      throw new BadRequestException(
        `Cannot change UI widget of field "${field.key}"`,
      );
    }

    if (previous.category !== field.category) {
      throw new BadRequestException(
        `Cannot change category of field "${field.key}"`,
      );
    }

    if (previous.isSystem && field.label !== previous.label) {
      throw new BadRequestException(
        `System field "${field.key}" label cannot be changed`,
      );
    }

    const prevConfig = asJsonObject(previous.config);
    const prevFormula = prevConfig.behavior?.formula;
    const nextFormula = field.config.behavior?.formula;

    const prevExpr = prevFormula?.expression;
    const nextExpr = nextFormula?.expression;

    // if (prevExpr !== nextExpr) {
    //   throw new BadRequestException(
    //     `Cannot modify formula expression of field "${field.key}"`,
    //   );
    // }
    const isBreakingChange =
      prevExpr !== nextExpr &&
      previousSchemaId !== null && // not first schema
      publish === true; // publishing

    if (isBreakingChange) {
      throw new BadRequestException(
        `Cannot modify formula expression of field "${field.key}" after publish`,
      );
    }

    /* -------- CARRY FORWARD -------- */

    const def = await tx.fieldDefinition.create({
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
        publishedAt: publish ? new Date() : null,
        isActive: true,
        order,
        isLocked: false,
      },
    });
    await syncFieldRules(tx, def.id, field.config);
  }

  /* -------- SOFT DELETE REMOVED FIELDS -------- */

  for (const oldField of previousFields) {
    if (!seenKeys.has(oldField.key)) {
      const def = await tx.fieldDefinition.create({
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

      // 👇 ADD THIS (cleanup old rules)
      await Promise.all([
        tx.fieldValidationRule.updateMany({
          where: { fieldId: oldField.id },
          data: { deletedAt: new Date() },
        }),
        tx.fieldPermission.updateMany({
          where: { fieldId: oldField.id },
          data: { deletedAt: new Date() },
        }),
        tx.fieldFormula.updateMany({
          where: { fieldId: oldField.id },
          data: { deletedAt: new Date() },
        }),
        tx.fieldReference.updateMany({
          where: { fieldId: oldField.id },
          data: { deletedAt: new Date() },
        }),
        tx.fieldConditionBinding.updateMany({
          where: { fieldId: oldField.id },
          data: { deletedAt: new Date() },
        }),
      ]);
    }
  }
}

/* ======================================================
   SCHEMA PUBLISH WITH DIFF
===================================================== */

export async function publishSchemaWithDiff({
  tx,
  masterObjectId,
  fieldConfigs,
  layoutSchema,
  publish,
  createdById,
}: {
  tx: Prisma.TransactionClient;
  masterObjectId: string;
  fieldConfigs: FieldConfig[];
  layoutSchema: unknown;
  publish: boolean;
  createdById?: string | null;
}) {
  const previousSchema = await tx.masterObjectSchema.findFirst({
    where: { masterObjectId },
    orderBy: { version: "desc" },
  });

  const checksum = hashSchema({ layoutSchema, fieldConfigs });

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
      layout: layoutSchema as Prisma.InputJsonValue,
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
    schemaJson: fieldConfigs,
    publish,
  });

  return newSchema;
}

/* ======================================================
   HELPERS
===================================================== */

function hashSchema(schema: any): string {
  const str = stringify(schema) ?? "";

  return crypto.createHash("sha256").update(str).digest("hex");
}

function asJsonObject(
  value: Prisma.JsonValue | null | undefined,
): Record<string, any> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, any>;
  }
  return {};
}

export async function syncFieldRules(
  tx: Prisma.TransactionClient,
  fieldId: string,
  config: any,
) {
  await Promise.all([
    tx.fieldValidationRule.updateMany({
      where: { fieldId },
      data: { deletedAt: new Date() },
    }),
    tx.fieldPermission.updateMany({
      where: { fieldId },
      data: { deletedAt: new Date() },
    }),
    tx.fieldFormula.updateMany({
      where: { fieldId },
      data: { deletedAt: new Date() },
    }),
    tx.fieldReference.updateMany({
      where: { fieldId },
      data: { deletedAt: new Date() },
    }),
    tx.fieldConditionBinding.updateMany({
      where: { fieldId },
      data: { deletedAt: new Date() },
    }),
  ]);

  /* ========== VALIDATION RULES ========== */
  if (config?.validation?.rules) {
    for (const [i, r] of config.validation.rules.entries()) {
      await tx.fieldValidationRule.create({
        data: {
          fieldId,
          type: r.type,
          rule: r.params ?? {},
          errorMessage: r.message,
          order: i,
          severity: r.severity ?? "ERROR",
        },
      });
    }
  }

  /* ========== FORMULA ========== */
  if (config?.behavior?.formula) {
    await tx.fieldFormula.create({
      data: {
        fieldId,
        expression: config.behavior.formula.expression,
        dependencies: config.behavior.formula.dependencies,
      },
    });
  }

  if (config?.visibility?.rule?.type === "EXPRESSION") {
    for (const dep of config.visibility.rule.expression.dependencies ?? []) {
      await tx.fieldConditionBinding.create({
        data: {
          fieldId,
          conditionKey: dep,
        },
      });
    }
  }
  // const ref = config.integration.reference;
  // /* ========== REFERENCE ========== */
  // if (config?.integration?.reference) {
  //   // const target = await tx.masterObject.findUnique({
  //   //   where: { key: config.integration.reference.targetObject },
  //   // });
  //   const target = await tx.masterObject.findFirst({
  //     where: {
  //       OR: [{ id: ref.resource }, { key: ref.resource }],
  //     },
  //   });
  //   if (!target) {
  //     throw new BadRequestException(
  //       `Invalid reference target object "${config.integration.reference.targetObject}"`,
  //     );
  //   }
  //   // await tx.fieldReference.create({
  //   //   data: {
  //   //     fieldId,
  //   //     targetObjectId: target.id,
  //   //     displayFieldKey: config.integration.reference.displayField,
  //   //     relationType: config.integration.reference.relation,
  //   //     allowMultiple: config.integration.reference.allowMultiple ?? false,
  //   //     onDeleteBehavior: config.integration.reference.onDelete ?? "RESTRICT",
  //   //   },
  //   // });
  //   await tx.fieldReference.create({
  //     data: {
  //       fieldId,
  //       targetObjectId: target.id,
  //       displayFieldKey: config.integration.reference.labelField,
  //       relationType: config.integration.reference.multiple
  //         ? "ONE_TO_MANY"
  //         : "ONE_TO_ONE",
  //       allowMultiple: config.integration.reference.multiple ?? false,
  //       onDeleteBehavior: "RESTRICT",
  //     },
  //   });
  // }
  /* ========== REFERENCE ========== */
if (config?.integration?.reference) {
  const ref = config.integration.reference;

  if (!ref.resource) {
    throw new BadRequestException("Reference resource is required");
  }

  if (!ref.labelField || !ref.valueField) {
    throw new BadRequestException(
      "Reference must define labelField and valueField"
    );
  }

  // 🔁 Resolve resource → masterObject
  const resource = await tx.resource.findUnique({
    where: { id: ref.resource },
    select: { masterObjectId: true },
  });

if (!resource?.masterObjectId) {
  throw new BadRequestException(
    `Resource "${ref.resource}" is not linked to a MasterObject`
  );
}

  const targetObjectId = resource.masterObjectId;

await tx.fieldReference.create({
  data: {
    fieldId,
    targetObjectId: resource.masterObjectId,
    displayFieldKey: ref.labelField,
    relationType: ref.multiple ? "ONE_TO_MANY" : "ONE_TO_ONE",
    allowMultiple: ref.multiple ?? false,
    onDeleteBehavior: "RESTRICT",
  },
});
}


  /* ========== PERMISSIONS ========== */
  const perms = config?.permissions;
  for (const mode of ["read", "write"] as const) {
    if (!perms?.[mode]) continue;

    // Role-based permissions
    for (const roleId of perms[mode].roles ?? []) {
      await tx.fieldPermission.create({
        data: {
          fieldId,
          roleId,
          canRead: mode === "read",
          canWrite: mode === "write",
          condition: perms[mode].conditions ?? undefined,
        },
      });
    }

    // User-based permissions  👈 ADD THIS
    for (const userId of perms[mode].users ?? []) {
      await tx.fieldPermission.create({
        data: {
          fieldId,
          userId,
          canRead: mode === "read",
          canWrite: mode === "write",
          condition: perms[mode].conditions ?? undefined,
        },
      });
    }
  }
}

type CalculationOperator = "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE";

type Calculation = {
  operator: CalculationOperator;
  operands: string[];
};

function buildExpression(calc: Calculation): string {
  const map: Record<CalculationOperator, string> = {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
  };

  return calc.operands.join(` ${map[calc.operator]} `);
}
