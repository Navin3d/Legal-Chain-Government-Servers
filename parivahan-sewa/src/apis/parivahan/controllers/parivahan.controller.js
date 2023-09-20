import { v4 } from "uuid";
import { createUserRecord } from "../../users/services";
import { sendOTP } from "../../../services/email-service";
import { uploadFile } from "../../../services/ipfs-service";
import { saveAssetService } from "../../contract/service/contract.service";

export const uploadUserData = async (req, res) => {
    try {
        const { body, files } = req;
        const { file } = files;
        const { name, email, mobileNumber, dateOfBirth, licenseNumber } = body;

        const licenseHash = await uploadFile(file);
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
        return res.status(200).json({

        });
    } catch (e) {

    }
}