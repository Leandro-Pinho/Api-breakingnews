import User from "../models/User.js";

const userService = {
    createService: (body) => User.create(body),
    findAllService: () => User.find(),
};

export default userService