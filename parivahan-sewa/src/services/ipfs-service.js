import ipfs from "../config/ipfs/client";
export const uploadFile = async (incommingFile) => {
    const file = {
        path: incommingFile.name,
        content: Buffer.from(incommingFile.data)
    }
    const { cid } = await ipfs.add(file);
    return cid;
}
