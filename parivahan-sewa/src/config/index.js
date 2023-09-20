// const path         = require("path");
// const DATABASE     = "comprehensivesmartcontractsolidity";

// export default {
//     PORT              : 8080 || process.env.PORT,
//     CSVPATH           : path.join(__dirname, "../../public/chain.logs.csv")  || process.env.CSVPATH,
//     CONTRACTADDRESS   : "0x9A2cc6be4c65fd4301eb4Df815f463A8a447eb01" || process.env.CONTRACTADDRESS,
//     WEB3PROVIDER      : "http://localhost:8545" || process.env.WEB3PROVIDER,
//     DATABASE_URL      : `mongodb://docker:mongopw@localhost:55000/${DATABASE}?socketTimeoutMS=1000&authSource=admin`  || process.env.DATABASE_URL,
// }

import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATABASE = "comprehensivesmartcontractsolidity";

export const PORT = process.env.PORT || 8080;
export const CSVPATH = process.env.CSVPATH || join(__dirname, "../../public/chain.logs.csv");
export const CONTRACTADDRESS = process.env.CONTRACTADDRESS || "0x9A2cc6be4c65fd4301eb4Df815f463A8a447eb01";
export const WEB3PROVIDER = process.env.WEB3PROVIDER || "http://localhost:8545";
export const DATABASE_URL = process.env.DATABASE_URL || `mongodb://docker:mongopw@localhost:55000/${DATABASE}?socketTimeoutMS=1000&authSource=admin`;
