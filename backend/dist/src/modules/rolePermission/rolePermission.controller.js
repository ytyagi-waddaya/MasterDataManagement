import { sendResponse } from "../../utils/response.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import { BadRequestException } from "../../utils/appError.js";
import rolePermissionService from "./rolePermission.service.js";
import { prisma } from "../../lib/prisma.js";
import { updateAccessLevelSchema } from "./dto/rolePermission.dto.js";
export const rolePermissionController = {
    updateAccessLevel: async (req, res) => {
        const { roleId, permissionId } = req.params;
        // const input = req.body;
        const input = updateAccessLevelSchema.parse(req.body);
        if (!roleId || !permissionId) {
            throw new BadRequestException("roleId and permissionId are required");
        }
        const updated = await rolePermissionService.updateAccessLevel({
            roleId,
            permissionId,
            input,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Role permission updated successfully",
            data: { updated },
        });
    },
    grantAllModulePermissions: async (req, res) => {
        const { roleId, moduleId } = req.params;
        if (!roleId || !moduleId) {
            throw new BadRequestException("roleId and moduleId are required");
        }
        const result = await rolePermissionService.grantAllModulePermissions({
            roleId,
            moduleId,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "All module permissions granted to role",
            data: result,
        });
    },
    revokeAllModulePermissions: async (req, res) => {
        const { roleId, moduleId } = req.params;
        if (!roleId || !moduleId) {
            throw new BadRequestException("roleId and moduleId are required");
        }
        const result = await rolePermissionService.revokeAllModulePermissions({
            roleId,
            moduleId,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "All module permissions revoked from role",
            data: result,
        });
    },
    getRolePermissions: async (req, res) => {
        const roleId = req.params?.roleId;
        if (!roleId) {
            throw new BadRequestException("role id is required");
        }
        const permissions = await prisma.rolePermission.findMany({
            where: { roleId },
            include: { permission: true },
        });
        sendResponse({
            res,
            success: true,
            statusCode: HTTPSTATUS.OK,
            message: "Role permissions fetched",
            data: { permissions },
        });
    },
    // saveRolePermissionConditions: async (req: Request, res: Response) => {
    //   const { rolePermissionId } = req.params;
    //   const payload = {
    //     rolePermissionId,
    //     conditions: req.body.conditions,
    //     expression: req.body.expression,
    //   };
    //   const result = await rolePermissionService.saveRolePermissionConditions(
    //     payload
    //   );
    //   sendResponse({
    //     res,
    //     success: true,
    //     statusCode: HTTPSTATUS.OK,
    //     message: "Role permissions condition fetched",
    //     data: { result },
    //   });
    // },
    // getRolePermissionConditions: async (req: Request, res: Response) => {
    //   const { rolePermissionId } = req.params;
    //   const result = await rolePermissionService.getRolePermissionConditions(
    //     rolePermissionId
    //   );
    //   sendResponse({
    //     res,
    //     success: true,
    //     statusCode: HTTPSTATUS.OK,
    //     message: "Role permissions condition fetched",
    //     data: { result },
    //   });
    // },
};
export default rolePermissionController;
//# sourceMappingURL=rolePermission.controller.js.map