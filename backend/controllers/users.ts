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

// Login user
export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // Check if the user is registered
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }

  const isPasswordValid = await user.comparePasswords(password);
  if (isPasswordValid) {
    res.status(200).json("newUser");
  } else {
    res.status(400).json({ message: "not match" });
  }
};

// Show user details
export const showUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { first_name, last_name, profilePicture, birth_date, gender } =
    req.body;

  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  } else {
    res.status(200).json(user);
  }
};

// Update user details
export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { first_name, last_name, profilePicture, birth_date, gender } =
    req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check and update modified fields
    if (user.first_name !== first_name) {
      user.first_name = first_name;
    }
    if (user.last_name !== last_name) {
      user.last_name = last_name;
    }
    if (user.gender !== gender) {
      user.gender = gender;
    }
    if (user.profilePicture !== profilePicture) {
      user.profilePicture = profilePicture;
    }
    if (user.birth_date !== birth_date) {
      user.birth_date = new Date(birth_date);
    }

    // Save only modified fields
    const modifiedFields = user.modifiedPaths();
    if (modifiedFields.length > 0) {
      await user.save();
    }

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user details" });
  }
};

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user details" });
  }
};
