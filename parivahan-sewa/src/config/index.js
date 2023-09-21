import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATABASE = "legalchain-parivahanserva";

export const PORT = process.env.PORT || 8080;
export const TEMPPATH = join(__dirname, `../../${process.env.TEMPPATH}`);
export const CSVPATH = join(__dirname, `../../${process.env.CSVPATH}`);
export const CONTRACTADDRESS = process.env.CONTRACTADDRESS || "0x9A2cc6be4c65fd4301eb4Df815f463A8a447eb01";
export const WEB3PROVIDER = process.env.WEB3PROVIDER || "http://localhost:8545";
export const DATABASE_URL = `mongodb://docker:mongopw@localhost:55000/${DATABASE}?socketTimeoutMS=1000&authSource=admin` || process.env.DATABASE_URL;

export const TWILIO_SID = process.env.TWILIO_SID;
export const TWILIO_SECRET = process.env.TWILIO_SECRET;
export const TWILIO_MOBILENUMBER = process.env.TWILIO_MOBILENUMBER;

export const MAILID = process.env.MAILID;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

export const PINATA_PINNING_URL = process.env.PINATA_PINNING_URL;
export const PINATA_GATEWAY_URL = process.env.PINATA_GATEWAY_URL;
export const PINATA_API_KEY = process.env.PINATA_API_KEY;
export const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
