import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {getNotes, addNote, updateNote, removeNote} from "../Controllers/notes.js";

const router = express.Router();

router.get("/", authenticateToken, getNotes)

router.post("/add", authenticateToken, addNote)

router.put("/:id", authenticateToken, updateNote)

router.delete("/:id", authenticateToken, removeNote)

export default router;