import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import { PerformedByType } from "../../../prisma/generated/client.js";
import permissionService from "./permission.service.js";
import { BadRequestException } from "../../utils/appError.js";

const permissionController = {
  getPermissions: async (req: Request, res: Response) => {
    const filters = req.query;
    const permissions = await permissionService.getPermissions(filters);

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permissions fetched successfully",
      data: { permissions },
    });
  },

  getPermissionById: async (req: Request, res: Response) => {
    const  permissionId  = req.params?.permissionId;
    if (!permissionId)
      throw new BadRequestException("Permission ID is required");

    const permission = await permissionService.getPermissionById({
      permissionId,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permission fetched successfully",
      data: { permission },
    });
  },

  getPermissionsByRole: async (req: Request, res: Response) => {
    const  roleId  = req.params?.roleId;
    if (!roleId) throw new BadRequestException("Role ID is required");

    const permissions = await permissionService.getPermissionsByRole({
      roleId,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permissions fetched successfully",
      data: { permissions },
    });
  },

  getPermissionsByResource: async (req: Request, res: Response) => {
    const  resourceId  = req.params?.resourceId;
    if (!resourceId) throw new BadRequestException("Resource ID is required");

    const permissions = await permissionService.getPermissionsByResource({
      resourceId,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permissions fetched successfully",
      data: { permissions },
    });
  },

  getPermissionsByAction: async (req: Request, res: Response) => {
    const { actionId } = req.params;
    if (!actionId) throw new BadRequestException("Action ID is required");

    const permissions = await permissionService.getPermissionsByAction({
      actionId,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permissions fetched successfully",
      data: { permissions },
    });
  },

  generatePermissions: async (req: Request, res: Response) => {
    const result = await permissionService.generatePermissions();

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Permissions generated successfully",
      data: result,
    });
  },

  updatePermissionById: async (req: Request, res: Response) => {
    const { permissionId } = req.params;
    if (!permissionId)
      throw new BadRequestException("Permission ID is required");

    const permission = await permissionService.updatePermissionById(
      { permissionId },
      req.body,
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
      message: "Permission updated successfully",
      data: { permission },
    });
  },

  updatePermissionCondition: async (req: Request, res: Response) => {
    const { permissionId } = req.params;
    if (!permissionId)
      throw new BadRequestException("Permission ID is required");

    const permission = await permissionService.updatePermissionCondition(
      { permissionId },
      req.body,
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
      message: "Permission conditions updated successfully",
      data: { permission },
    });
  },

  archivePermission: async (req: Request, res: Response) => {
    const permissionId = req.params?.permissionId;

    if (!permissionId) {
      throw new BadRequestException("permission Id is required");
    }

    const archived = await permissionService.archivePermission(
      { permissionId },
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permission archived successfully",
      data: { archived },
    });
  },

  restorePermission: async (req: Request, res: Response) => {
    const permissionId = req.params?.permissionId;

    if (!permissionId) {
      throw new BadRequestException("permission Id is required");
    }

    const restored = await permissionService.restorePermission(
      { permissionId },
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permission restored successfully",
      data: { restored },
    });
  },

  deletePermission: async (req: Request, res: Response) => {
    const permissionId = req.params?.permissionId;

    if (!permissionId) {
      throw new BadRequestException("permission Id is required");
    }

    const deleted = await permissionService.deletePermission(
      { permissionId },
      {
        actorId: req.user?.id ?? null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent") ?? null,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permission deleted successfully",
      data: { deleted },
    });
  },

  archivePermissions: async (req: Request, res: Response) => {
    const { permissionIds } = req.body;
    const archived = await permissionService.archivePermissions(
      {
        permissionIds,
      },
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
      message: "Permissions archived successfully",
      data: archived,
    });
  },

  restorePermissions: async (req: Request, res: Response) => {
    const { permissionIds } = req.body;
    const restored = await permissionService.restorePermissions(
      {
        permissionIds,
      },
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
      message: "Permissions restored successfully",
      data: restored,
    });
  },

  deletePermissions: async (req: Request, res: Response) => {
    const { permissionIds } = req.body;
    const deleted = await permissionService.deletePermissions(
      {
        permissionIds,
      },
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
      message: "Permissions deleted successfully",
      data: deleted,
    });
  },


  assignPermissionsToRole: async (req: Request, res: Response) => {
    const { roleId, permissionIds } = req.body;

    if (!roleId) throw new BadRequestException("roleId required");
    if (!permissionIds?.length)
      throw new BadRequestException("permissionIds required");

    const result = await permissionService.assignPermissionsToRole({
      roleId,
      permissionIds,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Permissions assigned to role successfully",
      data: result,
    });
  },

//    savePermissionConditions: async(req: Request, res: Response) => {
//       const { permissionId } = req.params;
//       const payload = {
//         permissionId,
//         conditions: req.body.conditions,
//         expression: req.body.expression
//       };
//       const result = await permissionService.savePermissionConditions(payload);

//       sendResponse({
//       res,
//       statusCode: HTTPSTATUS.OK,
//       success: true,
//       message: "Permissions condition assigned to role successfully",
//       data: result,
//     });

//   },

//  getPermissionConditions: async(req: Request, res: Response) => {

//       const { permissionId } = req.params;
//       const result = await permissionService.getPermissionConditions(permissionId);
//       sendResponse({
//       res,
//       statusCode: HTTPSTATUS.OK,
//       success: true,
//       message: "fetched condition assigned to role successfully",
//       data: result,
//     });
//   }
};

export default permissionController;
