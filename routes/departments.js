import express from "express";
import { lookup, lookupAll } from "../controllers/departments/lookups.js";

const router = express.Router();

router.get("/lookup", lookup);
router.post("/lookupAll", lookupAll);

export default router;
