import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model NotificationDelivery
 *
 */
export type NotificationDeliveryModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationDeliveryPayload>;
export type AggregateNotificationDelivery = {
    _count: NotificationDeliveryCountAggregateOutputType | null;
    _avg: NotificationDeliveryAvgAggregateOutputType | null;
    _sum: NotificationDeliverySumAggregateOutputType | null;
    _min: NotificationDeliveryMinAggregateOutputType | null;
    _max: NotificationDeliveryMaxAggregateOutputType | null;
};
export type NotificationDeliveryAvgAggregateOutputType = {
    priority: number | null;
    retryCount: number | null;
};
export type NotificationDeliverySumAggregateOutputType = {
    priority: number | null;
    retryCount: number | null;
};
export type NotificationDeliveryMinAggregateOutputType = {
    id: string | null;
    batchId: string | null;
    userId: string | null;
    title: string | null;
    message: string | null;
    type: $Enums.NotificationType | null;
    targetType: string | null;
    targetId: string | null;
    priority: number | null;
    read: boolean | null;
    createdAt: Date | null;
    readAt: Date | null;
    sentAt: Date | null;
    deliveredAt: Date | null;
    failedAt: Date | null;
    retryCount: number | null;
    lastError: string | null;
    scheduledAt: Date | null;
};
export type NotificationDeliveryMaxAggregateOutputType = {
    id: string | null;
    batchId: string | null;
    userId: string | null;
    title: string | null;
    message: string | null;
    type: $Enums.NotificationType | null;
    targetType: string | null;
    targetId: string | null;
    priority: number | null;
    read: boolean | null;
    createdAt: Date | null;
    readAt: Date | null;
    sentAt: Date | null;
    deliveredAt: Date | null;
    failedAt: Date | null;
    retryCount: number | null;
    lastError: string | null;
    scheduledAt: Date | null;
};
export type NotificationDeliveryCountAggregateOutputType = {
    id: number;
    batchId: number;
    userId: number;
    title: number;
    message: number;
    type: number;
    channels: number;
    data: number;
    targetType: number;
    targetId: number;
    priority: number;
    read: number;
    createdAt: number;
    readAt: number;
    sentAt: number;
    deliveredAt: number;
    failedAt: number;
    retryCount: number;
    lastError: number;
    scheduledAt: number;
    _all: number;
};
export type NotificationDeliveryAvgAggregateInputType = {
    priority?: true;
    retryCount?: true;
};
export type NotificationDeliverySumAggregateInputType = {
    priority?: true;
    retryCount?: true;
};
export type NotificationDeliveryMinAggregateInputType = {
    id?: true;
    batchId?: true;
    userId?: true;
    title?: true;
    message?: true;
    type?: true;
    targetType?: true;
    targetId?: true;
    priority?: true;
    read?: true;
    createdAt?: true;
    readAt?: true;
    sentAt?: true;
    deliveredAt?: true;
    failedAt?: true;
    retryCount?: true;
    lastError?: true;
    scheduledAt?: true;
};
export type NotificationDeliveryMaxAggregateInputType = {
    id?: true;
    batchId?: true;
    userId?: true;
    title?: true;
    message?: true;
    type?: true;
    targetType?: true;
    targetId?: true;
    priority?: true;
    read?: true;
    createdAt?: true;
    readAt?: true;
    sentAt?: true;
    deliveredAt?: true;
    failedAt?: true;
    retryCount?: true;
    lastError?: true;
    scheduledAt?: true;
};
export type NotificationDeliveryCountAggregateInputType = {
    id?: true;
    batchId?: true;
    userId?: true;
    title?: true;
    message?: true;
    type?: true;
    channels?: true;
    data?: true;
    targetType?: true;
    targetId?: true;
    priority?: true;
    read?: true;
    createdAt?: true;
    readAt?: true;
    sentAt?: true;
    deliveredAt?: true;
    failedAt?: true;
    retryCount?: true;
    lastError?: true;
    scheduledAt?: true;
    _all?: true;
};
export type NotificationDeliveryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationDelivery to aggregate.
     */
    where?: Prisma.NotificationDeliveryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotificationDeliveries to fetch.
     */
    orderBy?: Prisma.NotificationDeliveryOrderByWithRelationInput | Prisma.NotificationDeliveryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.NotificationDeliveryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotificationDeliveries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotificationDeliveries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned NotificationDeliveries
    **/
    _count?: true | NotificationDeliveryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: NotificationDeliveryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: NotificationDeliverySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: NotificationDeliveryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: NotificationDeliveryMaxAggregateInputType;
};
export type GetNotificationDeliveryAggregateType<T extends NotificationDeliveryAggregateArgs> = {
    [P in keyof T & keyof AggregateNotificationDelivery]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotificationDelivery[P]> : Prisma.GetScalarType<T[P], AggregateNotificationDelivery[P]>;
};
export type NotificationDeliveryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationDeliveryWhereInput;
    orderBy?: Prisma.NotificationDeliveryOrderByWithAggregationInput | Prisma.NotificationDeliveryOrderByWithAggregationInput[];
    by: Prisma.NotificationDeliveryScalarFieldEnum[] | Prisma.NotificationDeliveryScalarFieldEnum;
    having?: Prisma.NotificationDeliveryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationDeliveryCountAggregateInputType | true;
    _avg?: NotificationDeliveryAvgAggregateInputType;
    _sum?: NotificationDeliverySumAggregateInputType;
    _min?: NotificationDeliveryMinAggregateInputType;
    _max?: NotificationDeliveryMaxAggregateInputType;
};
export type NotificationDeliveryGroupByOutputType = {
    id: string;
    batchId: string | null;
    userId: string | null;
    title: string;
    message: string;
    type: $Enums.NotificationType;
    channels: runtime.JsonValue;
    data: runtime.JsonValue | null;
    targetType: string | null;
    targetId: string | null;
    priority: number;
    read: boolean;
    createdAt: Date;
    readAt: Date | null;
    sentAt: Date | null;
    deliveredAt: Date | null;
    failedAt: Date | null;
    retryCount: number;
    lastError: string | null;
    scheduledAt: Date | null;
    _count: NotificationDeliveryCountAggregateOutputType | null;
    _avg: NotificationDeliveryAvgAggregateOutputType | null;
    _sum: NotificationDeliverySumAggregateOutputType | null;
    _min: NotificationDeliveryMinAggregateOutputType | null;
    _max: NotificationDeliveryMaxAggregateOutputType | null;
};
type GetNotificationDeliveryGroupByPayload<T extends NotificationDeliveryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationDeliveryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationDeliveryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationDeliveryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationDeliveryGroupByOutputType[P]>;
}>>;
export type NotificationDeliveryWhereInput = {
    AND?: Prisma.NotificationDeliveryWhereInput | Prisma.NotificationDeliveryWhereInput[];
    OR?: Prisma.NotificationDeliveryWhereInput[];
    NOT?: Prisma.NotificationDeliveryWhereInput | Prisma.NotificationDeliveryWhereInput[];
    id?: Prisma.StringFilter<"NotificationDelivery"> | string;
    batchId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    userId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    title?: Prisma.StringFilter<"NotificationDelivery"> | string;
    message?: Prisma.StringFilter<"NotificationDelivery"> | string;
    type?: Prisma.EnumNotificationTypeFilter<"NotificationDelivery"> | $Enums.NotificationType;
    channels?: Prisma.JsonFilter<"NotificationDelivery">;
    data?: Prisma.JsonNullableFilter<"NotificationDelivery">;
    targetType?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    targetId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    priority?: Prisma.IntFilter<"NotificationDelivery"> | number;
    read?: Prisma.BoolFilter<"NotificationDelivery"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"NotificationDelivery"> | Date | string;
    readAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    sentAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    deliveredAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    failedAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    retryCount?: Prisma.IntFilter<"NotificationDelivery"> | number;
    lastError?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    scheduledAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    batch?: Prisma.XOR<Prisma.NotificationBatchNullableScalarRelationFilter, Prisma.NotificationBatchWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type NotificationDeliveryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    batchId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    channels?: Prisma.SortOrder;
    data?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetType?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetId?: Prisma.SortOrderInput | Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    readAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deliveredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    failedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    lastError?: Prisma.SortOrderInput | Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    batch?: Prisma.NotificationBatchOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type NotificationDeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.NotificationDeliveryWhereInput | Prisma.NotificationDeliveryWhereInput[];
    OR?: Prisma.NotificationDeliveryWhereInput[];
    NOT?: Prisma.NotificationDeliveryWhereInput | Prisma.NotificationDeliveryWhereInput[];
    batchId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    userId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    title?: Prisma.StringFilter<"NotificationDelivery"> | string;
    message?: Prisma.StringFilter<"NotificationDelivery"> | string;
    type?: Prisma.EnumNotificationTypeFilter<"NotificationDelivery"> | $Enums.NotificationType;
    channels?: Prisma.JsonFilter<"NotificationDelivery">;
    data?: Prisma.JsonNullableFilter<"NotificationDelivery">;
    targetType?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    targetId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    priority?: Prisma.IntFilter<"NotificationDelivery"> | number;
    read?: Prisma.BoolFilter<"NotificationDelivery"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"NotificationDelivery"> | Date | string;
    readAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    sentAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    deliveredAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    failedAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    retryCount?: Prisma.IntFilter<"NotificationDelivery"> | number;
    lastError?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    scheduledAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    batch?: Prisma.XOR<Prisma.NotificationBatchNullableScalarRelationFilter, Prisma.NotificationBatchWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type NotificationDeliveryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    batchId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    channels?: Prisma.SortOrder;
    data?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetType?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetId?: Prisma.SortOrderInput | Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    readAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deliveredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    failedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    lastError?: Prisma.SortOrderInput | Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.NotificationDeliveryCountOrderByAggregateInput;
    _avg?: Prisma.NotificationDeliveryAvgOrderByAggregateInput;
    _max?: Prisma.NotificationDeliveryMaxOrderByAggregateInput;
    _min?: Prisma.NotificationDeliveryMinOrderByAggregateInput;
    _sum?: Prisma.NotificationDeliverySumOrderByAggregateInput;
};
export type NotificationDeliveryScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationDeliveryScalarWhereWithAggregatesInput | Prisma.NotificationDeliveryScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationDeliveryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationDeliveryScalarWhereWithAggregatesInput | Prisma.NotificationDeliveryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"NotificationDelivery"> | string;
    batchId?: Prisma.StringNullableWithAggregatesFilter<"NotificationDelivery"> | string | null;
    userId?: Prisma.StringNullableWithAggregatesFilter<"NotificationDelivery"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"NotificationDelivery"> | string;
    message?: Prisma.StringWithAggregatesFilter<"NotificationDelivery"> | string;
    type?: Prisma.EnumNotificationTypeWithAggregatesFilter<"NotificationDelivery"> | $Enums.NotificationType;
    channels?: Prisma.JsonWithAggregatesFilter<"NotificationDelivery">;
    data?: Prisma.JsonNullableWithAggregatesFilter<"NotificationDelivery">;
    targetType?: Prisma.StringNullableWithAggregatesFilter<"NotificationDelivery"> | string | null;
    targetId?: Prisma.StringNullableWithAggregatesFilter<"NotificationDelivery"> | string | null;
    priority?: Prisma.IntWithAggregatesFilter<"NotificationDelivery"> | number;
    read?: Prisma.BoolWithAggregatesFilter<"NotificationDelivery"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"NotificationDelivery"> | Date | string;
    readAt?: Prisma.DateTimeNullableWithAggregatesFilter<"NotificationDelivery"> | Date | string | null;
    sentAt?: Prisma.DateTimeNullableWithAggregatesFilter<"NotificationDelivery"> | Date | string | null;
    deliveredAt?: Prisma.DateTimeNullableWithAggregatesFilter<"NotificationDelivery"> | Date | string | null;
    failedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"NotificationDelivery"> | Date | string | null;
    retryCount?: Prisma.IntWithAggregatesFilter<"NotificationDelivery"> | number;
    lastError?: Prisma.StringNullableWithAggregatesFilter<"NotificationDelivery"> | string | null;
    scheduledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"NotificationDelivery"> | Date | string | null;
};
export type NotificationDeliveryCreateInput = {
    id?: string;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
    batch?: Prisma.NotificationBatchCreateNestedOneWithoutDeliveriesInput;
    user?: Prisma.UserCreateNestedOneWithoutDeliveriesInput;
};
export type NotificationDeliveryUncheckedCreateInput = {
    id?: string;
    batchId?: string | null;
    userId?: string | null;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
};
export type NotificationDeliveryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NotificationBatchUpdateOneWithoutDeliveriesNestedInput;
    user?: Prisma.UserUpdateOneWithoutDeliveriesNestedInput;
};
export type NotificationDeliveryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    batchId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationDeliveryCreateManyInput = {
    id?: string;
    batchId?: string | null;
    userId?: string | null;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
};
export type NotificationDeliveryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationDeliveryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    batchId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationDeliveryListRelationFilter = {
    every?: Prisma.NotificationDeliveryWhereInput;
    some?: Prisma.NotificationDeliveryWhereInput;
    none?: Prisma.NotificationDeliveryWhereInput;
};
export type NotificationDeliveryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NotificationDeliveryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    batchId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    channels?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    readAt?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    deliveredAt?: Prisma.SortOrder;
    failedAt?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    lastError?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
};
export type NotificationDeliveryAvgOrderByAggregateInput = {
    priority?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
};
export type NotificationDeliveryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    batchId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    readAt?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    deliveredAt?: Prisma.SortOrder;
    failedAt?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    lastError?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
};
export type NotificationDeliveryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    batchId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    readAt?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    deliveredAt?: Prisma.SortOrder;
    failedAt?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    lastError?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
};
export type NotificationDeliverySumOrderByAggregateInput = {
    priority?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
};
export type NotificationDeliveryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutUserInput, Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput> | Prisma.NotificationDeliveryCreateWithoutUserInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutUserInput | Prisma.NotificationDeliveryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyUserInputEnvelope;
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
};
export type NotificationDeliveryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutUserInput, Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput> | Prisma.NotificationDeliveryCreateWithoutUserInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutUserInput | Prisma.NotificationDeliveryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyUserInputEnvelope;
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
};
export type NotificationDeliveryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutUserInput, Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput> | Prisma.NotificationDeliveryCreateWithoutUserInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutUserInput | Prisma.NotificationDeliveryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutUserInput | Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyUserInputEnvelope;
    set?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    disconnect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    delete?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    update?: Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutUserInput | Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.NotificationDeliveryUpdateManyWithWhereWithoutUserInput | Prisma.NotificationDeliveryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
};
export type NotificationDeliveryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutUserInput, Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput> | Prisma.NotificationDeliveryCreateWithoutUserInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutUserInput | Prisma.NotificationDeliveryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutUserInput | Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyUserInputEnvelope;
    set?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    disconnect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    delete?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    update?: Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutUserInput | Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.NotificationDeliveryUpdateManyWithWhereWithoutUserInput | Prisma.NotificationDeliveryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
};
export type NotificationDeliveryCreateNestedManyWithoutBatchInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutBatchInput, Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput> | Prisma.NotificationDeliveryCreateWithoutBatchInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutBatchInput | Prisma.NotificationDeliveryCreateOrConnectWithoutBatchInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyBatchInputEnvelope;
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
};
export type NotificationDeliveryUncheckedCreateNestedManyWithoutBatchInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutBatchInput, Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput> | Prisma.NotificationDeliveryCreateWithoutBatchInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutBatchInput | Prisma.NotificationDeliveryCreateOrConnectWithoutBatchInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyBatchInputEnvelope;
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
};
export type NotificationDeliveryUpdateManyWithoutBatchNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutBatchInput, Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput> | Prisma.NotificationDeliveryCreateWithoutBatchInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutBatchInput | Prisma.NotificationDeliveryCreateOrConnectWithoutBatchInput[];
    upsert?: Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutBatchInput | Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutBatchInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyBatchInputEnvelope;
    set?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    disconnect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    delete?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    update?: Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutBatchInput | Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutBatchInput[];
    updateMany?: Prisma.NotificationDeliveryUpdateManyWithWhereWithoutBatchInput | Prisma.NotificationDeliveryUpdateManyWithWhereWithoutBatchInput[];
    deleteMany?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
};
export type NotificationDeliveryUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutBatchInput, Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput> | Prisma.NotificationDeliveryCreateWithoutBatchInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutBatchInput | Prisma.NotificationDeliveryCreateOrConnectWithoutBatchInput[];
    upsert?: Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutBatchInput | Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutBatchInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyBatchInputEnvelope;
    set?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    disconnect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    delete?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    update?: Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutBatchInput | Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutBatchInput[];
    updateMany?: Prisma.NotificationDeliveryUpdateManyWithWhereWithoutBatchInput | Prisma.NotificationDeliveryUpdateManyWithWhereWithoutBatchInput[];
    deleteMany?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
};
export type NotificationDeliveryCreateWithoutUserInput = {
    id?: string;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
    batch?: Prisma.NotificationBatchCreateNestedOneWithoutDeliveriesInput;
};
export type NotificationDeliveryUncheckedCreateWithoutUserInput = {
    id?: string;
    batchId?: string | null;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
};
export type NotificationDeliveryCreateOrConnectWithoutUserInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutUserInput, Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput>;
};
export type NotificationDeliveryCreateManyUserInputEnvelope = {
    data: Prisma.NotificationDeliveryCreateManyUserInput | Prisma.NotificationDeliveryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type NotificationDeliveryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationDeliveryUpdateWithoutUserInput, Prisma.NotificationDeliveryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutUserInput, Prisma.NotificationDeliveryUncheckedCreateWithoutUserInput>;
};
export type NotificationDeliveryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateWithoutUserInput, Prisma.NotificationDeliveryUncheckedUpdateWithoutUserInput>;
};
export type NotificationDeliveryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.NotificationDeliveryScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateManyMutationInput, Prisma.NotificationDeliveryUncheckedUpdateManyWithoutUserInput>;
};
export type NotificationDeliveryScalarWhereInput = {
    AND?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
    OR?: Prisma.NotificationDeliveryScalarWhereInput[];
    NOT?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
    id?: Prisma.StringFilter<"NotificationDelivery"> | string;
    batchId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    userId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    title?: Prisma.StringFilter<"NotificationDelivery"> | string;
    message?: Prisma.StringFilter<"NotificationDelivery"> | string;
    type?: Prisma.EnumNotificationTypeFilter<"NotificationDelivery"> | $Enums.NotificationType;
    channels?: Prisma.JsonFilter<"NotificationDelivery">;
    data?: Prisma.JsonNullableFilter<"NotificationDelivery">;
    targetType?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    targetId?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    priority?: Prisma.IntFilter<"NotificationDelivery"> | number;
    read?: Prisma.BoolFilter<"NotificationDelivery"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"NotificationDelivery"> | Date | string;
    readAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    sentAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    deliveredAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    failedAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    retryCount?: Prisma.IntFilter<"NotificationDelivery"> | number;
    lastError?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    scheduledAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
};
export type NotificationDeliveryCreateWithoutBatchInput = {
    id?: string;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
    user?: Prisma.UserCreateNestedOneWithoutDeliveriesInput;
};
export type NotificationDeliveryUncheckedCreateWithoutBatchInput = {
    id?: string;
    userId?: string | null;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
};
export type NotificationDeliveryCreateOrConnectWithoutBatchInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutBatchInput, Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput>;
};
export type NotificationDeliveryCreateManyBatchInputEnvelope = {
    data: Prisma.NotificationDeliveryCreateManyBatchInput | Prisma.NotificationDeliveryCreateManyBatchInput[];
    skipDuplicates?: boolean;
};
export type NotificationDeliveryUpsertWithWhereUniqueWithoutBatchInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationDeliveryUpdateWithoutBatchInput, Prisma.NotificationDeliveryUncheckedUpdateWithoutBatchInput>;
    create: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutBatchInput, Prisma.NotificationDeliveryUncheckedCreateWithoutBatchInput>;
};
export type NotificationDeliveryUpdateWithWhereUniqueWithoutBatchInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateWithoutBatchInput, Prisma.NotificationDeliveryUncheckedUpdateWithoutBatchInput>;
};
export type NotificationDeliveryUpdateManyWithWhereWithoutBatchInput = {
    where: Prisma.NotificationDeliveryScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateManyMutationInput, Prisma.NotificationDeliveryUncheckedUpdateManyWithoutBatchInput>;
};
export type NotificationDeliveryCreateManyUserInput = {
    id?: string;
    batchId?: string | null;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
};
export type NotificationDeliveryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NotificationBatchUpdateOneWithoutDeliveriesNestedInput;
};
export type NotificationDeliveryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    batchId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationDeliveryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    batchId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationDeliveryCreateManyBatchInput = {
    id?: string;
    userId?: string | null;
    title: string;
    message: string;
    type?: $Enums.NotificationType;
    channels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: string | null;
    targetId?: string | null;
    priority?: number;
    read?: boolean;
    createdAt?: Date | string;
    readAt?: Date | string | null;
    sentAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    failedAt?: Date | string | null;
    retryCount?: number;
    lastError?: string | null;
    scheduledAt?: Date | string | null;
};
export type NotificationDeliveryUpdateWithoutBatchInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneWithoutDeliveriesNestedInput;
};
export type NotificationDeliveryUncheckedUpdateWithoutBatchInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationDeliveryUncheckedUpdateManyWithoutBatchInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    channels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    targetType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationDeliverySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    batchId?: boolean;
    userId?: boolean;
    title?: boolean;
    message?: boolean;
    type?: boolean;
    channels?: boolean;
    data?: boolean;
    targetType?: boolean;
    targetId?: boolean;
    priority?: boolean;
    read?: boolean;
    createdAt?: boolean;
    readAt?: boolean;
    sentAt?: boolean;
    deliveredAt?: boolean;
    failedAt?: boolean;
    retryCount?: boolean;
    lastError?: boolean;
    scheduledAt?: boolean;
    batch?: boolean | Prisma.NotificationDelivery$batchArgs<ExtArgs>;
    user?: boolean | Prisma.NotificationDelivery$userArgs<ExtArgs>;
}, ExtArgs["result"]["notificationDelivery"]>;
export type NotificationDeliverySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    batchId?: boolean;
    userId?: boolean;
    title?: boolean;
    message?: boolean;
    type?: boolean;
    channels?: boolean;
    data?: boolean;
    targetType?: boolean;
    targetId?: boolean;
    priority?: boolean;
    read?: boolean;
    createdAt?: boolean;
    readAt?: boolean;
    sentAt?: boolean;
    deliveredAt?: boolean;
    failedAt?: boolean;
    retryCount?: boolean;
    lastError?: boolean;
    scheduledAt?: boolean;
    batch?: boolean | Prisma.NotificationDelivery$batchArgs<ExtArgs>;
    user?: boolean | Prisma.NotificationDelivery$userArgs<ExtArgs>;
}, ExtArgs["result"]["notificationDelivery"]>;
export type NotificationDeliverySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    batchId?: boolean;
    userId?: boolean;
    title?: boolean;
    message?: boolean;
    type?: boolean;
    channels?: boolean;
    data?: boolean;
    targetType?: boolean;
    targetId?: boolean;
    priority?: boolean;
    read?: boolean;
    createdAt?: boolean;
    readAt?: boolean;
    sentAt?: boolean;
    deliveredAt?: boolean;
    failedAt?: boolean;
    retryCount?: boolean;
    lastError?: boolean;
    scheduledAt?: boolean;
    batch?: boolean | Prisma.NotificationDelivery$batchArgs<ExtArgs>;
    user?: boolean | Prisma.NotificationDelivery$userArgs<ExtArgs>;
}, ExtArgs["result"]["notificationDelivery"]>;
export type NotificationDeliverySelectScalar = {
    id?: boolean;
    batchId?: boolean;
    userId?: boolean;
    title?: boolean;
    message?: boolean;
    type?: boolean;
    channels?: boolean;
    data?: boolean;
    targetType?: boolean;
    targetId?: boolean;
    priority?: boolean;
    read?: boolean;
    createdAt?: boolean;
    readAt?: boolean;
    sentAt?: boolean;
    deliveredAt?: boolean;
    failedAt?: boolean;
    retryCount?: boolean;
    lastError?: boolean;
    scheduledAt?: boolean;
};
export type NotificationDeliveryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "batchId" | "userId" | "title" | "message" | "type" | "channels" | "data" | "targetType" | "targetId" | "priority" | "read" | "createdAt" | "readAt" | "sentAt" | "deliveredAt" | "failedAt" | "retryCount" | "lastError" | "scheduledAt", ExtArgs["result"]["notificationDelivery"]>;
export type NotificationDeliveryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    batch?: boolean | Prisma.NotificationDelivery$batchArgs<ExtArgs>;
    user?: boolean | Prisma.NotificationDelivery$userArgs<ExtArgs>;
};
export type NotificationDeliveryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    batch?: boolean | Prisma.NotificationDelivery$batchArgs<ExtArgs>;
    user?: boolean | Prisma.NotificationDelivery$userArgs<ExtArgs>;
};
export type NotificationDeliveryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    batch?: boolean | Prisma.NotificationDelivery$batchArgs<ExtArgs>;
    user?: boolean | Prisma.NotificationDelivery$userArgs<ExtArgs>;
};
export type $NotificationDeliveryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NotificationDelivery";
    objects: {
        batch: Prisma.$NotificationBatchPayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        batchId: string | null;
        userId: string | null;
        title: string;
        message: string;
        type: $Enums.NotificationType;
        channels: runtime.JsonValue;
        data: runtime.JsonValue | null;
        targetType: string | null;
        targetId: string | null;
        priority: number;
        read: boolean;
        createdAt: Date;
        readAt: Date | null;
        sentAt: Date | null;
        deliveredAt: Date | null;
        failedAt: Date | null;
        retryCount: number;
        lastError: string | null;
        scheduledAt: Date | null;
    }, ExtArgs["result"]["notificationDelivery"]>;
    composites: {};
};
export type NotificationDeliveryGetPayload<S extends boolean | null | undefined | NotificationDeliveryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload, S>;
export type NotificationDeliveryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationDeliveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationDeliveryCountAggregateInputType | true;
};
export interface NotificationDeliveryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NotificationDelivery'];
        meta: {
            name: 'NotificationDelivery';
        };
    };
    /**
     * Find zero or one NotificationDelivery that matches the filter.
     * @param {NotificationDeliveryFindUniqueArgs} args - Arguments to find a NotificationDelivery
     * @example
     * // Get one NotificationDelivery
     * const notificationDelivery = await prisma.notificationDelivery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationDeliveryFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one NotificationDelivery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationDeliveryFindUniqueOrThrowArgs} args - Arguments to find a NotificationDelivery
     * @example
     * // Get one NotificationDelivery
     * const notificationDelivery = await prisma.notificationDelivery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationDeliveryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NotificationDelivery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryFindFirstArgs} args - Arguments to find a NotificationDelivery
     * @example
     * // Get one NotificationDelivery
     * const notificationDelivery = await prisma.notificationDelivery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationDeliveryFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NotificationDelivery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryFindFirstOrThrowArgs} args - Arguments to find a NotificationDelivery
     * @example
     * // Get one NotificationDelivery
     * const notificationDelivery = await prisma.notificationDelivery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationDeliveryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more NotificationDeliveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationDeliveries
     * const notificationDeliveries = await prisma.notificationDelivery.findMany()
     *
     * // Get first 10 NotificationDeliveries
     * const notificationDeliveries = await prisma.notificationDelivery.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const notificationDeliveryWithIdOnly = await prisma.notificationDelivery.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NotificationDeliveryFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a NotificationDelivery.
     * @param {NotificationDeliveryCreateArgs} args - Arguments to create a NotificationDelivery.
     * @example
     * // Create one NotificationDelivery
     * const NotificationDelivery = await prisma.notificationDelivery.create({
     *   data: {
     *     // ... data to create a NotificationDelivery
     *   }
     * })
     *
     */
    create<T extends NotificationDeliveryCreateArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many NotificationDeliveries.
     * @param {NotificationDeliveryCreateManyArgs} args - Arguments to create many NotificationDeliveries.
     * @example
     * // Create many NotificationDeliveries
     * const notificationDelivery = await prisma.notificationDelivery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NotificationDeliveryCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many NotificationDeliveries and returns the data saved in the database.
     * @param {NotificationDeliveryCreateManyAndReturnArgs} args - Arguments to create many NotificationDeliveries.
     * @example
     * // Create many NotificationDeliveries
     * const notificationDelivery = await prisma.notificationDelivery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many NotificationDeliveries and only return the `id`
     * const notificationDeliveryWithIdOnly = await prisma.notificationDelivery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NotificationDeliveryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a NotificationDelivery.
     * @param {NotificationDeliveryDeleteArgs} args - Arguments to delete one NotificationDelivery.
     * @example
     * // Delete one NotificationDelivery
     * const NotificationDelivery = await prisma.notificationDelivery.delete({
     *   where: {
     *     // ... filter to delete one NotificationDelivery
     *   }
     * })
     *
     */
    delete<T extends NotificationDeliveryDeleteArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one NotificationDelivery.
     * @param {NotificationDeliveryUpdateArgs} args - Arguments to update one NotificationDelivery.
     * @example
     * // Update one NotificationDelivery
     * const notificationDelivery = await prisma.notificationDelivery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NotificationDeliveryUpdateArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more NotificationDeliveries.
     * @param {NotificationDeliveryDeleteManyArgs} args - Arguments to filter NotificationDeliveries to delete.
     * @example
     * // Delete a few NotificationDeliveries
     * const { count } = await prisma.notificationDelivery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NotificationDeliveryDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NotificationDeliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationDeliveries
     * const notificationDelivery = await prisma.notificationDelivery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NotificationDeliveryUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NotificationDeliveries and returns the data updated in the database.
     * @param {NotificationDeliveryUpdateManyAndReturnArgs} args - Arguments to update many NotificationDeliveries.
     * @example
     * // Update many NotificationDeliveries
     * const notificationDelivery = await prisma.notificationDelivery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more NotificationDeliveries and only return the `id`
     * const notificationDeliveryWithIdOnly = await prisma.notificationDelivery.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationDeliveryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one NotificationDelivery.
     * @param {NotificationDeliveryUpsertArgs} args - Arguments to update or create a NotificationDelivery.
     * @example
     * // Update or create a NotificationDelivery
     * const notificationDelivery = await prisma.notificationDelivery.upsert({
     *   create: {
     *     // ... data to create a NotificationDelivery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationDelivery we want to update
     *   }
     * })
     */
    upsert<T extends NotificationDeliveryUpsertArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of NotificationDeliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryCountArgs} args - Arguments to filter NotificationDeliveries to count.
     * @example
     * // Count the number of NotificationDeliveries
     * const count = await prisma.notificationDelivery.count({
     *   where: {
     *     // ... the filter for the NotificationDeliveries we want to count
     *   }
     * })
    **/
    count<T extends NotificationDeliveryCountArgs>(args?: Prisma.Subset<T, NotificationDeliveryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationDeliveryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a NotificationDelivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationDeliveryAggregateArgs>(args: Prisma.Subset<T, NotificationDeliveryAggregateArgs>): Prisma.PrismaPromise<GetNotificationDeliveryAggregateType<T>>;
    /**
     * Group by NotificationDelivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryGroupByArgs} args - Group by arguments.
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
    groupBy<T extends NotificationDeliveryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationDeliveryGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationDeliveryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationDeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the NotificationDelivery model
     */
    readonly fields: NotificationDeliveryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for NotificationDelivery.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__NotificationDeliveryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    batch<T extends Prisma.NotificationDelivery$batchArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NotificationDelivery$batchArgs<ExtArgs>>): Prisma.Prisma__NotificationBatchClient<runtime.Types.Result.GetResult<Prisma.$NotificationBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.NotificationDelivery$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NotificationDelivery$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the NotificationDelivery model
 */
export interface NotificationDeliveryFieldRefs {
    readonly id: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly batchId: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly userId: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly title: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly message: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly type: Prisma.FieldRef<"NotificationDelivery", 'NotificationType'>;
    readonly channels: Prisma.FieldRef<"NotificationDelivery", 'Json'>;
    readonly data: Prisma.FieldRef<"NotificationDelivery", 'Json'>;
    readonly targetType: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly targetId: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly priority: Prisma.FieldRef<"NotificationDelivery", 'Int'>;
    readonly read: Prisma.FieldRef<"NotificationDelivery", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"NotificationDelivery", 'DateTime'>;
    readonly readAt: Prisma.FieldRef<"NotificationDelivery", 'DateTime'>;
    readonly sentAt: Prisma.FieldRef<"NotificationDelivery", 'DateTime'>;
    readonly deliveredAt: Prisma.FieldRef<"NotificationDelivery", 'DateTime'>;
    readonly failedAt: Prisma.FieldRef<"NotificationDelivery", 'DateTime'>;
    readonly retryCount: Prisma.FieldRef<"NotificationDelivery", 'Int'>;
    readonly lastError: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly scheduledAt: Prisma.FieldRef<"NotificationDelivery", 'DateTime'>;
}
/**
 * NotificationDelivery findUnique
 */
export type NotificationDeliveryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * Filter, which NotificationDelivery to fetch.
     */
    where: Prisma.NotificationDeliveryWhereUniqueInput;
};
/**
 * NotificationDelivery findUniqueOrThrow
 */
export type NotificationDeliveryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * Filter, which NotificationDelivery to fetch.
     */
    where: Prisma.NotificationDeliveryWhereUniqueInput;
};
/**
 * NotificationDelivery findFirst
 */
export type NotificationDeliveryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * Filter, which NotificationDelivery to fetch.
     */
    where?: Prisma.NotificationDeliveryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotificationDeliveries to fetch.
     */
    orderBy?: Prisma.NotificationDeliveryOrderByWithRelationInput | Prisma.NotificationDeliveryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NotificationDeliveries.
     */
    cursor?: Prisma.NotificationDeliveryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotificationDeliveries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotificationDeliveries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NotificationDeliveries.
     */
    distinct?: Prisma.NotificationDeliveryScalarFieldEnum | Prisma.NotificationDeliveryScalarFieldEnum[];
};
/**
 * NotificationDelivery findFirstOrThrow
 */
export type NotificationDeliveryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * Filter, which NotificationDelivery to fetch.
     */
    where?: Prisma.NotificationDeliveryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotificationDeliveries to fetch.
     */
    orderBy?: Prisma.NotificationDeliveryOrderByWithRelationInput | Prisma.NotificationDeliveryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NotificationDeliveries.
     */
    cursor?: Prisma.NotificationDeliveryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotificationDeliveries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotificationDeliveries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NotificationDeliveries.
     */
    distinct?: Prisma.NotificationDeliveryScalarFieldEnum | Prisma.NotificationDeliveryScalarFieldEnum[];
};
/**
 * NotificationDelivery findMany
 */
export type NotificationDeliveryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * Filter, which NotificationDeliveries to fetch.
     */
    where?: Prisma.NotificationDeliveryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotificationDeliveries to fetch.
     */
    orderBy?: Prisma.NotificationDeliveryOrderByWithRelationInput | Prisma.NotificationDeliveryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing NotificationDeliveries.
     */
    cursor?: Prisma.NotificationDeliveryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotificationDeliveries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotificationDeliveries.
     */
    skip?: number;
    distinct?: Prisma.NotificationDeliveryScalarFieldEnum | Prisma.NotificationDeliveryScalarFieldEnum[];
};
/**
 * NotificationDelivery create
 */
export type NotificationDeliveryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * The data needed to create a NotificationDelivery.
     */
    data: Prisma.XOR<Prisma.NotificationDeliveryCreateInput, Prisma.NotificationDeliveryUncheckedCreateInput>;
};
/**
 * NotificationDelivery createMany
 */
export type NotificationDeliveryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationDeliveries.
     */
    data: Prisma.NotificationDeliveryCreateManyInput | Prisma.NotificationDeliveryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * NotificationDelivery createManyAndReturn
 */
export type NotificationDeliveryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * The data used to create many NotificationDeliveries.
     */
    data: Prisma.NotificationDeliveryCreateManyInput | Prisma.NotificationDeliveryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * NotificationDelivery update
 */
export type NotificationDeliveryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * The data needed to update a NotificationDelivery.
     */
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateInput, Prisma.NotificationDeliveryUncheckedUpdateInput>;
    /**
     * Choose, which NotificationDelivery to update.
     */
    where: Prisma.NotificationDeliveryWhereUniqueInput;
};
/**
 * NotificationDelivery updateMany
 */
export type NotificationDeliveryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationDeliveries.
     */
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateManyMutationInput, Prisma.NotificationDeliveryUncheckedUpdateManyInput>;
    /**
     * Filter which NotificationDeliveries to update
     */
    where?: Prisma.NotificationDeliveryWhereInput;
    /**
     * Limit how many NotificationDeliveries to update.
     */
    limit?: number;
};
/**
 * NotificationDelivery updateManyAndReturn
 */
export type NotificationDeliveryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * The data used to update NotificationDeliveries.
     */
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateManyMutationInput, Prisma.NotificationDeliveryUncheckedUpdateManyInput>;
    /**
     * Filter which NotificationDeliveries to update
     */
    where?: Prisma.NotificationDeliveryWhereInput;
    /**
     * Limit how many NotificationDeliveries to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * NotificationDelivery upsert
 */
export type NotificationDeliveryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * The filter to search for the NotificationDelivery to update in case it exists.
     */
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    /**
     * In case the NotificationDelivery found by the `where` argument doesn't exist, create a new NotificationDelivery with this data.
     */
    create: Prisma.XOR<Prisma.NotificationDeliveryCreateInput, Prisma.NotificationDeliveryUncheckedCreateInput>;
    /**
     * In case the NotificationDelivery was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.NotificationDeliveryUpdateInput, Prisma.NotificationDeliveryUncheckedUpdateInput>;
};
/**
 * NotificationDelivery delete
 */
export type NotificationDeliveryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    /**
     * Filter which NotificationDelivery to delete.
     */
    where: Prisma.NotificationDeliveryWhereUniqueInput;
};
/**
 * NotificationDelivery deleteMany
 */
export type NotificationDeliveryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationDeliveries to delete
     */
    where?: Prisma.NotificationDeliveryWhereInput;
    /**
     * Limit how many NotificationDeliveries to delete.
     */
    limit?: number;
};
/**
 * NotificationDelivery.batch
 */
export type NotificationDelivery$batchArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationBatch
     */
    select?: Prisma.NotificationBatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationBatch
     */
    omit?: Prisma.NotificationBatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationBatchInclude<ExtArgs> | null;
    where?: Prisma.NotificationBatchWhereInput;
};
/**
 * NotificationDelivery.user
 */
export type NotificationDelivery$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * NotificationDelivery without action
 */
export type NotificationDeliveryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDelivery
     */
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationDelivery
     */
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=NotificationDelivery.d.ts.map