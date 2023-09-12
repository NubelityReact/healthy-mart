import { Request, Response, NextFunction } from "express";
import { IErrorHandler, INodeError } from "../types/custom";
import * as errors from "../utils/errors/error.responses";

type keys = Exclude<keyof typeof errors, "default">;

const errorsDict: Record<keys, IErrorHandler> = {
  AuthError: (response, message) =>
    response.status(401).json(errors.AuthError(message)),
  AuthorizationError: (response, message) =>
    response.status(403).json(errors.AuthorizationError(message)),
  CastError: (response, message) =>
    response.status(400).json(errors.CastError(message)),
  DuplicateUser: (response, message) =>
    response.status(409).json(errors.DuplicateUser(message)),
  JsonWebTokenError: (response, message) =>
    response.status(401).json(errors.JsonWebTokenError(message)),
  LoginError: (response, message) =>
    response.status(401).json(errors.LoginError(message)),
  NotFoundError: (response, message) =>
    response.status(404).json(errors.NotFoundError(message)),
  OutOfStockError: (response, message) =>
    response.status(409).json(errors.OutOfStockError(message)),
  PaymentError: (response, message) =>
    response.status(409).json(errors.PaymentError(message)),
  TokenExpiredError: (response, message) =>
    response.status(401).json(errors.TokenExpiredError(message)),
  ValidationError: (response, message) =>
    response.status(409).json(errors.ValidationError(message)),
  InternalError: (response, message) =>
    response.status(500).json(errors.InternalError(message)),
};

const errorsHandler = (
  error: INodeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorName = error.name as keys;
  console.log({ error });
  const handler = errorsDict[errorName] || errorsDict.InternalError;
  handler(res, error.message);
};

export default errorsHandler;
