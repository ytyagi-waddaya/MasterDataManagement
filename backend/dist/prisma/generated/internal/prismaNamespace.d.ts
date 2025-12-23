import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.0.1
 * Query Engine version: f09f2815f091dbba658cdcd2264306d88bb5bda6
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Role: "Role";
    readonly RoleHierarchy: "RoleHierarchy";
    readonly UserRole: "UserRole";
    readonly Module: "Module";
    readonly Action: "Action";
    readonly Resource: "Resource";
    readonly Permission: "Permission";
    readonly RolePermission: "RolePermission";
    readonly ConditionFieldRegistry: "ConditionFieldRegistry";
    readonly Policy: "Policy";
    readonly MasterObject: "MasterObject";
    readonly MasterObjectSchema: "MasterObjectSchema";
    readonly FieldDefinition: "FieldDefinition";
    readonly FieldPermission: "FieldPermission";
    readonly FieldValidationRule: "FieldValidationRule";
    readonly FieldFormula: "FieldFormula";
    readonly FieldReference: "FieldReference";
    readonly FieldConditionBinding: "FieldConditionBinding";
    readonly MasterRecord: "MasterRecord";
    readonly RecordFieldHistory: "RecordFieldHistory";
    readonly RecordFieldIndex: "RecordFieldIndex";
    readonly SchemaChange: "SchemaChange";
    readonly FormEventHook: "FormEventHook";
    readonly RecordPermission: "RecordPermission";
    readonly WorkflowDefinition: "WorkflowDefinition";
    readonly WorkflowStage: "WorkflowStage";
    readonly WorkflowTransition: "WorkflowTransition";
    readonly WorkflowInstance: "WorkflowInstance";
    readonly WorkflowHistory: "WorkflowHistory";
    readonly WorkflowTransitionAllowedRole: "WorkflowTransitionAllowedRole";
    readonly WorkflowTransitionAllowedUser: "WorkflowTransitionAllowedUser";
    readonly WorkflowApproval: "WorkflowApproval";
    readonly Task: "Task";
    readonly TaskAssignment: "TaskAssignment";
    readonly AuditLog: "AuditLog";
    readonly NotificationTemplate: "NotificationTemplate";
    readonly NotificationBatch: "NotificationBatch";
    readonly NotificationDelivery: "NotificationDelivery";
    readonly Notification: "Notification";
    readonly OutboxEvent: "OutboxEvent";
    readonly EventLog: "EventLog";
    readonly Attachment: "Attachment";
    readonly RefreshToken: "RefreshToken";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "role" | "roleHierarchy" | "userRole" | "module" | "action" | "resource" | "permission" | "rolePermission" | "conditionFieldRegistry" | "policy" | "masterObject" | "masterObjectSchema" | "fieldDefinition" | "fieldPermission" | "fieldValidationRule" | "fieldFormula" | "fieldReference" | "fieldConditionBinding" | "masterRecord" | "recordFieldHistory" | "recordFieldIndex" | "schemaChange" | "formEventHook" | "recordPermission" | "workflowDefinition" | "workflowStage" | "workflowTransition" | "workflowInstance" | "workflowHistory" | "workflowTransitionAllowedRole" | "workflowTransitionAllowedUser" | "workflowApproval" | "task" | "taskAssignment" | "auditLog" | "notificationTemplate" | "notificationBatch" | "notificationDelivery" | "notification" | "outboxEvent" | "eventLog" | "attachment" | "refreshToken";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Role: {
            payload: Prisma.$RolePayload<ExtArgs>;
            fields: Prisma.RoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findFirst: {
                    args: Prisma.RoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findMany: {
                    args: Prisma.RoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                create: {
                    args: Prisma.RoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                createMany: {
                    args: Prisma.RoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                delete: {
                    args: Prisma.RoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                update: {
                    args: Prisma.RoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                deleteMany: {
                    args: Prisma.RoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                upsert: {
                    args: Prisma.RoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                aggregate: {
                    args: Prisma.RoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRole>;
                };
                groupBy: {
                    args: Prisma.RoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleCountAggregateOutputType> | number;
                };
            };
        };
        RoleHierarchy: {
            payload: Prisma.$RoleHierarchyPayload<ExtArgs>;
            fields: Prisma.RoleHierarchyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoleHierarchyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoleHierarchyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>;
                };
                findFirst: {
                    args: Prisma.RoleHierarchyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoleHierarchyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>;
                };
                findMany: {
                    args: Prisma.RoleHierarchyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>[];
                };
                create: {
                    args: Prisma.RoleHierarchyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>;
                };
                createMany: {
                    args: Prisma.RoleHierarchyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoleHierarchyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>[];
                };
                delete: {
                    args: Prisma.RoleHierarchyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>;
                };
                update: {
                    args: Prisma.RoleHierarchyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>;
                };
                deleteMany: {
                    args: Prisma.RoleHierarchyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoleHierarchyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoleHierarchyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>[];
                };
                upsert: {
                    args: Prisma.RoleHierarchyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleHierarchyPayload>;
                };
                aggregate: {
                    args: Prisma.RoleHierarchyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoleHierarchy>;
                };
                groupBy: {
                    args: Prisma.RoleHierarchyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleHierarchyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoleHierarchyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleHierarchyCountAggregateOutputType> | number;
                };
            };
        };
        UserRole: {
            payload: Prisma.$UserRolePayload<ExtArgs>;
            fields: Prisma.UserRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                findFirst: {
                    args: Prisma.UserRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                findMany: {
                    args: Prisma.UserRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                create: {
                    args: Prisma.UserRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                createMany: {
                    args: Prisma.UserRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                delete: {
                    args: Prisma.UserRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                update: {
                    args: Prisma.UserRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                deleteMany: {
                    args: Prisma.UserRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                upsert: {
                    args: Prisma.UserRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                aggregate: {
                    args: Prisma.UserRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserRole>;
                };
                groupBy: {
                    args: Prisma.UserRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserRoleCountAggregateOutputType> | number;
                };
            };
        };
        Module: {
            payload: Prisma.$ModulePayload<ExtArgs>;
            fields: Prisma.ModuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ModuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ModuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>;
                };
                findFirst: {
                    args: Prisma.ModuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ModuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>;
                };
                findMany: {
                    args: Prisma.ModuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>[];
                };
                create: {
                    args: Prisma.ModuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>;
                };
                createMany: {
                    args: Prisma.ModuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ModuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>[];
                };
                delete: {
                    args: Prisma.ModuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>;
                };
                update: {
                    args: Prisma.ModuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>;
                };
                deleteMany: {
                    args: Prisma.ModuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ModuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ModuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>[];
                };
                upsert: {
                    args: Prisma.ModuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModulePayload>;
                };
                aggregate: {
                    args: Prisma.ModuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateModule>;
                };
                groupBy: {
                    args: Prisma.ModuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ModuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ModuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ModuleCountAggregateOutputType> | number;
                };
            };
        };
        Action: {
            payload: Prisma.$ActionPayload<ExtArgs>;
            fields: Prisma.ActionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ActionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ActionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>;
                };
                findFirst: {
                    args: Prisma.ActionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ActionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>;
                };
                findMany: {
                    args: Prisma.ActionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>[];
                };
                create: {
                    args: Prisma.ActionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>;
                };
                createMany: {
                    args: Prisma.ActionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ActionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>[];
                };
                delete: {
                    args: Prisma.ActionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>;
                };
                update: {
                    args: Prisma.ActionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>;
                };
                deleteMany: {
                    args: Prisma.ActionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ActionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ActionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>[];
                };
                upsert: {
                    args: Prisma.ActionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActionPayload>;
                };
                aggregate: {
                    args: Prisma.ActionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAction>;
                };
                groupBy: {
                    args: Prisma.ActionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ActionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActionCountAggregateOutputType> | number;
                };
            };
        };
        Resource: {
            payload: Prisma.$ResourcePayload<ExtArgs>;
            fields: Prisma.ResourceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ResourceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ResourceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>;
                };
                findFirst: {
                    args: Prisma.ResourceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ResourceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>;
                };
                findMany: {
                    args: Prisma.ResourceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>[];
                };
                create: {
                    args: Prisma.ResourceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>;
                };
                createMany: {
                    args: Prisma.ResourceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ResourceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>[];
                };
                delete: {
                    args: Prisma.ResourceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>;
                };
                update: {
                    args: Prisma.ResourceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>;
                };
                deleteMany: {
                    args: Prisma.ResourceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ResourceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ResourceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>[];
                };
                upsert: {
                    args: Prisma.ResourceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourcePayload>;
                };
                aggregate: {
                    args: Prisma.ResourceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateResource>;
                };
                groupBy: {
                    args: Prisma.ResourceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResourceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ResourceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResourceCountAggregateOutputType> | number;
                };
            };
        };
        Permission: {
            payload: Prisma.$PermissionPayload<ExtArgs>;
            fields: Prisma.PermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findFirst: {
                    args: Prisma.PermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findMany: {
                    args: Prisma.PermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                create: {
                    args: Prisma.PermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                createMany: {
                    args: Prisma.PermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                delete: {
                    args: Prisma.PermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                update: {
                    args: Prisma.PermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.PermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                upsert: {
                    args: Prisma.PermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                aggregate: {
                    args: Prisma.PermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePermission>;
                };
                groupBy: {
                    args: Prisma.PermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionCountAggregateOutputType> | number;
                };
            };
        };
        RolePermission: {
            payload: Prisma.$RolePermissionPayload<ExtArgs>;
            fields: Prisma.RolePermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findFirst: {
                    args: Prisma.RolePermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findMany: {
                    args: Prisma.RolePermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                create: {
                    args: Prisma.RolePermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                createMany: {
                    args: Prisma.RolePermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                delete: {
                    args: Prisma.RolePermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                update: {
                    args: Prisma.RolePermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                upsert: {
                    args: Prisma.RolePermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                aggregate: {
                    args: Prisma.RolePermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRolePermission>;
                };
                groupBy: {
                    args: Prisma.RolePermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RolePermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionCountAggregateOutputType> | number;
                };
            };
        };
        ConditionFieldRegistry: {
            payload: Prisma.$ConditionFieldRegistryPayload<ExtArgs>;
            fields: Prisma.ConditionFieldRegistryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConditionFieldRegistryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConditionFieldRegistryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>;
                };
                findFirst: {
                    args: Prisma.ConditionFieldRegistryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConditionFieldRegistryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>;
                };
                findMany: {
                    args: Prisma.ConditionFieldRegistryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>[];
                };
                create: {
                    args: Prisma.ConditionFieldRegistryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>;
                };
                createMany: {
                    args: Prisma.ConditionFieldRegistryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConditionFieldRegistryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>[];
                };
                delete: {
                    args: Prisma.ConditionFieldRegistryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>;
                };
                update: {
                    args: Prisma.ConditionFieldRegistryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>;
                };
                deleteMany: {
                    args: Prisma.ConditionFieldRegistryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConditionFieldRegistryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConditionFieldRegistryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>[];
                };
                upsert: {
                    args: Prisma.ConditionFieldRegistryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConditionFieldRegistryPayload>;
                };
                aggregate: {
                    args: Prisma.ConditionFieldRegistryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConditionFieldRegistry>;
                };
                groupBy: {
                    args: Prisma.ConditionFieldRegistryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConditionFieldRegistryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConditionFieldRegistryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConditionFieldRegistryCountAggregateOutputType> | number;
                };
            };
        };
        Policy: {
            payload: Prisma.$PolicyPayload<ExtArgs>;
            fields: Prisma.PolicyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PolicyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PolicyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>;
                };
                findFirst: {
                    args: Prisma.PolicyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PolicyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>;
                };
                findMany: {
                    args: Prisma.PolicyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>[];
                };
                create: {
                    args: Prisma.PolicyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>;
                };
                createMany: {
                    args: Prisma.PolicyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PolicyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>[];
                };
                delete: {
                    args: Prisma.PolicyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>;
                };
                update: {
                    args: Prisma.PolicyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>;
                };
                deleteMany: {
                    args: Prisma.PolicyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PolicyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PolicyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>[];
                };
                upsert: {
                    args: Prisma.PolicyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PolicyPayload>;
                };
                aggregate: {
                    args: Prisma.PolicyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePolicy>;
                };
                groupBy: {
                    args: Prisma.PolicyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PolicyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PolicyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PolicyCountAggregateOutputType> | number;
                };
            };
        };
        MasterObject: {
            payload: Prisma.$MasterObjectPayload<ExtArgs>;
            fields: Prisma.MasterObjectFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MasterObjectFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MasterObjectFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>;
                };
                findFirst: {
                    args: Prisma.MasterObjectFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MasterObjectFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>;
                };
                findMany: {
                    args: Prisma.MasterObjectFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>[];
                };
                create: {
                    args: Prisma.MasterObjectCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>;
                };
                createMany: {
                    args: Prisma.MasterObjectCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MasterObjectCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>[];
                };
                delete: {
                    args: Prisma.MasterObjectDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>;
                };
                update: {
                    args: Prisma.MasterObjectUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>;
                };
                deleteMany: {
                    args: Prisma.MasterObjectDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MasterObjectUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MasterObjectUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>[];
                };
                upsert: {
                    args: Prisma.MasterObjectUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectPayload>;
                };
                aggregate: {
                    args: Prisma.MasterObjectAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMasterObject>;
                };
                groupBy: {
                    args: Prisma.MasterObjectGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MasterObjectGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MasterObjectCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MasterObjectCountAggregateOutputType> | number;
                };
            };
        };
        MasterObjectSchema: {
            payload: Prisma.$MasterObjectSchemaPayload<ExtArgs>;
            fields: Prisma.MasterObjectSchemaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MasterObjectSchemaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MasterObjectSchemaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>;
                };
                findFirst: {
                    args: Prisma.MasterObjectSchemaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MasterObjectSchemaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>;
                };
                findMany: {
                    args: Prisma.MasterObjectSchemaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>[];
                };
                create: {
                    args: Prisma.MasterObjectSchemaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>;
                };
                createMany: {
                    args: Prisma.MasterObjectSchemaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MasterObjectSchemaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>[];
                };
                delete: {
                    args: Prisma.MasterObjectSchemaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>;
                };
                update: {
                    args: Prisma.MasterObjectSchemaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>;
                };
                deleteMany: {
                    args: Prisma.MasterObjectSchemaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MasterObjectSchemaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MasterObjectSchemaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>[];
                };
                upsert: {
                    args: Prisma.MasterObjectSchemaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterObjectSchemaPayload>;
                };
                aggregate: {
                    args: Prisma.MasterObjectSchemaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMasterObjectSchema>;
                };
                groupBy: {
                    args: Prisma.MasterObjectSchemaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MasterObjectSchemaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MasterObjectSchemaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MasterObjectSchemaCountAggregateOutputType> | number;
                };
            };
        };
        FieldDefinition: {
            payload: Prisma.$FieldDefinitionPayload<ExtArgs>;
            fields: Prisma.FieldDefinitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FieldDefinitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FieldDefinitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>;
                };
                findFirst: {
                    args: Prisma.FieldDefinitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FieldDefinitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>;
                };
                findMany: {
                    args: Prisma.FieldDefinitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>[];
                };
                create: {
                    args: Prisma.FieldDefinitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>;
                };
                createMany: {
                    args: Prisma.FieldDefinitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FieldDefinitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>[];
                };
                delete: {
                    args: Prisma.FieldDefinitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>;
                };
                update: {
                    args: Prisma.FieldDefinitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>;
                };
                deleteMany: {
                    args: Prisma.FieldDefinitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FieldDefinitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FieldDefinitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>[];
                };
                upsert: {
                    args: Prisma.FieldDefinitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldDefinitionPayload>;
                };
                aggregate: {
                    args: Prisma.FieldDefinitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFieldDefinition>;
                };
                groupBy: {
                    args: Prisma.FieldDefinitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldDefinitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FieldDefinitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldDefinitionCountAggregateOutputType> | number;
                };
            };
        };
        FieldPermission: {
            payload: Prisma.$FieldPermissionPayload<ExtArgs>;
            fields: Prisma.FieldPermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FieldPermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FieldPermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>;
                };
                findFirst: {
                    args: Prisma.FieldPermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FieldPermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>;
                };
                findMany: {
                    args: Prisma.FieldPermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>[];
                };
                create: {
                    args: Prisma.FieldPermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>;
                };
                createMany: {
                    args: Prisma.FieldPermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FieldPermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>[];
                };
                delete: {
                    args: Prisma.FieldPermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>;
                };
                update: {
                    args: Prisma.FieldPermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.FieldPermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FieldPermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FieldPermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>[];
                };
                upsert: {
                    args: Prisma.FieldPermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldPermissionPayload>;
                };
                aggregate: {
                    args: Prisma.FieldPermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFieldPermission>;
                };
                groupBy: {
                    args: Prisma.FieldPermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldPermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FieldPermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldPermissionCountAggregateOutputType> | number;
                };
            };
        };
        FieldValidationRule: {
            payload: Prisma.$FieldValidationRulePayload<ExtArgs>;
            fields: Prisma.FieldValidationRuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FieldValidationRuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FieldValidationRuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>;
                };
                findFirst: {
                    args: Prisma.FieldValidationRuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FieldValidationRuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>;
                };
                findMany: {
                    args: Prisma.FieldValidationRuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>[];
                };
                create: {
                    args: Prisma.FieldValidationRuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>;
                };
                createMany: {
                    args: Prisma.FieldValidationRuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FieldValidationRuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>[];
                };
                delete: {
                    args: Prisma.FieldValidationRuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>;
                };
                update: {
                    args: Prisma.FieldValidationRuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>;
                };
                deleteMany: {
                    args: Prisma.FieldValidationRuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FieldValidationRuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FieldValidationRuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>[];
                };
                upsert: {
                    args: Prisma.FieldValidationRuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldValidationRulePayload>;
                };
                aggregate: {
                    args: Prisma.FieldValidationRuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFieldValidationRule>;
                };
                groupBy: {
                    args: Prisma.FieldValidationRuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldValidationRuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FieldValidationRuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldValidationRuleCountAggregateOutputType> | number;
                };
            };
        };
        FieldFormula: {
            payload: Prisma.$FieldFormulaPayload<ExtArgs>;
            fields: Prisma.FieldFormulaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FieldFormulaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FieldFormulaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>;
                };
                findFirst: {
                    args: Prisma.FieldFormulaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FieldFormulaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>;
                };
                findMany: {
                    args: Prisma.FieldFormulaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>[];
                };
                create: {
                    args: Prisma.FieldFormulaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>;
                };
                createMany: {
                    args: Prisma.FieldFormulaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FieldFormulaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>[];
                };
                delete: {
                    args: Prisma.FieldFormulaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>;
                };
                update: {
                    args: Prisma.FieldFormulaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>;
                };
                deleteMany: {
                    args: Prisma.FieldFormulaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FieldFormulaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FieldFormulaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>[];
                };
                upsert: {
                    args: Prisma.FieldFormulaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldFormulaPayload>;
                };
                aggregate: {
                    args: Prisma.FieldFormulaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFieldFormula>;
                };
                groupBy: {
                    args: Prisma.FieldFormulaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldFormulaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FieldFormulaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldFormulaCountAggregateOutputType> | number;
                };
            };
        };
        FieldReference: {
            payload: Prisma.$FieldReferencePayload<ExtArgs>;
            fields: Prisma.FieldReferenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FieldReferenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FieldReferenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>;
                };
                findFirst: {
                    args: Prisma.FieldReferenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FieldReferenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>;
                };
                findMany: {
                    args: Prisma.FieldReferenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>[];
                };
                create: {
                    args: Prisma.FieldReferenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>;
                };
                createMany: {
                    args: Prisma.FieldReferenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FieldReferenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>[];
                };
                delete: {
                    args: Prisma.FieldReferenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>;
                };
                update: {
                    args: Prisma.FieldReferenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>;
                };
                deleteMany: {
                    args: Prisma.FieldReferenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FieldReferenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FieldReferenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>[];
                };
                upsert: {
                    args: Prisma.FieldReferenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldReferencePayload>;
                };
                aggregate: {
                    args: Prisma.FieldReferenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFieldReference>;
                };
                groupBy: {
                    args: Prisma.FieldReferenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldReferenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FieldReferenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldReferenceCountAggregateOutputType> | number;
                };
            };
        };
        FieldConditionBinding: {
            payload: Prisma.$FieldConditionBindingPayload<ExtArgs>;
            fields: Prisma.FieldConditionBindingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FieldConditionBindingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FieldConditionBindingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>;
                };
                findFirst: {
                    args: Prisma.FieldConditionBindingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FieldConditionBindingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>;
                };
                findMany: {
                    args: Prisma.FieldConditionBindingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>[];
                };
                create: {
                    args: Prisma.FieldConditionBindingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>;
                };
                createMany: {
                    args: Prisma.FieldConditionBindingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FieldConditionBindingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>[];
                };
                delete: {
                    args: Prisma.FieldConditionBindingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>;
                };
                update: {
                    args: Prisma.FieldConditionBindingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>;
                };
                deleteMany: {
                    args: Prisma.FieldConditionBindingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FieldConditionBindingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FieldConditionBindingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>[];
                };
                upsert: {
                    args: Prisma.FieldConditionBindingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FieldConditionBindingPayload>;
                };
                aggregate: {
                    args: Prisma.FieldConditionBindingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFieldConditionBinding>;
                };
                groupBy: {
                    args: Prisma.FieldConditionBindingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldConditionBindingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FieldConditionBindingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FieldConditionBindingCountAggregateOutputType> | number;
                };
            };
        };
        MasterRecord: {
            payload: Prisma.$MasterRecordPayload<ExtArgs>;
            fields: Prisma.MasterRecordFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MasterRecordFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MasterRecordFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>;
                };
                findFirst: {
                    args: Prisma.MasterRecordFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MasterRecordFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>;
                };
                findMany: {
                    args: Prisma.MasterRecordFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>[];
                };
                create: {
                    args: Prisma.MasterRecordCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>;
                };
                createMany: {
                    args: Prisma.MasterRecordCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MasterRecordCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>[];
                };
                delete: {
                    args: Prisma.MasterRecordDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>;
                };
                update: {
                    args: Prisma.MasterRecordUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>;
                };
                deleteMany: {
                    args: Prisma.MasterRecordDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MasterRecordUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MasterRecordUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>[];
                };
                upsert: {
                    args: Prisma.MasterRecordUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MasterRecordPayload>;
                };
                aggregate: {
                    args: Prisma.MasterRecordAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMasterRecord>;
                };
                groupBy: {
                    args: Prisma.MasterRecordGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MasterRecordGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MasterRecordCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MasterRecordCountAggregateOutputType> | number;
                };
            };
        };
        RecordFieldHistory: {
            payload: Prisma.$RecordFieldHistoryPayload<ExtArgs>;
            fields: Prisma.RecordFieldHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecordFieldHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecordFieldHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.RecordFieldHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecordFieldHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>;
                };
                findMany: {
                    args: Prisma.RecordFieldHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>[];
                };
                create: {
                    args: Prisma.RecordFieldHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>;
                };
                createMany: {
                    args: Prisma.RecordFieldHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecordFieldHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>[];
                };
                delete: {
                    args: Prisma.RecordFieldHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>;
                };
                update: {
                    args: Prisma.RecordFieldHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.RecordFieldHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecordFieldHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecordFieldHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.RecordFieldHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.RecordFieldHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecordFieldHistory>;
                };
                groupBy: {
                    args: Prisma.RecordFieldHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecordFieldHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecordFieldHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecordFieldHistoryCountAggregateOutputType> | number;
                };
            };
        };
        RecordFieldIndex: {
            payload: Prisma.$RecordFieldIndexPayload<ExtArgs>;
            fields: Prisma.RecordFieldIndexFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecordFieldIndexFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecordFieldIndexFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>;
                };
                findFirst: {
                    args: Prisma.RecordFieldIndexFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecordFieldIndexFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>;
                };
                findMany: {
                    args: Prisma.RecordFieldIndexFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>[];
                };
                create: {
                    args: Prisma.RecordFieldIndexCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>;
                };
                createMany: {
                    args: Prisma.RecordFieldIndexCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecordFieldIndexCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>[];
                };
                delete: {
                    args: Prisma.RecordFieldIndexDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>;
                };
                update: {
                    args: Prisma.RecordFieldIndexUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>;
                };
                deleteMany: {
                    args: Prisma.RecordFieldIndexDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecordFieldIndexUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecordFieldIndexUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>[];
                };
                upsert: {
                    args: Prisma.RecordFieldIndexUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordFieldIndexPayload>;
                };
                aggregate: {
                    args: Prisma.RecordFieldIndexAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecordFieldIndex>;
                };
                groupBy: {
                    args: Prisma.RecordFieldIndexGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecordFieldIndexGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecordFieldIndexCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecordFieldIndexCountAggregateOutputType> | number;
                };
            };
        };
        SchemaChange: {
            payload: Prisma.$SchemaChangePayload<ExtArgs>;
            fields: Prisma.SchemaChangeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SchemaChangeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SchemaChangeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>;
                };
                findFirst: {
                    args: Prisma.SchemaChangeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SchemaChangeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>;
                };
                findMany: {
                    args: Prisma.SchemaChangeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>[];
                };
                create: {
                    args: Prisma.SchemaChangeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>;
                };
                createMany: {
                    args: Prisma.SchemaChangeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SchemaChangeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>[];
                };
                delete: {
                    args: Prisma.SchemaChangeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>;
                };
                update: {
                    args: Prisma.SchemaChangeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>;
                };
                deleteMany: {
                    args: Prisma.SchemaChangeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SchemaChangeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SchemaChangeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>[];
                };
                upsert: {
                    args: Prisma.SchemaChangeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SchemaChangePayload>;
                };
                aggregate: {
                    args: Prisma.SchemaChangeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSchemaChange>;
                };
                groupBy: {
                    args: Prisma.SchemaChangeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SchemaChangeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SchemaChangeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SchemaChangeCountAggregateOutputType> | number;
                };
            };
        };
        FormEventHook: {
            payload: Prisma.$FormEventHookPayload<ExtArgs>;
            fields: Prisma.FormEventHookFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FormEventHookFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FormEventHookFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>;
                };
                findFirst: {
                    args: Prisma.FormEventHookFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FormEventHookFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>;
                };
                findMany: {
                    args: Prisma.FormEventHookFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>[];
                };
                create: {
                    args: Prisma.FormEventHookCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>;
                };
                createMany: {
                    args: Prisma.FormEventHookCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FormEventHookCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>[];
                };
                delete: {
                    args: Prisma.FormEventHookDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>;
                };
                update: {
                    args: Prisma.FormEventHookUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>;
                };
                deleteMany: {
                    args: Prisma.FormEventHookDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FormEventHookUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FormEventHookUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>[];
                };
                upsert: {
                    args: Prisma.FormEventHookUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FormEventHookPayload>;
                };
                aggregate: {
                    args: Prisma.FormEventHookAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFormEventHook>;
                };
                groupBy: {
                    args: Prisma.FormEventHookGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FormEventHookGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FormEventHookCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FormEventHookCountAggregateOutputType> | number;
                };
            };
        };
        RecordPermission: {
            payload: Prisma.$RecordPermissionPayload<ExtArgs>;
            fields: Prisma.RecordPermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecordPermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecordPermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>;
                };
                findFirst: {
                    args: Prisma.RecordPermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecordPermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>;
                };
                findMany: {
                    args: Prisma.RecordPermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>[];
                };
                create: {
                    args: Prisma.RecordPermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>;
                };
                createMany: {
                    args: Prisma.RecordPermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecordPermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>[];
                };
                delete: {
                    args: Prisma.RecordPermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>;
                };
                update: {
                    args: Prisma.RecordPermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.RecordPermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecordPermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecordPermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>[];
                };
                upsert: {
                    args: Prisma.RecordPermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecordPermissionPayload>;
                };
                aggregate: {
                    args: Prisma.RecordPermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecordPermission>;
                };
                groupBy: {
                    args: Prisma.RecordPermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecordPermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecordPermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecordPermissionCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowDefinition: {
            payload: Prisma.$WorkflowDefinitionPayload<ExtArgs>;
            fields: Prisma.WorkflowDefinitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowDefinitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowDefinitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowDefinitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowDefinitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowDefinitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                create: {
                    args: Prisma.WorkflowDefinitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowDefinitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowDefinitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowDefinitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                update: {
                    args: Prisma.WorkflowDefinitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowDefinitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowDefinitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowDefinitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowDefinitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowDefinitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowDefinition>;
                };
                groupBy: {
                    args: Prisma.WorkflowDefinitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowDefinitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowDefinitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowDefinitionCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowStage: {
            payload: Prisma.$WorkflowStagePayload<ExtArgs>;
            fields: Prisma.WorkflowStageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowStageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowStageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowStageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowStageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>;
                };
                findMany: {
                    args: Prisma.WorkflowStageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>[];
                };
                create: {
                    args: Prisma.WorkflowStageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>;
                };
                createMany: {
                    args: Prisma.WorkflowStageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowStageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>[];
                };
                delete: {
                    args: Prisma.WorkflowStageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>;
                };
                update: {
                    args: Prisma.WorkflowStageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowStageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowStageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowStageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowStageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStagePayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowStageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowStage>;
                };
                groupBy: {
                    args: Prisma.WorkflowStageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowStageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowStageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowStageCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowTransition: {
            payload: Prisma.$WorkflowTransitionPayload<ExtArgs>;
            fields: Prisma.WorkflowTransitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowTransitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowTransitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowTransitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowTransitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowTransitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>[];
                };
                create: {
                    args: Prisma.WorkflowTransitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowTransitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowTransitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowTransitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>;
                };
                update: {
                    args: Prisma.WorkflowTransitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowTransitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowTransitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowTransitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowTransitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowTransitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowTransition>;
                };
                groupBy: {
                    args: Prisma.WorkflowTransitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowTransitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowTransitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowTransitionCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowInstance: {
            payload: Prisma.$WorkflowInstancePayload<ExtArgs>;
            fields: Prisma.WorkflowInstanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowInstanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowInstanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowInstanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowInstanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                findMany: {
                    args: Prisma.WorkflowInstanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                create: {
                    args: Prisma.WorkflowInstanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                createMany: {
                    args: Prisma.WorkflowInstanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowInstanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                delete: {
                    args: Prisma.WorkflowInstanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                update: {
                    args: Prisma.WorkflowInstanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowInstanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowInstanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowInstanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowInstanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowInstanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowInstance>;
                };
                groupBy: {
                    args: Prisma.WorkflowInstanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowInstanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowInstanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowInstanceCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowHistory: {
            payload: Prisma.$WorkflowHistoryPayload<ExtArgs>;
            fields: Prisma.WorkflowHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>[];
                };
                create: {
                    args: Prisma.WorkflowHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>;
                };
                update: {
                    args: Prisma.WorkflowHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowHistory>;
                };
                groupBy: {
                    args: Prisma.WorkflowHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowHistoryCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowTransitionAllowedRole: {
            payload: Prisma.$WorkflowTransitionAllowedRolePayload<ExtArgs>;
            fields: Prisma.WorkflowTransitionAllowedRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowTransitionAllowedRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowTransitionAllowedRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowTransitionAllowedRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowTransitionAllowedRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>;
                };
                findMany: {
                    args: Prisma.WorkflowTransitionAllowedRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>[];
                };
                create: {
                    args: Prisma.WorkflowTransitionAllowedRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>;
                };
                createMany: {
                    args: Prisma.WorkflowTransitionAllowedRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowTransitionAllowedRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>[];
                };
                delete: {
                    args: Prisma.WorkflowTransitionAllowedRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>;
                };
                update: {
                    args: Prisma.WorkflowTransitionAllowedRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowTransitionAllowedRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowTransitionAllowedRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowTransitionAllowedRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowTransitionAllowedRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedRolePayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowTransitionAllowedRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowTransitionAllowedRole>;
                };
                groupBy: {
                    args: Prisma.WorkflowTransitionAllowedRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowTransitionAllowedRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowTransitionAllowedRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowTransitionAllowedRoleCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowTransitionAllowedUser: {
            payload: Prisma.$WorkflowTransitionAllowedUserPayload<ExtArgs>;
            fields: Prisma.WorkflowTransitionAllowedUserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowTransitionAllowedUserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowTransitionAllowedUserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowTransitionAllowedUserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowTransitionAllowedUserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowTransitionAllowedUserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>[];
                };
                create: {
                    args: Prisma.WorkflowTransitionAllowedUserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowTransitionAllowedUserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowTransitionAllowedUserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowTransitionAllowedUserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>;
                };
                update: {
                    args: Prisma.WorkflowTransitionAllowedUserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowTransitionAllowedUserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowTransitionAllowedUserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowTransitionAllowedUserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowTransitionAllowedUserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowTransitionAllowedUserPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowTransitionAllowedUserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowTransitionAllowedUser>;
                };
                groupBy: {
                    args: Prisma.WorkflowTransitionAllowedUserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowTransitionAllowedUserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowTransitionAllowedUserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowTransitionAllowedUserCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowApproval: {
            payload: Prisma.$WorkflowApprovalPayload<ExtArgs>;
            fields: Prisma.WorkflowApprovalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowApprovalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowApprovalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowApprovalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowApprovalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowApprovalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>[];
                };
                create: {
                    args: Prisma.WorkflowApprovalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowApprovalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowApprovalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowApprovalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>;
                };
                update: {
                    args: Prisma.WorkflowApprovalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowApprovalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowApprovalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowApprovalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowApprovalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowApprovalPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowApprovalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowApproval>;
                };
                groupBy: {
                    args: Prisma.WorkflowApprovalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowApprovalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowApprovalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowApprovalCountAggregateOutputType> | number;
                };
            };
        };
        Task: {
            payload: Prisma.$TaskPayload<ExtArgs>;
            fields: Prisma.TaskFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TaskFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>;
                };
                findFirst: {
                    args: Prisma.TaskFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>;
                };
                findMany: {
                    args: Prisma.TaskFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>[];
                };
                create: {
                    args: Prisma.TaskCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>;
                };
                createMany: {
                    args: Prisma.TaskCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>[];
                };
                delete: {
                    args: Prisma.TaskDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>;
                };
                update: {
                    args: Prisma.TaskUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>;
                };
                deleteMany: {
                    args: Prisma.TaskDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TaskUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>[];
                };
                upsert: {
                    args: Prisma.TaskUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskPayload>;
                };
                aggregate: {
                    args: Prisma.TaskAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTask>;
                };
                groupBy: {
                    args: Prisma.TaskGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaskGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TaskCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaskCountAggregateOutputType> | number;
                };
            };
        };
        TaskAssignment: {
            payload: Prisma.$TaskAssignmentPayload<ExtArgs>;
            fields: Prisma.TaskAssignmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TaskAssignmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TaskAssignmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>;
                };
                findFirst: {
                    args: Prisma.TaskAssignmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TaskAssignmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>;
                };
                findMany: {
                    args: Prisma.TaskAssignmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>[];
                };
                create: {
                    args: Prisma.TaskAssignmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>;
                };
                createMany: {
                    args: Prisma.TaskAssignmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TaskAssignmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>[];
                };
                delete: {
                    args: Prisma.TaskAssignmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>;
                };
                update: {
                    args: Prisma.TaskAssignmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>;
                };
                deleteMany: {
                    args: Prisma.TaskAssignmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TaskAssignmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TaskAssignmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>[];
                };
                upsert: {
                    args: Prisma.TaskAssignmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>;
                };
                aggregate: {
                    args: Prisma.TaskAssignmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTaskAssignment>;
                };
                groupBy: {
                    args: Prisma.TaskAssignmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaskAssignmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TaskAssignmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaskAssignmentCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        NotificationTemplate: {
            payload: Prisma.$NotificationTemplatePayload<ExtArgs>;
            fields: Prisma.NotificationTemplateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationTemplateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationTemplateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                findFirst: {
                    args: Prisma.NotificationTemplateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationTemplateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                findMany: {
                    args: Prisma.NotificationTemplateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[];
                };
                create: {
                    args: Prisma.NotificationTemplateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                createMany: {
                    args: Prisma.NotificationTemplateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationTemplateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[];
                };
                delete: {
                    args: Prisma.NotificationTemplateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                update: {
                    args: Prisma.NotificationTemplateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationTemplateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationTemplateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationTemplateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[];
                };
                upsert: {
                    args: Prisma.NotificationTemplateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                aggregate: {
                    args: Prisma.NotificationTemplateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationTemplate>;
                };
                groupBy: {
                    args: Prisma.NotificationTemplateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationTemplateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationTemplateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationTemplateCountAggregateOutputType> | number;
                };
            };
        };
        NotificationBatch: {
            payload: Prisma.$NotificationBatchPayload<ExtArgs>;
            fields: Prisma.NotificationBatchFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationBatchFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationBatchFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationBatchFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationBatchFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>;
                };
                findMany: {
                    args: Prisma.NotificationBatchFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>[];
                };
                create: {
                    args: Prisma.NotificationBatchCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>;
                };
                createMany: {
                    args: Prisma.NotificationBatchCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationBatchCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>[];
                };
                delete: {
                    args: Prisma.NotificationBatchDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>;
                };
                update: {
                    args: Prisma.NotificationBatchUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationBatchDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationBatchUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationBatchUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationBatchUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationBatchPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationBatchAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationBatch>;
                };
                groupBy: {
                    args: Prisma.NotificationBatchGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationBatchGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationBatchCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationBatchCountAggregateOutputType> | number;
                };
            };
        };
        NotificationDelivery: {
            payload: Prisma.$NotificationDeliveryPayload<ExtArgs>;
            fields: Prisma.NotificationDeliveryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationDeliveryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationDeliveryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationDeliveryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationDeliveryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                findMany: {
                    args: Prisma.NotificationDeliveryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>[];
                };
                create: {
                    args: Prisma.NotificationDeliveryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                createMany: {
                    args: Prisma.NotificationDeliveryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationDeliveryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeliveryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                update: {
                    args: Prisma.NotificationDeliveryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeliveryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationDeliveryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationDeliveryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationDeliveryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationDeliveryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationDelivery>;
                };
                groupBy: {
                    args: Prisma.NotificationDeliveryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationDeliveryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationDeliveryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationDeliveryCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        OutboxEvent: {
            payload: Prisma.$OutboxEventPayload<ExtArgs>;
            fields: Prisma.OutboxEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OutboxEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OutboxEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>;
                };
                findFirst: {
                    args: Prisma.OutboxEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OutboxEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>;
                };
                findMany: {
                    args: Prisma.OutboxEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>[];
                };
                create: {
                    args: Prisma.OutboxEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>;
                };
                createMany: {
                    args: Prisma.OutboxEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OutboxEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>[];
                };
                delete: {
                    args: Prisma.OutboxEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>;
                };
                update: {
                    args: Prisma.OutboxEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>;
                };
                deleteMany: {
                    args: Prisma.OutboxEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OutboxEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OutboxEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>[];
                };
                upsert: {
                    args: Prisma.OutboxEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboxEventPayload>;
                };
                aggregate: {
                    args: Prisma.OutboxEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOutboxEvent>;
                };
                groupBy: {
                    args: Prisma.OutboxEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OutboxEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OutboxEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OutboxEventCountAggregateOutputType> | number;
                };
            };
        };
        EventLog: {
            payload: Prisma.$EventLogPayload<ExtArgs>;
            fields: Prisma.EventLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EventLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EventLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>;
                };
                findFirst: {
                    args: Prisma.EventLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EventLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>;
                };
                findMany: {
                    args: Prisma.EventLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>[];
                };
                create: {
                    args: Prisma.EventLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>;
                };
                createMany: {
                    args: Prisma.EventLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EventLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>[];
                };
                delete: {
                    args: Prisma.EventLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>;
                };
                update: {
                    args: Prisma.EventLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>;
                };
                deleteMany: {
                    args: Prisma.EventLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EventLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EventLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>[];
                };
                upsert: {
                    args: Prisma.EventLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventLogPayload>;
                };
                aggregate: {
                    args: Prisma.EventLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEventLog>;
                };
                groupBy: {
                    args: Prisma.EventLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EventLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EventLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EventLogCountAggregateOutputType> | number;
                };
            };
        };
        Attachment: {
            payload: Prisma.$AttachmentPayload<ExtArgs>;
            fields: Prisma.AttachmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AttachmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>;
                };
                findFirst: {
                    args: Prisma.AttachmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>;
                };
                findMany: {
                    args: Prisma.AttachmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>[];
                };
                create: {
                    args: Prisma.AttachmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>;
                };
                createMany: {
                    args: Prisma.AttachmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AttachmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>[];
                };
                delete: {
                    args: Prisma.AttachmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>;
                };
                update: {
                    args: Prisma.AttachmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>;
                };
                deleteMany: {
                    args: Prisma.AttachmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AttachmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AttachmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>[];
                };
                upsert: {
                    args: Prisma.AttachmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttachmentPayload>;
                };
                aggregate: {
                    args: Prisma.AttachmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAttachment>;
                };
                groupBy: {
                    args: Prisma.AttachmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AttachmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AttachmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AttachmentCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly type: "type";
    readonly status: "status";
    readonly attributes: "attributes";
    readonly department: "department";
    readonly location: "location";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly key: "key";
    readonly description: "description";
    readonly isSystem: "isSystem";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const RoleHierarchyScalarFieldEnum: {
    readonly id: "id";
    readonly parentId: "parentId";
    readonly childId: "childId";
};
export type RoleHierarchyScalarFieldEnum = (typeof RoleHierarchyScalarFieldEnum)[keyof typeof RoleHierarchyScalarFieldEnum];
export declare const UserRoleScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly roleId: "roleId";
    readonly assignedAt: "assignedAt";
};
export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum];
export declare const ModuleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly key: "key";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly isSystem: "isSystem";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type ModuleScalarFieldEnum = (typeof ModuleScalarFieldEnum)[keyof typeof ModuleScalarFieldEnum];
export declare const ActionScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly key: "key";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly isSystem: "isSystem";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type ActionScalarFieldEnum = (typeof ActionScalarFieldEnum)[keyof typeof ActionScalarFieldEnum];
export declare const ResourceScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly key: "key";
    readonly category: "category";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly isSystem: "isSystem";
    readonly moduleId: "moduleId";
    readonly masterObjectId: "masterObjectId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type ResourceScalarFieldEnum = (typeof ResourceScalarFieldEnum)[keyof typeof ResourceScalarFieldEnum];
export declare const PermissionScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly key: "key";
    readonly category: "category";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly isSystem: "isSystem";
    readonly resourceId: "resourceId";
    readonly actionId: "actionId";
    readonly conditions: "conditions";
    readonly expression: "expression";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum];
export declare const RolePermissionScalarFieldEnum: {
    readonly id: "id";
    readonly roleId: "roleId";
    readonly permissionId: "permissionId";
    readonly accessLevel: "accessLevel";
    readonly conditions: "conditions";
    readonly expression: "expression";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum];
export declare const ConditionFieldRegistryScalarFieldEnum: {
    readonly id: "id";
    readonly field: "field";
    readonly fieldType: "fieldType";
    readonly meta: "meta";
    readonly moduleId: "moduleId";
    readonly resourceId: "resourceId";
    readonly scope: "scope";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type ConditionFieldRegistryScalarFieldEnum = (typeof ConditionFieldRegistryScalarFieldEnum)[keyof typeof ConditionFieldRegistryScalarFieldEnum];
export declare const PolicyScalarFieldEnum: {
    readonly id: "id";
    readonly description: "description";
    readonly effect: "effect";
    readonly resourceId: "resourceId";
    readonly actionId: "actionId";
    readonly condition: "condition";
    readonly priority: "priority";
    readonly enabled: "enabled";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PolicyScalarFieldEnum = (typeof PolicyScalarFieldEnum)[keyof typeof PolicyScalarFieldEnum];
export declare const MasterObjectScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly key: "key";
    readonly isActive: "isActive";
    readonly isSystem: "isSystem";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type MasterObjectScalarFieldEnum = (typeof MasterObjectScalarFieldEnum)[keyof typeof MasterObjectScalarFieldEnum];
export declare const MasterObjectSchemaScalarFieldEnum: {
    readonly id: "id";
    readonly masterObjectId: "masterObjectId";
    readonly version: "version";
    readonly status: "status";
    readonly layout: "layout";
    readonly checksum: "checksum";
    readonly createdById: "createdById";
    readonly publishedAt: "publishedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type MasterObjectSchemaScalarFieldEnum = (typeof MasterObjectSchemaScalarFieldEnum)[keyof typeof MasterObjectSchemaScalarFieldEnum];
export declare const FieldDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly masterObjectId: "masterObjectId";
    readonly schemaId: "schemaId";
    readonly key: "key";
    readonly label: "label";
    readonly category: "category";
    readonly dataType: "dataType";
    readonly fieldType: "fieldType";
    readonly config: "config";
    readonly order: "order";
    readonly isRequired: "isRequired";
    readonly isSystem: "isSystem";
    readonly isActive: "isActive";
    readonly isLocked: "isLocked";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type FieldDefinitionScalarFieldEnum = (typeof FieldDefinitionScalarFieldEnum)[keyof typeof FieldDefinitionScalarFieldEnum];
export declare const FieldPermissionScalarFieldEnum: {
    readonly id: "id";
    readonly fieldId: "fieldId";
    readonly roleId: "roleId";
    readonly userId: "userId";
    readonly canRead: "canRead";
    readonly canWrite: "canWrite";
    readonly condition: "condition";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type FieldPermissionScalarFieldEnum = (typeof FieldPermissionScalarFieldEnum)[keyof typeof FieldPermissionScalarFieldEnum];
export declare const FieldValidationRuleScalarFieldEnum: {
    readonly id: "id";
    readonly fieldId: "fieldId";
    readonly type: "type";
    readonly rule: "rule";
    readonly errorMessage: "errorMessage";
    readonly order: "order";
    readonly severity: "severity";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type FieldValidationRuleScalarFieldEnum = (typeof FieldValidationRuleScalarFieldEnum)[keyof typeof FieldValidationRuleScalarFieldEnum];
export declare const FieldFormulaScalarFieldEnum: {
    readonly id: "id";
    readonly fieldId: "fieldId";
    readonly expression: "expression";
    readonly dependencies: "dependencies";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type FieldFormulaScalarFieldEnum = (typeof FieldFormulaScalarFieldEnum)[keyof typeof FieldFormulaScalarFieldEnum];
export declare const FieldReferenceScalarFieldEnum: {
    readonly id: "id";
    readonly fieldId: "fieldId";
    readonly targetObjectId: "targetObjectId";
    readonly displayFieldKey: "displayFieldKey";
    readonly relationType: "relationType";
    readonly allowMultiple: "allowMultiple";
    readonly onDeleteBehavior: "onDeleteBehavior";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type FieldReferenceScalarFieldEnum = (typeof FieldReferenceScalarFieldEnum)[keyof typeof FieldReferenceScalarFieldEnum];
export declare const FieldConditionBindingScalarFieldEnum: {
    readonly id: "id";
    readonly fieldId: "fieldId";
    readonly conditionKey: "conditionKey";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type FieldConditionBindingScalarFieldEnum = (typeof FieldConditionBindingScalarFieldEnum)[keyof typeof FieldConditionBindingScalarFieldEnum];
export declare const MasterRecordScalarFieldEnum: {
    readonly id: "id";
    readonly masterObjectId: "masterObjectId";
    readonly data: "data";
    readonly currentStageId: "currentStageId";
    readonly createdById: "createdById";
    readonly linkedUserId: "linkedUserId";
    readonly schemaId: "schemaId";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type MasterRecordScalarFieldEnum = (typeof MasterRecordScalarFieldEnum)[keyof typeof MasterRecordScalarFieldEnum];
export declare const RecordFieldHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly recordId: "recordId";
    readonly fieldKey: "fieldKey";
    readonly oldValue: "oldValue";
    readonly newValue: "newValue";
    readonly changedById: "changedById";
    readonly changedAt: "changedAt";
    readonly deletedAt: "deletedAt";
};
export type RecordFieldHistoryScalarFieldEnum = (typeof RecordFieldHistoryScalarFieldEnum)[keyof typeof RecordFieldHistoryScalarFieldEnum];
export declare const RecordFieldIndexScalarFieldEnum: {
    readonly id: "id";
    readonly recordId: "recordId";
    readonly fieldKey: "fieldKey";
    readonly stringValue: "stringValue";
    readonly numberValue: "numberValue";
    readonly dateValue: "dateValue";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type RecordFieldIndexScalarFieldEnum = (typeof RecordFieldIndexScalarFieldEnum)[keyof typeof RecordFieldIndexScalarFieldEnum];
export declare const SchemaChangeScalarFieldEnum: {
    readonly id: "id";
    readonly schemaId: "schemaId";
    readonly type: "type";
    readonly payload: "payload";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type SchemaChangeScalarFieldEnum = (typeof SchemaChangeScalarFieldEnum)[keyof typeof SchemaChangeScalarFieldEnum];
export declare const FormEventHookScalarFieldEnum: {
    readonly id: "id";
    readonly masterObjectId: "masterObjectId";
    readonly event: "event";
    readonly handlerType: "handlerType";
    readonly config: "config";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type FormEventHookScalarFieldEnum = (typeof FormEventHookScalarFieldEnum)[keyof typeof FormEventHookScalarFieldEnum];
export declare const RecordPermissionScalarFieldEnum: {
    readonly id: "id";
    readonly masterObjectId: "masterObjectId";
    readonly roleId: "roleId";
    readonly userId: "userId";
    readonly canRead: "canRead";
    readonly canWrite: "canWrite";
    readonly canDelete: "canDelete";
    readonly condition: "condition";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type RecordPermissionScalarFieldEnum = (typeof RecordPermissionScalarFieldEnum)[keyof typeof RecordPermissionScalarFieldEnum];
export declare const WorkflowDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly code: "code";
    readonly resourceId: "resourceId";
    readonly status: "status";
    readonly version: "version";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly createdById: "createdById";
    readonly publishedAt: "publishedAt";
    readonly publishedById: "publishedById";
    readonly deletedAt: "deletedAt";
};
export type WorkflowDefinitionScalarFieldEnum = (typeof WorkflowDefinitionScalarFieldEnum)[keyof typeof WorkflowDefinitionScalarFieldEnum];
export declare const WorkflowStageScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly code: "code";
    readonly order: "order";
    readonly color: "color";
    readonly position: "position";
    readonly isInitial: "isInitial";
    readonly isFinal: "isFinal";
    readonly metadata: "metadata";
    readonly category: "category";
    readonly allowedNextCategories: "allowedNextCategories";
    readonly workflowId: "workflowId";
};
export type WorkflowStageScalarFieldEnum = (typeof WorkflowStageScalarFieldEnum)[keyof typeof WorkflowStageScalarFieldEnum];
export declare const WorkflowTransitionScalarFieldEnum: {
    readonly id: "id";
    readonly label: "label";
    readonly condition: "condition";
    readonly metadata: "metadata";
    readonly autoTrigger: "autoTrigger";
    readonly transitionType: "transitionType";
    readonly triggerStrategy: "triggerStrategy";
    readonly approvalConfig: "approvalConfig";
    readonly approvalStrategy: "approvalStrategy";
    readonly priority: "priority";
    readonly workflowId: "workflowId";
    readonly fromStageId: "fromStageId";
    readonly toStageId: "toStageId";
};
export type WorkflowTransitionScalarFieldEnum = (typeof WorkflowTransitionScalarFieldEnum)[keyof typeof WorkflowTransitionScalarFieldEnum];
export declare const WorkflowInstanceScalarFieldEnum: {
    readonly id: "id";
    readonly workflowId: "workflowId";
    readonly resourceType: "resourceType";
    readonly resourceId: "resourceId";
    readonly currentStageId: "currentStageId";
    readonly status: "status";
    readonly startedAt: "startedAt";
    readonly endedAt: "endedAt";
    readonly endedReason: "endedReason";
    readonly errorDetails: "errorDetails";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly startedById: "startedById";
    readonly lockedAt: "lockedAt";
    readonly lockedBy: "lockedBy";
};
export type WorkflowInstanceScalarFieldEnum = (typeof WorkflowInstanceScalarFieldEnum)[keyof typeof WorkflowInstanceScalarFieldEnum];
export declare const WorkflowHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly workflowInstanceId: "workflowInstanceId";
    readonly fromStageId: "fromStageId";
    readonly toStageId: "toStageId";
    readonly performedById: "performedById";
    readonly notes: "notes";
    readonly workflowTransitionId: "workflowTransitionId";
    readonly actionLabel: "actionLabel";
    readonly metadata: "metadata";
    readonly actionType: "actionType";
    readonly createdAt: "createdAt";
    readonly performedByType: "performedByType";
};
export type WorkflowHistoryScalarFieldEnum = (typeof WorkflowHistoryScalarFieldEnum)[keyof typeof WorkflowHistoryScalarFieldEnum];
export declare const WorkflowTransitionAllowedRoleScalarFieldEnum: {
    readonly id: "id";
    readonly transitionId: "transitionId";
    readonly roleId: "roleId";
    readonly createdAt: "createdAt";
};
export type WorkflowTransitionAllowedRoleScalarFieldEnum = (typeof WorkflowTransitionAllowedRoleScalarFieldEnum)[keyof typeof WorkflowTransitionAllowedRoleScalarFieldEnum];
export declare const WorkflowTransitionAllowedUserScalarFieldEnum: {
    readonly id: "id";
    readonly transitionId: "transitionId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type WorkflowTransitionAllowedUserScalarFieldEnum = (typeof WorkflowTransitionAllowedUserScalarFieldEnum)[keyof typeof WorkflowTransitionAllowedUserScalarFieldEnum];
export declare const WorkflowApprovalScalarFieldEnum: {
    readonly id: "id";
    readonly workflowInstanceId: "workflowInstanceId";
    readonly transitionId: "transitionId";
    readonly approverId: "approverId";
    readonly levelOrder: "levelOrder";
    readonly status: "status";
    readonly requestedAt: "requestedAt";
    readonly decidedAt: "decidedAt";
    readonly comment: "comment";
};
export type WorkflowApprovalScalarFieldEnum = (typeof WorkflowApprovalScalarFieldEnum)[keyof typeof WorkflowApprovalScalarFieldEnum];
export declare const TaskScalarFieldEnum: {
    readonly id: "id";
    readonly masterRecordId: "masterRecordId";
    readonly workflowInstanceId: "workflowInstanceId";
    readonly stageId: "stageId";
    readonly currentStep: "currentStep";
    readonly status: "status";
    readonly assignedToId: "assignedToId";
    readonly assignedById: "assignedById";
    readonly completedAt: "completedAt";
    readonly dueAt: "dueAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum];
export declare const TaskAssignmentScalarFieldEnum: {
    readonly id: "id";
    readonly taskId: "taskId";
    readonly userId: "userId";
    readonly assignedAt: "assignedAt";
};
export type TaskAssignmentScalarFieldEnum = (typeof TaskAssignmentScalarFieldEnum)[keyof typeof TaskAssignmentScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly masterRecordId: "masterRecordId";
    readonly userId: "userId";
    readonly entity: "entity";
    readonly action: "action";
    readonly comment: "comment";
    readonly step: "step";
    readonly before: "before";
    readonly after: "after";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly performedBy: "performedBy";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const NotificationTemplateScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly channel: "channel";
    readonly subject: "subject";
    readonly body: "body";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationTemplateScalarFieldEnum = (typeof NotificationTemplateScalarFieldEnum)[keyof typeof NotificationTemplateScalarFieldEnum];
export declare const NotificationBatchScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly message: "message";
    readonly type: "type";
    readonly data: "data";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
};
export type NotificationBatchScalarFieldEnum = (typeof NotificationBatchScalarFieldEnum)[keyof typeof NotificationBatchScalarFieldEnum];
export declare const NotificationDeliveryScalarFieldEnum: {
    readonly id: "id";
    readonly batchId: "batchId";
    readonly userId: "userId";
    readonly title: "title";
    readonly message: "message";
    readonly type: "type";
    readonly channels: "channels";
    readonly data: "data";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly priority: "priority";
    readonly read: "read";
    readonly createdAt: "createdAt";
    readonly readAt: "readAt";
    readonly sentAt: "sentAt";
    readonly deliveredAt: "deliveredAt";
    readonly failedAt: "failedAt";
    readonly retryCount: "retryCount";
    readonly lastError: "lastError";
    readonly scheduledAt: "scheduledAt";
};
export type NotificationDeliveryScalarFieldEnum = (typeof NotificationDeliveryScalarFieldEnum)[keyof typeof NotificationDeliveryScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly message: "message";
    readonly type: "type";
    readonly channels: "channels";
    readonly data: "data";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly read: "read";
    readonly createdAt: "createdAt";
    readonly readAt: "readAt";
    readonly sentAt: "sentAt";
    readonly deletedAt: "deletedAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const OutboxEventScalarFieldEnum: {
    readonly id: "id";
    readonly eventName: "eventName";
    readonly entity: "entity";
    readonly action: "action";
    readonly payload: "payload";
    readonly targetUsers: "targetUsers";
    readonly attempts: "attempts";
    readonly maxAttempts: "maxAttempts";
    readonly processedAt: "processedAt";
    readonly lockedAt: "lockedAt";
    readonly createdAt: "createdAt";
};
export type OutboxEventScalarFieldEnum = (typeof OutboxEventScalarFieldEnum)[keyof typeof OutboxEventScalarFieldEnum];
export declare const EventLogScalarFieldEnum: {
    readonly id: "id";
    readonly outboxId: "outboxId";
    readonly eventName: "eventName";
    readonly payload: "payload";
    readonly result: "result";
    readonly createdAt: "createdAt";
};
export type EventLogScalarFieldEnum = (typeof EventLogScalarFieldEnum)[keyof typeof EventLogScalarFieldEnum];
export declare const AttachmentScalarFieldEnum: {
    readonly id: "id";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly filename: "filename";
    readonly mimeType: "mimeType";
    readonly size: "size";
    readonly uri: "uri";
    readonly createdAt: "createdAt";
};
export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly tokenHash: "tokenHash";
    readonly userId: "userId";
    readonly deviceInfo: "deviceInfo";
    readonly ipAddress: "ipAddress";
    readonly isInvalidated: "isInvalidated";
    readonly revokedAt: "revokedAt";
    readonly lastUsedAt: "lastUsedAt";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'UserType'
 */
export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>;
/**
 * Reference to a field of type 'UserType[]'
 */
export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>;
/**
 * Reference to a field of type 'UserStatus'
 */
export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>;
/**
 * Reference to a field of type 'UserStatus[]'
 */
export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'AccessLevel'
 */
export type EnumAccessLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccessLevel'>;
/**
 * Reference to a field of type 'AccessLevel[]'
 */
export type ListEnumAccessLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccessLevel[]'>;
/**
 * Reference to a field of type 'PolicyEffect'
 */
export type EnumPolicyEffectFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PolicyEffect'>;
/**
 * Reference to a field of type 'PolicyEffect[]'
 */
export type ListEnumPolicyEffectFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PolicyEffect[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'SchemaStatus'
 */
export type EnumSchemaStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SchemaStatus'>;
/**
 * Reference to a field of type 'SchemaStatus[]'
 */
export type ListEnumSchemaStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SchemaStatus[]'>;
/**
 * Reference to a field of type 'FieldCategory'
 */
export type EnumFieldCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldCategory'>;
/**
 * Reference to a field of type 'FieldCategory[]'
 */
export type ListEnumFieldCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldCategory[]'>;
/**
 * Reference to a field of type 'FieldDataType'
 */
export type EnumFieldDataTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldDataType'>;
/**
 * Reference to a field of type 'FieldDataType[]'
 */
export type ListEnumFieldDataTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldDataType[]'>;
/**
 * Reference to a field of type 'FieldType'
 */
export type EnumFieldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldType'>;
/**
 * Reference to a field of type 'FieldType[]'
 */
export type ListEnumFieldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldType[]'>;
/**
 * Reference to a field of type 'FieldValidationType'
 */
export type EnumFieldValidationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldValidationType'>;
/**
 * Reference to a field of type 'FieldValidationType[]'
 */
export type ListEnumFieldValidationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldValidationType[]'>;
/**
 * Reference to a field of type 'ValidationSeverity'
 */
export type EnumValidationSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ValidationSeverity'>;
/**
 * Reference to a field of type 'ValidationSeverity[]'
 */
export type ListEnumValidationSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ValidationSeverity[]'>;
/**
 * Reference to a field of type 'ReferenceRelationType'
 */
export type EnumReferenceRelationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReferenceRelationType'>;
/**
 * Reference to a field of type 'ReferenceRelationType[]'
 */
export type ListEnumReferenceRelationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReferenceRelationType[]'>;
/**
 * Reference to a field of type 'ReferenceDeleteBehavior'
 */
export type EnumReferenceDeleteBehaviorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReferenceDeleteBehavior'>;
/**
 * Reference to a field of type 'ReferenceDeleteBehavior[]'
 */
export type ListEnumReferenceDeleteBehaviorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReferenceDeleteBehavior[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Reference to a field of type 'SchemaChangeType'
 */
export type EnumSchemaChangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SchemaChangeType'>;
/**
 * Reference to a field of type 'SchemaChangeType[]'
 */
export type ListEnumSchemaChangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SchemaChangeType[]'>;
/**
 * Reference to a field of type 'FormEventType'
 */
export type EnumFormEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FormEventType'>;
/**
 * Reference to a field of type 'FormEventType[]'
 */
export type ListEnumFormEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FormEventType[]'>;
/**
 * Reference to a field of type 'FormEventHandlerType'
 */
export type EnumFormEventHandlerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FormEventHandlerType'>;
/**
 * Reference to a field of type 'FormEventHandlerType[]'
 */
export type ListEnumFormEventHandlerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FormEventHandlerType[]'>;
/**
 * Reference to a field of type 'WorkflowDefinitionStatus'
 */
export type EnumWorkflowDefinitionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowDefinitionStatus'>;
/**
 * Reference to a field of type 'WorkflowDefinitionStatus[]'
 */
export type ListEnumWorkflowDefinitionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowDefinitionStatus[]'>;
/**
 * Reference to a field of type 'Category'
 */
export type EnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category'>;
/**
 * Reference to a field of type 'Category[]'
 */
export type ListEnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category[]'>;
/**
 * Reference to a field of type 'TransitionType'
 */
export type EnumTransitionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransitionType'>;
/**
 * Reference to a field of type 'TransitionType[]'
 */
export type ListEnumTransitionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransitionType[]'>;
/**
 * Reference to a field of type 'TriggerStrategy'
 */
export type EnumTriggerStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TriggerStrategy'>;
/**
 * Reference to a field of type 'TriggerStrategy[]'
 */
export type ListEnumTriggerStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TriggerStrategy[]'>;
/**
 * Reference to a field of type 'ApprovalStrategy'
 */
export type EnumApprovalStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalStrategy'>;
/**
 * Reference to a field of type 'ApprovalStrategy[]'
 */
export type ListEnumApprovalStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalStrategy[]'>;
/**
 * Reference to a field of type 'WorkflowInstanceStatus'
 */
export type EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowInstanceStatus'>;
/**
 * Reference to a field of type 'WorkflowInstanceStatus[]'
 */
export type ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowInstanceStatus[]'>;
/**
 * Reference to a field of type 'HistoryAction'
 */
export type EnumHistoryActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HistoryAction'>;
/**
 * Reference to a field of type 'HistoryAction[]'
 */
export type ListEnumHistoryActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HistoryAction[]'>;
/**
 * Reference to a field of type 'ApprovalStatus'
 */
export type EnumApprovalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalStatus'>;
/**
 * Reference to a field of type 'ApprovalStatus[]'
 */
export type ListEnumApprovalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalStatus[]'>;
/**
 * Reference to a field of type 'TaskStatus'
 */
export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>;
/**
 * Reference to a field of type 'TaskStatus[]'
 */
export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>;
/**
 * Reference to a field of type 'AuditEntity'
 */
export type EnumAuditEntityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditEntity'>;
/**
 * Reference to a field of type 'AuditEntity[]'
 */
export type ListEnumAuditEntityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditEntity[]'>;
/**
 * Reference to a field of type 'AuditAction'
 */
export type EnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction'>;
/**
 * Reference to a field of type 'AuditAction[]'
 */
export type ListEnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction[]'>;
/**
 * Reference to a field of type 'PerformedByType'
 */
export type EnumPerformedByTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PerformedByType'>;
/**
 * Reference to a field of type 'PerformedByType[]'
 */
export type ListEnumPerformedByTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PerformedByType[]'>;
/**
 * Reference to a field of type 'NotificationChannel'
 */
export type EnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel'>;
/**
 * Reference to a field of type 'NotificationChannel[]'
 */
export type ListEnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel[]'>;
/**
 * Reference to a field of type 'NotificationType'
 */
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
/**
 * Reference to a field of type 'NotificationType[]'
 */
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    role?: Prisma.RoleOmit;
    roleHierarchy?: Prisma.RoleHierarchyOmit;
    userRole?: Prisma.UserRoleOmit;
    module?: Prisma.ModuleOmit;
    action?: Prisma.ActionOmit;
    resource?: Prisma.ResourceOmit;
    permission?: Prisma.PermissionOmit;
    rolePermission?: Prisma.RolePermissionOmit;
    conditionFieldRegistry?: Prisma.ConditionFieldRegistryOmit;
    policy?: Prisma.PolicyOmit;
    masterObject?: Prisma.MasterObjectOmit;
    masterObjectSchema?: Prisma.MasterObjectSchemaOmit;
    fieldDefinition?: Prisma.FieldDefinitionOmit;
    fieldPermission?: Prisma.FieldPermissionOmit;
    fieldValidationRule?: Prisma.FieldValidationRuleOmit;
    fieldFormula?: Prisma.FieldFormulaOmit;
    fieldReference?: Prisma.FieldReferenceOmit;
    fieldConditionBinding?: Prisma.FieldConditionBindingOmit;
    masterRecord?: Prisma.MasterRecordOmit;
    recordFieldHistory?: Prisma.RecordFieldHistoryOmit;
    recordFieldIndex?: Prisma.RecordFieldIndexOmit;
    schemaChange?: Prisma.SchemaChangeOmit;
    formEventHook?: Prisma.FormEventHookOmit;
    recordPermission?: Prisma.RecordPermissionOmit;
    workflowDefinition?: Prisma.WorkflowDefinitionOmit;
    workflowStage?: Prisma.WorkflowStageOmit;
    workflowTransition?: Prisma.WorkflowTransitionOmit;
    workflowInstance?: Prisma.WorkflowInstanceOmit;
    workflowHistory?: Prisma.WorkflowHistoryOmit;
    workflowTransitionAllowedRole?: Prisma.WorkflowTransitionAllowedRoleOmit;
    workflowTransitionAllowedUser?: Prisma.WorkflowTransitionAllowedUserOmit;
    workflowApproval?: Prisma.WorkflowApprovalOmit;
    task?: Prisma.TaskOmit;
    taskAssignment?: Prisma.TaskAssignmentOmit;
    auditLog?: Prisma.AuditLogOmit;
    notificationTemplate?: Prisma.NotificationTemplateOmit;
    notificationBatch?: Prisma.NotificationBatchOmit;
    notificationDelivery?: Prisma.NotificationDeliveryOmit;
    notification?: Prisma.NotificationOmit;
    outboxEvent?: Prisma.OutboxEventOmit;
    eventLog?: Prisma.EventLogOmit;
    attachment?: Prisma.AttachmentOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map