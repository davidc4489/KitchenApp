import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {getStock, getCategories, addProduct, updateProduct, removeProduct} from "../Controllers/stock.js";

const router = express.Router();

router.get("/", authenticateToken, getStock)
router.get("/categories", authenticateToken, getCategories)

router.post("/add", authenticateToken, addProduct)

router.put("/:id", authenticateToken, updateProduct)

router.delete("/:id", authenticateToken, removeProduct)

export default router;