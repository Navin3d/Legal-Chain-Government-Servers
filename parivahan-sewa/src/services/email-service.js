import { createTransport } from 'nodemailer';
import { MAILID, MAIL_PASSWORD } from '../config/index.js';

const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    secureConnection: false,
    auth: {
        user: MAILID,
        pass: MAIL_PASSWORD,
    },
});

export const sendMail = (to, subject, body) => {
    try {
        const mailBody = {
            from: MAILID,
            to,
            subject,
            text: body,
        };
        transporter.sendMail(mailBody, (error, info) => {
            if (error) {
                console.info(`Error sending mail to user ${to}`);
                console.log(error);
            } else {
                console.info(`mail sent to user ${to}`);
            }
        });
    } catch (e) {
        console.log(e);
    }
};

export const sendOTP = async (to, otp) => {
    try {
        const mailBody = {
            from: MAILID,
            to,
            subject: "Your OTP",
            text: `Your OTP to login get License is: ${otp}`,
        };
        await transporter.sendMail(mailBody);
    } catch (e) {
        console.log(e);
    }
    return otp;
};
