import { NextFunction, Response } from "express";
import { CustomError, IErrorHandler } from "../types/custom";

const errors: { [index: string]: IErrorHandler } = {
  JsonWebTokenError: (response) =>
    response.status(401).json({ error: "token is missing or invalid" }),
  defaultError: (res, error) => res.status(500).json(error),
};

const handleErrors = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const callback = errors[error.name] || errors.defaultError;
  callback(res, error);
};

export default handleErrors;
