import { Request, Response, NextFunction } from "express";

// Get user model
import UserModel from "../models/UserModel";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  // Check if the user with the same email already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email address already exists" });
  }

  try {
    // Create a new user instance
    const newUser = new UserModel({
      ...req.body,
      createdAt: new Date().toISOString(),
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "The server is busy. Please try again later" });
    next(error);
  }
};
