import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model WorkflowApproval
 *
 */
export type WorkflowApprovalModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkflowApprovalPayload>;
export type AggregateWorkflowApproval = {
    _count: WorkflowApprovalCountAggregateOutputType | null;
    _avg: WorkflowApprovalAvgAggregateOutputType | null;
    _sum: WorkflowApprovalSumAggregateOutputType | null;
    _min: WorkflowApprovalMinAggregateOutputType | null;
    _max: WorkflowApprovalMaxAggregateOutputType | null;
};
export type WorkflowApprovalAvgAggregateOutputType = {
    levelOrder: number | null;
};
export type WorkflowApprovalSumAggregateOutputType = {
    levelOrder: number | null;
};
export type WorkflowApprovalMinAggregateOutputType = {
    id: string | null;
    workflowInstanceId: string | null;
    transitionId: string | null;
    approverId: string | null;
    levelOrder: number | null;
    status: $Enums.ApprovalStatus | null;
    requestedAt: Date | null;
    decidedAt: Date | null;
    comment: string | null;
};
export type WorkflowApprovalMaxAggregateOutputType = {
    id: string | null;
    workflowInstanceId: string | null;
    transitionId: string | null;
    approverId: string | null;
    levelOrder: number | null;
    status: $Enums.ApprovalStatus | null;
    requestedAt: Date | null;
    decidedAt: Date | null;
    comment: string | null;
};
export type WorkflowApprovalCountAggregateOutputType = {
    id: number;
    workflowInstanceId: number;
    transitionId: number;
    approverId: number;
    levelOrder: number;
    status: number;
    requestedAt: number;
    decidedAt: number;
    comment: number;
    _all: number;
};
export type WorkflowApprovalAvgAggregateInputType = {
    levelOrder?: true;
};
export type WorkflowApprovalSumAggregateInputType = {
    levelOrder?: true;
};
export type WorkflowApprovalMinAggregateInputType = {
    id?: true;
    workflowInstanceId?: true;
    transitionId?: true;
    approverId?: true;
    levelOrder?: true;
    status?: true;
    requestedAt?: true;
    decidedAt?: true;
    comment?: true;
};
export type WorkflowApprovalMaxAggregateInputType = {
    id?: true;
    workflowInstanceId?: true;
    transitionId?: true;
    approverId?: true;
    levelOrder?: true;
    status?: true;
    requestedAt?: true;
    decidedAt?: true;
    comment?: true;
};
export type WorkflowApprovalCountAggregateInputType = {
    id?: true;
    workflowInstanceId?: true;
    transitionId?: true;
    approverId?: true;
    levelOrder?: true;
    status?: true;
    requestedAt?: true;
    decidedAt?: true;
    comment?: true;
    _all?: true;
};
export type WorkflowApprovalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowApproval to aggregate.
     */
    where?: Prisma.WorkflowApprovalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkflowApprovals to fetch.
     */
    orderBy?: Prisma.WorkflowApprovalOrderByWithRelationInput | Prisma.WorkflowApprovalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.WorkflowApprovalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkflowApprovals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkflowApprovals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WorkflowApprovals
    **/
    _count?: true | WorkflowApprovalCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: WorkflowApprovalAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: WorkflowApprovalSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowApprovalMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowApprovalMaxAggregateInputType;
};
export type GetWorkflowApprovalAggregateType<T extends WorkflowApprovalAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkflowApproval]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkflowApproval[P]> : Prisma.GetScalarType<T[P], AggregateWorkflowApproval[P]>;
};
export type WorkflowApprovalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowApprovalWhereInput;
    orderBy?: Prisma.WorkflowApprovalOrderByWithAggregationInput | Prisma.WorkflowApprovalOrderByWithAggregationInput[];
    by: Prisma.WorkflowApprovalScalarFieldEnum[] | Prisma.WorkflowApprovalScalarFieldEnum;
    having?: Prisma.WorkflowApprovalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkflowApprovalCountAggregateInputType | true;
    _avg?: WorkflowApprovalAvgAggregateInputType;
    _sum?: WorkflowApprovalSumAggregateInputType;
    _min?: WorkflowApprovalMinAggregateInputType;
    _max?: WorkflowApprovalMaxAggregateInputType;
};
export type WorkflowApprovalGroupByOutputType = {
    id: string;
    workflowInstanceId: string;
    transitionId: string;
    approverId: string;
    levelOrder: number | null;
    status: $Enums.ApprovalStatus;
    requestedAt: Date;
    decidedAt: Date | null;
    comment: string | null;
    _count: WorkflowApprovalCountAggregateOutputType | null;
    _avg: WorkflowApprovalAvgAggregateOutputType | null;
    _sum: WorkflowApprovalSumAggregateOutputType | null;
    _min: WorkflowApprovalMinAggregateOutputType | null;
    _max: WorkflowApprovalMaxAggregateOutputType | null;
};
type GetWorkflowApprovalGroupByPayload<T extends WorkflowApprovalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkflowApprovalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkflowApprovalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkflowApprovalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkflowApprovalGroupByOutputType[P]>;
}>>;
export type WorkflowApprovalWhereInput = {
    AND?: Prisma.WorkflowApprovalWhereInput | Prisma.WorkflowApprovalWhereInput[];
    OR?: Prisma.WorkflowApprovalWhereInput[];
    NOT?: Prisma.WorkflowApprovalWhereInput | Prisma.WorkflowApprovalWhereInput[];
    id?: Prisma.StringFilter<"WorkflowApproval"> | string;
    workflowInstanceId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    transitionId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    approverId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    levelOrder?: Prisma.IntNullableFilter<"WorkflowApproval"> | number | null;
    status?: Prisma.EnumApprovalStatusFilter<"WorkflowApproval"> | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFilter<"WorkflowApproval"> | Date | string;
    decidedAt?: Prisma.DateTimeNullableFilter<"WorkflowApproval"> | Date | string | null;
    comment?: Prisma.StringNullableFilter<"WorkflowApproval"> | string | null;
    workflowInstance?: Prisma.XOR<Prisma.WorkflowInstanceScalarRelationFilter, Prisma.WorkflowInstanceWhereInput>;
    transition?: Prisma.XOR<Prisma.WorkflowTransitionScalarRelationFilter, Prisma.WorkflowTransitionWhereInput>;
    approver?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type WorkflowApprovalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    workflowInstanceId?: Prisma.SortOrder;
    transitionId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrder;
    levelOrder?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    workflowInstance?: Prisma.WorkflowInstanceOrderByWithRelationInput;
    transition?: Prisma.WorkflowTransitionOrderByWithRelationInput;
    approver?: Prisma.UserOrderByWithRelationInput;
};
export type WorkflowApprovalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    workflowInstanceId_transitionId_approverId?: Prisma.WorkflowApprovalWorkflowInstanceIdTransitionIdApproverIdCompoundUniqueInput;
    AND?: Prisma.WorkflowApprovalWhereInput | Prisma.WorkflowApprovalWhereInput[];
    OR?: Prisma.WorkflowApprovalWhereInput[];
    NOT?: Prisma.WorkflowApprovalWhereInput | Prisma.WorkflowApprovalWhereInput[];
    workflowInstanceId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    transitionId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    approverId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    levelOrder?: Prisma.IntNullableFilter<"WorkflowApproval"> | number | null;
    status?: Prisma.EnumApprovalStatusFilter<"WorkflowApproval"> | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFilter<"WorkflowApproval"> | Date | string;
    decidedAt?: Prisma.DateTimeNullableFilter<"WorkflowApproval"> | Date | string | null;
    comment?: Prisma.StringNullableFilter<"WorkflowApproval"> | string | null;
    workflowInstance?: Prisma.XOR<Prisma.WorkflowInstanceScalarRelationFilter, Prisma.WorkflowInstanceWhereInput>;
    transition?: Prisma.XOR<Prisma.WorkflowTransitionScalarRelationFilter, Prisma.WorkflowTransitionWhereInput>;
    approver?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "workflowInstanceId_transitionId_approverId">;
export type WorkflowApprovalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    workflowInstanceId?: Prisma.SortOrder;
    transitionId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrder;
    levelOrder?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WorkflowApprovalCountOrderByAggregateInput;
    _avg?: Prisma.WorkflowApprovalAvgOrderByAggregateInput;
    _max?: Prisma.WorkflowApprovalMaxOrderByAggregateInput;
    _min?: Prisma.WorkflowApprovalMinOrderByAggregateInput;
    _sum?: Prisma.WorkflowApprovalSumOrderByAggregateInput;
};
export type WorkflowApprovalScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkflowApprovalScalarWhereWithAggregatesInput | Prisma.WorkflowApprovalScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkflowApprovalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkflowApprovalScalarWhereWithAggregatesInput | Prisma.WorkflowApprovalScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkflowApproval"> | string;
    workflowInstanceId?: Prisma.StringWithAggregatesFilter<"WorkflowApproval"> | string;
    transitionId?: Prisma.StringWithAggregatesFilter<"WorkflowApproval"> | string;
    approverId?: Prisma.StringWithAggregatesFilter<"WorkflowApproval"> | string;
    levelOrder?: Prisma.IntNullableWithAggregatesFilter<"WorkflowApproval"> | number | null;
    status?: Prisma.EnumApprovalStatusWithAggregatesFilter<"WorkflowApproval"> | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkflowApproval"> | Date | string;
    decidedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkflowApproval"> | Date | string | null;
    comment?: Prisma.StringNullableWithAggregatesFilter<"WorkflowApproval"> | string | null;
};
export type WorkflowApprovalCreateInput = {
    id?: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
    workflowInstance: Prisma.WorkflowInstanceCreateNestedOneWithoutWorkflowApprovalsInput;
    transition: Prisma.WorkflowTransitionCreateNestedOneWithoutWorkflowApprovalsInput;
    approver: Prisma.UserCreateNestedOneWithoutWorkflowApprovalsInput;
};
export type WorkflowApprovalUncheckedCreateInput = {
    id?: string;
    workflowInstanceId: string;
    transitionId: string;
    approverId: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
};
export type WorkflowApprovalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflowInstance?: Prisma.WorkflowInstanceUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
    transition?: Prisma.WorkflowTransitionUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
    approver?: Prisma.UserUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
};
export type WorkflowApprovalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowInstanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    transitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalCreateManyInput = {
    id?: string;
    workflowInstanceId: string;
    transitionId: string;
    approverId: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
};
export type WorkflowApprovalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowInstanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    transitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalListRelationFilter = {
    every?: Prisma.WorkflowApprovalWhereInput;
    some?: Prisma.WorkflowApprovalWhereInput;
    none?: Prisma.WorkflowApprovalWhereInput;
};
export type WorkflowApprovalOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkflowApprovalWorkflowInstanceIdTransitionIdApproverIdCompoundUniqueInput = {
    workflowInstanceId: string;
    transitionId: string;
    approverId: string;
};
export type WorkflowApprovalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowInstanceId?: Prisma.SortOrder;
    transitionId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrder;
    levelOrder?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
};
export type WorkflowApprovalAvgOrderByAggregateInput = {
    levelOrder?: Prisma.SortOrder;
};
export type WorkflowApprovalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowInstanceId?: Prisma.SortOrder;
    transitionId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrder;
    levelOrder?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
};
export type WorkflowApprovalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowInstanceId?: Prisma.SortOrder;
    transitionId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrder;
    levelOrder?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
};
export type WorkflowApprovalSumOrderByAggregateInput = {
    levelOrder?: Prisma.SortOrder;
};
export type WorkflowApprovalCreateNestedManyWithoutApproverInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutApproverInput, Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput> | Prisma.WorkflowApprovalCreateWithoutApproverInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutApproverInput | Prisma.WorkflowApprovalCreateOrConnectWithoutApproverInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyApproverInputEnvelope;
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
};
export type WorkflowApprovalUncheckedCreateNestedManyWithoutApproverInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutApproverInput, Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput> | Prisma.WorkflowApprovalCreateWithoutApproverInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutApproverInput | Prisma.WorkflowApprovalCreateOrConnectWithoutApproverInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyApproverInputEnvelope;
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
};
export type WorkflowApprovalUpdateManyWithoutApproverNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutApproverInput, Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput> | Prisma.WorkflowApprovalCreateWithoutApproverInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutApproverInput | Prisma.WorkflowApprovalCreateOrConnectWithoutApproverInput[];
    upsert?: Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutApproverInput | Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutApproverInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyApproverInputEnvelope;
    set?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    disconnect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    delete?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    update?: Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutApproverInput | Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutApproverInput[];
    updateMany?: Prisma.WorkflowApprovalUpdateManyWithWhereWithoutApproverInput | Prisma.WorkflowApprovalUpdateManyWithWhereWithoutApproverInput[];
    deleteMany?: Prisma.WorkflowApprovalScalarWhereInput | Prisma.WorkflowApprovalScalarWhereInput[];
};
export type WorkflowApprovalUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutApproverInput, Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput> | Prisma.WorkflowApprovalCreateWithoutApproverInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutApproverInput | Prisma.WorkflowApprovalCreateOrConnectWithoutApproverInput[];
    upsert?: Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutApproverInput | Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutApproverInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyApproverInputEnvelope;
    set?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    disconnect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    delete?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    update?: Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutApproverInput | Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutApproverInput[];
    updateMany?: Prisma.WorkflowApprovalUpdateManyWithWhereWithoutApproverInput | Prisma.WorkflowApprovalUpdateManyWithWhereWithoutApproverInput[];
    deleteMany?: Prisma.WorkflowApprovalScalarWhereInput | Prisma.WorkflowApprovalScalarWhereInput[];
};
export type WorkflowApprovalCreateNestedManyWithoutTransitionInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutTransitionInput, Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput> | Prisma.WorkflowApprovalCreateWithoutTransitionInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutTransitionInput | Prisma.WorkflowApprovalCreateOrConnectWithoutTransitionInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyTransitionInputEnvelope;
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
};
export type WorkflowApprovalUncheckedCreateNestedManyWithoutTransitionInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutTransitionInput, Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput> | Prisma.WorkflowApprovalCreateWithoutTransitionInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutTransitionInput | Prisma.WorkflowApprovalCreateOrConnectWithoutTransitionInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyTransitionInputEnvelope;
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
};
export type WorkflowApprovalUpdateManyWithoutTransitionNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutTransitionInput, Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput> | Prisma.WorkflowApprovalCreateWithoutTransitionInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutTransitionInput | Prisma.WorkflowApprovalCreateOrConnectWithoutTransitionInput[];
    upsert?: Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutTransitionInput | Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutTransitionInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyTransitionInputEnvelope;
    set?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    disconnect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    delete?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    update?: Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutTransitionInput | Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutTransitionInput[];
    updateMany?: Prisma.WorkflowApprovalUpdateManyWithWhereWithoutTransitionInput | Prisma.WorkflowApprovalUpdateManyWithWhereWithoutTransitionInput[];
    deleteMany?: Prisma.WorkflowApprovalScalarWhereInput | Prisma.WorkflowApprovalScalarWhereInput[];
};
export type WorkflowApprovalUncheckedUpdateManyWithoutTransitionNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutTransitionInput, Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput> | Prisma.WorkflowApprovalCreateWithoutTransitionInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutTransitionInput | Prisma.WorkflowApprovalCreateOrConnectWithoutTransitionInput[];
    upsert?: Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutTransitionInput | Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutTransitionInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyTransitionInputEnvelope;
    set?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    disconnect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    delete?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    update?: Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutTransitionInput | Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutTransitionInput[];
    updateMany?: Prisma.WorkflowApprovalUpdateManyWithWhereWithoutTransitionInput | Prisma.WorkflowApprovalUpdateManyWithWhereWithoutTransitionInput[];
    deleteMany?: Prisma.WorkflowApprovalScalarWhereInput | Prisma.WorkflowApprovalScalarWhereInput[];
};
export type WorkflowApprovalCreateNestedManyWithoutWorkflowInstanceInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput, Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput> | Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyWorkflowInstanceInputEnvelope;
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
};
export type WorkflowApprovalUncheckedCreateNestedManyWithoutWorkflowInstanceInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput, Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput> | Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyWorkflowInstanceInputEnvelope;
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
};
export type WorkflowApprovalUpdateManyWithoutWorkflowInstanceNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput, Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput> | Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput[];
    upsert?: Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutWorkflowInstanceInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyWorkflowInstanceInputEnvelope;
    set?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    disconnect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    delete?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    update?: Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutWorkflowInstanceInput[];
    updateMany?: Prisma.WorkflowApprovalUpdateManyWithWhereWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalUpdateManyWithWhereWithoutWorkflowInstanceInput[];
    deleteMany?: Prisma.WorkflowApprovalScalarWhereInput | Prisma.WorkflowApprovalScalarWhereInput[];
};
export type WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput, Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput> | Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput[] | Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput[];
    connectOrCreate?: Prisma.WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput[];
    upsert?: Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalUpsertWithWhereUniqueWithoutWorkflowInstanceInput[];
    createMany?: Prisma.WorkflowApprovalCreateManyWorkflowInstanceInputEnvelope;
    set?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    disconnect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    delete?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    connect?: Prisma.WorkflowApprovalWhereUniqueInput | Prisma.WorkflowApprovalWhereUniqueInput[];
    update?: Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalUpdateWithWhereUniqueWithoutWorkflowInstanceInput[];
    updateMany?: Prisma.WorkflowApprovalUpdateManyWithWhereWithoutWorkflowInstanceInput | Prisma.WorkflowApprovalUpdateManyWithWhereWithoutWorkflowInstanceInput[];
    deleteMany?: Prisma.WorkflowApprovalScalarWhereInput | Prisma.WorkflowApprovalScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumApprovalStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApprovalStatus;
};
export type WorkflowApprovalCreateWithoutApproverInput = {
    id?: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
    workflowInstance: Prisma.WorkflowInstanceCreateNestedOneWithoutWorkflowApprovalsInput;
    transition: Prisma.WorkflowTransitionCreateNestedOneWithoutWorkflowApprovalsInput;
};
export type WorkflowApprovalUncheckedCreateWithoutApproverInput = {
    id?: string;
    workflowInstanceId: string;
    transitionId: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
};
export type WorkflowApprovalCreateOrConnectWithoutApproverInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutApproverInput, Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput>;
};
export type WorkflowApprovalCreateManyApproverInputEnvelope = {
    data: Prisma.WorkflowApprovalCreateManyApproverInput | Prisma.WorkflowApprovalCreateManyApproverInput[];
    skipDuplicates?: boolean;
};
export type WorkflowApprovalUpsertWithWhereUniqueWithoutApproverInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowApprovalUpdateWithoutApproverInput, Prisma.WorkflowApprovalUncheckedUpdateWithoutApproverInput>;
    create: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutApproverInput, Prisma.WorkflowApprovalUncheckedCreateWithoutApproverInput>;
};
export type WorkflowApprovalUpdateWithWhereUniqueWithoutApproverInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateWithoutApproverInput, Prisma.WorkflowApprovalUncheckedUpdateWithoutApproverInput>;
};
export type WorkflowApprovalUpdateManyWithWhereWithoutApproverInput = {
    where: Prisma.WorkflowApprovalScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateManyMutationInput, Prisma.WorkflowApprovalUncheckedUpdateManyWithoutApproverInput>;
};
export type WorkflowApprovalScalarWhereInput = {
    AND?: Prisma.WorkflowApprovalScalarWhereInput | Prisma.WorkflowApprovalScalarWhereInput[];
    OR?: Prisma.WorkflowApprovalScalarWhereInput[];
    NOT?: Prisma.WorkflowApprovalScalarWhereInput | Prisma.WorkflowApprovalScalarWhereInput[];
    id?: Prisma.StringFilter<"WorkflowApproval"> | string;
    workflowInstanceId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    transitionId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    approverId?: Prisma.StringFilter<"WorkflowApproval"> | string;
    levelOrder?: Prisma.IntNullableFilter<"WorkflowApproval"> | number | null;
    status?: Prisma.EnumApprovalStatusFilter<"WorkflowApproval"> | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFilter<"WorkflowApproval"> | Date | string;
    decidedAt?: Prisma.DateTimeNullableFilter<"WorkflowApproval"> | Date | string | null;
    comment?: Prisma.StringNullableFilter<"WorkflowApproval"> | string | null;
};
export type WorkflowApprovalCreateWithoutTransitionInput = {
    id?: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
    workflowInstance: Prisma.WorkflowInstanceCreateNestedOneWithoutWorkflowApprovalsInput;
    approver: Prisma.UserCreateNestedOneWithoutWorkflowApprovalsInput;
};
export type WorkflowApprovalUncheckedCreateWithoutTransitionInput = {
    id?: string;
    workflowInstanceId: string;
    approverId: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
};
export type WorkflowApprovalCreateOrConnectWithoutTransitionInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutTransitionInput, Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput>;
};
export type WorkflowApprovalCreateManyTransitionInputEnvelope = {
    data: Prisma.WorkflowApprovalCreateManyTransitionInput | Prisma.WorkflowApprovalCreateManyTransitionInput[];
    skipDuplicates?: boolean;
};
export type WorkflowApprovalUpsertWithWhereUniqueWithoutTransitionInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowApprovalUpdateWithoutTransitionInput, Prisma.WorkflowApprovalUncheckedUpdateWithoutTransitionInput>;
    create: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutTransitionInput, Prisma.WorkflowApprovalUncheckedCreateWithoutTransitionInput>;
};
export type WorkflowApprovalUpdateWithWhereUniqueWithoutTransitionInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateWithoutTransitionInput, Prisma.WorkflowApprovalUncheckedUpdateWithoutTransitionInput>;
};
export type WorkflowApprovalUpdateManyWithWhereWithoutTransitionInput = {
    where: Prisma.WorkflowApprovalScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateManyMutationInput, Prisma.WorkflowApprovalUncheckedUpdateManyWithoutTransitionInput>;
};
export type WorkflowApprovalCreateWithoutWorkflowInstanceInput = {
    id?: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
    transition: Prisma.WorkflowTransitionCreateNestedOneWithoutWorkflowApprovalsInput;
    approver: Prisma.UserCreateNestedOneWithoutWorkflowApprovalsInput;
};
export type WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput = {
    id?: string;
    transitionId: string;
    approverId: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
};
export type WorkflowApprovalCreateOrConnectWithoutWorkflowInstanceInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput, Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput>;
};
export type WorkflowApprovalCreateManyWorkflowInstanceInputEnvelope = {
    data: Prisma.WorkflowApprovalCreateManyWorkflowInstanceInput | Prisma.WorkflowApprovalCreateManyWorkflowInstanceInput[];
    skipDuplicates?: boolean;
};
export type WorkflowApprovalUpsertWithWhereUniqueWithoutWorkflowInstanceInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowApprovalUpdateWithoutWorkflowInstanceInput, Prisma.WorkflowApprovalUncheckedUpdateWithoutWorkflowInstanceInput>;
    create: Prisma.XOR<Prisma.WorkflowApprovalCreateWithoutWorkflowInstanceInput, Prisma.WorkflowApprovalUncheckedCreateWithoutWorkflowInstanceInput>;
};
export type WorkflowApprovalUpdateWithWhereUniqueWithoutWorkflowInstanceInput = {
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateWithoutWorkflowInstanceInput, Prisma.WorkflowApprovalUncheckedUpdateWithoutWorkflowInstanceInput>;
};
export type WorkflowApprovalUpdateManyWithWhereWithoutWorkflowInstanceInput = {
    where: Prisma.WorkflowApprovalScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateManyMutationInput, Prisma.WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceInput>;
};
export type WorkflowApprovalCreateManyApproverInput = {
    id?: string;
    workflowInstanceId: string;
    transitionId: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
};
export type WorkflowApprovalUpdateWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflowInstance?: Prisma.WorkflowInstanceUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
    transition?: Prisma.WorkflowTransitionUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
};
export type WorkflowApprovalUncheckedUpdateWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowInstanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    transitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalUncheckedUpdateManyWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowInstanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    transitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalCreateManyTransitionInput = {
    id?: string;
    workflowInstanceId: string;
    approverId: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
};
export type WorkflowApprovalUpdateWithoutTransitionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflowInstance?: Prisma.WorkflowInstanceUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
    approver?: Prisma.UserUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
};
export type WorkflowApprovalUncheckedUpdateWithoutTransitionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowInstanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalUncheckedUpdateManyWithoutTransitionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowInstanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalCreateManyWorkflowInstanceInput = {
    id?: string;
    transitionId: string;
    approverId: string;
    levelOrder?: number | null;
    status?: $Enums.ApprovalStatus;
    requestedAt?: Date | string;
    decidedAt?: Date | string | null;
    comment?: string | null;
};
export type WorkflowApprovalUpdateWithoutWorkflowInstanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transition?: Prisma.WorkflowTransitionUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
    approver?: Prisma.UserUpdateOneRequiredWithoutWorkflowApprovalsNestedInput;
};
export type WorkflowApprovalUncheckedUpdateWithoutWorkflowInstanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.StringFieldUpdateOperationsInput | string;
    levelOrder?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowApprovalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowInstanceId?: boolean;
    transitionId?: boolean;
    approverId?: boolean;
    levelOrder?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    decidedAt?: boolean;
    comment?: boolean;
    workflowInstance?: boolean | Prisma.WorkflowInstanceDefaultArgs<ExtArgs>;
    transition?: boolean | Prisma.WorkflowTransitionDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowApproval"]>;
export type WorkflowApprovalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowInstanceId?: boolean;
    transitionId?: boolean;
    approverId?: boolean;
    levelOrder?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    decidedAt?: boolean;
    comment?: boolean;
    workflowInstance?: boolean | Prisma.WorkflowInstanceDefaultArgs<ExtArgs>;
    transition?: boolean | Prisma.WorkflowTransitionDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowApproval"]>;
export type WorkflowApprovalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowInstanceId?: boolean;
    transitionId?: boolean;
    approverId?: boolean;
    levelOrder?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    decidedAt?: boolean;
    comment?: boolean;
    workflowInstance?: boolean | Prisma.WorkflowInstanceDefaultArgs<ExtArgs>;
    transition?: boolean | Prisma.WorkflowTransitionDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowApproval"]>;
export type WorkflowApprovalSelectScalar = {
    id?: boolean;
    workflowInstanceId?: boolean;
    transitionId?: boolean;
    approverId?: boolean;
    levelOrder?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    decidedAt?: boolean;
    comment?: boolean;
};
export type WorkflowApprovalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "workflowInstanceId" | "transitionId" | "approverId" | "levelOrder" | "status" | "requestedAt" | "decidedAt" | "comment", ExtArgs["result"]["workflowApproval"]>;
export type WorkflowApprovalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workflowInstance?: boolean | Prisma.WorkflowInstanceDefaultArgs<ExtArgs>;
    transition?: boolean | Prisma.WorkflowTransitionDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WorkflowApprovalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workflowInstance?: boolean | Prisma.WorkflowInstanceDefaultArgs<ExtArgs>;
    transition?: boolean | Prisma.WorkflowTransitionDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WorkflowApprovalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workflowInstance?: boolean | Prisma.WorkflowInstanceDefaultArgs<ExtArgs>;
    transition?: boolean | Prisma.WorkflowTransitionDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $WorkflowApprovalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkflowApproval";
    objects: {
        workflowInstance: Prisma.$WorkflowInstancePayload<ExtArgs>;
        transition: Prisma.$WorkflowTransitionPayload<ExtArgs>;
        approver: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        workflowInstanceId: string;
        transitionId: string;
        approverId: string;
        levelOrder: number | null;
        status: $Enums.ApprovalStatus;
        requestedAt: Date;
        decidedAt: Date | null;
        comment: string | null;
    }, ExtArgs["result"]["workflowApproval"]>;
    composites: {};
};
export type WorkflowApprovalGetPayload<S extends boolean | null | undefined | WorkflowApprovalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload, S>;
export type WorkflowApprovalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkflowApprovalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkflowApprovalCountAggregateInputType | true;
};
export interface WorkflowApprovalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkflowApproval'];
        meta: {
            name: 'WorkflowApproval';
        };
    };
    /**
     * Find zero or one WorkflowApproval that matches the filter.
     * @param {WorkflowApprovalFindUniqueArgs} args - Arguments to find a WorkflowApproval
     * @example
     * // Get one WorkflowApproval
     * const workflowApproval = await prisma.workflowApproval.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowApprovalFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkflowApprovalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkflowApprovalClient<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one WorkflowApproval that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowApprovalFindUniqueOrThrowArgs} args - Arguments to find a WorkflowApproval
     * @example
     * // Get one WorkflowApproval
     * const workflowApproval = await prisma.workflowApproval.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowApprovalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkflowApprovalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowApprovalClient<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkflowApproval that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowApprovalFindFirstArgs} args - Arguments to find a WorkflowApproval
     * @example
     * // Get one WorkflowApproval
     * const workflowApproval = await prisma.workflowApproval.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowApprovalFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkflowApprovalFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkflowApprovalClient<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkflowApproval that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowApprovalFindFirstOrThrowArgs} args - Arguments to find a WorkflowApproval
     * @example
     * // Get one WorkflowApproval
     * const workflowApproval = await prisma.workflowApproval.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowApprovalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkflowApprovalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowApprovalClient<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more WorkflowApprovals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowApprovalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowApprovals
     * const workflowApprovals = await prisma.workflowApproval.findMany()
     *
     * // Get first 10 WorkflowApprovals
     * const workflowApprovals = await prisma.workflowApproval.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const workflowApprovalWithIdOnly = await prisma.workflowApproval.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WorkflowApprovalFindManyArgs>(args?: Prisma.SelectSubset<T, WorkflowApprovalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a WorkflowApproval.
     * @param {WorkflowApprovalCreateArgs} args - Arguments to create a WorkflowApproval.
     * @example
     * // Create one WorkflowApproval
     * const WorkflowApproval = await prisma.workflowApproval.create({
     *   data: {
     *     // ... data to create a WorkflowApproval
     *   }
     * })
     *
     */
    create<T extends WorkflowApprovalCreateArgs>(args: Prisma.SelectSubset<T, WorkflowApprovalCreateArgs<ExtArgs>>): Prisma.Prisma__WorkflowApprovalClient<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many WorkflowApprovals.
     * @param {WorkflowApprovalCreateManyArgs} args - Arguments to create many WorkflowApprovals.
     * @example
     * // Create many WorkflowApprovals
     * const workflowApproval = await prisma.workflowApproval.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WorkflowApprovalCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkflowApprovalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many WorkflowApprovals and returns the data saved in the database.
     * @param {WorkflowApprovalCreateManyAndReturnArgs} args - Arguments to create many WorkflowApprovals.
     * @example
     * // Create many WorkflowApprovals
     * const workflowApproval = await prisma.workflowApproval.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WorkflowApprovals and only return the `id`
     * const workflowApprovalWithIdOnly = await prisma.workflowApproval.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WorkflowApprovalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkflowApprovalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a WorkflowApproval.
     * @param {WorkflowApprovalDeleteArgs} args - Arguments to delete one WorkflowApproval.
     * @example
     * // Delete one WorkflowApproval
     * const WorkflowApproval = await prisma.workflowApproval.delete({
     *   where: {
     *     // ... filter to delete one WorkflowApproval
     *   }
     * })
     *
     */
    delete<T extends WorkflowApprovalDeleteArgs>(args: Prisma.SelectSubset<T, WorkflowApprovalDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkflowApprovalClient<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one WorkflowApproval.
     * @param {WorkflowApprovalUpdateArgs} args - Arguments to update one WorkflowApproval.
     * @example
     * // Update one WorkflowApproval
     * const workflowApproval = await prisma.workflowApproval.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WorkflowApprovalUpdateArgs>(args: Prisma.SelectSubset<T, WorkflowApprovalUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkflowApprovalClient<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more WorkflowApprovals.
     * @param {WorkflowApprovalDeleteManyArgs} args - Arguments to filter WorkflowApprovals to delete.
     * @example
     * // Delete a few WorkflowApprovals
     * const { count } = await prisma.workflowApproval.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WorkflowApprovalDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkflowApprovalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkflowApprovals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowApprovalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowApprovals
     * const workflowApproval = await prisma.workflowApproval.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WorkflowApprovalUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkflowApprovalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkflowApprovals and returns the data updated in the database.
     * @param {WorkflowApprovalUpdateManyAndReturnArgs} args - Arguments to update many WorkflowApprovals.
     * @example
     * // Update many WorkflowApprovals
     * const workflowApproval = await prisma.workflowApproval.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WorkflowApprovals and only return the `id`
     * const workflowApprovalWithIdOnly = await prisma.workflowApproval.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkflowApprovalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkflowApprovalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one WorkflowApproval.
     * @param {WorkflowApprovalUpsertArgs} args - Arguments to update or create a WorkflowApproval.
     * @example
     * // Update or create a WorkflowApproval
     * const workflowApproval = await prisma.workflowApproval.upsert({
     *   create: {
     *     // ... data to create a WorkflowApproval
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowApproval we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowApprovalUpsertArgs>(args: Prisma.SelectSubset<T, WorkflowApprovalUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkflowApprovalClient<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of WorkflowApprovals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowApprovalCountArgs} args - Arguments to filter WorkflowApprovals to count.
     * @example
     * // Count the number of WorkflowApprovals
     * const count = await prisma.workflowApproval.count({
     *   where: {
     *     // ... the filter for the WorkflowApprovals we want to count
     *   }
     * })
    **/
    count<T extends WorkflowApprovalCountArgs>(args?: Prisma.Subset<T, WorkflowApprovalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkflowApprovalCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a WorkflowApproval.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowApprovalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowApprovalAggregateArgs>(args: Prisma.Subset<T, WorkflowApprovalAggregateArgs>): Prisma.PrismaPromise<GetWorkflowApprovalAggregateType<T>>;
    /**
     * Group by WorkflowApproval.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowApprovalGroupByArgs} args - Group by arguments.
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
    groupBy<T extends WorkflowApprovalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkflowApprovalGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkflowApprovalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkflowApprovalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowApprovalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WorkflowApproval model
     */
    readonly fields: WorkflowApprovalFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for WorkflowApproval.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__WorkflowApprovalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workflowInstance<T extends Prisma.WorkflowInstanceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowInstanceDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transition<T extends Prisma.WorkflowTransitionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowTransitionDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkflowTransitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    approver<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the WorkflowApproval model
 */
export interface WorkflowApprovalFieldRefs {
    readonly id: Prisma.FieldRef<"WorkflowApproval", 'String'>;
    readonly workflowInstanceId: Prisma.FieldRef<"WorkflowApproval", 'String'>;
    readonly transitionId: Prisma.FieldRef<"WorkflowApproval", 'String'>;
    readonly approverId: Prisma.FieldRef<"WorkflowApproval", 'String'>;
    readonly levelOrder: Prisma.FieldRef<"WorkflowApproval", 'Int'>;
    readonly status: Prisma.FieldRef<"WorkflowApproval", 'ApprovalStatus'>;
    readonly requestedAt: Prisma.FieldRef<"WorkflowApproval", 'DateTime'>;
    readonly decidedAt: Prisma.FieldRef<"WorkflowApproval", 'DateTime'>;
    readonly comment: Prisma.FieldRef<"WorkflowApproval", 'String'>;
}
/**
 * WorkflowApproval findUnique
 */
export type WorkflowApprovalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowApproval to fetch.
     */
    where: Prisma.WorkflowApprovalWhereUniqueInput;
};
/**
 * WorkflowApproval findUniqueOrThrow
 */
export type WorkflowApprovalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowApproval to fetch.
     */
    where: Prisma.WorkflowApprovalWhereUniqueInput;
};
/**
 * WorkflowApproval findFirst
 */
export type WorkflowApprovalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowApproval to fetch.
     */
    where?: Prisma.WorkflowApprovalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkflowApprovals to fetch.
     */
    orderBy?: Prisma.WorkflowApprovalOrderByWithRelationInput | Prisma.WorkflowApprovalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkflowApprovals.
     */
    cursor?: Prisma.WorkflowApprovalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkflowApprovals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkflowApprovals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkflowApprovals.
     */
    distinct?: Prisma.WorkflowApprovalScalarFieldEnum | Prisma.WorkflowApprovalScalarFieldEnum[];
};
/**
 * WorkflowApproval findFirstOrThrow
 */
export type WorkflowApprovalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowApproval to fetch.
     */
    where?: Prisma.WorkflowApprovalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkflowApprovals to fetch.
     */
    orderBy?: Prisma.WorkflowApprovalOrderByWithRelationInput | Prisma.WorkflowApprovalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkflowApprovals.
     */
    cursor?: Prisma.WorkflowApprovalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkflowApprovals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkflowApprovals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkflowApprovals.
     */
    distinct?: Prisma.WorkflowApprovalScalarFieldEnum | Prisma.WorkflowApprovalScalarFieldEnum[];
};
/**
 * WorkflowApproval findMany
 */
export type WorkflowApprovalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowApprovals to fetch.
     */
    where?: Prisma.WorkflowApprovalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkflowApprovals to fetch.
     */
    orderBy?: Prisma.WorkflowApprovalOrderByWithRelationInput | Prisma.WorkflowApprovalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WorkflowApprovals.
     */
    cursor?: Prisma.WorkflowApprovalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkflowApprovals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkflowApprovals.
     */
    skip?: number;
    distinct?: Prisma.WorkflowApprovalScalarFieldEnum | Prisma.WorkflowApprovalScalarFieldEnum[];
};
/**
 * WorkflowApproval create
 */
export type WorkflowApprovalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * The data needed to create a WorkflowApproval.
     */
    data: Prisma.XOR<Prisma.WorkflowApprovalCreateInput, Prisma.WorkflowApprovalUncheckedCreateInput>;
};
/**
 * WorkflowApproval createMany
 */
export type WorkflowApprovalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowApprovals.
     */
    data: Prisma.WorkflowApprovalCreateManyInput | Prisma.WorkflowApprovalCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * WorkflowApproval createManyAndReturn
 */
export type WorkflowApprovalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * The data used to create many WorkflowApprovals.
     */
    data: Prisma.WorkflowApprovalCreateManyInput | Prisma.WorkflowApprovalCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * WorkflowApproval update
 */
export type WorkflowApprovalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * The data needed to update a WorkflowApproval.
     */
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateInput, Prisma.WorkflowApprovalUncheckedUpdateInput>;
    /**
     * Choose, which WorkflowApproval to update.
     */
    where: Prisma.WorkflowApprovalWhereUniqueInput;
};
/**
 * WorkflowApproval updateMany
 */
export type WorkflowApprovalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowApprovals.
     */
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateManyMutationInput, Prisma.WorkflowApprovalUncheckedUpdateManyInput>;
    /**
     * Filter which WorkflowApprovals to update
     */
    where?: Prisma.WorkflowApprovalWhereInput;
    /**
     * Limit how many WorkflowApprovals to update.
     */
    limit?: number;
};
/**
 * WorkflowApproval updateManyAndReturn
 */
export type WorkflowApprovalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * The data used to update WorkflowApprovals.
     */
    data: Prisma.XOR<Prisma.WorkflowApprovalUpdateManyMutationInput, Prisma.WorkflowApprovalUncheckedUpdateManyInput>;
    /**
     * Filter which WorkflowApprovals to update
     */
    where?: Prisma.WorkflowApprovalWhereInput;
    /**
     * Limit how many WorkflowApprovals to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * WorkflowApproval upsert
 */
export type WorkflowApprovalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * The filter to search for the WorkflowApproval to update in case it exists.
     */
    where: Prisma.WorkflowApprovalWhereUniqueInput;
    /**
     * In case the WorkflowApproval found by the `where` argument doesn't exist, create a new WorkflowApproval with this data.
     */
    create: Prisma.XOR<Prisma.WorkflowApprovalCreateInput, Prisma.WorkflowApprovalUncheckedCreateInput>;
    /**
     * In case the WorkflowApproval was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.WorkflowApprovalUpdateInput, Prisma.WorkflowApprovalUncheckedUpdateInput>;
};
/**
 * WorkflowApproval delete
 */
export type WorkflowApprovalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
    /**
     * Filter which WorkflowApproval to delete.
     */
    where: Prisma.WorkflowApprovalWhereUniqueInput;
};
/**
 * WorkflowApproval deleteMany
 */
export type WorkflowApprovalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowApprovals to delete
     */
    where?: Prisma.WorkflowApprovalWhereInput;
    /**
     * Limit how many WorkflowApprovals to delete.
     */
    limit?: number;
};
/**
 * WorkflowApproval without action
 */
export type WorkflowApprovalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowApproval
     */
    select?: Prisma.WorkflowApprovalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowApproval
     */
    omit?: Prisma.WorkflowApprovalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowApprovalInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=WorkflowApproval.d.ts.map