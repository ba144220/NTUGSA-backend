import mongoose from "mongoose";
import { PROGRAM } from "../constants/constants.js";

const departmentSchema = mongoose.Schema({
    name: { type: String, required: true },
    division: { type: String, required: true },
    program: { type: String, enum: PROGRAM, required: true },
});

var DepartmentModel = mongoose.model("users", departmentSchema);
export default DepartmentModel;
