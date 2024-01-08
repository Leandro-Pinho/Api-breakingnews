import mongoose from "mongoose";
import userService from "../service/user.service.js";

export const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const user = await userService.createService(req.body)

    if (!user) {
        return res.status(400).json({ message: "Error criação do usuario" });
    }

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            name,
            username,
            email,
            password,
            avatar,
            background,
        }
    });
};

export const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if (users.length === 0) {
        return res.status(400).send({ message: "Não há usuario cadastrados!" })
    }

    res.send(users)
};

export const findById = async (req, res) => {
    const id = req.params.id

    // para verificar se o id é valido 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "id invalido!" })
    };

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).json({ message: "Usuario não encontrado!" })
    }

    res.json(user)
};

export const update = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
        return res.status(400).json({ message: "Não alterou nenhum campo para fazer update!" });
    }

    const id = req.params.id;

    // para verificar se o id é valido 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "id invalido!" })
    };

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).json({ message: "Usuario não encontrado!" })
    }

    const userAtualizado = await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    );

    res.send({ message: "Usuario cadastrado atualizado com sucesso!", user: userAtualizado })
};
