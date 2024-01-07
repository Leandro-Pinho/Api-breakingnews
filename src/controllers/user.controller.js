
import userService from "../service/user.service.js";

export const Create = (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const user = userService.create(req.body)

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
