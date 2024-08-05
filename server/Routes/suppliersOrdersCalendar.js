import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {getSuppliersOrdersCalendar, getSuppliersOrdersMessages, updateSupplierOrder, supplierOrderToGarbage, addSupplierOrder } from "../Controllers/suppliersOrdersCalendar.js";

const router = express.Router();

router.get("/", authenticateToken, getSuppliersOrdersCalendar)
router.get("/Messages", authenticateToken, getSuppliersOrdersMessages)

router.put("/toGarbage/", authenticateToken, supplierOrderToGarbage)
router.put("/readed", authenticateToken, updateSupplierOrder)

router.post("/add", authenticateToken, addSupplierOrder)

export default router;