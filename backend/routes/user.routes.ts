import express from "express";
import {
  addUser,
  showUser,
  getUsers,
  signInUser,
  editUser,
  deleteUser,
} from "../controllers/users";

const router = express.Router();

router.get("/list", getUsers);
router.post("/signup", addUser);
router.post("/signin", signInUser);
router.post("/:id", showUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
