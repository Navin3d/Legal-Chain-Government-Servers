import logger from "slf3d";
import { addUserAsset, getUserAssetIds } from "../../users/services/index.js";
import { findAssetByAssetId, findAssetByUserId, saveAssetService } from "../service/contract.service.js";

export const saveAsset = async (req, res) => {
    const { assetId, userId, assetData, type, ref } = req.body;

    if(!(assetId && userId && assetData))
        return res.status(400).json({
            message : "Error saving asset...",
            status  : 0,
            error   : "The required parameters are (assetId, userId, assetData) of type string..."
        });
    else if(typeof assetData != "string")
        return res.status(400).json({
            message : "Error saving asset...",
            status  : 0,
            error   : "The type of assetData must be string..."
        });

    try {
        await saveAssetService(assetId, userId, assetData);
        const asset = {
            id: assetId,
            type,
            ref
        }
        await addUserAsset(userId, asset);
        return res.status(201).json({
            message : "Successfully saved asset",
            status  : 1,
        });
    } catch(err) {
        logger.error(err.message);
        console.log(err);

        return res.status(500).json({
            message : "Error saving asset...",
            status  : 0,
            error   : err.message
        });
    }
};

export const getAssetByAssetId = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await findAssetByAssetId(id);

        return res.status(200).json({
            message : "Successfully Fetched Asset...",
            status  : 1,
            data
        });
    } catch(err) {
        logger.error(err.message);
        console.log(err);

        return res.status(500).json({
            message : "Error fetching asset...",
            status  : 0,
            error   : err.message,
        });
    }
};

export const getAssetsOfUser = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await findAssetByUserId(id);

        return res.status(200).json({
            message : "Successfully Fetched Asset...",
            status  : 1,
            data,
        });
    } catch(err) {
        logger.error(err.message);
        console.log(err);

        return res.status(500).json({
            message : "Error fetching asset...",
            status  : 0,
            error   : err.message,
        });
    }
}
