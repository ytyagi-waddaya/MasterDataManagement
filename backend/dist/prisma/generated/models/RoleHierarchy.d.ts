import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model RoleHierarchy
 *
 */
export type RoleHierarchyModel = runtime.Types.Result.DefaultSelection<Prisma.$RoleHierarchyPayload>;
export type AggregateRoleHierarchy = {
    _count: RoleHierarchyCountAggregateOutputType | null;
    _min: RoleHierarchyMinAggregateOutputType | null;
    _max: RoleHierarchyMaxAggregateOutputType | null;
};
export type RoleHierarchyMinAggregateOutputType = {
    id: string | null;
    parentId: string | null;
    childId: string | null;
};
export type RoleHierarchyMaxAggregateOutputType = {
    id: string | null;
    parentId: string | null;
    childId: string | null;
};
export type RoleHierarchyCountAggregateOutputType = {
    id: number;
    parentId: number;
    childId: number;
    _all: number;
};
export type RoleHierarchyMinAggregateInputType = {
    id?: true;
    parentId?: true;
    childId?: true;
};
export type RoleHierarchyMaxAggregateInputType = {
    id?: true;
    parentId?: true;
    childId?: true;
};
export type RoleHierarchyCountAggregateInputType = {
    id?: true;
    parentId?: true;
    childId?: true;
    _all?: true;
};
export type RoleHierarchyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RoleHierarchy to aggregate.
     */
    where?: Prisma.RoleHierarchyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoleHierarchies to fetch.
     */
    orderBy?: Prisma.RoleHierarchyOrderByWithRelationInput | Prisma.RoleHierarchyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RoleHierarchyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoleHierarchies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoleHierarchies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RoleHierarchies
    **/
    _count?: true | RoleHierarchyCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RoleHierarchyMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RoleHierarchyMaxAggregateInputType;
};
export type GetRoleHierarchyAggregateType<T extends RoleHierarchyAggregateArgs> = {
    [P in keyof T & keyof AggregateRoleHierarchy]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoleHierarchy[P]> : Prisma.GetScalarType<T[P], AggregateRoleHierarchy[P]>;
};
export type RoleHierarchyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoleHierarchyWhereInput;
    orderBy?: Prisma.RoleHierarchyOrderByWithAggregationInput | Prisma.RoleHierarchyOrderByWithAggregationInput[];
    by: Prisma.RoleHierarchyScalarFieldEnum[] | Prisma.RoleHierarchyScalarFieldEnum;
    having?: Prisma.RoleHierarchyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoleHierarchyCountAggregateInputType | true;
    _min?: RoleHierarchyMinAggregateInputType;
    _max?: RoleHierarchyMaxAggregateInputType;
};
export type RoleHierarchyGroupByOutputType = {
    id: string;
    parentId: string;
    childId: string;
    _count: RoleHierarchyCountAggregateOutputType | null;
    _min: RoleHierarchyMinAggregateOutputType | null;
    _max: RoleHierarchyMaxAggregateOutputType | null;
};
type GetRoleHierarchyGroupByPayload<T extends RoleHierarchyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoleHierarchyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoleHierarchyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoleHierarchyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoleHierarchyGroupByOutputType[P]>;
}>>;
export type RoleHierarchyWhereInput = {
    AND?: Prisma.RoleHierarchyWhereInput | Prisma.RoleHierarchyWhereInput[];
    OR?: Prisma.RoleHierarchyWhereInput[];
    NOT?: Prisma.RoleHierarchyWhereInput | Prisma.RoleHierarchyWhereInput[];
    id?: Prisma.StringFilter<"RoleHierarchy"> | string;
    parentId?: Prisma.StringFilter<"RoleHierarchy"> | string;
    childId?: Prisma.StringFilter<"RoleHierarchy"> | string;
    parent?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    child?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
};
export type RoleHierarchyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    childId?: Prisma.SortOrder;
    parent?: Prisma.RoleOrderByWithRelationInput;
    child?: Prisma.RoleOrderByWithRelationInput;
};
export type RoleHierarchyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    parentId_childId?: Prisma.RoleHierarchyParentIdChildIdCompoundUniqueInput;
    AND?: Prisma.RoleHierarchyWhereInput | Prisma.RoleHierarchyWhereInput[];
    OR?: Prisma.RoleHierarchyWhereInput[];
    NOT?: Prisma.RoleHierarchyWhereInput | Prisma.RoleHierarchyWhereInput[];
    parentId?: Prisma.StringFilter<"RoleHierarchy"> | string;
    childId?: Prisma.StringFilter<"RoleHierarchy"> | string;
    parent?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    child?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
}, "id" | "parentId_childId">;
export type RoleHierarchyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    childId?: Prisma.SortOrder;
    _count?: Prisma.RoleHierarchyCountOrderByAggregateInput;
    _max?: Prisma.RoleHierarchyMaxOrderByAggregateInput;
    _min?: Prisma.RoleHierarchyMinOrderByAggregateInput;
};
export type RoleHierarchyScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoleHierarchyScalarWhereWithAggregatesInput | Prisma.RoleHierarchyScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoleHierarchyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoleHierarchyScalarWhereWithAggregatesInput | Prisma.RoleHierarchyScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RoleHierarchy"> | string;
    parentId?: Prisma.StringWithAggregatesFilter<"RoleHierarchy"> | string;
    childId?: Prisma.StringWithAggregatesFilter<"RoleHierarchy"> | string;
};
export type RoleHierarchyCreateInput = {
    id?: string;
    parent: Prisma.RoleCreateNestedOneWithoutParentsInput;
    child: Prisma.RoleCreateNestedOneWithoutChildrenInput;
};
export type RoleHierarchyUncheckedCreateInput = {
    id?: string;
    parentId: string;
    childId: string;
};
export type RoleHierarchyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parent?: Prisma.RoleUpdateOneRequiredWithoutParentsNestedInput;
    child?: Prisma.RoleUpdateOneRequiredWithoutChildrenNestedInput;
};
export type RoleHierarchyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.StringFieldUpdateOperationsInput | string;
    childId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type RoleHierarchyCreateManyInput = {
    id?: string;
    parentId: string;
    childId: string;
};
export type RoleHierarchyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type RoleHierarchyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.StringFieldUpdateOperationsInput | string;
    childId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type RoleHierarchyListRelationFilter = {
    every?: Prisma.RoleHierarchyWhereInput;
    some?: Prisma.RoleHierarchyWhereInput;
    none?: Prisma.RoleHierarchyWhereInput;
};
export type RoleHierarchyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RoleHierarchyParentIdChildIdCompoundUniqueInput = {
    parentId: string;
    childId: string;
};
export type RoleHierarchyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    childId?: Prisma.SortOrder;
};
export type RoleHierarchyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    childId?: Prisma.SortOrder;
};
export type RoleHierarchyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    childId?: Prisma.SortOrder;
};
export type RoleHierarchyCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutParentInput, Prisma.RoleHierarchyUncheckedCreateWithoutParentInput> | Prisma.RoleHierarchyCreateWithoutParentInput[] | Prisma.RoleHierarchyUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.RoleHierarchyCreateOrConnectWithoutParentInput | Prisma.RoleHierarchyCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.RoleHierarchyCreateManyParentInputEnvelope;
    connect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
};
export type RoleHierarchyCreateNestedManyWithoutChildInput = {
    create?: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutChildInput, Prisma.RoleHierarchyUncheckedCreateWithoutChildInput> | Prisma.RoleHierarchyCreateWithoutChildInput[] | Prisma.RoleHierarchyUncheckedCreateWithoutChildInput[];
    connectOrCreate?: Prisma.RoleHierarchyCreateOrConnectWithoutChildInput | Prisma.RoleHierarchyCreateOrConnectWithoutChildInput[];
    createMany?: Prisma.RoleHierarchyCreateManyChildInputEnvelope;
    connect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
};
export type RoleHierarchyUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutParentInput, Prisma.RoleHierarchyUncheckedCreateWithoutParentInput> | Prisma.RoleHierarchyCreateWithoutParentInput[] | Prisma.RoleHierarchyUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.RoleHierarchyCreateOrConnectWithoutParentInput | Prisma.RoleHierarchyCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.RoleHierarchyCreateManyParentInputEnvelope;
    connect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
};
export type RoleHierarchyUncheckedCreateNestedManyWithoutChildInput = {
    create?: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutChildInput, Prisma.RoleHierarchyUncheckedCreateWithoutChildInput> | Prisma.RoleHierarchyCreateWithoutChildInput[] | Prisma.RoleHierarchyUncheckedCreateWithoutChildInput[];
    connectOrCreate?: Prisma.RoleHierarchyCreateOrConnectWithoutChildInput | Prisma.RoleHierarchyCreateOrConnectWithoutChildInput[];
    createMany?: Prisma.RoleHierarchyCreateManyChildInputEnvelope;
    connect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
};
export type RoleHierarchyUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutParentInput, Prisma.RoleHierarchyUncheckedCreateWithoutParentInput> | Prisma.RoleHierarchyCreateWithoutParentInput[] | Prisma.RoleHierarchyUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.RoleHierarchyCreateOrConnectWithoutParentInput | Prisma.RoleHierarchyCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.RoleHierarchyUpsertWithWhereUniqueWithoutParentInput | Prisma.RoleHierarchyUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.RoleHierarchyCreateManyParentInputEnvelope;
    set?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    disconnect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    delete?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    connect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    update?: Prisma.RoleHierarchyUpdateWithWhereUniqueWithoutParentInput | Prisma.RoleHierarchyUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.RoleHierarchyUpdateManyWithWhereWithoutParentInput | Prisma.RoleHierarchyUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.RoleHierarchyScalarWhereInput | Prisma.RoleHierarchyScalarWhereInput[];
};
export type RoleHierarchyUpdateManyWithoutChildNestedInput = {
    create?: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutChildInput, Prisma.RoleHierarchyUncheckedCreateWithoutChildInput> | Prisma.RoleHierarchyCreateWithoutChildInput[] | Prisma.RoleHierarchyUncheckedCreateWithoutChildInput[];
    connectOrCreate?: Prisma.RoleHierarchyCreateOrConnectWithoutChildInput | Prisma.RoleHierarchyCreateOrConnectWithoutChildInput[];
    upsert?: Prisma.RoleHierarchyUpsertWithWhereUniqueWithoutChildInput | Prisma.RoleHierarchyUpsertWithWhereUniqueWithoutChildInput[];
    createMany?: Prisma.RoleHierarchyCreateManyChildInputEnvelope;
    set?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    disconnect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    delete?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    connect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    update?: Prisma.RoleHierarchyUpdateWithWhereUniqueWithoutChildInput | Prisma.RoleHierarchyUpdateWithWhereUniqueWithoutChildInput[];
    updateMany?: Prisma.RoleHierarchyUpdateManyWithWhereWithoutChildInput | Prisma.RoleHierarchyUpdateManyWithWhereWithoutChildInput[];
    deleteMany?: Prisma.RoleHierarchyScalarWhereInput | Prisma.RoleHierarchyScalarWhereInput[];
};
export type RoleHierarchyUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutParentInput, Prisma.RoleHierarchyUncheckedCreateWithoutParentInput> | Prisma.RoleHierarchyCreateWithoutParentInput[] | Prisma.RoleHierarchyUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.RoleHierarchyCreateOrConnectWithoutParentInput | Prisma.RoleHierarchyCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.RoleHierarchyUpsertWithWhereUniqueWithoutParentInput | Prisma.RoleHierarchyUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.RoleHierarchyCreateManyParentInputEnvelope;
    set?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    disconnect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    delete?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    connect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    update?: Prisma.RoleHierarchyUpdateWithWhereUniqueWithoutParentInput | Prisma.RoleHierarchyUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.RoleHierarchyUpdateManyWithWhereWithoutParentInput | Prisma.RoleHierarchyUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.RoleHierarchyScalarWhereInput | Prisma.RoleHierarchyScalarWhereInput[];
};
export type RoleHierarchyUncheckedUpdateManyWithoutChildNestedInput = {
    create?: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutChildInput, Prisma.RoleHierarchyUncheckedCreateWithoutChildInput> | Prisma.RoleHierarchyCreateWithoutChildInput[] | Prisma.RoleHierarchyUncheckedCreateWithoutChildInput[];
    connectOrCreate?: Prisma.RoleHierarchyCreateOrConnectWithoutChildInput | Prisma.RoleHierarchyCreateOrConnectWithoutChildInput[];
    upsert?: Prisma.RoleHierarchyUpsertWithWhereUniqueWithoutChildInput | Prisma.RoleHierarchyUpsertWithWhereUniqueWithoutChildInput[];
    createMany?: Prisma.RoleHierarchyCreateManyChildInputEnvelope;
    set?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    disconnect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    delete?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    connect?: Prisma.RoleHierarchyWhereUniqueInput | Prisma.RoleHierarchyWhereUniqueInput[];
    update?: Prisma.RoleHierarchyUpdateWithWhereUniqueWithoutChildInput | Prisma.RoleHierarchyUpdateWithWhereUniqueWithoutChildInput[];
    updateMany?: Prisma.RoleHierarchyUpdateManyWithWhereWithoutChildInput | Prisma.RoleHierarchyUpdateManyWithWhereWithoutChildInput[];
    deleteMany?: Prisma.RoleHierarchyScalarWhereInput | Prisma.RoleHierarchyScalarWhereInput[];
};
export type RoleHierarchyCreateWithoutParentInput = {
    id?: string;
    child: Prisma.RoleCreateNestedOneWithoutChildrenInput;
};
export type RoleHierarchyUncheckedCreateWithoutParentInput = {
    id?: string;
    childId: string;
};
export type RoleHierarchyCreateOrConnectWithoutParentInput = {
    where: Prisma.RoleHierarchyWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutParentInput, Prisma.RoleHierarchyUncheckedCreateWithoutParentInput>;
};
export type RoleHierarchyCreateManyParentInputEnvelope = {
    data: Prisma.RoleHierarchyCreateManyParentInput | Prisma.RoleHierarchyCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type RoleHierarchyCreateWithoutChildInput = {
    id?: string;
    parent: Prisma.RoleCreateNestedOneWithoutParentsInput;
};
export type RoleHierarchyUncheckedCreateWithoutChildInput = {
    id?: string;
    parentId: string;
};
export type RoleHierarchyCreateOrConnectWithoutChildInput = {
    where: Prisma.RoleHierarchyWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutChildInput, Prisma.RoleHierarchyUncheckedCreateWithoutChildInput>;
};
export type RoleHierarchyCreateManyChildInputEnvelope = {
    data: Prisma.RoleHierarchyCreateManyChildInput | Prisma.RoleHierarchyCreateManyChildInput[];
    skipDuplicates?: boolean;
};
export type RoleHierarchyUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.RoleHierarchyWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoleHierarchyUpdateWithoutParentInput, Prisma.RoleHierarchyUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutParentInput, Prisma.RoleHierarchyUncheckedCreateWithoutParentInput>;
};
export type RoleHierarchyUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.RoleHierarchyWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoleHierarchyUpdateWithoutParentInput, Prisma.RoleHierarchyUncheckedUpdateWithoutParentInput>;
};
export type RoleHierarchyUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.RoleHierarchyScalarWhereInput;
    data: Prisma.XOR<Prisma.RoleHierarchyUpdateManyMutationInput, Prisma.RoleHierarchyUncheckedUpdateManyWithoutParentInput>;
};
export type RoleHierarchyScalarWhereInput = {
    AND?: Prisma.RoleHierarchyScalarWhereInput | Prisma.RoleHierarchyScalarWhereInput[];
    OR?: Prisma.RoleHierarchyScalarWhereInput[];
    NOT?: Prisma.RoleHierarchyScalarWhereInput | Prisma.RoleHierarchyScalarWhereInput[];
    id?: Prisma.StringFilter<"RoleHierarchy"> | string;
    parentId?: Prisma.StringFilter<"RoleHierarchy"> | string;
    childId?: Prisma.StringFilter<"RoleHierarchy"> | string;
};
export type RoleHierarchyUpsertWithWhereUniqueWithoutChildInput = {
    where: Prisma.RoleHierarchyWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoleHierarchyUpdateWithoutChildInput, Prisma.RoleHierarchyUncheckedUpdateWithoutChildInput>;
    create: Prisma.XOR<Prisma.RoleHierarchyCreateWithoutChildInput, Prisma.RoleHierarchyUncheckedCreateWithoutChildInput>;
};
export type RoleHierarchyUpdateWithWhereUniqueWithoutChildInput = {
    where: Prisma.RoleHierarchyWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoleHierarchyUpdateWithoutChildInput, Prisma.RoleHierarchyUncheckedUpdateWithoutChildInput>;
};
export type RoleHierarchyUpdateManyWithWhereWithoutChildInput = {
    where: Prisma.RoleHierarchyScalarWhereInput;
    data: Prisma.XOR<Prisma.RoleHierarchyUpdateManyMutationInput, Prisma.RoleHierarchyUncheckedUpdateManyWithoutChildInput>;
};
export type RoleHierarchyCreateManyParentInput = {
    id?: string;
    childId: string;
};
export type RoleHierarchyCreateManyChildInput = {
    id?: string;
    parentId: string;
};
export type RoleHierarchyUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    child?: Prisma.RoleUpdateOneRequiredWithoutChildrenNestedInput;
};
export type RoleHierarchyUncheckedUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    childId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type RoleHierarchyUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    childId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type RoleHierarchyUpdateWithoutChildInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parent?: Prisma.RoleUpdateOneRequiredWithoutParentsNestedInput;
};
export type RoleHierarchyUncheckedUpdateWithoutChildInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type RoleHierarchyUncheckedUpdateManyWithoutChildInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type RoleHierarchySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    childId?: boolean;
    parent?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    child?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roleHierarchy"]>;
export type RoleHierarchySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    childId?: boolean;
    parent?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    child?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roleHierarchy"]>;
export type RoleHierarchySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    childId?: boolean;
    parent?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    child?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roleHierarchy"]>;
export type RoleHierarchySelectScalar = {
    id?: boolean;
    parentId?: boolean;
    childId?: boolean;
};
export type RoleHierarchyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "parentId" | "childId", ExtArgs["result"]["roleHierarchy"]>;
export type RoleHierarchyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    child?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
};
export type RoleHierarchyIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    child?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
};
export type RoleHierarchyIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    child?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
};
export type $RoleHierarchyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RoleHierarchy";
    objects: {
        parent: Prisma.$RolePayload<ExtArgs>;
        child: Prisma.$RolePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        parentId: string;
        childId: string;
    }, ExtArgs["result"]["roleHierarchy"]>;
    composites: {};
};
export type RoleHierarchyGetPayload<S extends boolean | null | undefined | RoleHierarchyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload, S>;
export type RoleHierarchyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoleHierarchyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoleHierarchyCountAggregateInputType | true;
};
export interface RoleHierarchyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RoleHierarchy'];
        meta: {
            name: 'RoleHierarchy';
        };
    };
    /**
     * Find zero or one RoleHierarchy that matches the filter.
     * @param {RoleHierarchyFindUniqueArgs} args - Arguments to find a RoleHierarchy
     * @example
     * // Get one RoleHierarchy
     * const roleHierarchy = await prisma.roleHierarchy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleHierarchyFindUniqueArgs>(args: Prisma.SelectSubset<T, RoleHierarchyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoleHierarchyClient<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RoleHierarchy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleHierarchyFindUniqueOrThrowArgs} args - Arguments to find a RoleHierarchy
     * @example
     * // Get one RoleHierarchy
     * const roleHierarchy = await prisma.roleHierarchy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleHierarchyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoleHierarchyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoleHierarchyClient<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RoleHierarchy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHierarchyFindFirstArgs} args - Arguments to find a RoleHierarchy
     * @example
     * // Get one RoleHierarchy
     * const roleHierarchy = await prisma.roleHierarchy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleHierarchyFindFirstArgs>(args?: Prisma.SelectSubset<T, RoleHierarchyFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoleHierarchyClient<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RoleHierarchy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHierarchyFindFirstOrThrowArgs} args - Arguments to find a RoleHierarchy
     * @example
     * // Get one RoleHierarchy
     * const roleHierarchy = await prisma.roleHierarchy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleHierarchyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoleHierarchyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoleHierarchyClient<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RoleHierarchies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHierarchyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoleHierarchies
     * const roleHierarchies = await prisma.roleHierarchy.findMany()
     *
     * // Get first 10 RoleHierarchies
     * const roleHierarchies = await prisma.roleHierarchy.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const roleHierarchyWithIdOnly = await prisma.roleHierarchy.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RoleHierarchyFindManyArgs>(args?: Prisma.SelectSubset<T, RoleHierarchyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RoleHierarchy.
     * @param {RoleHierarchyCreateArgs} args - Arguments to create a RoleHierarchy.
     * @example
     * // Create one RoleHierarchy
     * const RoleHierarchy = await prisma.roleHierarchy.create({
     *   data: {
     *     // ... data to create a RoleHierarchy
     *   }
     * })
     *
     */
    create<T extends RoleHierarchyCreateArgs>(args: Prisma.SelectSubset<T, RoleHierarchyCreateArgs<ExtArgs>>): Prisma.Prisma__RoleHierarchyClient<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RoleHierarchies.
     * @param {RoleHierarchyCreateManyArgs} args - Arguments to create many RoleHierarchies.
     * @example
     * // Create many RoleHierarchies
     * const roleHierarchy = await prisma.roleHierarchy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RoleHierarchyCreateManyArgs>(args?: Prisma.SelectSubset<T, RoleHierarchyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RoleHierarchies and returns the data saved in the database.
     * @param {RoleHierarchyCreateManyAndReturnArgs} args - Arguments to create many RoleHierarchies.
     * @example
     * // Create many RoleHierarchies
     * const roleHierarchy = await prisma.roleHierarchy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RoleHierarchies and only return the `id`
     * const roleHierarchyWithIdOnly = await prisma.roleHierarchy.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RoleHierarchyCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoleHierarchyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RoleHierarchy.
     * @param {RoleHierarchyDeleteArgs} args - Arguments to delete one RoleHierarchy.
     * @example
     * // Delete one RoleHierarchy
     * const RoleHierarchy = await prisma.roleHierarchy.delete({
     *   where: {
     *     // ... filter to delete one RoleHierarchy
     *   }
     * })
     *
     */
    delete<T extends RoleHierarchyDeleteArgs>(args: Prisma.SelectSubset<T, RoleHierarchyDeleteArgs<ExtArgs>>): Prisma.Prisma__RoleHierarchyClient<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RoleHierarchy.
     * @param {RoleHierarchyUpdateArgs} args - Arguments to update one RoleHierarchy.
     * @example
     * // Update one RoleHierarchy
     * const roleHierarchy = await prisma.roleHierarchy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RoleHierarchyUpdateArgs>(args: Prisma.SelectSubset<T, RoleHierarchyUpdateArgs<ExtArgs>>): Prisma.Prisma__RoleHierarchyClient<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RoleHierarchies.
     * @param {RoleHierarchyDeleteManyArgs} args - Arguments to filter RoleHierarchies to delete.
     * @example
     * // Delete a few RoleHierarchies
     * const { count } = await prisma.roleHierarchy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RoleHierarchyDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoleHierarchyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RoleHierarchies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHierarchyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoleHierarchies
     * const roleHierarchy = await prisma.roleHierarchy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RoleHierarchyUpdateManyArgs>(args: Prisma.SelectSubset<T, RoleHierarchyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RoleHierarchies and returns the data updated in the database.
     * @param {RoleHierarchyUpdateManyAndReturnArgs} args - Arguments to update many RoleHierarchies.
     * @example
     * // Update many RoleHierarchies
     * const roleHierarchy = await prisma.roleHierarchy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RoleHierarchies and only return the `id`
     * const roleHierarchyWithIdOnly = await prisma.roleHierarchy.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoleHierarchyUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoleHierarchyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RoleHierarchy.
     * @param {RoleHierarchyUpsertArgs} args - Arguments to update or create a RoleHierarchy.
     * @example
     * // Update or create a RoleHierarchy
     * const roleHierarchy = await prisma.roleHierarchy.upsert({
     *   create: {
     *     // ... data to create a RoleHierarchy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoleHierarchy we want to update
     *   }
     * })
     */
    upsert<T extends RoleHierarchyUpsertArgs>(args: Prisma.SelectSubset<T, RoleHierarchyUpsertArgs<ExtArgs>>): Prisma.Prisma__RoleHierarchyClient<runtime.Types.Result.GetResult<Prisma.$RoleHierarchyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RoleHierarchies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHierarchyCountArgs} args - Arguments to filter RoleHierarchies to count.
     * @example
     * // Count the number of RoleHierarchies
     * const count = await prisma.roleHierarchy.count({
     *   where: {
     *     // ... the filter for the RoleHierarchies we want to count
     *   }
     * })
    **/
    count<T extends RoleHierarchyCountArgs>(args?: Prisma.Subset<T, RoleHierarchyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoleHierarchyCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RoleHierarchy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHierarchyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleHierarchyAggregateArgs>(args: Prisma.Subset<T, RoleHierarchyAggregateArgs>): Prisma.PrismaPromise<GetRoleHierarchyAggregateType<T>>;
    /**
     * Group by RoleHierarchy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHierarchyGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RoleHierarchyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoleHierarchyGroupByArgs['orderBy'];
    } : {
        orderBy?: RoleHierarchyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoleHierarchyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleHierarchyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RoleHierarchy model
     */
    readonly fields: RoleHierarchyFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RoleHierarchy.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RoleHierarchyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parent<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    child<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the RoleHierarchy model
 */
export interface RoleHierarchyFieldRefs {
    readonly id: Prisma.FieldRef<"RoleHierarchy", 'String'>;
    readonly parentId: Prisma.FieldRef<"RoleHierarchy", 'String'>;
    readonly childId: Prisma.FieldRef<"RoleHierarchy", 'String'>;
}
/**
 * RoleHierarchy findUnique
 */
export type RoleHierarchyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHierarchy to fetch.
     */
    where: Prisma.RoleHierarchyWhereUniqueInput;
};
/**
 * RoleHierarchy findUniqueOrThrow
 */
export type RoleHierarchyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHierarchy to fetch.
     */
    where: Prisma.RoleHierarchyWhereUniqueInput;
};
/**
 * RoleHierarchy findFirst
 */
export type RoleHierarchyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHierarchy to fetch.
     */
    where?: Prisma.RoleHierarchyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoleHierarchies to fetch.
     */
    orderBy?: Prisma.RoleHierarchyOrderByWithRelationInput | Prisma.RoleHierarchyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RoleHierarchies.
     */
    cursor?: Prisma.RoleHierarchyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoleHierarchies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoleHierarchies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoleHierarchies.
     */
    distinct?: Prisma.RoleHierarchyScalarFieldEnum | Prisma.RoleHierarchyScalarFieldEnum[];
};
/**
 * RoleHierarchy findFirstOrThrow
 */
export type RoleHierarchyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHierarchy to fetch.
     */
    where?: Prisma.RoleHierarchyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoleHierarchies to fetch.
     */
    orderBy?: Prisma.RoleHierarchyOrderByWithRelationInput | Prisma.RoleHierarchyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RoleHierarchies.
     */
    cursor?: Prisma.RoleHierarchyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoleHierarchies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoleHierarchies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoleHierarchies.
     */
    distinct?: Prisma.RoleHierarchyScalarFieldEnum | Prisma.RoleHierarchyScalarFieldEnum[];
};
/**
 * RoleHierarchy findMany
 */
export type RoleHierarchyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHierarchies to fetch.
     */
    where?: Prisma.RoleHierarchyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoleHierarchies to fetch.
     */
    orderBy?: Prisma.RoleHierarchyOrderByWithRelationInput | Prisma.RoleHierarchyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RoleHierarchies.
     */
    cursor?: Prisma.RoleHierarchyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoleHierarchies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoleHierarchies.
     */
    skip?: number;
    distinct?: Prisma.RoleHierarchyScalarFieldEnum | Prisma.RoleHierarchyScalarFieldEnum[];
};
/**
 * RoleHierarchy create
 */
export type RoleHierarchyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * The data needed to create a RoleHierarchy.
     */
    data: Prisma.XOR<Prisma.RoleHierarchyCreateInput, Prisma.RoleHierarchyUncheckedCreateInput>;
};
/**
 * RoleHierarchy createMany
 */
export type RoleHierarchyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoleHierarchies.
     */
    data: Prisma.RoleHierarchyCreateManyInput | Prisma.RoleHierarchyCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RoleHierarchy createManyAndReturn
 */
export type RoleHierarchyCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * The data used to create many RoleHierarchies.
     */
    data: Prisma.RoleHierarchyCreateManyInput | Prisma.RoleHierarchyCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * RoleHierarchy update
 */
export type RoleHierarchyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * The data needed to update a RoleHierarchy.
     */
    data: Prisma.XOR<Prisma.RoleHierarchyUpdateInput, Prisma.RoleHierarchyUncheckedUpdateInput>;
    /**
     * Choose, which RoleHierarchy to update.
     */
    where: Prisma.RoleHierarchyWhereUniqueInput;
};
/**
 * RoleHierarchy updateMany
 */
export type RoleHierarchyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RoleHierarchies.
     */
    data: Prisma.XOR<Prisma.RoleHierarchyUpdateManyMutationInput, Prisma.RoleHierarchyUncheckedUpdateManyInput>;
    /**
     * Filter which RoleHierarchies to update
     */
    where?: Prisma.RoleHierarchyWhereInput;
    /**
     * Limit how many RoleHierarchies to update.
     */
    limit?: number;
};
/**
 * RoleHierarchy updateManyAndReturn
 */
export type RoleHierarchyUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * The data used to update RoleHierarchies.
     */
    data: Prisma.XOR<Prisma.RoleHierarchyUpdateManyMutationInput, Prisma.RoleHierarchyUncheckedUpdateManyInput>;
    /**
     * Filter which RoleHierarchies to update
     */
    where?: Prisma.RoleHierarchyWhereInput;
    /**
     * Limit how many RoleHierarchies to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * RoleHierarchy upsert
 */
export type RoleHierarchyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * The filter to search for the RoleHierarchy to update in case it exists.
     */
    where: Prisma.RoleHierarchyWhereUniqueInput;
    /**
     * In case the RoleHierarchy found by the `where` argument doesn't exist, create a new RoleHierarchy with this data.
     */
    create: Prisma.XOR<Prisma.RoleHierarchyCreateInput, Prisma.RoleHierarchyUncheckedCreateInput>;
    /**
     * In case the RoleHierarchy was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RoleHierarchyUpdateInput, Prisma.RoleHierarchyUncheckedUpdateInput>;
};
/**
 * RoleHierarchy delete
 */
export type RoleHierarchyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
    /**
     * Filter which RoleHierarchy to delete.
     */
    where: Prisma.RoleHierarchyWhereUniqueInput;
};
/**
 * RoleHierarchy deleteMany
 */
export type RoleHierarchyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RoleHierarchies to delete
     */
    where?: Prisma.RoleHierarchyWhereInput;
    /**
     * Limit how many RoleHierarchies to delete.
     */
    limit?: number;
};
/**
 * RoleHierarchy without action
 */
export type RoleHierarchyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHierarchy
     */
    select?: Prisma.RoleHierarchySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHierarchy
     */
    omit?: Prisma.RoleHierarchyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHierarchyInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=RoleHierarchy.d.ts.map