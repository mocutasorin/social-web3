import express from "express";
import {
  addUser,
  showUser,
  getUsers,
  signInUser,
  editUser,
  deleteUser,
  addFriendRequest,
  acceptFriendRequest,
} from "../controllers/users";

const router = express.Router();

router.get("/list", getUsers);
router.post("/signup", addUser);
router.post("/signin", signInUser);
router.post("/:id", showUser);
router.put("/addrequest/:userId", addFriendRequest);
router.put("/acceptrequest", acceptFriendRequest);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
