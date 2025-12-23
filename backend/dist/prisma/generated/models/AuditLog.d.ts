import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model AuditLog
 *
 */
export type AuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$AuditLogPayload>;
export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type AuditLogMinAggregateOutputType = {
    id: string | null;
    masterRecordId: string | null;
    userId: string | null;
    entity: $Enums.AuditEntity | null;
    action: $Enums.AuditAction | null;
    comment: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    performedBy: $Enums.PerformedByType | null;
    createdAt: Date | null;
};
export type AuditLogMaxAggregateOutputType = {
    id: string | null;
    masterRecordId: string | null;
    userId: string | null;
    entity: $Enums.AuditEntity | null;
    action: $Enums.AuditAction | null;
    comment: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    performedBy: $Enums.PerformedByType | null;
    createdAt: Date | null;
};
export type AuditLogCountAggregateOutputType = {
    id: number;
    masterRecordId: number;
    userId: number;
    entity: number;
    action: number;
    comment: number;
    step: number;
    before: number;
    after: number;
    ipAddress: number;
    userAgent: number;
    performedBy: number;
    createdAt: number;
    _all: number;
};
export type AuditLogMinAggregateInputType = {
    id?: true;
    masterRecordId?: true;
    userId?: true;
    entity?: true;
    action?: true;
    comment?: true;
    ipAddress?: true;
    userAgent?: true;
    performedBy?: true;
    createdAt?: true;
};
export type AuditLogMaxAggregateInputType = {
    id?: true;
    masterRecordId?: true;
    userId?: true;
    entity?: true;
    action?: true;
    comment?: true;
    ipAddress?: true;
    userAgent?: true;
    performedBy?: true;
    createdAt?: true;
};
export type AuditLogCountAggregateInputType = {
    id?: true;
    masterRecordId?: true;
    userId?: true;
    entity?: true;
    action?: true;
    comment?: true;
    step?: true;
    before?: true;
    after?: true;
    ipAddress?: true;
    userAgent?: true;
    performedBy?: true;
    createdAt?: true;
    _all?: true;
};
export type AuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: Prisma.AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType;
};
export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateAuditLog[P]>;
};
export type AuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithAggregationInput | Prisma.AuditLogOrderByWithAggregationInput[];
    by: Prisma.AuditLogScalarFieldEnum[] | Prisma.AuditLogScalarFieldEnum;
    having?: Prisma.AuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditLogCountAggregateInputType | true;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type AuditLogGroupByOutputType = {
    id: string;
    masterRecordId: string | null;
    userId: string | null;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment: string | null;
    step: runtime.JsonValue | null;
    before: runtime.JsonValue | null;
    after: runtime.JsonValue | null;
    ipAddress: string | null;
    userAgent: string | null;
    performedBy: $Enums.PerformedByType;
    createdAt: Date;
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]>;
}>>;
export type AuditLogWhereInput = {
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    id?: Prisma.StringFilter<"AuditLog"> | string;
    masterRecordId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    entity?: Prisma.EnumAuditEntityFilter<"AuditLog"> | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction;
    comment?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    step?: Prisma.JsonNullableFilter<"AuditLog">;
    before?: Prisma.JsonNullableFilter<"AuditLog">;
    after?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFilter<"AuditLog"> | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    masterRecord?: Prisma.XOR<Prisma.MasterRecordNullableScalarRelationFilter, Prisma.MasterRecordWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type AuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    masterRecordId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    step?: Prisma.SortOrderInput | Prisma.SortOrder;
    before?: Prisma.SortOrderInput | Prisma.SortOrder;
    after?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    masterRecord?: Prisma.MasterRecordOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    masterRecordId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    entity?: Prisma.EnumAuditEntityFilter<"AuditLog"> | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction;
    comment?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    step?: Prisma.JsonNullableFilter<"AuditLog">;
    before?: Prisma.JsonNullableFilter<"AuditLog">;
    after?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFilter<"AuditLog"> | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    masterRecord?: Prisma.XOR<Prisma.MasterRecordNullableScalarRelationFilter, Prisma.MasterRecordWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type AuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    masterRecordId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    step?: Prisma.SortOrderInput | Prisma.SortOrder;
    before?: Prisma.SortOrderInput | Prisma.SortOrder;
    after?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AuditLogCountOrderByAggregateInput;
    _max?: Prisma.AuditLogMaxOrderByAggregateInput;
    _min?: Prisma.AuditLogMinOrderByAggregateInput;
};
export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    masterRecordId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    userId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    entity?: Prisma.EnumAuditEntityWithAggregatesFilter<"AuditLog"> | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionWithAggregatesFilter<"AuditLog"> | $Enums.AuditAction;
    comment?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    step?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    before?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    after?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    performedBy?: Prisma.EnumPerformedByTypeWithAggregatesFilter<"AuditLog"> | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AuditLog"> | Date | string;
};
export type AuditLogCreateInput = {
    id?: string;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
    masterRecord?: Prisma.MasterRecordCreateNestedOneWithoutAuditLogsInput;
    user?: Prisma.UserCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateInput = {
    id?: string;
    masterRecordId?: string | null;
    userId?: string | null;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
};
export type AuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    masterRecord?: Prisma.MasterRecordUpdateOneWithoutAuditLogsNestedInput;
    user?: Prisma.UserUpdateOneWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogCreateManyInput = {
    id?: string;
    masterRecordId?: string | null;
    userId?: string | null;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
};
export type AuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogListRelationFilter = {
    every?: Prisma.AuditLogWhereInput;
    some?: Prisma.AuditLogWhereInput;
    none?: Prisma.AuditLogWhereInput;
};
export type AuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    masterRecordId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    step?: Prisma.SortOrder;
    before?: Prisma.SortOrder;
    after?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    masterRecordId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    masterRecordId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput> | Prisma.AuditLogCreateWithoutUserInput[] | Prisma.AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutUserInput | Prisma.AuditLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuditLogCreateManyUserInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput> | Prisma.AuditLogCreateWithoutUserInput[] | Prisma.AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutUserInput | Prisma.AuditLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuditLogCreateManyUserInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput> | Prisma.AuditLogCreateWithoutUserInput[] | Prisma.AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutUserInput | Prisma.AuditLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuditLogCreateManyUserInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutUserInput | Prisma.AuditLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput> | Prisma.AuditLogCreateWithoutUserInput[] | Prisma.AuditLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutUserInput | Prisma.AuditLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuditLogCreateManyUserInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutUserInput | Prisma.AuditLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogCreateNestedManyWithoutMasterRecordInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutMasterRecordInput, Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput> | Prisma.AuditLogCreateWithoutMasterRecordInput[] | Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutMasterRecordInput | Prisma.AuditLogCreateOrConnectWithoutMasterRecordInput[];
    createMany?: Prisma.AuditLogCreateManyMasterRecordInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUncheckedCreateNestedManyWithoutMasterRecordInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutMasterRecordInput, Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput> | Prisma.AuditLogCreateWithoutMasterRecordInput[] | Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutMasterRecordInput | Prisma.AuditLogCreateOrConnectWithoutMasterRecordInput[];
    createMany?: Prisma.AuditLogCreateManyMasterRecordInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUpdateManyWithoutMasterRecordNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutMasterRecordInput, Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput> | Prisma.AuditLogCreateWithoutMasterRecordInput[] | Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutMasterRecordInput | Prisma.AuditLogCreateOrConnectWithoutMasterRecordInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutMasterRecordInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutMasterRecordInput[];
    createMany?: Prisma.AuditLogCreateManyMasterRecordInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutMasterRecordInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutMasterRecordInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutMasterRecordInput | Prisma.AuditLogUpdateManyWithWhereWithoutMasterRecordInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogUncheckedUpdateManyWithoutMasterRecordNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutMasterRecordInput, Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput> | Prisma.AuditLogCreateWithoutMasterRecordInput[] | Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutMasterRecordInput | Prisma.AuditLogCreateOrConnectWithoutMasterRecordInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutMasterRecordInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutMasterRecordInput[];
    createMany?: Prisma.AuditLogCreateManyMasterRecordInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutMasterRecordInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutMasterRecordInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutMasterRecordInput | Prisma.AuditLogUpdateManyWithWhereWithoutMasterRecordInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type EnumAuditEntityFieldUpdateOperationsInput = {
    set?: $Enums.AuditEntity;
};
export type EnumAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.AuditAction;
};
export type EnumPerformedByTypeFieldUpdateOperationsInput = {
    set?: $Enums.PerformedByType;
};
export type AuditLogCreateWithoutUserInput = {
    id?: string;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
    masterRecord?: Prisma.MasterRecordCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string;
    masterRecordId?: string | null;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
};
export type AuditLogCreateOrConnectWithoutUserInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput>;
};
export type AuditLogCreateManyUserInputEnvelope = {
    data: Prisma.AuditLogCreateManyUserInput | Prisma.AuditLogCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditLogUpdateWithoutUserInput, Prisma.AuditLogUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutUserInput, Prisma.AuditLogUncheckedCreateWithoutUserInput>;
};
export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateWithoutUserInput, Prisma.AuditLogUncheckedUpdateWithoutUserInput>;
};
export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyWithoutUserInput>;
};
export type AuditLogScalarWhereInput = {
    AND?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    OR?: Prisma.AuditLogScalarWhereInput[];
    NOT?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"AuditLog"> | string;
    masterRecordId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    entity?: Prisma.EnumAuditEntityFilter<"AuditLog"> | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction;
    comment?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    step?: Prisma.JsonNullableFilter<"AuditLog">;
    before?: Prisma.JsonNullableFilter<"AuditLog">;
    after?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFilter<"AuditLog"> | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
};
export type AuditLogCreateWithoutMasterRecordInput = {
    id?: string;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateWithoutMasterRecordInput = {
    id?: string;
    userId?: string | null;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
};
export type AuditLogCreateOrConnectWithoutMasterRecordInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutMasterRecordInput, Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput>;
};
export type AuditLogCreateManyMasterRecordInputEnvelope = {
    data: Prisma.AuditLogCreateManyMasterRecordInput | Prisma.AuditLogCreateManyMasterRecordInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpsertWithWhereUniqueWithoutMasterRecordInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditLogUpdateWithoutMasterRecordInput, Prisma.AuditLogUncheckedUpdateWithoutMasterRecordInput>;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutMasterRecordInput, Prisma.AuditLogUncheckedCreateWithoutMasterRecordInput>;
};
export type AuditLogUpdateWithWhereUniqueWithoutMasterRecordInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateWithoutMasterRecordInput, Prisma.AuditLogUncheckedUpdateWithoutMasterRecordInput>;
};
export type AuditLogUpdateManyWithWhereWithoutMasterRecordInput = {
    where: Prisma.AuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyWithoutMasterRecordInput>;
};
export type AuditLogCreateManyUserInput = {
    id?: string;
    masterRecordId?: string | null;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
};
export type AuditLogUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    masterRecord?: Prisma.MasterRecordUpdateOneWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    masterRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogCreateManyMasterRecordInput = {
    id?: string;
    userId?: string | null;
    entity: $Enums.AuditEntity;
    action: $Enums.AuditAction;
    comment?: string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    performedBy?: $Enums.PerformedByType;
    createdAt?: Date | string;
};
export type AuditLogUpdateWithoutMasterRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateWithoutMasterRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateManyWithoutMasterRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity;
    action?: Prisma.EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    step?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EnumPerformedByTypeFieldUpdateOperationsInput | $Enums.PerformedByType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    masterRecordId?: boolean;
    userId?: boolean;
    entity?: boolean;
    action?: boolean;
    comment?: boolean;
    step?: boolean;
    before?: boolean;
    after?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    performedBy?: boolean;
    createdAt?: boolean;
    masterRecord?: boolean | Prisma.AuditLog$masterRecordArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    masterRecordId?: boolean;
    userId?: boolean;
    entity?: boolean;
    action?: boolean;
    comment?: boolean;
    step?: boolean;
    before?: boolean;
    after?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    performedBy?: boolean;
    createdAt?: boolean;
    masterRecord?: boolean | Prisma.AuditLog$masterRecordArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    masterRecordId?: boolean;
    userId?: boolean;
    entity?: boolean;
    action?: boolean;
    comment?: boolean;
    step?: boolean;
    before?: boolean;
    after?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    performedBy?: boolean;
    createdAt?: boolean;
    masterRecord?: boolean | Prisma.AuditLog$masterRecordArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectScalar = {
    id?: boolean;
    masterRecordId?: boolean;
    userId?: boolean;
    entity?: boolean;
    action?: boolean;
    comment?: boolean;
    step?: boolean;
    before?: boolean;
    after?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    performedBy?: boolean;
    createdAt?: boolean;
};
export type AuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "masterRecordId" | "userId" | "entity" | "action" | "comment" | "step" | "before" | "after" | "ipAddress" | "userAgent" | "performedBy" | "createdAt", ExtArgs["result"]["auditLog"]>;
export type AuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    masterRecord?: boolean | Prisma.AuditLog$masterRecordArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
};
export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    masterRecord?: boolean | Prisma.AuditLog$masterRecordArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
};
export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    masterRecord?: boolean | Prisma.AuditLog$masterRecordArgs<ExtArgs>;
    user?: boolean | Prisma.AuditLog$userArgs<ExtArgs>;
};
export type $AuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuditLog";
    objects: {
        masterRecord: Prisma.$MasterRecordPayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        masterRecordId: string | null;
        userId: string | null;
        entity: $Enums.AuditEntity;
        action: $Enums.AuditAction;
        comment: string | null;
        step: runtime.JsonValue | null;
        before: runtime.JsonValue | null;
        after: runtime.JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
        performedBy: $Enums.PerformedByType;
        createdAt: Date;
    }, ExtArgs["result"]["auditLog"]>;
    composites: {};
};
export type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuditLogPayload, S>;
export type AuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuditLogCountAggregateInputType | true;
};
export interface AuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'];
        meta: {
            name: 'AuditLog';
        };
    };
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     *
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     *
     */
    create<T extends AuditLogCreateArgs>(args: Prisma.SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     *
     */
    delete<T extends AuditLogDeleteArgs>(args: Prisma.SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AuditLogUpdateArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: Prisma.SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(args?: Prisma.Subset<T, AuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuditLogCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Prisma.Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>;
    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: AuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AuditLog model
     */
    readonly fields: AuditLogFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AuditLog.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    masterRecord<T extends Prisma.AuditLog$masterRecordArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AuditLog$masterRecordArgs<ExtArgs>>): Prisma.Prisma__MasterRecordClient<runtime.Types.Result.GetResult<Prisma.$MasterRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.AuditLog$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AuditLog$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the AuditLog model
 */
export interface AuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly masterRecordId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly userId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly entity: Prisma.FieldRef<"AuditLog", 'AuditEntity'>;
    readonly action: Prisma.FieldRef<"AuditLog", 'AuditAction'>;
    readonly comment: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly step: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly before: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly after: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly ipAddress: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly userAgent: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly performedBy: Prisma.FieldRef<"AuditLog", 'PerformedByType'>;
    readonly createdAt: Prisma.FieldRef<"AuditLog", 'DateTime'>;
}
/**
 * AuditLog findUnique
 */
export type AuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where: Prisma.AuditLogWhereUniqueInput;
};
/**
 * AuditLog findUniqueOrThrow
 */
export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where: Prisma.AuditLogWhereUniqueInput;
};
/**
 * AuditLog findFirst
 */
export type AuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: Prisma.AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AuditLogs.
     */
    cursor?: Prisma.AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
/**
 * AuditLog findFirstOrThrow
 */
export type AuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: Prisma.AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AuditLogs.
     */
    cursor?: Prisma.AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
/**
 * AuditLog findMany
 */
export type AuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: Prisma.AuditLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AuditLogs.
     */
    cursor?: Prisma.AuditLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuditLogs.
     */
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
/**
 * AuditLog create
 */
export type AuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * The data needed to create a AuditLog.
     */
    data: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
};
/**
 * AuditLog createMany
 */
export type AuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: Prisma.AuditLogCreateManyInput | Prisma.AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AuditLog createManyAndReturn
 */
export type AuditLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * The data used to create many AuditLogs.
     */
    data: Prisma.AuditLogCreateManyInput | Prisma.AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * AuditLog update
 */
export type AuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * The data needed to update a AuditLog.
     */
    data: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
    /**
     * Choose, which AuditLog to update.
     */
    where: Prisma.AuditLogWhereUniqueInput;
};
/**
 * AuditLog updateMany
 */
export type AuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyInput>;
    /**
     * Filter which AuditLogs to update
     */
    where?: Prisma.AuditLogWhereInput;
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number;
};
/**
 * AuditLog updateManyAndReturn
 */
export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * The data used to update AuditLogs.
     */
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyInput>;
    /**
     * Filter which AuditLogs to update
     */
    where?: Prisma.AuditLogWhereInput;
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * AuditLog upsert
 */
export type AuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: Prisma.AuditLogWhereUniqueInput;
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
};
/**
 * AuditLog delete
 */
export type AuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    /**
     * Filter which AuditLog to delete.
     */
    where: Prisma.AuditLogWhereUniqueInput;
};
/**
 * AuditLog deleteMany
 */
export type AuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: Prisma.AuditLogWhereInput;
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number;
};
/**
 * AuditLog.masterRecord
 */
export type AuditLog$masterRecordArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * AuditLog.user
 */
export type AuditLog$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * AuditLog without action
 */
export type AuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=AuditLog.d.ts.map