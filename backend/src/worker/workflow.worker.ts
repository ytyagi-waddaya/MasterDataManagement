// // src/workers/workflow.worker.ts
// import "dotenv/config";
// import { readGroup, ack, moveToDLQ, claimStuckMessages } from "../redis/streams.js";
// import { config } from "../config/app.config.js";
// import { logger } from "../utils/logger.js";
// import { setReady } from "../utils/health.js";
// import { prisma } from "../lib/prisma.js";
// import WorkflowService from "../services/workflow.service.js";

// const CONSUMER = config.CONSUMER_NAME || "workflow-worker-1";
// let running = true;

// process.once("SIGINT", () => shutdown("SIGINT"));
// process.once("SIGTERM", () => shutdown("SIGTERM"));

// async function shutdown(reason = "signal") {
//   running = false;
//   logger.info("[workflow.worker] shutdown", { reason });
//   try {
//     await prisma.$disconnect();
//   } catch (e) {
//     logger.warn("[workflow.worker] prisma disconnect failed", { error: e });
//   }
//   // allow process manager to exit
//   process.exit(0);
// }

// /**
//  * Parse Redis stream keyval array into object, JSON parsing values when possible.
//  */
// function parseKeyVals(keyvals: any[]): Record<string, any> {
//   const obj: Record<string, any> = {};
//   for (let i = 0; i < keyvals.length; i += 2) {
//     const k = keyvals[i] as string;
//     let v = keyvals[i + 1];
//     if (typeof v === "string") {
//       try {
//         v = JSON.parse(v);
//       } catch {
//         // keep as string
//       }
//     }
//     obj[k] = v;
//   }
//   return obj;
// }

// /**
//  * Normalize payload fields expected by service
//  */
// function buildMeta(payload: any) {
//   return {
//     actorId: payload.actorId ?? null,
//     ipAddress: payload.ipAddress ?? null,
//     userAgent: payload.userAgent ?? null,
//     performedBy: payload.performedBy ?? "WORKER",
//   };
// }

// /**
//  * Optionally: If you want per-instance concurrency protection,
//  * implement PG advisory locks here (recommended for multi-worker).
//  * For now we'll call service methods directly (service must be idempotent).
//  */

// /**
//  * Main message processor
//  */
// async function processMessage(msgId: string, obj: Record<string, any>) {
//   const type = obj.type ?? obj.eventType ?? obj.jobType; // tolerate varied keys
//   if (!type) {
//     throw new Error("missing job type");
//   }

//   logger.info("[workflow.worker] processing", { msgId, type, payload: obj });

//   // Route known workflow job types
//   if (type === "workflow.start" || type === "workflow.start_instance") {
//     const workflowId: string = obj.workflowId;
//     const data = obj.data ?? obj.payload ?? {};
//     if (!workflowId) throw new Error("workflowId missing for start job");

//     // Option A: create instance record in service (transactional)
//     await WorkflowService.startInstance(workflowId, data, buildMeta(obj));
//     return;
//   }

//   if (type === "workflow.move" || type === "workflow.move_instance") {
//     const workflowId: string = obj.workflowId;
//     const payload = {
//       instanceId: obj.instanceId,
//       toStageId: obj.toStageId,
//        transitionId: obj.transitionId ?? null,
//       notes: obj.notes ?? obj.note ?? null,
//       metadata: obj.metadata ?? obj.meta ?? null,
//       performedById: obj.performedById ?? obj.actorId ?? null,
//       approve: typeof obj.approve === "boolean" ? obj.approve : undefined,
//     };
//     if (!workflowId) throw new Error("workflowId missing for move job");
//     if (!payload.instanceId) throw new Error("instanceId missing for move job");

//     await WorkflowService.moveInstance(workflowId, payload, buildMeta(obj));
//     return;
//   }

//   if (type === "workflow.approve" || type === "workflow.approve_instance") {
//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;
//     const payload = {
//       instanceId,
//       toStageId: obj.toStageId,
//       notes: obj.notes ?? null,
//       metadata: obj.metadata ?? null,
//       approve: true,
//     };
//     if (!workflowId) throw new Error("workflowId missing for approve job");
//     if (!instanceId) throw new Error("instanceId missing for approve job");

//     // Note: service.approveInstance currently delegates to moveInstance
//     await WorkflowService.approveInstance(workflowId, payload, buildMeta(obj));
//     return;
//   }

//   if (type === "workflow.reject" || type === "workflow.reject_instance") {
//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;
//     const payload = {
//       instanceId,
//       toStageId: obj.toStageId,
//       notes: obj.notes ?? null,
//       metadata: obj.metadata ?? null,
//       approve: false,
//     };
//     if (!workflowId) throw new Error("workflowId missing for reject job");
//     if (!instanceId) throw new Error("instanceId missing for reject job");

//     await WorkflowService.rejectInstance(workflowId, payload, buildMeta(obj));
//     return;
//   }

//   if (type === "workflow.close" || type === "workflow.close_instance") {
//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;
//     if (!workflowId) throw new Error("workflowId missing for close job");
//     if (!instanceId) throw new Error("instanceId missing for close job");

//     await WorkflowService.closeInstance(workflowId, instanceId, buildMeta(obj));
//     return;
//   }

//   throw new Error("unsupported workflow job type: " + type);
// }

// /**
//  * Worker main loop: read from stream consumer group, process each message.
//  */
// export async function runWorkflowWorker() {
//   logger.info("[workflow.worker] started", {
//     stream: config.STREAM_KEY,
//     group: config.STREAM_DGROUP,
//     consumer: CONSUMER,
//   });
//   setReady(true);

//   while (running) {
//     try {
//       // Read messages: readGroup returns array or null
//       const res: any = await readGroup(CONSUMER, 10, 2000);
//       if (!res) {
//         // periodically claim stuck messages from other consumers
//         try {
//           const claimed = await claimStuckMessages(CONSUMER, 60_000, 100);
//           if (claimed && claimed.length) {
//             logger.warn("[workflow.worker] claimed stuck messages", { count: claimed.length });
//           }
//         } catch (e) {
//           logger.info("[workflow.worker] claimStuckMessages failed", { err: e });
//         }
//         continue;
//       }

//       for (const [_stream, messages] of res) {
//         if (!messages) continue;
//         for (const [id, keyvals] of messages) {
//           const payloadObj = parseKeyVals(keyvals);
//           try {
//             await processMessage(id as string, payloadObj);
//             await ack(id as string);
//             logger.info("[workflow.worker] acked", { id });
//           } catch (err: any) {
//             logger.error("[workflow.worker] processing failed", { id, err: err?.message ?? err });
//             try {
//               await moveToDLQ(id as string, payloadObj, String(err?.message ?? err));
//             } catch (dlqErr) {
//               logger.error("[workflow.worker] moveToDLQ failed", { id, err: dlqErr });
//             }
//           }
//         }
//       }
//     } catch (err) {
//       logger.error("[workflow.worker] loop error", { err });
//       // small backoff to avoid hot loop in case of severe errors
//       await new Promise((r) => setTimeout(r, 1000));
//     }
//   }

//   logger.info("[workflow.worker] exiting main loop");
// }

// /**
//  * If run directly, start the worker.
//  */
// if (require.main === module) {
//   runWorkflowWorker().catch(async (err) => {
//     logger.error("[workflow.worker] fatal error", err);
//     await shutdown("fatal");
//   });
// }

// // src/workers/workflow.worker.ts
// import "dotenv/config";
// import {
//   readGroup,
//   ack,
//   moveToDLQ,
//   claimStuckMessages,
// } from "../redis/streams.js";
// import { config } from "../config/app.config.js";
// import { logger } from "../utils/logger.js";
// import { setReady } from "../utils/health.js";
// import { prisma } from "../lib/prisma.js";
// import WorkflowService from "../services/workflow.service.js";

// const CONSUMER = config.CONSUMER_NAME || "workflow-worker-1";
// let running = true;

// process.once("SIGINT", () => shutdown("SIGINT"));
// process.once("SIGTERM", () => shutdown("SIGTERM"));

// async function shutdown(reason = "signal") {
//   running = false;
//   logger.info("[workflow.worker] shutdown", { reason });
//   try {
//     await prisma.$disconnect();
//   } catch (e) {
//     logger.warn("[workflow.worker] prisma disconnect failed", { error: e });
//   }
//   // allow process manager to exit
//   process.exit(0);
// }

// /**
//  * Parse Redis stream keyval array into object, JSON parsing values when possible.
//  */
// function parseKeyVals(keyvals: any[]): Record<string, any> {
//   const obj: Record<string, any> = {};
//   for (let i = 0; i < keyvals.length; i += 2) {
//     const k = keyvals[i] as string;
//     let v = keyvals[i + 1];
//     if (typeof v === "string") {
//       try {
//         v = JSON.parse(v);
//       } catch {
//         // keep as string
//       }
//     }
//     obj[k] = v;
//   }
//   return obj;
// }

// /**
//  * Normalize payload fields expected by service
//  */
// function buildMeta(payload: any) {
//   return {
//     actorId: payload.actorId ?? null,
//     ipAddress: payload.ipAddress ?? null,
//     userAgent: payload.userAgent ?? null,
//     performedBy: payload.performedBy ?? "WORKER",
//   };
// }

// function ensure(condition: boolean, message: string) {
//   if (!condition) throw new Error(message);
// }

// /**
//  * Main message processor
//  */
// async function processMessage(msgId: string, obj: Record<string, any>) {
//   const type = obj.type ?? obj.eventType ?? obj.jobType; // tolerate varied keys
//   if (!type) {
//     throw new Error("missing job type");
//   }

//   logger.info("[workflow.worker] processing", { msgId, type, payload: obj });

//   // Route known workflow job types
//   if (type === "workflow.start" || type === "workflow.start_instance") {
//     const workflowId: string = obj.workflowId;
//     const data = obj.data ?? obj.payload ?? {};
//     ensure(Boolean(workflowId), "workflowId missing for start job");

//     // Optional: validate start payload minimally
//     // (service will perform full validation)
//     try {
//       await WorkflowService.startInstance(workflowId, data, buildMeta(obj));
//     } catch (err) {
//       // rethrow to trigger DLQ handling upstream
//       throw err;
//     }
//     return;
//   }

//   if (type === "workflow.move" || type === "workflow.move_instance") {
//     const workflowId: string = obj.workflowId;
//     const payload = {
//       instanceId: obj.instanceId,
//       toStageId: obj.toStageId,
//       transitionId: obj.transitionId ?? null,
//       notes: obj.notes ?? obj.note ?? null,
//       metadata: obj.metadata ?? obj.meta ?? null,
//       performedById: obj.performedById ?? obj.actorId ?? null,
//       approve: typeof obj.approve === "boolean" ? obj.approve : undefined,
//     };

//     ensure(Boolean(workflowId), "workflowId missing for move job");
//     ensure(Boolean(payload.instanceId), "instanceId missing for move job");
//     ensure(Boolean(payload.toStageId), "toStageId missing for move job");

//     try {
//       await WorkflowService.moveInstance(workflowId, payload, buildMeta(obj));
//     } catch (err) {
//       throw err;
//     }
//     return;
//   }

//   if (type === "workflow.approve" || type === "workflow.approve_instance") {
//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;

//     ensure(Boolean(workflowId), "workflowId missing for approve job");
//     ensure(Boolean(instanceId), "instanceId missing for approve job");
//     ensure(Boolean(obj.toStageId), "toStageId missing for approve job");

//     const payload = {
//       instanceId,
//       toStageId: obj.toStageId,
//       transitionId: obj.transitionId ?? null,
//       notes: obj.notes ?? null,
//       metadata: obj.metadata ?? null,
//       performedById: obj.performedById ?? obj.actorId ?? null,
//       approve: true,
//     };

//     try {
//       // service.approveInstance currently delegates to moveInstance
//       await WorkflowService.approveInstance(
//         workflowId,
//         payload,
//         buildMeta(obj)
//       );
//     } catch (err) {
//       throw err;
//     }
//     return;
//   }

//   if (type === "workflow.reject" || type === "workflow.reject_instance") {
//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;

//     ensure(Boolean(workflowId), "workflowId missing for reject job");
//     ensure(Boolean(instanceId), "instanceId missing for reject job");
//     ensure(Boolean(obj.toStageId), "toStageId missing for reject job");

//     const payload = {
//       instanceId,
//       toStageId: obj.toStageId,
//       transitionId: obj.transitionId ?? null,
//       notes: obj.notes ?? null,
//       metadata: obj.metadata ?? null,
//       performedById: obj.performedById ?? obj.actorId ?? null,
//       approve: false,
//     };

//     try {
//       await WorkflowService.rejectInstance(workflowId, payload, buildMeta(obj));
//     } catch (err) {
//       throw err;
//     }
//     return;
//   }

//   if (type === "workflow.close" || type === "workflow.close_instance") {
//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;
//     ensure(Boolean(workflowId), "workflowId missing for close job");
//     ensure(Boolean(instanceId), "instanceId missing for close job");

//     try {
//       await WorkflowService.closeInstance(
//         workflowId,
//         instanceId,
//         buildMeta(obj)
//       );
//     } catch (err) {
//       throw err;
//     }
//     return;
//   }

//   throw new Error("unsupported workflow job type: " + type);
// }

// /**
//  * Worker main loop: read from stream consumer group, process each message.
//  */
// export async function runWorkflowWorker() {
//   logger.info("[workflow.worker] started", {
//     stream: config.STREAM_KEY,
//     group: config.STREAM_DGROUP,
//     consumer: CONSUMER,
//   });
//   setReady(true);

//   while (running) {
//     try {
//       // Read messages: readGroup returns array or null
//       const res: any = await readGroup(
//         config.CONSUMER_NAME,
//         10,
//         2000,
//         config.WORKFLOW_STREAM
//       );
//       if (!res) {
//         // periodically claim stuck messages from other consumers
//         try {
//           const claimed = await claimStuckMessages(CONSUMER, 60_000, 100);
//           if (claimed && claimed.length) {
//             logger.warn("[workflow.worker] claimed stuck messages", {
//               count: claimed.length,
//             });
//           }
//         } catch (e) {
//           logger.info("[workflow.worker] claimStuckMessages failed", {
//             err: e,
//           });
//         }
//         continue;
//       }

//       for (const [_stream, messages] of res) {
//         if (!messages) continue;
//         for (const [id, keyvals] of messages) {
//           const payloadObj = parseKeyVals(keyvals);
//           try {
//             await processMessage(id as string, payloadObj);
//             await ack(id as string);
//             logger.info("[workflow.worker] acked", { id });
//           } catch (err: any) {
//             logger.error("[workflow.worker] processing failed", {
//               id,
//               err: err?.message ?? err,
//             });
//             try {
//               await moveToDLQ(
//                 id as string,
//                 payloadObj,
//                 String(err?.message ?? err)
//               );
//             } catch (dlqErr) {
//               logger.error("[workflow.worker] moveToDLQ failed", {
//                 id,
//                 err: dlqErr,
//               });
//             }
//           }
//         }
//       }
//     } catch (err) {
//       logger.error("[workflow.worker] loop error", { err });
//       // small backoff to avoid hot loop in case of severe errors
//       await new Promise((r) => setTimeout(r, 1000));
//     }
//   }

//   logger.info("[workflow.worker] exiting main loop");
// }

// /**
//  * If run directly, start the worker.
//  */
// if (require.main === module) {
//   runWorkflowWorker().catch(async (err) => {
//     logger.error("[workflow.worker] fatal error", err);
//     await shutdown("fatal");
//   });
// }
///////////////////////////////////
// // src/workers/workflow.worker.ts
// import "dotenv/config";
// import {
//   readGroup,
//   ack,
//   moveToDLQ,
//   claimStuckMessages,
// } from "../redis/streams.js";
// import { config } from "../config/app.config.js";
// import { logger } from "../utils/logger.js";
// import { setReady } from "../utils/health.js";
// import { prisma } from "../lib/prisma.js";
// import WorkflowService from "../services/workflow.service.js";

// const CONSUMER = config.CONSUMER_NAME || "workflow-worker-1";
// let running = true;

// process.once("SIGINT", () => shutdown("SIGINT"));
// process.once("SIGTERM", () => shutdown("SIGTERM"));

// async function shutdown(reason = "signal") {
//   running = false;
//   logger.info("[workflow.worker] shutdown", { reason });
//   try {
//     await prisma.$disconnect();
//   } catch (e) {
//     logger.warn("[workflow.worker] prisma disconnect failed", { error: e });
//   }
//   process.exit(0);
// }

// /**
//  * Parse Redis stream keyvals to normal object
//  */
// function parseKeyVals(keyvals: any[]): Record<string, any> {
//   logger.info("[workflow.worker] parseKeyVals input", keyvals);
//   const obj: Record<string, any> = {};
//   for (let i = 0; i < keyvals.length; i += 2) {
//     const k = keyvals[i] as string;
//     let v = keyvals[i + 1];
//     if (typeof v === "string") {
//       try {
//         v = JSON.parse(v);
//       } catch (_) {}
//     }
//     obj[k] = v;
//   }
//   logger.info("[workflow.worker] parsed payload", obj);
//   return obj;
// }

// /**
//  * Normalize meta
//  */
// function buildMeta(payload: any) {
//   logger.info("[workflow.worker] building meta", payload);
//   return {
//     actorId: payload.actorId ?? null,
//     ipAddress: payload.ipAddress ?? null,
//     userAgent: payload.userAgent ?? null,
//     performedBy: payload.performedBy ?? "WORKER",
//   };
// }

// function ensure(condition: boolean, message: string) {
//   if (!condition) {
//     logger.error("[workflow.worker] ensure failed", { message });
//     throw new Error(message);
//   }
// }

// /**
//  * PROCESS INDIVIDUAL MESSAGE
//  */
// async function processMessage(msgId: string, obj: Record<string, any>) {
//   logger.info("[workflow.worker] processMessage called", { msgId, obj });

//   const type = obj.type ?? obj.eventType ?? obj.jobType;
//   logger.info("[workflow.worker] detected type", { type });

//   if (!type) {
//     throw new Error("missing job type");
//   }

//   logger.info("[workflow.worker] START processing message", {
//     msgId,
//     type,
//     payload: obj,
//   });

//   // -------------------------------------------------
//   // START INSTANCE
//   // -------------------------------------------------
//   if (type === "workflow.start" || type === "workflow.start_instance") {
//     logger.info("[workflow.worker] handling workflow.start", obj);

//     const workflowId: string = obj.workflowId;
//     const data = obj.data ?? obj.payload ?? {};
//     ensure(Boolean(workflowId), "workflowId missing for start");

//     try {
//       logger.info("[workflow.worker] calling WorkflowService.startInstance", {
//         workflowId,
//         data,
//       });

//       await WorkflowService.startInstance(workflowId, data, buildMeta(obj));

//       logger.info("[workflow.worker] workflow.start SUCCESS", {
//         workflowId,
//         data,
//       });
//     } catch (err) {
//       logger.error("[workflow.worker] workflow.start FAILED", {
//         msgId,
//         error: err,
//       });
//       throw err;
//     }
//     return;
//   }

//   // -------------------------------------------------
//   // MOVE INSTANCE
//   // -------------------------------------------------
//   if (type === "workflow.move" || type === "workflow.move_instance") {
//     logger.info("[workflow.worker] handling workflow.move", obj);

//     const workflowId: string = obj.workflowId;
//     const payload = {
//       instanceId: obj.instanceId,
//       toStageId: obj.toStageId,
//       transitionId: obj.transitionId ?? null,
//       notes: obj.notes ?? obj.note ?? null,
//       metadata: obj.metadata ?? obj.meta ?? null,
//       performedById: obj.performedById ?? obj.actorId ?? null,
//     };

//     ensure(Boolean(workflowId), "workflowId missing for move");
//     ensure(Boolean(payload.instanceId), "instanceId missing for move");
//     ensure(Boolean(payload.toStageId), "toStageId missing for move");

//     logger.info("[workflow.worker] calling WorkflowService.moveInstance", {
//       workflowId,
//       payload,
//     });

//     try {
//       await WorkflowService.moveInstance(workflowId, payload, buildMeta(obj));

//       logger.info("[workflow.worker] workflow.move SUCCESS", {
//         workflowId,
//         instanceId: payload.instanceId,
//         toStageId: payload.toStageId,
//       });
//     } catch (err) {
//       logger.error("[workflow.worker] workflow.move FAILED", {
//         msgId,
//         error: err,
//       });
//       throw err;
//     }

//     return;
//   }

//   // -------------------------------------------------
//   // APPROVE
//   // -------------------------------------------------
//   if (type === "workflow.approve" || type === "workflow.approve_instance") {
//     logger.info("[workflow.worker] handling workflow.approve", obj);

//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;
//     ensure(Boolean(workflowId), "workflowId missing for approve");

//     const payload = {
//       instanceId,
//       toStageId: obj.toStageId,
//       transitionId: obj.transitionId ?? null,
//       notes: obj.notes ?? null,
//       metadata: obj.metadata ?? null,
//       performedById: obj.performedById ?? obj.actorId ?? null,
//       approve: true,
//     };

//     logger.info("[workflow.worker] calling approveInstance", {
//       workflowId,
//       payload,
//     });

//     try {
//       await WorkflowService.approveInstance(workflowId, payload, buildMeta(obj));
//       logger.info("[workflow.worker] workflow.approve SUCCESS", { payload });
//     } catch (err) {
//       logger.error("[workflow.worker] workflow.approve FAILED", {
//         error: err,
//       });
//       throw err;
//     }

//     return;
//   }

//   // -------------------------------------------------
//   // REJECT
//   // -------------------------------------------------
//   if (type === "workflow.reject" || type === "workflow.reject_instance") {
//     logger.info("[workflow.worker] handling workflow.reject", obj);

//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;

//     const payload = {
//       instanceId,
//       toStageId: obj.toStageId,
//       transitionId: obj.transitionId ?? null,
//       notes: obj.notes ?? null,
//       metadata: obj.metadata ?? null,
//       performedById: obj.performedById ?? obj.actorId ?? null,
//       approve: false,
//     };

//     logger.info("[workflow.worker] calling rejectInstance", {
//       workflowId,
//       payload,
//     });

//     try {
//       await WorkflowService.rejectInstance(workflowId, payload, buildMeta(obj));
//       logger.info("[workflow.worker] workflow.reject SUCCESS", { payload });
//     } catch (err) {
//       logger.error("[workflow.worker] workflow.reject FAILED", {
//         error: err,
//       });
//       throw err;
//     }

//     return;
//   }

//   // -------------------------------------------------
//   // CLOSE INSTANCE
//   // -------------------------------------------------
//   if (type === "workflow.close" || type === "workflow.close_instance") {
//     logger.info("[workflow.worker] handling workflow.close", obj);

//     const workflowId: string = obj.workflowId;
//     const instanceId: string = obj.instanceId;

//     logger.info("[workflow.worker] calling closeInstance", {
//       workflowId,
//       instanceId,
//     });

//     try {
//       await WorkflowService.closeInstance(workflowId, instanceId, buildMeta(obj));
//       logger.info("[workflow.worker] workflow.close SUCCESS", {
//         workflowId,
//         instanceId,
//       });
//     } catch (err) {
//       logger.error("[workflow.worker] workflow.close FAILED", {
//         error: err,
//       });
//       throw err;
//     }
//     return;
//   }

//   // -------------------------------------------------
//   // UNKNOWN JOB TYPE
//   // -------------------------------------------------
//   logger.error("[workflow.worker] unsupported job type", { type });
//   throw new Error("unsupported workflow job type: " + type);
// }

// /**
//  * MAIN WORKER LOOP
//  */
// export async function runWorkflowWorker() {
//   logger.info("[workflow.worker] started", {
//     stream: config.WORKFLOW_STREAM,
//     group: config.STREAM_DGROUP,
//     consumer: CONSUMER,
//   });

//   setReady(true);

//   while (running) {
//     try {
//       logger.info("[workflow.worker] waiting for messages...");

//       const res: any = await readGroup(
//         config.CONSUMER_NAME,
//         10,
//         2000,
//         config.WORKFLOW_STREAM
//       );

//       logger.info("[workflow.worker] readGroup result", {
//         received: !!res,
//         raw: res,
//       });

//       if (!res) {
//         logger.info("[workflow.worker] no messages, checking stuck messages...");

//         try {
//           const claimed = await claimStuckMessages(CONSUMER, 60_000, 100);
//           if (claimed?.length) {
//             logger.warn("[workflow.worker] claimed stuck messages", {
//               count: claimed.length,
//               ids: claimed,
//             });
//           }
//         } catch (e) {
//           logger.info("[workflow.worker] claimStuckMessages failed", { e });
//         }

//         continue;
//       }

//       for (const [_stream, messages] of res) {
//         logger.info("[workflow.worker] received messages", {
//           count: messages?.length,
//         });

//         if (!messages) continue;

//         for (const [id, keyvals] of messages) {
//           logger.info("[workflow.worker] processing message", { id, keyvals });

//           const payloadObj = parseKeyVals(keyvals);

//           try {
//             await processMessage(id as string, payloadObj);
//             await ack(id as string);
//             logger.info("[workflow.worker] acked", { id });
//           } catch (err: any) {
//             logger.error("[workflow.worker] FAILED to process message", {
//               id,
//               error: err,
//             });

//             try {
//               await moveToDLQ(
//                 id as string,
//                 payloadObj,
//                 String(err?.message ?? err)
//               );
//             } catch (dlqErr) {
//               logger.error("[workflow.worker] moveToDLQ FAILED", {
//                 id,
//                 error: dlqErr,
//               });
//             }
//           }
//         }
//       }
//     } catch (err) {
//       logger.error("[workflow.worker] LOOP ERROR", { error: err });
//       await new Promise((r) => setTimeout(r, 1000));
//     }
//   }

//   logger.info("[workflow.worker] exiting main loop");
// }

// /**
//  * Auto-run when executed directly
//  */
// if (require.main === module) {
//   runWorkflowWorker().catch(async (err) => {
//     logger.error("[workflow.worker] fatal error", err);
//     await shutdown("fatal");
//   });
// }
