import { AuthError, LoginError } from "../utils/errors/error.classes";
import {
  getUserByCustomField,
  getUserByIdService,
  updateUserService,
} from "./userService";
import jwt from "jsonwebtoken";
import config from "../config/config";
import bcrypt from "bcrypt";
import { TokenTypes } from "../config/constants";
import { sendEmail } from "./emailService";

export const loginService = async (email: string, password: string) => {
  const user = await getUserByCustomField("email", email);
  if (!user) {
    throw new LoginError();
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new LoginError();
  }
  return user;
};

export const passwordRecoveryService = async (email: string) => {
  // send email with token
  const user = await getUserByCustomField("email", email);
  if (!user) {
    throw new LoginError();
  }
  const token = signToken(user.id, {}, TokenTypes.RECOVERY_TOKEN);
  await updateUserService(user.id, { recoveryToken: token });
  await sendEmail(
    email,
    "Password recovery",
    `<a href="http://localhost:3000/password-recovery?token=${token}">Click here to reset your password</a>`
  );
  return { message: "Password recovery email sent" };
};

export const changePasswordService = async (
  token: string,
  password: string
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const { sub: userId } = verifyToken(token, TokenTypes.RECOVERY_TOKEN);
    const user = await getUserByIdService(userId as string);
    if (user!.recoveryToken !== token) {
      throw new AuthError();
    }
    await updateUserService(userId as string, { password: newPassword });
    return { message: "Password changed successfully" };
  } catch (error) {
    throw new AuthError();
  }
};

export const refreshTokenService = async (refreshToken: string) => {
  try {
    const { sub: userId } = verifyToken(refreshToken, TokenTypes.REFRESH_TOKEN);
    const user = await getUserByIdService(userId as string);
    if (!user) {
      throw new AuthError();
    }
    const accessToken = signToken(
      user.id,
      { email: user.email, role: user.role },
      TokenTypes.ACCESS_TOKEN
    );
    return { accessToken };
  } catch (error) {
    throw new AuthError();
  }
};

export const googleLoginService = async (profile: any) => {
  const user = await getUserByCustomField("googleId", profile.id);
  if (!user) {
    const newUser = {
      name: profile.displayName,
      email: profile.emails[0].value,
      password: "",
      phone: "",
      username: "",
      dateOfBirth: "",
      role: "user",
      googleId: profile.id,
    };
    return newUser;
  }
  return user;
};

export const signToken = (
  userId: string,
  payload: Object,
  tokenType: TokenTypes,
  options?: jwt.SignOptions
) => {
  const tokens = {
    [TokenTypes.ACCESS_TOKEN]: jwt.sign(payload, config.access_token, {
      expiresIn: "24h",
      subject: userId,
      ...options,
    }),
    [TokenTypes.REFRESH_TOKEN]: jwt.sign(payload, config.refresh_token, {
      expiresIn: "7d",
      subject: userId,
      ...options,
    }),
    [TokenTypes.RECOVERY_TOKEN]: jwt.sign(payload, config.recovery_token, {
      expiresIn: "1h",
      subject: userId,
      ...options,
    }),
  };

  return tokens[tokenType];
};

export const verifyToken = (token: string, tokenType: TokenTypes) => {
  const tokens = {
    [TokenTypes.ACCESS_TOKEN]: jwt.verify(token, config.access_token),
    [TokenTypes.REFRESH_TOKEN]: jwt.verify(token, config.refresh_token),
    [TokenTypes.RECOVERY_TOKEN]: jwt.verify(token, config.recovery_token),
  };

  return tokens[tokenType];
};
