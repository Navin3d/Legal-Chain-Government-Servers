import express from "express";
import cors from "cors";
import logger from "slf3d";
import bodyParser from "body-parser";
import { PORT } from "./config/index.js";
import expressFile from "express-fileupload";
import contractAPI from "./apis/contract/index.js";
import dbConnection from "./config/mongoose/index.js";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressFile());
dbConnection();

app.use("/contract", contractAPI);

app.listen(PORT, () => { logger.info(`Server Successfully Started in PORT: ${PORT}`) });
