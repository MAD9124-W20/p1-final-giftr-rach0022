const Gift = require('../models/Gift.js');
const ResourceNotFoundException = require('../exceptions/ResourceNotFound.js')
const debug = require('debug')('giftr:Gift ID Validation');

//this middleware will run after sanitized body
//will change this later to make sure this gift belongs to the user logged in
module.exports = async (req, res, next) =>{
    //get the id from the parameter of the url request or from the sanitizedBody if not supplied
    const giftId = req.params.giftId; // ? req.params.giftId : req.sanitizedBody.giftId;
    const match = await Gift.findById(personId, (err, data)=>{
        if(err || !data) next(new ResourceNotFoundException("No Gift Match", "No gift in the database was matched with this id"));
        req.giftId = giftId;
        next();
    });
}