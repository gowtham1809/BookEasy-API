class AppError extends Error {
  statusCode: any;
  status: string;
  showSnackbar: boolean;
  constructor(message: any, statusCode: number, showSnackbar = true) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failure" : "error";
    this.showSnackbar = showSnackbar;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
