import express from "express";

import {getSuppliersOrdersCalendar, getSuppliersOrdersMessages, updateSupplierOrder, supplierOrderToGarbage, addSupplierOrder } from "../Controllers/suppliersOrdersCalendar.js";

const router = express.Router();

router.get("/", getSuppliersOrdersCalendar)
router.get("/Messages", getSuppliersOrdersMessages)

router.put("/toGarbage/", supplierOrderToGarbage)
router.put("/readed", updateSupplierOrder)

router.post("/add", addSupplierOrder)

export default router;