// const debug = require('debug')('giftr:database-startup');
const logger = require('./logger.js');
const config = require('config');
const mongoose = require('mongoose');
const dbConfig = config.get('db');

module.exports = () =>{
    mongoose
    .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> logger.log('info', 'Connected to MongoDB...'))
    .catch(err =>{
        logger.log('error', 'Problem connecting to MongoDB', err);
        process.exit(1);
    });
};
