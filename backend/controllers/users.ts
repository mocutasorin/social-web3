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