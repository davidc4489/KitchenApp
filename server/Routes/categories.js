import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {addCategory, updateCategory, removeCategory} from "../Controllers/categories.js";

const router = express.Router();

router.post("/add", authenticateToken, addCategory)

router.put("/:id", authenticateToken, updateCategory)

router.delete("/:id", authenticateToken, removeCategory)

export default router;