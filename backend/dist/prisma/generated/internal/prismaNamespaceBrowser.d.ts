import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
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
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: "JsonNull";
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
    readonly AnyNull: "AnyNull";
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map