import News from "../models/News.js";

// para criar uma nova noticia
export const createService = (body) => News.create(body);

// para pegar todos as noticias, com paginação 
export const findAllService = (limit, offset) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

// para contar o total de documentos criados
export const countNews = () => News.countDocuments();

// para pegar a ultima noticia
export const topNewsService = () => News.findOne().sort({ _id: -1 }).populate('user');

// para buscar cada noticia pelo id
export const findByIdService = (id) => News.findById(id).populate('user');

// para buscar cada noticia por tittulo
export const searchByTitleService = (title) => News.find({
    title: { $regex: `${title || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate('user');

// para buscar cada news do usuario
export const byUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate('user');

// para atualizar a noticia do usuario
export const updateService = (id, title, text, banner) => News.findOneAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true });

// para deletar cada noticia
export const eraseService = (id) => News.findOneAndDelete({ _id: id });

// para dar like em cada noticia
export const likeNewsService = (id, userId) => News.findOneAndUpdate(
    { _id: id, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
)

export const deleteLikeNewsService = (id, userId) => News.findOneAndUpdate(
    { _id: id },
    { $pull: { likes: { userId } } }
)


