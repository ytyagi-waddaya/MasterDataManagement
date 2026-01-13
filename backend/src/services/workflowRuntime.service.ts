// // import { prisma } from "../lib/prisma.js";
// // import {
// //   WorkflowInstanceStatus,
// //   HistoryAction,
// //   TransitionType,
// //   Prisma,
// // } from "../../prisma/generated/client.js";

// // import {
// //   BadRequestException,
// //   ForbiddenException,
// //   NotFoundException,
// // } from "../utils/appError.js";

// // import {
// //   enforceTransitionPermission,
// //   getCurrentApprovalLevel,
// //   resolveApprovalStrategy,
// // } from "./workflow.helpers.js";

// // /* ======================================================
// //    TYPES
// // ====================================================== */

// // export type ActorMeta = {
// //   actorId: string | null;
// //   ipAddress: string | null;
// //   userAgent: string | null;
// //   performedBy?: "USER" | "WORKER" | "SYSTEM";
// // };

// // type TransitionInput = {
// //   transitionId: string;
// //   action?: "APPROVE" | "REJECT" | "SEND_BACK" | "EXECUTE";
// //   comment?: string;
// // };

// // /* ======================================================
// //    SERVICE
// // ====================================================== */

// // class WorkflowRuntimeService {
// //   /* ======================================================
// //      START INSTANCE
// //   ====================================================== */
// //   async startInstance(
// //     workflowId: string,
// //     payload: { resourceType: string; resourceId: string },
// //     meta: ActorMeta
// //   ) {
// //     return prisma.$transaction(async (tx) => {
// //       const existing = await tx.workflowInstance.findFirst({
// //         where: {
// //           workflowId,
// //           resourceId: payload.resourceId,
// //           status: {
// //             notIn: [
// //               WorkflowInstanceStatus.CANCELLED,
// //               WorkflowInstanceStatus.COMPLETED,
// //             ],
// //           },
// //         },
// //       });

// //       if (existing) {
// //         throw new BadRequestException(
// //           "Workflow already started for this record"
// //         );
// //       }
// //       const workflow = await tx.workflowDefinition.findUnique({
// //         where: { id: workflowId },
// //         include: { stages: true },
// //       });

// //       if (!workflow) throw new NotFoundException("Workflow not found");

// //       const initialStage = workflow.stages.find((s) => s.isInitial);
// //       if (!initialStage) {
// //         throw new BadRequestException("Workflow has no initial stage");
// //       }

// //       const instance = await tx.workflowInstance.create({
// //         data: {
// //           workflowId,
// //           resourceType: payload.resourceType,
// //           resourceId: payload.resourceId,
// //           currentStageId: initialStage.id,
// //           status: WorkflowInstanceStatus.RUNNING,
// //           startedById: meta.actorId,
// //         },
// //       });

// //       // await tx.masterRecord.update({
// //       //   where: { id: payload.resourceId },
// //       //   data: { currentStageId: initialStage.id },
// //       // });

// //       if (payload.resourceType === "MASTER_RECORD") {
// //         await tx.masterRecord.update({
// //           where: { id: payload.resourceId },
// //           data: { currentStageId: initialStage.id },
// //         });
// //       }

// //       await tx.workflowHistory.create({
// //         data: {
// //           workflowInstanceId: instance.id,
// //           fromStageId: null,
// //           toStageId: initialStage.id,
// //           actionType: HistoryAction.TRANSITION,
// //           actionLabel: "Workflow Started",
// //           performedById: meta.actorId,
// //         },
// //       });

// //       return instance;
// //     });
// //   }

// //   /* ======================================================
// //      EXECUTE TRANSITION
// //   ====================================================== */
// //   async executeTransition(
// //     instanceId: string,
// //     input: TransitionInput,
// //     meta: ActorMeta
// //   ) {
// //     const userId = meta.actorId;
// //     if (!userId) throw new ForbiddenException("Not authenticated");

// //     return prisma.$transaction(async (tx) => {
// //       // const instance = await tx.workflowInstance.findUnique({
// //       //   where: { id: instanceId },
// //       //   include: {
// //       //     workflow: {
// //       //       include: {
// //       //         transitions: {
// //       //           include: { allowedRoles: true, allowedUsers: true },
// //       //         },
// //       //       },
// //       //     },
// //       //     currentStage: true,
// //       //   },
// //       // });
// //       const instance = await tx.workflowInstance.findUnique({
// //         where: { id: instanceId },
// //         include: {
// //           workflow: {
// //             include: {
// //               transitions: {
// //                 include: { allowedRoles: true, allowedUsers: true },
// //               },
// //             },
// //           },
// //           currentStage: true,
// //         },
// //       });

// //       if (!instance) throw new NotFoundException("Instance not found");

// //       if (instance.status !== WorkflowInstanceStatus.RUNNING) {
// //         throw new BadRequestException("Workflow is not active");
// //       }

// //       if (!instance.currentStageId || !instance.currentStage) {
// //         throw new BadRequestException("Workflow has no current stage");
// //       }

// //       /* ----------------------------------------
// //         LOAD RECORD (only if resource is record)
// //       ---------------------------------------- */
// //       let record: { createdById?: string | null } | null = null;

// //       if (instance.resourceType === "MASTER_RECORD") {
// //         record = await tx.masterRecord.findUnique({
// //           where: { id: instance.resourceId },
// //           select: { createdById: true },
// //         });
// //       }

// //       /* ======================================================
// //             LOCK INSTANCE
// //           ====================================================== */

// //       try {
// //         const transition = instance.workflow.transitions.find(
// //           (t) => t.id === input.transitionId
// //         );

// //         if (!transition) {
// //           throw new BadRequestException("Invalid transition");
// //         }

// //         if (transition.fromStageId !== instance.currentStageId) {
// //           throw new BadRequestException(
// //             "Transition not allowed from this stage"
// //           );
// //         }

// //         // await enforceTransitionPermission(userId, instance, transition, tx);
// //         await enforceTransitionPermission(
// //           userId,
// //           instance,
// //           record, // 👈 NEW
// //           transition,
// //           tx
// //         );

// //         if (instance.lockedAt) {
// //           throw new BadRequestException("Workflow instance is locked");
// //         }

// //         await tx.workflowInstance.update({
// //           where: { id: instance.id },
// //           data: {
// //             lockedAt: new Date(),
// //             lockedBy: userId,
// //           },
// //         });

// //         /* ---------- APPROVAL ---------- */
// //         if (transition.transitionType === TransitionType.APPROVAL) {
// //           if (input.action === "APPROVE") {
// //             return await this.resolveApproval(instance, transition, true, meta);
// //           }

// //           if (input.action === "REJECT") {
// //             return await this.resolveApproval(
// //               instance,
// //               transition,
// //               false,
// //               meta
// //             );
// //           }

// //           throw new BadRequestException("Invalid approval action");
// //         }

// //         /* ---------- SEND BACK ---------- */
// //         if (transition.transitionType === TransitionType.SEND_BACK) {
// //           return await sendBack(tx, instance, transition, meta, input.comment);
// //         }

// //         /* ======================================================
// //          ✅ NULL-SAFE CURRENT STAGE
// //       ====================================================== */
// //         const fromStage = instance.currentStage;
// //         if (!fromStage) {
// //           throw new BadRequestException("Workflow has no current stage");
// //         }

// //         const toStage = await tx.workflowStage.findUnique({
// //           where: { id: transition.toStageId },
// //         });

// //         if (!toStage) {
// //           throw new BadRequestException("Target stage not found");
// //         }

// //         /* ------------------------------------
// //          CATEGORY CONSTRAINT CHECK
// //       ------------------------------------ */
// //         if (
// //           fromStage.allowedNextCategories?.length &&
// //           !fromStage.allowedNextCategories.includes(toStage.category)
// //         ) {
// //           throw new BadRequestException(
// //             `Cannot move from ${fromStage.category} to ${toStage.category}`
// //           );
// //         }

// //         /* ---------- NORMAL / REVIEW ---------- */
// //         await moveToStage(tx, instance, transition, meta, input.comment);

// //         /* ---------- AUTO TRANSITIONS ---------- */
// //         await runAutoTransitions(tx, instance.id);

// //         return { status: "MOVED" };
// //       } finally {
// //         /* ======================================================
// //          UNLOCK INSTANCE (ALWAYS)
// //       ====================================================== */
// //         await tx.workflowInstance.update({
// //           where: { id: instance.id },
// //           data: {
// //             lockedAt: null,
// //             lockedBy: null,
// //           },
// //         });
// //       }
// //     });
// //   }

// //   /* ======================================================
// //      GET AVAILABLE ACTIONS
// //   ====================================================== */
// //   async getAvailableActions(instanceId: string, userId: string) {
// //     const instance = await prisma.workflowInstance.findUnique({
// //       where: { id: instanceId },
// //       include: {
// //         currentStage: {
// //           include: {
// //             outgoingTransitions: {
// //               include: { allowedRoles: true, allowedUsers: true },
// //             },
// //           },
// //         },
// //       },
// //     });

// //     if (
// //       !instance ||
// //       instance.status !== WorkflowInstanceStatus.RUNNING ||
// //       !instance.currentStage
// //     ) {
// //       return [];
// //     }

// //     const roles = await prisma.userRole.findMany({
// //       where: { userId },
// //       select: { roleId: true },
// //     });

// //     const roleIds = roles.map((r) => r.roleId);

// //     return instance.currentStage.outgoingTransitions
// //       .filter((t) => t.transitionType !== TransitionType.AUTO)
// //       .filter(
// //         (t) =>
// //           t.allowedUsers.some((u) => u.userId === userId) ||
// //           t.allowedRoles.some((r) => roleIds.includes(r.roleId)) ||
// //           (t.allowedUsers.length === 0 && t.allowedRoles.length === 0)
// //       )
// //       .map((t) => ({
// //         transitionId: t.id,
// //         label: t.label ?? "Continue",
// //         type: t.transitionType,
// //         actions:
// //           t.transitionType === TransitionType.APPROVAL
// //             ? ["APPROVE", "REJECT"]
// //             : ["EXECUTE"],
// //       }));
// //   }

// //   /* ======================================================
// //      INTERNAL — APPROVAL
// //   ====================================================== */
// //   private async resolveApproval(
// //     instance: any,
// //     transition: any,
// //     approved: boolean,
// //     meta: ActorMeta
// //   ) {
// //     return prisma.$transaction(async (tx) => {
// //       const actorId = meta.actorId!;
// //       const config = transition.approvalConfig;
// //       const mode = config.mode;

// //       /* Determine current level */
// //       let level;

// //       if (mode === "SEQUENTIAL") {
// //         const approvals = await tx.workflowApproval.findMany({
// //           where: {
// //             workflowInstanceId: instance.id,
// //             transitionId: transition.id,
// //           },
// //         });

// //         level = getCurrentApprovalLevel(config, approvals);
// //         if (!level) {
// //           throw new BadRequestException("Approval already completed");
// //         }
// //       } else {
// //         level = config.levels[0];
// //       }

// //       /* Validate approver */
// //       const isUserAllowed =
// //         level.userIds?.includes(actorId) ||
// //         (await tx.userRole.count({
// //           where: {
// //             userId: actorId,
// //             roleId: { in: level.roleIds ?? [] },
// //           },
// //         })) > 0;

// //       if (!isUserAllowed) {
// //         throw new ForbiddenException("Not an approver for this level");
// //       }

// //       /* Save approval */
// //       await tx.workflowApproval.upsert({
// //         where: {
// //           workflowInstanceId_transitionId_approverId: {
// //             workflowInstanceId: instance.id,
// //             transitionId: transition.id,
// //             approverId: actorId,
// //           },
// //         },
// //         update: {
// //           status: approved ? "APPROVED" : "REJECTED",
// //           decidedAt: new Date(),
// //         },
// //         create: {
// //           workflowInstanceId: instance.id,
// //           transitionId: transition.id,
// //           approverId: actorId,
// //           levelOrder: level.order ?? null,
// //           status: approved ? "APPROVED" : "REJECTED",
// //           decidedAt: new Date(),
// //         },
// //       });

// //       const approvals = await tx.workflowApproval.findMany({
// //         where: {
// //           workflowInstanceId: instance.id,
// //           transitionId: transition.id,
// //         },
// //       });

// //       const expectedCount =
// //         (level.userIds?.length ?? 0) + (level.roleIds?.length ?? 0);

// //       const outcome = resolveApprovalStrategy(
// //         transition.approvalStrategy,
// //         approvals.filter((a) => a.levelOrder === level.order),
// //         expectedCount
// //       );

// //       if (outcome === "APPROVED") {
// //         await moveToStage(tx, instance, transition, meta);
// //         return { status: "APPROVED" };
// //       }

// //       if (outcome === "REJECTED") {
// //         return { status: "REJECTED" };
// //       }

// //       return { status: "PENDING" };
// //     });
// //   }
// // }

// // /* ======================================================
// //    HELPERS
// // ====================================================== */

// // async function sendBack(
// //   tx: any,
// //   instance: any,
// //   transition: any,
// //   meta: ActorMeta,
// //   comment?: string
// // ) {
// //   await tx.workflowInstance.update({
// //     where: { id: instance.id },
// //     data: { currentStageId: transition.toStageId },
// //   });

// //   await tx.workflowHistory.create({
// //     data: {
// //       workflowInstanceId: instance.id,
// //       fromStageId: instance.currentStageId,
// //       toStageId: transition.toStageId,
// //       workflowTransitionId: transition.id,
// //       actionType: HistoryAction.SENT_BACK,
// //       performedById: meta.actorId,
// //       notes: comment ?? null,
// //     },
// //   });

// //   return { status: "SENT_BACK" };
// // }

// // async function moveToStage(
// //   tx: any,
// //   instance: any,
// //   transition: any,
// //   meta: ActorMeta,
// //   comment?: string
// // ) {
// //   const targetStage = await tx.workflowStage.findUnique({
// //     where: { id: transition.toStageId },
// //   });

// //   const isFinal = Boolean(targetStage?.isFinal);

// //   await tx.workflowInstance.update({
// //     where: { id: instance.id },
// //     data: {
// //       currentStageId: transition.toStageId,
// //       status: isFinal
// //         ? WorkflowInstanceStatus.COMPLETED
// //         : WorkflowInstanceStatus.RUNNING,
// //       endedAt: isFinal ? new Date() : null,
// //     },
// //   });

// //   await tx.masterRecord.update({
// //     where: { id: instance.resourceId },
// //     data: { currentStageId: transition.toStageId },
// //   });

// //   await tx.workflowHistory.create({
// //     data: {
// //       workflowInstanceId: instance.id,
// //       fromStageId: transition.fromStageId,
// //       toStageId: transition.toStageId,
// //       workflowTransitionId: transition.id,
// //       actionType: HistoryAction.TRANSITION,
// //       actionLabel: transition.label ?? "Transition",
// //       performedById: meta.actorId,
// //       notes: comment ?? null,
// //     },
// //   });
// // }

// // async function runAutoTransitions(
// //   tx: Prisma.TransactionClient,
// //   instanceId: string
// // ) {
// //   while (true) {
// //     const instance = await tx.workflowInstance.findUnique({
// //       where: { id: instanceId },
// //       include: {
// //         currentStage: {
// //           include: { outgoingTransitions: true },
// //         },
// //       },
// //     });

// //     const auto = instance?.currentStage?.outgoingTransitions.find(
// //       (t) => t.transitionType === "AUTO"
// //     );

// //     if (!auto) break;

// //     await moveToStage(tx, instance, auto, {
// //       actorId: null,
// //       performedBy: "SYSTEM",
// //       ipAddress: null,
// //       userAgent: null,
// //     });
// //   }
// // }

// // export default new WorkflowRuntimeService();

// import { prisma } from "../lib/prisma.js";
// import {
//   WorkflowInstanceStatus,
//   HistoryAction,
//   TransitionType,
//   Prisma,
// } from "../../prisma/generated/client.js";

// import {
//   BadRequestException,
//   ForbiddenException,
//   NotFoundException,
// } from "../utils/appError.js";

// import {
//   enforceTransitionPermission,
//   getCurrentApprovalLevel,
//   resolveApprovalStrategy,
// } from "./workflow.helpers.js";

// /* ======================================================
//    TYPES
// ====================================================== */

// export type ActorMeta = {
//   actorId: string | null;
//   ipAddress: string | null;
//   userAgent: string | null;
//   performedBy?: "USER" | "WORKER" | "SYSTEM";
// };

// type TransitionInput = {
//   transitionId: string;
//   action?: "APPROVE" | "REJECT" | "SEND_BACK" | "EXECUTE";
//   comment?: string;
// };

// /* ======================================================
//    SERVICE
// ====================================================== */

// class WorkflowRuntimeService {
//   /* ======================================================
//      START INSTANCE
//   ====================================================== */
//   async startInstance(
//     workflowId: string,
//     payload: { resourceType: string; resourceId: string },
//     meta: ActorMeta
//   ) {
//     return prisma.$transaction(async (tx) => {
//       const existing = await tx.workflowInstance.findFirst({
//         where: {
//           workflowId,
//           resourceId: payload.resourceId,
//           status: {
//             notIn: [
//               WorkflowInstanceStatus.CANCELLED,
//               WorkflowInstanceStatus.COMPLETED,
//             ],
//           },
//         },
//       });

//       if (existing) {
//         throw new BadRequestException(
//           "Workflow already started for this resource"
//         );
//       }

//       const workflow = await tx.workflowDefinition.findUnique({
//         where: { id: workflowId },
//         include: { stages: true },
//       });

//       if (!workflow) throw new NotFoundException("Workflow not found");

//       const initialStage = workflow.stages.find((s) => s.isInitial);
//       if (!initialStage)
//         throw new BadRequestException("Workflow has no initial stage");

//       const instance = await tx.workflowInstance.create({
//         data: {
//           workflowId,
//           resourceType: payload.resourceType,
//           resourceId: payload.resourceId,
//           currentStageId: initialStage.id,
//           status: WorkflowInstanceStatus.RUNNING,
//           startedById: meta.actorId,
//         },
//       });

//       // update resource only if record
//       if (payload.resourceType === "MASTER_RECORD") {
//         await tx.masterRecord.update({
//           where: { id: payload.resourceId },
//           data: { currentStageId: initialStage.id },
//         });
//       }

//       await tx.workflowHistory.create({
//         data: {
//           workflowInstanceId: instance.id,
//           fromStageId: null,
//           toStageId: initialStage.id,
//           actionType: HistoryAction.TRANSITION,
//           actionLabel: "Workflow Started",
//           performedById: meta.actorId,
//         },
//       });

//       return instance;
//     });
//   }

//   /* ======================================================
//      EXECUTE TRANSITION
//   ====================================================== */
//   async executeTransition(
//     instanceId: string,
//     input: TransitionInput,
//     meta: ActorMeta
//   ) {
//     const userId = meta.actorId;
//     if (!userId) throw new ForbiddenException("Not authenticated");

//     return prisma.$transaction(async (tx) => {
//       /* --------------------------------------------------
//          LOAD INSTANCE
//       -------------------------------------------------- */
//       const instance = await tx.workflowInstance.findUnique({
//         where: { id: instanceId },
//         include: {
//           workflow: {
//             include: {
//               transitions: {
//                 include: { allowedRoles: true, allowedUsers: true },
//               },
//             },
//           },
//           currentStage: true,
//         },
//       });

//       if (!instance) throw new NotFoundException("Instance not found");

//       if (instance.status !== WorkflowInstanceStatus.RUNNING) {
//         throw new BadRequestException("Workflow is not active");
//       }

//       if (!instance.currentStageId || !instance.currentStage) {
//         throw new BadRequestException("Workflow has no current stage");
//       }

//       /* --------------------------------------------------
//          LOAD RECORD (only if needed)
//       -------------------------------------------------- */
//       let record: { createdById?: string | null } | null = null;

//       if (instance.resourceType === "MASTER_RECORD") {
//         record = await tx.masterRecord.findUnique({
//           where: { id: instance.resourceId },
//           select: { createdById: true },
//         });
//       }

//       /* --------------------------------------------------
//          FIND TRANSITION
//       -------------------------------------------------- */
//       const transition = instance.workflow.transitions.find(
//         (t) => t.id === input.transitionId
//       );

//       if (!transition) {
//         throw new BadRequestException("Invalid transition");
//       }

//       if (transition.fromStageId !== instance.currentStageId) {
//         throw new BadRequestException(
//           "Transition not allowed from this stage"
//         );
//       }

//       /* --------------------------------------------------
//          PERMISSION CHECK (NO SIDE EFFECTS YET)
//       -------------------------------------------------- */
//       await enforceTransitionPermission(
//         userId,
//         instance,
//         record,
//         transition,
//         tx
//       );

//       /* --------------------------------------------------
//          LOCK INSTANCE
//       -------------------------------------------------- */
//       if (instance.lockedAt) {
//         throw new BadRequestException("Workflow instance is locked");
//       }

//       await tx.workflowInstance.update({
//         where: { id: instance.id },
//         data: {
//           lockedAt: new Date(),
//           lockedBy: userId,
//         },
//       });

//       try {
//         /* ======================================================
//            APPROVAL TRANSITION
//         ====================================================== */
//         if (transition.transitionType === TransitionType.APPROVAL) {
//           if (input.action === "APPROVE") {
//             return await this.resolveApproval(instance, transition, true, meta);
//           }

//           if (input.action === "REJECT") {
//             return await this.resolveApproval(instance, transition, false, meta);
//           }

//           throw new BadRequestException("Invalid approval action");
//         }

//         /* ======================================================
//            SEND BACK
//         ====================================================== */
//         if (transition.transitionType === TransitionType.SEND_BACK) {
//           return await sendBack(tx, instance, transition, meta, input.comment);
//         }

//         /* ======================================================
//            CATEGORY CHECK
//         ====================================================== */
//         const fromStage = instance.currentStage;

//         const toStage = await tx.workflowStage.findUnique({
//           where: { id: transition.toStageId },
//         });

//         if (!toStage) {
//           throw new BadRequestException("Target stage not found");
//         }

//         if (
//           fromStage.allowedNextCategories?.length &&
//           !fromStage.allowedNextCategories.includes(toStage.category)
//         ) {
//           throw new BadRequestException(
//             `Cannot move from ${fromStage.category} to ${toStage.category}`
//           );
//         }

//         /* ======================================================
//            NORMAL TRANSITION
//         ====================================================== */
//         await moveToStage(tx, instance, transition, meta, input.comment);

//         await runAutoTransitions(tx, instance.id);

//         return { status: "MOVED" };
//       } finally {
//         /* --------------------------------------------------
//            UNLOCK (ALWAYS)
//         -------------------------------------------------- */
//         await tx.workflowInstance.update({
//           where: { id: instance.id },
//           data: {
//             lockedAt: null,
//             lockedBy: null,
//           },
//         });
//       }
//     });
//   }

//   /* ======================================================
//      GET AVAILABLE ACTIONS
//   ====================================================== */
//   async getAvailableActions(instanceId: string, userId: string) {
//     const instance = await prisma.workflowInstance.findUnique({
//       where: { id: instanceId },
//       include: {
//         currentStage: {
//           include: {
//             outgoingTransitions: {
//               include: { allowedRoles: true, allowedUsers: true },
//             },
//           },
//         },
//       },
//     });

//     if (
//       !instance ||
//       instance.status !== WorkflowInstanceStatus.RUNNING ||
//       !instance.currentStage
//     ) {
//       return [];
//     }

//     const roles = await prisma.userRole.findMany({
//       where: { userId },
//       select: { roleId: true },
//     });

//     const roleIds = roles.map((r) => r.roleId);

//     return instance.currentStage.outgoingTransitions
//       .filter((t) => t.transitionType !== TransitionType.AUTO)
//       .filter(
//         (t) =>
//           t.allowedUsers.some((u) => u.userId === userId) ||
//           t.allowedRoles.some((r) => roleIds.includes(r.roleId)) ||
//           (t.allowedUsers.length === 0 && t.allowedRoles.length === 0)
//       )
//       .map((t) => ({
//         transitionId: t.id,
//         label: t.label ?? "Continue",
//         type: t.transitionType,
//         actions:
//           t.transitionType === TransitionType.APPROVAL
//             ? ["APPROVE", "REJECT"]
//             : ["EXECUTE"],
//       }));
//   }

//   /* ======================================================
//      INTERNAL — APPROVAL
//   ====================================================== */
//   private async resolveApproval(
//     instance: any,
//     transition: any,
//     approved: boolean,
//     meta: ActorMeta
//   ) {
//     return prisma.$transaction(async (tx) => {
//       const actorId = meta.actorId!;
//       const config = transition.approvalConfig;
//       const mode = config.mode;

//       let level;

//       if (mode === "SEQUENTIAL") {
//         const approvals = await tx.workflowApproval.findMany({
//           where: {
//             workflowInstanceId: instance.id,
//             transitionId: transition.id,
//           },
//         });

//         level = getCurrentApprovalLevel(config, approvals);
//         if (!level) {
//           throw new BadRequestException("Approval already completed");
//         }
//       } else {
//         level = config.levels[0];
//       }

//       const isUserAllowed =
//         level.userIds?.includes(actorId) ||
//         (await tx.userRole.count({
//           where: {
//             userId: actorId,
//             roleId: { in: level.roleIds ?? [] },
//           },
//         })) > 0;

//       if (!isUserAllowed) {
//         throw new ForbiddenException("Not an approver for this level");
//       }

//       await tx.workflowApproval.upsert({
//         where: {
//           workflowInstanceId_transitionId_approverId: {
//             workflowInstanceId: instance.id,
//             transitionId: transition.id,
//             approverId: actorId,
//           },
//         },
//         update: {
//           status: approved ? "APPROVED" : "REJECTED",
//           decidedAt: new Date(),
//         },
//         create: {
//           workflowInstanceId: instance.id,
//           transitionId: transition.id,
//           approverId: actorId,
//           levelOrder: level.order ?? null,
//           status: approved ? "APPROVED" : "REJECTED",
//           decidedAt: new Date(),
//         },
//       });

//       const approvals = await tx.workflowApproval.findMany({
//         where: {
//           workflowInstanceId: instance.id,
//           transitionId: transition.id,
//         },
//       });

//       const expectedCount =
//         (level.userIds?.length ?? 0) + (level.roleIds?.length ?? 0);

//       const outcome = resolveApprovalStrategy(
//         transition.approvalStrategy,
//         approvals.filter((a) => a.levelOrder === level.order),
//         expectedCount
//       );

//       if (outcome === "APPROVED") {
//         await moveToStage(tx, instance, transition, meta);
//         return { status: "APPROVED" };
//       }

//       if (outcome === "REJECTED") {
//         return { status: "REJECTED" };
//       }

//       return { status: "PENDING" };
//     });
//   }
// }

// /* ======================================================
//    HELPERS
// ====================================================== */

// async function sendBack(
//   tx: any,
//   instance: any,
//   transition: any,
//   meta: ActorMeta,
//   comment?: string
// ) {
//   await tx.workflowInstance.update({
//     where: { id: instance.id },
//     data: { currentStageId: transition.toStageId },
//   });

//   await tx.workflowHistory.create({
//     data: {
//       workflowInstanceId: instance.id,
//       fromStageId: instance.currentStageId,
//       toStageId: transition.toStageId,
//       workflowTransitionId: transition.id,
//       actionType: HistoryAction.SENT_BACK,
//       performedById: meta.actorId,
//       notes: comment ?? null,
//     },
//   });

//   return { status: "SENT_BACK" };
// }

// async function moveToStage(
//   tx: any,
//   instance: any,
//   transition: any,
//   meta: ActorMeta,
//   comment?: string
// ) {
//   const targetStage = await tx.workflowStage.findUnique({
//     where: { id: transition.toStageId },
//   });

//   const isFinal = Boolean(targetStage?.isFinal);

//   await tx.workflowInstance.update({
//     where: { id: instance.id },
//     data: {
//       currentStageId: transition.toStageId,
//       status: isFinal
//         ? WorkflowInstanceStatus.COMPLETED
//         : WorkflowInstanceStatus.RUNNING,
//       endedAt: isFinal ? new Date() : null,
//     },
//   });

//   if (instance.resourceType === "MASTER_RECORD") {
//     await tx.masterRecord.update({
//       where: { id: instance.resourceId },
//       data: { currentStageId: transition.toStageId },
//     });
//   }

//   await tx.workflowHistory.create({
//     data: {
//       workflowInstanceId: instance.id,
//       fromStageId: transition.fromStageId,
//       toStageId: transition.toStageId,
//       workflowTransitionId: transition.id,
//       actionType: HistoryAction.TRANSITION,
//       actionLabel: transition.label ?? "Transition",
//       performedById: meta.actorId,
//       notes: comment ?? null,
//     },
//   });
// }

// async function runAutoTransitions(
//   tx: Prisma.TransactionClient,
//   instanceId: string
// ) {
//   while (true) {
//     const instance = await tx.workflowInstance.findUnique({
//       where: { id: instanceId },
//       include: {
//         currentStage: {
//           include: { outgoingTransitions: true },
//         },
//       },
//     });

//     const auto = instance?.currentStage?.outgoingTransitions.find(
//       (t) => t.transitionType === "AUTO"
//     );

//     if (!auto) break;

//     await moveToStage(tx, instance, auto, {
//       actorId: null,
//       performedBy: "SYSTEM",
//       ipAddress: null,
//       userAgent: null,
//     });
//   }
// }

// export default new WorkflowRuntimeService();





 
import { prisma } from "../lib/prisma.js";
import {
  WorkflowInstanceStatus,
  HistoryAction,
  TransitionType,
  Prisma,
} from "../../prisma/generated/client.js";
 
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "../utils/appError.js";
 
import {
  enforceTransitionPermission,
  getCurrentApprovalLevel,
  resolveApprovalStrategy,
} from "./workflow.helpers.js";
 
/* ======================================================
   TYPES
====================================================== */
 
export type ActorMeta = {
  actorId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  performedBy?: "USER" | "WORKER" | "SYSTEM";
};
 
type TransitionInput = {
  transitionId: string;
  action?: "APPROVE" | "REJECT" | "SEND_BACK" | "EXECUTE";
  comment?: string;
};
 
export type ApprovalConfig = {
  mode: "SEQUENTIAL" | "PARALLEL";
  levels: {
    order: number;
    userIds?: string[];
    roleIds?: string[];
  }[];
};
 
/* ======================================================
   TYPE GUARD
====================================================== */
 
function isApprovalConfig(value: any): value is ApprovalConfig {
  return (
    value &&
    typeof value === "object" &&
    typeof value.mode === "string" &&
    Array.isArray(value.levels)
  );
}
 
/* ======================================================
   SERVICE
====================================================== */
 
class WorkflowRuntimeService {
  /* ======================================================
     START INSTANCE
  ====================================================== */
  async startInstance(
    workflowId: string,
    payload: { resourceType: string; resourceId: string },
    meta: ActorMeta
  ) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.workflowInstance.findFirst({
        where: {
          workflowId,
          resourceId: payload.resourceId,
          status: {
            notIn: [
              WorkflowInstanceStatus.CANCELLED,
              WorkflowInstanceStatus.COMPLETED,
            ],
          },
        },
      });
 
      if (existing) {
        throw new BadRequestException(
          "Workflow already started for this resource"
        );
      }
 
      const workflow = await tx.workflowDefinition.findUnique({
        where: { id: workflowId },
        include: { stages: true },
      });
 
      if (!workflow) throw new NotFoundException("Workflow not found");
 
      const initialStage = workflow.stages.find((s) => s.isInitial);
      if (!initialStage)
        throw new BadRequestException("Workflow has no initial stage");
 
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
 
      if (payload.resourceType === "MASTER_RECORD") {
        await tx.masterRecord.update({
          where: { id: payload.resourceId },
          data: { currentStageId: initialStage.id },
        });
      }
 
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
  async executeTransition(
    instanceId: string,
    input: TransitionInput,
    meta: ActorMeta
  ) {
    const userId = meta.actorId;
    if (!userId) throw new ForbiddenException("Not authenticated");
 
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
 
      if (!instance) throw new NotFoundException("Instance not found");
 
      if (instance.status !== WorkflowInstanceStatus.RUNNING) {
        throw new BadRequestException("Workflow is not active");
      }
 
      if (!instance.currentStageId || !instance.currentStage) {
        throw new BadRequestException("Workflow has no current stage");
      }
 
      let record: { createdById?: string | null } | null = null;
 
      if (instance.resourceType === "MASTER_RECORD") {
        record = await tx.masterRecord.findUnique({
          where: { id: instance.resourceId },
          select: { createdById: true },
        });
      }
 
      const transition = instance.workflow.transitions.find(
        (t) => t.id === input.transitionId
      );
 
      if (!transition) {
        throw new BadRequestException("Invalid transition");
      }
 
      if (transition.fromStageId !== instance.currentStageId) {
        throw new BadRequestException(
          "Transition not allowed from this stage"
        );
      }
 
      await enforceTransitionPermission(
        userId,
        instance,
        record,
        transition,
        tx
      );
 
      if (instance.lockedAt) {
        throw new BadRequestException("Workflow instance is locked");
      }
 
      await tx.workflowInstance.update({
        where: { id: instance.id },
        data: {
          lockedAt: new Date(),
          lockedBy: userId,
        },
      });
 
      try {
        /* ======================================================
           APPROVAL TRANSITION
        ====================================================== */
        if (transition.transitionType === TransitionType.APPROVAL) {
          if (input.action === "APPROVE") {
            return await this.resolveApproval(instance, transition, true, meta);
          }
 
          if (input.action === "REJECT") {
            return await this.resolveApproval(
              instance,
              transition,
              false,
              meta
            );
          }
 
          throw new BadRequestException("Invalid approval action");
        }
 
        /* ======================================================
           SEND BACK
        ====================================================== */
        if (transition.transitionType === TransitionType.SEND_BACK) {
          return await sendBack(tx, instance, transition, meta, input.comment);
        }
 
        /* ======================================================
           CATEGORY CHECK
        ====================================================== */
        const fromStage = instance.currentStage;
 
        const toStage = await tx.workflowStage.findUnique({
          where: { id: transition.toStageId },
        });
 
        if (!toStage) {
          throw new BadRequestException("Target stage not found");
        }
 
        if (
          fromStage.allowedNextCategories?.length &&
          !fromStage.allowedNextCategories.includes(toStage.category)
        ) {
          throw new BadRequestException(
            `Cannot move from ${fromStage.category} to ${toStage.category}`
          );
        }
 
        /* ======================================================
           NORMAL TRANSITION
        ====================================================== */
        await moveToStage(tx, instance, transition, meta, input.comment);
 
        await runAutoTransitions(tx, instance.id);
 
        return { status: "MOVED" };
      } finally {
        await tx.workflowInstance.update({
          where: { id: instance.id },
          data: {
            lockedAt: null,
            lockedBy: null,
          },
        });
      }
    });
  }
 
  /* ======================================================
     GET AVAILABLE ACTIONS   ✅ FIXED
  ====================================================== */
  async getAvailableActions(instanceId: string, userId: string) {
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
 
    if (
      !instance ||
      instance.status !== WorkflowInstanceStatus.RUNNING ||
      !instance.currentStage
    ) {
      return [];
    }
 
    const roles = await prisma.userRole.findMany({
      where: { userId },
      select: { roleId: true },
    });
 
    const roleIds = roles.map((r) => r.roleId);
 
    const results: {
      transitionId: string;
      label: string;
      type: TransitionType;
      actions: string[];
    }[] = [];
 
    for (const t of instance.currentStage.outgoingTransitions) {
      if (t.transitionType === TransitionType.AUTO) continue;
 
      /* ---------------- NORMAL ---------------- */
      if (t.transitionType !== TransitionType.APPROVAL) {
        const allowed =
          t.allowedUsers.some((u) => u.userId === userId) ||
          t.allowedRoles.some((r) => roleIds.includes(r.roleId)) ||
          (t.allowedUsers.length === 0 && t.allowedRoles.length === 0);
 
        if (!allowed) continue;
 
        results.push({
          transitionId: t.id,
          label: t.label ?? "Continue",
          type: t.transitionType,
          actions: ["EXECUTE"],
        });
 
        continue;
      }
 
      /* ---------------- APPROVAL ---------------- */
 
      const rawConfig = t.approvalConfig;
 
      if (!isApprovalConfig(rawConfig)) continue;
 
      const config = rawConfig;
 
      let level:
        | ApprovalConfig["levels"][number]
        | null
        | undefined = null;
 
      if (config.mode === "SEQUENTIAL") {
        const approvals = await prisma.workflowApproval.findMany({
          where: {
            workflowInstanceId: instance.id,
            transitionId: t.id,
          },
        });
 
        level = getCurrentApprovalLevel(config, approvals);
      } else {
        level = config.levels[0] ?? null;
      }
 
      if (!level) continue;
 
      const isApprover =
        level.userIds?.includes(userId) ||
        level.roleIds?.some((rid) => roleIds.includes(rid));
 
      if (!isApprover) continue;
 
      results.push({
        transitionId: t.id,
        label: t.label ?? "Approve",
        type: t.transitionType,
        actions: ["APPROVE", "REJECT"],
      });
    }
 
    return results;
  }
 
  /* ======================================================
     INTERNAL — APPROVAL
  ====================================================== */
  private async resolveApproval(
    instance: any,
    transition: any,
    approved: boolean,
    meta: ActorMeta
  ) {
    return prisma.$transaction(async (tx) => {
      const actorId = meta.actorId!;
      const config = transition.approvalConfig;
 
      if (!isApprovalConfig(config)) {
        throw new BadRequestException("Invalid approval config");
      }
 
      const mode = config.mode;
 
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
      } else {
        level = config.levels[0];
      }
 
      const isUserAllowed =
        level.userIds?.includes(actorId) ||
        (await tx.userRole.count({
          where: {
            userId: actorId,
            roleId: { in: level.roleIds ?? [] },
          },
        })) > 0;
 
      if (!isUserAllowed) {
        throw new ForbiddenException("Not an approver for this level");
      }
 
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
 
      const expectedCount =
        (level.userIds?.length ?? 0) + (level.roleIds?.length ?? 0);
 
      const outcome = resolveApprovalStrategy(
        transition.approvalStrategy,
        approvals.filter((a) => a.levelOrder === level.order),
        expectedCount
      );
 
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
 
async function sendBack(
  tx: any,
  instance: any,
  transition: any,
  meta: ActorMeta,
  comment?: string
) {
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
 
async function moveToStage(
  tx: any,
  instance: any,
  transition: any,
  meta: ActorMeta,
  comment?: string
) {
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
 
  if (instance.resourceType === "MASTER_RECORD") {
    await tx.masterRecord.update({
      where: { id: instance.resourceId },
      data: { currentStageId: transition.toStageId },
    });
  }
 
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
 
async function runAutoTransitions(
  tx: Prisma.TransactionClient,
  instanceId: string
) {
  while (true) {
    const instance = await tx.workflowInstance.findUnique({
      where: { id: instanceId },
      include: {
        currentStage: {
          include: { outgoingTransitions: true },
        },
      },
    });
 
    const auto = instance?.currentStage?.outgoingTransitions.find(
      (t) => t.transitionType === "AUTO"
    );
 
    if (!auto) break;
 
    await moveToStage(tx, instance, auto, {
      actorId: null,
      performedBy: "SYSTEM",
      ipAddress: null,
      userAgent: null,
    });
  }
}
 
export default new WorkflowRuntimeService();
 
 