class ForbiddenException extends Error {
    constructor(...args){
        super(...args); //toss the arguments back to the error super class constructor
        Error.captureStackTrace(this, ForbiddenException);
        this.status = 'Forbidden';
        this.code = '403';
        this.title = 'Unauthorized access of data';
        this.description = "User does not have access rights to this content" + this.message;

    }
}

module.exports = ForbiddenException;