import Router from 'express'
import { create, findAll, findById, update } from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';

const route = Router();

route.get("/", findAll);
route.get("/:id", validId, validUser, findById);
route.post("/", create);
route.patch("/:id", validId, validUser, update);


export default route;