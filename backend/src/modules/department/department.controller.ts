// src/modules/department/department.controller.ts

import { Request, Response } from "express";
import departmentService from "./department.service.js";
import { sendResponse } from "../../utils/response.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import { BadRequestException } from "../../utils/appError.js";
import { PerformedByType } from "../../../prisma/generated/client.js";

const departmentController = {

  // CREATE
  create: async (req: Request, res: Response) => {
    const department = await departmentService.createDepartment(
      req.body,
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Department created successfully",
      data: { department },
    });
  },

  // GET ALL
  getAll: async (req: Request, res: Response) => {
    const departments = await departmentService.getDepartments(req.query);

    sendResponse({
        res,
        statusCode: HTTPSTATUS.OK,
        success: true,
        message: "Departments fetched successfully",
        data: { departments },
    });
},


  // GET BY ID
  getById: async (req: Request, res: Response) => {
    const departmentId = req.params?.departmentId;
    if (!departmentId)
      throw new BadRequestException("Department Id is required");

    const department = await departmentService.getDepartmentById({
      departmentId,
    });

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Department fetched successfully",
      data: { department },
    });
  },

  // UPDATE
  update: async (req: Request, res: Response) => {
    const departmentId = req.params?.departmentId;
    if (!departmentId)
      throw new BadRequestException("Department Id is required");

    const department = await departmentService.updateDepartment(
      { departmentId },
      req.body,
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Department updated successfully",
      data: { department },
    });
  },

  // SINGLE ARCHIVE
  archiveDepartment: async (req: Request, res: Response) => {
    const departmentId = req.params?.departmentId;
    if (!departmentId)
      throw new BadRequestException("Department Id is required");

    const department = await departmentService.archiveDepartment(
      { departmentId },
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Department archived successfully",
      data: { department },
    });
  },

  // SINGLE RESTORE
  restoreDepartment: async (req: Request, res: Response) => {
    const departmentId = req.params?.departmentId;
    if (!departmentId)
      throw new BadRequestException("Department Id is required");

    const department = await departmentService.restoreDepartment(
      { departmentId },
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Department restored successfully",
      data: { department },
    });
  },

  // BULK ARCHIVE
  archiveDepartments: async (req: Request, res: Response) => {
    const { departmentIds } = req.body;

    if (!Array.isArray(departmentIds) || departmentIds.length === 0) {
      throw new BadRequestException("departmentIds array is required");
    }

    const result = await departmentService.archiveDepartments(
      { departmentIds },
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Departments archived successfully",
      data: result,
    });
  },

  // BULK RESTORE
  restoreDepartments: async (req: Request, res: Response) => {
    const { departmentIds } = req.body;

    if (!Array.isArray(departmentIds) || departmentIds.length === 0) {
      throw new BadRequestException("departmentIds array is required");
    }

    const result = await departmentService.restoreDepartments(
      { departmentIds },
      {
        actorId: req.user?.id ?? null,
        performedBy: PerformedByType.USER,
      }
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Departments restored successfully",
      data: result,
    });
  },

  // ASSIGN ROLES
  assignRole: async (req: Request, res: Response) => {
    const { departmentId, roleIds } = req.body;

    if (!departmentId || !Array.isArray(roleIds) || roleIds.length === 0) {
      throw new BadRequestException(
        "departmentId and roleIds array are required"
      );
    }

    const result = await departmentService.assignRoles(
      departmentId,
      roleIds
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Roles assigned successfully",
      data: result,
    });
  },

  // REMOVE ROLES
  removeRole: async (req: Request, res: Response) => {
    const { departmentId, roleIds } = req.body;

    if (!departmentId || !Array.isArray(roleIds) || roleIds.length === 0) {
      throw new BadRequestException(
        "departmentId and roleIds array are required"
      );
    }

    const result = await departmentService.removeRoles(
      departmentId,
      roleIds
    );

    sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Roles removed successfully",
      data: result,
    });
  },

  // HARD DELETE (Permanent)
deleteDepartment: async (req: Request, res: Response) => {
  const departmentId = req.params?.departmentId;

  if (!departmentId)
    throw new BadRequestException("Department Id is required");

  const result = await departmentService.deleteDepartment(
    { departmentId },
    {
      actorId: req.user?.id ?? null,
      performedBy: PerformedByType.USER,
    }
  );

  sendResponse({
    res,
    statusCode: HTTPSTATUS.OK,
    success: true,
    message: "Department deleted permanently",
    data: result,
  });
},

// BULK HARD DELETE
deleteDepartments: async (req: Request, res: Response) => {
  const { departmentIds } = req.body;

  if (!Array.isArray(departmentIds) || departmentIds.length === 0) {
    throw new BadRequestException("departmentIds array is required");
  }

  const result = await departmentService.deleteDepartments(
    { departmentIds },
    {
      actorId: req.user?.id ?? null,
      performedBy: PerformedByType.USER,
    }
  );

  sendResponse({
    res,
    statusCode: HTTPSTATUS.OK,
    success: true,
    message: "Departments deleted permanently",
    data: result,
  });
},
getDepartmentRoles: async (req: Request, res: Response) => {
  const { departmentId } = req.params;

  if (!departmentId) {
    throw new BadRequestException("DepartmentId is required");
  }

  const roles = await departmentService.getRolesByDepartment(departmentId);

  sendResponse({
    res,
    statusCode: HTTPSTATUS.OK,
    success: true,
    message: "Department roles fetched successfully",
    data: { roles },
  });
},

 
};

export default departmentController;
