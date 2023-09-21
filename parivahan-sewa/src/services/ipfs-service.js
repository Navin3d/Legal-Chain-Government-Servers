import { createReadStream, rmSync } from "fs";
import axios from "axios";
import logger from "slf3d";
import FormData from "form-data";
import { PINATA_GATEWAY_URL, PINATA_PINNING_URL, PINATA_API_KEY, PINATA_API_SECRET } from "../config/index.js";
import ipfs from "../config/ipfs/client.js";
import { Readable } from "stream";

export const uploadFile = async (incommingFile) => {
    const file = {
        path: incommingFile.name,
        content: Buffer.from(incommingFile.data)
    }
    const { cid } = await ipfs.add(file);
    return cid;
}

export const pinFile = async (file) => {
    const isFilePath = (typeof file == "string") ? true : false;
    let stream, cid;
    if (isFilePath) {
        try {
            logger.log("creating the stream.");
            stream = createReadStream(file);
            logger.log("successfully created the stream.");
        } catch (e) {
            console.error("Error creating the stream: ", e.message);
            console.log(e);
            throw e;
        }
    } else {
        let tempStream = new Readable();
        tempStream.push(file);
        tempStream.push(null);
        stream = tempStream;
    }
    if (!stream)
        throw "File is empty or undefined...";
    cid = await pinFileCall(stream);
    deleteTempFile(file);
    return cid;
}

const pinFileCall = async (fileStream) => {
    let formData = new FormData();
    formData.append('file', fileStream);
    const headers = {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'pinata_api_key': `${PINATA_API_KEY}`,
        'pinata_secret_api_key': `${PINATA_API_SECRET}`,
    };
    try {
        logger.log("Pinning data to pinata.");
        const { data } = await axios.post(PINATA_PINNING_URL, formData, { headers });
        logger.log("Pinning successfully completed.");
        const { IpfsHash } = data;
        return IpfsHash;
    } catch (e) {
        console.error("Error pining data in IPFS: ", e.message);
        console.log(e);
        throw e;
    }
}

const deleteTempFile = (filePath) => {
    rmSync(filePath)
}

export const getFileURL = (hash) => `${PINATA_GATEWAY_URL}/ipfs/${hash}`;
