// const debug = require('debug')('giftr:database-startup');
const logger = require('./logger.js')
const mongoose = require('mongoose');

module.exports = () =>{
    mongoose
    .connect('mongodb://localhost:27017/mad9124', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> logger.log('info', 'Connected to MongoDB...'))
    .catch(err =>{
        logger.log('error', 'Problem connecting to MongoDB', err);
        process.exit(1);
    });
};
