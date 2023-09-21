import dbConnection from "../src/config/mongoose/index.js";
import { getUserAssetIds } from "../src/apis/users/services/index.js"
import { findUserByAsset } from "../src/apis/users/services/users.aggregate.js";

const main = async () => {
    await dbConnection();
    const data = await getUserAssetIds("d6d62290-e6a9-4c3b-8ba8-3eebb55e4997");
    console.log(data);
}

const aggTest = async () => {
    await dbConnection();
    const data = await findUserByAsset("LICENSE", "TN92ND0987");
    console.log(data);
}

aggTest();
