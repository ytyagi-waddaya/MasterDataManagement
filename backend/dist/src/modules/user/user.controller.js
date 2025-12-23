import usersService from "./user.service.js";
import { sendResponse } from "../../utils/response.js";
import { HTTPSTATUS } from "../../config/http.config.js";
import { BadRequestException, } from "../../utils/appError.js";
import { PerformedByType } from "../../../prisma/generated/client.js";
const usersController = {
    createUser: async (req, res) => {
        const data = req.body;
        const user = await usersService.createUser(data, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.CREATED,
            success: true,
            message: "User created successfully",
            data: { user },
        });
    },
    //   createUsers: async (req: Request, res: Response) => {
    //     const data = req.body;
    //     const user = await usersService.createUsers(data, {
    //       actorId: req.user?.id ?? null,
    //       ipAddress: req.ip,
    //       userAgent: req.get("user-agent") ?? null,
    //       performedBy: PerformedByType.USER,
    //     });
    //     sendResponse({
    //       res,
    //       statusCode: HTTPSTATUS.CREATED,
    //       success: true,
    //       message: "User created successfully",
    //       data: { user },
    //     });
    //   },
    getUserStats: async (req, res) => {
        const userStats = await usersService.getUserStats();
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "User stats fetched successfully",
            data: { userStats },
        });
    },
    me: async (req, res) => {
        const userId = req.user?.id;
        //  const userId = req.params?.id ;
        if (!userId) {
            throw new BadRequestException("UserId is required");
        }
        const me = await usersService.me({ userId });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "User fetched successfully",
            data: { me },
        });
    },
    getUsers: async (req, res) => {
        const filters = req.query;
        const users = await usersService.getUsers(filters);
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Users fetched successfully",
            data: { users },
        });
    },
    getUser: async (req, res) => {
        const userId = req.params?.userId;
        if (!userId) {
            throw new BadRequestException("UserId is required");
        }
        const user = await usersService.getUser({ userId });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "User fetched successfully",
            data: { user },
        });
    },
    updateUser: async (req, res) => {
        const userId = req.params?.userId;
        const data = req.body;
        if (!userId) {
            throw new BadRequestException("UserId is required");
        }
        const user = await usersService.updateUser({ userId }, data, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "User updated successfully",
            data: { user },
        });
    },
    archiveUser: async (req, res) => {
        const userId = req.params?.userId;
        if (!userId) {
            throw new BadRequestException("UserId is required");
        }
        const user = await usersService.archiveUser({ userId }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "User archived successfully",
            data: { user },
        });
    },
    restoreUser: async (req, res) => {
        const userId = req.params?.userId;
        if (!userId) {
            throw new BadRequestException("UserId is required");
        }
        const user = await usersService.restoreUser({ userId }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "User restored successfully",
            data: { user },
        });
    },
    deleteUser: async (req, res) => {
        const userId = req.params?.userId;
        if (!userId) {
            throw new BadRequestException("UserId is required");
        }
        const user = await usersService.deleteUser({ userId }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "User deleted successfully",
            data: { user },
        });
    },
    archiveUsers: async (req, res) => {
        const { userIds } = req.body;
        const users = await usersService.archiveUsers({ userIds }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Users archived successfully",
            data: users,
        });
    },
    restoreUsers: async (req, res) => {
        const { userIds } = req.body;
        const users = await usersService.restoreUsers({ userIds }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Users restored successfully",
            data: users,
        });
    },
    deleteUsers: async (req, res) => {
        const { userIds } = req.body;
        const users = await usersService.deleteUsers({ userIds }, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "Users deleted successfully",
            data: users,
        });
    },
};
export default usersController;
//# sourceMappingURL=user.controller.js.map