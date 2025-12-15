import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | Prisma.EnumUserTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserType[] | Prisma.ListEnumUserTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserType[] | Prisma.ListEnumUserTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType;
};
export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | Prisma.EnumUserTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserType[] | Prisma.ListEnumUserTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserType[] | Prisma.ListEnumUserTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserTypeFilter<$PrismaModel>;
};
export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumAccessLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessLevel | Prisma.EnumAccessLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.AccessLevel[] | Prisma.ListEnumAccessLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccessLevel[] | Prisma.ListEnumAccessLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccessLevelFilter<$PrismaModel> | $Enums.AccessLevel;
};
export type EnumAccessLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessLevel | Prisma.EnumAccessLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.AccessLevel[] | Prisma.ListEnumAccessLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccessLevel[] | Prisma.ListEnumAccessLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccessLevelWithAggregatesFilter<$PrismaModel> | $Enums.AccessLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAccessLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAccessLevelFilter<$PrismaModel>;
};
export type EnumPolicyEffectFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyEffect | Prisma.EnumPolicyEffectFieldRefInput<$PrismaModel>;
    in?: $Enums.PolicyEffect[] | Prisma.ListEnumPolicyEffectFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PolicyEffect[] | Prisma.ListEnumPolicyEffectFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPolicyEffectFilter<$PrismaModel> | $Enums.PolicyEffect;
};
export type JsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>, Required<JsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;
export type JsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type EnumPolicyEffectWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyEffect | Prisma.EnumPolicyEffectFieldRefInput<$PrismaModel>;
    in?: $Enums.PolicyEffect[] | Prisma.ListEnumPolicyEffectFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PolicyEffect[] | Prisma.ListEnumPolicyEffectFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPolicyEffectWithAggregatesFilter<$PrismaModel> | $Enums.PolicyEffect;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPolicyEffectFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPolicyEffectFilter<$PrismaModel>;
};
export type JsonWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type EnumRecordStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | Prisma.EnumRecordStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RecordStatus[] | Prisma.ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RecordStatus[] | Prisma.ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRecordStatusFilter<$PrismaModel> | $Enums.RecordStatus;
};
export type EnumRecordStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | Prisma.EnumRecordStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RecordStatus[] | Prisma.ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RecordStatus[] | Prisma.ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel> | $Enums.RecordStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRecordStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRecordStatusFilter<$PrismaModel>;
};
export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | Prisma.EnumTaskStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskStatus[] | Prisma.ListEnumTaskStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskStatus[] | Prisma.ListEnumTaskStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus;
};
export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | Prisma.EnumTaskStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskStatus[] | Prisma.ListEnumTaskStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskStatus[] | Prisma.ListEnumTaskStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTaskStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTaskStatusFilter<$PrismaModel>;
};
export type EnumAuditEntityFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEntity | Prisma.EnumAuditEntityFieldRefInput<$PrismaModel>;
    in?: $Enums.AuditEntity[] | Prisma.ListEnumAuditEntityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuditEntity[] | Prisma.ListEnumAuditEntityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuditEntityFilter<$PrismaModel> | $Enums.AuditEntity;
};
export type EnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | Prisma.EnumAuditActionFieldRefInput<$PrismaModel>;
    in?: $Enums.AuditAction[] | Prisma.ListEnumAuditActionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuditAction[] | Prisma.ListEnumAuditActionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction;
};
export type EnumPerformedByTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PerformedByType | Prisma.EnumPerformedByTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PerformedByType[] | Prisma.ListEnumPerformedByTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PerformedByType[] | Prisma.ListEnumPerformedByTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPerformedByTypeFilter<$PrismaModel> | $Enums.PerformedByType;
};
export type EnumAuditEntityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEntity | Prisma.EnumAuditEntityFieldRefInput<$PrismaModel>;
    in?: $Enums.AuditEntity[] | Prisma.ListEnumAuditEntityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuditEntity[] | Prisma.ListEnumAuditEntityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuditEntityWithAggregatesFilter<$PrismaModel> | $Enums.AuditEntity;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAuditEntityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAuditEntityFilter<$PrismaModel>;
};
export type EnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | Prisma.EnumAuditActionFieldRefInput<$PrismaModel>;
    in?: $Enums.AuditAction[] | Prisma.ListEnumAuditActionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuditAction[] | Prisma.ListEnumAuditActionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAuditActionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAuditActionFilter<$PrismaModel>;
};
export type EnumPerformedByTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PerformedByType | Prisma.EnumPerformedByTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PerformedByType[] | Prisma.ListEnumPerformedByTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PerformedByType[] | Prisma.ListEnumPerformedByTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPerformedByTypeWithAggregatesFilter<$PrismaModel> | $Enums.PerformedByType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPerformedByTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPerformedByTypeFilter<$PrismaModel>;
};
export type EnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel;
};
export type EnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
};
export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumWorkflowInstanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowInstanceStatus | Prisma.EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel> | $Enums.WorkflowInstanceStatus;
};
export type EnumWorkflowInstanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowInstanceStatus | Prisma.EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkflowInstanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowInstanceStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | Prisma.EnumUserTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserType[] | Prisma.ListEnumUserTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserType[] | Prisma.ListEnumUserTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType;
};
export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | Prisma.EnumUserTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserType[] | Prisma.ListEnumUserTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserType[] | Prisma.ListEnumUserTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserTypeFilter<$PrismaModel>;
};
export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumAccessLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessLevel | Prisma.EnumAccessLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.AccessLevel[] | Prisma.ListEnumAccessLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccessLevel[] | Prisma.ListEnumAccessLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccessLevelFilter<$PrismaModel> | $Enums.AccessLevel;
};
export type NestedEnumAccessLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessLevel | Prisma.EnumAccessLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.AccessLevel[] | Prisma.ListEnumAccessLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccessLevel[] | Prisma.ListEnumAccessLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccessLevelWithAggregatesFilter<$PrismaModel> | $Enums.AccessLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAccessLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAccessLevelFilter<$PrismaModel>;
};
export type NestedEnumPolicyEffectFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyEffect | Prisma.EnumPolicyEffectFieldRefInput<$PrismaModel>;
    in?: $Enums.PolicyEffect[] | Prisma.ListEnumPolicyEffectFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PolicyEffect[] | Prisma.ListEnumPolicyEffectFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPolicyEffectFilter<$PrismaModel> | $Enums.PolicyEffect;
};
export type NestedEnumPolicyEffectWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyEffect | Prisma.EnumPolicyEffectFieldRefInput<$PrismaModel>;
    in?: $Enums.PolicyEffect[] | Prisma.ListEnumPolicyEffectFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PolicyEffect[] | Prisma.ListEnumPolicyEffectFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPolicyEffectWithAggregatesFilter<$PrismaModel> | $Enums.PolicyEffect;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPolicyEffectFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPolicyEffectFilter<$PrismaModel>;
};
export type NestedJsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedEnumRecordStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | Prisma.EnumRecordStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RecordStatus[] | Prisma.ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RecordStatus[] | Prisma.ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRecordStatusFilter<$PrismaModel> | $Enums.RecordStatus;
};
export type NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | Prisma.EnumRecordStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RecordStatus[] | Prisma.ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RecordStatus[] | Prisma.ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel> | $Enums.RecordStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRecordStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRecordStatusFilter<$PrismaModel>;
};
export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | Prisma.EnumTaskStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskStatus[] | Prisma.ListEnumTaskStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskStatus[] | Prisma.ListEnumTaskStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus;
};
export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | Prisma.EnumTaskStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskStatus[] | Prisma.ListEnumTaskStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskStatus[] | Prisma.ListEnumTaskStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTaskStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTaskStatusFilter<$PrismaModel>;
};
export type NestedEnumAuditEntityFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEntity | Prisma.EnumAuditEntityFieldRefInput<$PrismaModel>;
    in?: $Enums.AuditEntity[] | Prisma.ListEnumAuditEntityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuditEntity[] | Prisma.ListEnumAuditEntityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuditEntityFilter<$PrismaModel> | $Enums.AuditEntity;
};
export type NestedEnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | Prisma.EnumAuditActionFieldRefInput<$PrismaModel>;
    in?: $Enums.AuditAction[] | Prisma.ListEnumAuditActionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuditAction[] | Prisma.ListEnumAuditActionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction;
};
export type NestedEnumPerformedByTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PerformedByType | Prisma.EnumPerformedByTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PerformedByType[] | Prisma.ListEnumPerformedByTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PerformedByType[] | Prisma.ListEnumPerformedByTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPerformedByTypeFilter<$PrismaModel> | $Enums.PerformedByType;
};
export type NestedEnumAuditEntityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEntity | Prisma.EnumAuditEntityFieldRefInput<$PrismaModel>;
    in?: $Enums.AuditEntity[] | Prisma.ListEnumAuditEntityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuditEntity[] | Prisma.ListEnumAuditEntityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuditEntityWithAggregatesFilter<$PrismaModel> | $Enums.AuditEntity;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAuditEntityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAuditEntityFilter<$PrismaModel>;
};
export type NestedEnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | Prisma.EnumAuditActionFieldRefInput<$PrismaModel>;
    in?: $Enums.AuditAction[] | Prisma.ListEnumAuditActionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuditAction[] | Prisma.ListEnumAuditActionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAuditActionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAuditActionFilter<$PrismaModel>;
};
export type NestedEnumPerformedByTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PerformedByType | Prisma.EnumPerformedByTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PerformedByType[] | Prisma.ListEnumPerformedByTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PerformedByType[] | Prisma.ListEnumPerformedByTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPerformedByTypeWithAggregatesFilter<$PrismaModel> | $Enums.PerformedByType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPerformedByTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPerformedByTypeFilter<$PrismaModel>;
};
export type NestedEnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel;
};
export type NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
};
export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumWorkflowInstanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowInstanceStatus | Prisma.EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel> | $Enums.WorkflowInstanceStatus;
};
export type NestedEnumWorkflowInstanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowInstanceStatus | Prisma.EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkflowInstanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowInstanceStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel>;
};
//# sourceMappingURL=commonInputTypes.d.ts.map