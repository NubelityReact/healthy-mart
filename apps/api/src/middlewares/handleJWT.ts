import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const handleJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decodedData = jwt.verify(token, config.jwt_secret);
    req.user = decodedData;
    next();
  } catch (error) {
    next(error);
  }
};

export default handleJWT;
