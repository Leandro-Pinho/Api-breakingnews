import News from "../models/News.js";

export const createService = (body) => News.create(body);
export const findAllService = (limit, offset) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');
export const countNews = () => News.countDocuments();