import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
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
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Role
 *
 */
export type Role = Prisma.RoleModel;
/**
 * Model RoleHierarchy
 *
 */
export type RoleHierarchy = Prisma.RoleHierarchyModel;
/**
 * Model UserRole
 *
 */
export type UserRole = Prisma.UserRoleModel;
/**
 * Model Module
 *
 */
export type Module = Prisma.ModuleModel;
/**
 * Model Action
 *
 */
export type Action = Prisma.ActionModel;
/**
 * Model Resource
 *
 */
export type Resource = Prisma.ResourceModel;
/**
 * Model Permission
 *
 */
export type Permission = Prisma.PermissionModel;
/**
 * Model RolePermission
 *
 */
export type RolePermission = Prisma.RolePermissionModel;
/**
 * Model ConditionFieldRegistry
 *
 */
export type ConditionFieldRegistry = Prisma.ConditionFieldRegistryModel;
/**
 * Model Policy
 *
 */
export type Policy = Prisma.PolicyModel;
/**
 * Model MasterObject
 *
 */
export type MasterObject = Prisma.MasterObjectModel;
/**
 * Model MasterObjectSchema
 *
 */
export type MasterObjectSchema = Prisma.MasterObjectSchemaModel;
/**
 * Model FieldDefinition
 *
 */
export type FieldDefinition = Prisma.FieldDefinitionModel;
/**
 * Model FieldPermission
 *
 */
export type FieldPermission = Prisma.FieldPermissionModel;
/**
 * Model FieldValidationRule
 *
 */
export type FieldValidationRule = Prisma.FieldValidationRuleModel;
/**
 * Model FieldFormula
 *
 */
export type FieldFormula = Prisma.FieldFormulaModel;
/**
 * Model FieldReference
 *
 */
export type FieldReference = Prisma.FieldReferenceModel;
/**
 * Model FieldConditionBinding
 *
 */
export type FieldConditionBinding = Prisma.FieldConditionBindingModel;
/**
 * Model MasterRecord
 *
 */
export type MasterRecord = Prisma.MasterRecordModel;
/**
 * Model RecordFieldHistory
 *
 */
export type RecordFieldHistory = Prisma.RecordFieldHistoryModel;
/**
 * Model RecordFieldIndex
 *
 */
export type RecordFieldIndex = Prisma.RecordFieldIndexModel;
/**
 * Model SchemaChange
 *
 */
export type SchemaChange = Prisma.SchemaChangeModel;
/**
 * Model FormEventHook
 *
 */
export type FormEventHook = Prisma.FormEventHookModel;
/**
 * Model RecordPermission
 *
 */
export type RecordPermission = Prisma.RecordPermissionModel;
/**
 * Model WorkflowDefinition
 *
 */
export type WorkflowDefinition = Prisma.WorkflowDefinitionModel;
/**
 * Model WorkflowStage
 *
 */
export type WorkflowStage = Prisma.WorkflowStageModel;
/**
 * Model WorkflowTransition
 *
 */
export type WorkflowTransition = Prisma.WorkflowTransitionModel;
/**
 * Model WorkflowInstance
 *
 */
export type WorkflowInstance = Prisma.WorkflowInstanceModel;
/**
 * Model WorkflowHistory
 *
 */
export type WorkflowHistory = Prisma.WorkflowHistoryModel;
/**
 * Model WorkflowTransitionAllowedRole
 *
 */
export type WorkflowTransitionAllowedRole = Prisma.WorkflowTransitionAllowedRoleModel;
/**
 * Model WorkflowTransitionAllowedUser
 *
 */
export type WorkflowTransitionAllowedUser = Prisma.WorkflowTransitionAllowedUserModel;
/**
 * Model WorkflowApproval
 *
 */
export type WorkflowApproval = Prisma.WorkflowApprovalModel;
/**
 * Model Task
 *
 */
export type Task = Prisma.TaskModel;
/**
 * Model TaskAssignment
 *
 */
export type TaskAssignment = Prisma.TaskAssignmentModel;
/**
 * Model AuditLog
 *
 */
export type AuditLog = Prisma.AuditLogModel;
/**
 * Model NotificationTemplate
 *
 */
export type NotificationTemplate = Prisma.NotificationTemplateModel;
/**
 * Model NotificationBatch
 *
 */
export type NotificationBatch = Prisma.NotificationBatchModel;
/**
 * Model NotificationDelivery
 *
 */
export type NotificationDelivery = Prisma.NotificationDeliveryModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model OutboxEvent
 *
 */
export type OutboxEvent = Prisma.OutboxEventModel;
/**
 * Model EventLog
 *
 */
export type EventLog = Prisma.EventLogModel;
/**
 * Model Attachment
 *
 */
export type Attachment = Prisma.AttachmentModel;
/**
 * Model RefreshToken
 *
 */
export type RefreshToken = Prisma.RefreshTokenModel;
//# sourceMappingURL=client.d.ts.map