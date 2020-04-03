// const Gift = require('../models/Gift.js');
const Person = require('../models/Person.js')
const ResourceNotFoundException = require('../exceptions/ResourceNotFound.js')
const logger = require('../startup/logger.js');
// const debug = require('debug')('giftr:Gift ID Validation');

//this middleware will run after sanitized body
//will change this later to make sure this gift belongs to the user logged in
module.exports = async (req, res, next) =>{
    //get the id from the parameter of the url request or from the sanitizedBody if not supplied
    const giftId = req.params.giftId; // ? req.params.giftId : req.sanitizedBody.giftId;
    logger.log('info',req.params);

    //find a match to the person from the person id validation
    const match = await Person.findById(req.personId, (err, data)=>{
        if(err || !data) next(new ResourceNotFoundException("No Gift Match", "No gift in the database was matched with this id"));
        
        //if the id can find a match in the gifts array set the gift id and call next
        if(data.gifts.id(giftId)) {
            req.giftId = giftId;
            next();
        } else { //no match
            next(new ResourceNotFoundException("No Gift Match", "No gift in the database was matched with this id"));
        }
        
        // logger.log('info',req.giftId);
        
    });
}