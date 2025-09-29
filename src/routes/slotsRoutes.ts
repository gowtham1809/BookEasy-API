import express from "express";
import { authenticated } from "../middlewares/authMiddleware";
import { getAvailableSlotsController } from "../controllers/slotsController";
const router = express.Router();

router.get("/", authenticated, getAvailableSlotsController);
router.get("/today", getAvailableSlotsController);
export default router;
