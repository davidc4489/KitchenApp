import express from "express";

import {getSuppliers, addSupplier, updateSupplier, removeSupplier} from "../Controllers/suppliers.js";

const router = express.Router();

router.get("/", getSuppliers)

router.post("/add", addSupplier)

router.put("/:id", updateSupplier)

router.delete("/:id", removeSupplier)

export default router;