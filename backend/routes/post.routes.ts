import express from "express";
import {
  addComment,
  addLike,
  addPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
} from "../controllers/posts";

const router = express.Router();

router.post("/add", addPost);
router.post("/addcomment", addComment);
router.put("/like/:id", addLike);
router.put("/:id", editPost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.get("/", getPosts);

export default router;
