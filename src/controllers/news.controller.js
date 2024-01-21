import { countNews, createService, findAllService, topNewsService } from "../service/news.service.js";

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
            user: req.userId
        })

        res.status(201).json({ message: "News criada com sucesso!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const findAll = async (req, res) => {

    // para fazer paginação
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
        limit = 5;
    }

    if (!offset) {
        offset = 0;
    }

    const total = await countNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = limit - offset < 0 ? null : limit - offset;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

    const news = await findAllService(limit, offset);

    if (news.length === 0) {
        return res.status(400).send({ message: "Não há noticias cadastradas!" })
    }

    res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,

        results: news.map(item => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            username: item.user.username,
            userAvatar: item.user.avatar,
        }))
    })
}

export const topNews = async (req, res) => {
    try {
        const news = await topNewsService();

        if (!news) {
            return res.status(400).json({ message: "Não há registro postado!" })
        }

        res.json({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (error) {
        return res.status(401).json({ message: "Não hã registro!" })
    }
}