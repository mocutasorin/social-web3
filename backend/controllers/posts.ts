import {Request, Response, NextFunction} from "express";
import PostModel from "../models/PostModel";

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await PostModel.find();
        res.json({posts})
    } catch(error) {
        next(error)
    }
}