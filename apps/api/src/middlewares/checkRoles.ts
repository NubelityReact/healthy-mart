import { NextFunction, Request, Response } from "express";
import { AuthorizationError } from "../utils/errors/error.classes";
import { JwtPayload } from "jsonwebtoken";
import { roles } from "../config/constants";

const checkRoles =
  (...roles: roles[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.user as JwtPayload;
    if (roles.includes(token.role)) {
      next();
    } else {
      throw new AuthorizationError();
    }
  };

export default checkRoles;
