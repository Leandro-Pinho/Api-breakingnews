import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", UserSchema);

export default User;