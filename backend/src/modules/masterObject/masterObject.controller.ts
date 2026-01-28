import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.js";
import masterObjectService from "./masterObject.service.js";
import { PerformedByType } from "../../../prisma/generated/client.js";
import { BadRequestException } from "../../utils/appError.js";
import { HTTPSTATUS } from "../../config/http.config.js";

const masterObjectController = {
  getMasterObject: async (req: Request, res: Response) => {
    const masterObjectId = req.params?.masterObjectId;
    if (!masterObjectId) {
      throw new BadRequestException("MasterObject ID is required");
    }

    const masterObject = await masterObjectService.getMasterObject({
      masterObjectId,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "MasterObject fetched successfully",
      data: { masterObject },
    });
  },

  getMasterObjects: async (req: Request, res: Response) => {
    const filters = req.query;
    const masterObjects = await masterObjectService.getMasterObjects(filters);
    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Resources fetched successfully",
      data: { masterObjects },
    });
  },

  updateMasterObject: async (req: Request, res: Response) => {
    const masterObjectId = req.params?.masterObjectId;
    if (!masterObjectId)
      throw new BadRequestException("MasterObject ID is required");
    const data = req.body;
    console.log("FORM DATA:\n", JSON.stringify(data, null, 2));

    const masterObject = await masterObjectService.updateMasterObject(
      { masterObjectId },
      data,
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
        userAgent: req.get("user-agent") ?? null,
        ipAddress: req.ip,
      },
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "MasterObject updated successfully",
      data: { masterObject },
    });
  },

  publishMasterObject: async (req: Request, res: Response) => {
    const masterObjectId = req.params?.masterObjectId;
    if (!masterObjectId) {
      throw new BadRequestException("MasterObject ID is required");
    }

    const publishedSchema = await masterObjectService.publishSchema(
      { masterObjectId },
      req.body,
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
        userAgent: req.get("user-agent") ?? null,
        ipAddress: req.ip,
      },
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Schema published successfully",
      data: { schema: publishedSchema },
    });
  },

  archiveMasterObject: async (req: Request, res: Response) => {
    const masterObjectId = req.params?.masterObjectId;
    if (!masterObjectId)
      throw new BadRequestException("MasterObject ID is required");

    const masterObject = await masterObjectService.archivemasterObject(
      { masterObjectId },
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      },
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "MasterObject archived successfully",
      data: { masterObject },
    });
  },

  restoreMasterObject: async (req: Request, res: Response) => {
    const masterObjectId = req.params?.masterObjectId;
    if (!masterObjectId)
      throw new BadRequestException("MasterObject ID is required");

    const masterObject = await masterObjectService.restoremasterObject(
      { masterObjectId },
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
        performedBy: PerformedByType.USER,
      },
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "MasterObject restored successfully",
      data: { masterObject },
    });
  },

  deleteMasterObject: async (req: Request, res: Response) => {
    const masterObjectId = req.params?.masterObjectId;
    if (!masterObjectId)
      throw new BadRequestException("MasterObject ID is required");
    const result = await masterObjectService.deletemasterObject(
      { masterObjectId },
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
        userAgent: req.get("user-agent") ?? null,
        ipAddress: req.ip,
      },
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "MasterObject deleted successfully",
      data: { result },
    });
  },

  duplicateSchema: async (req: Request, res: Response) => {
    const masterObjectId = req.params.masterObjectId;
    if (!masterObjectId)
      throw new BadRequestException("MasterObject ID is required");
    const schema = await masterObjectService.duplicateSchema(
      { masterObjectId },
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
        userAgent: req.get("user-agent") ?? null,
        ipAddress: req.ip,
      },
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Schema duplicated successfully",
      data: { schema },
    });
  },
};

export default masterObjectController;
