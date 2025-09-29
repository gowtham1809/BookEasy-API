import { NextFunction, Response } from "express";
import {
  createBooking,
  deleteBooking,
  findAllBookings,
  findBookingsByUserId,
} from "../models/bookings";
import { TRequest } from "../types/TRequest";
import AppError from "../helper/appError";
import { createUser } from "../models/users";

export const createBookingController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const { booking_date, slot_id } = req.body;
  const user_id = req.user.id;
  try {
    const newBooking = await createBooking({ slot_id, user_id, booking_date });
    res.status(201).json(newBooking);
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};

export const createBookingAnsUserController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const { slot_id, ...user } = req.body;
  const booking_date = new Date().toDateString();
  try {
    const newUser = await createUser(user);
    const newBooking = await createBooking({
      slot_id,
      user_id: newUser.id,
      booking_date,
    });
    res.status(201).json({ message: " Booking created SuccessFully !" });
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};

export const getUserBookingsController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  try {
    const bookings = await findBookingsByUserId(userId);
    res.json(bookings);
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};

export const cancelBookingController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const bookingId = req.params.id;
  try {
    await deleteBooking(+bookingId);
    res.status(204).send();
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};

export const getAllBookingsController = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await findAllBookings();
    res.json(bookings);
  } catch (error: Error | any) {
    return next(new AppError(error.message, 500, true));
  }
};
