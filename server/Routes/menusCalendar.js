import express from "express";

import {getMenusCalendar, addEvent, updateStock} from "../Controllers/menusCalendar.js";

const router = express.Router();

router.get("/", getMenusCalendar)
router.get("/updateStock", updateStock)

router.post("/add", addEvent)

export default router;