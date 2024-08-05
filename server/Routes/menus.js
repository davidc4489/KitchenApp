import express from "express";
import { authenticateToken } from "../Middleware/middleware.js";
import {getMenus, getCategories, getDishes, addMenu, updateMenu, removeMenu} from "../Controllers/menus.js";

const router = express.Router();

router.get("/", authenticateToken, getMenus)
router.get("/categories", authenticateToken, getCategories)
router.get("/menuDishes/:id" , authenticateToken, getDishes);

router.post("/add", authenticateToken, addMenu)
router.delete("/:id", authenticateToken, removeMenu)

router.put("/:id", authenticateToken, updateMenu)


export default router;