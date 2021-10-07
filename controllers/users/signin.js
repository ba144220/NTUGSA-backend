import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../../models/userModel.js";

import { RES } from "../../constants/resMessages/resUtils.js";
import { SIGNIN_ERRORS } from "../../constants/resMessages/errors.js";

const signin = async (req, res) => {
    const { studentId, password } = req.body;

    try {
        // 用學號找到user
        const user = await UserModel.findOne({ studentId: studentId, deletedAt: null });

        if (!(studentId && password)) {
            return RES(res, SIGNIN_ERRORS.UNFILLED_TEXTFIELDS);
        }

        if (!user) {
            return RES(res, SIGNIN_ERRORS.NO_ACCOUNT);
        }

        // 驗證密碼
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return RES(res, SIGNIN_ERRORS.WRONG_PASSWORD);
        }

        // 是否驗證？
        if (!user.verified) {
            return RES(res, SIGNIN_ERRORS.NOT_VERIFIED);
        }

        // Give the token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7h",
            }
        );

        return res.status(200).json({ result: user, token });
    } catch (error) {
        return RES(res, SIGNUP_ERRORS.OTHERS);
    }
};

export default signin;
