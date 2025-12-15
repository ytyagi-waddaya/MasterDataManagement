import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import authController from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refreshToken));
router.post("/logout", requireAuth ,asyncHandler(authController.logout));
router.get("/debug", (req, res) => {
  console.log("cookies:", req.cookies);
  console.log("user:", req.user);
  res.json({ cookies: req.cookies, user: req.user });
});

export default router;