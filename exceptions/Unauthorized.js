class UnauthorizedException extends Error {
    constructor(...args){
        super(...args); //toss the arguments back to the error super class constructor
        Error.captureStackTrace(this, UnauthorizedException);
        this.status = 'Unauthorized';
        this.code = '401';
        this.title = 'Authentication Failed';
        this.description = "Missing Bearer Token" + this.message;

    }
}

module.exports = UnauthorizedException;