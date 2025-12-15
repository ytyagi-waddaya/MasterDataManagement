import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.js";
import masterObjectService from "./masterObject.service.js";
import { PerformedByType } from "../../../prisma/generated/client.js";
import { BadRequestException } from "../../utils/appError.js";
import { HTTPSTATUS } from "../../config/http.config.js";

const masterObjectController = {
  getMasterObject: async (req: Request, res: Response) => {
    const masterObjectId = req.params?.masterObjectId;
    if (!masterObjectId)
      throw new BadRequestException("MasterObject ID is required");

    const masterObject= await masterObjectService.getMasterObject({
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
console.log("MasterObject:", masterObjects);
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

    const masterObject = await masterObjectService.updateMasterObject(
      { masterObjectId },
      data,
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
        userAgent: req.get("user-agent") ?? null,
        ipAddress: req.ip,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "MasterObject updated successfully",
      data: { masterObject },
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
      }
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
      }
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
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "MasterObject deleted successfully",
      data: { result },
    });
  },
};

export default masterObjectController;
