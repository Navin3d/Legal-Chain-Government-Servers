import User from "../models/User.model.js";

export const generateOTP = async (email) => {
    const foundUser = await User.countDocuments({ email });
    if (foundUser == 0)
        throw "User Not Found";
    const sixDigitRandomNumber = Math.floor(100000 + Math.random() * 900000);
    await User.updateOne(
        { email },
        {
            $set: {
                otp: sixDigitRandomNumber,
                otp_used: false,
            }
        }
    );
    return sixDigitRandomNumber;
}

export const verifyOTP = async (email, otp) => {
    const foundUser = await User.findOneAndUpdate(
        {
            email,
            otp,
            otp_used: false,
        },
        {
            otp: "",
            otp_used: true,
        },
        {
            select: {
                assets: 1,
            },
            new: true,
        }
    );
    return foundUser;
} 
