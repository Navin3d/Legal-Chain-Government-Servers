// const logger                        = require("@navin3d/log");
// const { findAssetIdsByUserId }      = require("./users.aggregate");
// const User                          = require("../models/User.model");
import logger from "slf3d";
import { findAssetIdsByUserId } from "./users.aggregate.js";
import User from "../models/User.model.js";

export const getUserAssetIds     = async (userId) => {
    logger.log("Getting Asset Ids to User...");

    try {
        const assetIds    = await findAssetIdsByUserId(userId);
        return assetIds[0]["asset_ids"];
    } catch(err) {
        logger.error(err.message);
        console.log(err);
        throw err;
    }
}

export const addUserAssetId      = async (userId, assetId) => {
    try {
        await User.updateOne(
            { user_id: userId },
            {
                $setOnInsert: {
                    user_id: userId,
                },
                $addToSet: {
                    asset_ids: assetId
                }
            },
            { upsert: true }
        );
    } catch(err) {
        logger.error(err.message);
        console.log(err);
        throw err;
    }
}
