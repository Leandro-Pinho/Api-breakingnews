import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { findAll, create, topNews, findById, searchByTitle, byUser, update } from "../controllers/news.controller.js";

const route = Router();

route.post("/", authMiddleware, create);
route.get("/", findAll);
route.get("/top", topNews);
route.get("/search", searchByTitle);
route.get("/byUser", authMiddleware, byUser);
route.get("/:id", authMiddleware, findById);
route.patch("/:id", authMiddleware, update);

export default route;