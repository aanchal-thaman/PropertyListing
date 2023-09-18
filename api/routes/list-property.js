import express from "express";
import { getPropertyList } from "../controllers/list-property.js";

const router = express.Router();

//GET ALL

router.get("/", getPropertyList);

export default router;