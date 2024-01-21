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