import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {getUsers, addUser, updateUser, removeUser} from "../Controllers/users.js";

const router = express.Router();

router.get("/", authenticateToken, getUsers)

router.post("/add", authenticateToken, addUser)

router.put("/:id", authenticateToken, updateUser)

router.delete("/:id", authenticateToken, removeUser)

export default router;