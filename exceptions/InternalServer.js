class InternalServerException extends Error {
    constructor(...args){
        super(...args); //toss the arguments back to the error super class constructor
        Error.captureStackTrace(this, InternalServerException);
        this.status = 'Internal Server Error';
        this.code = '500';
        this.title = 'Problem saving document to database';
        this.description = this.message;

    }
}

module.exports = InternalServerException;