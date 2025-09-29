import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: `.env` });

// Import your routes
import routes from "./routes/index";
import AppError from "./helper/appError";
import cookieParser from "cookie-parser";

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // your frontend origin
    credentials: true, // allow cookies
  })
);
app.use(express.json());
// app.use(logger);
app.use(cookieParser());

// Routes
app.use("/api", routes);

// 404 handler
app.use(function (req, res, next) {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404, true)
  );
});

// Global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message;
  let showToasts = err.showToasts ?? true;

  if (process.env.NODE_ENV === "production") {
    if ((err as any).code === 11000) {
      statusCode = 400;
      const value = (err as any).keyValue
        ? JSON.stringify((err as any).keyValue)
        : "";
      message = `Duplicate field value: ${value}. Please use another value.`;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    return res.status(statusCode).json({
      status,
      message,
      showToasts,
      error: err,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    status,
    message:
      statusCode === 500
        ? "Something went wrong. Please try again later."
        : message,
    showToasts,
  });
});


export default app;
