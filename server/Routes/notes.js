import express from "express";

import {getNotes, addNote, updateNote, removeNote} from "../Controllers/notes.js";

const router = express.Router();

router.get("/", getNotes)

router.post("/add", addNote)

router.put("/:id", updateNote)

router.delete("/:id", removeNote)

export default router;