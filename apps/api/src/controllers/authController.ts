import { Response, Request, NextFunction } from "express";
import { createUserService } from "../services/userService";
import UserClass from "../models/user";
import {
  changePasswordService,
  googleLoginService,
  loginService,
  passwordRecoveryService,
  refreshTokenService,
  signToken,
} from "../services/authService";
import { TokenTypes } from "../config/constants";

// GET /auth/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email, password);
    const token = signToken(
      user.id,
      { email: user.email, role: user.role },
      TokenTypes.ACCESS_TOKEN
    );
    const refreshToken = signToken(
      user.id,
      { email: user.email, role: user.role },
      TokenTypes.REFRESH_TOKEN
    );
    res
      .status(200)
      .json({ message: "Logged in successfully", token, refreshToken });
  } catch (error) {
    next(error);
  }
};

// POST /auth/register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    password,
    phone,
    username,
    dateOfBirth,
    role,
  }: UserClass = req.body;
  const user = { email, name, password, phone, username, dateOfBirth, role };
  try {
    const newUser = await createUserService(user);
    const token = signToken(
      newUser.id,
      { email: newUser.email, role: newUser.role },
      TokenTypes.ACCESS_TOKEN
    );
    const refreshToken = signToken(
      newUser.id,
      { email: newUser.email, role: newUser.role },
      TokenTypes.REFRESH_TOKEN
    );
    res
      .status(200)
      .json({ message: "Logged in successfully", token, refreshToken });
  } catch (error) {
    next(error);
  }
};

// POST /auth/password-recovery
export const passwordRecovery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const json = await passwordRecoveryService(email);
    res.status(200).json(json);
  } catch (error) {
    next(error);
  }
};

// POST /auth/change-password
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const token = req.headers.authorization as string;
    const json = await changePasswordService(token, password);
    res.status(200).json(json);
  } catch (error) {
    next(error);
  }
};

//POST /auth/refresh-token
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const json = await refreshTokenService(refreshToken);
    res.status(200).json(json);
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profile } = req.body;
    const json = await googleLoginService(profile);
    res.status(200).json(json);
  } catch (error) {
    next(error);
  }
};
