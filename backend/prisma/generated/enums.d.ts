export declare const RecordStatus: {
    readonly Draft: "Draft";
    readonly Validation: "Validation";
    readonly Approval: "Approval";
    readonly Published: "Published";
    readonly Archived: "Archived";
};
export type RecordStatus = (typeof RecordStatus)[keyof typeof RecordStatus];
export declare const TaskStatus: {
    readonly Pending: "Pending";
    readonly Completed: "Completed";
    readonly Rejected: "Rejected";
    readonly Cancelled: "Cancelled";
};
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
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
export declare const WorkflowInstanceStatus: {
    readonly RUNNING: "RUNNING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly ERROR: "ERROR";
};
export type WorkflowInstanceStatus = (typeof WorkflowInstanceStatus)[keyof typeof WorkflowInstanceStatus];
export declare const AccessLevel: {
    readonly FULL: "FULL";
    readonly CONDITIONAL: "CONDITIONAL";
    readonly NONE: "NONE";
};
export type AccessLevel = (typeof AccessLevel)[keyof typeof AccessLevel];
//# sourceMappingURL=enums.d.ts.map