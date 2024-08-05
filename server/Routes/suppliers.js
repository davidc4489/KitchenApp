import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {getSuppliers, addSupplier, updateSupplier, removeSupplier} from "../Controllers/suppliers.js";

const router = express.Router();

router.get("/", authenticateToken, getSuppliers)

router.post("/add", authenticateToken, addSupplier)

router.put("/:id", authenticateToken, updateSupplier)

router.delete("/:id", authenticateToken, removeSupplier)

export default router;