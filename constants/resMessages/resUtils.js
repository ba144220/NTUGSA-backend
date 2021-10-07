export const RES = (res, error) => {
    return res.status(error.code).json(error);
};
