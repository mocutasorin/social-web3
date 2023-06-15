import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Get user model
import UserModel from "../models/UserModel";
import { Types } from "mongoose";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json({ users });
  } catch (error) {
    res.status(404).json({ message: "There are not any user registered." });
  }
};

export const addUser = async (req: Request, res: Response) => {
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
    // Generate and sign a JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.AUTHENTICATION_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json({ token, user: newUser._id });
  } catch (error) {
    res
      .status(400)
      .json({ message: "The server is busy. Please try again later" });
  }
};

// Login user
export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user is registered
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await user.comparePasswords(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or passsword" });
    }

    // Generate and sign a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.AUTHENTICATION_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Sign-in failed" });
  }
};

// Show user details
export const showUser = async (req: Request, res: Response) => {
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
export const editUser = async (req: Request, res: Response) => {
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
export const deleteUser = async (req: Request, res: Response) => {
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

// Add friend request
export const addFriendRequest = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { myId } = req.body;

  try {
    const person = await UserModel.findById(userId);
    if (person?.friendRequests.includes(myId)) {
      return res.status(401).json({ message: "You sent already a request." });
    }
    person?.friendRequests.push(myId);
    await person?.save();
    res.status(200).json({ message: "Succes" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user details" });
  }
};

// Accept a friend request
export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { myId, friendId } = req.body;

  try {
    // Find the user who is accepting the friend request
    const user = await UserModel.findById(myId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the friend request exists
    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ message: "Friend request not found" });
    }

    // Check if the user is already a friend
    if (user.friends.includes(friendId)) {
      return res
        .status(400)
        .json({ message: `You and ${user.first_name} are friends already.` });
    }

    // Add the friend to the user's friends list
    user.friends.push(friendId);
    // Remove the friend request from the user's friendRequests list
    user.friendRequests = user.friendRequests.filter(
      (requestId) => requestId.toString() !== friendId
    );

    // Save the updated user
    await user.save();

    // Find the friend who sent the request
    const friend = await UserModel.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Add the user to the friend's friends list
    friend.friends.push(myId);

    // Save the updated friend
    await friend.save();

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};
