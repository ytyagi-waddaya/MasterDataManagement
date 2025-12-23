import { Router } from "express";
import { sendResponse } from "../utils/response.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { BadRequestException } from "../utils/appError.js"; // or AppError directly
const router = Router();
router.get("/success", (req, res) => {
    const mockData = {
        userId: "12345",
        name: "John Doe",
    };
    sendResponse({
        res,
        statusCode: HTTPSTATUS.OK,
        message: "Test success route works",
        data: mockData,
        meta: {
            requestId: req.headers["x-request-id"] || "n/a",
        },
    });
});
router.get("/error", (req, res, next) => {
    throw new BadRequestException("This is a test error", undefined, {
        reason: "Just for testing",
    });
});
export default router;
//# sourceMappingURL=test.route.js.map