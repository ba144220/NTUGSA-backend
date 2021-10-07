import DepartmentModel from "../../models/departmentModel";
import { RES } from "../../constants/resMessages/resUtils";
import { DEPARTMENT_ERRORS } from "../../constants/resMessages/errors";

const lookup = (req, res) => {
    const { id } = req.body;

    const department = DepartmentModel.findById(id);

    if (!department) {
        return RES(res, DEPARTMENT_ERRORS.DEPARTMENT_NOT_FOUND);
    }
};

export default lookup;
