import { Request, Response } from "express";
import { PerformedByType } from "../../../prisma/generated/enums.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../utils/appError.js";
import { sendResponse } from "../../utils/response.js";
import masterRecordService from "./masterRecord.service.js";
import { prisma } from "../../lib/prisma.js";

const masterRecordController = {
  createMasterRecord: async (req: Request, res: Response) => {
    const { masterObjectId, data } = req.body;
    console.log("RECORD DATA:", req.body);

    const record = await masterRecordService.createRecord(
      masterObjectId,
      data,
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
      message: "Record created successfully",
      data: record,
    });
  },

  getMasterRecords: async (req: Request, res: Response) => {
    const filters = req.query;
    const records = await masterRecordService.getRecords(filters);

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Records fetched successfully",
      data: { records },
    });

    // if (!masterObjectId) {
    //   return res.status(400).json({ message: "masterObjectId is required" });
    // }
  },

  getMasterRecord: async (req: Request, res: Response) => {
    const recordId = req.params?.recordId;

    if (!recordId) {
      throw new UnauthorizedException("Record not found");
    }

    const record = await masterRecordService.getRecordById(recordId);

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Record fetched successfully",
      data: { record },
    });
  },

  archiveMasterRecord: async (req: Request, res: Response) => {
    const recordId = req.params?.recordId;

    if (!recordId) {
      throw new BadRequestException("Record Id is required");
    }

    const record = await masterRecordService.archiveRecord(recordId, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Record archived successfully",
      data: { record },
    });
  },

  restoreMasterRecord: async (req: Request, res: Response) => {
    const recordId = req.params?.recordId;

    if (!recordId) {
      throw new BadRequestException("Record Id is required");
    }

    const record = await masterRecordService.restoreRecord(recordId, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Record restored successfully",
      data: { record },
    });
  },

  deleteMasterRecord: async (req: Request, res: Response) => {
    const recordId = req.params?.recordId;

    if (!recordId) {
      throw new BadRequestException("Record Id is required");
    }
    const record = await masterRecordService.deleteRecord(recordId, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Record deleted successfully",
      data: { record },
    });
  },
};

export default masterRecordController;
