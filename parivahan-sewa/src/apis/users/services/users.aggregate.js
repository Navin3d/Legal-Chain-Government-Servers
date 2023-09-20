// const User                  = require('../models/User.model');
import User from '../models/User.model.js';

export const findAssetIdsByUserId   = async (userId) => {
    const assetIds          = await User.aggregate([
        {
            $match    : {
                user_id    : userId,
            },
        },
        {
            $project  : {
                _id        : 0,
                asset_ids  : 1,
            },
        },
    ]);
    return assetIds;
}
