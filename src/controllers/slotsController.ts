import { getAvailableSlots } from "../models/slots";

import { TRequest } from "../types/TRequest";
import { Response, NextFunction } from "express";
import AppError from "../helper/appError";
export const getAvailableSlotsController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.query;
    const slots = await getAvailableSlots(
      typeof date === "string"
        ? date
        : new Date().toISOString().split("T")[0]
    );
    res.json(slots);
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};
