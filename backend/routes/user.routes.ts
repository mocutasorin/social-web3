import express from "express";
import { addUser, getUsers } from "../controllers/users";

const router = express.Router();

router.get("/list", getUsers)
router.post("/signup", addUser)


export default router;