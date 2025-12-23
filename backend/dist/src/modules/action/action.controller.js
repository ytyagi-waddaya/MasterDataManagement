import { sendResponse } from "../../utils/response.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import { BadRequestException, UnauthorizedException, } from "../../utils/appError.js";
import { PerformedByType } from "../../../prisma/generated/client.js";
import actionsService from "./action.service.js";
const actionsController = {
    createAction: async (req, res) => {
        const data = req.body;
        const action = await actionsService.createAction(data, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.CREATED,
            success: true,
            message: "Action created successfully",
            data: { action },
        });
    },
    //   createActionBulk: async (req: Request, res: Response) => {
    //     const { actions } = req.body;
    //     const createdActions = await actionsService.createActionsBulk(actions, {
    //       actorId: req.user?.id ?? null,
    //       ipAddress: req.ip,
    //       userAgent: req.get("user-agent") ?? null,
    //       performedBy: PerformedByType.USER,
    //     });
    //     sendResponse({
    //       res,
    //       statusCode: HTTPSTATUS.CREATED,
    //       success: true,
    //       message: "Actions created successfully",
    //       data: { createdActions },
    //     });
    //   },
    getActions: async (req, res) => {
        const filters = req.query;
        const actions = await actionsService.getActions(filters);
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Actions fetched successfully",
            data: { actions },
        });
    },
    getActionById: async (req, res) => {
        const actionId = req.params?.actionId;
        if (!actionId) {
            throw new UnauthorizedException("Action not found");
        }
        const action = await actionsService.getActionById({ actionId });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Actions fetched successfully",
            data: { action },
        });
    },
    updateActionById: async (req, res) => {
        const actionId = req.params?.actionId;
        const data = req.body;
        if (!actionId) {
            throw new BadRequestException("Action Id is required");
        }
        const action = await actionsService.updateActionById({ actionId }, data, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Action updated successfully",
            data: { action },
        });
    },
    archiveAction: async (req, res) => {
        const actionId = req.params?.actionId;
        if (!actionId) {
            throw new BadRequestException("action Id is required");
        }
        const action = await actionsService.archiveAction({ actionId }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Action archived successfully",
            data: { action },
        });
    },
    restoreAction: async (req, res) => {
        const actionId = req.params?.actionId;
        if (!actionId) {
            throw new BadRequestException("action Id is required");
        }
        const action = await actionsService.restoreAction({ actionId }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Action restored successfully",
            data: { action },
        });
    },
    deleteAction: async (req, res) => {
        const actionId = req.params?.actionId;
        if (!actionId) {
            throw new BadRequestException("Action Id is required");
        }
        const action = await actionsService.deleteAction({ actionId }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Action deleted successfully",
            data: { action },
        });
    },
    archiveActions: async (req, res) => {
        const { actionIds } = req.body;
        const actions = await actionsService.archiveActions({ actionIds }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Actions archived successfully",
            data: actions,
        });
    },
    restoreActions: async (req, res) => {
        const { actionIds } = req.body;
        const actions = await actionsService.restoreActions({ actionIds }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Actions restored successfully",
            data: actions,
        });
    },
    deleteActions: async (req, res) => {
        const { actionIds } = req.body;
        const actions = await actionsService.deleteActions({ actionIds }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Actions deleted successfully",
            data: actions,
        });
    },
};
export default actionsController;
//# sourceMappingURL=action.controller.js.map