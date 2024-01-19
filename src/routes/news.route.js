import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { findAll, create } from "../controllers/news.controller.js";

const route = Router();

route.post("/", authMiddleware, create)
route.get("/", findAll)

export default route;