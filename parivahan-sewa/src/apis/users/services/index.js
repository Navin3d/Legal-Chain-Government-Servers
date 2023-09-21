import logger from "slf3d";
import { v4 } from "uuid";
import { findAssetIdsByUserId } from "./users.aggregate.js";
import User from "../models/User.model.js";

export const getUserAssetIds = async (userId) => {
    logger.log("Getting Asset Ids to User...");

    try {
        const assetIds = await findAssetIdsByUserId(userId);
        console.log("assetsIds: ", assetIds);
        return assetIds[0]["asset_ids"];
    } catch (err) {
        logger.error(err.message);
        console.log(err);
        throw err;
    }
}

export const addUserAsset = async (userId, asset) => {
    try {
        await User.updateOne(
            { user_id: userId },
            {
                $setOnInsert: {
                    user_id: userId,
                },
                $addToSet: {
                    assets: asset
                }
            },
            { upsert: true }
        );
    } catch (err) {
        logger.error(err.message);
        console.log(err);
        throw err;
    }
}

export const saveUser = async (name, email, mobileNumber, asset) => {
    try {
        const userId = v4();
        await User.updateOne(
            { email },
            {
                $setOnInsert: {
                    user_id: userId,
                    name,
                    email,
                    mobile_number: mobileNumber,
                },
                $addToSet: {
                    assets: asset
                }
            },
            { upsert: true }
        );
        return userId;
    } catch (err) {
        logger.error(err.message);
        console.log(err);
        throw err;
    }
}
