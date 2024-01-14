import { Router } from "express";
import { findAll, create } from "../controllers/news.controller.js";

const route = Router();

route.post("/", create)
route.get("/", findAll)

export default route;