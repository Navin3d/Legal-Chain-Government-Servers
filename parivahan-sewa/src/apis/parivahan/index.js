import express from "express";
import { uploadLicense, requestDocument } from "./controllers/parivahan.controller.js";
const router = express.Router();

router.post ("/license",              uploadLicense);
router.get  ("/initiate4f/:email",    requestDocument);

export default router;
