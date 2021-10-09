import express from "express";
import { lookup, lookupAll } from "../controllers/departments/lookups.js";

const router = express.Router();

router.get("/:id", lookup);
router.get("/", lookupAll);

export default router;
