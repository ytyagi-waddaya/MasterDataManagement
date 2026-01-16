import { Request, Response } from "express";
import workflowService from "../services/workflow.service.js";
import { PerformedByType } from "../../prisma/generated/client.js";
import { sendResponse } from "../utils/response.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { BadRequestException } from "../utils/appError.js";
import { addToStream } from "../redis/streams.js";
import workflowRuntimeService from "../services/workflowRuntime.service.js";
import { workflowVisualizerService } from "../dto/workflowVisualizer.service.js";

const workflowController = {
  createWorkflow: async (req: Request, res: Response) => {
    const data = req.body;

    const workflow = await workflowService.createWorkflow(data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Workflow created successfully",
      data: { workflow },
    });
  },

  saveWorkflowGraph: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    const data = req.body;
    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const workflow = await workflowService.saveWorkflowGraph(workflowId, data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow graph saved successfully",
      data: { workflow },
    });
  },

  publishWorkflow: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    if (!workflowId) throw new BadRequestException("Workflow Id is required");
    const workflow = await workflowService.publishWorkflow(workflowId, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow published successfully",
      data: { workflow },
    });
  },

  getWorkflows: async (req: Request, res: Response) => {
    const filters = req.query;
    const workflows = await workflowService.getWorkflows(filters);

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflows Fetched successfully",
      data: { workflows },
    });
  },

  getWorkflow: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const workflow = await workflowService.getWorkflowById({
      workflowId,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow fetched successfully",
      data: { workflow },
    });
  },

  updateWorkflow: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    const data = req.body;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const workflow = await workflowService.updateWorkflow(
      { workflowId },
      data,
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow updated successfully",
      data: { workflow },
    });
  },

  archiveWorkflow: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const workflow = await workflowService.archiveWorkflow(
      { workflowId },
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow archived successfully",
      data: { workflow },
    });
  },

  restoreWorkflow: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const workflow = await workflowService.restoreWorkflow(
      { workflowId },
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow restored successfully",
      data: { workflow },
    });
  },

  deleteWorkflow: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const workflow = await workflowService.deleteWorkflow(
      { workflowId },
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow deleted successfully",
      data: { workflow },
    });
  },

  /* -------------------------------------------------------------------------- */
  /*                                   STAGES                                   */
  /* -------------------------------------------------------------------------- */

  createStages: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");
    const data = req.body;

    const stagesData = data.map((stage: any) => ({
      ...stage,
    }));

    const workflow = await workflowService.createStages(
      { workflowId },
      stagesData,
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Stages created successfully",
      data: { workflow },
    });
  },

  updateStage: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    const data = req.body;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const updatedStage = await workflowService.updateStages(
      { workflowId },
      data,
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Stage(s) updated successfully",
      data: { updatedStage },
    });
  },

  deleteStage: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    const data = req.body;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const deletedStage = await workflowService.deleteStages(
      { workflowId },
      data,
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Stage(s) deleted successfully",
      data: { deletedStage },
    });
  },

  getStages: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    if (!workflowId) throw new BadRequestException("Workflow ID is required");

    const stages = await workflowService.getStagesByWorkflowId({ workflowId });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow stages fetched successfully",
      data: { stages },
    });
  },

  getStage: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    if (!workflowId) throw new BadRequestException("Workflow ID is required");

    const stageId = req.params?.stageId;
    if (!stageId) throw new BadRequestException("Stage ID is required");

    const stages = await workflowService.getStagesByWorkflowIdandStageId(
      { workflowId },
      { stageId }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow stages fetched successfully",
      data: { stages },
    });
  },

  /* -------------------------------------------------------------------------- */
  /*                                   TRANSISTION                              */
  /* -------------------------------------------------------------------------- */

  createTransitions: async (req: Request, res: Response) => {
    const workflowId = req?.params?.workflowId;
    if (!workflowId) {
      throw new BadRequestException("Workflow Id is required.");
    }
    const transitionsData = req.body;

    const createdTransitions = await workflowService.createTransitions(
      { workflowId },
      transitionsData,
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Transitions created successfully",
      data: { createdTransitions },
    });
  },

  getTransitions: async (req: Request, res: Response) => {
    const workflowId = req.params.workflowId;
    if (!workflowId) {
      throw new BadRequestException("Workflow Id is required.");
    }
    const transitions = await workflowService.getTransitions({ workflowId });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Transitions fetched successfully",
      data: { transitions },
    });
  },

  getTransition: async (req: Request, res: Response) => {
    const { workflowId, transitionId } = req.params;

    if (!workflowId) throw new BadRequestException("Workflow ID is required");
    if (!transitionId)
      throw new BadRequestException("Transition ID is required");

    const transition = await workflowService.getTransitionById(
      { workflowId },
      transitionId
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Transition fetched successfully",
      data: { transition },
    });
  },

  updateTransition: async (req: Request, res: Response) => {
    const workflowId = req?.params?.workflowId;
    const transitionId = req?.params?.transitionId;
    const data = req.body;
    if (!workflowId) {
      throw new BadRequestException("Workflow Id is required.");
    }
    if (!transitionId) {
      throw new BadRequestException("Transistion Id is required.");
    }
    const updatedTransition = await workflowService.updateTransition(
      { workflowId },
      transitionId,
      data,
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Transition updated successfully",
      data: { updatedTransition },
    });
  },

  deleteTransitions: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    const transitionId = req.params.transitionId;

    if (!workflowId) throw new BadRequestException("Workflow Id is required.");
    if (!transitionId)
      throw new BadRequestException("No transition Id provided.");

    const deletedTransitions = await workflowService.deleteTransition(
      { workflowId },
      transitionId,
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Transition(s) deleted successfully",
      data: { deletedTransitions },
    });
  },

  /* -------------------------------------------------------------------------- */
  /*                                   INSTANCE                                 */
  /* -------------------------------------------------------------------------- */

  // startInstance: async (req: Request, res: Response) => {
  //   const workflowId = req.params?.workflowId;

  //   if (!workflowId) throw new BadRequestException("Workflow Id is required");

  //   const data = req.body;

  //   const instance = await workflowService.startInstance(workflowId, data, {
  //     actorId: req.user?.id ?? null,
  //     ipAddress: req.ip,
  //     userAgent: req.get("user-agent") ?? null,
  //     performedBy: PerformedByType.USER,
  //   });

  //   return sendResponse({
  //     res,
  //     statusCode: HTTPSTATUS.CREATED,
  //     success: true,
  //     message: "Workflow instance started",
  //     data: { instance },
  //   });
  // },

  startInstance: async (req: Request, res: Response) => {
    const workflowId = req.params.workflowId;
    if (!workflowId) throw new BadRequestException("Workflow Id is required");

    const actorId = req.user?.id ?? null;
    const data = req.body;

    console.log("INSTANCE:", data);

    // 1️⃣ ENQUEUE JOB FOR WORKER
    await addToStream({
      type: "workflow.start",
      workflowId,
      data,
      actorId,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
    });

    // 2️⃣ RESPOND IMMEDIATELY TO CLIENT
    return sendResponse({
      res,
      statusCode: HTTPSTATUS.ACCEPTED,
      success: true,
      message: "Workflow start request queued",
      data: {}, // Do NOT return instance here
    });
  },

  getInstance: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");
    const instanceId = req.params?.instanceId;
    if (!instanceId) throw new BadRequestException("Instance Id is required");
    const instance = await workflowService.getInstance(workflowId, instanceId);
    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow instance fetched",
      data: { instance },
    });
  },

  // moveInstance: async (req: Request, res: Response) => {
  //   const workflowId = req.params?.workflowId;

  //   if (!workflowId) throw new BadRequestException("Workflow Id is required");
  //   const body = req.body;

  //   const updated = await workflowService.moveInstance(workflowId, body, {
  //     actorId: req.user?.id ?? null,
  //     ipAddress: req.ip,
  //     userAgent: req.get("user-agent") ?? null,
  //     performedBy: PerformedByType.USER,
  //   });

  //   return sendResponse({
  //     res,
  //     statusCode: HTTPSTATUS.OK,
  //     success: true,
  //     message: "Instance moved",
  //     data: { updated },
  //   });
  // },

  closeInstance: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;

    if (!workflowId) throw new BadRequestException("Workflow Id is required");
    const instanceId = req.params?.instanceId;
    if (!instanceId) throw new BadRequestException("Instance Id is required");

    const closed = await workflowService.closeInstance(workflowId, instanceId, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Instance closed",
      data: { closed },
    });
  },

  listByWorkflow: async (req: Request, res: Response) => {
    const workflowId = req.params?.workflowId;
    if (!workflowId) throw new BadRequestException("Workflow Id is required");
    const skip = Number(req.query.skip ?? 0);
    const take = Number(req.query.take ?? 20);

    const result = await workflowService.listInstancesByWorkflow(workflowId, {
      skip,
      take,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Instances fetched",
      data: result,
    });
  },

  // approveInstance: async (req: Request, res: Response) => {
  //   const { workflowId, instanceId } = req.params;
  //   const { toStageId, notes, metadata } = req.body;
  //   if (!workflowId) throw new BadRequestException("Workflow ID is required");
  //   if (!instanceId) throw new BadRequestException("Instance ID is required");

  //   const updated = await workflowService.approveInstance(
  //     workflowId,
  //     {
  //       instanceId,
  //       toStageId,
  //       notes,
  //       metadata,
  //       approve: true,
  //     },
  //     {
  //       actorId: req.user?.id,
  //       ipAddress: req.ip,
  //       userAgent: req.get("user-agent"),
  //       performedBy: PerformedByType.USER,
  //     }
  //   );

  //   return sendResponse({
  //     res,
  //     statusCode: 200,
  //     success: true,
  //     message: "Instance approved",
  //     data: { updated },
  //   });
  // },

  // rejectInstance: async (req: Request, res: Response) => {
  //   const { workflowId, instanceId } = req.params;
  //   const { toStageId, notes, metadata } = req.body;
  //   if (!workflowId) throw new BadRequestException("Workflow ID is required");
  //   if (!instanceId) throw new BadRequestException("Instance ID is required");

  //   const updated = await workflowService.rejectInstance(
  //     workflowId,
  //     {
  //       instanceId,
  //       toStageId,
  //       notes,
  //       metadata,
  //       approve: false,
  //     },
  //     {
  //       actorId: req.user?.id,
  //       ipAddress: req.ip,
  //       userAgent: req.get("user-agent"),
  //       performedBy: PerformedByType.USER,
  //     }
  //   );

  //   return sendResponse({
  //     res,
  //     statusCode: 200,
  //     success: true,
  //     message: "Instance rejected",
  //     data: { updated },
  //   });
  // },

  /* -------------------------------------------------------------------------- */
  /*                                   ExecuteTransition                              */
  /* -------------------------------------------------------------------------- */
  // transition: async (req: Request, res: Response) => {
  //   const { instanceId } = req.params;

  //   if (!instanceId) {
  //     throw new BadRequestException("Instance Id is required");
  //   }
  //   const { transitionId, action, comment } = req.body;

  //   const result = await workflowRuntimeService.executeTransition(
  //     instanceId,
  //     { transitionId, action, comment },
  //     {
  //       actorId: req.user?.id ?? null,
  //       ipAddress: req.ip,
  //       userAgent: req.get("user-agent") ?? null,
  //       performedBy: PerformedByType.USER,
  //     }
  //   );

  //   sendResponse({
  //     res,
  //     statusCode: HTTPSTATUS.OK,
  //     success: true,
  //     message: "Workflow transitioned successfully",
  //     data: result,
  //   });
  // },

  // getAvailableActions: async (req: Request, res: Response) => {
  //   const { instanceId } = req.params;
  //   if (!instanceId) {
  //     throw new BadRequestException("Instance Id is required");
  //   }
  //   const actions = await workflowRuntimeService.getAvailableActions(
  //     instanceId,
  //     req.user!.id
  //   );

  //   sendResponse({
  //     res,
  //     statusCode: HTTPSTATUS.OK,
  //     success: true,
  //     message: "Available actions fetched",
  //     data: actions,
  //   });
  // },

  /* -------------------------------------------------------------------------- */
  /*                              WORKFLOW RUNTIME                              */
  /* -------------------------------------------------------------------------- */

  start: async (req: Request, res: Response) => {
    // const { workflowId } = req.params;
    const { resourceId, resourceType } = req.body;

    console.log("RECORD iD", resourceId);
    
    // if (!workflowId) throw new BadRequestException("workflowId is required");

    if (!resourceId || !resourceType)
      throw new BadRequestException("resourceId and resourceType are required");

    const instance = await workflowRuntimeService.startInstance(
      resourceType,
      resourceId,
      {
        actorId: req.user!.id,
        ipAddress: req.ip ?? null,
        userAgent: req.get("user-agent") ?? null,
        performedBy: "USER",
      }
    );

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Workflow started",
      data: instance,
    });
  },

  transition: async (req: Request, res: Response) => {
    const { instanceId } = req.params;
    const { transitionId, action, comment } = req.body;

    if (!instanceId || !transitionId)
      throw new BadRequestException("instanceId and transitionId are required");

    const result = await workflowRuntimeService.executeTransition(
      instanceId,
      { transitionId, action, comment },
      {
        actorId: req.user!.id,
        ipAddress: req.ip ?? null,
        userAgent: req.get("user-agent") ?? null,
        performedBy: "USER",
      }
    );

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Transition executed",
      data: result,
    });
  },

  getAvailableActions: async (req: Request, res: Response) => {
    const { instanceId } = req.params;

    if (!instanceId) throw new BadRequestException("instanceId is required");

    const actions = await workflowRuntimeService.getAvailableActions(
      instanceId,
      req.user!.id
    );

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Available actions fetched",
      data: actions,
    });
  },

  getVisualizer: async (req: Request, res: Response) => {
    const { workflowId } = req.params;

    if (!workflowId) {
      throw new BadRequestException("workflowId is required");
    }

    const visualizer = await workflowVisualizerService.getWorkflowVisualizer(
      workflowId
    );

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow visualizer data fetched",
      data: visualizer,
    });
  },
  getRecordWorkflowHistory: async (req: Request, res: Response) => {
    const { recordId } = req.params;

    if (!recordId) {
      throw new BadRequestException("recordId is required");
    }

    const history = await workflowService.getHistoryForRecord(recordId);

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Workflow history fetched",
      data: history,
    });
  },
};

export default workflowController;
