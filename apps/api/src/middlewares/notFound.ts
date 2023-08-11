import { Request, Response, NextFunction } from "express";

const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not found" });
};

export default handleNotFound;
