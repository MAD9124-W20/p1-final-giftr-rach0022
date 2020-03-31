class ResourceNotFoundException extends Error {
    constructor(...args){
        super(...args); //toss the arguments back to the error super class constructor
        Error.captureStackTrace(this, ResourceNotFoundException);
        this.status = 'Resource Not Found';
        this.code = '404';
        this.title = 'Resource does not exist';
        this.description = this.message;

    }
}

module.exports = ResourceNotFoundException;