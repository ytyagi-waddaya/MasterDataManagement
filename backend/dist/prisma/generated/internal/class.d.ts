import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.role`: Exposes CRUD operations for the **Role** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Roles
      * const roles = await prisma.role.findMany()
      * ```
      */
    get role(): Prisma.RoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.roleHierarchy`: Exposes CRUD operations for the **RoleHierarchy** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RoleHierarchies
      * const roleHierarchies = await prisma.roleHierarchy.findMany()
      * ```
      */
    get roleHierarchy(): Prisma.RoleHierarchyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserRoles
      * const userRoles = await prisma.userRole.findMany()
      * ```
      */
    get userRole(): Prisma.UserRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.module`: Exposes CRUD operations for the **Module** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Modules
      * const modules = await prisma.module.findMany()
      * ```
      */
    get module(): Prisma.ModuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.action`: Exposes CRUD operations for the **Action** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Actions
      * const actions = await prisma.action.findMany()
      * ```
      */
    get action(): Prisma.ActionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.resource`: Exposes CRUD operations for the **Resource** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Resources
      * const resources = await prisma.resource.findMany()
      * ```
      */
    get resource(): Prisma.ResourceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Permissions
      * const permissions = await prisma.permission.findMany()
      * ```
      */
    get permission(): Prisma.PermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RolePermissions
      * const rolePermissions = await prisma.rolePermission.findMany()
      * ```
      */
    get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.conditionFieldRegistry`: Exposes CRUD operations for the **ConditionFieldRegistry** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ConditionFieldRegistries
      * const conditionFieldRegistries = await prisma.conditionFieldRegistry.findMany()
      * ```
      */
    get conditionFieldRegistry(): Prisma.ConditionFieldRegistryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.policy`: Exposes CRUD operations for the **Policy** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Policies
      * const policies = await prisma.policy.findMany()
      * ```
      */
    get policy(): Prisma.PolicyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.masterObject`: Exposes CRUD operations for the **MasterObject** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MasterObjects
      * const masterObjects = await prisma.masterObject.findMany()
      * ```
      */
    get masterObject(): Prisma.MasterObjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.masterObjectSchema`: Exposes CRUD operations for the **MasterObjectSchema** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MasterObjectSchemas
      * const masterObjectSchemas = await prisma.masterObjectSchema.findMany()
      * ```
      */
    get masterObjectSchema(): Prisma.MasterObjectSchemaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.fieldDefinition`: Exposes CRUD operations for the **FieldDefinition** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FieldDefinitions
      * const fieldDefinitions = await prisma.fieldDefinition.findMany()
      * ```
      */
    get fieldDefinition(): Prisma.FieldDefinitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.fieldPermission`: Exposes CRUD operations for the **FieldPermission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FieldPermissions
      * const fieldPermissions = await prisma.fieldPermission.findMany()
      * ```
      */
    get fieldPermission(): Prisma.FieldPermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.fieldValidationRule`: Exposes CRUD operations for the **FieldValidationRule** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FieldValidationRules
      * const fieldValidationRules = await prisma.fieldValidationRule.findMany()
      * ```
      */
    get fieldValidationRule(): Prisma.FieldValidationRuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.fieldFormula`: Exposes CRUD operations for the **FieldFormula** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FieldFormulas
      * const fieldFormulas = await prisma.fieldFormula.findMany()
      * ```
      */
    get fieldFormula(): Prisma.FieldFormulaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.fieldReference`: Exposes CRUD operations for the **FieldReference** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FieldReferences
      * const fieldReferences = await prisma.fieldReference.findMany()
      * ```
      */
    get fieldReference(): Prisma.FieldReferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.fieldConditionBinding`: Exposes CRUD operations for the **FieldConditionBinding** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FieldConditionBindings
      * const fieldConditionBindings = await prisma.fieldConditionBinding.findMany()
      * ```
      */
    get fieldConditionBinding(): Prisma.FieldConditionBindingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.masterRecord`: Exposes CRUD operations for the **MasterRecord** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MasterRecords
      * const masterRecords = await prisma.masterRecord.findMany()
      * ```
      */
    get masterRecord(): Prisma.MasterRecordDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.recordFieldHistory`: Exposes CRUD operations for the **RecordFieldHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RecordFieldHistories
      * const recordFieldHistories = await prisma.recordFieldHistory.findMany()
      * ```
      */
    get recordFieldHistory(): Prisma.RecordFieldHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.recordFieldIndex`: Exposes CRUD operations for the **RecordFieldIndex** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RecordFieldIndices
      * const recordFieldIndices = await prisma.recordFieldIndex.findMany()
      * ```
      */
    get recordFieldIndex(): Prisma.RecordFieldIndexDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.schemaChange`: Exposes CRUD operations for the **SchemaChange** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SchemaChanges
      * const schemaChanges = await prisma.schemaChange.findMany()
      * ```
      */
    get schemaChange(): Prisma.SchemaChangeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.formEventHook`: Exposes CRUD operations for the **FormEventHook** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FormEventHooks
      * const formEventHooks = await prisma.formEventHook.findMany()
      * ```
      */
    get formEventHook(): Prisma.FormEventHookDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.recordPermission`: Exposes CRUD operations for the **RecordPermission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RecordPermissions
      * const recordPermissions = await prisma.recordPermission.findMany()
      * ```
      */
    get recordPermission(): Prisma.RecordPermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowDefinition`: Exposes CRUD operations for the **WorkflowDefinition** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowDefinitions
      * const workflowDefinitions = await prisma.workflowDefinition.findMany()
      * ```
      */
    get workflowDefinition(): Prisma.WorkflowDefinitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowStage`: Exposes CRUD operations for the **WorkflowStage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowStages
      * const workflowStages = await prisma.workflowStage.findMany()
      * ```
      */
    get workflowStage(): Prisma.WorkflowStageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowTransition`: Exposes CRUD operations for the **WorkflowTransition** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowTransitions
      * const workflowTransitions = await prisma.workflowTransition.findMany()
      * ```
      */
    get workflowTransition(): Prisma.WorkflowTransitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowInstance`: Exposes CRUD operations for the **WorkflowInstance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowInstances
      * const workflowInstances = await prisma.workflowInstance.findMany()
      * ```
      */
    get workflowInstance(): Prisma.WorkflowInstanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowHistory`: Exposes CRUD operations for the **WorkflowHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowHistories
      * const workflowHistories = await prisma.workflowHistory.findMany()
      * ```
      */
    get workflowHistory(): Prisma.WorkflowHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowTransitionAllowedRole`: Exposes CRUD operations for the **WorkflowTransitionAllowedRole** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowTransitionAllowedRoles
      * const workflowTransitionAllowedRoles = await prisma.workflowTransitionAllowedRole.findMany()
      * ```
      */
    get workflowTransitionAllowedRole(): Prisma.WorkflowTransitionAllowedRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowTransitionAllowedUser`: Exposes CRUD operations for the **WorkflowTransitionAllowedUser** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowTransitionAllowedUsers
      * const workflowTransitionAllowedUsers = await prisma.workflowTransitionAllowedUser.findMany()
      * ```
      */
    get workflowTransitionAllowedUser(): Prisma.WorkflowTransitionAllowedUserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowApproval`: Exposes CRUD operations for the **WorkflowApproval** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowApprovals
      * const workflowApprovals = await prisma.workflowApproval.findMany()
      * ```
      */
    get workflowApproval(): Prisma.WorkflowApprovalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.task`: Exposes CRUD operations for the **Task** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Tasks
      * const tasks = await prisma.task.findMany()
      * ```
      */
    get task(): Prisma.TaskDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.taskAssignment`: Exposes CRUD operations for the **TaskAssignment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more TaskAssignments
      * const taskAssignments = await prisma.taskAssignment.findMany()
      * ```
      */
    get taskAssignment(): Prisma.TaskAssignmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AuditLogs
      * const auditLogs = await prisma.auditLog.findMany()
      * ```
      */
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notificationTemplate`: Exposes CRUD operations for the **NotificationTemplate** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NotificationTemplates
      * const notificationTemplates = await prisma.notificationTemplate.findMany()
      * ```
      */
    get notificationTemplate(): Prisma.NotificationTemplateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notificationBatch`: Exposes CRUD operations for the **NotificationBatch** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NotificationBatches
      * const notificationBatches = await prisma.notificationBatch.findMany()
      * ```
      */
    get notificationBatch(): Prisma.NotificationBatchDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notificationDelivery`: Exposes CRUD operations for the **NotificationDelivery** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NotificationDeliveries
      * const notificationDeliveries = await prisma.notificationDelivery.findMany()
      * ```
      */
    get notificationDelivery(): Prisma.NotificationDeliveryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.outboxEvent`: Exposes CRUD operations for the **OutboxEvent** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OutboxEvents
      * const outboxEvents = await prisma.outboxEvent.findMany()
      * ```
      */
    get outboxEvent(): Prisma.OutboxEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.eventLog`: Exposes CRUD operations for the **EventLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more EventLogs
      * const eventLogs = await prisma.eventLog.findMany()
      * ```
      */
    get eventLog(): Prisma.EventLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Attachments
      * const attachments = await prisma.attachment.findMany()
      * ```
      */
    get attachment(): Prisma.AttachmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RefreshTokens
      * const refreshTokens = await prisma.refreshToken.findMany()
      * ```
      */
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map