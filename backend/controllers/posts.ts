import { Request, Response, NextFunction } from "express";
import PostModel, { TPost } from "../models/PostModel";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ message: "No posts to retrieve" });
  }
};

export const addPost = async (req: Request, res: Response) => {
  const { user, content, image } = req.body;
  try {
    const newPost: TPost = {
      user,
      content,
      image,
      likes: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const post = await PostModel.create(newPost);

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

export const editPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, content, image } = req.body;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    post.content = content;
    post.image = image;

    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { postId, user, content } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = { user, content };
    post.comments.push(newComment);

    const updatedPost = await post.save();
    res
      .status(200)
      .json({ message: "Comment added successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to add a comment" });
  }
};

export const addLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res
        .status(404)
        .json({ message: "You have already liked this post." });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to like post" });
  }
};
