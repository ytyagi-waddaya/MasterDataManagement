import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model FieldFormula
 *
 */
export type FieldFormulaModel = runtime.Types.Result.DefaultSelection<Prisma.$FieldFormulaPayload>;
export type AggregateFieldFormula = {
    _count: FieldFormulaCountAggregateOutputType | null;
    _min: FieldFormulaMinAggregateOutputType | null;
    _max: FieldFormulaMaxAggregateOutputType | null;
};
export type FieldFormulaMinAggregateOutputType = {
    id: string | null;
    fieldId: string | null;
    expression: string | null;
    createdAt: Date | null;
    deletedAt: Date | null;
};
export type FieldFormulaMaxAggregateOutputType = {
    id: string | null;
    fieldId: string | null;
    expression: string | null;
    createdAt: Date | null;
    deletedAt: Date | null;
};
export type FieldFormulaCountAggregateOutputType = {
    id: number;
    fieldId: number;
    expression: number;
    dependencies: number;
    createdAt: number;
    deletedAt: number;
    _all: number;
};
export type FieldFormulaMinAggregateInputType = {
    id?: true;
    fieldId?: true;
    expression?: true;
    createdAt?: true;
    deletedAt?: true;
};
export type FieldFormulaMaxAggregateInputType = {
    id?: true;
    fieldId?: true;
    expression?: true;
    createdAt?: true;
    deletedAt?: true;
};
export type FieldFormulaCountAggregateInputType = {
    id?: true;
    fieldId?: true;
    expression?: true;
    dependencies?: true;
    createdAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type FieldFormulaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FieldFormula to aggregate.
     */
    where?: Prisma.FieldFormulaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FieldFormulas to fetch.
     */
    orderBy?: Prisma.FieldFormulaOrderByWithRelationInput | Prisma.FieldFormulaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FieldFormulaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FieldFormulas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FieldFormulas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FieldFormulas
    **/
    _count?: true | FieldFormulaCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FieldFormulaMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FieldFormulaMaxAggregateInputType;
};
export type GetFieldFormulaAggregateType<T extends FieldFormulaAggregateArgs> = {
    [P in keyof T & keyof AggregateFieldFormula]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFieldFormula[P]> : Prisma.GetScalarType<T[P], AggregateFieldFormula[P]>;
};
export type FieldFormulaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FieldFormulaWhereInput;
    orderBy?: Prisma.FieldFormulaOrderByWithAggregationInput | Prisma.FieldFormulaOrderByWithAggregationInput[];
    by: Prisma.FieldFormulaScalarFieldEnum[] | Prisma.FieldFormulaScalarFieldEnum;
    having?: Prisma.FieldFormulaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FieldFormulaCountAggregateInputType | true;
    _min?: FieldFormulaMinAggregateInputType;
    _max?: FieldFormulaMaxAggregateInputType;
};
export type FieldFormulaGroupByOutputType = {
    id: string;
    fieldId: string;
    expression: string;
    dependencies: string[];
    createdAt: Date;
    deletedAt: Date | null;
    _count: FieldFormulaCountAggregateOutputType | null;
    _min: FieldFormulaMinAggregateOutputType | null;
    _max: FieldFormulaMaxAggregateOutputType | null;
};
type GetFieldFormulaGroupByPayload<T extends FieldFormulaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FieldFormulaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FieldFormulaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FieldFormulaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FieldFormulaGroupByOutputType[P]>;
}>>;
export type FieldFormulaWhereInput = {
    AND?: Prisma.FieldFormulaWhereInput | Prisma.FieldFormulaWhereInput[];
    OR?: Prisma.FieldFormulaWhereInput[];
    NOT?: Prisma.FieldFormulaWhereInput | Prisma.FieldFormulaWhereInput[];
    id?: Prisma.StringFilter<"FieldFormula"> | string;
    fieldId?: Prisma.StringFilter<"FieldFormula"> | string;
    expression?: Prisma.StringFilter<"FieldFormula"> | string;
    dependencies?: Prisma.StringNullableListFilter<"FieldFormula">;
    createdAt?: Prisma.DateTimeFilter<"FieldFormula"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"FieldFormula"> | Date | string | null;
    field?: Prisma.XOR<Prisma.FieldDefinitionScalarRelationFilter, Prisma.FieldDefinitionWhereInput>;
};
export type FieldFormulaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    expression?: Prisma.SortOrder;
    dependencies?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    field?: Prisma.FieldDefinitionOrderByWithRelationInput;
};
export type FieldFormulaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fieldId?: string;
    AND?: Prisma.FieldFormulaWhereInput | Prisma.FieldFormulaWhereInput[];
    OR?: Prisma.FieldFormulaWhereInput[];
    NOT?: Prisma.FieldFormulaWhereInput | Prisma.FieldFormulaWhereInput[];
    expression?: Prisma.StringFilter<"FieldFormula"> | string;
    dependencies?: Prisma.StringNullableListFilter<"FieldFormula">;
    createdAt?: Prisma.DateTimeFilter<"FieldFormula"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"FieldFormula"> | Date | string | null;
    field?: Prisma.XOR<Prisma.FieldDefinitionScalarRelationFilter, Prisma.FieldDefinitionWhereInput>;
}, "id" | "fieldId">;
export type FieldFormulaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    expression?: Prisma.SortOrder;
    dependencies?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.FieldFormulaCountOrderByAggregateInput;
    _max?: Prisma.FieldFormulaMaxOrderByAggregateInput;
    _min?: Prisma.FieldFormulaMinOrderByAggregateInput;
};
export type FieldFormulaScalarWhereWithAggregatesInput = {
    AND?: Prisma.FieldFormulaScalarWhereWithAggregatesInput | Prisma.FieldFormulaScalarWhereWithAggregatesInput[];
    OR?: Prisma.FieldFormulaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FieldFormulaScalarWhereWithAggregatesInput | Prisma.FieldFormulaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FieldFormula"> | string;
    fieldId?: Prisma.StringWithAggregatesFilter<"FieldFormula"> | string;
    expression?: Prisma.StringWithAggregatesFilter<"FieldFormula"> | string;
    dependencies?: Prisma.StringNullableListFilter<"FieldFormula">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FieldFormula"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FieldFormula"> | Date | string | null;
};
export type FieldFormulaCreateInput = {
    id?: string;
    expression: string;
    dependencies?: Prisma.FieldFormulaCreatedependenciesInput | string[];
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    field: Prisma.FieldDefinitionCreateNestedOneWithoutFieldFormulaInput;
};
export type FieldFormulaUncheckedCreateInput = {
    id?: string;
    fieldId: string;
    expression: string;
    dependencies?: Prisma.FieldFormulaCreatedependenciesInput | string[];
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldFormulaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expression?: Prisma.StringFieldUpdateOperationsInput | string;
    dependencies?: Prisma.FieldFormulaUpdatedependenciesInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    field?: Prisma.FieldDefinitionUpdateOneRequiredWithoutFieldFormulaNestedInput;
};
export type FieldFormulaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fieldId?: Prisma.StringFieldUpdateOperationsInput | string;
    expression?: Prisma.StringFieldUpdateOperationsInput | string;
    dependencies?: Prisma.FieldFormulaUpdatedependenciesInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldFormulaCreateManyInput = {
    id?: string;
    fieldId: string;
    expression: string;
    dependencies?: Prisma.FieldFormulaCreatedependenciesInput | string[];
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldFormulaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expression?: Prisma.StringFieldUpdateOperationsInput | string;
    dependencies?: Prisma.FieldFormulaUpdatedependenciesInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldFormulaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fieldId?: Prisma.StringFieldUpdateOperationsInput | string;
    expression?: Prisma.StringFieldUpdateOperationsInput | string;
    dependencies?: Prisma.FieldFormulaUpdatedependenciesInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldFormulaNullableScalarRelationFilter = {
    is?: Prisma.FieldFormulaWhereInput | null;
    isNot?: Prisma.FieldFormulaWhereInput | null;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type FieldFormulaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    expression?: Prisma.SortOrder;
    dependencies?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type FieldFormulaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    expression?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type FieldFormulaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fieldId?: Prisma.SortOrder;
    expression?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type FieldFormulaCreateNestedOneWithoutFieldInput = {
    create?: Prisma.XOR<Prisma.FieldFormulaCreateWithoutFieldInput, Prisma.FieldFormulaUncheckedCreateWithoutFieldInput>;
    connectOrCreate?: Prisma.FieldFormulaCreateOrConnectWithoutFieldInput;
    connect?: Prisma.FieldFormulaWhereUniqueInput;
};
export type FieldFormulaUncheckedCreateNestedOneWithoutFieldInput = {
    create?: Prisma.XOR<Prisma.FieldFormulaCreateWithoutFieldInput, Prisma.FieldFormulaUncheckedCreateWithoutFieldInput>;
    connectOrCreate?: Prisma.FieldFormulaCreateOrConnectWithoutFieldInput;
    connect?: Prisma.FieldFormulaWhereUniqueInput;
};
export type FieldFormulaUpdateOneWithoutFieldNestedInput = {
    create?: Prisma.XOR<Prisma.FieldFormulaCreateWithoutFieldInput, Prisma.FieldFormulaUncheckedCreateWithoutFieldInput>;
    connectOrCreate?: Prisma.FieldFormulaCreateOrConnectWithoutFieldInput;
    upsert?: Prisma.FieldFormulaUpsertWithoutFieldInput;
    disconnect?: Prisma.FieldFormulaWhereInput | boolean;
    delete?: Prisma.FieldFormulaWhereInput | boolean;
    connect?: Prisma.FieldFormulaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FieldFormulaUpdateToOneWithWhereWithoutFieldInput, Prisma.FieldFormulaUpdateWithoutFieldInput>, Prisma.FieldFormulaUncheckedUpdateWithoutFieldInput>;
};
export type FieldFormulaUncheckedUpdateOneWithoutFieldNestedInput = {
    create?: Prisma.XOR<Prisma.FieldFormulaCreateWithoutFieldInput, Prisma.FieldFormulaUncheckedCreateWithoutFieldInput>;
    connectOrCreate?: Prisma.FieldFormulaCreateOrConnectWithoutFieldInput;
    upsert?: Prisma.FieldFormulaUpsertWithoutFieldInput;
    disconnect?: Prisma.FieldFormulaWhereInput | boolean;
    delete?: Prisma.FieldFormulaWhereInput | boolean;
    connect?: Prisma.FieldFormulaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FieldFormulaUpdateToOneWithWhereWithoutFieldInput, Prisma.FieldFormulaUpdateWithoutFieldInput>, Prisma.FieldFormulaUncheckedUpdateWithoutFieldInput>;
};
export type FieldFormulaCreatedependenciesInput = {
    set: string[];
};
export type FieldFormulaUpdatedependenciesInput = {
    set?: string[];
    push?: string | string[];
};
export type FieldFormulaCreateWithoutFieldInput = {
    id?: string;
    expression: string;
    dependencies?: Prisma.FieldFormulaCreatedependenciesInput | string[];
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldFormulaUncheckedCreateWithoutFieldInput = {
    id?: string;
    expression: string;
    dependencies?: Prisma.FieldFormulaCreatedependenciesInput | string[];
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type FieldFormulaCreateOrConnectWithoutFieldInput = {
    where: Prisma.FieldFormulaWhereUniqueInput;
    create: Prisma.XOR<Prisma.FieldFormulaCreateWithoutFieldInput, Prisma.FieldFormulaUncheckedCreateWithoutFieldInput>;
};
export type FieldFormulaUpsertWithoutFieldInput = {
    update: Prisma.XOR<Prisma.FieldFormulaUpdateWithoutFieldInput, Prisma.FieldFormulaUncheckedUpdateWithoutFieldInput>;
    create: Prisma.XOR<Prisma.FieldFormulaCreateWithoutFieldInput, Prisma.FieldFormulaUncheckedCreateWithoutFieldInput>;
    where?: Prisma.FieldFormulaWhereInput;
};
export type FieldFormulaUpdateToOneWithWhereWithoutFieldInput = {
    where?: Prisma.FieldFormulaWhereInput;
    data: Prisma.XOR<Prisma.FieldFormulaUpdateWithoutFieldInput, Prisma.FieldFormulaUncheckedUpdateWithoutFieldInput>;
};
export type FieldFormulaUpdateWithoutFieldInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expression?: Prisma.StringFieldUpdateOperationsInput | string;
    dependencies?: Prisma.FieldFormulaUpdatedependenciesInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldFormulaUncheckedUpdateWithoutFieldInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expression?: Prisma.StringFieldUpdateOperationsInput | string;
    dependencies?: Prisma.FieldFormulaUpdatedependenciesInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FieldFormulaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fieldId?: boolean;
    expression?: boolean;
    dependencies?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fieldFormula"]>;
export type FieldFormulaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fieldId?: boolean;
    expression?: boolean;
    dependencies?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fieldFormula"]>;
export type FieldFormulaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fieldId?: boolean;
    expression?: boolean;
    dependencies?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fieldFormula"]>;
export type FieldFormulaSelectScalar = {
    id?: boolean;
    fieldId?: boolean;
    expression?: boolean;
    dependencies?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
};
export type FieldFormulaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fieldId" | "expression" | "dependencies" | "createdAt" | "deletedAt", ExtArgs["result"]["fieldFormula"]>;
export type FieldFormulaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
};
export type FieldFormulaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
};
export type FieldFormulaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    field?: boolean | Prisma.FieldDefinitionDefaultArgs<ExtArgs>;
};
export type $FieldFormulaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FieldFormula";
    objects: {
        field: Prisma.$FieldDefinitionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fieldId: string;
        /**
         * JS / DSL expression
         */
        expression: string;
        /**
         * Dependent field keys
         */
        dependencies: string[];
        createdAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["fieldFormula"]>;
    composites: {};
};
export type FieldFormulaGetPayload<S extends boolean | null | undefined | FieldFormulaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload, S>;
export type FieldFormulaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FieldFormulaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FieldFormulaCountAggregateInputType | true;
};
export interface FieldFormulaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FieldFormula'];
        meta: {
            name: 'FieldFormula';
        };
    };
    /**
     * Find zero or one FieldFormula that matches the filter.
     * @param {FieldFormulaFindUniqueArgs} args - Arguments to find a FieldFormula
     * @example
     * // Get one FieldFormula
     * const fieldFormula = await prisma.fieldFormula.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FieldFormulaFindUniqueArgs>(args: Prisma.SelectSubset<T, FieldFormulaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FieldFormulaClient<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FieldFormula that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FieldFormulaFindUniqueOrThrowArgs} args - Arguments to find a FieldFormula
     * @example
     * // Get one FieldFormula
     * const fieldFormula = await prisma.fieldFormula.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FieldFormulaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FieldFormulaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FieldFormulaClient<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FieldFormula that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFormulaFindFirstArgs} args - Arguments to find a FieldFormula
     * @example
     * // Get one FieldFormula
     * const fieldFormula = await prisma.fieldFormula.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FieldFormulaFindFirstArgs>(args?: Prisma.SelectSubset<T, FieldFormulaFindFirstArgs<ExtArgs>>): Prisma.Prisma__FieldFormulaClient<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FieldFormula that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFormulaFindFirstOrThrowArgs} args - Arguments to find a FieldFormula
     * @example
     * // Get one FieldFormula
     * const fieldFormula = await prisma.fieldFormula.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FieldFormulaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FieldFormulaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FieldFormulaClient<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FieldFormulas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFormulaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FieldFormulas
     * const fieldFormulas = await prisma.fieldFormula.findMany()
     *
     * // Get first 10 FieldFormulas
     * const fieldFormulas = await prisma.fieldFormula.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const fieldFormulaWithIdOnly = await prisma.fieldFormula.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FieldFormulaFindManyArgs>(args?: Prisma.SelectSubset<T, FieldFormulaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FieldFormula.
     * @param {FieldFormulaCreateArgs} args - Arguments to create a FieldFormula.
     * @example
     * // Create one FieldFormula
     * const FieldFormula = await prisma.fieldFormula.create({
     *   data: {
     *     // ... data to create a FieldFormula
     *   }
     * })
     *
     */
    create<T extends FieldFormulaCreateArgs>(args: Prisma.SelectSubset<T, FieldFormulaCreateArgs<ExtArgs>>): Prisma.Prisma__FieldFormulaClient<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FieldFormulas.
     * @param {FieldFormulaCreateManyArgs} args - Arguments to create many FieldFormulas.
     * @example
     * // Create many FieldFormulas
     * const fieldFormula = await prisma.fieldFormula.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FieldFormulaCreateManyArgs>(args?: Prisma.SelectSubset<T, FieldFormulaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FieldFormulas and returns the data saved in the database.
     * @param {FieldFormulaCreateManyAndReturnArgs} args - Arguments to create many FieldFormulas.
     * @example
     * // Create many FieldFormulas
     * const fieldFormula = await prisma.fieldFormula.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FieldFormulas and only return the `id`
     * const fieldFormulaWithIdOnly = await prisma.fieldFormula.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FieldFormulaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FieldFormulaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FieldFormula.
     * @param {FieldFormulaDeleteArgs} args - Arguments to delete one FieldFormula.
     * @example
     * // Delete one FieldFormula
     * const FieldFormula = await prisma.fieldFormula.delete({
     *   where: {
     *     // ... filter to delete one FieldFormula
     *   }
     * })
     *
     */
    delete<T extends FieldFormulaDeleteArgs>(args: Prisma.SelectSubset<T, FieldFormulaDeleteArgs<ExtArgs>>): Prisma.Prisma__FieldFormulaClient<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FieldFormula.
     * @param {FieldFormulaUpdateArgs} args - Arguments to update one FieldFormula.
     * @example
     * // Update one FieldFormula
     * const fieldFormula = await prisma.fieldFormula.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FieldFormulaUpdateArgs>(args: Prisma.SelectSubset<T, FieldFormulaUpdateArgs<ExtArgs>>): Prisma.Prisma__FieldFormulaClient<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FieldFormulas.
     * @param {FieldFormulaDeleteManyArgs} args - Arguments to filter FieldFormulas to delete.
     * @example
     * // Delete a few FieldFormulas
     * const { count } = await prisma.fieldFormula.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FieldFormulaDeleteManyArgs>(args?: Prisma.SelectSubset<T, FieldFormulaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FieldFormulas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFormulaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FieldFormulas
     * const fieldFormula = await prisma.fieldFormula.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FieldFormulaUpdateManyArgs>(args: Prisma.SelectSubset<T, FieldFormulaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FieldFormulas and returns the data updated in the database.
     * @param {FieldFormulaUpdateManyAndReturnArgs} args - Arguments to update many FieldFormulas.
     * @example
     * // Update many FieldFormulas
     * const fieldFormula = await prisma.fieldFormula.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FieldFormulas and only return the `id`
     * const fieldFormulaWithIdOnly = await prisma.fieldFormula.updateManyAndReturn({
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
    updateManyAndReturn<T extends FieldFormulaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FieldFormulaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FieldFormula.
     * @param {FieldFormulaUpsertArgs} args - Arguments to update or create a FieldFormula.
     * @example
     * // Update or create a FieldFormula
     * const fieldFormula = await prisma.fieldFormula.upsert({
     *   create: {
     *     // ... data to create a FieldFormula
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FieldFormula we want to update
     *   }
     * })
     */
    upsert<T extends FieldFormulaUpsertArgs>(args: Prisma.SelectSubset<T, FieldFormulaUpsertArgs<ExtArgs>>): Prisma.Prisma__FieldFormulaClient<runtime.Types.Result.GetResult<Prisma.$FieldFormulaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FieldFormulas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFormulaCountArgs} args - Arguments to filter FieldFormulas to count.
     * @example
     * // Count the number of FieldFormulas
     * const count = await prisma.fieldFormula.count({
     *   where: {
     *     // ... the filter for the FieldFormulas we want to count
     *   }
     * })
    **/
    count<T extends FieldFormulaCountArgs>(args?: Prisma.Subset<T, FieldFormulaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FieldFormulaCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FieldFormula.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFormulaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FieldFormulaAggregateArgs>(args: Prisma.Subset<T, FieldFormulaAggregateArgs>): Prisma.PrismaPromise<GetFieldFormulaAggregateType<T>>;
    /**
     * Group by FieldFormula.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFormulaGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FieldFormulaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FieldFormulaGroupByArgs['orderBy'];
    } : {
        orderBy?: FieldFormulaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FieldFormulaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFieldFormulaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FieldFormula model
     */
    readonly fields: FieldFormulaFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FieldFormula.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FieldFormulaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    field<T extends Prisma.FieldDefinitionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FieldDefinitionDefaultArgs<ExtArgs>>): Prisma.Prisma__FieldDefinitionClient<runtime.Types.Result.GetResult<Prisma.$FieldDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the FieldFormula model
 */
export interface FieldFormulaFieldRefs {
    readonly id: Prisma.FieldRef<"FieldFormula", 'String'>;
    readonly fieldId: Prisma.FieldRef<"FieldFormula", 'String'>;
    readonly expression: Prisma.FieldRef<"FieldFormula", 'String'>;
    readonly dependencies: Prisma.FieldRef<"FieldFormula", 'String[]'>;
    readonly createdAt: Prisma.FieldRef<"FieldFormula", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"FieldFormula", 'DateTime'>;
}
/**
 * FieldFormula findUnique
 */
export type FieldFormulaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * Filter, which FieldFormula to fetch.
     */
    where: Prisma.FieldFormulaWhereUniqueInput;
};
/**
 * FieldFormula findUniqueOrThrow
 */
export type FieldFormulaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * Filter, which FieldFormula to fetch.
     */
    where: Prisma.FieldFormulaWhereUniqueInput;
};
/**
 * FieldFormula findFirst
 */
export type FieldFormulaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * Filter, which FieldFormula to fetch.
     */
    where?: Prisma.FieldFormulaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FieldFormulas to fetch.
     */
    orderBy?: Prisma.FieldFormulaOrderByWithRelationInput | Prisma.FieldFormulaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FieldFormulas.
     */
    cursor?: Prisma.FieldFormulaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FieldFormulas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FieldFormulas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FieldFormulas.
     */
    distinct?: Prisma.FieldFormulaScalarFieldEnum | Prisma.FieldFormulaScalarFieldEnum[];
};
/**
 * FieldFormula findFirstOrThrow
 */
export type FieldFormulaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * Filter, which FieldFormula to fetch.
     */
    where?: Prisma.FieldFormulaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FieldFormulas to fetch.
     */
    orderBy?: Prisma.FieldFormulaOrderByWithRelationInput | Prisma.FieldFormulaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FieldFormulas.
     */
    cursor?: Prisma.FieldFormulaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FieldFormulas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FieldFormulas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FieldFormulas.
     */
    distinct?: Prisma.FieldFormulaScalarFieldEnum | Prisma.FieldFormulaScalarFieldEnum[];
};
/**
 * FieldFormula findMany
 */
export type FieldFormulaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * Filter, which FieldFormulas to fetch.
     */
    where?: Prisma.FieldFormulaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FieldFormulas to fetch.
     */
    orderBy?: Prisma.FieldFormulaOrderByWithRelationInput | Prisma.FieldFormulaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FieldFormulas.
     */
    cursor?: Prisma.FieldFormulaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FieldFormulas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FieldFormulas.
     */
    skip?: number;
    distinct?: Prisma.FieldFormulaScalarFieldEnum | Prisma.FieldFormulaScalarFieldEnum[];
};
/**
 * FieldFormula create
 */
export type FieldFormulaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * The data needed to create a FieldFormula.
     */
    data: Prisma.XOR<Prisma.FieldFormulaCreateInput, Prisma.FieldFormulaUncheckedCreateInput>;
};
/**
 * FieldFormula createMany
 */
export type FieldFormulaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FieldFormulas.
     */
    data: Prisma.FieldFormulaCreateManyInput | Prisma.FieldFormulaCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FieldFormula createManyAndReturn
 */
export type FieldFormulaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * The data used to create many FieldFormulas.
     */
    data: Prisma.FieldFormulaCreateManyInput | Prisma.FieldFormulaCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FieldFormula update
 */
export type FieldFormulaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * The data needed to update a FieldFormula.
     */
    data: Prisma.XOR<Prisma.FieldFormulaUpdateInput, Prisma.FieldFormulaUncheckedUpdateInput>;
    /**
     * Choose, which FieldFormula to update.
     */
    where: Prisma.FieldFormulaWhereUniqueInput;
};
/**
 * FieldFormula updateMany
 */
export type FieldFormulaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FieldFormulas.
     */
    data: Prisma.XOR<Prisma.FieldFormulaUpdateManyMutationInput, Prisma.FieldFormulaUncheckedUpdateManyInput>;
    /**
     * Filter which FieldFormulas to update
     */
    where?: Prisma.FieldFormulaWhereInput;
    /**
     * Limit how many FieldFormulas to update.
     */
    limit?: number;
};
/**
 * FieldFormula updateManyAndReturn
 */
export type FieldFormulaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * The data used to update FieldFormulas.
     */
    data: Prisma.XOR<Prisma.FieldFormulaUpdateManyMutationInput, Prisma.FieldFormulaUncheckedUpdateManyInput>;
    /**
     * Filter which FieldFormulas to update
     */
    where?: Prisma.FieldFormulaWhereInput;
    /**
     * Limit how many FieldFormulas to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FieldFormula upsert
 */
export type FieldFormulaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * The filter to search for the FieldFormula to update in case it exists.
     */
    where: Prisma.FieldFormulaWhereUniqueInput;
    /**
     * In case the FieldFormula found by the `where` argument doesn't exist, create a new FieldFormula with this data.
     */
    create: Prisma.XOR<Prisma.FieldFormulaCreateInput, Prisma.FieldFormulaUncheckedCreateInput>;
    /**
     * In case the FieldFormula was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FieldFormulaUpdateInput, Prisma.FieldFormulaUncheckedUpdateInput>;
};
/**
 * FieldFormula delete
 */
export type FieldFormulaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
    /**
     * Filter which FieldFormula to delete.
     */
    where: Prisma.FieldFormulaWhereUniqueInput;
};
/**
 * FieldFormula deleteMany
 */
export type FieldFormulaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FieldFormulas to delete
     */
    where?: Prisma.FieldFormulaWhereInput;
    /**
     * Limit how many FieldFormulas to delete.
     */
    limit?: number;
};
/**
 * FieldFormula without action
 */
export type FieldFormulaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldFormula
     */
    select?: Prisma.FieldFormulaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FieldFormula
     */
    omit?: Prisma.FieldFormulaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FieldFormulaInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FieldFormula.d.ts.map