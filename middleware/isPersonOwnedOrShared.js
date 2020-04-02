//middleware to check if the person in the id is owned or shared with to the current;y logged in user
//will be run authorize so have access to req.user and req.personId

let Person = require('../models/Person.js'); //get the model to validate
let ForbiddenException = require('../exceptions/Forbidden.js'); //get the exception to throw
debug = require('debug')('giftr:Person Owning or Shared MW')

module.exports = async (req, res, next) =>{
    // try{
    let person = await Person.findById(req.personId);
    // debug(req.personId, person);
    if(person.owner == req.user._id || person.sharedWith.findIndex(id => id == req.user._id) != -1){
        next(); //happy path
    } else {
        next(new ForbiddenException('', 'You do not own/ share this person')); //sad path
    }
    // }catch(err){
    //     next(err);
    // }
}