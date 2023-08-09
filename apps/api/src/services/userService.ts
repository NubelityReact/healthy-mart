import { DocumentType } from "@typegoose/typegoose";
import UserClass, { User } from "../models/user";

export const getUserService = async (): Promise<DocumentType<UserClass>[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Failed to get users");
  }
};

export const getUserByIdService = async (
  id: string
): Promise<DocumentType<UserClass> | null> => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("Failed to get user by Id");
  }
};

export const getUserByCustomField = async (
  fieldName: string,
  fieldValue: any
): Promise<DocumentType<UserClass> | null> => {
  try {
    const user = await User.findOne({ [fieldName]: fieldValue });
    return user;
  } catch (error) {
    throw new Error("Failed to get user by Id");
  }
};

export const createUserService = async (
  userData: UserClass
): Promise<DocumentType<UserClass>> => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const updateUserService = async (
  id: string,
  userData: UserClass
): Promise<DocumentType<UserClass> | null> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUserService = async (
  id: string
): Promise<DocumentType<UserClass> | null> => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
