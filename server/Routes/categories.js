import express from "express";

import {addCategory, updateCategory, removeCategory} from "../Controllers/categories.js";

const router = express.Router();

router.post("/add", addCategory)

router.put("/:id", updateCategory)

router.delete("/:id", removeCategory)

export default router;