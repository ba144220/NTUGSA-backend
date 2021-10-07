import mongoose from "mongoose";
import { ROLE } from "../constants/constants.js";

const userSchema = mongoose.Schema({
    name: { type: String, required: true }, // 名字
    studentId: { type: String, required: true }, // 學號

    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLE, default: ROLE.STUDENT },

    verified: { type: Boolean, required: true, default: false },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    deletedAt: {
        type: Date,
        default: null,
    },
});

var UserModel = mongoose.model("users", userSchema);
export default UserModel;
