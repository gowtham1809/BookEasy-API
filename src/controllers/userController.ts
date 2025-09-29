import AppError from "../helper/appError";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserByEmail,
  resetPassword,
} from "../models/users";
import { TRequest } from "../types/TRequest";
import { Response, NextFunction } from "express";

export const createUserController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;
  try {
    await createUser(user);
    res
      .status(201)
      .json({ message: " User created SuccessFully !, please Login" });
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};

export const resetPasswordController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const updates = req.body;

  try {
    await resetPassword(updates);
    res.json({ message: "Password Reset Successful !" });
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};

export const findUserController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const email = req.query.email as string | undefined | null;
  if (!email) {
    return next(new AppError("Email is required", 400, true));
  }
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return next(new AppError("User not found", 404, true));
    }
    res.json(user);
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};

export const findAllUsersController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};

export const deleteUserController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    await deleteUser(userId);
    res.status(204).send();
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};
