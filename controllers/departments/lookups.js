import DepartmentModel from "../../models/departmentModel.js";
import { RES } from "../../constants/resMessages/resUtils.js";
import { DEPARTMENT_ERRORS } from "../../constants/resMessages/errors.js";

export const lookup = async (req, res) => {
    const { id } = req.params;

    try {
        const department = await DepartmentModel.findById(id);

        if (!department) {
            return RES(res, DEPARTMENT_ERRORS.DEPARTMENT_NOT_FOUND);
        }

        return res.status(200).json(department);
    } catch (error) {
        return RES(res, DEPARTMENT_ERRORS.OTHERS);
    }
};

export const lookupAll = async (req, res) => {
    try {
        const allDepts = await DepartmentModel.find({});

        return res.status(200).json(allDepts);
    } catch (error) {
        return RES(res, DEPARTMENT_ERRORS.OTHERS);
    }
};
