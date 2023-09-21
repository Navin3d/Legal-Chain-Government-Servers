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
                assets     : 0,
                asset_ids  : '$assets.id',
            },
        },
    ]);
    return assetIds;
}

export const findUserAndAsset = async (userId, type) => {
    const asset = await User.aggregate([
        {
            $match    : {
                user_id    : userId,
                assets     : {
                    $elemMatch: { type }
                }
            },
        },
        {
            $project  : {
                _id        : 0,
                assets     : 1,
            },
        },
    ]);
}
