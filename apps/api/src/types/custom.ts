import { Response } from "express";

export interface CustomError {
  message: string;
  name: string;
}

export interface IErrorHandler {
  (res: Response, error: CustomError): void;
}
