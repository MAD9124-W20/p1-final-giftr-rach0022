class UnauthenticatedException extends Error {
    constructor(...args){
        super(...args); //toss the arguments back to the error super class constructor
        Error.captureStackTrace(this, UnauthenticatedException);
        this.status = 'Unauthorized';
        this.code = '401';
        this.title = 'Authentication Failed';
        this.description = "Missing Email or Password" + this.message;

    }
}

module.exports = UnauthenticatedException;