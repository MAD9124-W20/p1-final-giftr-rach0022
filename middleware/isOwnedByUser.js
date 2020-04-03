//middleware to check if the person in the id is owned by the currently logged in user
//will be run authorize so have access to req.user and req.personId

const Person = require('../models/Person.js'); //get the model to validate
const ForbiddenException = require('../exceptions/Forbidden.js'); //get the exception to throw

module.exports = async (req, res, next) =>{
    let person = await Person.findById(req.personId);
    if(person.owner == req.user._id){
        next(); //happy path
    } else {
        next(new ForbiddenException('', 'You do not own this person')); //sad path
    }
}