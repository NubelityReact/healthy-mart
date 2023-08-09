import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUserService,
  getUserByCustomField,
} from "../services/userService";
import config from "../config/config";
import UserClass from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByCustomField("email", email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "passInvalid email or password" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwt_secret
  );
  res.status(200).json({ message: "Logged in successfully", token });
};

export const register = async (req: Request, res: Response) => {
  const { name, lastName, email, password, phone }: UserClass = req.body;
  const user = { name, lastName, email, password, phone };

  try {
    const newUser = await createUserService(user);
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      config.jwt_secret
    );
    res.status(200).json({ message: "Register successfully", token });
  } catch (error) {
    res.status(200).json({ message: "Internal server errro" });
  }
};
