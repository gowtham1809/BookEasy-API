import { Request, Response, NextFunction } from "express";
import { TRequest } from "../types/TRequest";
import jwt from "jsonwebtoken";
import AppError from "../helper/appError";

export const authenticated = (
  req: TRequest,
  res: Response,
  next: NextFunction 
) => {
  const token = req?.cookies?.token || "";
  if (!token) return res.status(401).json({ message: "Unauthorized"});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return new AppError("Invalid token", 401, true);
  }
};

export const authorized = (...roles: string[]) => {
    return (req: TRequest, res: Response, next: NextFunction) => {
      const userRole = (req as TRequest).user.role;
      if (!roles.includes(userRole)) {
        return next(
          new AppError(
            'You do not have the permissions to perform this action',
            403
          )
        );
      }
      next();
    };
  };

;
