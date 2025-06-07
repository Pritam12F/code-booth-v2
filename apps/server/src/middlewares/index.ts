import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const AuthMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) {
    res.status(400).json({
      message: "Authorization header not provided",
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      req.headers["authorization"].split(" ")[1],
      process.env.NEXTAUTH_SECRET!
    );

    next();
  } catch (e) {
    console.error(e);
  }
};
