import express from "express";

import {getUsers, addUser, updateUser, removeUser} from "../Controllers/users.js";

const router = express.Router();

router.get("/", getUsers)

router.post("/add", addUser)

router.put("/:id", updateUser)

router.delete("/:id", removeUser)

export default router;