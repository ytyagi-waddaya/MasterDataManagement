import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model FieldPermission
 *
 */
export type FieldPermissionModel = runtime.Types.Result.DefaultSelection<Prisma.$FieldPermissionPayload>;
export type AggregateFieldPermission = {
    _count: FieldPermissionCountAggregateOutputType | null;
    _min: FieldPermissionMinAggregateOutputType | null;
    _max: FieldPermissionMaxAggregateOutputType | null;
};
export type FieldPermissionMinAggregateOutputType = {
    id: string | null;
    fieldId: string | null;
    roleId: string | null;
    userId: string | null;
    canRead: boolean | null;
    canWrite: boolean | null;
    createdAt: Date | null;
    deletedAt: Date | null;
};
export type FieldPermissionMaxAggregateOutputType = {
    id: string | null;
    fieldId: string | null;
    roleId: string | null;
    userId: string | null;
    canRead: boolean | null;
    canWrite: boolean | null;
    createdAt: Date | null;
    deletedAt: Date | null;
};
export type FieldPermissionCountAggregateOutputType = {
    id: number;
    fieldId: number;
    roleId: number;
    userId: number;
    canRead: number;
    canWrite: number;
    condition: number;
    createdAt: number;
    deletedAt: number;
    _all: number;
};
export type FieldPermissionMinAggregateInputType = {
    id?: true;
    fieldId?: true;
    roleId?: true;
    userId?: true;
    canRead?: true;
    canWrite?: true;
    createdAt?: true;
    deletedAt?: true;
};
export type FieldPermissionMaxAggregateInputType = {
    id?: true;
    fieldId?: true;
    roleId?: true;
    userId?: true;
    canRead?: true;
    canWrite?: true;
    createdAt?: true;
    deletedAt?: true;
};
export type FieldPermissionCountAggregateInputType = {
    id?: true;
    fieldId?: true;
    roleId?: true;
    userId?: true;
    canRead?: true;
    canWrite?: true;
    condition?: true;
    createdAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type FieldPermissionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FieldPermission to aggregate.
     */
    where?: Prisma.FieldPermissionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FieldPermissions to fetch.
     */
    orderBy?: Prisma.FieldPermissionOrderByWithRelationInput | Prisma.FieldPermissionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FieldPermissionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FieldPermissions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FieldPermissions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FieldPermissions
    **/
    _count?: true | FieldPermissionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FieldPermissionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FieldPermissionMaxAggregateInputType;
};
export type GetFieldPermissionAggregateType<T extends FieldPermissionAggregateArgs> = {
    [P in keyof T & keyof AggregateFieldPermission]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFieldPermission[P]> : Prisma.GetScalarType<T[P], AggregateFieldPermission[P]>;
};
export type FieldPermissionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FieldPermissionWhereInput;
    orderBy?: Prisma.FieldPermissionOrderByWithAggregationInput | Prisma.FieldPermissionOrderByWithAggregationInput[];
    by: Prisma.FieldPermissionScalarFieldEnum[] | Prisma.FieldPermissionScalarFieldEnum;
    having?: Prisma.FieldPermissionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FieldPermissionCountAggregateInputType | true;
    _min?: FieldPermissionMinAggregateInputType;
    _max?: FieldPermissionMaxAggregateInputType;
};
export type FieldPermissionGroupByOutputType = {
    id: string;
    fieldId: string;
    roleId: string | null;
    userId: string | null;
    canRead: boolean;
    canWrite: boolean;
    condition: runtime.JsonValue | null;
    createdAt: Date;
    deletedAt: Date | null;
    _count: FieldPermissionCountAggregateOutputType | null;
    _min: FieldPermissionMinAggregateOutputType | null;
    _max: FieldPermissionMaxAggregateOutputType | null;
};
type GetFieldPermissionGroupByPayload<T extends FieldPermissionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FieldPermissionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FieldPermissionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FieldPermissionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FieldPermissionGroupByOutputType[P]>;
}>>;
export type FieldPermissionWhereInput = {
    AND?: Prisma.FieldPermissionWhereInput | Prisma.FieldPermissionWhereInput[];
    OR?: Prisma.FieldPermissionWhereInput[];
    NOT?: Prisma.FieldPermissionWhereInput | Prisma.FieldPermissionWhereInput[];
    id?: Prisma.StringFilter<"FieldPermission"> | string;
    fieldId?: Prisma.StringFilter<"FieldPermission"> | string;
    roleId?: Prisma.StringNullableFilter<"FieldPermission"> | string | null;
    userId?: Prisma.StringNullableFilter<"FieldPermission"> | string | null;
    canRead?: Prisma.BoolFilter<"FieldPermission"> | boolean;
    canWrite?: Prisma.BoolFilter<"FieldPermission"> | boolean;
    condition?: Prisma.JsonNullableFilter<"FieldPermission">;
    createdAt?: Prisma.DateTimeFilter<"FieldPermission"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"FieldPermission"> | Date | string | null;
    field?: Prisma.XOR<Prisma.FieldDefinitionScalarRelationFilter, Prisma.FieldDefinitionWhereInput>;
    role?: Prisma.XOR<Prisma.RoleNullableScalarRelationFilter, Prisma.RoleWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type FieldPermissionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    canRead?: Prisma.SortOrder;
    canWrite?: Prisma.SortOrder;
    condition?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    field?: Prisma.FieldDefinitionOrderByWithRelationInput;
    role?: Prisma.RoleOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type FieldPermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fieldId_roleId_userId?: Prisma.FieldPermissionFieldIdRoleIdUserIdCompoundUniqueInput;
    AND?: Prisma.FieldPermissionWhereInput | Prisma.FieldPermissionWhereInput[];
    OR?: Prisma.FieldPermissionWhereInput[];
    NOT?: Prisma.FieldPermissionWhereInput | Prisma.FieldPermissionWhereInput[];
    fieldId?: Prisma.StringFilter<"FieldPermission"> | string;
    roleId?: Prisma.StringNullableFilter<"FieldPermission"> | string | null;
    userId?: Prisma.StringNullableFilter<"FieldPermission"> | string | null;
    canRead?: Prisma.BoolFilter<"FieldPermission"> | boolean;
    canWrite?: Prisma.BoolFilter<"FieldPermission"> | boolean;
    condition?: Prisma.JsonNullableFilter<"FieldPermission">;
    createdAt?: Prisma.DateTimeFilter<"FieldPermission"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"FieldPermission"> | Date | string | null;
    field?: Prisma.XOR<Prisma.FieldDefinitionScalarRelationFilter, Prisma.FieldDefinitionWhereInput>;
    role?: Prisma.XOR<Prisma.RoleNullableScalarRelationFilter, Prisma.RoleWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "fieldId_roleId_userId">;
export type FieldPermissionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    canRead?: Prisma.SortOrder;
    canWrite?: Prisma.SortOrder;
    condition?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.FieldPermissionCountOrderByAggregateInput;
    _max?: Prisma.FieldPermissionMaxOrderByAggregateInput;
    _min?: Prisma.FieldPermissionMinOrderByAggregateInput;
};
export type FieldPermissionScalarWhereWithAggregatesInput = {
    AND?: Prisma.FieldPermissionScalarWhereWithAggregatesInput | Prisma.FieldPermissionScalarWhereWithAggregatesInput[];
    OR?: Prisma.FieldPermissionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FieldPermissionScalarWhereWithAggregatesInput | Prisma.FieldPermissionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FieldPermission"> | string;
    fieldId?: Prisma.StringWithAggregatesFilter<"FieldPermission"> | string;
    roleId?: Prisma.StringNullableWithAggregatesFilter<"FieldPermission"> | string | null;
    userId?: Prisma.StringNullableWithAggregatesFilter<"FieldPermission"> | string | null;
    canRead?: Prisma.BoolWithAggregatesFilter<"FieldPermission"> | boolean;
    canWrite?: Prisma.BoolWithAggregatesFilter<"FieldPermission"> | boolean;
    condition?: Prisma.JsonNullableWithAggregatesFilter<"FieldPermission">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FieldPermission"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FieldPermission"> | Date | string | null;
};
export type FieldPermissionCreateInput = {
    id?: string;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    field: Prisma.FieldDefinitionCreateNestedOneWithoutFieldPermissionsInput;
    role?: Prisma.RoleCreateNestedOneWithoutFieldPermissionsInput;
    user?: Prisma.UserCreateNestedOneWithoutFieldPermissionsInput;
};
export type FieldPermissionUncheckedCreateInput = {
    id?: string;
    fieldId: string;
    roleId?: string | null;
    userId?: string | null;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldPermissionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    field?: Prisma.FieldDefinitionUpdateOneRequiredWithoutFieldPermissionsNestedInput;
    role?: Prisma.RoleUpdateOneWithoutFieldPermissionsNestedInput;
    user?: Prisma.UserUpdateOneWithoutFieldPermissionsNestedInput;
};
export type FieldPermissionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fieldId?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionCreateManyInput = {
    id?: string;
    fieldId: string;
    roleId?: string | null;
    userId?: string | null;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldPermissionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fieldId?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionListRelationFilter = {
    every?: Prisma.FieldPermissionWhereInput;
    some?: Prisma.FieldPermissionWhereInput;
    none?: Prisma.FieldPermissionWhereInput;
};
export type FieldPermissionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FieldPermissionFieldIdRoleIdUserIdCompoundUniqueInput = {
    fieldId: string;
    roleId: string;
    userId: string;
};
export type FieldPermissionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    canRead?: Prisma.SortOrder;
    canWrite?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type FieldPermissionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    canRead?: Prisma.SortOrder;
    canWrite?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type FieldPermissionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    canRead?: Prisma.SortOrder;
    canWrite?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type FieldPermissionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutUserInput, Prisma.FieldPermissionUncheckedCreateWithoutUserInput> | Prisma.FieldPermissionCreateWithoutUserInput[] | Prisma.FieldPermissionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutUserInput | Prisma.FieldPermissionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FieldPermissionCreateManyUserInputEnvelope;
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
};
export type FieldPermissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutUserInput, Prisma.FieldPermissionUncheckedCreateWithoutUserInput> | Prisma.FieldPermissionCreateWithoutUserInput[] | Prisma.FieldPermissionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutUserInput | Prisma.FieldPermissionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FieldPermissionCreateManyUserInputEnvelope;
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
};
export type FieldPermissionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutUserInput, Prisma.FieldPermissionUncheckedCreateWithoutUserInput> | Prisma.FieldPermissionCreateWithoutUserInput[] | Prisma.FieldPermissionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutUserInput | Prisma.FieldPermissionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FieldPermissionUpsertWithWhereUniqueWithoutUserInput | Prisma.FieldPermissionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FieldPermissionCreateManyUserInputEnvelope;
    set?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    disconnect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    delete?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    update?: Prisma.FieldPermissionUpdateWithWhereUniqueWithoutUserInput | Prisma.FieldPermissionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FieldPermissionUpdateManyWithWhereWithoutUserInput | Prisma.FieldPermissionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FieldPermissionScalarWhereInput | Prisma.FieldPermissionScalarWhereInput[];
};
export type FieldPermissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutUserInput, Prisma.FieldPermissionUncheckedCreateWithoutUserInput> | Prisma.FieldPermissionCreateWithoutUserInput[] | Prisma.FieldPermissionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutUserInput | Prisma.FieldPermissionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FieldPermissionUpsertWithWhereUniqueWithoutUserInput | Prisma.FieldPermissionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FieldPermissionCreateManyUserInputEnvelope;
    set?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    disconnect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    delete?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    update?: Prisma.FieldPermissionUpdateWithWhereUniqueWithoutUserInput | Prisma.FieldPermissionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FieldPermissionUpdateManyWithWhereWithoutUserInput | Prisma.FieldPermissionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FieldPermissionScalarWhereInput | Prisma.FieldPermissionScalarWhereInput[];
};
export type FieldPermissionCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutRoleInput, Prisma.FieldPermissionUncheckedCreateWithoutRoleInput> | Prisma.FieldPermissionCreateWithoutRoleInput[] | Prisma.FieldPermissionUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutRoleInput | Prisma.FieldPermissionCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.FieldPermissionCreateManyRoleInputEnvelope;
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
};
export type FieldPermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutRoleInput, Prisma.FieldPermissionUncheckedCreateWithoutRoleInput> | Prisma.FieldPermissionCreateWithoutRoleInput[] | Prisma.FieldPermissionUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutRoleInput | Prisma.FieldPermissionCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.FieldPermissionCreateManyRoleInputEnvelope;
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
};
export type FieldPermissionUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutRoleInput, Prisma.FieldPermissionUncheckedCreateWithoutRoleInput> | Prisma.FieldPermissionCreateWithoutRoleInput[] | Prisma.FieldPermissionUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutRoleInput | Prisma.FieldPermissionCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.FieldPermissionUpsertWithWhereUniqueWithoutRoleInput | Prisma.FieldPermissionUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.FieldPermissionCreateManyRoleInputEnvelope;
    set?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    disconnect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    delete?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    update?: Prisma.FieldPermissionUpdateWithWhereUniqueWithoutRoleInput | Prisma.FieldPermissionUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.FieldPermissionUpdateManyWithWhereWithoutRoleInput | Prisma.FieldPermissionUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.FieldPermissionScalarWhereInput | Prisma.FieldPermissionScalarWhereInput[];
};
export type FieldPermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutRoleInput, Prisma.FieldPermissionUncheckedCreateWithoutRoleInput> | Prisma.FieldPermissionCreateWithoutRoleInput[] | Prisma.FieldPermissionUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutRoleInput | Prisma.FieldPermissionCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.FieldPermissionUpsertWithWhereUniqueWithoutRoleInput | Prisma.FieldPermissionUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.FieldPermissionCreateManyRoleInputEnvelope;
    set?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    disconnect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    delete?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    update?: Prisma.FieldPermissionUpdateWithWhereUniqueWithoutRoleInput | Prisma.FieldPermissionUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.FieldPermissionUpdateManyWithWhereWithoutRoleInput | Prisma.FieldPermissionUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.FieldPermissionScalarWhereInput | Prisma.FieldPermissionScalarWhereInput[];
};
export type FieldPermissionCreateNestedManyWithoutFieldInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutFieldInput, Prisma.FieldPermissionUncheckedCreateWithoutFieldInput> | Prisma.FieldPermissionCreateWithoutFieldInput[] | Prisma.FieldPermissionUncheckedCreateWithoutFieldInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutFieldInput | Prisma.FieldPermissionCreateOrConnectWithoutFieldInput[];
    createMany?: Prisma.FieldPermissionCreateManyFieldInputEnvelope;
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
};
export type FieldPermissionUncheckedCreateNestedManyWithoutFieldInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutFieldInput, Prisma.FieldPermissionUncheckedCreateWithoutFieldInput> | Prisma.FieldPermissionCreateWithoutFieldInput[] | Prisma.FieldPermissionUncheckedCreateWithoutFieldInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutFieldInput | Prisma.FieldPermissionCreateOrConnectWithoutFieldInput[];
    createMany?: Prisma.FieldPermissionCreateManyFieldInputEnvelope;
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
};
export type FieldPermissionUpdateManyWithoutFieldNestedInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutFieldInput, Prisma.FieldPermissionUncheckedCreateWithoutFieldInput> | Prisma.FieldPermissionCreateWithoutFieldInput[] | Prisma.FieldPermissionUncheckedCreateWithoutFieldInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutFieldInput | Prisma.FieldPermissionCreateOrConnectWithoutFieldInput[];
    upsert?: Prisma.FieldPermissionUpsertWithWhereUniqueWithoutFieldInput | Prisma.FieldPermissionUpsertWithWhereUniqueWithoutFieldInput[];
    createMany?: Prisma.FieldPermissionCreateManyFieldInputEnvelope;
    set?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    disconnect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    delete?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    update?: Prisma.FieldPermissionUpdateWithWhereUniqueWithoutFieldInput | Prisma.FieldPermissionUpdateWithWhereUniqueWithoutFieldInput[];
    updateMany?: Prisma.FieldPermissionUpdateManyWithWhereWithoutFieldInput | Prisma.FieldPermissionUpdateManyWithWhereWithoutFieldInput[];
    deleteMany?: Prisma.FieldPermissionScalarWhereInput | Prisma.FieldPermissionScalarWhereInput[];
};
export type FieldPermissionUncheckedUpdateManyWithoutFieldNestedInput = {
    create?: Prisma.XOR<Prisma.FieldPermissionCreateWithoutFieldInput, Prisma.FieldPermissionUncheckedCreateWithoutFieldInput> | Prisma.FieldPermissionCreateWithoutFieldInput[] | Prisma.FieldPermissionUncheckedCreateWithoutFieldInput[];
    connectOrCreate?: Prisma.FieldPermissionCreateOrConnectWithoutFieldInput | Prisma.FieldPermissionCreateOrConnectWithoutFieldInput[];
    upsert?: Prisma.FieldPermissionUpsertWithWhereUniqueWithoutFieldInput | Prisma.FieldPermissionUpsertWithWhereUniqueWithoutFieldInput[];
    createMany?: Prisma.FieldPermissionCreateManyFieldInputEnvelope;
    set?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    disconnect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    delete?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    connect?: Prisma.FieldPermissionWhereUniqueInput | Prisma.FieldPermissionWhereUniqueInput[];
    update?: Prisma.FieldPermissionUpdateWithWhereUniqueWithoutFieldInput | Prisma.FieldPermissionUpdateWithWhereUniqueWithoutFieldInput[];
    updateMany?: Prisma.FieldPermissionUpdateManyWithWhereWithoutFieldInput | Prisma.FieldPermissionUpdateManyWithWhereWithoutFieldInput[];
    deleteMany?: Prisma.FieldPermissionScalarWhereInput | Prisma.FieldPermissionScalarWhereInput[];
};
export type FieldPermissionCreateWithoutUserInput = {
    id?: string;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    field: Prisma.FieldDefinitionCreateNestedOneWithoutFieldPermissionsInput;
    role?: Prisma.RoleCreateNestedOneWithoutFieldPermissionsInput;
};
export type FieldPermissionUncheckedCreateWithoutUserInput = {
    id?: string;
    fieldId: string;
    roleId?: string | null;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldPermissionCreateOrConnectWithoutUserInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FieldPermissionCreateWithoutUserInput, Prisma.FieldPermissionUncheckedCreateWithoutUserInput>;
};
export type FieldPermissionCreateManyUserInputEnvelope = {
    data: Prisma.FieldPermissionCreateManyUserInput | Prisma.FieldPermissionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FieldPermissionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.FieldPermissionUpdateWithoutUserInput, Prisma.FieldPermissionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FieldPermissionCreateWithoutUserInput, Prisma.FieldPermissionUncheckedCreateWithoutUserInput>;
};
export type FieldPermissionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.FieldPermissionUpdateWithoutUserInput, Prisma.FieldPermissionUncheckedUpdateWithoutUserInput>;
};
export type FieldPermissionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FieldPermissionScalarWhereInput;
    data: Prisma.XOR<Prisma.FieldPermissionUpdateManyMutationInput, Prisma.FieldPermissionUncheckedUpdateManyWithoutUserInput>;
};
export type FieldPermissionScalarWhereInput = {
    AND?: Prisma.FieldPermissionScalarWhereInput | Prisma.FieldPermissionScalarWhereInput[];
    OR?: Prisma.FieldPermissionScalarWhereInput[];
    NOT?: Prisma.FieldPermissionScalarWhereInput | Prisma.FieldPermissionScalarWhereInput[];
    id?: Prisma.StringFilter<"FieldPermission"> | string;
    fieldId?: Prisma.StringFilter<"FieldPermission"> | string;
    roleId?: Prisma.StringNullableFilter<"FieldPermission"> | string | null;
    userId?: Prisma.StringNullableFilter<"FieldPermission"> | string | null;
    canRead?: Prisma.BoolFilter<"FieldPermission"> | boolean;
    canWrite?: Prisma.BoolFilter<"FieldPermission"> | boolean;
    condition?: Prisma.JsonNullableFilter<"FieldPermission">;
    createdAt?: Prisma.DateTimeFilter<"FieldPermission"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"FieldPermission"> | Date | string | null;
};
export type FieldPermissionCreateWithoutRoleInput = {
    id?: string;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    field: Prisma.FieldDefinitionCreateNestedOneWithoutFieldPermissionsInput;
    user?: Prisma.UserCreateNestedOneWithoutFieldPermissionsInput;
};
export type FieldPermissionUncheckedCreateWithoutRoleInput = {
    id?: string;
    fieldId: string;
    userId?: string | null;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldPermissionCreateOrConnectWithoutRoleInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FieldPermissionCreateWithoutRoleInput, Prisma.FieldPermissionUncheckedCreateWithoutRoleInput>;
};
export type FieldPermissionCreateManyRoleInputEnvelope = {
    data: Prisma.FieldPermissionCreateManyRoleInput | Prisma.FieldPermissionCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type FieldPermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.FieldPermissionUpdateWithoutRoleInput, Prisma.FieldPermissionUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.FieldPermissionCreateWithoutRoleInput, Prisma.FieldPermissionUncheckedCreateWithoutRoleInput>;
};
export type FieldPermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.FieldPermissionUpdateWithoutRoleInput, Prisma.FieldPermissionUncheckedUpdateWithoutRoleInput>;
};
export type FieldPermissionUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.FieldPermissionScalarWhereInput;
    data: Prisma.XOR<Prisma.FieldPermissionUpdateManyMutationInput, Prisma.FieldPermissionUncheckedUpdateManyWithoutRoleInput>;
};
export type FieldPermissionCreateWithoutFieldInput = {
    id?: string;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    role?: Prisma.RoleCreateNestedOneWithoutFieldPermissionsInput;
    user?: Prisma.UserCreateNestedOneWithoutFieldPermissionsInput;
};
export type FieldPermissionUncheckedCreateWithoutFieldInput = {
    id?: string;
    roleId?: string | null;
    userId?: string | null;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldPermissionCreateOrConnectWithoutFieldInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FieldPermissionCreateWithoutFieldInput, Prisma.FieldPermissionUncheckedCreateWithoutFieldInput>;
};
export type FieldPermissionCreateManyFieldInputEnvelope = {
    data: Prisma.FieldPermissionCreateManyFieldInput | Prisma.FieldPermissionCreateManyFieldInput[];
    skipDuplicates?: boolean;
};
export type FieldPermissionUpsertWithWhereUniqueWithoutFieldInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.FieldPermissionUpdateWithoutFieldInput, Prisma.FieldPermissionUncheckedUpdateWithoutFieldInput>;
    create: Prisma.XOR<Prisma.FieldPermissionCreateWithoutFieldInput, Prisma.FieldPermissionUncheckedCreateWithoutFieldInput>;
};
export type FieldPermissionUpdateWithWhereUniqueWithoutFieldInput = {
    where: Prisma.FieldPermissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.FieldPermissionUpdateWithoutFieldInput, Prisma.FieldPermissionUncheckedUpdateWithoutFieldInput>;
};
export type FieldPermissionUpdateManyWithWhereWithoutFieldInput = {
    where: Prisma.FieldPermissionScalarWhereInput;
    data: Prisma.XOR<Prisma.FieldPermissionUpdateManyMutationInput, Prisma.FieldPermissionUncheckedUpdateManyWithoutFieldInput>;
};
export type FieldPermissionCreateManyUserInput = {
    id?: string;
    fieldId: string;
    roleId?: string | null;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldPermissionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    field?: Prisma.FieldDefinitionUpdateOneRequiredWithoutFieldPermissionsNestedInput;
    role?: Prisma.RoleUpdateOneWithoutFieldPermissionsNestedInput;
};
export type FieldPermissionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fieldId?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fieldId?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionCreateManyRoleInput = {
    id?: string;
    fieldId: string;
    userId?: string | null;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldPermissionUpdateWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    field?: Prisma.FieldDefinitionUpdateOneRequiredWithoutFieldPermissionsNestedInput;
    user?: Prisma.UserUpdateOneWithoutFieldPermissionsNestedInput;
};
export type FieldPermissionUncheckedUpdateWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fieldId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionUncheckedUpdateManyWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fieldId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionCreateManyFieldInput = {
    id?: string;
    roleId?: string | null;
    userId?: string | null;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldPermissionUpdateWithoutFieldInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.RoleUpdateOneWithoutFieldPermissionsNestedInput;
    user?: Prisma.UserUpdateOneWithoutFieldPermissionsNestedInput;
};
export type FieldPermissionUncheckedUpdateWithoutFieldInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionUncheckedUpdateManyWithoutFieldInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canWrite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    condition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldPermissionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fieldId?: boolean;
    roleId?: boolean;
    userId?: boolean;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.FieldPermission$roleArgs<ExtArgs>;
    user?: boolean | Prisma.FieldPermission$userArgs<ExtArgs>;
}, ExtArgs["result"]["fieldPermission"]>;
export type FieldPermissionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fieldId?: boolean;
    roleId?: boolean;
    userId?: boolean;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.FieldPermission$roleArgs<ExtArgs>;
    user?: boolean | Prisma.FieldPermission$userArgs<ExtArgs>;
}, ExtArgs["result"]["fieldPermission"]>;
export type FieldPermissionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fieldId?: boolean;
    roleId?: boolean;
    userId?: boolean;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.FieldPermission$roleArgs<ExtArgs>;
    user?: boolean | Prisma.FieldPermission$userArgs<ExtArgs>;
}, ExtArgs["result"]["fieldPermission"]>;
export type FieldPermissionSelectScalar = {
    id?: boolean;
    fieldId?: boolean;
    roleId?: boolean;
    userId?: boolean;
    canRead?: boolean;
    canWrite?: boolean;
    condition?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
};
export type FieldPermissionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fieldId" | "roleId" | "userId" | "canRead" | "canWrite" | "condition" | "createdAt" | "deletedAt", ExtArgs["result"]["fieldPermission"]>;
export type FieldPermissionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.FieldPermission$roleArgs<ExtArgs>;
    user?: boolean | Prisma.FieldPermission$userArgs<ExtArgs>;
};
export type FieldPermissionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.FieldPermission$roleArgs<ExtArgs>;
    user?: boolean | Prisma.FieldPermission$userArgs<ExtArgs>;
};
export type FieldPermissionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.FieldPermission$roleArgs<ExtArgs>;
    user?: boolean | Prisma.FieldPermission$userArgs<ExtArgs>;
};
export type $FieldPermissionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FieldPermission";
    objects: {
        field: Prisma.$FieldDefinitionPayload<ExtArgs>;
        role: Prisma.$RolePayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fieldId: string;
        /**
         * RBAC
         */
        roleId: string | null;
        userId: string | null;
        /**
         * Access
         */
        canRead: boolean;
        canWrite: boolean;
        /**
         * ABAC condition (stage, record state, user attributes)
         */
        condition: runtime.JsonValue | null;
        createdAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["fieldPermission"]>;
    composites: {};
};
export type FieldPermissionGetPayload<S extends boolean | null | undefined | FieldPermissionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload, S>;
export type FieldPermissionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FieldPermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FieldPermissionCountAggregateInputType | true;
};
export interface FieldPermissionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FieldPermission'];
        meta: {
            name: 'FieldPermission';
        };
    };
    /**
     * Find zero or one FieldPermission that matches the filter.
     * @param {FieldPermissionFindUniqueArgs} args - Arguments to find a FieldPermission
     * @example
     * // Get one FieldPermission
     * const fieldPermission = await prisma.fieldPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FieldPermissionFindUniqueArgs>(args: Prisma.SelectSubset<T, FieldPermissionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FieldPermissionClient<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FieldPermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FieldPermissionFindUniqueOrThrowArgs} args - Arguments to find a FieldPermission
     * @example
     * // Get one FieldPermission
     * const fieldPermission = await prisma.fieldPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FieldPermissionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FieldPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FieldPermissionClient<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FieldPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldPermissionFindFirstArgs} args - Arguments to find a FieldPermission
     * @example
     * // Get one FieldPermission
     * const fieldPermission = await prisma.fieldPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FieldPermissionFindFirstArgs>(args?: Prisma.SelectSubset<T, FieldPermissionFindFirstArgs<ExtArgs>>): Prisma.Prisma__FieldPermissionClient<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FieldPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldPermissionFindFirstOrThrowArgs} args - Arguments to find a FieldPermission
     * @example
     * // Get one FieldPermission
     * const fieldPermission = await prisma.fieldPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FieldPermissionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FieldPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FieldPermissionClient<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FieldPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FieldPermissions
     * const fieldPermissions = await prisma.fieldPermission.findMany()
     *
     * // Get first 10 FieldPermissions
     * const fieldPermissions = await prisma.fieldPermission.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const fieldPermissionWithIdOnly = await prisma.fieldPermission.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FieldPermissionFindManyArgs>(args?: Prisma.SelectSubset<T, FieldPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FieldPermission.
     * @param {FieldPermissionCreateArgs} args - Arguments to create a FieldPermission.
     * @example
     * // Create one FieldPermission
     * const FieldPermission = await prisma.fieldPermission.create({
     *   data: {
     *     // ... data to create a FieldPermission
     *   }
     * })
     *
     */
    create<T extends FieldPermissionCreateArgs>(args: Prisma.SelectSubset<T, FieldPermissionCreateArgs<ExtArgs>>): Prisma.Prisma__FieldPermissionClient<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FieldPermissions.
     * @param {FieldPermissionCreateManyArgs} args - Arguments to create many FieldPermissions.
     * @example
     * // Create many FieldPermissions
     * const fieldPermission = await prisma.fieldPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FieldPermissionCreateManyArgs>(args?: Prisma.SelectSubset<T, FieldPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FieldPermissions and returns the data saved in the database.
     * @param {FieldPermissionCreateManyAndReturnArgs} args - Arguments to create many FieldPermissions.
     * @example
     * // Create many FieldPermissions
     * const fieldPermission = await prisma.fieldPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FieldPermissions and only return the `id`
     * const fieldPermissionWithIdOnly = await prisma.fieldPermission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FieldPermissionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FieldPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FieldPermission.
     * @param {FieldPermissionDeleteArgs} args - Arguments to delete one FieldPermission.
     * @example
     * // Delete one FieldPermission
     * const FieldPermission = await prisma.fieldPermission.delete({
     *   where: {
     *     // ... filter to delete one FieldPermission
     *   }
     * })
     *
     */
    delete<T extends FieldPermissionDeleteArgs>(args: Prisma.SelectSubset<T, FieldPermissionDeleteArgs<ExtArgs>>): Prisma.Prisma__FieldPermissionClient<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FieldPermission.
     * @param {FieldPermissionUpdateArgs} args - Arguments to update one FieldPermission.
     * @example
     * // Update one FieldPermission
     * const fieldPermission = await prisma.fieldPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FieldPermissionUpdateArgs>(args: Prisma.SelectSubset<T, FieldPermissionUpdateArgs<ExtArgs>>): Prisma.Prisma__FieldPermissionClient<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FieldPermissions.
     * @param {FieldPermissionDeleteManyArgs} args - Arguments to filter FieldPermissions to delete.
     * @example
     * // Delete a few FieldPermissions
     * const { count } = await prisma.fieldPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FieldPermissionDeleteManyArgs>(args?: Prisma.SelectSubset<T, FieldPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FieldPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FieldPermissions
     * const fieldPermission = await prisma.fieldPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FieldPermissionUpdateManyArgs>(args: Prisma.SelectSubset<T, FieldPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FieldPermissions and returns the data updated in the database.
     * @param {FieldPermissionUpdateManyAndReturnArgs} args - Arguments to update many FieldPermissions.
     * @example
     * // Update many FieldPermissions
     * const fieldPermission = await prisma.fieldPermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FieldPermissions and only return the `id`
     * const fieldPermissionWithIdOnly = await prisma.fieldPermission.updateManyAndReturn({
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
    updateManyAndReturn<T extends FieldPermissionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FieldPermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FieldPermission.
     * @param {FieldPermissionUpsertArgs} args - Arguments to update or create a FieldPermission.
     * @example
     * // Update or create a FieldPermission
     * const fieldPermission = await prisma.fieldPermission.upsert({
     *   create: {
     *     // ... data to create a FieldPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FieldPermission we want to update
     *   }
     * })
     */
    upsert<T extends FieldPermissionUpsertArgs>(args: Prisma.SelectSubset<T, FieldPermissionUpsertArgs<ExtArgs>>): Prisma.Prisma__FieldPermissionClient<runtime.Types.Result.GetResult<Prisma.$FieldPermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FieldPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldPermissionCountArgs} args - Arguments to filter FieldPermissions to count.
     * @example
     * // Count the number of FieldPermissions
     * const count = await prisma.fieldPermission.count({
     *   where: {
     *     // ... the filter for the FieldPermissions we want to count
     *   }
     * })
    **/
    count<T extends FieldPermissionCountArgs>(args?: Prisma.Subset<T, FieldPermissionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FieldPermissionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FieldPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FieldPermissionAggregateArgs>(args: Prisma.Subset<T, FieldPermissionAggregateArgs>): Prisma.PrismaPromise<GetFieldPermissionAggregateType<T>>;
    /**
     * Group by FieldPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldPermissionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FieldPermissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FieldPermissionGroupByArgs['orderBy'];
    } : {
        orderBy?: FieldPermissionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FieldPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFieldPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FieldPermission model
     */
    readonly fields: FieldPermissionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FieldPermission.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FieldPermissionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    field<T extends Prisma.FieldDefinitionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FieldDefinitionDefaultArgs<ExtArgs>>): Prisma.Prisma__FieldDefinitionClient<runtime.Types.Result.GetResult<Prisma.$FieldDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    role<T extends Prisma.FieldPermission$roleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FieldPermission$roleArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.FieldPermission$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FieldPermission$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the FieldPermission model
 */
export interface FieldPermissionFieldRefs {
    readonly id: Prisma.FieldRef<"FieldPermission", 'String'>;
    readonly fieldId: Prisma.FieldRef<"FieldPermission", 'String'>;
    readonly roleId: Prisma.FieldRef<"FieldPermission", 'String'>;
    readonly userId: Prisma.FieldRef<"FieldPermission", 'String'>;
    readonly canRead: Prisma.FieldRef<"FieldPermission", 'Boolean'>;
    readonly canWrite: Prisma.FieldRef<"FieldPermission", 'Boolean'>;
    readonly condition: Prisma.FieldRef<"FieldPermission", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"FieldPermission", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"FieldPermission", 'DateTime'>;
}
/**
 * FieldPermission findUnique
 */
export type FieldPermissionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * Filter, which FieldPermission to fetch.
     */
    where: Prisma.FieldPermissionWhereUniqueInput;
};
/**
 * FieldPermission findUniqueOrThrow
 */
export type FieldPermissionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * Filter, which FieldPermission to fetch.
     */
    where: Prisma.FieldPermissionWhereUniqueInput;
};
/**
 * FieldPermission findFirst
 */
export type FieldPermissionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * Filter, which FieldPermission to fetch.
     */
    where?: Prisma.FieldPermissionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FieldPermissions to fetch.
     */
    orderBy?: Prisma.FieldPermissionOrderByWithRelationInput | Prisma.FieldPermissionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FieldPermissions.
     */
    cursor?: Prisma.FieldPermissionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FieldPermissions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FieldPermissions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FieldPermissions.
     */
    distinct?: Prisma.FieldPermissionScalarFieldEnum | Prisma.FieldPermissionScalarFieldEnum[];
};
/**
 * FieldPermission findFirstOrThrow
 */
export type FieldPermissionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * Filter, which FieldPermission to fetch.
     */
    where?: Prisma.FieldPermissionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FieldPermissions to fetch.
     */
    orderBy?: Prisma.FieldPermissionOrderByWithRelationInput | Prisma.FieldPermissionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FieldPermissions.
     */
    cursor?: Prisma.FieldPermissionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FieldPermissions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FieldPermissions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FieldPermissions.
     */
    distinct?: Prisma.FieldPermissionScalarFieldEnum | Prisma.FieldPermissionScalarFieldEnum[];
};
/**
 * FieldPermission findMany
 */
export type FieldPermissionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * Filter, which FieldPermissions to fetch.
     */
    where?: Prisma.FieldPermissionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FieldPermissions to fetch.
     */
    orderBy?: Prisma.FieldPermissionOrderByWithRelationInput | Prisma.FieldPermissionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FieldPermissions.
     */
    cursor?: Prisma.FieldPermissionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FieldPermissions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FieldPermissions.
     */
    skip?: number;
    distinct?: Prisma.FieldPermissionScalarFieldEnum | Prisma.FieldPermissionScalarFieldEnum[];
};
/**
 * FieldPermission create
 */
export type FieldPermissionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * The data needed to create a FieldPermission.
     */
    data: Prisma.XOR<Prisma.FieldPermissionCreateInput, Prisma.FieldPermissionUncheckedCreateInput>;
};
/**
 * FieldPermission createMany
 */
export type FieldPermissionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FieldPermissions.
     */
    data: Prisma.FieldPermissionCreateManyInput | Prisma.FieldPermissionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FieldPermission createManyAndReturn
 */
export type FieldPermissionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * The data used to create many FieldPermissions.
     */
    data: Prisma.FieldPermissionCreateManyInput | Prisma.FieldPermissionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FieldPermission update
 */
export type FieldPermissionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * The data needed to update a FieldPermission.
     */
    data: Prisma.XOR<Prisma.FieldPermissionUpdateInput, Prisma.FieldPermissionUncheckedUpdateInput>;
    /**
     * Choose, which FieldPermission to update.
     */
    where: Prisma.FieldPermissionWhereUniqueInput;
};
/**
 * FieldPermission updateMany
 */
export type FieldPermissionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FieldPermissions.
     */
    data: Prisma.XOR<Prisma.FieldPermissionUpdateManyMutationInput, Prisma.FieldPermissionUncheckedUpdateManyInput>;
    /**
     * Filter which FieldPermissions to update
     */
    where?: Prisma.FieldPermissionWhereInput;
    /**
     * Limit how many FieldPermissions to update.
     */
    limit?: number;
};
/**
 * FieldPermission updateManyAndReturn
 */
export type FieldPermissionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * The data used to update FieldPermissions.
     */
    data: Prisma.XOR<Prisma.FieldPermissionUpdateManyMutationInput, Prisma.FieldPermissionUncheckedUpdateManyInput>;
    /**
     * Filter which FieldPermissions to update
     */
    where?: Prisma.FieldPermissionWhereInput;
    /**
     * Limit how many FieldPermissions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FieldPermission upsert
 */
export type FieldPermissionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * The filter to search for the FieldPermission to update in case it exists.
     */
    where: Prisma.FieldPermissionWhereUniqueInput;
    /**
     * In case the FieldPermission found by the `where` argument doesn't exist, create a new FieldPermission with this data.
     */
    create: Prisma.XOR<Prisma.FieldPermissionCreateInput, Prisma.FieldPermissionUncheckedCreateInput>;
    /**
     * In case the FieldPermission was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FieldPermissionUpdateInput, Prisma.FieldPermissionUncheckedUpdateInput>;
};
/**
 * FieldPermission delete
 */
export type FieldPermissionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
    /**
     * Filter which FieldPermission to delete.
     */
    where: Prisma.FieldPermissionWhereUniqueInput;
};
/**
 * FieldPermission deleteMany
 */
export type FieldPermissionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FieldPermissions to delete
     */
    where?: Prisma.FieldPermissionWhereInput;
    /**
     * Limit how many FieldPermissions to delete.
     */
    limit?: number;
};
/**
 * FieldPermission.role
 */
export type FieldPermission$roleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: Prisma.RoleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Role
     */
    omit?: Prisma.RoleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleInclude<ExtArgs> | null;
    where?: Prisma.RoleWhereInput;
};
/**
 * FieldPermission.user
 */
export type FieldPermission$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * FieldPermission without action
 */
export type FieldPermissionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldPermission
     */
    select?: Prisma.FieldPermissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldPermission
     */
    omit?: Prisma.FieldPermissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldPermissionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FieldPermission.d.ts.map