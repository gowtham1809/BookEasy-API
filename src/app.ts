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
  next({
    status: 404,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
});

export default app;
