//log the errors with this handy middleware
//instead of always throwing it in the catch part of a try catch
logger = require('../startup/logger.js');
module.exports = async (err, req, res, next) =>  {
    logger.log('error', err.stack);
    next(err);
}