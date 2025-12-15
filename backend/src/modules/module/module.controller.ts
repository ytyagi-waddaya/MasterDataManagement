import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import { BadRequestException } from "../../utils/appError.js";
import { PerformedByType } from "../../../prisma/generated/client.js";
import moduleService from "./module.service.js";
import { prisma } from "../../lib/prisma.js";

const moduleController = {
  createModule: async (req: Request, res: Response) => {
    const data = req.body;

    const module = await moduleService.createModule(data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Module created successfully",
      data: { module },
    });
  },

  getModules: async (req: Request, res: Response) => {
    const filters = req.query;
    const modules = await moduleService.getModules(filters);

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Modules fetched successfully",
      data: { modules },
    });
  },

  getModuleById: async (req: Request, res: Response) => {
    const moduleId = req.params?.moduleId;

    if (!moduleId) {
      throw new BadRequestException("Module Id is required");
    }

    const module = await moduleService.getModuleById({ moduleId });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Module fetched successfully",
      data: { module },
    });
  },

  updateModuleById: async (req: Request, res: Response) => {
    const moduleId = req.params?.moduleId;
    const data = req.body;

    if (!moduleId) {
      throw new BadRequestException("Module Id is required");
    }

    const module = await moduleService.updateModuleById({ moduleId }, data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Module updated successfully",
      data: { module },
    });
  },

  archiveModule: async (req: Request, res: Response) => {
    const moduleId = req.params?.moduleId;

    if (!moduleId) {
      throw new BadRequestException("Module Id is required");
    }

    const module = await moduleService.archiveModule(
      { moduleId },
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
      message: "Module archived successfully",
      data: { module },
    });
  },

  restoreModule: async (req: Request, res: Response) => {
    const moduleId = req.params?.moduleId;

    if (!moduleId) {
      throw new BadRequestException("Module Id is required");
    }

    const module = await moduleService.restoreModule(
      { moduleId },
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
      message: "Module restored successfully",
      data: { module },
    });
  },

  deleteModule: async (req: Request, res: Response) => {
    const moduleId = req.params?.moduleId;

    if (!moduleId) {
      throw new BadRequestException("Module Id is required");
    }
    const module = await moduleService.deleteModule(
      { moduleId },
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
      message: "Module deleted successfully",
      data: { module },
    });
  },

  archiveModules: async (req: Request, res: Response) => {
    const { moduleIds } = req.body;

    const modules = await moduleService.archiveModules(
      { moduleIds },
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
      message: "Modules archived successfully",
      data: modules,
    });
  },

  restoreModules: async (req: Request, res: Response) => {
    const { moduleIds } = req.body;

    const modules = await moduleService.restoreModules(
      { moduleIds },
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
      message: "Modules restored successfully",
      data: modules,
    });
  },

  deleteModules: async (req: Request, res: Response) => {
    const { moduleIds } = req.body;

    const modules = await moduleService.deleteModules(
      { moduleIds },
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
      message: "Modules deleted successfully",
      data: modules,
    });
  },

getModulesWithResources: async(req: Request, res: Response) => {
  const modules = await prisma.module.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      resources: {
        where: { deletedAt: null },
        select: {
          id: true,
          name: true,
          key:true
        },
      },
    },
    orderBy: { name: "asc" },
  });

  res.json({ data: modules });
}


};

export default moduleController;
