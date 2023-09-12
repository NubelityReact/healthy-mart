import { NextFunction, Request, Response } from "express";

const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Page not found" });
};

export default handleNotFound;
