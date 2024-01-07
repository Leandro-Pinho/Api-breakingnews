import User from "../models/User.js";

const userService = {
    create: (body) => User.create(body),
};

export default userService