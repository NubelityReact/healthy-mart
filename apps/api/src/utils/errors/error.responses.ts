import { IAPIResponse } from "../../types/custom";

export const NotFoundError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "Resource not found",
    code: "RESOURCE_NOT_FOUND",
  },
});

export const LoginError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "Invalid username or password",
    code: "LOGIN_FAILED",
  },
});

export const DuplicateUser: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "User already exists",
    code: "DUPLICATE_USER",
  },
});

export const AuthError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "Authentication required",
    code: "AUTH_REQUIRED",
  },
});

export const AuthorizationError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "You don't have permission to perform this action",
    code: "PERMISSION_DENIED",
  },
});

export const PaymentError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "Payment failed",
    code: "PAYMENT_FAILED",
    details: {
      providerMessage: "Card declined", // Additional details from payment provider
    },
  },
});

export const OutOfStockError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "Product is out of stock",
    code: "OUT_OF_STOCK",
  },
});

export const CastError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "id used is malformed",
    code: "CAST_ERROR",
  },
});

export const ValidationError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "Validation failed",
    code: "VALIDATION_ERROR",
  },
});

export const JsonWebTokenError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "token missing or invalid",
    code: "TOKEN_ERROR",
  },
});

export const TokenExpiredError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "token expired",
    code: "TOKEN_EXPIRED",
  },
});

export const InternalError: (message?: string) => IAPIResponse<null> = (
  message
) => ({
  success: false,
  error: {
    message: message || "Internal server error",
    code: "INTERNAL_ERROR",
  },
});

export default {
  AuthError,
  AuthorizationError,
  CastError,
  DuplicateUser,
  JsonWebTokenError,
  LoginError,
  NotFoundError,
  OutOfStockError,
  PaymentError,
  TokenExpiredError,
  ValidationError,
  InternalError,
};
