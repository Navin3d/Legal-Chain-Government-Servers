import { v4 } from "uuid";
import logger from "slf3d";
import { createUserRecord } from "../../users/services/index.js";
import { sendOTP } from "../../../services/email-service.js";
import { uploadFile, pinFile } from "../../../services/ipfs-service.js";
import { saveAssetService } from "../../contract/service/contract.service.js";

export const uploadUserData = async (req, res) => {
    try {
        const { body, files } = req;
        const { file } = files;
        const { name, email, mobileNumber, dateOfBirth, licenseNumber } = body;

        const licenseHash = await pinFile(file.tempFilePath);
        const blockchainData = {
            name,
            dateOfBirth,
            licenseNumber,
            licenseHash,
        }
        const assetId = v4();
        const userId = await createUserRecord(name, email, mobileNumber, assetId);
        const blockchainDataString = JSON.stringify(blockchainData);
        await saveAssetService(assetId, userId, blockchainDataString);
        return res.status(201).json({
            message: "Uploaded File Successfully...",
            status: 1,
        });
    } catch (e) {
        logger.error(`Error uploading user data: ${e.message}`);
        console.log(e);
        return res.status(500).json({
            message: "Error Uploading File...",
            status: 0,
            error: e.message
        });
    }
}
