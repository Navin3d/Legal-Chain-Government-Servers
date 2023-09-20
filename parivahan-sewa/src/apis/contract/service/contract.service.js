// const logger                    = require("@navin3d/log");
// const { getAccounts }           = require("../../../config/web3");
// const { getUserAssetIds }       = require("../../users/services/index");
// const { writeDataToCSV }        = require("../../../utils/csv.utils");
// const comprehensiveContract     = require("../../../config/web3/chain.config");
import logger from "slf3d";
import { getAccounts } from "../../../config/web3/index.js";
import { getUserAssetIds } from "../../users/services/index.js";
import { writeDataToCSV } from "../../../utils/csv.utils.js";
import comprehensiveContract from "../../../config/web3/chain.config.js";


export const saveAssetService = async (assetId, userId, assetData) => {
    logger.log("Writing Data to Blockchain...");
    const address                   = await getAccounts();

    try {
        await comprehensiveContract.methods.putData(assetId, userId, assetData).send({
            from : address[0],
            gas  : '1000000',
        });
    
        const csvString             = `${assetId}, ${userId}, ${new Date()}`;
        writeDataToCSV(csvString);
    } catch(err) {
        logger.error("Error! Writing Data to Blockchain: " + err.message);
        console.log(err);
        throw err;
    }

}

export const findAssetByUserId = async (userId) => {
    logger.log("Fetching data from Smart Contract with userId: " + userId);

    try {
        const assetIds = await getUserAssetIds(userId);
        let assets = [];
        for(const assetId of assetIds) {
            const asset = await findAssetByAssetId(assetId);
            assets.push(asset);
        }
        return assets;
    } catch (err) {
        logger.error("Error Fetching data from Smart Contract...");
        console.log(err);
        throw err;
    }
}

export const findAssetByAssetId = async (hashId) => {
    logger.log("Fetching data from Smart Contract with assetId: " + hashId);

    try {
        const response = await comprehensiveContract.methods.getData(hashId).call();

        let data = {
            assetId : hashId,
            userId  : response[1],
            data    : response[2],
        }
        return data
    } catch (err) {
        logger.error("Error Fetching data from Smart Contract...");
        console.log(err);
        throw err;
    }

}
