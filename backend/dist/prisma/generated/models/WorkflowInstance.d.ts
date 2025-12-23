import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model WorkflowInstance
 *
 */
export type WorkflowInstanceModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkflowInstancePayload>;
export type AggregateWorkflowInstance = {
    _count: WorkflowInstanceCountAggregateOutputType | null;
    _min: WorkflowInstanceMinAggregateOutputType | null;
    _max: WorkflowInstanceMaxAggregateOutputType | null;
};
export type WorkflowInstanceMinAggregateOutputType = {
    id: string | null;
    workflowId: string | null;
    resourceType: string | null;
    resourceId: string | null;
    currentStageId: string | null;
    status: $Enums.WorkflowInstanceStatus | null;
    startedAt: Date | null;
    endedAt: Date | null;
    endedReason: string | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    startedById: string | null;
    lockedAt: Date | null;
    lockedBy: string | null;
};
export type WorkflowInstanceMaxAggregateOutputType = {
    id: string | null;
    workflowId: string | null;
    resourceType: string | null;
    resourceId: string | null;
    currentStageId: string | null;
    status: $Enums.WorkflowInstanceStatus | null;
    startedAt: Date | null;
    endedAt: Date | null;
    endedReason: string | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    startedById: string | null;
    lockedAt: Date | null;
    lockedBy: string | null;
};
export type WorkflowInstanceCountAggregateOutputType = {
    id: number;
    workflowId: number;
    resourceType: number;
    resourceId: number;
    currentStageId: number;
    status: number;
    startedAt: number;
    endedAt: number;
    endedReason: number;
    errorDetails: number;
    createdById: number;
    createdAt: number;
    updatedAt: number;
    startedById: number;
    lockedAt: number;
    lockedBy: number;
    _all: number;
};
export type WorkflowInstanceMinAggregateInputType = {
    id?: true;
    workflowId?: true;
    resourceType?: true;
    resourceId?: true;
    currentStageId?: true;
    status?: true;
    startedAt?: true;
    endedAt?: true;
    endedReason?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    startedById?: true;
    lockedAt?: true;
    lockedBy?: true;
};
export type WorkflowInstanceMaxAggregateInputType = {
    id?: true;
    workflowId?: true;
    resourceType?: true;
    resourceId?: true;
    currentStageId?: true;
    status?: true;
    startedAt?: true;
    endedAt?: true;
    endedReason?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    startedById?: true;
    lockedAt?: true;
    lockedBy?: true;
};
export type WorkflowInstanceCountAggregateInputType = {
    id?: true;
    workflowId?: true;
    resourceType?: true;
    resourceId?: true;
    currentStageId?: true;
    status?: true;
    startedAt?: true;
    endedAt?: true;
    endedReason?: true;
    errorDetails?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    startedById?: true;
    lockedAt?: true;
    lockedBy?: true;
    _all?: true;
};
export type WorkflowInstanceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowInstance to aggregate.
     */
    where?: Prisma.WorkflowInstanceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkflowInstances to fetch.
     */
    orderBy?: Prisma.WorkflowInstanceOrderByWithRelationInput | Prisma.WorkflowInstanceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.WorkflowInstanceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkflowInstances from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkflowInstances.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WorkflowInstances
    **/
    _count?: true | WorkflowInstanceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowInstanceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowInstanceMaxAggregateInputType;
};
export type GetWorkflowInstanceAggregateType<T extends WorkflowInstanceAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkflowInstance]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkflowInstance[P]> : Prisma.GetScalarType<T[P], AggregateWorkflowInstance[P]>;
};
export type WorkflowInstanceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowInstanceWhereInput;
    orderBy?: Prisma.WorkflowInstanceOrderByWithAggregationInput | Prisma.WorkflowInstanceOrderByWithAggregationInput[];
    by: Prisma.WorkflowInstanceScalarFieldEnum[] | Prisma.WorkflowInstanceScalarFieldEnum;
    having?: Prisma.WorkflowInstanceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkflowInstanceCountAggregateInputType | true;
    _min?: WorkflowInstanceMinAggregateInputType;
    _max?: WorkflowInstanceMaxAggregateInputType;
};
export type WorkflowInstanceGroupByOutputType = {
    id: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId: string | null;
    status: $Enums.WorkflowInstanceStatus;
    startedAt: Date;
    endedAt: Date | null;
    endedReason: string | null;
    errorDetails: runtime.JsonValue | null;
    createdById: string | null;
    createdAt: Date;
    updatedAt: Date;
    startedById: string | null;
    lockedAt: Date | null;
    lockedBy: string | null;
    _count: WorkflowInstanceCountAggregateOutputType | null;
    _min: WorkflowInstanceMinAggregateOutputType | null;
    _max: WorkflowInstanceMaxAggregateOutputType | null;
};
type GetWorkflowInstanceGroupByPayload<T extends WorkflowInstanceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkflowInstanceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkflowInstanceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkflowInstanceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkflowInstanceGroupByOutputType[P]>;
}>>;
export type WorkflowInstanceWhereInput = {
    AND?: Prisma.WorkflowInstanceWhereInput | Prisma.WorkflowInstanceWhereInput[];
    OR?: Prisma.WorkflowInstanceWhereInput[];
    NOT?: Prisma.WorkflowInstanceWhereInput | Prisma.WorkflowInstanceWhereInput[];
    id?: Prisma.StringFilter<"WorkflowInstance"> | string;
    workflowId?: Prisma.StringFilter<"WorkflowInstance"> | string;
    resourceType?: Prisma.StringFilter<"WorkflowInstance"> | string;
    resourceId?: Prisma.StringFilter<"WorkflowInstance"> | string;
    currentStageId?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFilter<"WorkflowInstance"> | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    endedAt?: Prisma.DateTimeNullableFilter<"WorkflowInstance"> | Date | string | null;
    endedReason?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    errorDetails?: Prisma.JsonNullableFilter<"WorkflowInstance">;
    createdById?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    startedById?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    lockedAt?: Prisma.DateTimeNullableFilter<"WorkflowInstance"> | Date | string | null;
    lockedBy?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    createdBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    startedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    workflow?: Prisma.XOR<Prisma.WorkflowDefinitionScalarRelationFilter, Prisma.WorkflowDefinitionWhereInput>;
    currentStage?: Prisma.XOR<Prisma.WorkflowStageNullableScalarRelationFilter, Prisma.WorkflowStageWhereInput> | null;
    histories?: Prisma.WorkflowHistoryListRelationFilter;
    tasks?: Prisma.TaskListRelationFilter;
    workflowApprovals?: Prisma.WorkflowApprovalListRelationFilter;
};
export type WorkflowInstanceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    currentStageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorDetails?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    startedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    lockedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lockedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    startedBy?: Prisma.UserOrderByWithRelationInput;
    workflow?: Prisma.WorkflowDefinitionOrderByWithRelationInput;
    currentStage?: Prisma.WorkflowStageOrderByWithRelationInput;
    histories?: Prisma.WorkflowHistoryOrderByRelationAggregateInput;
    tasks?: Prisma.TaskOrderByRelationAggregateInput;
    workflowApprovals?: Prisma.WorkflowApprovalOrderByRelationAggregateInput;
};
export type WorkflowInstanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WorkflowInstanceWhereInput | Prisma.WorkflowInstanceWhereInput[];
    OR?: Prisma.WorkflowInstanceWhereInput[];
    NOT?: Prisma.WorkflowInstanceWhereInput | Prisma.WorkflowInstanceWhereInput[];
    workflowId?: Prisma.StringFilter<"WorkflowInstance"> | string;
    resourceType?: Prisma.StringFilter<"WorkflowInstance"> | string;
    resourceId?: Prisma.StringFilter<"WorkflowInstance"> | string;
    currentStageId?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFilter<"WorkflowInstance"> | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    endedAt?: Prisma.DateTimeNullableFilter<"WorkflowInstance"> | Date | string | null;
    endedReason?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    errorDetails?: Prisma.JsonNullableFilter<"WorkflowInstance">;
    createdById?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    startedById?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    lockedAt?: Prisma.DateTimeNullableFilter<"WorkflowInstance"> | Date | string | null;
    lockedBy?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    createdBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    startedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    workflow?: Prisma.XOR<Prisma.WorkflowDefinitionScalarRelationFilter, Prisma.WorkflowDefinitionWhereInput>;
    currentStage?: Prisma.XOR<Prisma.WorkflowStageNullableScalarRelationFilter, Prisma.WorkflowStageWhereInput> | null;
    histories?: Prisma.WorkflowHistoryListRelationFilter;
    tasks?: Prisma.TaskListRelationFilter;
    workflowApprovals?: Prisma.WorkflowApprovalListRelationFilter;
}, "id">;
export type WorkflowInstanceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    currentStageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorDetails?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    startedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    lockedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lockedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WorkflowInstanceCountOrderByAggregateInput;
    _max?: Prisma.WorkflowInstanceMaxOrderByAggregateInput;
    _min?: Prisma.WorkflowInstanceMinOrderByAggregateInput;
};
export type WorkflowInstanceScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkflowInstanceScalarWhereWithAggregatesInput | Prisma.WorkflowInstanceScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkflowInstanceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkflowInstanceScalarWhereWithAggregatesInput | Prisma.WorkflowInstanceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkflowInstance"> | string;
    workflowId?: Prisma.StringWithAggregatesFilter<"WorkflowInstance"> | string;
    resourceType?: Prisma.StringWithAggregatesFilter<"WorkflowInstance"> | string;
    resourceId?: Prisma.StringWithAggregatesFilter<"WorkflowInstance"> | string;
    currentStageId?: Prisma.StringNullableWithAggregatesFilter<"WorkflowInstance"> | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusWithAggregatesFilter<"WorkflowInstance"> | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkflowInstance"> | Date | string;
    endedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkflowInstance"> | Date | string | null;
    endedReason?: Prisma.StringNullableWithAggregatesFilter<"WorkflowInstance"> | string | null;
    errorDetails?: Prisma.JsonNullableWithAggregatesFilter<"WorkflowInstance">;
    createdById?: Prisma.StringNullableWithAggregatesFilter<"WorkflowInstance"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkflowInstance"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkflowInstance"> | Date | string;
    startedById?: Prisma.StringNullableWithAggregatesFilter<"WorkflowInstance"> | string | null;
    lockedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkflowInstance"> | Date | string | null;
    lockedBy?: Prisma.StringNullableWithAggregatesFilter<"WorkflowInstance"> | string | null;
};
export type WorkflowInstanceCreateInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkflowInstancesInput;
    startedBy?: Prisma.UserCreateNestedOneWithoutStartedWorkflowsInput;
    workflow: Prisma.WorkflowDefinitionCreateNestedOneWithoutInstancesInput;
    currentStage?: Prisma.WorkflowStageCreateNestedOneWithoutInstancesInput;
    histories?: Prisma.WorkflowHistoryCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUncheckedCreateInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    histories?: Prisma.WorkflowHistoryUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedWorkflowInstancesNestedInput;
    startedBy?: Prisma.UserUpdateOneWithoutStartedWorkflowsNestedInput;
    workflow?: Prisma.WorkflowDefinitionUpdateOneRequiredWithoutInstancesNestedInput;
    currentStage?: Prisma.WorkflowStageUpdateOneWithoutInstancesNestedInput;
    histories?: Prisma.WorkflowHistoryUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    histories?: Prisma.WorkflowHistoryUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceCreateManyInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
};
export type WorkflowInstanceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowInstanceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowInstanceListRelationFilter = {
    every?: Prisma.WorkflowInstanceWhereInput;
    some?: Prisma.WorkflowInstanceWhereInput;
    none?: Prisma.WorkflowInstanceWhereInput;
};
export type WorkflowInstanceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkflowInstanceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    currentStageId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    endedReason?: Prisma.SortOrder;
    errorDetails?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    startedById?: Prisma.SortOrder;
    lockedAt?: Prisma.SortOrder;
    lockedBy?: Prisma.SortOrder;
};
export type WorkflowInstanceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    currentStageId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    endedReason?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    startedById?: Prisma.SortOrder;
    lockedAt?: Prisma.SortOrder;
    lockedBy?: Prisma.SortOrder;
};
export type WorkflowInstanceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    currentStageId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    endedReason?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    startedById?: Prisma.SortOrder;
    lockedAt?: Prisma.SortOrder;
    lockedBy?: Prisma.SortOrder;
};
export type WorkflowInstanceScalarRelationFilter = {
    is?: Prisma.WorkflowInstanceWhereInput;
    isNot?: Prisma.WorkflowInstanceWhereInput;
};
export type WorkflowInstanceCreateNestedManyWithoutStartedByInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutStartedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput> | Prisma.WorkflowInstanceCreateWithoutStartedByInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutStartedByInput | Prisma.WorkflowInstanceCreateOrConnectWithoutStartedByInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyStartedByInputEnvelope;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
};
export type WorkflowInstanceCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCreatedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput> | Prisma.WorkflowInstanceCreateWithoutCreatedByInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutCreatedByInput | Prisma.WorkflowInstanceCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyCreatedByInputEnvelope;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
};
export type WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutStartedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput> | Prisma.WorkflowInstanceCreateWithoutStartedByInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutStartedByInput | Prisma.WorkflowInstanceCreateOrConnectWithoutStartedByInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyStartedByInputEnvelope;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
};
export type WorkflowInstanceUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCreatedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput> | Prisma.WorkflowInstanceCreateWithoutCreatedByInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutCreatedByInput | Prisma.WorkflowInstanceCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyCreatedByInputEnvelope;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
};
export type WorkflowInstanceUpdateManyWithoutStartedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutStartedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput> | Prisma.WorkflowInstanceCreateWithoutStartedByInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutStartedByInput | Prisma.WorkflowInstanceCreateOrConnectWithoutStartedByInput[];
    upsert?: Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutStartedByInput | Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutStartedByInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyStartedByInputEnvelope;
    set?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    disconnect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    delete?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    update?: Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutStartedByInput | Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutStartedByInput[];
    updateMany?: Prisma.WorkflowInstanceUpdateManyWithWhereWithoutStartedByInput | Prisma.WorkflowInstanceUpdateManyWithWhereWithoutStartedByInput[];
    deleteMany?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
};
export type WorkflowInstanceUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCreatedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput> | Prisma.WorkflowInstanceCreateWithoutCreatedByInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutCreatedByInput | Prisma.WorkflowInstanceCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyCreatedByInputEnvelope;
    set?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    disconnect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    delete?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    update?: Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.WorkflowInstanceUpdateManyWithWhereWithoutCreatedByInput | Prisma.WorkflowInstanceUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
};
export type WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutStartedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput> | Prisma.WorkflowInstanceCreateWithoutStartedByInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutStartedByInput | Prisma.WorkflowInstanceCreateOrConnectWithoutStartedByInput[];
    upsert?: Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutStartedByInput | Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutStartedByInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyStartedByInputEnvelope;
    set?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    disconnect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    delete?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    update?: Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutStartedByInput | Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutStartedByInput[];
    updateMany?: Prisma.WorkflowInstanceUpdateManyWithWhereWithoutStartedByInput | Prisma.WorkflowInstanceUpdateManyWithWhereWithoutStartedByInput[];
    deleteMany?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
};
export type WorkflowInstanceUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCreatedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput> | Prisma.WorkflowInstanceCreateWithoutCreatedByInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutCreatedByInput | Prisma.WorkflowInstanceCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyCreatedByInputEnvelope;
    set?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    disconnect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    delete?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    update?: Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.WorkflowInstanceUpdateManyWithWhereWithoutCreatedByInput | Prisma.WorkflowInstanceUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
};
export type WorkflowInstanceCreateNestedManyWithoutWorkflowInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput> | Prisma.WorkflowInstanceCreateWithoutWorkflowInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowInput | Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyWorkflowInputEnvelope;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
};
export type WorkflowInstanceUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput> | Prisma.WorkflowInstanceCreateWithoutWorkflowInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowInput | Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyWorkflowInputEnvelope;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
};
export type WorkflowInstanceUpdateManyWithoutWorkflowNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput> | Prisma.WorkflowInstanceCreateWithoutWorkflowInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowInput | Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowInput[];
    upsert?: Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutWorkflowInput | Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutWorkflowInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyWorkflowInputEnvelope;
    set?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    disconnect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    delete?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    update?: Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutWorkflowInput | Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutWorkflowInput[];
    updateMany?: Prisma.WorkflowInstanceUpdateManyWithWhereWithoutWorkflowInput | Prisma.WorkflowInstanceUpdateManyWithWhereWithoutWorkflowInput[];
    deleteMany?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
};
export type WorkflowInstanceUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput> | Prisma.WorkflowInstanceCreateWithoutWorkflowInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowInput | Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowInput[];
    upsert?: Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutWorkflowInput | Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutWorkflowInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyWorkflowInputEnvelope;
    set?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    disconnect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    delete?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    update?: Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutWorkflowInput | Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutWorkflowInput[];
    updateMany?: Prisma.WorkflowInstanceUpdateManyWithWhereWithoutWorkflowInput | Prisma.WorkflowInstanceUpdateManyWithWhereWithoutWorkflowInput[];
    deleteMany?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
};
export type WorkflowInstanceCreateNestedManyWithoutCurrentStageInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCurrentStageInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput> | Prisma.WorkflowInstanceCreateWithoutCurrentStageInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutCurrentStageInput | Prisma.WorkflowInstanceCreateOrConnectWithoutCurrentStageInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyCurrentStageInputEnvelope;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
};
export type WorkflowInstanceUncheckedCreateNestedManyWithoutCurrentStageInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCurrentStageInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput> | Prisma.WorkflowInstanceCreateWithoutCurrentStageInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutCurrentStageInput | Prisma.WorkflowInstanceCreateOrConnectWithoutCurrentStageInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyCurrentStageInputEnvelope;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
};
export type WorkflowInstanceUpdateManyWithoutCurrentStageNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCurrentStageInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput> | Prisma.WorkflowInstanceCreateWithoutCurrentStageInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutCurrentStageInput | Prisma.WorkflowInstanceCreateOrConnectWithoutCurrentStageInput[];
    upsert?: Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutCurrentStageInput | Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutCurrentStageInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyCurrentStageInputEnvelope;
    set?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    disconnect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    delete?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    update?: Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutCurrentStageInput | Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutCurrentStageInput[];
    updateMany?: Prisma.WorkflowInstanceUpdateManyWithWhereWithoutCurrentStageInput | Prisma.WorkflowInstanceUpdateManyWithWhereWithoutCurrentStageInput[];
    deleteMany?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
};
export type WorkflowInstanceUncheckedUpdateManyWithoutCurrentStageNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCurrentStageInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput> | Prisma.WorkflowInstanceCreateWithoutCurrentStageInput[] | Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput[];
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutCurrentStageInput | Prisma.WorkflowInstanceCreateOrConnectWithoutCurrentStageInput[];
    upsert?: Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutCurrentStageInput | Prisma.WorkflowInstanceUpsertWithWhereUniqueWithoutCurrentStageInput[];
    createMany?: Prisma.WorkflowInstanceCreateManyCurrentStageInputEnvelope;
    set?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    disconnect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    delete?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    connect?: Prisma.WorkflowInstanceWhereUniqueInput | Prisma.WorkflowInstanceWhereUniqueInput[];
    update?: Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutCurrentStageInput | Prisma.WorkflowInstanceUpdateWithWhereUniqueWithoutCurrentStageInput[];
    updateMany?: Prisma.WorkflowInstanceUpdateManyWithWhereWithoutCurrentStageInput | Prisma.WorkflowInstanceUpdateManyWithWhereWithoutCurrentStageInput[];
    deleteMany?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
};
export type EnumWorkflowInstanceStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkflowInstanceStatus;
};
export type WorkflowInstanceCreateNestedOneWithoutHistoriesInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutHistoriesInput, Prisma.WorkflowInstanceUncheckedCreateWithoutHistoriesInput>;
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutHistoriesInput;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput;
};
export type WorkflowInstanceUpdateOneRequiredWithoutHistoriesNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutHistoriesInput, Prisma.WorkflowInstanceUncheckedCreateWithoutHistoriesInput>;
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutHistoriesInput;
    upsert?: Prisma.WorkflowInstanceUpsertWithoutHistoriesInput;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowInstanceUpdateToOneWithWhereWithoutHistoriesInput, Prisma.WorkflowInstanceUpdateWithoutHistoriesInput>, Prisma.WorkflowInstanceUncheckedUpdateWithoutHistoriesInput>;
};
export type WorkflowInstanceCreateNestedOneWithoutWorkflowApprovalsInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowApprovalsInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowApprovalsInput>;
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowApprovalsInput;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput;
};
export type WorkflowInstanceUpdateOneRequiredWithoutWorkflowApprovalsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowApprovalsInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowApprovalsInput>;
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutWorkflowApprovalsInput;
    upsert?: Prisma.WorkflowInstanceUpsertWithoutWorkflowApprovalsInput;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowInstanceUpdateToOneWithWhereWithoutWorkflowApprovalsInput, Prisma.WorkflowInstanceUpdateWithoutWorkflowApprovalsInput>, Prisma.WorkflowInstanceUncheckedUpdateWithoutWorkflowApprovalsInput>;
};
export type WorkflowInstanceCreateNestedOneWithoutTasksInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutTasksInput, Prisma.WorkflowInstanceUncheckedCreateWithoutTasksInput>;
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutTasksInput;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput;
};
export type WorkflowInstanceUpdateOneRequiredWithoutTasksNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutTasksInput, Prisma.WorkflowInstanceUncheckedCreateWithoutTasksInput>;
    connectOrCreate?: Prisma.WorkflowInstanceCreateOrConnectWithoutTasksInput;
    upsert?: Prisma.WorkflowInstanceUpsertWithoutTasksInput;
    connect?: Prisma.WorkflowInstanceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowInstanceUpdateToOneWithWhereWithoutTasksInput, Prisma.WorkflowInstanceUpdateWithoutTasksInput>, Prisma.WorkflowInstanceUncheckedUpdateWithoutTasksInput>;
};
export type WorkflowInstanceCreateWithoutStartedByInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkflowInstancesInput;
    workflow: Prisma.WorkflowDefinitionCreateNestedOneWithoutInstancesInput;
    currentStage?: Prisma.WorkflowStageCreateNestedOneWithoutInstancesInput;
    histories?: Prisma.WorkflowHistoryCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUncheckedCreateWithoutStartedByInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    histories?: Prisma.WorkflowHistoryUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceCreateOrConnectWithoutStartedByInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutStartedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput>;
};
export type WorkflowInstanceCreateManyStartedByInputEnvelope = {
    data: Prisma.WorkflowInstanceCreateManyStartedByInput | Prisma.WorkflowInstanceCreateManyStartedByInput[];
    skipDuplicates?: boolean;
};
export type WorkflowInstanceCreateWithoutCreatedByInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    startedBy?: Prisma.UserCreateNestedOneWithoutStartedWorkflowsInput;
    workflow: Prisma.WorkflowDefinitionCreateNestedOneWithoutInstancesInput;
    currentStage?: Prisma.WorkflowStageCreateNestedOneWithoutInstancesInput;
    histories?: Prisma.WorkflowHistoryCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    histories?: Prisma.WorkflowHistoryUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCreatedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput>;
};
export type WorkflowInstanceCreateManyCreatedByInputEnvelope = {
    data: Prisma.WorkflowInstanceCreateManyCreatedByInput | Prisma.WorkflowInstanceCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type WorkflowInstanceUpsertWithWhereUniqueWithoutStartedByInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutStartedByInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutStartedByInput>;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutStartedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutStartedByInput>;
};
export type WorkflowInstanceUpdateWithWhereUniqueWithoutStartedByInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutStartedByInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutStartedByInput>;
};
export type WorkflowInstanceUpdateManyWithWhereWithoutStartedByInput = {
    where: Prisma.WorkflowInstanceScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateManyMutationInput, Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByInput>;
};
export type WorkflowInstanceScalarWhereInput = {
    AND?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
    OR?: Prisma.WorkflowInstanceScalarWhereInput[];
    NOT?: Prisma.WorkflowInstanceScalarWhereInput | Prisma.WorkflowInstanceScalarWhereInput[];
    id?: Prisma.StringFilter<"WorkflowInstance"> | string;
    workflowId?: Prisma.StringFilter<"WorkflowInstance"> | string;
    resourceType?: Prisma.StringFilter<"WorkflowInstance"> | string;
    resourceId?: Prisma.StringFilter<"WorkflowInstance"> | string;
    currentStageId?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFilter<"WorkflowInstance"> | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    endedAt?: Prisma.DateTimeNullableFilter<"WorkflowInstance"> | Date | string | null;
    endedReason?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    errorDetails?: Prisma.JsonNullableFilter<"WorkflowInstance">;
    createdById?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowInstance"> | Date | string;
    startedById?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
    lockedAt?: Prisma.DateTimeNullableFilter<"WorkflowInstance"> | Date | string | null;
    lockedBy?: Prisma.StringNullableFilter<"WorkflowInstance"> | string | null;
};
export type WorkflowInstanceUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutCreatedByInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCreatedByInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCreatedByInput>;
};
export type WorkflowInstanceUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutCreatedByInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutCreatedByInput>;
};
export type WorkflowInstanceUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.WorkflowInstanceScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateManyMutationInput, Prisma.WorkflowInstanceUncheckedUpdateManyWithoutCreatedByInput>;
};
export type WorkflowInstanceCreateWithoutWorkflowInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkflowInstancesInput;
    startedBy?: Prisma.UserCreateNestedOneWithoutStartedWorkflowsInput;
    currentStage?: Prisma.WorkflowStageCreateNestedOneWithoutInstancesInput;
    histories?: Prisma.WorkflowHistoryCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUncheckedCreateWithoutWorkflowInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    histories?: Prisma.WorkflowHistoryUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceCreateOrConnectWithoutWorkflowInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput>;
};
export type WorkflowInstanceCreateManyWorkflowInputEnvelope = {
    data: Prisma.WorkflowInstanceCreateManyWorkflowInput | Prisma.WorkflowInstanceCreateManyWorkflowInput[];
    skipDuplicates?: boolean;
};
export type WorkflowInstanceUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutWorkflowInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutWorkflowInput>;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowInput>;
};
export type WorkflowInstanceUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutWorkflowInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutWorkflowInput>;
};
export type WorkflowInstanceUpdateManyWithWhereWithoutWorkflowInput = {
    where: Prisma.WorkflowInstanceScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateManyMutationInput, Prisma.WorkflowInstanceUncheckedUpdateManyWithoutWorkflowInput>;
};
export type WorkflowInstanceCreateWithoutCurrentStageInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkflowInstancesInput;
    startedBy?: Prisma.UserCreateNestedOneWithoutStartedWorkflowsInput;
    workflow: Prisma.WorkflowDefinitionCreateNestedOneWithoutInstancesInput;
    histories?: Prisma.WorkflowHistoryCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUncheckedCreateWithoutCurrentStageInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    histories?: Prisma.WorkflowHistoryUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceCreateOrConnectWithoutCurrentStageInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCurrentStageInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput>;
};
export type WorkflowInstanceCreateManyCurrentStageInputEnvelope = {
    data: Prisma.WorkflowInstanceCreateManyCurrentStageInput | Prisma.WorkflowInstanceCreateManyCurrentStageInput[];
    skipDuplicates?: boolean;
};
export type WorkflowInstanceUpsertWithWhereUniqueWithoutCurrentStageInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutCurrentStageInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutCurrentStageInput>;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutCurrentStageInput, Prisma.WorkflowInstanceUncheckedCreateWithoutCurrentStageInput>;
};
export type WorkflowInstanceUpdateWithWhereUniqueWithoutCurrentStageInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutCurrentStageInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutCurrentStageInput>;
};
export type WorkflowInstanceUpdateManyWithWhereWithoutCurrentStageInput = {
    where: Prisma.WorkflowInstanceScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateManyMutationInput, Prisma.WorkflowInstanceUncheckedUpdateManyWithoutCurrentStageInput>;
};
export type WorkflowInstanceCreateWithoutHistoriesInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkflowInstancesInput;
    startedBy?: Prisma.UserCreateNestedOneWithoutStartedWorkflowsInput;
    workflow: Prisma.WorkflowDefinitionCreateNestedOneWithoutInstancesInput;
    currentStage?: Prisma.WorkflowStageCreateNestedOneWithoutInstancesInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUncheckedCreateWithoutHistoriesInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceCreateOrConnectWithoutHistoriesInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutHistoriesInput, Prisma.WorkflowInstanceUncheckedCreateWithoutHistoriesInput>;
};
export type WorkflowInstanceUpsertWithoutHistoriesInput = {
    update: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutHistoriesInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutHistoriesInput>;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutHistoriesInput, Prisma.WorkflowInstanceUncheckedCreateWithoutHistoriesInput>;
    where?: Prisma.WorkflowInstanceWhereInput;
};
export type WorkflowInstanceUpdateToOneWithWhereWithoutHistoriesInput = {
    where?: Prisma.WorkflowInstanceWhereInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutHistoriesInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutHistoriesInput>;
};
export type WorkflowInstanceUpdateWithoutHistoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedWorkflowInstancesNestedInput;
    startedBy?: Prisma.UserUpdateOneWithoutStartedWorkflowsNestedInput;
    workflow?: Prisma.WorkflowDefinitionUpdateOneRequiredWithoutInstancesNestedInput;
    currentStage?: Prisma.WorkflowStageUpdateOneWithoutInstancesNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateWithoutHistoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceCreateWithoutWorkflowApprovalsInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkflowInstancesInput;
    startedBy?: Prisma.UserCreateNestedOneWithoutStartedWorkflowsInput;
    workflow: Prisma.WorkflowDefinitionCreateNestedOneWithoutInstancesInput;
    currentStage?: Prisma.WorkflowStageCreateNestedOneWithoutInstancesInput;
    histories?: Prisma.WorkflowHistoryCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUncheckedCreateWithoutWorkflowApprovalsInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    histories?: Prisma.WorkflowHistoryUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceCreateOrConnectWithoutWorkflowApprovalsInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowApprovalsInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowApprovalsInput>;
};
export type WorkflowInstanceUpsertWithoutWorkflowApprovalsInput = {
    update: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutWorkflowApprovalsInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutWorkflowApprovalsInput>;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutWorkflowApprovalsInput, Prisma.WorkflowInstanceUncheckedCreateWithoutWorkflowApprovalsInput>;
    where?: Prisma.WorkflowInstanceWhereInput;
};
export type WorkflowInstanceUpdateToOneWithWhereWithoutWorkflowApprovalsInput = {
    where?: Prisma.WorkflowInstanceWhereInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutWorkflowApprovalsInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutWorkflowApprovalsInput>;
};
export type WorkflowInstanceUpdateWithoutWorkflowApprovalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedWorkflowInstancesNestedInput;
    startedBy?: Prisma.UserUpdateOneWithoutStartedWorkflowsNestedInput;
    workflow?: Prisma.WorkflowDefinitionUpdateOneRequiredWithoutInstancesNestedInput;
    currentStage?: Prisma.WorkflowStageUpdateOneWithoutInstancesNestedInput;
    histories?: Prisma.WorkflowHistoryUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateWithoutWorkflowApprovalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    histories?: Prisma.WorkflowHistoryUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceCreateWithoutTasksInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkflowInstancesInput;
    startedBy?: Prisma.UserCreateNestedOneWithoutStartedWorkflowsInput;
    workflow: Prisma.WorkflowDefinitionCreateNestedOneWithoutInstancesInput;
    currentStage?: Prisma.WorkflowStageCreateNestedOneWithoutInstancesInput;
    histories?: Prisma.WorkflowHistoryCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceUncheckedCreateWithoutTasksInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
    histories?: Prisma.WorkflowHistoryUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedCreateNestedManyWithoutWorkflowInstanceInput;
};
export type WorkflowInstanceCreateOrConnectWithoutTasksInput = {
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutTasksInput, Prisma.WorkflowInstanceUncheckedCreateWithoutTasksInput>;
};
export type WorkflowInstanceUpsertWithoutTasksInput = {
    update: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutTasksInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutTasksInput>;
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateWithoutTasksInput, Prisma.WorkflowInstanceUncheckedCreateWithoutTasksInput>;
    where?: Prisma.WorkflowInstanceWhereInput;
};
export type WorkflowInstanceUpdateToOneWithWhereWithoutTasksInput = {
    where?: Prisma.WorkflowInstanceWhereInput;
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateWithoutTasksInput, Prisma.WorkflowInstanceUncheckedUpdateWithoutTasksInput>;
};
export type WorkflowInstanceUpdateWithoutTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedWorkflowInstancesNestedInput;
    startedBy?: Prisma.UserUpdateOneWithoutStartedWorkflowsNestedInput;
    workflow?: Prisma.WorkflowDefinitionUpdateOneRequiredWithoutInstancesNestedInput;
    currentStage?: Prisma.WorkflowStageUpdateOneWithoutInstancesNestedInput;
    histories?: Prisma.WorkflowHistoryUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateWithoutTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    histories?: Prisma.WorkflowHistoryUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceCreateManyStartedByInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
};
export type WorkflowInstanceCreateManyCreatedByInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
};
export type WorkflowInstanceUpdateWithoutStartedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedWorkflowInstancesNestedInput;
    workflow?: Prisma.WorkflowDefinitionUpdateOneRequiredWithoutInstancesNestedInput;
    currentStage?: Prisma.WorkflowStageUpdateOneWithoutInstancesNestedInput;
    histories?: Prisma.WorkflowHistoryUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateWithoutStartedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    histories?: Prisma.WorkflowHistoryUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateManyWithoutStartedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowInstanceUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedBy?: Prisma.UserUpdateOneWithoutStartedWorkflowsNestedInput;
    workflow?: Prisma.WorkflowDefinitionUpdateOneRequiredWithoutInstancesNestedInput;
    currentStage?: Prisma.WorkflowStageUpdateOneWithoutInstancesNestedInput;
    histories?: Prisma.WorkflowHistoryUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    histories?: Prisma.WorkflowHistoryUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowInstanceCreateManyWorkflowInput = {
    id?: string;
    resourceType: string;
    resourceId: string;
    currentStageId?: string | null;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
};
export type WorkflowInstanceUpdateWithoutWorkflowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedWorkflowInstancesNestedInput;
    startedBy?: Prisma.UserUpdateOneWithoutStartedWorkflowsNestedInput;
    currentStage?: Prisma.WorkflowStageUpdateOneWithoutInstancesNestedInput;
    histories?: Prisma.WorkflowHistoryUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateWithoutWorkflowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    histories?: Prisma.WorkflowHistoryUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateManyWithoutWorkflowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkflowInstanceCreateManyCurrentStageInput = {
    id?: string;
    workflowId: string;
    resourceType: string;
    resourceId: string;
    status?: $Enums.WorkflowInstanceStatus;
    startedAt?: Date | string;
    endedAt?: Date | string | null;
    endedReason?: string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    startedById?: string | null;
    lockedAt?: Date | string | null;
    lockedBy?: string | null;
};
export type WorkflowInstanceUpdateWithoutCurrentStageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedWorkflowInstancesNestedInput;
    startedBy?: Prisma.UserUpdateOneWithoutStartedWorkflowsNestedInput;
    workflow?: Prisma.WorkflowDefinitionUpdateOneRequiredWithoutInstancesNestedInput;
    histories?: Prisma.WorkflowHistoryUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateWithoutCurrentStageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    histories?: Prisma.WorkflowHistoryUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
    workflowApprovals?: Prisma.WorkflowApprovalUncheckedUpdateManyWithoutWorkflowInstanceNestedInput;
};
export type WorkflowInstanceUncheckedUpdateManyWithoutCurrentStageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkflowInstanceStatusFieldUpdateOperationsInput | $Enums.WorkflowInstanceStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorDetails?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lockedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lockedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
/**
 * Count Type WorkflowInstanceCountOutputType
 */
export type WorkflowInstanceCountOutputType = {
    histories: number;
    tasks: number;
    workflowApprovals: number;
};
export type WorkflowInstanceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    histories?: boolean | WorkflowInstanceCountOutputTypeCountHistoriesArgs;
    tasks?: boolean | WorkflowInstanceCountOutputTypeCountTasksArgs;
    workflowApprovals?: boolean | WorkflowInstanceCountOutputTypeCountWorkflowApprovalsArgs;
};
/**
 * WorkflowInstanceCountOutputType without action
 */
export type WorkflowInstanceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstanceCountOutputType
     */
    select?: Prisma.WorkflowInstanceCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * WorkflowInstanceCountOutputType without action
 */
export type WorkflowInstanceCountOutputTypeCountHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowHistoryWhereInput;
};
/**
 * WorkflowInstanceCountOutputType without action
 */
export type WorkflowInstanceCountOutputTypeCountTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
};
/**
 * WorkflowInstanceCountOutputType without action
 */
export type WorkflowInstanceCountOutputTypeCountWorkflowApprovalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowApprovalWhereInput;
};
export type WorkflowInstanceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowId?: boolean;
    resourceType?: boolean;
    resourceId?: boolean;
    currentStageId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    endedReason?: boolean;
    errorDetails?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    startedById?: boolean;
    lockedAt?: boolean;
    lockedBy?: boolean;
    createdBy?: boolean | Prisma.WorkflowInstance$createdByArgs<ExtArgs>;
    startedBy?: boolean | Prisma.WorkflowInstance$startedByArgs<ExtArgs>;
    workflow?: boolean | Prisma.WorkflowDefinitionDefaultArgs<ExtArgs>;
    currentStage?: boolean | Prisma.WorkflowInstance$currentStageArgs<ExtArgs>;
    histories?: boolean | Prisma.WorkflowInstance$historiesArgs<ExtArgs>;
    tasks?: boolean | Prisma.WorkflowInstance$tasksArgs<ExtArgs>;
    workflowApprovals?: boolean | Prisma.WorkflowInstance$workflowApprovalsArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkflowInstanceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowInstance"]>;
export type WorkflowInstanceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowId?: boolean;
    resourceType?: boolean;
    resourceId?: boolean;
    currentStageId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    endedReason?: boolean;
    errorDetails?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    startedById?: boolean;
    lockedAt?: boolean;
    lockedBy?: boolean;
    createdBy?: boolean | Prisma.WorkflowInstance$createdByArgs<ExtArgs>;
    startedBy?: boolean | Prisma.WorkflowInstance$startedByArgs<ExtArgs>;
    workflow?: boolean | Prisma.WorkflowDefinitionDefaultArgs<ExtArgs>;
    currentStage?: boolean | Prisma.WorkflowInstance$currentStageArgs<ExtArgs>;
}, ExtArgs["result"]["workflowInstance"]>;
export type WorkflowInstanceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowId?: boolean;
    resourceType?: boolean;
    resourceId?: boolean;
    currentStageId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    endedReason?: boolean;
    errorDetails?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    startedById?: boolean;
    lockedAt?: boolean;
    lockedBy?: boolean;
    createdBy?: boolean | Prisma.WorkflowInstance$createdByArgs<ExtArgs>;
    startedBy?: boolean | Prisma.WorkflowInstance$startedByArgs<ExtArgs>;
    workflow?: boolean | Prisma.WorkflowDefinitionDefaultArgs<ExtArgs>;
    currentStage?: boolean | Prisma.WorkflowInstance$currentStageArgs<ExtArgs>;
}, ExtArgs["result"]["workflowInstance"]>;
export type WorkflowInstanceSelectScalar = {
    id?: boolean;
    workflowId?: boolean;
    resourceType?: boolean;
    resourceId?: boolean;
    currentStageId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    endedReason?: boolean;
    errorDetails?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    startedById?: boolean;
    lockedAt?: boolean;
    lockedBy?: boolean;
};
export type WorkflowInstanceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "workflowId" | "resourceType" | "resourceId" | "currentStageId" | "status" | "startedAt" | "endedAt" | "endedReason" | "errorDetails" | "createdById" | "createdAt" | "updatedAt" | "startedById" | "lockedAt" | "lockedBy", ExtArgs["result"]["workflowInstance"]>;
export type WorkflowInstanceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdBy?: boolean | Prisma.WorkflowInstance$createdByArgs<ExtArgs>;
    startedBy?: boolean | Prisma.WorkflowInstance$startedByArgs<ExtArgs>;
    workflow?: boolean | Prisma.WorkflowDefinitionDefaultArgs<ExtArgs>;
    currentStage?: boolean | Prisma.WorkflowInstance$currentStageArgs<ExtArgs>;
    histories?: boolean | Prisma.WorkflowInstance$historiesArgs<ExtArgs>;
    tasks?: boolean | Prisma.WorkflowInstance$tasksArgs<ExtArgs>;
    workflowApprovals?: boolean | Prisma.WorkflowInstance$workflowApprovalsArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkflowInstanceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WorkflowInstanceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdBy?: boolean | Prisma.WorkflowInstance$createdByArgs<ExtArgs>;
    startedBy?: boolean | Prisma.WorkflowInstance$startedByArgs<ExtArgs>;
    workflow?: boolean | Prisma.WorkflowDefinitionDefaultArgs<ExtArgs>;
    currentStage?: boolean | Prisma.WorkflowInstance$currentStageArgs<ExtArgs>;
};
export type WorkflowInstanceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdBy?: boolean | Prisma.WorkflowInstance$createdByArgs<ExtArgs>;
    startedBy?: boolean | Prisma.WorkflowInstance$startedByArgs<ExtArgs>;
    workflow?: boolean | Prisma.WorkflowDefinitionDefaultArgs<ExtArgs>;
    currentStage?: boolean | Prisma.WorkflowInstance$currentStageArgs<ExtArgs>;
};
export type $WorkflowInstancePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkflowInstance";
    objects: {
        createdBy: Prisma.$UserPayload<ExtArgs> | null;
        startedBy: Prisma.$UserPayload<ExtArgs> | null;
        workflow: Prisma.$WorkflowDefinitionPayload<ExtArgs>;
        currentStage: Prisma.$WorkflowStagePayload<ExtArgs> | null;
        histories: Prisma.$WorkflowHistoryPayload<ExtArgs>[];
        tasks: Prisma.$TaskPayload<ExtArgs>[];
        workflowApprovals: Prisma.$WorkflowApprovalPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        workflowId: string;
        resourceType: string;
        resourceId: string;
        currentStageId: string | null;
        status: $Enums.WorkflowInstanceStatus;
        startedAt: Date;
        endedAt: Date | null;
        endedReason: string | null;
        errorDetails: runtime.JsonValue | null;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
        startedById: string | null;
        lockedAt: Date | null;
        lockedBy: string | null;
    }, ExtArgs["result"]["workflowInstance"]>;
    composites: {};
};
export type WorkflowInstanceGetPayload<S extends boolean | null | undefined | WorkflowInstanceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload, S>;
export type WorkflowInstanceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkflowInstanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkflowInstanceCountAggregateInputType | true;
};
export interface WorkflowInstanceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkflowInstance'];
        meta: {
            name: 'WorkflowInstance';
        };
    };
    /**
     * Find zero or one WorkflowInstance that matches the filter.
     * @param {WorkflowInstanceFindUniqueArgs} args - Arguments to find a WorkflowInstance
     * @example
     * // Get one WorkflowInstance
     * const workflowInstance = await prisma.workflowInstance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowInstanceFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkflowInstanceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one WorkflowInstance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowInstanceFindUniqueOrThrowArgs} args - Arguments to find a WorkflowInstance
     * @example
     * // Get one WorkflowInstance
     * const workflowInstance = await prisma.workflowInstance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowInstanceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkflowInstanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkflowInstance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowInstanceFindFirstArgs} args - Arguments to find a WorkflowInstance
     * @example
     * // Get one WorkflowInstance
     * const workflowInstance = await prisma.workflowInstance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowInstanceFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkflowInstanceFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkflowInstance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowInstanceFindFirstOrThrowArgs} args - Arguments to find a WorkflowInstance
     * @example
     * // Get one WorkflowInstance
     * const workflowInstance = await prisma.workflowInstance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowInstanceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkflowInstanceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more WorkflowInstances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowInstanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowInstances
     * const workflowInstances = await prisma.workflowInstance.findMany()
     *
     * // Get first 10 WorkflowInstances
     * const workflowInstances = await prisma.workflowInstance.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const workflowInstanceWithIdOnly = await prisma.workflowInstance.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WorkflowInstanceFindManyArgs>(args?: Prisma.SelectSubset<T, WorkflowInstanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a WorkflowInstance.
     * @param {WorkflowInstanceCreateArgs} args - Arguments to create a WorkflowInstance.
     * @example
     * // Create one WorkflowInstance
     * const WorkflowInstance = await prisma.workflowInstance.create({
     *   data: {
     *     // ... data to create a WorkflowInstance
     *   }
     * })
     *
     */
    create<T extends WorkflowInstanceCreateArgs>(args: Prisma.SelectSubset<T, WorkflowInstanceCreateArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many WorkflowInstances.
     * @param {WorkflowInstanceCreateManyArgs} args - Arguments to create many WorkflowInstances.
     * @example
     * // Create many WorkflowInstances
     * const workflowInstance = await prisma.workflowInstance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WorkflowInstanceCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkflowInstanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many WorkflowInstances and returns the data saved in the database.
     * @param {WorkflowInstanceCreateManyAndReturnArgs} args - Arguments to create many WorkflowInstances.
     * @example
     * // Create many WorkflowInstances
     * const workflowInstance = await prisma.workflowInstance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WorkflowInstances and only return the `id`
     * const workflowInstanceWithIdOnly = await prisma.workflowInstance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WorkflowInstanceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkflowInstanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a WorkflowInstance.
     * @param {WorkflowInstanceDeleteArgs} args - Arguments to delete one WorkflowInstance.
     * @example
     * // Delete one WorkflowInstance
     * const WorkflowInstance = await prisma.workflowInstance.delete({
     *   where: {
     *     // ... filter to delete one WorkflowInstance
     *   }
     * })
     *
     */
    delete<T extends WorkflowInstanceDeleteArgs>(args: Prisma.SelectSubset<T, WorkflowInstanceDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one WorkflowInstance.
     * @param {WorkflowInstanceUpdateArgs} args - Arguments to update one WorkflowInstance.
     * @example
     * // Update one WorkflowInstance
     * const workflowInstance = await prisma.workflowInstance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WorkflowInstanceUpdateArgs>(args: Prisma.SelectSubset<T, WorkflowInstanceUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more WorkflowInstances.
     * @param {WorkflowInstanceDeleteManyArgs} args - Arguments to filter WorkflowInstances to delete.
     * @example
     * // Delete a few WorkflowInstances
     * const { count } = await prisma.workflowInstance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WorkflowInstanceDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkflowInstanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkflowInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowInstanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowInstances
     * const workflowInstance = await prisma.workflowInstance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WorkflowInstanceUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkflowInstanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkflowInstances and returns the data updated in the database.
     * @param {WorkflowInstanceUpdateManyAndReturnArgs} args - Arguments to update many WorkflowInstances.
     * @example
     * // Update many WorkflowInstances
     * const workflowInstance = await prisma.workflowInstance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WorkflowInstances and only return the `id`
     * const workflowInstanceWithIdOnly = await prisma.workflowInstance.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkflowInstanceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkflowInstanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one WorkflowInstance.
     * @param {WorkflowInstanceUpsertArgs} args - Arguments to update or create a WorkflowInstance.
     * @example
     * // Update or create a WorkflowInstance
     * const workflowInstance = await prisma.workflowInstance.upsert({
     *   create: {
     *     // ... data to create a WorkflowInstance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowInstance we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowInstanceUpsertArgs>(args: Prisma.SelectSubset<T, WorkflowInstanceUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkflowInstanceClient<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of WorkflowInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowInstanceCountArgs} args - Arguments to filter WorkflowInstances to count.
     * @example
     * // Count the number of WorkflowInstances
     * const count = await prisma.workflowInstance.count({
     *   where: {
     *     // ... the filter for the WorkflowInstances we want to count
     *   }
     * })
    **/
    count<T extends WorkflowInstanceCountArgs>(args?: Prisma.Subset<T, WorkflowInstanceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkflowInstanceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a WorkflowInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowInstanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowInstanceAggregateArgs>(args: Prisma.Subset<T, WorkflowInstanceAggregateArgs>): Prisma.PrismaPromise<GetWorkflowInstanceAggregateType<T>>;
    /**
     * Group by WorkflowInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowInstanceGroupByArgs} args - Group by arguments.
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
    groupBy<T extends WorkflowInstanceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkflowInstanceGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkflowInstanceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkflowInstanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowInstanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WorkflowInstance model
     */
    readonly fields: WorkflowInstanceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for WorkflowInstance.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__WorkflowInstanceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    createdBy<T extends Prisma.WorkflowInstance$createdByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowInstance$createdByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    startedBy<T extends Prisma.WorkflowInstance$startedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowInstance$startedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    workflow<T extends Prisma.WorkflowDefinitionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefinitionDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    currentStage<T extends Prisma.WorkflowInstance$currentStageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowInstance$currentStageArgs<ExtArgs>>): Prisma.Prisma__WorkflowStageClient<runtime.Types.Result.GetResult<Prisma.$WorkflowStagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    histories<T extends Prisma.WorkflowInstance$historiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowInstance$historiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    tasks<T extends Prisma.WorkflowInstance$tasksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowInstance$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    workflowApprovals<T extends Prisma.WorkflowInstance$workflowApprovalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowInstance$workflowApprovalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowApprovalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the WorkflowInstance model
 */
export interface WorkflowInstanceFieldRefs {
    readonly id: Prisma.FieldRef<"WorkflowInstance", 'String'>;
    readonly workflowId: Prisma.FieldRef<"WorkflowInstance", 'String'>;
    readonly resourceType: Prisma.FieldRef<"WorkflowInstance", 'String'>;
    readonly resourceId: Prisma.FieldRef<"WorkflowInstance", 'String'>;
    readonly currentStageId: Prisma.FieldRef<"WorkflowInstance", 'String'>;
    readonly status: Prisma.FieldRef<"WorkflowInstance", 'WorkflowInstanceStatus'>;
    readonly startedAt: Prisma.FieldRef<"WorkflowInstance", 'DateTime'>;
    readonly endedAt: Prisma.FieldRef<"WorkflowInstance", 'DateTime'>;
    readonly endedReason: Prisma.FieldRef<"WorkflowInstance", 'String'>;
    readonly errorDetails: Prisma.FieldRef<"WorkflowInstance", 'Json'>;
    readonly createdById: Prisma.FieldRef<"WorkflowInstance", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WorkflowInstance", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WorkflowInstance", 'DateTime'>;
    readonly startedById: Prisma.FieldRef<"WorkflowInstance", 'String'>;
    readonly lockedAt: Prisma.FieldRef<"WorkflowInstance", 'DateTime'>;
    readonly lockedBy: Prisma.FieldRef<"WorkflowInstance", 'String'>;
}
/**
 * WorkflowInstance findUnique
 */
export type WorkflowInstanceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowInstance to fetch.
     */
    where: Prisma.WorkflowInstanceWhereUniqueInput;
};
/**
 * WorkflowInstance findUniqueOrThrow
 */
export type WorkflowInstanceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowInstance to fetch.
     */
    where: Prisma.WorkflowInstanceWhereUniqueInput;
};
/**
 * WorkflowInstance findFirst
 */
export type WorkflowInstanceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowInstance to fetch.
     */
    where?: Prisma.WorkflowInstanceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkflowInstances to fetch.
     */
    orderBy?: Prisma.WorkflowInstanceOrderByWithRelationInput | Prisma.WorkflowInstanceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkflowInstances.
     */
    cursor?: Prisma.WorkflowInstanceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkflowInstances from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkflowInstances.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkflowInstances.
     */
    distinct?: Prisma.WorkflowInstanceScalarFieldEnum | Prisma.WorkflowInstanceScalarFieldEnum[];
};
/**
 * WorkflowInstance findFirstOrThrow
 */
export type WorkflowInstanceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowInstance to fetch.
     */
    where?: Prisma.WorkflowInstanceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkflowInstances to fetch.
     */
    orderBy?: Prisma.WorkflowInstanceOrderByWithRelationInput | Prisma.WorkflowInstanceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkflowInstances.
     */
    cursor?: Prisma.WorkflowInstanceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkflowInstances from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkflowInstances.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkflowInstances.
     */
    distinct?: Prisma.WorkflowInstanceScalarFieldEnum | Prisma.WorkflowInstanceScalarFieldEnum[];
};
/**
 * WorkflowInstance findMany
 */
export type WorkflowInstanceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * Filter, which WorkflowInstances to fetch.
     */
    where?: Prisma.WorkflowInstanceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkflowInstances to fetch.
     */
    orderBy?: Prisma.WorkflowInstanceOrderByWithRelationInput | Prisma.WorkflowInstanceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WorkflowInstances.
     */
    cursor?: Prisma.WorkflowInstanceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkflowInstances from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkflowInstances.
     */
    skip?: number;
    distinct?: Prisma.WorkflowInstanceScalarFieldEnum | Prisma.WorkflowInstanceScalarFieldEnum[];
};
/**
 * WorkflowInstance create
 */
export type WorkflowInstanceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * The data needed to create a WorkflowInstance.
     */
    data: Prisma.XOR<Prisma.WorkflowInstanceCreateInput, Prisma.WorkflowInstanceUncheckedCreateInput>;
};
/**
 * WorkflowInstance createMany
 */
export type WorkflowInstanceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowInstances.
     */
    data: Prisma.WorkflowInstanceCreateManyInput | Prisma.WorkflowInstanceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * WorkflowInstance createManyAndReturn
 */
export type WorkflowInstanceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * The data used to create many WorkflowInstances.
     */
    data: Prisma.WorkflowInstanceCreateManyInput | Prisma.WorkflowInstanceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * WorkflowInstance update
 */
export type WorkflowInstanceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * The data needed to update a WorkflowInstance.
     */
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateInput, Prisma.WorkflowInstanceUncheckedUpdateInput>;
    /**
     * Choose, which WorkflowInstance to update.
     */
    where: Prisma.WorkflowInstanceWhereUniqueInput;
};
/**
 * WorkflowInstance updateMany
 */
export type WorkflowInstanceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowInstances.
     */
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateManyMutationInput, Prisma.WorkflowInstanceUncheckedUpdateManyInput>;
    /**
     * Filter which WorkflowInstances to update
     */
    where?: Prisma.WorkflowInstanceWhereInput;
    /**
     * Limit how many WorkflowInstances to update.
     */
    limit?: number;
};
/**
 * WorkflowInstance updateManyAndReturn
 */
export type WorkflowInstanceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * The data used to update WorkflowInstances.
     */
    data: Prisma.XOR<Prisma.WorkflowInstanceUpdateManyMutationInput, Prisma.WorkflowInstanceUncheckedUpdateManyInput>;
    /**
     * Filter which WorkflowInstances to update
     */
    where?: Prisma.WorkflowInstanceWhereInput;
    /**
     * Limit how many WorkflowInstances to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * WorkflowInstance upsert
 */
export type WorkflowInstanceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * The filter to search for the WorkflowInstance to update in case it exists.
     */
    where: Prisma.WorkflowInstanceWhereUniqueInput;
    /**
     * In case the WorkflowInstance found by the `where` argument doesn't exist, create a new WorkflowInstance with this data.
     */
    create: Prisma.XOR<Prisma.WorkflowInstanceCreateInput, Prisma.WorkflowInstanceUncheckedCreateInput>;
    /**
     * In case the WorkflowInstance was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.WorkflowInstanceUpdateInput, Prisma.WorkflowInstanceUncheckedUpdateInput>;
};
/**
 * WorkflowInstance delete
 */
export type WorkflowInstanceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    /**
     * Filter which WorkflowInstance to delete.
     */
    where: Prisma.WorkflowInstanceWhereUniqueInput;
};
/**
 * WorkflowInstance deleteMany
 */
export type WorkflowInstanceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowInstances to delete
     */
    where?: Prisma.WorkflowInstanceWhereInput;
    /**
     * Limit how many WorkflowInstances to delete.
     */
    limit?: number;
};
/**
 * WorkflowInstance.createdBy
 */
export type WorkflowInstance$createdByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * WorkflowInstance.startedBy
 */
export type WorkflowInstance$startedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * WorkflowInstance.currentStage
 */
export type WorkflowInstance$currentStageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStage
     */
    select?: Prisma.WorkflowStageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowStage
     */
    omit?: Prisma.WorkflowStageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowStageInclude<ExtArgs> | null;
    where?: Prisma.WorkflowStageWhereInput;
};
/**
 * WorkflowInstance.histories
 */
export type WorkflowInstance$historiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowHistory
     */
    select?: Prisma.WorkflowHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowHistory
     */
    omit?: Prisma.WorkflowHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowHistoryInclude<ExtArgs> | null;
    where?: Prisma.WorkflowHistoryWhereInput;
    orderBy?: Prisma.WorkflowHistoryOrderByWithRelationInput | Prisma.WorkflowHistoryOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowHistoryScalarFieldEnum | Prisma.WorkflowHistoryScalarFieldEnum[];
};
/**
 * WorkflowInstance.tasks
 */
export type WorkflowInstance$tasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: Prisma.TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput | Prisma.TaskOrderByWithRelationInput[];
    cursor?: Prisma.TaskWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaskScalarFieldEnum | Prisma.TaskScalarFieldEnum[];
};
/**
 * WorkflowInstance.workflowApprovals
 */
export type WorkflowInstance$workflowApprovalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.WorkflowApprovalWhereInput;
    orderBy?: Prisma.WorkflowApprovalOrderByWithRelationInput | Prisma.WorkflowApprovalOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowApprovalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowApprovalScalarFieldEnum | Prisma.WorkflowApprovalScalarFieldEnum[];
};
/**
 * WorkflowInstance without action
 */
export type WorkflowInstanceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=WorkflowInstance.d.ts.map