import { prisma } from "../lib/prisma.js";
import { WorkflowInstanceStatus, HistoryAction, TransitionType, } from "../../prisma/generated/client.js";
import { BadRequestException, ForbiddenException, NotFoundException, } from "../utils/appError.js";
import { enforceTransitionPermission, getCurrentApprovalLevel, resolveApprovalStrategy, } from "./workflow.helpers.js";
/* ======================================================
   SERVICE
====================================================== */
class WorkflowRuntimeService {
    /* ======================================================
       START INSTANCE
    ====================================================== */
    async startInstance(workflowId, payload, meta) {
        return prisma.$transaction(async (tx) => {
            const workflow = await tx.workflowDefinition.findUnique({
                where: { id: workflowId },
                include: { stages: true },
            });
            if (!workflow)
                throw new NotFoundException("Workflow not found");
            const initialStage = workflow.stages.find((s) => s.isInitial);
            if (!initialStage) {
                throw new BadRequestException("Workflow has no initial stage");
            }
            const instance = await tx.workflowInstance.create({
                data: {
                    workflowId,
                    resourceType: payload.resourceType,
                    resourceId: payload.resourceId,
                    currentStageId: initialStage.id,
                    status: WorkflowInstanceStatus.RUNNING,
                    startedById: meta.actorId,
                },
            });
            await tx.masterRecord.update({
                where: { id: payload.resourceId },
                data: { currentStageId: initialStage.id },
            });
            await tx.workflowHistory.create({
                data: {
                    workflowInstanceId: instance.id,
                    fromStageId: null,
                    toStageId: initialStage.id,
                    actionType: HistoryAction.TRANSITION,
                    actionLabel: "Workflow Started",
                    performedById: meta.actorId,
                },
            });
            return instance;
        });
    }
    /* ======================================================
       EXECUTE TRANSITION
    ====================================================== */
    async executeTransition(instanceId, input, meta) {
        const userId = meta.actorId;
        if (!userId)
            throw new ForbiddenException("Not authenticated");
        return prisma.$transaction(async (tx) => {
            const instance = await tx.workflowInstance.findUnique({
                where: { id: instanceId },
                include: {
                    workflow: {
                        include: {
                            transitions: {
                                include: { allowedRoles: true, allowedUsers: true },
                            },
                        },
                    },
                    currentStage: true,
                },
            });
            if (!instance)
                throw new NotFoundException("Instance not found");
            if (instance.status !== WorkflowInstanceStatus.RUNNING) {
                throw new BadRequestException("Workflow is not active");
            }
            if (!instance.currentStageId) {
                throw new BadRequestException("Workflow has no current stage");
            }
            const transition = instance.workflow.transitions.find((t) => t.id === input.transitionId);
            if (!transition) {
                throw new BadRequestException("Invalid transition");
            }
            if (transition.fromStageId !== instance.currentStageId) {
                throw new BadRequestException("Transition not allowed from this stage");
            }
            await enforceTransitionPermission(userId, instance, transition, tx);
            /* ---------- APPROVAL ---------- */
            if (transition.transitionType === TransitionType.APPROVAL) {
                if (input.action === "APPROVE") {
                    return this.resolveApproval(instance, transition, true, meta);
                }
                if (input.action === "REJECT") {
                    return this.resolveApproval(instance, transition, false, meta);
                }
                throw new BadRequestException("Invalid approval action");
            }
            /* ---------- SEND BACK ---------- */
            if (transition.transitionType === TransitionType.SEND_BACK) {
                return sendBack(tx, instance, transition, meta, input.comment);
            }
            /* ---------- NORMAL / REVIEW ---------- */
            await moveToStage(tx, instance, transition, meta, input.comment);
            return { status: "MOVED" };
        });
    }
    /* ======================================================
       GET AVAILABLE ACTIONS
    ====================================================== */
    async getAvailableActions(instanceId, userId) {
        const instance = await prisma.workflowInstance.findUnique({
            where: { id: instanceId },
            include: {
                currentStage: {
                    include: {
                        outgoingTransitions: {
                            include: { allowedRoles: true, allowedUsers: true },
                        },
                    },
                },
            },
        });
        if (!instance ||
            instance.status !== WorkflowInstanceStatus.RUNNING ||
            !instance.currentStage) {
            return [];
        }
        const roles = await prisma.userRole.findMany({
            where: { userId },
            select: { roleId: true },
        });
        const roleIds = roles.map((r) => r.roleId);
        return instance.currentStage.outgoingTransitions
            .filter((t) => t.transitionType !== TransitionType.AUTO)
            .filter((t) => t.allowedUsers.some((u) => u.userId === userId) ||
            t.allowedRoles.some((r) => roleIds.includes(r.roleId)) ||
            (t.allowedUsers.length === 0 && t.allowedRoles.length === 0))
            .map((t) => ({
            transitionId: t.id,
            label: t.label ?? "Continue",
            type: t.transitionType,
            actions: t.transitionType === TransitionType.APPROVAL
                ? ["APPROVE", "REJECT"]
                : ["EXECUTE"],
        }));
    }
    /* ======================================================
       INTERNAL — APPROVAL
    ====================================================== */
    async resolveApproval(instance, transition, approved, meta) {
        return prisma.$transaction(async (tx) => {
            const actorId = meta.actorId;
            const config = transition.approvalConfig;
            const mode = config.mode;
            /* Determine current level */
            let level;
            if (mode === "SEQUENTIAL") {
                const approvals = await tx.workflowApproval.findMany({
                    where: {
                        workflowInstanceId: instance.id,
                        transitionId: transition.id,
                    },
                });
                level = getCurrentApprovalLevel(config, approvals);
                if (!level) {
                    throw new BadRequestException("Approval already completed");
                }
            }
            else {
                level = config.levels[0];
            }
            /* Validate approver */
            const isUserAllowed = level.userIds?.includes(actorId) ||
                (await tx.userRole.count({
                    where: {
                        userId: actorId,
                        roleId: { in: level.roleIds ?? [] },
                    },
                })) > 0;
            if (!isUserAllowed) {
                throw new ForbiddenException("Not an approver for this level");
            }
            /* Save approval */
            await tx.workflowApproval.upsert({
                where: {
                    workflowInstanceId_transitionId_approverId: {
                        workflowInstanceId: instance.id,
                        transitionId: transition.id,
                        approverId: actorId,
                    },
                },
                update: {
                    status: approved ? "APPROVED" : "REJECTED",
                    decidedAt: new Date(),
                },
                create: {
                    workflowInstanceId: instance.id,
                    transitionId: transition.id,
                    approverId: actorId,
                    levelOrder: level.order ?? null,
                    status: approved ? "APPROVED" : "REJECTED",
                    decidedAt: new Date(),
                },
            });
            const approvals = await tx.workflowApproval.findMany({
                where: {
                    workflowInstanceId: instance.id,
                    transitionId: transition.id,
                },
            });
            const expectedCount = (level.userIds?.length ?? 0) + (level.roleIds?.length ?? 0);
            const outcome = resolveApprovalStrategy(transition.approvalStrategy, approvals.filter((a) => a.levelOrder === level.order), expectedCount);
            if (outcome === "APPROVED") {
                await moveToStage(tx, instance, transition, meta);
                return { status: "APPROVED" };
            }
            if (outcome === "REJECTED") {
                return { status: "REJECTED" };
            }
            return { status: "PENDING" };
        });
    }
}
/* ======================================================
   HELPERS
====================================================== */
async function sendBack(tx, instance, transition, meta, comment) {
    await tx.workflowInstance.update({
        where: { id: instance.id },
        data: { currentStageId: transition.toStageId },
    });
    await tx.workflowHistory.create({
        data: {
            workflowInstanceId: instance.id,
            fromStageId: instance.currentStageId,
            toStageId: transition.toStageId,
            workflowTransitionId: transition.id,
            actionType: HistoryAction.SENT_BACK,
            performedById: meta.actorId,
            notes: comment ?? null,
        },
    });
    return { status: "SENT_BACK" };
}
async function moveToStage(tx, instance, transition, meta, comment) {
    const targetStage = await tx.workflowStage.findUnique({
        where: { id: transition.toStageId },
    });
    const isFinal = Boolean(targetStage?.isFinal);
    await tx.workflowInstance.update({
        where: { id: instance.id },
        data: {
            currentStageId: transition.toStageId,
            status: isFinal
                ? WorkflowInstanceStatus.COMPLETED
                : WorkflowInstanceStatus.RUNNING,
            endedAt: isFinal ? new Date() : null,
        },
    });
    await tx.masterRecord.update({
        where: { id: instance.resourceId },
        data: { currentStageId: transition.toStageId },
    });
    await tx.workflowHistory.create({
        data: {
            workflowInstanceId: instance.id,
            fromStageId: transition.fromStageId,
            toStageId: transition.toStageId,
            workflowTransitionId: transition.id,
            actionType: HistoryAction.TRANSITION,
            actionLabel: transition.label ?? "Transition",
            performedById: meta.actorId,
            notes: comment ?? null,
        },
    });
}
export default new WorkflowRuntimeService();
//# sourceMappingURL=workflowRuntime.service.js.map