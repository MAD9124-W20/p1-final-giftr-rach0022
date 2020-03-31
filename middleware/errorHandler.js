//error handler middle ware
//similar to other middleware except it also takes the error (err param)
const debug = require('debug')('giftr:ErrorHandler')
//errrors object that is an array that we can iterate over
errors = [
    {
        status:'Bad Request',
        code: '400',
        title: 'Validation Error',
        detail: "'password' is required",
        source: {pointer: '/data/attributes/password', value: ''}
    },
    {
        status: 'Bad Request',
        code: '400',
        title: 'Validation Error',
        detail: "The email address 'douglasadams@fourtytwo.com' is already registered",
        source: {pointer: '/data/attributes/email', value: 'douglasadams@fourtytwo.com'}
    },
    {
        status: 'Bad Request',
        code: '400',
        title: 'Validation Error',
        description: 'Invalid Bearer Token',
        source: {pointer: '/data/attributes/request', value: 'token'}  //ASK ROBERT ABOUT THIS
    }
];

const formatValidationErrors = function(errors){
    return Object.values(errors).map(e =>({
        status: 'Bad Request',
        code: '400',
        title: 'Validation Error',
        detail: e.message,
        source: {pointer: `/data/attributes/${e.path}`, value: e.value}
    }))
}

module.exports = (err, req, res, next) => {
    const isValidationError = err.hasOwnProperty('name') && err.name == 'ValidationError';

    const payload = isValidationError ? formatValidationErrors(err.errors): [err]
    const code = isValidationError ? 400 : err.code || 500
    res.status(code).send({errors: payload})
}