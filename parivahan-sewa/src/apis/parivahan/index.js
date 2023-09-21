import express from "express";
import { uploadLicense, requestDocument, getLicense } from "./controllers/parivahan.controller.js";
const router = express.Router();

router.post ("/license",              uploadLicense);
router.post ("/license/get",          getLicense);
router.post ("/initiate4f",           requestDocument);

export default router;
