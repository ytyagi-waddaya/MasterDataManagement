import jwt from "jsonwebtoken";
import { config } from "../config/app.config.js";
import crypto from "crypto";
const JWT_SECRET = config.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = (config.JWT_ACCESS_EXPIRES_IN ||
    "1h");
const REFRESH_TOKEN_EXPIRES_IN_DAYS = parseInt(config.JWT_REFRESH_EXPIRES_IN_DAYS || "30", 10);
export const generateJwtToken = (payload) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const options = { expiresIn: ACCESS_TOKEN_EXPIRES_IN };
    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
};
export const createRefreshToken = () => {
    return crypto.randomBytes(40).toString("hex");
};
export const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};
export const verifyJwtToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch {
        return null;
    }
};
export const generateRefreshTokenData = () => {
    const token = createRefreshToken();
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000);
    return { token, tokenHash, expiresAt };
};
//# sourceMappingURL=jwt.js.map