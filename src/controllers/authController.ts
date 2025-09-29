import { Request, Response, NextFunction } from "express";
import { TRequest } from "../types/TRequest";
import { findUserByEmail, getUserById } from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../helper/appError";

export const loginController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email and password are required", 400, true));
  }
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return next(new AppError("User not found", 404, true));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError("Invalid password", 401, true));
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "hkfhkfhjfjhgjhhg",
      {
        expiresIn: "10h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 30 * 60 * 1000), // 0.5 hour
      sameSite: "none",
    });

    res.json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    return next(new AppError("Internal server error", 500));
  }
};
export const getUserController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error("Error finding user:", err);
    return next(new AppError("Internal server error", 500));
  }
};
export const logoutController = (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
