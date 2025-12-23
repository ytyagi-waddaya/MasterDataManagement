import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model SchemaChange
 *
 */
export type SchemaChangeModel = runtime.Types.Result.DefaultSelection<Prisma.$SchemaChangePayload>;
export type AggregateSchemaChange = {
    _count: SchemaChangeCountAggregateOutputType | null;
    _min: SchemaChangeMinAggregateOutputType | null;
    _max: SchemaChangeMaxAggregateOutputType | null;
};
export type SchemaChangeMinAggregateOutputType = {
    id: string | null;
    schemaId: string | null;
    type: $Enums.SchemaChangeType | null;
    createdAt: Date | null;
    deletedAt: Date | null;
};
export type SchemaChangeMaxAggregateOutputType = {
    id: string | null;
    schemaId: string | null;
    type: $Enums.SchemaChangeType | null;
    createdAt: Date | null;
    deletedAt: Date | null;
};
export type SchemaChangeCountAggregateOutputType = {
    id: number;
    schemaId: number;
    type: number;
    payload: number;
    createdAt: number;
    deletedAt: number;
    _all: number;
};
export type SchemaChangeMinAggregateInputType = {
    id?: true;
    schemaId?: true;
    type?: true;
    createdAt?: true;
    deletedAt?: true;
};
export type SchemaChangeMaxAggregateInputType = {
    id?: true;
    schemaId?: true;
    type?: true;
    createdAt?: true;
    deletedAt?: true;
};
export type SchemaChangeCountAggregateInputType = {
    id?: true;
    schemaId?: true;
    type?: true;
    payload?: true;
    createdAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type SchemaChangeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SchemaChange to aggregate.
     */
    where?: Prisma.SchemaChangeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SchemaChanges to fetch.
     */
    orderBy?: Prisma.SchemaChangeOrderByWithRelationInput | Prisma.SchemaChangeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SchemaChangeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SchemaChanges from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SchemaChanges.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SchemaChanges
    **/
    _count?: true | SchemaChangeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SchemaChangeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SchemaChangeMaxAggregateInputType;
};
export type GetSchemaChangeAggregateType<T extends SchemaChangeAggregateArgs> = {
    [P in keyof T & keyof AggregateSchemaChange]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSchemaChange[P]> : Prisma.GetScalarType<T[P], AggregateSchemaChange[P]>;
};
export type SchemaChangeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SchemaChangeWhereInput;
    orderBy?: Prisma.SchemaChangeOrderByWithAggregationInput | Prisma.SchemaChangeOrderByWithAggregationInput[];
    by: Prisma.SchemaChangeScalarFieldEnum[] | Prisma.SchemaChangeScalarFieldEnum;
    having?: Prisma.SchemaChangeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SchemaChangeCountAggregateInputType | true;
    _min?: SchemaChangeMinAggregateInputType;
    _max?: SchemaChangeMaxAggregateInputType;
};
export type SchemaChangeGroupByOutputType = {
    id: string;
    schemaId: string;
    type: $Enums.SchemaChangeType;
    payload: runtime.JsonValue;
    createdAt: Date;
    deletedAt: Date | null;
    _count: SchemaChangeCountAggregateOutputType | null;
    _min: SchemaChangeMinAggregateOutputType | null;
    _max: SchemaChangeMaxAggregateOutputType | null;
};
type GetSchemaChangeGroupByPayload<T extends SchemaChangeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SchemaChangeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SchemaChangeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SchemaChangeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SchemaChangeGroupByOutputType[P]>;
}>>;
export type SchemaChangeWhereInput = {
    AND?: Prisma.SchemaChangeWhereInput | Prisma.SchemaChangeWhereInput[];
    OR?: Prisma.SchemaChangeWhereInput[];
    NOT?: Prisma.SchemaChangeWhereInput | Prisma.SchemaChangeWhereInput[];
    id?: Prisma.StringFilter<"SchemaChange"> | string;
    schemaId?: Prisma.StringFilter<"SchemaChange"> | string;
    type?: Prisma.EnumSchemaChangeTypeFilter<"SchemaChange"> | $Enums.SchemaChangeType;
    payload?: Prisma.JsonFilter<"SchemaChange">;
    createdAt?: Prisma.DateTimeFilter<"SchemaChange"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"SchemaChange"> | Date | string | null;
    schema?: Prisma.XOR<Prisma.MasterObjectSchemaScalarRelationFilter, Prisma.MasterObjectSchemaWhereInput>;
};
export type SchemaChangeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    schemaId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    schema?: Prisma.MasterObjectSchemaOrderByWithRelationInput;
};
export type SchemaChangeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SchemaChangeWhereInput | Prisma.SchemaChangeWhereInput[];
    OR?: Prisma.SchemaChangeWhereInput[];
    NOT?: Prisma.SchemaChangeWhereInput | Prisma.SchemaChangeWhereInput[];
    schemaId?: Prisma.StringFilter<"SchemaChange"> | string;
    type?: Prisma.EnumSchemaChangeTypeFilter<"SchemaChange"> | $Enums.SchemaChangeType;
    payload?: Prisma.JsonFilter<"SchemaChange">;
    createdAt?: Prisma.DateTimeFilter<"SchemaChange"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"SchemaChange"> | Date | string | null;
    schema?: Prisma.XOR<Prisma.MasterObjectSchemaScalarRelationFilter, Prisma.MasterObjectSchemaWhereInput>;
}, "id">;
export type SchemaChangeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    schemaId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SchemaChangeCountOrderByAggregateInput;
    _max?: Prisma.SchemaChangeMaxOrderByAggregateInput;
    _min?: Prisma.SchemaChangeMinOrderByAggregateInput;
};
export type SchemaChangeScalarWhereWithAggregatesInput = {
    AND?: Prisma.SchemaChangeScalarWhereWithAggregatesInput | Prisma.SchemaChangeScalarWhereWithAggregatesInput[];
    OR?: Prisma.SchemaChangeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SchemaChangeScalarWhereWithAggregatesInput | Prisma.SchemaChangeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SchemaChange"> | string;
    schemaId?: Prisma.StringWithAggregatesFilter<"SchemaChange"> | string;
    type?: Prisma.EnumSchemaChangeTypeWithAggregatesFilter<"SchemaChange"> | $Enums.SchemaChangeType;
    payload?: Prisma.JsonWithAggregatesFilter<"SchemaChange">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SchemaChange"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"SchemaChange"> | Date | string | null;
};
export type SchemaChangeCreateInput = {
    id?: string;
    type: $Enums.SchemaChangeType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    schema: Prisma.MasterObjectSchemaCreateNestedOneWithoutSchemaChangesInput;
};
export type SchemaChangeUncheckedCreateInput = {
    id?: string;
    schemaId: string;
    type: $Enums.SchemaChangeType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type SchemaChangeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSchemaChangeTypeFieldUpdateOperationsInput | $Enums.SchemaChangeType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    schema?: Prisma.MasterObjectSchemaUpdateOneRequiredWithoutSchemaChangesNestedInput;
};
export type SchemaChangeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    schemaId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSchemaChangeTypeFieldUpdateOperationsInput | $Enums.SchemaChangeType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SchemaChangeCreateManyInput = {
    id?: string;
    schemaId: string;
    type: $Enums.SchemaChangeType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type SchemaChangeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSchemaChangeTypeFieldUpdateOperationsInput | $Enums.SchemaChangeType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SchemaChangeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    schemaId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSchemaChangeTypeFieldUpdateOperationsInput | $Enums.SchemaChangeType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SchemaChangeListRelationFilter = {
    every?: Prisma.SchemaChangeWhereInput;
    some?: Prisma.SchemaChangeWhereInput;
    none?: Prisma.SchemaChangeWhereInput;
};
export type SchemaChangeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SchemaChangeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    schemaId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type SchemaChangeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    schemaId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type SchemaChangeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    schemaId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type SchemaChangeCreateNestedManyWithoutSchemaInput = {
    create?: Prisma.XOR<Prisma.SchemaChangeCreateWithoutSchemaInput, Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput> | Prisma.SchemaChangeCreateWithoutSchemaInput[] | Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput[];
    connectOrCreate?: Prisma.SchemaChangeCreateOrConnectWithoutSchemaInput | Prisma.SchemaChangeCreateOrConnectWithoutSchemaInput[];
    createMany?: Prisma.SchemaChangeCreateManySchemaInputEnvelope;
    connect?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
};
export type SchemaChangeUncheckedCreateNestedManyWithoutSchemaInput = {
    create?: Prisma.XOR<Prisma.SchemaChangeCreateWithoutSchemaInput, Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput> | Prisma.SchemaChangeCreateWithoutSchemaInput[] | Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput[];
    connectOrCreate?: Prisma.SchemaChangeCreateOrConnectWithoutSchemaInput | Prisma.SchemaChangeCreateOrConnectWithoutSchemaInput[];
    createMany?: Prisma.SchemaChangeCreateManySchemaInputEnvelope;
    connect?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
};
export type SchemaChangeUpdateManyWithoutSchemaNestedInput = {
    create?: Prisma.XOR<Prisma.SchemaChangeCreateWithoutSchemaInput, Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput> | Prisma.SchemaChangeCreateWithoutSchemaInput[] | Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput[];
    connectOrCreate?: Prisma.SchemaChangeCreateOrConnectWithoutSchemaInput | Prisma.SchemaChangeCreateOrConnectWithoutSchemaInput[];
    upsert?: Prisma.SchemaChangeUpsertWithWhereUniqueWithoutSchemaInput | Prisma.SchemaChangeUpsertWithWhereUniqueWithoutSchemaInput[];
    createMany?: Prisma.SchemaChangeCreateManySchemaInputEnvelope;
    set?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
    disconnect?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
    delete?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
    connect?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
    update?: Prisma.SchemaChangeUpdateWithWhereUniqueWithoutSchemaInput | Prisma.SchemaChangeUpdateWithWhereUniqueWithoutSchemaInput[];
    updateMany?: Prisma.SchemaChangeUpdateManyWithWhereWithoutSchemaInput | Prisma.SchemaChangeUpdateManyWithWhereWithoutSchemaInput[];
    deleteMany?: Prisma.SchemaChangeScalarWhereInput | Prisma.SchemaChangeScalarWhereInput[];
};
export type SchemaChangeUncheckedUpdateManyWithoutSchemaNestedInput = {
    create?: Prisma.XOR<Prisma.SchemaChangeCreateWithoutSchemaInput, Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput> | Prisma.SchemaChangeCreateWithoutSchemaInput[] | Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput[];
    connectOrCreate?: Prisma.SchemaChangeCreateOrConnectWithoutSchemaInput | Prisma.SchemaChangeCreateOrConnectWithoutSchemaInput[];
    upsert?: Prisma.SchemaChangeUpsertWithWhereUniqueWithoutSchemaInput | Prisma.SchemaChangeUpsertWithWhereUniqueWithoutSchemaInput[];
    createMany?: Prisma.SchemaChangeCreateManySchemaInputEnvelope;
    set?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
    disconnect?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
    delete?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
    connect?: Prisma.SchemaChangeWhereUniqueInput | Prisma.SchemaChangeWhereUniqueInput[];
    update?: Prisma.SchemaChangeUpdateWithWhereUniqueWithoutSchemaInput | Prisma.SchemaChangeUpdateWithWhereUniqueWithoutSchemaInput[];
    updateMany?: Prisma.SchemaChangeUpdateManyWithWhereWithoutSchemaInput | Prisma.SchemaChangeUpdateManyWithWhereWithoutSchemaInput[];
    deleteMany?: Prisma.SchemaChangeScalarWhereInput | Prisma.SchemaChangeScalarWhereInput[];
};
export type EnumSchemaChangeTypeFieldUpdateOperationsInput = {
    set?: $Enums.SchemaChangeType;
};
export type SchemaChangeCreateWithoutSchemaInput = {
    id?: string;
    type: $Enums.SchemaChangeType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type SchemaChangeUncheckedCreateWithoutSchemaInput = {
    id?: string;
    type: $Enums.SchemaChangeType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type SchemaChangeCreateOrConnectWithoutSchemaInput = {
    where: Prisma.SchemaChangeWhereUniqueInput;
    create: Prisma.XOR<Prisma.SchemaChangeCreateWithoutSchemaInput, Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput>;
};
export type SchemaChangeCreateManySchemaInputEnvelope = {
    data: Prisma.SchemaChangeCreateManySchemaInput | Prisma.SchemaChangeCreateManySchemaInput[];
    skipDuplicates?: boolean;
};
export type SchemaChangeUpsertWithWhereUniqueWithoutSchemaInput = {
    where: Prisma.SchemaChangeWhereUniqueInput;
    update: Prisma.XOR<Prisma.SchemaChangeUpdateWithoutSchemaInput, Prisma.SchemaChangeUncheckedUpdateWithoutSchemaInput>;
    create: Prisma.XOR<Prisma.SchemaChangeCreateWithoutSchemaInput, Prisma.SchemaChangeUncheckedCreateWithoutSchemaInput>;
};
export type SchemaChangeUpdateWithWhereUniqueWithoutSchemaInput = {
    where: Prisma.SchemaChangeWhereUniqueInput;
    data: Prisma.XOR<Prisma.SchemaChangeUpdateWithoutSchemaInput, Prisma.SchemaChangeUncheckedUpdateWithoutSchemaInput>;
};
export type SchemaChangeUpdateManyWithWhereWithoutSchemaInput = {
    where: Prisma.SchemaChangeScalarWhereInput;
    data: Prisma.XOR<Prisma.SchemaChangeUpdateManyMutationInput, Prisma.SchemaChangeUncheckedUpdateManyWithoutSchemaInput>;
};
export type SchemaChangeScalarWhereInput = {
    AND?: Prisma.SchemaChangeScalarWhereInput | Prisma.SchemaChangeScalarWhereInput[];
    OR?: Prisma.SchemaChangeScalarWhereInput[];
    NOT?: Prisma.SchemaChangeScalarWhereInput | Prisma.SchemaChangeScalarWhereInput[];
    id?: Prisma.StringFilter<"SchemaChange"> | string;
    schemaId?: Prisma.StringFilter<"SchemaChange"> | string;
    type?: Prisma.EnumSchemaChangeTypeFilter<"SchemaChange"> | $Enums.SchemaChangeType;
    payload?: Prisma.JsonFilter<"SchemaChange">;
    createdAt?: Prisma.DateTimeFilter<"SchemaChange"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"SchemaChange"> | Date | string | null;
};
export type SchemaChangeCreateManySchemaInput = {
    id?: string;
    type: $Enums.SchemaChangeType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type SchemaChangeUpdateWithoutSchemaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSchemaChangeTypeFieldUpdateOperationsInput | $Enums.SchemaChangeType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SchemaChangeUncheckedUpdateWithoutSchemaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSchemaChangeTypeFieldUpdateOperationsInput | $Enums.SchemaChangeType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SchemaChangeUncheckedUpdateManyWithoutSchemaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSchemaChangeTypeFieldUpdateOperationsInput | $Enums.SchemaChangeType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SchemaChangeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    schemaId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    schema?: boolean | Prisma.MasterObjectSchemaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["schemaChange"]>;
export type SchemaChangeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    schemaId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    schema?: boolean | Prisma.MasterObjectSchemaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["schemaChange"]>;
export type SchemaChangeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    schemaId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    schema?: boolean | Prisma.MasterObjectSchemaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["schemaChange"]>;
export type SchemaChangeSelectScalar = {
    id?: boolean;
    schemaId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
};
export type SchemaChangeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "schemaId" | "type" | "payload" | "createdAt" | "deletedAt", ExtArgs["result"]["schemaChange"]>;
export type SchemaChangeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    schema?: boolean | Prisma.MasterObjectSchemaDefaultArgs<ExtArgs>;
};
export type SchemaChangeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    schema?: boolean | Prisma.MasterObjectSchemaDefaultArgs<ExtArgs>;
};
export type SchemaChangeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    schema?: boolean | Prisma.MasterObjectSchemaDefaultArgs<ExtArgs>;
};
export type $SchemaChangePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SchemaChange";
    objects: {
        schema: Prisma.$MasterObjectSchemaPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        schemaId: string;
        type: $Enums.SchemaChangeType;
        payload: runtime.JsonValue;
        createdAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["schemaChange"]>;
    composites: {};
};
export type SchemaChangeGetPayload<S extends boolean | null | undefined | SchemaChangeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload, S>;
export type SchemaChangeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SchemaChangeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SchemaChangeCountAggregateInputType | true;
};
export interface SchemaChangeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SchemaChange'];
        meta: {
            name: 'SchemaChange';
        };
    };
    /**
     * Find zero or one SchemaChange that matches the filter.
     * @param {SchemaChangeFindUniqueArgs} args - Arguments to find a SchemaChange
     * @example
     * // Get one SchemaChange
     * const schemaChange = await prisma.schemaChange.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchemaChangeFindUniqueArgs>(args: Prisma.SelectSubset<T, SchemaChangeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SchemaChangeClient<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SchemaChange that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchemaChangeFindUniqueOrThrowArgs} args - Arguments to find a SchemaChange
     * @example
     * // Get one SchemaChange
     * const schemaChange = await prisma.schemaChange.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchemaChangeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SchemaChangeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SchemaChangeClient<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SchemaChange that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemaChangeFindFirstArgs} args - Arguments to find a SchemaChange
     * @example
     * // Get one SchemaChange
     * const schemaChange = await prisma.schemaChange.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchemaChangeFindFirstArgs>(args?: Prisma.SelectSubset<T, SchemaChangeFindFirstArgs<ExtArgs>>): Prisma.Prisma__SchemaChangeClient<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SchemaChange that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemaChangeFindFirstOrThrowArgs} args - Arguments to find a SchemaChange
     * @example
     * // Get one SchemaChange
     * const schemaChange = await prisma.schemaChange.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchemaChangeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SchemaChangeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SchemaChangeClient<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SchemaChanges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemaChangeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SchemaChanges
     * const schemaChanges = await prisma.schemaChange.findMany()
     *
     * // Get first 10 SchemaChanges
     * const schemaChanges = await prisma.schemaChange.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const schemaChangeWithIdOnly = await prisma.schemaChange.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SchemaChangeFindManyArgs>(args?: Prisma.SelectSubset<T, SchemaChangeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SchemaChange.
     * @param {SchemaChangeCreateArgs} args - Arguments to create a SchemaChange.
     * @example
     * // Create one SchemaChange
     * const SchemaChange = await prisma.schemaChange.create({
     *   data: {
     *     // ... data to create a SchemaChange
     *   }
     * })
     *
     */
    create<T extends SchemaChangeCreateArgs>(args: Prisma.SelectSubset<T, SchemaChangeCreateArgs<ExtArgs>>): Prisma.Prisma__SchemaChangeClient<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SchemaChanges.
     * @param {SchemaChangeCreateManyArgs} args - Arguments to create many SchemaChanges.
     * @example
     * // Create many SchemaChanges
     * const schemaChange = await prisma.schemaChange.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SchemaChangeCreateManyArgs>(args?: Prisma.SelectSubset<T, SchemaChangeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SchemaChanges and returns the data saved in the database.
     * @param {SchemaChangeCreateManyAndReturnArgs} args - Arguments to create many SchemaChanges.
     * @example
     * // Create many SchemaChanges
     * const schemaChange = await prisma.schemaChange.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SchemaChanges and only return the `id`
     * const schemaChangeWithIdOnly = await prisma.schemaChange.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SchemaChangeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SchemaChangeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SchemaChange.
     * @param {SchemaChangeDeleteArgs} args - Arguments to delete one SchemaChange.
     * @example
     * // Delete one SchemaChange
     * const SchemaChange = await prisma.schemaChange.delete({
     *   where: {
     *     // ... filter to delete one SchemaChange
     *   }
     * })
     *
     */
    delete<T extends SchemaChangeDeleteArgs>(args: Prisma.SelectSubset<T, SchemaChangeDeleteArgs<ExtArgs>>): Prisma.Prisma__SchemaChangeClient<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SchemaChange.
     * @param {SchemaChangeUpdateArgs} args - Arguments to update one SchemaChange.
     * @example
     * // Update one SchemaChange
     * const schemaChange = await prisma.schemaChange.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SchemaChangeUpdateArgs>(args: Prisma.SelectSubset<T, SchemaChangeUpdateArgs<ExtArgs>>): Prisma.Prisma__SchemaChangeClient<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SchemaChanges.
     * @param {SchemaChangeDeleteManyArgs} args - Arguments to filter SchemaChanges to delete.
     * @example
     * // Delete a few SchemaChanges
     * const { count } = await prisma.schemaChange.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SchemaChangeDeleteManyArgs>(args?: Prisma.SelectSubset<T, SchemaChangeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SchemaChanges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemaChangeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SchemaChanges
     * const schemaChange = await prisma.schemaChange.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SchemaChangeUpdateManyArgs>(args: Prisma.SelectSubset<T, SchemaChangeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SchemaChanges and returns the data updated in the database.
     * @param {SchemaChangeUpdateManyAndReturnArgs} args - Arguments to update many SchemaChanges.
     * @example
     * // Update many SchemaChanges
     * const schemaChange = await prisma.schemaChange.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SchemaChanges and only return the `id`
     * const schemaChangeWithIdOnly = await prisma.schemaChange.updateManyAndReturn({
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
    updateManyAndReturn<T extends SchemaChangeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SchemaChangeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SchemaChange.
     * @param {SchemaChangeUpsertArgs} args - Arguments to update or create a SchemaChange.
     * @example
     * // Update or create a SchemaChange
     * const schemaChange = await prisma.schemaChange.upsert({
     *   create: {
     *     // ... data to create a SchemaChange
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SchemaChange we want to update
     *   }
     * })
     */
    upsert<T extends SchemaChangeUpsertArgs>(args: Prisma.SelectSubset<T, SchemaChangeUpsertArgs<ExtArgs>>): Prisma.Prisma__SchemaChangeClient<runtime.Types.Result.GetResult<Prisma.$SchemaChangePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SchemaChanges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemaChangeCountArgs} args - Arguments to filter SchemaChanges to count.
     * @example
     * // Count the number of SchemaChanges
     * const count = await prisma.schemaChange.count({
     *   where: {
     *     // ... the filter for the SchemaChanges we want to count
     *   }
     * })
    **/
    count<T extends SchemaChangeCountArgs>(args?: Prisma.Subset<T, SchemaChangeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SchemaChangeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SchemaChange.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemaChangeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SchemaChangeAggregateArgs>(args: Prisma.Subset<T, SchemaChangeAggregateArgs>): Prisma.PrismaPromise<GetSchemaChangeAggregateType<T>>;
    /**
     * Group by SchemaChange.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchemaChangeGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SchemaChangeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SchemaChangeGroupByArgs['orderBy'];
    } : {
        orderBy?: SchemaChangeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SchemaChangeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchemaChangeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SchemaChange model
     */
    readonly fields: SchemaChangeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SchemaChange.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SchemaChangeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    schema<T extends Prisma.MasterObjectSchemaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MasterObjectSchemaDefaultArgs<ExtArgs>>): Prisma.Prisma__MasterObjectSchemaClient<runtime.Types.Result.GetResult<Prisma.$MasterObjectSchemaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the SchemaChange model
 */
export interface SchemaChangeFieldRefs {
    readonly id: Prisma.FieldRef<"SchemaChange", 'String'>;
    readonly schemaId: Prisma.FieldRef<"SchemaChange", 'String'>;
    readonly type: Prisma.FieldRef<"SchemaChange", 'SchemaChangeType'>;
    readonly payload: Prisma.FieldRef<"SchemaChange", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"SchemaChange", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"SchemaChange", 'DateTime'>;
}
/**
 * SchemaChange findUnique
 */
export type SchemaChangeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SchemaChange to fetch.
     */
    where: Prisma.SchemaChangeWhereUniqueInput;
};
/**
 * SchemaChange findUniqueOrThrow
 */
export type SchemaChangeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SchemaChange to fetch.
     */
    where: Prisma.SchemaChangeWhereUniqueInput;
};
/**
 * SchemaChange findFirst
 */
export type SchemaChangeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SchemaChange to fetch.
     */
    where?: Prisma.SchemaChangeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SchemaChanges to fetch.
     */
    orderBy?: Prisma.SchemaChangeOrderByWithRelationInput | Prisma.SchemaChangeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SchemaChanges.
     */
    cursor?: Prisma.SchemaChangeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SchemaChanges from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SchemaChanges.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SchemaChanges.
     */
    distinct?: Prisma.SchemaChangeScalarFieldEnum | Prisma.SchemaChangeScalarFieldEnum[];
};
/**
 * SchemaChange findFirstOrThrow
 */
export type SchemaChangeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SchemaChange to fetch.
     */
    where?: Prisma.SchemaChangeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SchemaChanges to fetch.
     */
    orderBy?: Prisma.SchemaChangeOrderByWithRelationInput | Prisma.SchemaChangeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SchemaChanges.
     */
    cursor?: Prisma.SchemaChangeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SchemaChanges from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SchemaChanges.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SchemaChanges.
     */
    distinct?: Prisma.SchemaChangeScalarFieldEnum | Prisma.SchemaChangeScalarFieldEnum[];
};
/**
 * SchemaChange findMany
 */
export type SchemaChangeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SchemaChanges to fetch.
     */
    where?: Prisma.SchemaChangeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SchemaChanges to fetch.
     */
    orderBy?: Prisma.SchemaChangeOrderByWithRelationInput | Prisma.SchemaChangeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SchemaChanges.
     */
    cursor?: Prisma.SchemaChangeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SchemaChanges from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SchemaChanges.
     */
    skip?: number;
    distinct?: Prisma.SchemaChangeScalarFieldEnum | Prisma.SchemaChangeScalarFieldEnum[];
};
/**
 * SchemaChange create
 */
export type SchemaChangeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a SchemaChange.
     */
    data: Prisma.XOR<Prisma.SchemaChangeCreateInput, Prisma.SchemaChangeUncheckedCreateInput>;
};
/**
 * SchemaChange createMany
 */
export type SchemaChangeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SchemaChanges.
     */
    data: Prisma.SchemaChangeCreateManyInput | Prisma.SchemaChangeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SchemaChange createManyAndReturn
 */
export type SchemaChangeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemaChange
     */
    select?: Prisma.SchemaChangeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SchemaChange
     */
    omit?: Prisma.SchemaChangeOmit<ExtArgs> | null;
    /**
     * The data used to create many SchemaChanges.
     */
    data: Prisma.SchemaChangeCreateManyInput | Prisma.SchemaChangeCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SchemaChangeIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * SchemaChange update
 */
export type SchemaChangeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a SchemaChange.
     */
    data: Prisma.XOR<Prisma.SchemaChangeUpdateInput, Prisma.SchemaChangeUncheckedUpdateInput>;
    /**
     * Choose, which SchemaChange to update.
     */
    where: Prisma.SchemaChangeWhereUniqueInput;
};
/**
 * SchemaChange updateMany
 */
export type SchemaChangeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SchemaChanges.
     */
    data: Prisma.XOR<Prisma.SchemaChangeUpdateManyMutationInput, Prisma.SchemaChangeUncheckedUpdateManyInput>;
    /**
     * Filter which SchemaChanges to update
     */
    where?: Prisma.SchemaChangeWhereInput;
    /**
     * Limit how many SchemaChanges to update.
     */
    limit?: number;
};
/**
 * SchemaChange updateManyAndReturn
 */
export type SchemaChangeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchemaChange
     */
    select?: Prisma.SchemaChangeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SchemaChange
     */
    omit?: Prisma.SchemaChangeOmit<ExtArgs> | null;
    /**
     * The data used to update SchemaChanges.
     */
    data: Prisma.XOR<Prisma.SchemaChangeUpdateManyMutationInput, Prisma.SchemaChangeUncheckedUpdateManyInput>;
    /**
     * Filter which SchemaChanges to update
     */
    where?: Prisma.SchemaChangeWhereInput;
    /**
     * Limit how many SchemaChanges to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SchemaChangeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * SchemaChange upsert
 */
export type SchemaChangeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the SchemaChange to update in case it exists.
     */
    where: Prisma.SchemaChangeWhereUniqueInput;
    /**
     * In case the SchemaChange found by the `where` argument doesn't exist, create a new SchemaChange with this data.
     */
    create: Prisma.XOR<Prisma.SchemaChangeCreateInput, Prisma.SchemaChangeUncheckedCreateInput>;
    /**
     * In case the SchemaChange was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SchemaChangeUpdateInput, Prisma.SchemaChangeUncheckedUpdateInput>;
};
/**
 * SchemaChange delete
 */
export type SchemaChangeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which SchemaChange to delete.
     */
    where: Prisma.SchemaChangeWhereUniqueInput;
};
/**
 * SchemaChange deleteMany
 */
export type SchemaChangeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SchemaChanges to delete
     */
    where?: Prisma.SchemaChangeWhereInput;
    /**
     * Limit how many SchemaChanges to delete.
     */
    limit?: number;
};
/**
 * SchemaChange without action
 */
export type SchemaChangeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=SchemaChange.d.ts.map