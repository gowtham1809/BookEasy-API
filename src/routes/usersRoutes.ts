import express from "express";
import {
  createUserController,
  resetPasswordController,
} from "../controllers/userController";

const usersRouter = express.Router();

usersRouter.post("/register", createUserController);
usersRouter.post("/reset", resetPasswordController);

export default usersRouter;
