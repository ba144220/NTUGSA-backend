import DepartmentModel from "../../models/departmentModel.js";
import { RES } from "../../constants/resMessages/resUtils.js";
import { DEPARTMENT_ERRORS } from "../../constants/resMessages/errors.js";

export const lookup = (req, res) => {
    const { id } = req.body;

    try {
        const department = DepartmentModel.findById(id);

        if (!department) {
            return RES(res, DEPARTMENT_ERRORS.DEPARTMENT_NOT_FOUND);
        }

        return res.status(200).json({ department });
    } catch (error) {
        return RES(res, DEPARTMENT_ERRORS.OTHERS);
    }
};

export const lookupAll = (req, res) => {
    try {
        const allDepts = DepartmentModel.find({});
        return res.status(200).json({ allDepts });
    } catch (error) {
        return RES(res, DEPARTMENT_ERRORS.OTHERS);
    }
};
