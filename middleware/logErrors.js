//log the errors with this handy middleware
//instead of always throwing it in the catch part of a try catch

module.exports = async (err, req, res, next) =>  {
    console.error(err.stack);
    next(err);
}