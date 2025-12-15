import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../utils/appError.js";
import { PerformedByType } from "../../../prisma/generated/client.js";
import resourcesService from "./resource.service.js";
import { prisma } from "../../lib/prisma.js";

const resourcesController = {
  createResource: async (req: Request, res: Response) => {
    const data = req.body;

    const resource = await resourcesService.createResource(data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Resource created successfully",
      data: { resource },
    });
  },

  getResources: async (req: Request, res: Response) => {
    const filters = req.query;
    const resources = await resourcesService.getResources(filters);

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Resources fetched successfully",
      data: { resources },
    });
  },

  getResourceById: async (req: Request, res: Response) => {
    const resourceId = req.params?.resourceId;

    if (!resourceId) {
      throw new UnauthorizedException("Resource not found");
    }

    const resource = await resourcesService.getResourceById({
      resourceId,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Resource fetched successfully",
      data: { resource },
    });
  },

  updateResourceById: async (req: Request, res: Response) => {
    const resourceId = req.params?.resourceId;

    const data = req.body;

    if (!resourceId) {
      throw new BadRequestException("Resource Id is required");
    }

    const resource = await resourcesService.updateResourceById(
      { resourceId },
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
      message: "Resource updated successfully",
      data: { resource },
    });
  },

  archiveResource: async (req: Request, res: Response) => {
    const resourceId = req.params?.resourceId;

    if (!resourceId) {
      throw new BadRequestException("Resource Id is required");
    }

    const resource = await resourcesService.archiveResource(
      { resourceId },
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
      message: "Resource archived successfully",
      data: { resource },
    });
  },

  restoreResource: async (req: Request, res: Response) => {
    const resourceId = req.params?.resourceId;

    if (!resourceId) {
      throw new BadRequestException("Resource Id is required");
    }

    const resource = await resourcesService.restoreResource(
      { resourceId },
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
      message: "Resource restored successfully",
      data: { resource },
    });
  },

  deleteResource: async (req: Request, res: Response) => {
    const resourceId = req.params?.resourceId;

    if (!resourceId) {
      throw new BadRequestException("Resource Id is required");
    }
    const resource = await resourcesService.deleteResource(
      { resourceId },
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
      message: "Resource deleted successfully",
      data: { resource },
    });
  },

  archiveResources: async (req: Request, res: Response) => {
    const { resourceIds } = req.body;

    const resources = await resourcesService.archiveResources(
      { resourceIds },
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
      message: "Resources archived successfully",
      data: resources,
    });
  },

  restoreResources: async (req: Request, res: Response) => {
    const { resourceIds } = req.body;

    const resources = await resourcesService.restoreResources(
      { resourceIds },
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
      message: "Resources restored successfully",
      data: resources,
    });
  },

  deleteResources: async (req: Request, res: Response) => {
    const { resourceIds } = req.body;

    const resources = await resourcesService.deleteResources(
      { resourceIds },
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
      message: "Resources deleted successfully",
      data: resources,
    });
  },

  createMasterRecord: async (req: Request, res: Response) => {
    const { masterObjectId, data } = req.body;
    const createdById = req.user?.id ?? "";

    const record = await prisma.masterRecord.create({
      data: {
        masterObjectId,
        data,
        createdById,
      },
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Record created successfully",
      data: record,
    });
  },

    list: async(req: Request, res: Response) =>{
      const {
        masterObjectId,
        search = "",
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      if (!masterObjectId) {
        return res.status(400).json({ message: "masterObjectId is required" });
      }

      const pageNum = Number(page);
      const limitNum = Number(limit);

      // ---- Build where filter ----
      const where: any = {
        masterObjectId: String(masterObjectId),
        deletedAt: null,
      };

      // Search in JSON fields (Prisma supports json contains)
      if (search) {
        where.OR = [
          {
            data: {
              contains: search,
            },
          },
        ];
      }

      // ---- Query Records ----
      const [records, total] = await Promise.all([
        prisma.masterRecord.findMany({
          where,
          orderBy: { [String(sortBy)]: sortOrder === "desc" ? "desc" : "asc" },
          skip: (pageNum - 1) * limitNum,
          take: limitNum,
        }),

        prisma.masterRecord.count({ where }),
      ]);
         console.log("MASTER RECORD:", records);

      res.json({
        success: true,
        records,
        total,
        page: pageNum,
        limit: limitNum,
      });

  },
};

export default resourcesController;
