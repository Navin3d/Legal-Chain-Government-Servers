// const mongoose             =    require('mongoose');
// const logger               =    require('@navin3d/log');
// const { DATABASE_URL }     =    require("../index");
import mongoose from 'mongoose';
import logger from 'slf3d';
import { DATABASE_URL } from '../index.js';

const dbOptions = {
    useNewUrlParser     : true, 
    useUnifiedTopology  : true,
    useCreateIndex      : true
}

const dbConnection = async () => {
    await mongoose
        .connect(DATABASE_URL)
        .then(()=> {
            logger.info("Mongoose default connection is opened successfully ");
        })
        .catch((err)=> {
            logger.error(`Mongoose default connection is ${err}`);
            console.log(err);
        })
}

export default dbConnection;
