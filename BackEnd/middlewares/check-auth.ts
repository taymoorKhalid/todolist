// middleware/check-auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../models/http-error";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string; // Add userId to the Request interface
  }
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") return next();

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new HttpError("Authentication failed", 403));

  try {
    const decodedToken = jwt.verify(token, "supersecret_dontshare") as {
      userId: string;
    };
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed", 403));
  }
};

export default checkAuth;
