import { Request, Response } from "express";
import { sendResponse } from "../utils/response.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { BadRequestException } from "../utils/appError.js";
import { PerformedByType } from "../../prisma/generated/client.js";
import policyService from "../services/policy.service.js";
import {
  EvaluatePolicyInput,
  PolicyId,
  PolicyIds,
} from "../types/policy.types.js";

const policyController = {
  createPolicy: async (req: Request, res: Response) => {
    const data = req.body;
    const policy = await policyService.createPolicy(data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Policy created successfully",
      data: { policy },
    });
  },

  createPoliciesBulk: async (req: Request, res: Response) => {
    const data = req.body;
    const policies = await policyService.createPoliciesBulk(data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Policies created successfully",
      data: { policies },
    });
  },

  getPolicies: async (req: Request, res: Response) => {
    const filters = {
      tenantId: req.query.tenantId as string,
      resourceId: req.query.resourceId as string,
      actionId: req.query.actionId as string,
      enabled: req.query.enabled ? req.query.enabled === "true" : undefined,
    };

    const policies = await policyService.getPolicies(filters);

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policies fetched successfully",
      data: { policies },
    });
  },

  getPolicyById: async (req: Request, res: Response) => {
    const policyId = req.params.id;
    if (!policyId) {
      throw new BadRequestException("Policy ID is required");
    }

    const policy = await policyService.getPolicyById({id:policyId});

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policy fetched successfully",
      data: { policy },
    });
  },

  updatePolicyById: async (req: Request, res: Response) => {
    const policyId = req.params.id;
    if (!policyId) {
      throw new BadRequestException("Policy ID is required");
    }
    const data = req.body;

    const policy = await policyService.updatePolicyById({id:policyId}, data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policy updated successfully",
      data: { policy },
    });
  },

  softDeletePolicy: async (req: Request, res: Response) => {

    const policyId = req.params.id;
    if (!policyId) {
      throw new BadRequestException("Policy ID is required");
    }

    const policy = await policyService.softDeletePolicy({id:policyId}, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policy archived successfully",
      data: { policy },
    });
  },

  restorePolicy: async (req: Request, res: Response) => {
    const policyId = req.params.id;
    if (!policyId) {
      throw new BadRequestException("Policy ID is required");
    }
    const policy = await policyService.restorePolicy({id:policyId}, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policy restored successfully",
      data: { policy },
    });
  },

  deletePolicy: async (req: Request, res: Response) => {
    const policyId = req.params.id;
    if (!policyId) {
      throw new BadRequestException("Policy ID is required");
    }

    const policy = await policyService.deletePolicy({id:policyId}, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policy deleted successfully",
      data: { policy },
    });
  },

  softDeleteManyPolicies: async (req: Request, res: Response) => {
    const ids: PolicyIds = { id: req.body.ids };
    if (!ids.id?.length)
      throw new BadRequestException("Policy IDs are required");

    const policies = await policyService.softDeleteManyPolicies(ids, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policies archived successfully",
      data: { policies },
    });
  },

  restoreManyPolicies: async (req: Request, res: Response) => {
    const ids: PolicyIds = { id: req.body.ids };
    if (!ids.id?.length)
      throw new BadRequestException("Policy IDs are required");

    const policies = await policyService.restoreManyPolicies(ids, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policies restored successfully",
      data: { policies },
    });
  },

  deleteManyPolicies: async (req: Request, res: Response) => {
    const ids: PolicyIds = { id: req.body.ids };
    if (!ids.id?.length)
      throw new BadRequestException("Policy IDs are required");

    const policies = await policyService.deleteManyPolicies(ids, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Policies deleted successfully",
      data: { policies },
    });
  },

  // evaluatePolicy: async (req: Request, res: Response) => {
  //   const body: EvaluatePolicyInput = req.body;
  //   const result = await policyService.evaluate(body);

  //   return sendResponse({
  //     res,
  //     statusCode: HTTPSTATUS.OK,
  //     success: true,
  //     message: "Policy evaluation completed",
  //     data: result,
  //   });
  // },
};

export default policyController;
