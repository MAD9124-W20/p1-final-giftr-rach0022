const Gift = require('../models/Gift.js');
const ResourceNotFoundException = require('../exceptions/ResourceNotFound.jks')
const debug = require('debug')('giftr:Gift ID Validation');

//this middleware will run after sanitized body
//will change this later to make sure this gift belongs to the user logged in
module.exports = (req, res, next) =>{
    //get the id from the parameter of the url request or from the sanitizedBody if not supplied
    const giftId = req.params.id ? req.params.id : req.sanitizedBody.id;
    const match = Gift.findById(personId, (err, data)=>{
        if(err) next(new ResourceNotFoundException("No Gift Match", "No gift in the database was matched with this id"));
        req.giftid = giftId;
        next();
    });
}