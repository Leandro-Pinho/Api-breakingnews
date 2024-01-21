import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { findAll, create, topNews, findById } from "../controllers/news.controller.js";

const route = Router();

route.post("/", authMiddleware, create)
route.get("/", findAll)
route.get("/top", topNews)
route.get("/:id", findById);

export default route;