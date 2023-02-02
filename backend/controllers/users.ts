import {Request, Response, NextFunction} from "express";

// Get user model
import UserModel from "../models/UserModel";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find();
        res.json({users})
    } catch(error) {
        next(error)
    }
}

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const newUser = new UserModel({...user, createdAt: new Date().toISOString()})
    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch(error) {
        next(error)
    }
}