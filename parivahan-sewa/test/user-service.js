import { getUserAssetIds } from "../src/apis/users/services/index.js"

const main = async () => {
    const data = await getUserAssetIds();
    console.log(data);
}

main();
