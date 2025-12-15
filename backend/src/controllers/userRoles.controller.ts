import { Request, Response } from "express";
import { sendResponse } from "../utils/response.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { BadRequestException } from "../utils/appError.js";
import { PerformedByType } from "../../prisma/generated/client.js";
import userRolesService from "../services/userRoles.service.js";

const userRolesController = {
  assignUserRole: async (req: Request, res: Response) => {
    const userId = req.params?.userId;
    if (!userId) {
      throw new BadRequestException("UserId is required");
    }
    const roleId = req.params?.roleId;
    if (!roleId) {
      throw new BadRequestException("RoleId is required");
    }

    const userRole = await userRolesService.assignUserRole(
      { userId },
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
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Role assigned to user successfully",
      data: { userRole },
    });
  },

  /** Assign multiple roles to users (bulk) */
  assignUserRolesBulk: async (req: Request, res: Response) => {
    const data = req.body;

    const userRoles = await userRolesService.assignUserRolesBulk(data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "User roles assigned successfully",
      data: { userRoles },
    });
  },

  /** Revoke a single role from a user */
  revokeUserRole: async (req: Request, res: Response) => {
    const userId = req.params?.userId;
    if (!userId) {
      throw new BadRequestException("UserId is required");
    }
    const roleId = req.params?.roleId;
    if (!roleId) {
      throw new BadRequestException("RoleId is required");
    }

    const revoked = await userRolesService.revokeUserRole(
      { userId },
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
      message: "Role revoked from user successfully",
      data: { revoked },
    });
  },

  /** Revoke multiple roles from users (bulk) */
  revokeUserRolesBulk: async (req: Request, res: Response) => {
    const data = req.body;

    const revoked = await userRolesService.revokeUserRolesBulk(data, {
      actorId: req.user?.id ?? null,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? null,
      performedBy: PerformedByType.USER,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "User roles revoked successfully",
      data: { revoked },
    });
  },

  /** Get all roles assigned to a specific user */
  getRolesByUser: async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    const roles = await userRolesService.getRolesByUser({ userId });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Roles fetched successfully for user",
      data: { roles },
    });
  },

  /** Get all users assigned to a specific role */
  getUsersByRole: async (req: Request, res: Response) => {
    const roleId = req.params.roleId;

    if (!roleId) {
      throw new BadRequestException("Role ID is required");
    }

    const users = await userRolesService.getUsersByRole({ roleId: roleId });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Users fetched successfully for role",
      data: { users },
    });
  },
};

export default userRolesController;
