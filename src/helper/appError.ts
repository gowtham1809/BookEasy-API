class AppError extends Error {
  statusCode: any;
  status: string;
  showToasts: boolean;
  constructor(message: any, statusCode: number, showToasts = true) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failure" : "error";
    this.showToasts = showToasts;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
