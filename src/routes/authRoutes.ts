import express from "express";
import {
  loginController,
  logoutController,
  getUserController,
} from "../controllers/authController";
import { authenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/me", authenticated, getUserController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
