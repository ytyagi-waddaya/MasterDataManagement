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

// export type ApprovalConfig = {
//   mode: "SEQUENTIAL" | "PARALLEL";
//   levels: {
//     order: number;
//     userIds?: string[];
//     roleIds?: string[];
//   }[];
// };

// /* ======================================================
//    TYPE GUARD
// ====================================================== */

// function isApprovalConfig(value: any): value is ApprovalConfig {
//   return (
//     value &&
//     typeof value === "object" &&
//     typeof value.mode === "string" &&
//     Array.isArray(value.levels)
//   );
// }

// /* ======================================================
//    SERVICE
// ====================================================== */

// class WorkflowRuntimeService {
//   /* ======================================================
//      START INSTANCE
//   ====================================================== */
//   // async startInstance(
//   //   workflowId: string,
//   //   payload: { resourceType: string; resourceId: string },
//   //   meta: ActorMeta
//   // ) {
//   //   return prisma.$transaction(async (tx) => {
//   //     const existing = await tx.workflowInstance.findFirst({
//   //       where: {
//   //         workflowId,
//   //         resourceId: payload.resourceId,
//   //         status: {
//   //           notIn: [
//   //             WorkflowInstanceStatus.CANCELLED,
//   //             WorkflowInstanceStatus.COMPLETED,
//   //           ],
//   //         },
//   //       },
//   //     });

//   //     if (existing) {
//   //       throw new BadRequestException(
//   //         "Workflow already started for this resource"
//   //       );
//   //     }

//   //     const workflow = await tx.workflowDefinition.findUnique({
//   //       where: { id: workflowId },
//   //       include: { stages: true },
//   //     });

//   //     if (!workflow) throw new NotFoundException("Workflow not found");

//   //     const initialStage = workflow.stages.find((s) => s.isInitial);
//   //     if (!initialStage)
//   //       throw new BadRequestException("Workflow has no initial stage");

//   //     const instance = await tx.workflowInstance.create({
//   //       data: {
//   //         workflowId,
//   //         resourceType: payload.resourceType,
//   //         resourceId: payload.resourceId,
//   //         currentStageId: initialStage.id,
//   //         status: WorkflowInstanceStatus.RUNNING,
//   //         startedById: meta.actorId,
//   //       },
//   //     });

//   //     if (payload.resourceType === "MASTER_RECORD") {
//   //       await tx.masterRecord.update({
//   //         where: { id: payload.resourceId },
//   //         data: { currentStageId: initialStage.id },
//   //       });
//   //     }

//   //     await tx.workflowHistory.create({
//   //       data: {
//   //         workflowInstanceId: instance.id,
//   //         fromStageId: null,
//   //         toStageId: initialStage.id,
//   //         actionType: HistoryAction.TRANSITION,
//   //         actionLabel: "Workflow Started",
//   //         performedById: meta.actorId,
//   //       },
//   //     });

//   //     return instance;
//   //   });
//   // }

//   async startInstance(
//     resourceType: string,
//     resourceId: string,
//     meta: ActorMeta
//   ) {
//     return prisma.$transaction(async (tx) => {
//       /* ---------------------------------------
//        1. Prevent duplicate running workflow
//     ---------------------------------------- */
//       const existing = await tx.workflowInstance.findFirst({
//         where: {
//           resourceType,
//           resourceId,
//           status: WorkflowInstanceStatus.RUNNING,
//         },
//       });

//       if (existing) {
//         throw new BadRequestException("Workflow already running");
//       }

//       /* ---------------------------------------
//        2. Find the resource of this record
//     ---------------------------------------- */
//       const record = await tx.masterRecord.findUnique({
//         where: { id: resourceId },
//         select: { masterObjectId: true },
//       });

//       if (!record) {
//         throw new BadRequestException("Record not found");
//       }

//       const resource = await tx.resource.findFirst({
//         where: { masterObjectId: record.masterObjectId },
//         select: { id: true },
//       });

//       if (!resource) {
//         throw new BadRequestException("No resource mapped to this record");
//       }

//       /* ---------------------------------------
//        3. Get latest PUBLISHED workflow
//     ---------------------------------------- */
//       const workflow = await tx.workflowDefinition.findFirst({
//         where: {
//           resourceId: resource.id,
//           status: "PUBLISHED", // 🔒 only published
//           deletedAt: null,
//         },
//         orderBy: [
//           { version: "desc" }, // 🔒 highest version
//           { publishedAt: "desc" },
//         ],
//         include: {
//           stages: true, // ✅ needed for initial stage
//         },
//       });

//       if (!workflow) {
//         throw new BadRequestException(
//           "No published workflow available for this resource"
//         );
//       }

//       /* ---------------------------------------
//        4. Get initial stage
//     ---------------------------------------- */
//       const initialStage = workflow.stages.find((s) => s.isInitial);
//       if (!initialStage) {
//         throw new BadRequestException("Workflow has no initial stage");
//       }

//       /* ---------------------------------------
//        5. Create instance (PINNED VERSION)
//     ---------------------------------------- */
//       const instance = await tx.workflowInstance.create({
//         data: {
//           workflowId: workflow.id, // 🔒 pinned to this version
//           resourceType,
//           resourceId,
//           currentStageId: initialStage.id,
//           status: WorkflowInstanceStatus.RUNNING,
//           startedById: meta.actorId,
//         },
//       });

//       /* ---------------------------------------
//        6. Sync record stage
//     ---------------------------------------- */
//       await tx.masterRecord.update({
//         where: { id: resourceId },
//         data: { currentStageId: initialStage.id },
//       });

//       /* ---------------------------------------
//        7. History
//     ---------------------------------------- */
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

//       let record: { createdById?: string | null } | null = null;

//       if (instance.resourceType === "MASTER_RECORD") {
//         record = await tx.masterRecord.findUnique({
//           where: { id: instance.resourceId },
//           select: { createdById: true },
//         });
//       }

//       const transition = instance.workflow.transitions.find(
//         (t) => t.id === input.transitionId
//       );

//       if (!transition) {
//         throw new BadRequestException("Invalid transition");
//       }

//       // if (transition.fromStageId !== instance.currentStageId) {
//       //   throw new BadRequestException("Transition not allowed from this stage");
//       // }
//       // If instance already moved from this stage, don't fail hard
//       if (
//         transition.fromStageId !== instance.currentStageId &&
//         instance.currentStageId === transition.toStageId
//       ) {
//         return { status: "ALREADY_MOVED" };
//       }

//       await enforceTransitionPermission(
//         userId,
//         instance,
//         record,
//         transition,
//         tx
//       );

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
//             return await this.resolveApproval(
//               instance,
//               transition,
//               false,
//               meta
//             );
//             return await this.resolveApproval(
//               instance,
//               transition,
//               false,
//               meta
//             );
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

//   // async executeTransition(
//   //   instanceId: string,
//   //   input: TransitionInput,
//   //   meta: ActorMeta
//   // ) {
//   //   const userId = meta.actorId;
//   //   if (!userId) throw new ForbiddenException("Not authenticated");

//   //   let result: any;
//   //   let nextStageId: string | null = null;
//   //   let instanceSnapshot: any;

//   //   /* ======================================================
//   //    PHASE 1 — ATOMIC TRANSACTION
//   // ====================================================== */
//   //   await prisma.$transaction(
//   //     async (tx) => {
//   //       const instance = await tx.workflowInstance.findUnique({
//   //         where: { id: instanceId },
//   //         include: {
//   //           workflow: {
//   //             include: {
//   //               transitions: {
//   //                 include: { allowedRoles: true, allowedUsers: true },
//   //               },
//   //             },
//   //           },
//   //           currentStage: true,
//   //         },
//   //       });

//   //       if (!instance) throw new NotFoundException("Instance not found");

//   //       if (instance.status !== WorkflowInstanceStatus.RUNNING) {
//   //         throw new BadRequestException("Workflow is not active");
//   //       }

//   //       if (!instance.currentStageId || !instance.currentStage) {
//   //         throw new BadRequestException("Workflow has no current stage");
//   //       }

//   //       instanceSnapshot = instance;

//   //       const transition = instance.workflow.transitions.find(
//   //         (t) => t.id === input.transitionId
//   //       );
//   //       if (!transition) throw new BadRequestException("Invalid transition");

//   //       /* -------- stale click protection -------- */
//   //       if (
//   //         transition.fromStageId !== instance.currentStageId &&
//   //         instance.currentStageId === transition.toStageId
//   //       ) {
//   //         result = { status: "ALREADY_MOVED" };
//   //         return;
//   //       }

//   //       /* -------- permissions -------- */
//   //       let record: { createdById?: string | null } | null = null;

//   //       if (instance.resourceType === "MASTER_RECORD") {
//   //         record = await tx.masterRecord.findUnique({
//   //           where: { id: instance.resourceId },
//   //           select: { createdById: true },
//   //         });
//   //       }

//   //       await enforceTransitionPermission(
//   //         userId,
//   //         instance,
//   //         record,
//   //         transition,
//   //         tx
//   //       );

//   //       /* -------- lock -------- */
//   //       if (instance.lockedAt) {
//   //         throw new BadRequestException("Workflow instance is locked");
//   //       }

//   //       await tx.workflowInstance.update({
//   //         where: { id: instance.id },
//   //         data: {
//   //           lockedAt: new Date(),
//   //           lockedBy: userId,
//   //         },
//   //       });

//   //       /* ======================================================
//   //        APPROVAL
//   //     ====================================================== */
//   //       if (transition.transitionType === TransitionType.APPROVAL) {
//   //         result = await this.resolveApproval(
//   //           instance,
//   //           transition,
//   //           input.action === "APPROVE",
//   //           meta
//   //         );
//   //         return;
//   //       }

//   //       /* ======================================================
//   //        SEND BACK
//   //     ====================================================== */
//   //       if (transition.transitionType === TransitionType.SEND_BACK) {
//   //         await tx.workflowInstance.update({
//   //           where: { id: instance.id },
//   //           data: { currentStageId: transition.toStageId },
//   //         });

//   //         nextStageId = transition.toStageId;

//   //         await tx.workflowHistory.create({
//   //           data: {
//   //             workflowInstanceId: instance.id,
//   //             fromStageId: instance.currentStageId,
//   //             toStageId: transition.toStageId,
//   //             workflowTransitionId: transition.id,
//   //             actionType: HistoryAction.SENT_BACK,
//   //             performedById: meta.actorId,
//   //             notes: input.comment ?? null,
//   //           },
//   //         });

//   //         result = { status: "SENT_BACK" };
//   //         return;
//   //       }

//   //       /* ======================================================
//   //        NORMAL TRANSITION
//   //     ====================================================== */
//   //       const toStage = await tx.workflowStage.findUnique({
//   //         where: { id: transition.toStageId },
//   //       });
//   //       if (!toStage) throw new BadRequestException("Target stage not found");

//   //       const isFinal = Boolean(toStage.isFinal);

//   //       await tx.workflowInstance.update({
//   //         where: { id: instance.id },
//   //         data: {
//   //           currentStageId: transition.toStageId,
//   //           status: isFinal
//   //             ? WorkflowInstanceStatus.COMPLETED
//   //             : WorkflowInstanceStatus.RUNNING,
//   //           endedAt: isFinal ? new Date() : null,
//   //         },
//   //       });

//   //       nextStageId = transition.toStageId;

//   //       await tx.workflowHistory.create({
//   //         data: {
//   //           workflowInstanceId: instance.id,
//   //           fromStageId: instance.currentStageId,
//   //           toStageId: transition.toStageId,
//   //           workflowTransitionId: transition.id,
//   //           actionType: HistoryAction.TRANSITION,
//   //           actionLabel: transition.label ?? "Transition",
//   //           performedById: meta.actorId,
//   //           notes: input.comment ?? null,
//   //         },
//   //       });

//   //       result = { status: "MOVED" };
//   //     },
//   //     { timeout: 15000 }
//   //   );

//   //   /* ======================================================
//   //    PHASE 2 — SIDE EFFECTS (NO TRANSACTION)
//   // ====================================================== */

//   //   if (nextStageId && instanceSnapshot?.resourceType === "MASTER_RECORD") {
//   //     try {
//   //       await prisma.masterRecord.update({
//   //         where: { id: instanceSnapshot.resourceId },
//   //         data: { currentStageId: nextStageId },
//   //       });
//   //     } catch (e) {
//   //       console.error("Failed to sync master record stage", e);
//   //     }
//   //   }

//   //   try {
//   //     await prisma.workflowInstance.update({
//   //       where: { id: instanceId },
//   //       data: { lockedAt: null, lockedBy: null },
//   //     });
//   //   } catch (e) {
//   //     console.warn("Unlock skipped — instance already unlocked");
//   //   }

//   //   // auto transitions after commit
//   //   try {
//   //     await runAutoTransitions(prisma, instanceId);
//   //   } catch (e) {
//   //     console.error("Auto transitions failed", e);
//   //   }

//   //   return result;
//   // }

//   /* ======================================================
//      GET AVAILABLE ACTIONS   ✅ FIXED
//   ====================================================== */
//   // async getAvailableActions(instanceId: string, userId: string) {
//   //   const instance = await prisma.workflowInstance.findUnique({
//   //     where: { id: instanceId },
//   //     include: {
//   //       currentStage: {
//   //         include: {
//   //           outgoingTransitions: {
//   //             include: { allowedRoles: true, allowedUsers: true },
//   //           },
//   //         },
//   //       },
//   //     },
//   //   });

//   //   if (
//   //     !instance ||
//   //     instance.status !== WorkflowInstanceStatus.RUNNING ||
//   //     !instance.currentStage
//   //   ) {
//   //     return [];
//   //   }

//   //   const roles = await prisma.userRole.findMany({
//   //     where: { userId },
//   //     select: { roleId: true },
//   //   });

//   //   const roleIds = roles.map((r) => r.roleId);

//   //   const results: {
//   //     transitionId: string;
//   //     label: string;
//   //     type: TransitionType;
//   //     actions: string[];
//   //   }[] = [];

//   //   for (const t of instance.currentStage.outgoingTransitions) {
//   //     if (t.transitionType === TransitionType.AUTO) continue;

//   //     /* ---------------- NORMAL ---------------- */
//   //     if (t.transitionType !== TransitionType.APPROVAL) {
//   //       const allowed =
//   //         t.allowedUsers.some((u) => u.userId === userId) ||
//   //         t.allowedRoles.some((r) => roleIds.includes(r.roleId)) ||
//   //         (t.allowedUsers.length === 0 && t.allowedRoles.length === 0);

//   //       if (!allowed) continue;

//   //       results.push({
//   //         transitionId: t.id,
//   //         label: t.label ?? "Continue",
//   //         type: t.transitionType,
//   //         actions: ["EXECUTE"],
//   //       });

//   //       continue;
//   //     }

//   //     results.push({
//   //       transitionId: t.id,
//   //       label: instance.currentStage.isFinal
//   //         ? "Reopen"
//   //         : t.label ?? "Send Back",
//   //       type: t.transitionType,
//   //       actions: ["EXECUTE"],
//   //     });

//   //     /* ---------------- APPROVAL ---------------- */

//   //     const rawConfig = t.approvalConfig;

//   //     if (!isApprovalConfig(rawConfig)) continue;

//   //     const config = rawConfig;

//   //     let level: ApprovalConfig["levels"][number] | null | undefined = null;

//   //     if (config.mode === "SEQUENTIAL") {
//   //       const approvals = await prisma.workflowApproval.findMany({
//   //         where: {
//   //           workflowInstanceId: instance.id,
//   //           transitionId: t.id,
//   //         },
//   //       });

//   //       level = getCurrentApprovalLevel(config, approvals);
//   //     } else {
//   //       level = config.levels[0] ?? null;
//   //     }

//   //     if (!level) continue;

//   //     const isApprover =
//   //       level.userIds?.includes(userId) ||
//   //       level.roleIds?.some((rid) => roleIds.includes(rid));

//   //     if (!isApprover) continue;

//   //     results.push({
//   //       transitionId: t.id,
//   //       label: t.label ?? "Approve",
//   //       type: t.transitionType,
//   //       actions: ["APPROVE", "REJECT"],
//   //     });
//   //   }

//   //   return results;
//   // }

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

//     const results: {
//       transitionId: string;
//       label: string;
//       type: TransitionType;
//       actions: string[];
//     }[] = [];

//     for (const t of instance.currentStage.outgoingTransitions) {
//       // 1️⃣ AUTO → never shown
//       if (t.transitionType === TransitionType.AUTO) continue;

//       /* ======================================================
//        NON-APPROVAL TRANSITIONS
//     ====================================================== */
//       if (t.transitionType !== TransitionType.APPROVAL) {
//         const allowed =
//           t.allowedUsers.some((u) => u.userId === userId) ||
//           t.allowedRoles.some((r) => roleIds.includes(r.roleId)) ||
//           (t.allowedUsers.length === 0 && t.allowedRoles.length === 0);

//         if (!allowed) continue;

//         const isReopen =
//           instance.currentStage.isFinal &&
//           t.transitionType === TransitionType.SEND_BACK;

//         results.push({
//           transitionId: t.id,
//           label: isReopen ? "Reopen" : t.label ?? "Continue",
//           type: t.transitionType,
//           actions: ["EXECUTE"],
//         });

//         continue;
//       }

//       /* ======================================================
//        APPROVAL TRANSITIONS
//     ====================================================== */

//       const rawConfig = t.approvalConfig;
//       if (!isApprovalConfig(rawConfig)) continue;

//       const config = rawConfig;

//       let level: ApprovalConfig["levels"][number] | null | undefined = null;

//       if (config.mode === "SEQUENTIAL") {
//         const approvals = await prisma.workflowApproval.findMany({
//           where: {
//             workflowInstanceId: instance.id,
//             transitionId: t.id,
//           },
//         });

//         level = getCurrentApprovalLevel(config, approvals);
//       } else {
//         level = config.levels[0] ?? null;
//       }

//       if (!level) continue;

//       const isApprover =
//         level.userIds?.includes(userId) ||
//         level.roleIds?.some((rid) => roleIds.includes(rid));

//       if (!isApprover) continue;

//       results.push({
//         transitionId: t.id,
//         label: t.label ?? "Approve",
//         type: t.transitionType,
//         actions: ["APPROVE", "REJECT"],
//       });
//     }

//     return results;
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

//       if (!isApprovalConfig(config)) {
//         throw new BadRequestException("Invalid approval config");
//       }

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
// async function sendBack(
//   tx: any,
//   instance: any,
//   transition: any,
//   meta: ActorMeta,
//   comment?: string
// ) {
//   const targetStage = await tx.workflowStage.findUnique({
//     where: { id: transition.toStageId },
//   });

//   const isReopen =
//     instance.status === WorkflowInstanceStatus.COMPLETED &&
//     !targetStage?.isFinal;

//   await tx.workflowInstance.update({
//     where: { id: instance.id },
//     data: {
//       currentStageId: transition.toStageId,
//       status: isReopen
//         ? WorkflowInstanceStatus.RUNNING // 🔥 reopen reactivates workflow
//         : instance.status,
//       endedAt: isReopen ? null : instance.endedAt,
//     },
//   });

//   await tx.workflowHistory.create({
//     data: {
//       workflowInstanceId: instance.id,
//       fromStageId: instance.currentStageId,
//       toStageId: transition.toStageId,
//       workflowTransitionId: transition.id,
//       actionType: isReopen
//         ? HistoryAction.REOPENED // 🔥 new semantic
//         : HistoryAction.SENT_BACK,
//       performedById: meta.actorId,
//       notes: comment ?? null,
//     },
//   });

//   return { status: isReopen ? "REOPENED" : "SENT_BACK" };
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
  PrismaClient,
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
    resourceType: string,
    resourceId: string,
    meta: ActorMeta
  ) {
    let instance: any;
    let initialStageId: string | null = null;

    await prisma.$transaction(async (tx) => {
      const existing = await tx.workflowInstance.findFirst({
        where: {
          resourceType,
          resourceId,
          status: WorkflowInstanceStatus.RUNNING,
        },
      });
      if (existing) throw new BadRequestException("Workflow already running");

      const record = await tx.masterRecord.findUnique({
        where: { id: resourceId },
        select: { masterObjectId: true },
      });
      if (!record) throw new BadRequestException("Record not found");

      const resource = await tx.resource.findFirst({
        where: { masterObjectId: record.masterObjectId },
        select: { id: true },
      });
      if (!resource) throw new BadRequestException("No resource mapped");

      const workflow = await tx.workflowDefinition.findFirst({
        where: {
          resourceId: resource.id,
          status: "PUBLISHED",
          deletedAt: null,
        },
        orderBy: [{ version: "desc" }, { publishedAt: "desc" }],
        include: { stages: true },
      });
      if (!workflow) throw new BadRequestException("No published workflow");

      const initialStage = workflow.stages.find((s) => s.isInitial);
      if (!initialStage) throw new BadRequestException("No initial stage");

      initialStageId = initialStage.id;

      instance = await tx.workflowInstance.create({
        data: {
          workflowId: workflow.id,
          resourceType,
          resourceId,
          currentStageId: initialStage.id,
          status: WorkflowInstanceStatus.RUNNING,
          startedById: meta.actorId,
        },
      });

      if (!initialStageId) {
        throw new Error("Initial stage not resolved");
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
    });

    // 🔥 OUTSIDE TX
    if (resourceType === "MASTER_RECORD") {
      await prisma.masterRecord.update({
        where: { id: resourceId },
        data: { currentStageId: initialStageId },
      });
    }

    return instance;
  }

  /* ======================================================
     EXECUTE TRANSITION — PRODUCTION VERSION
  ====================================================== */
  async executeTransition(
    instanceId: string,
    input: TransitionInput,
    meta: ActorMeta
  ) {
    const userId = meta.actorId;
    if (!userId) throw new ForbiddenException("Not authenticated");

    let result: any;
    let nextStageId: string | null = null;
    let instanceSnapshot: any;

    /* ============================
       PHASE 1 — ATOMIC TX
    ============================ */
    await prisma.$transaction(async (tx) => {
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
      if (
        instance.status !== WorkflowInstanceStatus.RUNNING &&
        instance.status !== WorkflowInstanceStatus.COMPLETED
      ) {
        throw new BadRequestException("Workflow not active");
      }

      if (!instance.currentStage)
        throw new BadRequestException("No current stage");

      instanceSnapshot = instance;

      const transition = instance.workflow.transitions.find(
        (t) => t.id === input.transitionId
      );
      if (!transition) throw new BadRequestException("Invalid transition");

      /* ---- stale click protection ---- */
      if (
        transition.fromStageId !== instance.currentStageId &&
        instance.currentStageId === transition.toStageId
      ) {
        result = { status: "ALREADY_MOVED" };
        return;
      }

      let record: { createdById?: string | null } | null = null;
      if (instance.resourceType === "MASTER_RECORD") {
        record = await tx.masterRecord.findUnique({
          where: { id: instance.resourceId },
          select: { createdById: true },
        });
      }

      await enforceTransitionPermission(
        userId,
        instance,
        record,
        transition,
        tx
      );

      if (instance.lockedAt) throw new BadRequestException("Workflow locked");

      await tx.workflowInstance.update({
        where: { id: instance.id },
        data: { lockedAt: new Date(), lockedBy: userId },
      });

      /* ======================================================
         APPROVAL
      ====================================================== */
      if (transition.transitionType === TransitionType.APPROVAL) {
        result = await this.resolveApprovalTx(
          tx,
          instance,
          transition,
          input.action === "APPROVE",
          meta
        );
        return;
      }

      /* ======================================================
         SEND BACK / REOPEN
      ====================================================== */
      if (transition.transitionType === TransitionType.SEND_BACK) {
        nextStageId = transition.toStageId;

        const targetStage = await tx.workflowStage.findUnique({
          where: { id: transition.toStageId },
        });

        const isReopen =
          instance.status === WorkflowInstanceStatus.COMPLETED &&
          !targetStage?.isFinal;

        await tx.workflowInstance.update({
          where: { id: instance.id },
          data: {
            currentStageId: transition.toStageId,
            status: isReopen ? WorkflowInstanceStatus.RUNNING : instance.status,
            endedAt: isReopen ? null : instance.endedAt,
          },
        });

        await tx.workflowHistory.create({
          data: {
            workflowInstanceId: instance.id,
            fromStageId: instance.currentStageId,
            toStageId: transition.toStageId,
            workflowTransitionId: transition.id,
            actionType: isReopen
              ? HistoryAction.REOPENED
              : HistoryAction.SENT_BACK,
            performedById: meta.actorId,
            notes: input.comment ?? null,
          },
        });

        result = { status: isReopen ? "REOPENED" : "SENT_BACK" };
        return;
      }

      /* ======================================================
         NORMAL TRANSITION
      ====================================================== */
      const toStage = await tx.workflowStage.findUnique({
        where: { id: transition.toStageId },
      });
      if (!toStage) throw new BadRequestException("Target stage not found");

      const isFinal = Boolean(toStage.isFinal);

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

      nextStageId = transition.toStageId;

      await tx.workflowHistory.create({
        data: {
          workflowInstanceId: instance.id,
          fromStageId: instance.currentStageId,
          toStageId: transition.toStageId,
          workflowTransitionId: transition.id,
          actionType: HistoryAction.TRANSITION,
          actionLabel: transition.label ?? "Transition",
          performedById: meta.actorId,
          notes: input.comment ?? null,
        },
      });

      result = { status: "MOVED" };
    });

    /* ============================
       PHASE 2 — SIDE EFFECTS
    ============================ */

    if (nextStageId && instanceSnapshot?.resourceType === "MASTER_RECORD") {
      try {
        await prisma.masterRecord.update({
          where: { id: instanceSnapshot.resourceId },
          data: { currentStageId: nextStageId },
        });
      } catch (e) {
        console.error("Failed to sync master record stage", e);
      }
    }

    try {
      await prisma.workflowInstance.update({
        where: { id: instanceId },
        data: { lockedAt: null, lockedBy: null },
      });
    } catch {
      console.warn("Unlock skipped — already unlocked");
    }

    try {
      await runAutoTransitions(prisma, instanceId);
    } catch (e) {
      console.error("Auto transitions failed", e);
    }

    return result;
  }

  /* ======================================================
     GET AVAILABLE ACTIONS
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

      /* -------- NON-APPROVAL -------- */
      if (t.transitionType !== TransitionType.APPROVAL) {
        const allowed =
          t.allowedUsers.some((u) => u.userId === userId) ||
          t.allowedRoles.some((r) => roleIds.includes(r.roleId)) ||
          (t.allowedUsers.length === 0 && t.allowedRoles.length === 0);

        if (!allowed) continue;

        const isReopen =
          instance.currentStage.isFinal &&
          t.transitionType === TransitionType.SEND_BACK;

        results.push({
          transitionId: t.id,
          label: isReopen ? "Reopen" : t.label ?? "Continue",
          type: t.transitionType,
          actions: ["EXECUTE"],
        });
        continue;
      }

      /* -------- APPROVAL -------- */
      const rawConfig = t.approvalConfig;
      if (!isApprovalConfig(rawConfig)) continue;

      const config = rawConfig;

      let level;
      if (config.mode === "SEQUENTIAL") {
        const approvals = await prisma.workflowApproval.findMany({
          where: {
            workflowInstanceId: instance.id,
            transitionId: t.id,
          },
        });
        level = getCurrentApprovalLevel(config, approvals);
      } else {
        level = config.levels[0];
      }

      if (!level) continue;

      const isApprover =
        level.userIds?.includes(userId) ||
        level.roleIds?.some((rid: any) => roleIds.includes(rid));

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
     INTERNAL — APPROVAL (TX-SAFE)
  ====================================================== */
  private async resolveApprovalTx(
    tx: Prisma.TransactionClient,
    instance: any,
    transition: any,
    approved: boolean,
    meta: ActorMeta
  ) {
    const actorId = meta.actorId!;
    const config = transition.approvalConfig;

    if (!isApprovalConfig(config)) {
      throw new BadRequestException("Invalid approval config");
    }

    let level;

    if (config.mode === "SEQUENTIAL") {
      const approvals = await tx.workflowApproval.findMany({
        where: {
          workflowInstanceId: instance.id,
          transitionId: transition.id,
        },
      });
      level = getCurrentApprovalLevel(config, approvals);
      if (!level) throw new BadRequestException("Approval already completed");
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
      throw new ForbiddenException("Not an approver");
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
          actionType: HistoryAction.APPROVED,
          performedById: actorId,
        },
      });

      return { status: "APPROVED" };
    }

    if (outcome === "REJECTED") {
      return { status: "REJECTED" };
    }

    return { status: "PENDING" };
  }
}

/* ======================================================
   AUTO TRANSITIONS — OUTSIDE TX
====================================================== */

async function runAutoTransitions(prisma: PrismaClient, instanceId: string) {
  while (true) {
    const instance = await prisma.workflowInstance.findUnique({
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

    await prisma.workflowInstance.update({
      where: { id: instanceId },
      data: { currentStageId: auto.toStageId },
    });

    await prisma.workflowHistory.create({
      data: {
        workflowInstanceId: instanceId,
        fromStageId: auto.fromStageId,
        toStageId: auto.toStageId,
        actionType: HistoryAction.AUTO_TRANSITION,
      },
    });
  }
}

export default new WorkflowRuntimeService();
