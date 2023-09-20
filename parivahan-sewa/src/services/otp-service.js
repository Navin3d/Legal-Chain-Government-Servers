import logger from "slf3d";
import twilio from "twilio";
import { TWILIO_SID, TWILIO_SECRET, TWILIO_MOBILENUMBER } from "../config/index.js"

const client = new twilio(TWILIO_SID, TWILIO_SECRET);

export const sendSMS = async (to, body) => {
    client.messages
        .create({
            body,
            to,
            from: TWILIO_MOBILENUMBER,
        })
        .then(message => logger.log('SMS sent:', message.sid))
        .catch(error => {
            logger.error('Error sending SMS.');
            console.log(error);
        });
}
