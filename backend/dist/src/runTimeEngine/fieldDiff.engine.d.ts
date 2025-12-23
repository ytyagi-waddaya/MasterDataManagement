import { Prisma, FieldDataType, FieldCategory, FieldType } from "../../prisma/generated/client.js";
type FieldConfig = Record<string, any>;
type SchemaField = {
    key: string;
    label: string;
    fieldType: FieldType;
    dataType: FieldDataType;
    category: FieldCategory;
    config: Record<string, any>;
    required: boolean;
};
export declare function extractFieldsFromSchema(schema: FieldConfig[]): SchemaField[];
export declare function applyFieldDiff({ tx, masterObjectId, previousSchemaId, newSchemaId, schemaJson, }: {
    tx: Prisma.TransactionClient;
    masterObjectId: string;
    previousSchemaId: string | null;
    newSchemaId: string;
    schemaJson: FieldConfig[];
}): Promise<void>;
export declare function publishSchemaWithDiff({ tx, masterObjectId, schemaJson, publish, createdById, }: {
    tx: Prisma.TransactionClient;
    masterObjectId: string;
    schemaJson: FieldConfig[];
    publish: boolean;
    createdById?: string | null;
}): Promise<{
    id: string;
    createdAt: Date;
    status: import("../../prisma/generated/enums.js").SchemaStatus;
    version: number;
    updatedAt: Date;
    deletedAt: Date | null;
    masterObjectId: string;
    createdById: string | null;
    layout: import("@prisma/client/runtime/client").JsonValue;
    checksum: string;
    publishedAt: Date | null;
}>;
export {};
//# sourceMappingURL=fieldDiff.engine.d.ts.map