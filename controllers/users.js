import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import fs from "fs";
import cheerio from "cheerio";
import { promisify } from "util";

import UserModel from "../models/userModel.js";

import { RES } from "../constants/resMessages/resUtils.js";
import { SIGNUP_ERRORS, SIGNIN_ERRORS } from "../constants/resMessages/errors.js";

const readFile = promisify(fs.readFile);
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export const signin = async (req, res) => {
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

export const signup = async (req, res) => {
    const { name, studentId, email, password, confirmPassword } = req.body;

    // 把email轉成小寫，去空格
    const emailLower = email.toLowerCase().replace(/\s/g, "");

    try {
        // Get the user with that email
        const existingEmailUser = await UserModel.findOne({ email: emailLower, deletedAt: null });
        const existingStudentIdUser = await UserModel.findOne({
            studentId: studentId,
            deletedAt: null,
        });

        if (!(name && studentId && email && password && confirmPassword)) {
            return RES(res, SIGNUP_ERRORS.UNFILLED_TEXTFIELDS);
        }
        if (existingEmailUser) {
            return RES(res, SIGNUP_ERRORS.EMAIL_USED);
        }

        if (existingStudentIdUser) {
            return RES(res, SIGNUP_ERRORS.STUDENTID_USED);
        }

        if (password !== confirmPassword) {
            return RES(res, SIGNUP_ERRORS.PASSWORD_NOT_MATCHED);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            name: name,
            studentId: studentId,
            email: emailLower,
            password: hashedPassword,
        });

        // email confirmation token
        // jwt.sign(
        //     {
        //         id: newUser._id,
        //     },
        //     process.env.EMAIL_SECRET,
        //     {
        //         // Never expires
        //         //expiresIn: "1h",
        //     },
        //     async (err, emailToken) => {
        //         const url = `${req.protocol}://${req.get("host")}/user/confirmation/${emailToken}`;
        //         // edit email template
        //         let template = await readFile(
        //             "utils/emailTemplates/confirmation/index.html",
        //             "utf8"
        //         );
        //         const $ = cheerio.load(template);

        //         $("#confirmation-button").attr("href", url);
        //         //$("#valid-till").text("*認證到期時間：" + dateString(1));

        //         transporter.sendMail({
        //             to: newUser.email,
        //             subject: "阿柏教育線上課程網站帳戶認證",
        //             html: $.html(),
        //         });
        //     }
        // );

        return res.status(200).json({ message: "註冊成功", type: "success" });
    } catch (error) {
        return RES(res, SIGNUP_ERRORS.OTHERS);
    }
};
