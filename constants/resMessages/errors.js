// error types
const USER_ERROR = "USER_ERROR";
const INTERNAL_ERROR = "INTERNAL_ERROR";
const GENERAL_ERROR = "GENERAL_ERROR";

export const SIGNIN_ERRORS = {
    NO_ACCOUNT: {
        code: 404,
        type: USER_ERROR,
        message: "This student ID has not been registered.",
    },
    NOT_VERIFIED: {
        code: 404,
        type: USER_ERROR,
        message: "Please verify your email account.",
    },
    WRONG_PASSWORD: {
        code: 404,
        type: USER_ERROR,
        message: "Wrong password.",
    },
    UNFILLED_TEXTFIELDS: {
        code: 404,
        type: USER_ERROR,
        message: "There are some unfilled fields.",
    },
    OTHERS: {
        code: 500,
        type: GENERAL_ERROR,
        message: "An error occured at signin process.",
    },
};

export const SIGNUP_ERRORS = {
    STUDENTID_USED: {
        code: 404,
        type: USER_ERROR,
        message: "This student ID has been registered.",
    },
    EMAIL_USED: {
        code: 404,
        type: USER_ERROR,
        message: "This email address has been registered.",
    },
    EMAIL_DOMAIN: {
        code: 404,
        type: USER_ERROR,
        message: "Email address has to end with @ntu.edu.tw",
    },
    UNFILLED_TEXTFIELDS: {
        code: 404,
        type: USER_ERROR,
        message: "There are some unfilled fields.",
    },
    PASSWORD_NOT_MATCHED: {
        code: 404,
        type: USER_ERROR,
        message: "The passwords are not the same.",
    },
    OTHERS: {
        code: 500,
        type: GENERAL_ERROR,
        message: "An error occured at signup process.",
    },
};

export const DEPARTMENT_ERRORS = {
    DEPARTMENT_NOT_FOUND: {
        code: 404,
        type: INTERNAL_ERROR,
        message: "This id does not refer to a department.",
    },
    OTHERS: {
        code: 500,
        type: GENERAL_ERROR,
        message: "An error occured at department process.",
    },
};
