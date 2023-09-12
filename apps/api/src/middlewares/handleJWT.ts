import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "../utils/errors/error.classes";
import { verifyToken } from "../services/authService";
import { TokenTypes } from "../config/constants";

const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new JsonWebTokenError("No token provided");
  try {
    const verified = verifyToken(token, TokenTypes.ACCESS_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyTokenMiddleware;
