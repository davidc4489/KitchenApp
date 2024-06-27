import express from "express";

import {getDishes, getCategories, getIngredients, addDish, updateDish, removeDish} from "../Controllers/dishes.js";

const router = express.Router();

router.get("/", getDishes)
router.get("/categories", getCategories)
router.get("/dishIngredients/:id" , getIngredients);

router.post("/add", addDish)

router.put("/:id", updateDish)

router.delete("/:id", removeDish)

export default router;