import { Response } from "express";

export interface INodeError {
  name: string;
  message: string;
}

export interface IError {
  message: string;
  code?: string; // Useful for frontend to handle specific error types
  details?: any; // Any additional error details
}

export interface IErrorHandler {
  (response: Response, errorMessage?: string): void;
}

export type IAPIResponse<T> = {
  success: boolean;
  data?: T;
  error?: IError;
} & {
  success: boolean;
  data?: T;
  error: IError;
};

export interface IAPIResponseHandler<T> {
  (response: Response, data: T): void;
}
