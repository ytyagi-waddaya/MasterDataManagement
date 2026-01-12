-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'WARNING', 'ERROR');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL', 'WEB', 'SMS');

-- CreateEnum
CREATE TYPE "PolicyEffect" AS ENUM ('ALLOW', 'DENY');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'SOFT_DELETE', 'DEACTIVATE', 'ACTIVATE', 'READ', 'LOGIN', 'LOGOUT', 'LOGIN_FAILED', 'PASSWORD_CHANGE', 'PASSWORD_RESET', 'RESTORE', 'ROLE_ASSIGN', 'PERMISSION_CHANGE', 'STATUS_CHANGE', 'SLA_BREACH', 'FILE_UPLOAD', 'EXPORT', 'IMPORT', 'TOKEN_REFRESH', 'ARCHIVE', 'GRANT');

-- CreateEnum
CREATE TYPE "AuditEntity" AS ENUM ('USER', 'ACTION', 'RESOURCE', 'ROLE', 'PERMISSION', 'USER_ROLE', 'AUDIT_LOG', 'WORKFLOW', 'TASK', 'POLICY', 'MASTER_RECORD', 'MASTER_OBJECT', 'MODULE', 'ROLE_PERMISSION');

-- CreateEnum
CREATE TYPE "PerformedByType" AS ENUM ('USER', 'SYSTEM', 'INTEGRATION');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('INTERNAL', 'EXTERNAL', 'SERVICE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'LOCKED');

-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('FULL', 'CONDITIONAL', 'NONE');

-- CreateEnum
CREATE TYPE "SchemaStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "FieldCategory" AS ENUM ('INPUT', 'REFERENCE', 'STRUCTURE', 'CALCULATED', 'SYSTEM', 'PRESENTATION', 'DEPRECATED');

-- CreateEnum
CREATE TYPE "FieldDataType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'DATE', 'DATETIME', 'JSON', 'ARRAY');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'NUMBER', 'SELECT', 'RADIO', 'CHECKBOX', 'DATE', 'TABLE', 'REFERENCE', 'FILE', 'RICH_TEXT');

-- CreateEnum
CREATE TYPE "FieldValidationType" AS ENUM ('REQUIRED', 'REQUIRED_IF', 'REGEX', 'RANGE', 'LENGTH', 'CUSTOM');

-- CreateEnum
CREATE TYPE "SchemaChangeType" AS ENUM ('ADD_FIELD', 'REMOVE_FIELD', 'UPDATE_CONFIG', 'REORDER_FIELD', 'RENAME_FIELD');

-- CreateEnum
CREATE TYPE "FormEventType" AS ENUM ('ON_CREATE', 'ON_UPDATE', 'ON_STAGE_CHANGE', 'ON_DELETE', 'ON_VALIDATE', 'ON_READ');

-- CreateEnum
CREATE TYPE "FormEventHandlerType" AS ENUM ('WEBHOOK', 'QUEUE', 'FUNCTION');

-- CreateEnum
CREATE TYPE "ReferenceRelationType" AS ENUM ('ONE_TO_ONE', 'ONE_TO_MANY');

-- CreateEnum
CREATE TYPE "ReferenceDeleteBehavior" AS ENUM ('RESTRICT', 'CASCADE', 'SET_NULL');

-- CreateEnum
CREATE TYPE "ValidationSeverity" AS ENUM ('ERROR', 'WARNING');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVAL', 'CORRECTION', 'ON_HOLD', 'REJECTED', 'NORMAL', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TransitionType" AS ENUM ('NORMAL', 'APPROVAL', 'SEND_BACK', 'REVIEW', 'AUTO');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "HistoryAction" AS ENUM ('TRANSITION', 'APPROVAL_REQUESTED', 'APPROVED', 'REJECTED', 'SENT_BACK', 'REVIEWED', 'AUTO_TRANSITION');

-- CreateEnum
CREATE TYPE "ApprovalStrategy" AS ENUM ('ALL', 'ANY', 'MAJORITY');

-- CreateEnum
CREATE TYPE "WorkflowInstanceStatus" AS ENUM ('RUNNING', 'PAUSED', 'ON_HOLD', 'COMPLETED', 'CANCELLED', 'ERROR');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'COMPLETED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WorkflowDefinitionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TriggerStrategy" AS ENUM ('ANY_ALLOWED', 'ALL_ALLOWED', 'CREATOR_ONLY', 'ASSIGNEE_ONLY', 'APPROVER_ONLY', 'SYSTEM_ONLY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'INTERNAL',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "attributes" JSONB,
    "department" TEXT,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleHierarchy" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,

    CONSTRAINT "RoleHierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "moduleId" TEXT,
    "masterObjectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "resourceId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "conditions" JSONB,
    "expression" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "accessLevel" "AccessLevel" NOT NULL DEFAULT 'NONE',
    "conditions" JSONB,
    "expression" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConditionFieldRegistry" (
    "id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "fieldType" TEXT NOT NULL,
    "meta" JSONB,
    "moduleId" TEXT,
    "resourceId" TEXT,
    "scope" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ConditionFieldRegistry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "effect" "PolicyEffect" NOT NULL DEFAULT 'ALLOW',
    "resourceId" TEXT,
    "actionId" TEXT,
    "condition" JSONB NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterObject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "MasterObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterObjectSchema" (
    "id" TEXT NOT NULL,
    "masterObjectId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "status" "SchemaStatus" NOT NULL DEFAULT 'DRAFT',
    "layout" JSONB NOT NULL,
    "checksum" TEXT NOT NULL,
    "createdById" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "MasterObjectSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldDefinition" (
    "id" TEXT NOT NULL,
    "masterObjectId" TEXT NOT NULL,
    "schemaId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "category" "FieldCategory" NOT NULL,
    "dataType" "FieldDataType" NOT NULL,
    "fieldType" "FieldType" NOT NULL,
    "config" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FieldDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldPermission" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "roleId" TEXT,
    "userId" TEXT,
    "canRead" BOOLEAN NOT NULL DEFAULT true,
    "canWrite" BOOLEAN NOT NULL DEFAULT false,
    "condition" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FieldPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldValidationRule" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "type" "FieldValidationType" NOT NULL,
    "rule" JSONB NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "severity" "ValidationSeverity" NOT NULL DEFAULT 'ERROR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FieldValidationRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldFormula" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "dependencies" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FieldFormula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldReference" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "targetObjectId" TEXT NOT NULL,
    "displayFieldKey" TEXT NOT NULL,
    "relationType" "ReferenceRelationType" NOT NULL,
    "allowMultiple" BOOLEAN NOT NULL DEFAULT false,
    "onDeleteBehavior" "ReferenceDeleteBehavior" NOT NULL DEFAULT 'RESTRICT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FieldReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldConditionBinding" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "conditionKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FieldConditionBinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterRecord" (
    "id" TEXT NOT NULL,
    "masterObjectId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "currentStageId" TEXT,
    "createdById" TEXT,
    "linkedUserId" TEXT,
    "schemaId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "MasterRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordFieldHistory" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "fieldKey" TEXT NOT NULL,
    "oldValue" JSONB,
    "newValue" JSONB,
    "changedById" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RecordFieldHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordFieldIndex" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "fieldKey" TEXT NOT NULL,
    "stringValue" TEXT,
    "numberValue" DOUBLE PRECISION,
    "dateValue" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RecordFieldIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemaChange" (
    "id" TEXT NOT NULL,
    "schemaId" TEXT NOT NULL,
    "type" "SchemaChangeType" NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SchemaChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormEventHook" (
    "id" TEXT NOT NULL,
    "masterObjectId" TEXT NOT NULL,
    "event" "FormEventType" NOT NULL,
    "handlerType" "FormEventHandlerType" NOT NULL,
    "config" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FormEventHook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordPermission" (
    "id" TEXT NOT NULL,
    "masterObjectId" TEXT NOT NULL,
    "roleId" TEXT,
    "userId" TEXT,
    "canRead" BOOLEAN NOT NULL,
    "canWrite" BOOLEAN NOT NULL,
    "canDelete" BOOLEAN NOT NULL,
    "condition" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RecordPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "status" "WorkflowDefinitionStatus" NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "publishedAt" TIMESTAMP(3),
    "publishedById" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "WorkflowDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowStage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "color" TEXT,
    "position" JSONB,
    "isInitial" BOOLEAN NOT NULL DEFAULT false,
    "isFinal" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "category" "Category" NOT NULL DEFAULT 'NORMAL',
    "allowedNextCategories" "Category"[] DEFAULT ARRAY[]::"Category"[],
    "workflowId" TEXT NOT NULL,

    CONSTRAINT "WorkflowStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowTransition" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "condition" JSONB,
    "metadata" JSONB,
    "autoTrigger" BOOLEAN NOT NULL DEFAULT false,
    "transitionType" "TransitionType" NOT NULL DEFAULT 'NORMAL',
    "triggerStrategy" "TriggerStrategy" NOT NULL DEFAULT 'ANY_ALLOWED',
    "approvalConfig" JSONB,
    "approvalStrategy" "ApprovalStrategy" NOT NULL DEFAULT 'ALL',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "workflowId" TEXT NOT NULL,
    "fromStageId" TEXT NOT NULL,
    "toStageId" TEXT NOT NULL,

    CONSTRAINT "WorkflowTransition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowInstance" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "currentStageId" TEXT,
    "status" "WorkflowInstanceStatus" NOT NULL DEFAULT 'RUNNING',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "endedReason" TEXT,
    "errorDetails" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startedById" TEXT,
    "lockedAt" TIMESTAMP(3),
    "lockedBy" TEXT,

    CONSTRAINT "WorkflowInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowHistory" (
    "id" TEXT NOT NULL,
    "workflowInstanceId" TEXT NOT NULL,
    "fromStageId" TEXT,
    "toStageId" TEXT NOT NULL,
    "performedById" TEXT,
    "notes" TEXT,
    "workflowTransitionId" TEXT,
    "actionLabel" TEXT,
    "metadata" JSONB,
    "actionType" "HistoryAction" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "performedByType" TEXT,

    CONSTRAINT "WorkflowHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowTransitionAllowedRole" (
    "id" TEXT NOT NULL,
    "transitionId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowTransitionAllowedRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowTransitionAllowedUser" (
    "id" TEXT NOT NULL,
    "transitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowTransitionAllowedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowApproval" (
    "id" TEXT NOT NULL,
    "workflowInstanceId" TEXT NOT NULL,
    "transitionId" TEXT NOT NULL,
    "approverId" TEXT NOT NULL,
    "levelOrder" INTEGER,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decidedAt" TIMESTAMP(3),
    "comment" TEXT,

    CONSTRAINT "WorkflowApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "masterRecordId" TEXT NOT NULL,
    "workflowInstanceId" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "currentStep" JSONB NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "assignedToId" TEXT,
    "assignedById" TEXT,
    "completedAt" TIMESTAMP(3),
    "dueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskAssignment" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "masterRecordId" TEXT,
    "userId" TEXT,
    "entity" "AuditEntity" NOT NULL,
    "action" "AuditAction" NOT NULL,
    "comment" TEXT,
    "step" JSONB,
    "before" JSONB,
    "after" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "performedBy" "PerformedByType" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "subject" TEXT,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationBatch" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'INFO',
    "data" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationDelivery" (
    "id" TEXT NOT NULL,
    "batchId" TEXT,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'INFO',
    "channels" JSONB NOT NULL,
    "data" JSONB,
    "targetType" TEXT,
    "targetId" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "scheduledAt" TIMESTAMP(3),

    CONSTRAINT "NotificationDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'INFO',
    "channels" JSONB,
    "data" JSONB,
    "targetType" TEXT,
    "targetId" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutboxEvent" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "targetUsers" JSONB,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "processedAt" TIMESTAMP(3),
    "lockedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutboxEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventLog" (
    "id" TEXT NOT NULL,
    "outboxId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "result" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT,
    "size" INTEGER,
    "uri" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceInfo" TEXT,
    "ipAddress" TEXT,
    "isInvalidated" BOOLEAN NOT NULL DEFAULT false,
    "revokedAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_department_idx" ON "User"("department");

-- CreateIndex
CREATE INDEX "User_location_idx" ON "User"("location");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE INDEX "User_type_idx" ON "User"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_key_key" ON "Role"("key");

-- CreateIndex
CREATE INDEX "RoleHierarchy_parentId_idx" ON "RoleHierarchy"("parentId");

-- CreateIndex
CREATE INDEX "RoleHierarchy_childId_idx" ON "RoleHierarchy"("childId");

-- CreateIndex
CREATE UNIQUE INDEX "RoleHierarchy_parentId_childId_key" ON "RoleHierarchy"("parentId", "childId");

-- CreateIndex
CREATE INDEX "UserRole_userId_idx" ON "UserRole"("userId");

-- CreateIndex
CREATE INDEX "UserRole_roleId_idx" ON "UserRole"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleId_key" ON "UserRole"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_key_key" ON "Module"("key");

-- CreateIndex
CREATE INDEX "Module_name_idx" ON "Module"("name");

-- CreateIndex
CREATE INDEX "Module_createdAt_idx" ON "Module"("createdAt");

-- CreateIndex
CREATE INDEX "Module_deletedAt_idx" ON "Module"("deletedAt");

-- CreateIndex
CREATE INDEX "Module_key_idx" ON "Module"("key");

-- CreateIndex
CREATE INDEX "Module_description_idx" ON "Module"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_key" ON "Action"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Action_key_key" ON "Action"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_key_key" ON "Resource"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_key_key" ON "Permission"("key");

-- CreateIndex
CREATE INDEX "Permission_actionId_idx" ON "Permission"("actionId");

-- CreateIndex
CREATE INDEX "Permission_resourceId_idx" ON "Permission"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_actionId_resourceId_key" ON "Permission"("actionId", "resourceId");

-- CreateIndex
CREATE INDEX "RolePermission_roleId_permissionId_idx" ON "RolePermission"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_roleId_permissionId_key" ON "RolePermission"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "ConditionFieldRegistry_field_key" ON "ConditionFieldRegistry"("field");

-- CreateIndex
CREATE INDEX "Policy_resourceId_idx" ON "Policy"("resourceId");

-- CreateIndex
CREATE INDEX "Policy_actionId_idx" ON "Policy"("actionId");

-- CreateIndex
CREATE INDEX "Policy_enabled_idx" ON "Policy"("enabled");

-- CreateIndex
CREATE UNIQUE INDEX "MasterObject_name_key" ON "MasterObject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MasterObject_key_key" ON "MasterObject"("key");

-- CreateIndex
CREATE INDEX "MasterObjectSchema_masterObjectId_idx" ON "MasterObjectSchema"("masterObjectId");

-- CreateIndex
CREATE INDEX "MasterObjectSchema_status_idx" ON "MasterObjectSchema"("status");

-- CreateIndex
CREATE UNIQUE INDEX "MasterObjectSchema_masterObjectId_version_key" ON "MasterObjectSchema"("masterObjectId", "version");

-- CreateIndex
CREATE INDEX "FieldDefinition_schemaId_isActive_idx" ON "FieldDefinition"("schemaId", "isActive");

-- CreateIndex
CREATE INDEX "FieldDefinition_masterObjectId_idx" ON "FieldDefinition"("masterObjectId");

-- CreateIndex
CREATE INDEX "FieldDefinition_fieldType_idx" ON "FieldDefinition"("fieldType");

-- CreateIndex
CREATE INDEX "FieldDefinition_category_idx" ON "FieldDefinition"("category");

-- CreateIndex
CREATE UNIQUE INDEX "FieldDefinition_schemaId_key_key" ON "FieldDefinition"("schemaId", "key");

-- CreateIndex
CREATE INDEX "FieldPermission_fieldId_idx" ON "FieldPermission"("fieldId");

-- CreateIndex
CREATE INDEX "FieldPermission_roleId_idx" ON "FieldPermission"("roleId");

-- CreateIndex
CREATE INDEX "FieldPermission_userId_idx" ON "FieldPermission"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FieldPermission_fieldId_roleId_userId_key" ON "FieldPermission"("fieldId", "roleId", "userId");

-- CreateIndex
CREATE INDEX "FieldValidationRule_fieldId_idx" ON "FieldValidationRule"("fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "FieldFormula_fieldId_key" ON "FieldFormula"("fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "FieldReference_fieldId_key" ON "FieldReference"("fieldId");

-- CreateIndex
CREATE INDEX "FieldConditionBinding_conditionKey_idx" ON "FieldConditionBinding"("conditionKey");

-- CreateIndex
CREATE UNIQUE INDEX "FieldConditionBinding_fieldId_conditionKey_key" ON "FieldConditionBinding"("fieldId", "conditionKey");

-- CreateIndex
CREATE INDEX "MasterRecord_currentStageId_idx" ON "MasterRecord"("currentStageId");

-- CreateIndex
CREATE INDEX "MasterRecord_createdAt_idx" ON "MasterRecord"("createdAt");

-- CreateIndex
CREATE INDEX "MasterRecord_linkedUserId_idx" ON "MasterRecord"("linkedUserId");

-- CreateIndex
CREATE INDEX "RecordFieldHistory_recordId_idx" ON "RecordFieldHistory"("recordId");

-- CreateIndex
CREATE INDEX "RecordFieldHistory_fieldKey_idx" ON "RecordFieldHistory"("fieldKey");

-- CreateIndex
CREATE INDEX "RecordFieldHistory_changedById_idx" ON "RecordFieldHistory"("changedById");

-- CreateIndex
CREATE INDEX "RecordFieldIndex_fieldKey_stringValue_idx" ON "RecordFieldIndex"("fieldKey", "stringValue");

-- CreateIndex
CREATE INDEX "RecordFieldIndex_fieldKey_numberValue_idx" ON "RecordFieldIndex"("fieldKey", "numberValue");

-- CreateIndex
CREATE INDEX "RecordFieldIndex_fieldKey_dateValue_idx" ON "RecordFieldIndex"("fieldKey", "dateValue");

-- CreateIndex
CREATE UNIQUE INDEX "RecordFieldIndex_recordId_fieldKey_key" ON "RecordFieldIndex"("recordId", "fieldKey");

-- CreateIndex
CREATE INDEX "SchemaChange_schemaId_idx" ON "SchemaChange"("schemaId");

-- CreateIndex
CREATE INDEX "FormEventHook_masterObjectId_idx" ON "FormEventHook"("masterObjectId");

-- CreateIndex
CREATE INDEX "FormEventHook_event_idx" ON "FormEventHook"("event");

-- CreateIndex
CREATE INDEX "RecordPermission_masterObjectId_idx" ON "RecordPermission"("masterObjectId");

-- CreateIndex
CREATE INDEX "RecordPermission_roleId_idx" ON "RecordPermission"("roleId");

-- CreateIndex
CREATE INDEX "RecordPermission_userId_idx" ON "RecordPermission"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPermission_masterObjectId_roleId_userId_key" ON "RecordPermission"("masterObjectId", "roleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowDefinition_code_version_key" ON "WorkflowDefinition"("code", "version");

-- CreateIndex
CREATE INDEX "WorkflowStage_workflowId_isInitial_idx" ON "WorkflowStage"("workflowId", "isInitial");

-- CreateIndex
CREATE INDEX "WorkflowStage_workflowId_idx" ON "WorkflowStage"("workflowId");

-- CreateIndex
CREATE INDEX "WorkflowStage_code_idx" ON "WorkflowStage"("code");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowStage_workflowId_code_key" ON "WorkflowStage"("workflowId", "code");

-- CreateIndex
CREATE INDEX "WorkflowTransition_workflowId_idx" ON "WorkflowTransition"("workflowId");

-- CreateIndex
CREATE INDEX "WorkflowTransition_fromStageId_idx" ON "WorkflowTransition"("fromStageId");

-- CreateIndex
CREATE INDEX "WorkflowTransition_toStageId_idx" ON "WorkflowTransition"("toStageId");

-- CreateIndex
CREATE INDEX "WorkflowTransition_workflowId_fromStageId_toStageId_idx" ON "WorkflowTransition"("workflowId", "fromStageId", "toStageId");

-- CreateIndex
CREATE INDEX "WorkflowInstance_resourceType_resourceId_status_idx" ON "WorkflowInstance"("resourceType", "resourceId", "status");

-- CreateIndex
CREATE INDEX "WorkflowInstance_workflowId_idx" ON "WorkflowInstance"("workflowId");

-- CreateIndex
CREATE INDEX "WorkflowInstance_currentStageId_idx" ON "WorkflowInstance"("currentStageId");

-- CreateIndex
CREATE INDEX "WorkflowInstance_resourceType_resourceId_idx" ON "WorkflowInstance"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "WorkflowHistory_workflowInstanceId_idx" ON "WorkflowHistory"("workflowInstanceId");

-- CreateIndex
CREATE INDEX "WorkflowHistory_workflowTransitionId_idx" ON "WorkflowHistory"("workflowTransitionId");

-- CreateIndex
CREATE INDEX "WorkflowHistory_fromStageId_idx" ON "WorkflowHistory"("fromStageId");

-- CreateIndex
CREATE INDEX "WorkflowHistory_toStageId_idx" ON "WorkflowHistory"("toStageId");

-- CreateIndex
CREATE INDEX "WorkflowHistory_performedById_idx" ON "WorkflowHistory"("performedById");

-- CreateIndex
CREATE INDEX "WorkflowHistory_createdAt_idx" ON "WorkflowHistory"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowTransitionAllowedRole_transitionId_roleId_key" ON "WorkflowTransitionAllowedRole"("transitionId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowTransitionAllowedUser_transitionId_userId_key" ON "WorkflowTransitionAllowedUser"("transitionId", "userId");

-- CreateIndex
CREATE INDEX "WorkflowApproval_workflowInstanceId_transitionId_idx" ON "WorkflowApproval"("workflowInstanceId", "transitionId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowApproval_workflowInstanceId_transitionId_approverId_key" ON "WorkflowApproval"("workflowInstanceId", "transitionId", "approverId");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- CreateIndex
CREATE INDEX "Task_createdAt_idx" ON "Task"("createdAt");

-- CreateIndex
CREATE INDEX "TaskAssignment_taskId_idx" ON "TaskAssignment"("taskId");

-- CreateIndex
CREATE INDEX "TaskAssignment_userId_idx" ON "TaskAssignment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskAssignment_taskId_userId_key" ON "TaskAssignment"("taskId", "userId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_idx" ON "AuditLog"("entity");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "NotificationTemplate_name_idx" ON "NotificationTemplate"("name");

-- CreateIndex
CREATE INDEX "NotificationBatch_createdAt_idx" ON "NotificationBatch"("createdAt");

-- CreateIndex
CREATE INDEX "NotificationDelivery_userId_idx" ON "NotificationDelivery"("userId");

-- CreateIndex
CREATE INDEX "NotificationDelivery_read_idx" ON "NotificationDelivery"("read");

-- CreateIndex
CREATE INDEX "NotificationDelivery_createdAt_idx" ON "NotificationDelivery"("createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_read_idx" ON "Notification"("read");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "OutboxEvent_processedAt_idx" ON "OutboxEvent"("processedAt");

-- CreateIndex
CREATE INDEX "OutboxEvent_createdAt_idx" ON "OutboxEvent"("createdAt");

-- CreateIndex
CREATE INDEX "Attachment_targetType_targetId_idx" ON "Attachment"("targetType", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_tokenHash_key" ON "RefreshToken"("userId", "tokenHash");

-- AddForeignKey
ALTER TABLE "RoleHierarchy" ADD CONSTRAINT "RoleHierarchy_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleHierarchy" ADD CONSTRAINT "RoleHierarchy_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_masterObjectId_fkey" FOREIGN KEY ("masterObjectId") REFERENCES "MasterObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConditionFieldRegistry" ADD CONSTRAINT "ConditionFieldRegistry_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConditionFieldRegistry" ADD CONSTRAINT "ConditionFieldRegistry_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterObjectSchema" ADD CONSTRAINT "MasterObjectSchema_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterObjectSchema" ADD CONSTRAINT "MasterObjectSchema_masterObjectId_fkey" FOREIGN KEY ("masterObjectId") REFERENCES "MasterObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldDefinition" ADD CONSTRAINT "FieldDefinition_masterObjectId_fkey" FOREIGN KEY ("masterObjectId") REFERENCES "MasterObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldDefinition" ADD CONSTRAINT "FieldDefinition_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "MasterObjectSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldPermission" ADD CONSTRAINT "FieldPermission_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "FieldDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldPermission" ADD CONSTRAINT "FieldPermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldPermission" ADD CONSTRAINT "FieldPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldValidationRule" ADD CONSTRAINT "FieldValidationRule_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "FieldDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldFormula" ADD CONSTRAINT "FieldFormula_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "FieldDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldReference" ADD CONSTRAINT "FieldReference_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "FieldDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldReference" ADD CONSTRAINT "FieldReference_targetObjectId_fkey" FOREIGN KEY ("targetObjectId") REFERENCES "MasterObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldConditionBinding" ADD CONSTRAINT "FieldConditionBinding_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "FieldDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRecord" ADD CONSTRAINT "MasterRecord_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRecord" ADD CONSTRAINT "MasterRecord_currentStageId_fkey" FOREIGN KEY ("currentStageId") REFERENCES "WorkflowStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRecord" ADD CONSTRAINT "MasterRecord_linkedUserId_fkey" FOREIGN KEY ("linkedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRecord" ADD CONSTRAINT "MasterRecord_masterObjectId_fkey" FOREIGN KEY ("masterObjectId") REFERENCES "MasterObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRecord" ADD CONSTRAINT "MasterRecord_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "MasterObjectSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordFieldHistory" ADD CONSTRAINT "RecordFieldHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordFieldHistory" ADD CONSTRAINT "RecordFieldHistory_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "MasterRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordFieldIndex" ADD CONSTRAINT "RecordFieldIndex_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "MasterRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemaChange" ADD CONSTRAINT "SchemaChange_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "MasterObjectSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormEventHook" ADD CONSTRAINT "FormEventHook_masterObjectId_fkey" FOREIGN KEY ("masterObjectId") REFERENCES "MasterObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPermission" ADD CONSTRAINT "RecordPermission_masterObjectId_fkey" FOREIGN KEY ("masterObjectId") REFERENCES "MasterObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPermission" ADD CONSTRAINT "RecordPermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPermission" ADD CONSTRAINT "RecordPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinition" ADD CONSTRAINT "WorkflowDefinition_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinition" ADD CONSTRAINT "WorkflowDefinition_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinition" ADD CONSTRAINT "WorkflowDefinition_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStage" ADD CONSTRAINT "WorkflowStage_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "WorkflowDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowTransition" ADD CONSTRAINT "WorkflowTransition_fromStageId_fkey" FOREIGN KEY ("fromStageId") REFERENCES "WorkflowStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowTransition" ADD CONSTRAINT "WorkflowTransition_toStageId_fkey" FOREIGN KEY ("toStageId") REFERENCES "WorkflowStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowTransition" ADD CONSTRAINT "WorkflowTransition_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "WorkflowDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_currentStageId_fkey" FOREIGN KEY ("currentStageId") REFERENCES "WorkflowStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_startedById_fkey" FOREIGN KEY ("startedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "WorkflowDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowHistory" ADD CONSTRAINT "WorkflowHistory_fromStageId_fkey" FOREIGN KEY ("fromStageId") REFERENCES "WorkflowStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowHistory" ADD CONSTRAINT "WorkflowHistory_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowHistory" ADD CONSTRAINT "WorkflowHistory_toStageId_fkey" FOREIGN KEY ("toStageId") REFERENCES "WorkflowStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowHistory" ADD CONSTRAINT "WorkflowHistory_workflowInstanceId_fkey" FOREIGN KEY ("workflowInstanceId") REFERENCES "WorkflowInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowHistory" ADD CONSTRAINT "WorkflowHistory_workflowTransitionId_fkey" FOREIGN KEY ("workflowTransitionId") REFERENCES "WorkflowTransition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowTransitionAllowedRole" ADD CONSTRAINT "WorkflowTransitionAllowedRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowTransitionAllowedRole" ADD CONSTRAINT "WorkflowTransitionAllowedRole_transitionId_fkey" FOREIGN KEY ("transitionId") REFERENCES "WorkflowTransition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowTransitionAllowedUser" ADD CONSTRAINT "WorkflowTransitionAllowedUser_transitionId_fkey" FOREIGN KEY ("transitionId") REFERENCES "WorkflowTransition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowTransitionAllowedUser" ADD CONSTRAINT "WorkflowTransitionAllowedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowApproval" ADD CONSTRAINT "WorkflowApproval_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowApproval" ADD CONSTRAINT "WorkflowApproval_transitionId_fkey" FOREIGN KEY ("transitionId") REFERENCES "WorkflowTransition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowApproval" ADD CONSTRAINT "WorkflowApproval_workflowInstanceId_fkey" FOREIGN KEY ("workflowInstanceId") REFERENCES "WorkflowInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_masterRecordId_fkey" FOREIGN KEY ("masterRecordId") REFERENCES "MasterRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "WorkflowStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workflowInstanceId_fkey" FOREIGN KEY ("workflowInstanceId") REFERENCES "WorkflowInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_masterRecordId_fkey" FOREIGN KEY ("masterRecordId") REFERENCES "MasterRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationBatch" ADD CONSTRAINT "NotificationBatch_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationDelivery" ADD CONSTRAINT "NotificationDelivery_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "NotificationBatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationDelivery" ADD CONSTRAINT "NotificationDelivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
