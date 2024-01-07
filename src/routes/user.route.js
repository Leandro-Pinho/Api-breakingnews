import Router from 'express'
import { Create } from '../controllers/user.controller.js';

const route = Router();

route.post("/", Create)


export default route;