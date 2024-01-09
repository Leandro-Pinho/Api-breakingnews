import mongoose from "mongoose";
import userService from "../service/user.service.js";

export const validId = (req, res, next) => {
    const id = req.params.id

    // para verificar se o id é valido 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "id invalido!" })
    };

    next();
}

export const validUser = async (req, res, next) => {
    const id = req.params.id

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).json({ message: "Usuario não encontrado!" })
    }

    req.id = id;
    req.user = user;

    next();
}