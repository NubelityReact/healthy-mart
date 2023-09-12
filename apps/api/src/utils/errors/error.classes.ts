export class NotFoundError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "NotFoundError";
  }
}

export class LoginError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "LoginError";
  }
}

export class DuplicateUser extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "DuplicateUser";
  }
}

export class AuthError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "AuthError";
  }
}

export class AuthorizationError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "AuthorizationError";
  }
}

export class PaymentError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "PaymentError";
  }
}

export class OutOfStockError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "OutOfStockError";
  }
}

export class CastError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "CastError";
  }
}

export class ValidationError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "ValidationError";
  }
}

export class JsonWebTokenError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "JsonWebTokenError";
  }
}

export class TokenExpiredError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "TokenExpiredError";
  }
}

export class InternalError extends Error {
  name: string;
  constructor(message?: string) {
    super(message ?? "");
    this.name = "InternalError";
  }
}
