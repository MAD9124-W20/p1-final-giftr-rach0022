//middleware/validatePersonId
const Person = require('../models/Person.js');
const ResourceNotFoundException = require('../exceptions/ResourceNotFound.js')
const debug = require('debug')('giftr:Person ID Validation');

//this middleware will run after sanitized body
module.exports = (req, res, next) =>{
    //get the id from the parameter of the url request or from the sanitizedBody if not supplied
    const personId = req.params.personId; //? req.params.personId : req.sanitizedBody.id;
    const match = Person.findById(personId, (err, data)=>{
        if(err) next(new ResourceNotFoundException("No Person Match", "No person in the database was matched with this id"));
        req.personId = personId;
        next();
    });
}