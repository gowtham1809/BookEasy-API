import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface TRequest extends Request {
  user?: any;
  token?: any | JwtPayload;
  loginType?: string;
}
