import mongoose from "mongoose";
import { ROLE } from "../constants/constants.js";

const departmentSchema = mongoose.Schema({
    name: { type: String, required: true }, // 名字
    studentId: { type: String, required: true }, // 學號

    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLE, default: ROLE.STUDENT },

    verified: { type: Boolean, required: true, default: false },
});

var DepartmentModel = mongoose.model("users", departmentSchema);
export default DepartmentModel;
