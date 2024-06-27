import express from "express";

import {getMenus, getCategories, getDishes, addMenu, updateMenu, removeMenu} from "../Controllers/menus.js";

const router = express.Router();

router.get("/", getMenus)
router.get("/categories", getCategories)
router.get("/menuDishes/:id" , getDishes);

router.post("/add", addMenu)
router.delete("/:id", removeMenu)

router.put("/:id", updateMenu)


export default router;