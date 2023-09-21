import express from "express";
import { uploadUserData } from "./controllers/parivahan.controller.js";
const router = express.Router();

router.post("/", uploadUserData);

export default router;
