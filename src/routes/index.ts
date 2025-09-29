import express from "express";
import usersRouter from "./usersRoutes";
import authRouter from "./authRoutes";
import bookingsRouter from "./bookingsRoutes";
import slotsRouter from "./slotsRoutes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/bookings", bookingsRouter);
router.use("/slots", slotsRouter);

export default router;
