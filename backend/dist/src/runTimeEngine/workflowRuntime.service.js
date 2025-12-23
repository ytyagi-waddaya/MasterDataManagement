/* ============================================================
   TYPES
============================================================ */
import { HistoryAction } from "../../prisma/generated/client.js";
import { BadRequestException, ForbiddenException, } from "../utils/appError.js";
async function enforceTransitionPermission(userId, transition, tx) {
    if (transition.allowedUsers.length === 0 &&
        transition.allowedRoles.length === 0) {
        return;
    }
    if (transition.allowedUsers.some((u) => u.userId === userId)) {
        return;
    }
    const userRoles = await tx.userRole.findMany({
        where: { userId },
        select: { roleId: true },
    });
    const roleIds = userRoles.map((r) => r.roleId);
    const allowedRoleIds = transition.allowedRoles.map((r) => r.roleId);
    if (!roleIds.some((r) => allowedRoleIds.includes(r))) {
        throw new ForbiddenException("Not allowed to perform this transition");
    }
}
/* ============================================================
   APPROVAL HANDLING
============================================================ */
async function handleApprovalTransition({ tx, instance, transition, input, actorId, }) {
    if (!input.action)
        throw new BadRequestException("Approval action required");
    const config = transition.approvalConfig;
    if (!config)
        throw new BadRequestException("approvalConfig missing");
    let approvalMeta = instance.approvalMeta ?? initializeApprovalMeta(config);
    if (input.action === "REJECT" || input.action === "SEND_BACK") {
        await handleApprovalReject({
            tx,
            instance,
            transition,
            approvalMeta,
            actorId,
            comment: input.comment,
        });
        return instance;
    }
    let completed = false;
    if (config.mode === "SEQUENTIAL") {
        completed = await handleSequentialApproval({
            tx,
            instance,
            approvalMeta,
            actorId,
            comment: input.comment,
        });
    }
    if (config.mode === "PARALLEL") {
        completed = await handleParallelApproval({
            tx,
            instance,
            approvalMeta,
            actorId,
            comment: input.comment,
        });
    }
    if (completed) {
        await moveToNextStage({
            tx,
            instance,
            transition,
            actorId,
            comment: input.comment,
        });
    }
    return instance;
}
/* ============================================================
   APPROVAL META INITIALIZER
============================================================ */
function initializeApprovalMeta(config) {
    if (config.mode === "SEQUENTIAL") {
        return {
            mode: "SEQUENTIAL",
            currentLevel: 0,
            approvals: config.levels.map((_, i) => ({
                level: i,
                status: "PENDING",
                userId: null,
            })),
        };
    }
    if (config.mode === "PARALLEL") {
        return {
            mode: "PARALLEL",
            strategy: config.strategy ?? "ALL",
            approvals: config.approvers.map((a) => ({
                userId: a.userId ?? null,
                roleId: a.roleId ?? null,
                status: "PENDING",
            })),
        };
    }
    throw new BadRequestException("Invalid approval config");
}
/* ============================================================
   SEQUENTIAL APPROVAL
============================================================ */
async function handleSequentialApproval({ tx, instance, approvalMeta, actorId, comment, }) {
    const level = approvalMeta.currentLevel;
    const current = approvalMeta.approvals[level];
    if (!current || current.status !== "PENDING") {
        throw new ForbiddenException("Approval already completed");
    }
    current.status = "APPROVED";
    current.userId = actorId;
    current.at = new Date();
    approvalMeta.currentLevel++;
    const completed = approvalMeta.currentLevel >= approvalMeta.approvals.length;
    await persistApproval(tx, instance.id, approvalMeta, actorId, comment);
    return completed;
}
/* ============================================================
   PARALLEL APPROVAL
============================================================ */
async function handleParallelApproval({ tx, instance, approvalMeta, actorId, comment, }) {
    const entry = approvalMeta.approvals.find((a) => a.userId === actorId || a.roleId);
    if (!entry) {
        throw new ForbiddenException("You are not an approver");
    }
    if (entry.status === "APPROVED") {
        throw new ForbiddenException("Already approved");
    }
    entry.status = "APPROVED";
    entry.at = new Date();
    const approvedCount = approvalMeta.approvals.filter((a) => a.status === "APPROVED").length;
    const completed = approvalMeta.strategy === "ANY"
        ? approvedCount >= 1
        : approvedCount === approvalMeta.approvals.length;
    await persistApproval(tx, instance.id, approvalMeta, actorId, comment);
    return completed;
}
/* ============================================================
   REJECT / SEND BACK
============================================================ */
async function handleApprovalReject({ tx, instance, approvalMeta, actorId, comment, }) {
    await tx.workflowInstance.update({
        where: { id: instance.id },
        data: {
            approvalStatus: "REJECTED",
            approvalMeta,
        },
    });
    await tx.workflowHistory.create({
        data: {
            workflowInstanceId: instance.id,
            performedById: actorId,
            actionType: HistoryAction.REJECTED,
            actionLabel: "rejected",
            notes: comment ?? null,
            metadata: approvalMeta,
        },
    });
    throw new BadRequestException("Approval rejected");
}
/* ============================================================
   MOVE TO NEXT STAGE
============================================================ */
async function moveToNextStage({ tx, instance, transition, actorId, comment, }) {
    await tx.workflowInstance.update({
        where: { id: instance.id },
        data: {
            currentStageId: transition.toStageId,
            approvalStatus: null,
            approvalMeta: null,
        },
    });
    await tx.masterRecord.update({
        where: { id: instance.resourceId },
        data: {
            currentStageId: transition.toStageId,
        },
    });
    await tx.workflowHistory.create({
        data: {
            workflowInstanceId: instance.id,
            fromStageId: transition.fromStageId,
            toStageId: transition.toStageId,
            workflowTransitionId: transition.id,
            performedById: actorId,
            actionType: HistoryAction.TRANSITION,
            actionLabel: transition.label ?? "transition",
            notes: comment ?? null,
        },
    });
}
/* ============================================================
   CONDITION (EXTENDABLE)
============================================================ */
function evaluateCondition(condition, resourceId) {
    // Plug rule engine / expression evaluator later
    return true;
}
/* ============================================================
   PERSIST APPROVAL STATE
============================================================ */
async function persistApproval(tx, instance, approvalMeta, actorId, comment) {
    /* -------------------------------
     * UPDATE INSTANCE APPROVAL STATE
     * ----------------------------- */
    await tx.workflowInstance.update({
        where: { id: instance.id },
        data: {
            approvalMeta,
            approvalStatus: "PENDING",
        },
    });
    /* -------------------------------
     * WRITE APPROVAL HISTORY
     * ----------------------------- */
    await tx.workflowHistory.create({
        data: {
            workflowInstanceId: instance.id,
            // 👇 CRITICAL FIX
            toStageId: instance.currentStageId,
            performedById: actorId,
            actionType: HistoryAction.APPROVED,
            actionLabel: "approved",
            notes: comment ?? null,
            metadata: approvalMeta,
        },
    });
}
//# sourceMappingURL=workflowRuntime.service.js.map