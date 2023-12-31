import fs from "fs";
import logger from "slf3d";
import { CSVPATH } from "../config/index.js";

export const writeDataToCSV = (data) => {
    logger.log("Writing Log to CSV...");
    fs.appendFile(CSVPATH, "\n" + data, (err) => {
        if(err)
            logger.error(err.message);
    });
}
