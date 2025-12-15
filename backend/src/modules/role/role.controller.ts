import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import { PerformedByType } from "../../../prisma/generated/client.js";
import rolesService from "./role.service.js";
import { BadRequestException } from "../../utils/appError.js";

const roleController = {
  createRole: async (req: Request, res: Response) => {
    const data = req.body;

    const role = await rolesService.createRole(data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Role created successfully",
      data: { role },
    });
  },

  getRoles: async (req: Request, res: Response) => {
    const filters = req.query;

    const roles = await rolesService.getRoles(filters);

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Roles fetched successfully",
      data: { roles },
    });
  },

  getRoleById: async (req: Request, res: Response) => {
    const roleId = req.params?.roleId;
    if (!roleId) throw new BadRequestException("Role Id is required");

    const role = await rolesService.getRoleById({ roleId });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Role fetched successfully",
      data: { role },
    });
  },

  updateRoleById: async (req: Request, res: Response) => {
    const roleId = req.params?.roleId;
    const data = req.body;
    if (!roleId) throw new BadRequestException("Role Id is required");

    const role = await rolesService.updateRoleById({ roleId }, data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Role updated successfully",
      data: { role },
    });
  },

  archiveRole: async (req: Request, res: Response) => {
    const roleId = req.params?.roleId;
    if (!roleId) throw new BadRequestException("Role Id is required");

    const role = await rolesService.archiveRole(
      { roleId },
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
      message: "Role archived successfully",
      data: { role },
    });
  },

  restoreRole: async (req: Request, res: Response) => {
    const roleId = req.params?.roleId;
    if (!roleId) throw new BadRequestException("Role Id is required");

    const role = await rolesService.restoreRole(
      { roleId },
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
      message: "Role restored successfully",
      data: { role },
    });
  },

  deleteRole: async (req: Request, res: Response) => {
    const roleId = req.params?.roleId;
    if (!roleId) throw new BadRequestException("Role Id is required");

    const role = await rolesService.deleteRole(
      { roleId },
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
      message: "Role deleted successfully",
      data: { role },
    });
  },

  archiveRoles: async (req: Request, res: Response) => {
    const { roleIds } = req.body;

    const roles = await rolesService.archiveRoles(
      { roleIds },
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
      message: "Roles soft deleted successfully",
      data: roles,
    });
  },

  restoreRoles: async (req: Request, res: Response) => {
    const { roleIds } = req.body;

    const roles = await rolesService.restoreRoles(
      { roleIds },
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
      message: "Roles restored successfully",
      data: roles,
    });
  },

  deleteRoles: async (req: Request, res: Response) => {
    const { roleIds } = req.body;

    const roles = await rolesService.deleteRoles(
      { roleIds },
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
      message: "Roles deleted successfully",
      data: roles,
    });
  },
};

export default roleController;
