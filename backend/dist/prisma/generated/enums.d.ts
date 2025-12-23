export declare const NotificationType: {
    readonly INFO: "INFO";
    readonly WARNING: "WARNING";
    readonly ERROR: "ERROR";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationChannel: {
    readonly IN_APP: "IN_APP";
    readonly EMAIL: "EMAIL";
    readonly WEB: "WEB";
    readonly SMS: "SMS";
};
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
export declare const PolicyEffect: {
    readonly ALLOW: "ALLOW";
    readonly DENY: "DENY";
};
export type PolicyEffect = (typeof PolicyEffect)[keyof typeof PolicyEffect];
export declare const AuditAction: {
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly DELETE: "DELETE";
    readonly SOFT_DELETE: "SOFT_DELETE";
    readonly DEACTIVATE: "DEACTIVATE";
    readonly ACTIVATE: "ACTIVATE";
    readonly READ: "READ";
    readonly LOGIN: "LOGIN";
    readonly LOGOUT: "LOGOUT";
    readonly LOGIN_FAILED: "LOGIN_FAILED";
    readonly PASSWORD_CHANGE: "PASSWORD_CHANGE";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
    readonly RESTORE: "RESTORE";
    readonly ROLE_ASSIGN: "ROLE_ASSIGN";
    readonly PERMISSION_CHANGE: "PERMISSION_CHANGE";
    readonly STATUS_CHANGE: "STATUS_CHANGE";
    readonly SLA_BREACH: "SLA_BREACH";
    readonly FILE_UPLOAD: "FILE_UPLOAD";
    readonly EXPORT: "EXPORT";
    readonly IMPORT: "IMPORT";
    readonly TOKEN_REFRESH: "TOKEN_REFRESH";
    readonly ARCHIVE: "ARCHIVE";
    readonly GRANT: "GRANT";
};
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
export declare const AuditEntity: {
    readonly USER: "USER";
    readonly ACTION: "ACTION";
    readonly RESOURCE: "RESOURCE";
    readonly ROLE: "ROLE";
    readonly PERMISSION: "PERMISSION";
    readonly USER_ROLE: "USER_ROLE";
    readonly AUDIT_LOG: "AUDIT_LOG";
    readonly WORKFLOW: "WORKFLOW";
    readonly TASK: "TASK";
    readonly POLICY: "POLICY";
    readonly MASTER_RECORD: "MASTER_RECORD";
    readonly MASTER_OBJECT: "MASTER_OBJECT";
    readonly MODULE: "MODULE";
    readonly ROLE_PERMISSION: "ROLE_PERMISSION";
};
export type AuditEntity = (typeof AuditEntity)[keyof typeof AuditEntity];
export declare const PerformedByType: {
    readonly USER: "USER";
    readonly SYSTEM: "SYSTEM";
    readonly INTEGRATION: "INTEGRATION";
};
export type PerformedByType = (typeof PerformedByType)[keyof typeof PerformedByType];
export declare const UserType: {
    readonly INTERNAL: "INTERNAL";
    readonly EXTERNAL: "EXTERNAL";
    readonly SERVICE: "SERVICE";
};
export type UserType = (typeof UserType)[keyof typeof UserType];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly LOCKED: "LOCKED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const AccessLevel: {
    readonly FULL: "FULL";
    readonly CONDITIONAL: "CONDITIONAL";
    readonly NONE: "NONE";
};
export type AccessLevel = (typeof AccessLevel)[keyof typeof AccessLevel];
export declare const SchemaStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type SchemaStatus = (typeof SchemaStatus)[keyof typeof SchemaStatus];
export declare const FieldCategory: {
    readonly INPUT: "INPUT";
    readonly REFERENCE: "REFERENCE";
    readonly STRUCTURE: "STRUCTURE";
    readonly CALCULATED: "CALCULATED";
    readonly SYSTEM: "SYSTEM";
    readonly PRESENTATION: "PRESENTATION";
    readonly DEPRECATED: "DEPRECATED";
};
export type FieldCategory = (typeof FieldCategory)[keyof typeof FieldCategory];
export declare const FieldDataType: {
    readonly STRING: "STRING";
    readonly NUMBER: "NUMBER";
    readonly BOOLEAN: "BOOLEAN";
    readonly DATE: "DATE";
    readonly DATETIME: "DATETIME";
    readonly JSON: "JSON";
    readonly ARRAY: "ARRAY";
};
export type FieldDataType = (typeof FieldDataType)[keyof typeof FieldDataType];
export declare const FieldType: {
    readonly TEXT: "TEXT";
    readonly NUMBER: "NUMBER";
    readonly SELECT: "SELECT";
    readonly RADIO: "RADIO";
    readonly CHECKBOX: "CHECKBOX";
    readonly DATE: "DATE";
    readonly TABLE: "TABLE";
    readonly REFERENCE: "REFERENCE";
    readonly FILE: "FILE";
    readonly RICH_TEXT: "RICH_TEXT";
};
export type FieldType = (typeof FieldType)[keyof typeof FieldType];
export declare const FieldValidationType: {
    readonly REQUIRED: "REQUIRED";
    readonly REQUIRED_IF: "REQUIRED_IF";
    readonly REGEX: "REGEX";
    readonly RANGE: "RANGE";
    readonly LENGTH: "LENGTH";
    readonly CUSTOM: "CUSTOM";
};
export type FieldValidationType = (typeof FieldValidationType)[keyof typeof FieldValidationType];
export declare const SchemaChangeType: {
    readonly ADD_FIELD: "ADD_FIELD";
    readonly REMOVE_FIELD: "REMOVE_FIELD";
    readonly UPDATE_CONFIG: "UPDATE_CONFIG";
    readonly REORDER_FIELD: "REORDER_FIELD";
    readonly RENAME_FIELD: "RENAME_FIELD";
};
export type SchemaChangeType = (typeof SchemaChangeType)[keyof typeof SchemaChangeType];
export declare const FormEventType: {
    readonly ON_CREATE: "ON_CREATE";
    readonly ON_UPDATE: "ON_UPDATE";
    readonly ON_STAGE_CHANGE: "ON_STAGE_CHANGE";
    readonly ON_DELETE: "ON_DELETE";
    readonly ON_VALIDATE: "ON_VALIDATE";
    readonly ON_READ: "ON_READ";
};
export type FormEventType = (typeof FormEventType)[keyof typeof FormEventType];
export declare const FormEventHandlerType: {
    readonly WEBHOOK: "WEBHOOK";
    readonly QUEUE: "QUEUE";
    readonly FUNCTION: "FUNCTION";
};
export type FormEventHandlerType = (typeof FormEventHandlerType)[keyof typeof FormEventHandlerType];
export declare const ReferenceRelationType: {
    readonly ONE_TO_ONE: "ONE_TO_ONE";
    readonly ONE_TO_MANY: "ONE_TO_MANY";
};
export type ReferenceRelationType = (typeof ReferenceRelationType)[keyof typeof ReferenceRelationType];
export declare const ReferenceDeleteBehavior: {
    readonly RESTRICT: "RESTRICT";
    readonly CASCADE: "CASCADE";
    readonly SET_NULL: "SET_NULL";
};
export type ReferenceDeleteBehavior = (typeof ReferenceDeleteBehavior)[keyof typeof ReferenceDeleteBehavior];
export declare const ValidationSeverity: {
    readonly ERROR: "ERROR";
    readonly WARNING: "WARNING";
};
export type ValidationSeverity = (typeof ValidationSeverity)[keyof typeof ValidationSeverity];
export declare const Category: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly UNDER_REVIEW: "UNDER_REVIEW";
    readonly APPROVAL: "APPROVAL";
    readonly CORRECTION: "CORRECTION";
    readonly ON_HOLD: "ON_HOLD";
    readonly REJECTED: "REJECTED";
    readonly NORMAL: "NORMAL";
    readonly COMPLETED: "COMPLETED";
};
export type Category = (typeof Category)[keyof typeof Category];
export declare const TransitionType: {
    readonly NORMAL: "NORMAL";
    readonly APPROVAL: "APPROVAL";
    readonly SEND_BACK: "SEND_BACK";
    readonly REVIEW: "REVIEW";
    readonly AUTO: "AUTO";
};
export type TransitionType = (typeof TransitionType)[keyof typeof TransitionType];
export declare const ApprovalStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];
export declare const HistoryAction: {
    readonly TRANSITION: "TRANSITION";
    readonly APPROVAL_REQUESTED: "APPROVAL_REQUESTED";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly SENT_BACK: "SENT_BACK";
    readonly REVIEWED: "REVIEWED";
    readonly AUTO_TRANSITION: "AUTO_TRANSITION";
};
export type HistoryAction = (typeof HistoryAction)[keyof typeof HistoryAction];
export declare const ApprovalStrategy: {
    readonly ALL: "ALL";
    readonly ANY: "ANY";
    readonly MAJORITY: "MAJORITY";
};
export type ApprovalStrategy = (typeof ApprovalStrategy)[keyof typeof ApprovalStrategy];
export declare const WorkflowInstanceStatus: {
    readonly RUNNING: "RUNNING";
    readonly PAUSED: "PAUSED";
    readonly ON_HOLD: "ON_HOLD";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly ERROR: "ERROR";
};
export type WorkflowInstanceStatus = (typeof WorkflowInstanceStatus)[keyof typeof WorkflowInstanceStatus];
export declare const TaskStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly REJECTED: "REJECTED";
    readonly CANCELLED: "CANCELLED";
};
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export declare const WorkflowDefinitionStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type WorkflowDefinitionStatus = (typeof WorkflowDefinitionStatus)[keyof typeof WorkflowDefinitionStatus];
export declare const TriggerStrategy: {
    readonly ANY_ALLOWED: "ANY_ALLOWED";
    readonly ALL_ALLOWED: "ALL_ALLOWED";
    readonly CREATOR_ONLY: "CREATOR_ONLY";
    readonly ASSIGNEE_ONLY: "ASSIGNEE_ONLY";
    readonly APPROVER_ONLY: "APPROVER_ONLY";
    readonly SYSTEM_ONLY: "SYSTEM_ONLY";
};
export type TriggerStrategy = (typeof TriggerStrategy)[keyof typeof TriggerStrategy];
//# sourceMappingURL=enums.d.ts.map