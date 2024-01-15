import { createService, findAllService } from "../service/news.service.js";

export const create = async (req, res) => {
    try {
        const { authorization } = req.headers;
        // console.log(authorization)

        if (!authorization) {
            return res.status(401).json({});
        }

        const parts = authorization.split(" ");

        const [schema, token] = parts

        if (parts.length !== 2) {
            return res.status(401)
        }

        if (schema !== "Bearer") {
            return res.status(401)
        }

        const { title, text, banner } = req.body;

        if (!title || !banner || !text) {
            res.status(400).send({
                message: "Submit all fields for registration"
            });
        }

        await createService({
            title,
            banner,
            text,
            user: { "_id": "659b1d572774da363ecea5a0" }
        })

        res.status(201).json({ message: "News criada com sucesso!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const findAll = async (req, res) => {
    const news = await findAllService();

    if (news.length === 0) {
        return res.status(400).send({ message: "Não há noticias cadastradas!" })
    }

    res.send(news)
}