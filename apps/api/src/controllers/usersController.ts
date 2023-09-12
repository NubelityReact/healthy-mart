import { NextFunction, Request, Response } from "express";
import {
  getUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService";
import errors from "../utils/errors/error.responses";
import UserClass from "../models/user";

// GET /users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET /users/:id
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json(errors.NotFoundError);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// POST /users
export const createUser = async (
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
  const user = { name, email, password, phone, username, dateOfBirth, role };
  try {
    const newUser = await createUserService(user);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// PUT /users/:id
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, email, password, phone, username, dateOfBirth }: UserClass =
    req.body;
  const user = { name, email, password, phone, username, dateOfBirth };

  try {
    const updatedUser = await updateUserService(id, user);
    if (!updatedUser) {
      return res.status(404).json(errors.NotFoundError);
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// DELETE /users/:id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUserService(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
