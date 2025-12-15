import "express";
import { UserJwtPayload } from "../types/auth"; // adjust path as needed

declare global {
  namespace Express {
    interface Request {
      /** Authenticated user decoded from JWT */
      user?: UserJwtPayload;

      /** Cookie-parser injected cookies */
      cookies: Record<string, string>;
    }
  }
}
