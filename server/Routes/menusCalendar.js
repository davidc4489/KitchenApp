import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {getMenusCalendar, addEvent, updateStock} from "../Controllers/menusCalendar.js";

const router = express.Router();

router.get("/", authenticateToken, getMenusCalendar)
router.get("/updateStock", authenticateToken, updateStock)

router.post("/add", authenticateToken, addEvent)

export default router;