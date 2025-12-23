import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MasterObjectSchema
 *
 */
export type MasterObjectSchemaModel = runtime.Types.Result.DefaultSelection<Prisma.$MasterObjectSchemaPayload>;
export type AggregateMasterObjectSchema = {
    _count: MasterObjectSchemaCountAggregateOutputType | null;
    _avg: MasterObjectSchemaAvgAggregateOutputType | null;
    _sum: MasterObjectSchemaSumAggregateOutputType | null;
    _min: MasterObjectSchemaMinAggregateOutputType | null;
    _max: MasterObjectSchemaMaxAggregateOutputType | null;
};
export type MasterObjectSchemaAvgAggregateOutputType = {
    version: number | null;
};
export type MasterObjectSchemaSumAggregateOutputType = {
    version: number | null;
};
export type MasterObjectSchemaMinAggregateOutputType = {
    id: string | null;
    masterObjectId: string | null;
    version: number | null;
    status: $Enums.SchemaStatus | null;
    checksum: string | null;
    createdById: string | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type MasterObjectSchemaMaxAggregateOutputType = {
    id: string | null;
    masterObjectId: string | null;
    version: number | null;
    status: $Enums.SchemaStatus | null;
    checksum: string | null;
    createdById: string | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type MasterObjectSchemaCountAggregateOutputType = {
    id: number;
    masterObjectId: number;
    version: number;
    status: number;
    layout: number;
    checksum: number;
    createdById: number;
    publishedAt: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type MasterObjectSchemaAvgAggregateInputType = {
    version?: true;
};
export type MasterObjectSchemaSumAggregateInputType = {
    version?: true;
};
export type MasterObjectSchemaMinAggregateInputType = {
    id?: true;
    masterObjectId?: true;
    version?: true;
    status?: true;
    checksum?: true;
    createdById?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type MasterObjectSchemaMaxAggregateInputType = {
    id?: true;
    masterObjectId?: true;
    version?: true;
    status?: true;
    checksum?: true;
    createdById?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type MasterObjectSchemaCountAggregateInputType = {
    id?: true;
    masterObjectId?: true;
    version?: true;
    status?: true;
    layout?: true;
    checksum?: true;
    createdById?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type MasterObjectSchemaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MasterObjectSchema to aggregate.
     */
    where?: Prisma.MasterObjectSchemaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MasterObjectSchemas to fetch.
     */
    orderBy?: Prisma.MasterObjectSchemaOrderByWithRelationInput | Prisma.MasterObjectSchemaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MasterObjectSchemaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MasterObjectSchemas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MasterObjectSchemas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MasterObjectSchemas
    **/
    _count?: true | MasterObjectSchemaCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MasterObjectSchemaAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MasterObjectSchemaSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MasterObjectSchemaMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MasterObjectSchemaMaxAggregateInputType;
};
export type GetMasterObjectSchemaAggregateType<T extends MasterObjectSchemaAggregateArgs> = {
    [P in keyof T & keyof AggregateMasterObjectSchema]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMasterObjectSchema[P]> : Prisma.GetScalarType<T[P], AggregateMasterObjectSchema[P]>;
};
export type MasterObjectSchemaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MasterObjectSchemaWhereInput;
    orderBy?: Prisma.MasterObjectSchemaOrderByWithAggregationInput | Prisma.MasterObjectSchemaOrderByWithAggregationInput[];
    by: Prisma.MasterObjectSchemaScalarFieldEnum[] | Prisma.MasterObjectSchemaScalarFieldEnum;
    having?: Prisma.MasterObjectSchemaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MasterObjectSchemaCountAggregateInputType | true;
    _avg?: MasterObjectSchemaAvgAggregateInputType;
    _sum?: MasterObjectSchemaSumAggregateInputType;
    _min?: MasterObjectSchemaMinAggregateInputType;
    _max?: MasterObjectSchemaMaxAggregateInputType;
};
export type MasterObjectSchemaGroupByOutputType = {
    id: string;
    masterObjectId: string;
    version: number;
    status: $Enums.SchemaStatus;
    layout: runtime.JsonValue;
    checksum: string;
    createdById: string | null;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: MasterObjectSchemaCountAggregateOutputType | null;
    _avg: MasterObjectSchemaAvgAggregateOutputType | null;
    _sum: MasterObjectSchemaSumAggregateOutputType | null;
    _min: MasterObjectSchemaMinAggregateOutputType | null;
    _max: MasterObjectSchemaMaxAggregateOutputType | null;
};
type GetMasterObjectSchemaGroupByPayload<T extends MasterObjectSchemaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MasterObjectSchemaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MasterObjectSchemaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MasterObjectSchemaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MasterObjectSchemaGroupByOutputType[P]>;
}>>;
export type MasterObjectSchemaWhereInput = {
    AND?: Prisma.MasterObjectSchemaWhereInput | Prisma.MasterObjectSchemaWhereInput[];
    OR?: Prisma.MasterObjectSchemaWhereInput[];
    NOT?: Prisma.MasterObjectSchemaWhereInput | Prisma.MasterObjectSchemaWhereInput[];
    id?: Prisma.StringFilter<"MasterObjectSchema"> | string;
    masterObjectId?: Prisma.StringFilter<"MasterObjectSchema"> | string;
    version?: Prisma.IntFilter<"MasterObjectSchema"> | number;
    status?: Prisma.EnumSchemaStatusFilter<"MasterObjectSchema"> | $Enums.SchemaStatus;
    layout?: Prisma.JsonFilter<"MasterObjectSchema">;
    checksum?: Prisma.StringFilter<"MasterObjectSchema"> | string;
    createdById?: Prisma.StringNullableFilter<"MasterObjectSchema"> | string | null;
    publishedAt?: Prisma.DateTimeNullableFilter<"MasterObjectSchema"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MasterObjectSchema"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MasterObjectSchema"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"MasterObjectSchema"> | Date | string | null;
    masterObject?: Prisma.XOR<Prisma.MasterObjectScalarRelationFilter, Prisma.MasterObjectWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    fieldDefinitions?: Prisma.FieldDefinitionListRelationFilter;
    masterRecords?: Prisma.MasterRecordListRelationFilter;
    schemaChanges?: Prisma.SchemaChangeListRelationFilter;
};
export type MasterObjectSchemaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    masterObjectId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    layout?: Prisma.SortOrder;
    checksum?: Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    masterObject?: Prisma.MasterObjectOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    fieldDefinitions?: Prisma.FieldDefinitionOrderByRelationAggregateInput;
    masterRecords?: Prisma.MasterRecordOrderByRelationAggregateInput;
    schemaChanges?: Prisma.SchemaChangeOrderByRelationAggregateInput;
};
export type MasterObjectSchemaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    masterObjectId_version?: Prisma.MasterObjectSchemaMasterObjectIdVersionCompoundUniqueInput;
    AND?: Prisma.MasterObjectSchemaWhereInput | Prisma.MasterObjectSchemaWhereInput[];
    OR?: Prisma.MasterObjectSchemaWhereInput[];
    NOT?: Prisma.MasterObjectSchemaWhereInput | Prisma.MasterObjectSchemaWhereInput[];
    masterObjectId?: Prisma.StringFilter<"MasterObjectSchema"> | string;
    version?: Prisma.IntFilter<"MasterObjectSchema"> | number;
    status?: Prisma.EnumSchemaStatusFilter<"MasterObjectSchema"> | $Enums.SchemaStatus;
    layout?: Prisma.JsonFilter<"MasterObjectSchema">;
    checksum?: Prisma.StringFilter<"MasterObjectSchema"> | string;
    createdById?: Prisma.StringNullableFilter<"MasterObjectSchema"> | string | null;
    publishedAt?: Prisma.DateTimeNullableFilter<"MasterObjectSchema"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MasterObjectSchema"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MasterObjectSchema"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"MasterObjectSchema"> | Date | string | null;
    masterObject?: Prisma.XOR<Prisma.MasterObjectScalarRelationFilter, Prisma.MasterObjectWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    fieldDefinitions?: Prisma.FieldDefinitionListRelationFilter;
    masterRecords?: Prisma.MasterRecordListRelationFilter;
    schemaChanges?: Prisma.SchemaChangeListRelationFilter;
}, "id" | "masterObjectId_version">;
export type MasterObjectSchemaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    masterObjectId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    layout?: Prisma.SortOrder;
    checksum?: Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MasterObjectSchemaCountOrderByAggregateInput;
    _avg?: Prisma.MasterObjectSchemaAvgOrderByAggregateInput;
    _max?: Prisma.MasterObjectSchemaMaxOrderByAggregateInput;
    _min?: Prisma.MasterObjectSchemaMinOrderByAggregateInput;
    _sum?: Prisma.MasterObjectSchemaSumOrderByAggregateInput;
};
export type MasterObjectSchemaScalarWhereWithAggregatesInput = {
    AND?: Prisma.MasterObjectSchemaScalarWhereWithAggregatesInput | Prisma.MasterObjectSchemaScalarWhereWithAggregatesInput[];
    OR?: Prisma.MasterObjectSchemaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MasterObjectSchemaScalarWhereWithAggregatesInput | Prisma.MasterObjectSchemaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MasterObjectSchema"> | string;
    masterObjectId?: Prisma.StringWithAggregatesFilter<"MasterObjectSchema"> | string;
    version?: Prisma.IntWithAggregatesFilter<"MasterObjectSchema"> | number;
    status?: Prisma.EnumSchemaStatusWithAggregatesFilter<"MasterObjectSchema"> | $Enums.SchemaStatus;
    layout?: Prisma.JsonWithAggregatesFilter<"MasterObjectSchema">;
    checksum?: Prisma.StringWithAggregatesFilter<"MasterObjectSchema"> | string;
    createdById?: Prisma.StringNullableWithAggregatesFilter<"MasterObjectSchema"> | string | null;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MasterObjectSchema"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MasterObjectSchema"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MasterObjectSchema"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MasterObjectSchema"> | Date | string | null;
};
export type MasterObjectSchemaCreateInput = {
    id?: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    masterObject: Prisma.MasterObjectCreateNestedOneWithoutSchemasInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutMasterObjectSchemasInput;
    fieldDefinitions?: Prisma.FieldDefinitionCreateNestedManyWithoutSchemaInput;
    masterRecords?: Prisma.MasterRecordCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaUncheckedCreateInput = {
    id?: string;
    masterObjectId: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    createdById?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedCreateNestedManyWithoutSchemaInput;
    masterRecords?: Prisma.MasterRecordUncheckedCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    masterObject?: Prisma.MasterObjectUpdateOneRequiredWithoutSchemasNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutMasterObjectSchemasNestedInput;
    fieldDefinitions?: Prisma.FieldDefinitionUpdateManyWithoutSchemaNestedInput;
    masterRecords?: Prisma.MasterRecordUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterObjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedUpdateManyWithoutSchemaNestedInput;
    masterRecords?: Prisma.MasterRecordUncheckedUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaCreateManyInput = {
    id?: string;
    masterObjectId: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    createdById?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type MasterObjectSchemaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MasterObjectSchemaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterObjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MasterObjectSchemaListRelationFilter = {
    every?: Prisma.MasterObjectSchemaWhereInput;
    some?: Prisma.MasterObjectSchemaWhereInput;
    none?: Prisma.MasterObjectSchemaWhereInput;
};
export type MasterObjectSchemaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MasterObjectSchemaMasterObjectIdVersionCompoundUniqueInput = {
    masterObjectId: string;
    version: number;
};
export type MasterObjectSchemaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    masterObjectId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    layout?: Prisma.SortOrder;
    checksum?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type MasterObjectSchemaAvgOrderByAggregateInput = {
    version?: Prisma.SortOrder;
};
export type MasterObjectSchemaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    masterObjectId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    checksum?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type MasterObjectSchemaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    masterObjectId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    checksum?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type MasterObjectSchemaSumOrderByAggregateInput = {
    version?: Prisma.SortOrder;
};
export type MasterObjectSchemaScalarRelationFilter = {
    is?: Prisma.MasterObjectSchemaWhereInput;
    isNot?: Prisma.MasterObjectSchemaWhereInput;
};
export type MasterObjectSchemaCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutCreatedByInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput> | Prisma.MasterObjectSchemaCreateWithoutCreatedByInput[] | Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutCreatedByInput | Prisma.MasterObjectSchemaCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.MasterObjectSchemaCreateManyCreatedByInputEnvelope;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
};
export type MasterObjectSchemaUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutCreatedByInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput> | Prisma.MasterObjectSchemaCreateWithoutCreatedByInput[] | Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutCreatedByInput | Prisma.MasterObjectSchemaCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.MasterObjectSchemaCreateManyCreatedByInputEnvelope;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
};
export type MasterObjectSchemaUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutCreatedByInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput> | Prisma.MasterObjectSchemaCreateWithoutCreatedByInput[] | Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutCreatedByInput | Prisma.MasterObjectSchemaCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.MasterObjectSchemaUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.MasterObjectSchemaUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.MasterObjectSchemaCreateManyCreatedByInputEnvelope;
    set?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    disconnect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    delete?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    update?: Prisma.MasterObjectSchemaUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.MasterObjectSchemaUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.MasterObjectSchemaUpdateManyWithWhereWithoutCreatedByInput | Prisma.MasterObjectSchemaUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.MasterObjectSchemaScalarWhereInput | Prisma.MasterObjectSchemaScalarWhereInput[];
};
export type MasterObjectSchemaUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutCreatedByInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput> | Prisma.MasterObjectSchemaCreateWithoutCreatedByInput[] | Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutCreatedByInput | Prisma.MasterObjectSchemaCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.MasterObjectSchemaUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.MasterObjectSchemaUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.MasterObjectSchemaCreateManyCreatedByInputEnvelope;
    set?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    disconnect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    delete?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    update?: Prisma.MasterObjectSchemaUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.MasterObjectSchemaUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.MasterObjectSchemaUpdateManyWithWhereWithoutCreatedByInput | Prisma.MasterObjectSchemaUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.MasterObjectSchemaScalarWhereInput | Prisma.MasterObjectSchemaScalarWhereInput[];
};
export type MasterObjectSchemaCreateNestedManyWithoutMasterObjectInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput> | Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput[] | Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput[];
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput | Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput[];
    createMany?: Prisma.MasterObjectSchemaCreateManyMasterObjectInputEnvelope;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
};
export type MasterObjectSchemaUncheckedCreateNestedManyWithoutMasterObjectInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput> | Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput[] | Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput[];
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput | Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput[];
    createMany?: Prisma.MasterObjectSchemaCreateManyMasterObjectInputEnvelope;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
};
export type MasterObjectSchemaUpdateManyWithoutMasterObjectNestedInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput> | Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput[] | Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput[];
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput | Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput[];
    upsert?: Prisma.MasterObjectSchemaUpsertWithWhereUniqueWithoutMasterObjectInput | Prisma.MasterObjectSchemaUpsertWithWhereUniqueWithoutMasterObjectInput[];
    createMany?: Prisma.MasterObjectSchemaCreateManyMasterObjectInputEnvelope;
    set?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    disconnect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    delete?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    update?: Prisma.MasterObjectSchemaUpdateWithWhereUniqueWithoutMasterObjectInput | Prisma.MasterObjectSchemaUpdateWithWhereUniqueWithoutMasterObjectInput[];
    updateMany?: Prisma.MasterObjectSchemaUpdateManyWithWhereWithoutMasterObjectInput | Prisma.MasterObjectSchemaUpdateManyWithWhereWithoutMasterObjectInput[];
    deleteMany?: Prisma.MasterObjectSchemaScalarWhereInput | Prisma.MasterObjectSchemaScalarWhereInput[];
};
export type MasterObjectSchemaUncheckedUpdateManyWithoutMasterObjectNestedInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput> | Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput[] | Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput[];
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput | Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput[];
    upsert?: Prisma.MasterObjectSchemaUpsertWithWhereUniqueWithoutMasterObjectInput | Prisma.MasterObjectSchemaUpsertWithWhereUniqueWithoutMasterObjectInput[];
    createMany?: Prisma.MasterObjectSchemaCreateManyMasterObjectInputEnvelope;
    set?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    disconnect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    delete?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput | Prisma.MasterObjectSchemaWhereUniqueInput[];
    update?: Prisma.MasterObjectSchemaUpdateWithWhereUniqueWithoutMasterObjectInput | Prisma.MasterObjectSchemaUpdateWithWhereUniqueWithoutMasterObjectInput[];
    updateMany?: Prisma.MasterObjectSchemaUpdateManyWithWhereWithoutMasterObjectInput | Prisma.MasterObjectSchemaUpdateManyWithWhereWithoutMasterObjectInput[];
    deleteMany?: Prisma.MasterObjectSchemaScalarWhereInput | Prisma.MasterObjectSchemaScalarWhereInput[];
};
export type EnumSchemaStatusFieldUpdateOperationsInput = {
    set?: $Enums.SchemaStatus;
};
export type MasterObjectSchemaCreateNestedOneWithoutFieldDefinitionsInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutFieldDefinitionsInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutFieldDefinitionsInput>;
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutFieldDefinitionsInput;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput;
};
export type MasterObjectSchemaUpdateOneRequiredWithoutFieldDefinitionsNestedInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutFieldDefinitionsInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutFieldDefinitionsInput>;
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutFieldDefinitionsInput;
    upsert?: Prisma.MasterObjectSchemaUpsertWithoutFieldDefinitionsInput;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MasterObjectSchemaUpdateToOneWithWhereWithoutFieldDefinitionsInput, Prisma.MasterObjectSchemaUpdateWithoutFieldDefinitionsInput>, Prisma.MasterObjectSchemaUncheckedUpdateWithoutFieldDefinitionsInput>;
};
export type MasterObjectSchemaCreateNestedOneWithoutMasterRecordsInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterRecordsInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterRecordsInput>;
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterRecordsInput;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput;
};
export type MasterObjectSchemaUpdateOneRequiredWithoutMasterRecordsNestedInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterRecordsInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterRecordsInput>;
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutMasterRecordsInput;
    upsert?: Prisma.MasterObjectSchemaUpsertWithoutMasterRecordsInput;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MasterObjectSchemaUpdateToOneWithWhereWithoutMasterRecordsInput, Prisma.MasterObjectSchemaUpdateWithoutMasterRecordsInput>, Prisma.MasterObjectSchemaUncheckedUpdateWithoutMasterRecordsInput>;
};
export type MasterObjectSchemaCreateNestedOneWithoutSchemaChangesInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutSchemaChangesInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutSchemaChangesInput>;
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutSchemaChangesInput;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput;
};
export type MasterObjectSchemaUpdateOneRequiredWithoutSchemaChangesNestedInput = {
    create?: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutSchemaChangesInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutSchemaChangesInput>;
    connectOrCreate?: Prisma.MasterObjectSchemaCreateOrConnectWithoutSchemaChangesInput;
    upsert?: Prisma.MasterObjectSchemaUpsertWithoutSchemaChangesInput;
    connect?: Prisma.MasterObjectSchemaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MasterObjectSchemaUpdateToOneWithWhereWithoutSchemaChangesInput, Prisma.MasterObjectSchemaUpdateWithoutSchemaChangesInput>, Prisma.MasterObjectSchemaUncheckedUpdateWithoutSchemaChangesInput>;
};
export type MasterObjectSchemaCreateWithoutCreatedByInput = {
    id?: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    masterObject: Prisma.MasterObjectCreateNestedOneWithoutSchemasInput;
    fieldDefinitions?: Prisma.FieldDefinitionCreateNestedManyWithoutSchemaInput;
    masterRecords?: Prisma.MasterRecordCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    masterObjectId: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedCreateNestedManyWithoutSchemaInput;
    masterRecords?: Prisma.MasterRecordUncheckedCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutCreatedByInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput>;
};
export type MasterObjectSchemaCreateManyCreatedByInputEnvelope = {
    data: Prisma.MasterObjectSchemaCreateManyCreatedByInput | Prisma.MasterObjectSchemaCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type MasterObjectSchemaUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    update: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutCreatedByInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutCreatedByInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutCreatedByInput>;
};
export type MasterObjectSchemaUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutCreatedByInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutCreatedByInput>;
};
export type MasterObjectSchemaUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.MasterObjectSchemaScalarWhereInput;
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateManyMutationInput, Prisma.MasterObjectSchemaUncheckedUpdateManyWithoutCreatedByInput>;
};
export type MasterObjectSchemaScalarWhereInput = {
    AND?: Prisma.MasterObjectSchemaScalarWhereInput | Prisma.MasterObjectSchemaScalarWhereInput[];
    OR?: Prisma.MasterObjectSchemaScalarWhereInput[];
    NOT?: Prisma.MasterObjectSchemaScalarWhereInput | Prisma.MasterObjectSchemaScalarWhereInput[];
    id?: Prisma.StringFilter<"MasterObjectSchema"> | string;
    masterObjectId?: Prisma.StringFilter<"MasterObjectSchema"> | string;
    version?: Prisma.IntFilter<"MasterObjectSchema"> | number;
    status?: Prisma.EnumSchemaStatusFilter<"MasterObjectSchema"> | $Enums.SchemaStatus;
    layout?: Prisma.JsonFilter<"MasterObjectSchema">;
    checksum?: Prisma.StringFilter<"MasterObjectSchema"> | string;
    createdById?: Prisma.StringNullableFilter<"MasterObjectSchema"> | string | null;
    publishedAt?: Prisma.DateTimeNullableFilter<"MasterObjectSchema"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MasterObjectSchema"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MasterObjectSchema"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"MasterObjectSchema"> | Date | string | null;
};
export type MasterObjectSchemaCreateWithoutMasterObjectInput = {
    id?: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    createdBy?: Prisma.UserCreateNestedOneWithoutMasterObjectSchemasInput;
    fieldDefinitions?: Prisma.FieldDefinitionCreateNestedManyWithoutSchemaInput;
    masterRecords?: Prisma.MasterRecordCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput = {
    id?: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    createdById?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedCreateNestedManyWithoutSchemaInput;
    masterRecords?: Prisma.MasterRecordUncheckedCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaCreateOrConnectWithoutMasterObjectInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput>;
};
export type MasterObjectSchemaCreateManyMasterObjectInputEnvelope = {
    data: Prisma.MasterObjectSchemaCreateManyMasterObjectInput | Prisma.MasterObjectSchemaCreateManyMasterObjectInput[];
    skipDuplicates?: boolean;
};
export type MasterObjectSchemaUpsertWithWhereUniqueWithoutMasterObjectInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    update: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutMasterObjectInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutMasterObjectInput>;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterObjectInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterObjectInput>;
};
export type MasterObjectSchemaUpdateWithWhereUniqueWithoutMasterObjectInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutMasterObjectInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutMasterObjectInput>;
};
export type MasterObjectSchemaUpdateManyWithWhereWithoutMasterObjectInput = {
    where: Prisma.MasterObjectSchemaScalarWhereInput;
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateManyMutationInput, Prisma.MasterObjectSchemaUncheckedUpdateManyWithoutMasterObjectInput>;
};
export type MasterObjectSchemaCreateWithoutFieldDefinitionsInput = {
    id?: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    masterObject: Prisma.MasterObjectCreateNestedOneWithoutSchemasInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutMasterObjectSchemasInput;
    masterRecords?: Prisma.MasterRecordCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaUncheckedCreateWithoutFieldDefinitionsInput = {
    id?: string;
    masterObjectId: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    createdById?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    masterRecords?: Prisma.MasterRecordUncheckedCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaCreateOrConnectWithoutFieldDefinitionsInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutFieldDefinitionsInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutFieldDefinitionsInput>;
};
export type MasterObjectSchemaUpsertWithoutFieldDefinitionsInput = {
    update: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutFieldDefinitionsInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutFieldDefinitionsInput>;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutFieldDefinitionsInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutFieldDefinitionsInput>;
    where?: Prisma.MasterObjectSchemaWhereInput;
};
export type MasterObjectSchemaUpdateToOneWithWhereWithoutFieldDefinitionsInput = {
    where?: Prisma.MasterObjectSchemaWhereInput;
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutFieldDefinitionsInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutFieldDefinitionsInput>;
};
export type MasterObjectSchemaUpdateWithoutFieldDefinitionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    masterObject?: Prisma.MasterObjectUpdateOneRequiredWithoutSchemasNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutMasterObjectSchemasNestedInput;
    masterRecords?: Prisma.MasterRecordUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaUncheckedUpdateWithoutFieldDefinitionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterObjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    masterRecords?: Prisma.MasterRecordUncheckedUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaCreateWithoutMasterRecordsInput = {
    id?: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    masterObject: Prisma.MasterObjectCreateNestedOneWithoutSchemasInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutMasterObjectSchemasInput;
    fieldDefinitions?: Prisma.FieldDefinitionCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaUncheckedCreateWithoutMasterRecordsInput = {
    id?: string;
    masterObjectId: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    createdById?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedCreateNestedManyWithoutSchemaInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaCreateOrConnectWithoutMasterRecordsInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterRecordsInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterRecordsInput>;
};
export type MasterObjectSchemaUpsertWithoutMasterRecordsInput = {
    update: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutMasterRecordsInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutMasterRecordsInput>;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutMasterRecordsInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutMasterRecordsInput>;
    where?: Prisma.MasterObjectSchemaWhereInput;
};
export type MasterObjectSchemaUpdateToOneWithWhereWithoutMasterRecordsInput = {
    where?: Prisma.MasterObjectSchemaWhereInput;
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutMasterRecordsInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutMasterRecordsInput>;
};
export type MasterObjectSchemaUpdateWithoutMasterRecordsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    masterObject?: Prisma.MasterObjectUpdateOneRequiredWithoutSchemasNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutMasterObjectSchemasNestedInput;
    fieldDefinitions?: Prisma.FieldDefinitionUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaUncheckedUpdateWithoutMasterRecordsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterObjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaCreateWithoutSchemaChangesInput = {
    id?: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    masterObject: Prisma.MasterObjectCreateNestedOneWithoutSchemasInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutMasterObjectSchemasInput;
    fieldDefinitions?: Prisma.FieldDefinitionCreateNestedManyWithoutSchemaInput;
    masterRecords?: Prisma.MasterRecordCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaUncheckedCreateWithoutSchemaChangesInput = {
    id?: string;
    masterObjectId: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    createdById?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedCreateNestedManyWithoutSchemaInput;
    masterRecords?: Prisma.MasterRecordUncheckedCreateNestedManyWithoutSchemaInput;
};
export type MasterObjectSchemaCreateOrConnectWithoutSchemaChangesInput = {
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutSchemaChangesInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutSchemaChangesInput>;
};
export type MasterObjectSchemaUpsertWithoutSchemaChangesInput = {
    update: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutSchemaChangesInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutSchemaChangesInput>;
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateWithoutSchemaChangesInput, Prisma.MasterObjectSchemaUncheckedCreateWithoutSchemaChangesInput>;
    where?: Prisma.MasterObjectSchemaWhereInput;
};
export type MasterObjectSchemaUpdateToOneWithWhereWithoutSchemaChangesInput = {
    where?: Prisma.MasterObjectSchemaWhereInput;
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateWithoutSchemaChangesInput, Prisma.MasterObjectSchemaUncheckedUpdateWithoutSchemaChangesInput>;
};
export type MasterObjectSchemaUpdateWithoutSchemaChangesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    masterObject?: Prisma.MasterObjectUpdateOneRequiredWithoutSchemasNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutMasterObjectSchemasNestedInput;
    fieldDefinitions?: Prisma.FieldDefinitionUpdateManyWithoutSchemaNestedInput;
    masterRecords?: Prisma.MasterRecordUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaUncheckedUpdateWithoutSchemaChangesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterObjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedUpdateManyWithoutSchemaNestedInput;
    masterRecords?: Prisma.MasterRecordUncheckedUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaCreateManyCreatedByInput = {
    id?: string;
    masterObjectId: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type MasterObjectSchemaUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    masterObject?: Prisma.MasterObjectUpdateOneRequiredWithoutSchemasNestedInput;
    fieldDefinitions?: Prisma.FieldDefinitionUpdateManyWithoutSchemaNestedInput;
    masterRecords?: Prisma.MasterRecordUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterObjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedUpdateManyWithoutSchemaNestedInput;
    masterRecords?: Prisma.MasterRecordUncheckedUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterObjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MasterObjectSchemaCreateManyMasterObjectInput = {
    id?: string;
    version: number;
    status?: $Enums.SchemaStatus;
    layout: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum: string;
    createdById?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type MasterObjectSchemaUpdateWithoutMasterObjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdBy?: Prisma.UserUpdateOneWithoutMasterObjectSchemasNestedInput;
    fieldDefinitions?: Prisma.FieldDefinitionUpdateManyWithoutSchemaNestedInput;
    masterRecords?: Prisma.MasterRecordUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaUncheckedUpdateWithoutMasterObjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fieldDefinitions?: Prisma.FieldDefinitionUncheckedUpdateManyWithoutSchemaNestedInput;
    masterRecords?: Prisma.MasterRecordUncheckedUpdateManyWithoutSchemaNestedInput;
    schemaChanges?: Prisma.SchemaChangeUncheckedUpdateManyWithoutSchemaNestedInput;
};
export type MasterObjectSchemaUncheckedUpdateManyWithoutMasterObjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumSchemaStatusFieldUpdateOperationsInput | $Enums.SchemaStatus;
    layout?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    checksum?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type MasterObjectSchemaCountOutputType
 */
export type MasterObjectSchemaCountOutputType = {
    fieldDefinitions: number;
    masterRecords: number;
    schemaChanges: number;
};
export type MasterObjectSchemaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    fieldDefinitions?: boolean | MasterObjectSchemaCountOutputTypeCountFieldDefinitionsArgs;
    masterRecords?: boolean | MasterObjectSchemaCountOutputTypeCountMasterRecordsArgs;
    schemaChanges?: boolean | MasterObjectSchemaCountOutputTypeCountSchemaChangesArgs;
};
/**
 * MasterObjectSchemaCountOutputType without action
 */
export type MasterObjectSchemaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchemaCountOutputType
     */
    select?: Prisma.MasterObjectSchemaCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MasterObjectSchemaCountOutputType without action
 */
export type MasterObjectSchemaCountOutputTypeCountFieldDefinitionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FieldDefinitionWhereInput;
};
/**
 * MasterObjectSchemaCountOutputType without action
 */
export type MasterObjectSchemaCountOutputTypeCountMasterRecordsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MasterRecordWhereInput;
};
/**
 * MasterObjectSchemaCountOutputType without action
 */
export type MasterObjectSchemaCountOutputTypeCountSchemaChangesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SchemaChangeWhereInput;
};
export type MasterObjectSchemaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    masterObjectId?: boolean;
    version?: boolean;
    status?: boolean;
    layout?: boolean;
    checksum?: boolean;
    createdById?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    masterObject?: boolean | Prisma.MasterObjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.MasterObjectSchema$createdByArgs<ExtArgs>;
    fieldDefinitions?: boolean | Prisma.MasterObjectSchema$fieldDefinitionsArgs<ExtArgs>;
    masterRecords?: boolean | Prisma.MasterObjectSchema$masterRecordsArgs<ExtArgs>;
    schemaChanges?: boolean | Prisma.MasterObjectSchema$schemaChangesArgs<ExtArgs>;
    _count?: boolean | Prisma.MasterObjectSchemaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["masterObjectSchema"]>;
export type MasterObjectSchemaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    masterObjectId?: boolean;
    version?: boolean;
    status?: boolean;
    layout?: boolean;
    checksum?: boolean;
    createdById?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    masterObject?: boolean | Prisma.MasterObjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.MasterObjectSchema$createdByArgs<ExtArgs>;
}, ExtArgs["result"]["masterObjectSchema"]>;
export type MasterObjectSchemaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    masterObjectId?: boolean;
    version?: boolean;
    status?: boolean;
    layout?: boolean;
    checksum?: boolean;
    createdById?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    masterObject?: boolean | Prisma.MasterObjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.MasterObjectSchema$createdByArgs<ExtArgs>;
}, ExtArgs["result"]["masterObjectSchema"]>;
export type MasterObjectSchemaSelectScalar = {
    id?: boolean;
    masterObjectId?: boolean;
    version?: boolean;
    status?: boolean;
    layout?: boolean;
    checksum?: boolean;
    createdById?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type MasterObjectSchemaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "masterObjectId" | "version" | "status" | "layout" | "checksum" | "createdById" | "publishedAt" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["masterObjectSchema"]>;
export type MasterObjectSchemaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    masterObject?: boolean | Prisma.MasterObjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.MasterObjectSchema$createdByArgs<ExtArgs>;
    fieldDefinitions?: boolean | Prisma.MasterObjectSchema$fieldDefinitionsArgs<ExtArgs>;
    masterRecords?: boolean | Prisma.MasterObjectSchema$masterRecordsArgs<ExtArgs>;
    schemaChanges?: boolean | Prisma.MasterObjectSchema$schemaChangesArgs<ExtArgs>;
    _count?: boolean | Prisma.MasterObjectSchemaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MasterObjectSchemaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    masterObject?: boolean | Prisma.MasterObjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.MasterObjectSchema$createdByArgs<ExtArgs>;
};
export type MasterObjectSchemaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    masterObject?: boolean | Prisma.MasterObjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.MasterObjectSchema$createdByArgs<ExtArgs>;
};
export type $MasterObjectSchemaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MasterObjectSchema";
    objects: {
        masterObject: Prisma.$MasterObjectPayload<ExtArgs>;
        createdBy: Prisma.$UserPayload<ExtArgs> | null;
        fieldDefinitions: Prisma.$FieldDefinitionPayload<ExtArgs>[];
        masterRecords: Prisma.$MasterRecordPayload<ExtArgs>[];
        schemaChanges: Prisma.$SchemaChangePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        masterObjectId: string;
        version: number;
        status: $Enums.SchemaStatus;
        layout: runtime.JsonValue;
        checksum: string;
        createdById: string | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["masterObjectSchema"]>;
    composites: {};
};
export type MasterObjectSchemaGetPayload<S extends boolean | null | undefined | MasterObjectSchemaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload, S>;
export type MasterObjectSchemaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MasterObjectSchemaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MasterObjectSchemaCountAggregateInputType | true;
};
export interface MasterObjectSchemaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MasterObjectSchema'];
        meta: {
            name: 'MasterObjectSchema';
        };
    };
    /**
     * Find zero or one MasterObjectSchema that matches the filter.
     * @param {MasterObjectSchemaFindUniqueArgs} args - Arguments to find a MasterObjectSchema
     * @example
     * // Get one MasterObjectSchema
     * const masterObjectSchema = await prisma.masterObjectSchema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterObjectSchemaFindUniqueArgs>(args: Prisma.SelectSubset<T, MasterObjectSchemaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MasterObjectSchema that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MasterObjectSchemaFindUniqueOrThrowArgs} args - Arguments to find a MasterObjectSchema
     * @example
     * // Get one MasterObjectSchema
     * const masterObjectSchema = await prisma.masterObjectSchema.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterObjectSchemaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MasterObjectSchemaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MasterObjectSchema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterObjectSchemaFindFirstArgs} args - Arguments to find a MasterObjectSchema
     * @example
     * // Get one MasterObjectSchema
     * const masterObjectSchema = await prisma.masterObjectSchema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterObjectSchemaFindFirstArgs>(args?: Prisma.SelectSubset<T, MasterObjectSchemaFindFirstArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MasterObjectSchema that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterObjectSchemaFindFirstOrThrowArgs} args - Arguments to find a MasterObjectSchema
     * @example
     * // Get one MasterObjectSchema
     * const masterObjectSchema = await prisma.masterObjectSchema.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterObjectSchemaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MasterObjectSchemaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MasterObjectSchemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterObjectSchemaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasterObjectSchemas
     * const masterObjectSchemas = await prisma.masterObjectSchema.findMany()
     *
     * // Get first 10 MasterObjectSchemas
     * const masterObjectSchemas = await prisma.masterObjectSchema.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const masterObjectSchemaWithIdOnly = await prisma.masterObjectSchema.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MasterObjectSchemaFindManyArgs>(args?: Prisma.SelectSubset<T, MasterObjectSchemaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MasterObjectSchema.
     * @param {MasterObjectSchemaCreateArgs} args - Arguments to create a MasterObjectSchema.
     * @example
     * // Create one MasterObjectSchema
     * const MasterObjectSchema = await prisma.masterObjectSchema.create({
     *   data: {
     *     // ... data to create a MasterObjectSchema
     *   }
     * })
     *
     */
    create<T extends MasterObjectSchemaCreateArgs>(args: Prisma.SelectSubset<T, MasterObjectSchemaCreateArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MasterObjectSchemas.
     * @param {MasterObjectSchemaCreateManyArgs} args - Arguments to create many MasterObjectSchemas.
     * @example
     * // Create many MasterObjectSchemas
     * const masterObjectSchema = await prisma.masterObjectSchema.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MasterObjectSchemaCreateManyArgs>(args?: Prisma.SelectSubset<T, MasterObjectSchemaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MasterObjectSchemas and returns the data saved in the database.
     * @param {MasterObjectSchemaCreateManyAndReturnArgs} args - Arguments to create many MasterObjectSchemas.
     * @example
     * // Create many MasterObjectSchemas
     * const masterObjectSchema = await prisma.masterObjectSchema.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MasterObjectSchemas and only return the `id`
     * const masterObjectSchemaWithIdOnly = await prisma.masterObjectSchema.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MasterObjectSchemaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MasterObjectSchemaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MasterObjectSchema.
     * @param {MasterObjectSchemaDeleteArgs} args - Arguments to delete one MasterObjectSchema.
     * @example
     * // Delete one MasterObjectSchema
     * const MasterObjectSchema = await prisma.masterObjectSchema.delete({
     *   where: {
     *     // ... filter to delete one MasterObjectSchema
     *   }
     * })
     *
     */
    delete<T extends MasterObjectSchemaDeleteArgs>(args: Prisma.SelectSubset<T, MasterObjectSchemaDeleteArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MasterObjectSchema.
     * @param {MasterObjectSchemaUpdateArgs} args - Arguments to update one MasterObjectSchema.
     * @example
     * // Update one MasterObjectSchema
     * const masterObjectSchema = await prisma.masterObjectSchema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MasterObjectSchemaUpdateArgs>(args: Prisma.SelectSubset<T, MasterObjectSchemaUpdateArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MasterObjectSchemas.
     * @param {MasterObjectSchemaDeleteManyArgs} args - Arguments to filter MasterObjectSchemas to delete.
     * @example
     * // Delete a few MasterObjectSchemas
     * const { count } = await prisma.masterObjectSchema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MasterObjectSchemaDeleteManyArgs>(args?: Prisma.SelectSubset<T, MasterObjectSchemaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MasterObjectSchemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterObjectSchemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasterObjectSchemas
     * const masterObjectSchema = await prisma.masterObjectSchema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MasterObjectSchemaUpdateManyArgs>(args: Prisma.SelectSubset<T, MasterObjectSchemaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MasterObjectSchemas and returns the data updated in the database.
     * @param {MasterObjectSchemaUpdateManyAndReturnArgs} args - Arguments to update many MasterObjectSchemas.
     * @example
     * // Update many MasterObjectSchemas
     * const masterObjectSchema = await prisma.masterObjectSchema.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MasterObjectSchemas and only return the `id`
     * const masterObjectSchemaWithIdOnly = await prisma.masterObjectSchema.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MasterObjectSchemaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MasterObjectSchemaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MasterObjectSchema.
     * @param {MasterObjectSchemaUpsertArgs} args - Arguments to update or create a MasterObjectSchema.
     * @example
     * // Update or create a MasterObjectSchema
     * const masterObjectSchema = await prisma.masterObjectSchema.upsert({
     *   create: {
     *     // ... data to create a MasterObjectSchema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasterObjectSchema we want to update
     *   }
     * })
     */
    upsert<T extends MasterObjectSchemaUpsertArgs>(args: Prisma.SelectSubset<T, MasterObjectSchemaUpsertArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MasterObjectSchemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterObjectSchemaCountArgs} args - Arguments to filter MasterObjectSchemas to count.
     * @example
     * // Count the number of MasterObjectSchemas
     * const count = await prisma.masterObjectSchema.count({
     *   where: {
     *     // ... the filter for the MasterObjectSchemas we want to count
     *   }
     * })
    **/
    count<T extends MasterObjectSchemaCountArgs>(args?: Prisma.Subset<T, MasterObjectSchemaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MasterObjectSchemaCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MasterObjectSchema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterObjectSchemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MasterObjectSchemaAggregateArgs>(args: Prisma.Subset<T, MasterObjectSchemaAggregateArgs>): Prisma.PrismaPromise<GetMasterObjectSchemaAggregateType<T>>;
    /**
     * Group by MasterObjectSchema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterObjectSchemaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends MasterObjectSchemaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MasterObjectSchemaGroupByArgs['orderBy'];
    } : {
        orderBy?: MasterObjectSchemaGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MasterObjectSchemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterObjectSchemaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MasterObjectSchema model
     */
    readonly fields: MasterObjectSchemaFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MasterObjectSchema.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MasterObjectSchemaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    masterObject<T extends Prisma.MasterObjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MasterObjectDefaultArgs<ExtArgs>>): Prisma.Prisma__MasterObjectClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.MasterObjectSchema$createdByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MasterObjectSchema$createdByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    fieldDefinitions<T extends Prisma.MasterObjectSchema$fieldDefinitionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MasterObjectSchema$fieldDefinitionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FieldDefinitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    masterRecords<T extends Prisma.MasterObjectSchema$masterRecordsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MasterObjectSchema$masterRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MasterRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    schemaChanges<T extends Prisma.MasterObjectSchema$schemaChangesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MasterObjectSchema$schemaChangesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the MasterObjectSchema model
 */
export interface MasterObjectSchemaFieldRefs {
    readonly id: Prisma.FieldRef<"MasterObjectSchema", 'String'>;
    readonly masterObjectId: Prisma.FieldRef<"MasterObjectSchema", 'String'>;
    readonly version: Prisma.FieldRef<"MasterObjectSchema", 'Int'>;
    readonly status: Prisma.FieldRef<"MasterObjectSchema", 'SchemaStatus'>;
    readonly layout: Prisma.FieldRef<"MasterObjectSchema", 'Json'>;
    readonly checksum: Prisma.FieldRef<"MasterObjectSchema", 'String'>;
    readonly createdById: Prisma.FieldRef<"MasterObjectSchema", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"MasterObjectSchema", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"MasterObjectSchema", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MasterObjectSchema", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"MasterObjectSchema", 'DateTime'>;
}
/**
 * MasterObjectSchema findUnique
 */
export type MasterObjectSchemaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * Filter, which MasterObjectSchema to fetch.
     */
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
};
/**
 * MasterObjectSchema findUniqueOrThrow
 */
export type MasterObjectSchemaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * Filter, which MasterObjectSchema to fetch.
     */
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
};
/**
 * MasterObjectSchema findFirst
 */
export type MasterObjectSchemaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * Filter, which MasterObjectSchema to fetch.
     */
    where?: Prisma.MasterObjectSchemaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MasterObjectSchemas to fetch.
     */
    orderBy?: Prisma.MasterObjectSchemaOrderByWithRelationInput | Prisma.MasterObjectSchemaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MasterObjectSchemas.
     */
    cursor?: Prisma.MasterObjectSchemaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MasterObjectSchemas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MasterObjectSchemas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MasterObjectSchemas.
     */
    distinct?: Prisma.MasterObjectSchemaScalarFieldEnum | Prisma.MasterObjectSchemaScalarFieldEnum[];
};
/**
 * MasterObjectSchema findFirstOrThrow
 */
export type MasterObjectSchemaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * Filter, which MasterObjectSchema to fetch.
     */
    where?: Prisma.MasterObjectSchemaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MasterObjectSchemas to fetch.
     */
    orderBy?: Prisma.MasterObjectSchemaOrderByWithRelationInput | Prisma.MasterObjectSchemaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MasterObjectSchemas.
     */
    cursor?: Prisma.MasterObjectSchemaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MasterObjectSchemas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MasterObjectSchemas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MasterObjectSchemas.
     */
    distinct?: Prisma.MasterObjectSchemaScalarFieldEnum | Prisma.MasterObjectSchemaScalarFieldEnum[];
};
/**
 * MasterObjectSchema findMany
 */
export type MasterObjectSchemaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * Filter, which MasterObjectSchemas to fetch.
     */
    where?: Prisma.MasterObjectSchemaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MasterObjectSchemas to fetch.
     */
    orderBy?: Prisma.MasterObjectSchemaOrderByWithRelationInput | Prisma.MasterObjectSchemaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MasterObjectSchemas.
     */
    cursor?: Prisma.MasterObjectSchemaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MasterObjectSchemas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MasterObjectSchemas.
     */
    skip?: number;
    distinct?: Prisma.MasterObjectSchemaScalarFieldEnum | Prisma.MasterObjectSchemaScalarFieldEnum[];
};
/**
 * MasterObjectSchema create
 */
export type MasterObjectSchemaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * The data needed to create a MasterObjectSchema.
     */
    data: Prisma.XOR<Prisma.MasterObjectSchemaCreateInput, Prisma.MasterObjectSchemaUncheckedCreateInput>;
};
/**
 * MasterObjectSchema createMany
 */
export type MasterObjectSchemaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MasterObjectSchemas.
     */
    data: Prisma.MasterObjectSchemaCreateManyInput | Prisma.MasterObjectSchemaCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MasterObjectSchema createManyAndReturn
 */
export type MasterObjectSchemaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * The data used to create many MasterObjectSchemas.
     */
    data: Prisma.MasterObjectSchemaCreateManyInput | Prisma.MasterObjectSchemaCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MasterObjectSchema update
 */
export type MasterObjectSchemaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * The data needed to update a MasterObjectSchema.
     */
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateInput, Prisma.MasterObjectSchemaUncheckedUpdateInput>;
    /**
     * Choose, which MasterObjectSchema to update.
     */
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
};
/**
 * MasterObjectSchema updateMany
 */
export type MasterObjectSchemaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MasterObjectSchemas.
     */
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateManyMutationInput, Prisma.MasterObjectSchemaUncheckedUpdateManyInput>;
    /**
     * Filter which MasterObjectSchemas to update
     */
    where?: Prisma.MasterObjectSchemaWhereInput;
    /**
     * Limit how many MasterObjectSchemas to update.
     */
    limit?: number;
};
/**
 * MasterObjectSchema updateManyAndReturn
 */
export type MasterObjectSchemaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * The data used to update MasterObjectSchemas.
     */
    data: Prisma.XOR<Prisma.MasterObjectSchemaUpdateManyMutationInput, Prisma.MasterObjectSchemaUncheckedUpdateManyInput>;
    /**
     * Filter which MasterObjectSchemas to update
     */
    where?: Prisma.MasterObjectSchemaWhereInput;
    /**
     * Limit how many MasterObjectSchemas to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MasterObjectSchema upsert
 */
export type MasterObjectSchemaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * The filter to search for the MasterObjectSchema to update in case it exists.
     */
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
    /**
     * In case the MasterObjectSchema found by the `where` argument doesn't exist, create a new MasterObjectSchema with this data.
     */
    create: Prisma.XOR<Prisma.MasterObjectSchemaCreateInput, Prisma.MasterObjectSchemaUncheckedCreateInput>;
    /**
     * In case the MasterObjectSchema was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MasterObjectSchemaUpdateInput, Prisma.MasterObjectSchemaUncheckedUpdateInput>;
};
/**
 * MasterObjectSchema delete
 */
export type MasterObjectSchemaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
    /**
     * Filter which MasterObjectSchema to delete.
     */
    where: Prisma.MasterObjectSchemaWhereUniqueInput;
};
/**
 * MasterObjectSchema deleteMany
 */
export type MasterObjectSchemaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MasterObjectSchemas to delete
     */
    where?: Prisma.MasterObjectSchemaWhereInput;
    /**
     * Limit how many MasterObjectSchemas to delete.
     */
    limit?: number;
};
/**
 * MasterObjectSchema.createdBy
 */
export type MasterObjectSchema$createdByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * MasterObjectSchema.fieldDefinitions
 */
export type MasterObjectSchema$fieldDefinitionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDefinition
     */
    select?: Prisma.FieldDefinitionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldDefinition
     */
    omit?: Prisma.FieldDefinitionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldDefinitionInclude<ExtArgs> | null;
    where?: Prisma.FieldDefinitionWhereInput;
    orderBy?: Prisma.FieldDefinitionOrderByWithRelationInput | Prisma.FieldDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.FieldDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FieldDefinitionScalarFieldEnum | Prisma.FieldDefinitionScalarFieldEnum[];
};
/**
 * MasterObjectSchema.masterRecords
 */
export type MasterObjectSchema$masterRecordsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterRecord
     */
    select?: Prisma.MasterRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterRecord
     */
    omit?: Prisma.MasterRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterRecordInclude<ExtArgs> | null;
    where?: Prisma.MasterRecordWhereInput;
    orderBy?: Prisma.MasterRecordOrderByWithRelationInput | Prisma.MasterRecordOrderByWithRelationInput[];
    cursor?: Prisma.MasterRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MasterRecordScalarFieldEnum | Prisma.MasterRecordScalarFieldEnum[];
};
/**
 * MasterObjectSchema.schemaChanges
 */
export type MasterObjectSchema$schemaChangesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemaChange
     */
    select?: Prisma.SchemaChangeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchemaChange
     */
    omit?: Prisma.SchemaChangeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SchemaChangeInclude<ExtArgs> | null;
    where?: Prisma.SchemaChangeWhereInput;
    orderBy?: Prisma.SchemaChangeOrderByWithRelationInput | Prisma.SchemaChangeOrderByWithRelationInput[];
    cursor?: Prisma.SchemaChangeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SchemaChangeScalarFieldEnum | Prisma.SchemaChangeScalarFieldEnum[];
};
/**
 * MasterObjectSchema without action
 */
export type MasterObjectSchemaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterObjectSchema
     */
    select?: Prisma.MasterObjectSchemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MasterObjectSchema
     */
    omit?: Prisma.MasterObjectSchemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MasterObjectSchemaInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MasterObjectSchema.d.ts.map