import { createService, findAllService } from "../service/news.service.js";

export const create = async (req, res) => {
    try {
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

        res.send(201).json({});

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