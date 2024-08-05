import express from "express";

import { checkLogin } from "../Controllers/login.js";

const router = express.Router();

router.post("/", checkLogin)

export default router;