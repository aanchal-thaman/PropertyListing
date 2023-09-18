import express from "express";
import {
  countByCity,
  countByType,
  createProperty,
  deleteProperty,
  getProperty,
  getPropertys,
  updateProperty,
} from "../controllers/property.js";

import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createProperty);

//UPDATE
router.put("/:id", verifyAdmin, updateProperty);
//DELETE
router.delete("/:id", verifyAdmin, deleteProperty);
//GET

router.get("/find/:id", getProperty);
//GET ALL

router.get("/", getPropertys);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;