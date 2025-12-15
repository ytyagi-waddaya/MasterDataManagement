import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/app.config.js";
import crypto from "crypto";
import { UserJwtPayload } from "../types/auth.js";


const JWT_SECRET = config.JWT_SECRET as jwt.Secret;
const ACCESS_TOKEN_EXPIRES_IN = (config.JWT_ACCESS_EXPIRES_IN ||
  "1h") as `${number}${"s" | "m" | "h" | "d"}`;
const REFRESH_TOKEN_EXPIRES_IN_DAYS = parseInt(
  config.JWT_REFRESH_EXPIRES_IN_DAYS || "30",
  10
);

export const generateJwtToken = (payload: UserJwtPayload) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const options: SignOptions = { expiresIn: ACCESS_TOKEN_EXPIRES_IN };

  const token = jwt.sign(payload, JWT_SECRET, options);

  return token;
};

export const createRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const verifyJwtToken = (token: string): UserJwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserJwtPayload;
  } catch {
    return null;
  }
};

export const generateRefreshTokenData = () => {
  const token = createRefreshToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(
    Date.now() + REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000
  );
  return { token, tokenHash, expiresAt };
};
