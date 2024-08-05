import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {getDishes, getCategories, getIngredients, addDish, updateDish, removeDish} from "../Controllers/dishes.js";

const router = express.Router();

router.get("/", authenticateToken, getDishes)
router.get("/categories", authenticateToken, getCategories)
router.get("/dishIngredients/:id" , authenticateToken, getIngredients);

router.post("/add", authenticateToken, addDish)

router.put("/:id", authenticateToken, updateDish)

router.delete("/:id", authenticateToken, removeDish)

export default router;