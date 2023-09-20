import User from "../models/User.model";

export const generateOTP = async (mobileNumber) => {
    const sixDigitRandomNumber = Math.floor(100000 + Math.random() * 900000);
    const foundUser = await User.countDocuments({ mobile_number: mobileNumber });
    if(foundUser == 0)
        throw "User Not Found";
    await User.updateOne(
        { mobile_number: mobileNumber },
        {
            $set: {
                otp: sixDigitRandomNumber,
                otp_used: false,
            }
        }
    );
    return sixDigitRandomNumber;
}

export const verifyOTP = async (mobileNumber, otp) => {
    const { matchedCount } = await User.updateOne(
        {
            mobile_number: mobileNumber,
            otp,
            otp_used: false,
        },
        {
            $set: {
                otp: "",
                otp_used: true,
            }
        }
    );
    return matchedCount == 0 ? false : true;
} 
