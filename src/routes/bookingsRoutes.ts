import express from "express";
import {
  createBookingController,
  getUserBookingsController,
  cancelBookingController,
  createBookingAnsUserController,
} from "../controllers/bookingController";
import { authenticated } from "../middlewares/authMiddleware";
import { createUser } from "../models/users";

const router = express.Router();
router.post("/create", authenticated, createBookingController);
router.post("/createwithuser", createBookingAnsUserController);
router.get("/myBookings", authenticated, getUserBookingsController);

router.delete("/:id", authenticated, cancelBookingController);

export default router;
