import express from "express";
import signin from "../controllers/users/signin.js";
import signup from "../controllers/users/signup.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
