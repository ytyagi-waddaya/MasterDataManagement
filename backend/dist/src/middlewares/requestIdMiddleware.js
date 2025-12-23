// src/middleware/requestId.ts
import { v4 as uuid } from "uuid";
export const requestIdMiddleware = (req, res, next) => {
    const incomingRequestId = req.header("x-request-id");
    const requestId = incomingRequestId || uuid();
    req.requestId = requestId;
    // Keep header casing standard
    res.setHeader("X-Request-Id", requestId);
    next();
};
//# sourceMappingURL=requestIdMiddleware.js.map