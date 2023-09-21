import cors from "cors";
import logger from "slf3d";
import express from "express";
import bodyParser from "body-parser";
import { PORT, TEMPPATH } from "./config/index.js";
import fileUpload from "express-fileupload";
import contractAPI from "./apis/contract/index.js";
import parivahanAPI from "./apis/parivahan/index.js";
import dbConnection from "./config/mongoose/index.js";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : TEMPPATH,
}));
dbConnection();

app.use("/contract", contractAPI);
app.use("/parivahan", parivahanAPI);

app.listen(PORT, () => { logger.info(`Server Successfully Started in PORT: ${PORT}`) });
