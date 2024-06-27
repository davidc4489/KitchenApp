import express from "express";

import {getStock, getCategories, addProduct, updateProduct, removeProduct} from "../Controllers/stock.js";

const router = express.Router();

router.get("/", getStock)
router.get("/categories", getCategories)

router.post("/add", addProduct)

router.put("/:id", updateProduct)

router.delete("/:id", removeProduct)

export default router;