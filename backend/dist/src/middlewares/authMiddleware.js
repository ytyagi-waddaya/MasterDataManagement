// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { UserJwtPayload} from "../types/auth";
// import { config } from "../config/app.config";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config.js";
export const requireAuth = (req, res, next) => {
    let token = undefined;
    /** --------------------------
     * 1️⃣ First try Authorization header
     * -------------------------- */
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    /** --------------------------
     * 2️⃣ If no header token, try HttpOnly cookie
     * -------------------------- */
    if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }
    /** --------------------------
     * 3️⃣ Reject if token missing
     * -------------------------- */
    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token provided" });
    }
    /** --------------------------
     * 4️⃣ Verify and attach decoded user
     * -------------------------- */
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch (err) {
        return res
            .status(401)
            .json({ message: "Unauthorized: Invalid or expired token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map