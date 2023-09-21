import { v4 } from "uuid";
import logger from "slf3d";
import { generateOTP, verifyOTP } from "../../users/services/auth.js";
import { pinFile } from "../../../services/ipfs-service.js";
import { sendOTP } from "../../../services/email-service.js";
import { saveUser } from "../../users/services/index.js";
import { saveAssetService, findAssetByUserId } from "../../contract/service/contract.service.js";

export const uploadLicense = async (req, res) => {
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
        const asset = {
            id: v4(),
            type: "LICENSE",
            ref: licenseNumber
        };
        const userId = await saveUser(name, email, mobileNumber, asset);
        const blockchainDataString = JSON.stringify(blockchainData);
        await saveAssetService(asset.id, userId, blockchainDataString);
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

export const requestDocument = async (req, res) => {
    try {
        const { email } = req.params;
        const otp = await generateOTP(email);
        await sendOTP(email, otp);
        return res.status(200).json({
            message: "Otp Sent to your registered email.",
            status: 1,
        });
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: "Error requesting file...",
            status: 0,
            error: e
        });
    }
}

export const getLicense = async (req, res) => {
    try {
        const { email, otp, dob, licenseNumber } = req.body;
        const user = await verifyOTP(email, otp);
        if (!user)
            return res.status(404).json({
                message: "User not found.",
                status: 0,
                error: "OTP and Email does not match."
            });
        const assets = await findAssetByUserId(user["user_id"]);
        
        return res.status(200).json({
            message: "Otp Sent to your registered email.",
            status: 1,
        });
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: "Error requesting file...",
            status: 0,
            error: e
        });
    }
}
