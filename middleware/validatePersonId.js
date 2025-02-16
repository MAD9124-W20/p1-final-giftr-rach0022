//middleware/validatePersonId
const Person = require('../models/Person.js');
const ResourceNotFoundException = require('../exceptions/ResourceNotFound.js')
// const debug = require('debug')('giftr:Person ID Validation');
const logger = require('../startup/logger.js');

//this middleware will run after sanitized body
module.exports = async (req, res, next) =>{
    //get the id from the parameter of the url request or from the sanitizedBody if not supplied
    const personId = req.params.personId; //? req.params.personId : req.sanitizedBody.id;
    // logger.log('info', req.params)
    const match = await Person.findById(personId, (err, data)=>{
        if(err || !data) next(new ResourceNotFoundException("No Person Match", "No person in the database was matched with this id"));
        req.personId = personId;
        next();
    });
}