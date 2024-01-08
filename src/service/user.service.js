import User from "../models/User.js";

const userService = {
    createService: (body) => User.create(body),
    findAllService: () => User.find(),
    findByIdService: (id) => User.findById(id),
    updateService: (
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    ) => User.findOneAndUpdate(
        { _id: id }, { name, username, email, password, avatar, background }
    )
};

export default userService