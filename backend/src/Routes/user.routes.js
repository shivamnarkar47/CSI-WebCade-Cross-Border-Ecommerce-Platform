import express from "express";
import { createUser, loginUser, getUsers, getUserById, updateUser } from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/registerUser", createUser);
router.post("/loginUser", loginUser);
router.get("/getUsers", getUsers);
router.get("/users/:id", getUserById);
router.put("/updateUser/:id", updateUser);

export default router;
