import User from '../models/User.model.js';

export const findAssetIdsByUserId = async (userId) => {
    const assetIds = await User.aggregate([
        {
            $match: {
                user_id: userId,
            },
        },
        {
            $project: {
                asset_ids: '$assets.id',
            },
        },
    ]);
    return assetIds;
}

export const findUserByAsset = async (type, ref) => {
    const asset = await User.aggregate([
        {
            $match: {
                assets: {
                    $elemMatch: { type, ref }
                }
            },
        },
        // {
        //     $project  : {
        //         assets     : 1,
        //     },
        // },
    ]);
    return asset;
}

export const findAssetByUser = async (email, type) => {
    const asset = await User.aggregate([
        {
            $match: {
                email,
                assets: {
                    $elemMatch: { type }
                }
            },
        },
        {
            $project: {
                assets: 1,
            },
        },
    ]);
    return asset;
}

export const findAssetOfUser = async (email, type) => {
    const asset = await User.aggregate([
        {
            $match: {
                email,
                assets: {
                    $elemMatch: { type }
                }
            },
        },
        {
            $addFields: {
                assets: {
                    $filter: {
                        input: "$assets",
                        as: "assets",
                        cond: { $eq: ["$$assets.type", type] }
                    }
                }
            }
        },
        {
            $project: {
                assets: 1,
            }
        }
    ]);
    return asset;
}
